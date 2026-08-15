import { expect } from "chai";
import hre from "hardhat";
const { ethers } = hre;

describe("RealityAttestation Smart Contract", function () {
  let contract: any;
  let owner: any;
  let challenger: any;
  let thirdParty: any;

  const mockAssetId = ethers.encodeBytes32String("solar-farm-042");
  const mockClaimHash = ethers.keccak256(ethers.toUtf8Bytes("Solar Farm #042 generated 18,421 kWh in July."));
  const mockEvidenceHash = ethers.keccak256(ethers.toUtf8Bytes("ev-bundle-root-hash-01"));
  const mockConfidence = 91;

  beforeEach(async function () {
    [owner, challenger, thirdParty] = await ethers.getSigners();

    const RealityAttestationFactory = await ethers.getContractFactory("RealityAttestation");
    contract = await RealityAttestationFactory.deploy();
    await contract.waitForDeployment();
  });

  describe("1. Attestation Creation", function () {
    it("Should allow any caller to create an attestation and emit AttestationCreated", async function () {
      const tx = await contract.connect(thirdParty).createAttestation(
        mockAssetId,
        mockClaimHash,
        mockEvidenceHash,
        mockConfidence
      );

      const receipt = await tx.wait();
      expect(receipt).to.not.be.null;

      await expect(tx)
        .to.emit(contract, "AttestationCreated")
        .withArgs(
          (val: string) => val.startsWith("0x"),
          mockAssetId,
          mockConfidence,
          (timestamp: any) => timestamp > 0
        );
    });

    it("Should store and return accurate attestation data via getAttestation", async function () {
      const tx = await contract.createAttestation(
        mockAssetId,
        mockClaimHash,
        mockEvidenceHash,
        mockConfidence
      );
      const receipt = await tx.wait();

      const event = receipt?.logs.find((log: any) => {
        try {
          return contract.interface.parseLog(log)?.name === "AttestationCreated";
        } catch {
          return false;
        }
      });
      const parsedLog = contract.interface.parseLog(event as any);
      const attestationId = parsedLog?.args.attestationId;

      const record = await contract.getAttestation(attestationId);
      expect(record.assetId).to.equal(mockAssetId);
      expect(record.claimHash).to.equal(mockClaimHash);
      expect(record.evidenceHash).to.equal(mockEvidenceHash);
      expect(record.confidence).to.equal(mockConfidence);
      expect(record.status).to.equal(2); // Status.Verified = 2
    });

    it("Should revert if confidence exceeds 100", async function () {
      await expect(
        contract.createAttestation(mockAssetId, mockClaimHash, mockEvidenceHash, 101)
      ).to.be.revertedWithCustomError(contract, "InvalidConfidence");
    });
  });

  describe("2. Attestation Updates", function () {
    it("Should update evidence hash & confidence and emit AttestationUpdated", async function () {
      const tx = await contract.createAttestation(
        mockAssetId,
        mockClaimHash,
        mockEvidenceHash,
        mockConfidence
      );
      const receipt = await tx.wait();
      const event = receipt?.logs.find((log: any) => {
        try {
          return contract.interface.parseLog(log)?.name === "AttestationCreated";
        } catch {
          return false;
        }
      });
      const attestationId = contract.interface.parseLog(event as any)?.args.attestationId;

      const newEvidenceHash = ethers.keccak256(ethers.toUtf8Bytes("ev-bundle-updated"));
      const newConfidence = 95;

      const updateTx = await contract.updateAttestation(attestationId, newEvidenceHash, newConfidence);

      await expect(updateTx)
        .to.emit(contract, "AttestationUpdated")
        .withArgs(attestationId, newConfidence, (timestamp: any) => timestamp > 0);

      const record = await contract.getAttestation(attestationId);
      expect(record.evidenceHash).to.equal(newEvidenceHash);
      expect(record.confidence).to.equal(newConfidence);
    });
  });

  describe("3. Dispute Flow", function () {
    let attestationId: string;

    beforeEach(async function () {
      const tx = await contract.createAttestation(
        mockAssetId,
        mockClaimHash,
        mockEvidenceHash,
        mockConfidence
      );
      const receipt = await tx.wait();
      const event = receipt?.logs.find((log: any) => {
        try {
          return contract.interface.parseLog(log)?.name === "AttestationCreated";
        } catch {
          return false;
        }
      });
      attestationId = contract.interface.parseLog(event as any)?.args.attestationId;
    });

    it("Should allow public dispute and emit AttestationDisputed", async function () {
      const reason = "Discrepancy identified between inverter telemetry and reported generation.";
      const disputeTx = await contract.connect(challenger).disputeAttestation(attestationId, reason);

      await expect(disputeTx)
        .to.emit(contract, "AttestationDisputed")
        .withArgs(attestationId, reason, (timestamp: any) => timestamp > 0);

      const record = await contract.getAttestation(attestationId);
      expect(record.status).to.equal(3); // Status.Disputed = 3
    });

    it("Should prevent duplicate disputes on already disputed attestations", async function () {
      await contract.connect(challenger).disputeAttestation(attestationId, "Reason 1");

      await expect(
        contract.connect(thirdParty).disputeAttestation(attestationId, "Reason 2")
      ).to.be.revertedWithCustomError(contract, "AttestationAlreadyDisputed");
    });
  });

  describe("4. Dispute Resolution & Access Control", function () {
    let attestationId: string;

    beforeEach(async function () {
      const tx = await contract.createAttestation(
        mockAssetId,
        mockClaimHash,
        mockEvidenceHash,
        mockConfidence
      );
      const receipt = await tx.wait();
      const event = receipt?.logs.find((log: any) => {
        try {
          return contract.interface.parseLog(log)?.name === "AttestationCreated";
        } catch {
          return false;
        }
      });
      attestationId = contract.interface.parseLog(event as any)?.args.attestationId;

      await contract.connect(challenger).disputeAttestation(attestationId, "Telemetry mismatch");
    });

    it("Should reject dispute resolution attempts from non-owner accounts", async function () {
      const reAuditEvidenceHash = ethers.keccak256(ethers.toUtf8Bytes("re-audit-resolved-evidence"));
      const newConfidence = 87;

      await expect(
        contract
          .connect(challenger)
          .resolveDispute(attestationId, reAuditEvidenceHash, newConfidence, 4 /* Status.ReVerified */)
      ).to.be.revertedWithCustomError(contract, "Unauthorized");
    });

    it("Should allow contract owner to resolve dispute to ReVerified and emit AttestationResolved", async function () {
      const reAuditEvidenceHash = ethers.keccak256(ethers.toUtf8Bytes("re-audit-resolved-evidence"));
      const newConfidence = 87;

      const resolveTx = await contract
        .connect(owner)
        .resolveDispute(attestationId, reAuditEvidenceHash, newConfidence, 4 /* Status.ReVerified */);

      await expect(resolveTx)
        .to.emit(contract, "AttestationResolved")
        .withArgs(attestationId, 4, newConfidence, (timestamp: any) => timestamp > 0);

      const record = await contract.getAttestation(attestationId);
      expect(record.status).to.equal(4); // Status.ReVerified = 4
      expect(record.confidence).to.equal(newConfidence);
      expect(record.evidenceHash).to.equal(reAuditEvidenceHash);
    });

    it("Should allow contract owner to resolve dispute to Revoked", async function () {
      const reAuditEvidenceHash = ethers.keccak256(ethers.toUtf8Bytes("re-audit-revoked-evidence"));
      const newConfidence = 0;

      const resolveTx = await contract
        .connect(owner)
        .resolveDispute(attestationId, reAuditEvidenceHash, newConfidence, 5 /* Status.Revoked */);

      await expect(resolveTx)
        .to.emit(contract, "AttestationResolved")
        .withArgs(attestationId, 5, newConfidence, (timestamp: any) => timestamp > 0);

      const record = await contract.getAttestation(attestationId);
      expect(record.status).to.equal(5); // Status.Revoked = 5
    });

    it("Should revert if attempting to resolve an undisputed attestation", async function () {
      const tx = await contract.createAttestation(
        mockAssetId,
        mockClaimHash,
        mockEvidenceHash,
        mockConfidence
      );
      const receipt = await tx.wait();
      const event = receipt?.logs.find((log: any) => {
        try {
          return contract.interface.parseLog(log)?.name === "AttestationCreated";
        } catch {
          return false;
        }
      });
      const freshAttestationId = contract.interface.parseLog(event as any)?.args.attestationId;

      await expect(
        contract.connect(owner).resolveDispute(freshAttestationId, mockEvidenceHash, 90, 4)
      ).to.be.revertedWithCustomError(contract, "AttestationNotDisputed");
    });
  });
});
