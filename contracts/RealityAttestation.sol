// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title RealityAttestation
 * @notice Core attestation registry for Probatio on BOT Chain.
 *
 * MVP ACCESS-CONTROL DESIGN NOTE:
 * - `createAttestation`: Open to any caller for the MVP hackathon demo.
 * - `disputeAttestation`: Open to any caller to enable public challengeability.
 * - `resolveDispute`: Restricted to the contract `owner` (governance/verification authority).
 *   This ensures that resolving a contested claim and assigning a new confidence score requires
 *   authoritative review rather than self-resolution by interested parties.
 */
contract RealityAttestation {
    enum Status {
        Pending,
        Verifying,
        Verified,
        Disputed,
        ReVerified,
        Revoked
    }

    struct Attestation {
        bytes32 assetId;
        bytes32 claimHash;
        bytes32 evidenceHash;
        uint16 confidence; // 0-100
        uint8 status; // maps to Status enum
        uint256 createdAt;
        uint256 updatedAt;
    }

    address public owner;
    uint256 private _nonce;

    mapping(bytes32 => Attestation) private _attestations;

    // Events matching Phase 4 brief specification exactly
    event AttestationCreated(bytes32 indexed attestationId, bytes32 indexed assetId, uint16 confidence, uint256 timestamp);
    event AttestationUpdated(bytes32 indexed attestationId, uint16 confidence, uint256 timestamp);
    event AttestationDisputed(bytes32 indexed attestationId, string reason, uint256 timestamp);
    event AttestationResolved(bytes32 indexed attestationId, Status resolvedStatus, uint16 confidence, uint256 timestamp);

    error Unauthorized();
    error AttestationNotFound();
    error InvalidConfidence();
    error AttestationAlreadyDisputed();
    error AttestationNotDisputed();
    error AttestationRevoked();

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @notice Creates a new Reality Attestation.
     * @param assetId Identifier of the underlying physical asset.
     * @param claimHash Cryptographic hash of the natural language claim statement.
     * @param evidenceHash Combined root hash of the evidence bundle.
     * @param confidence Confidence percentage (0-100).
     * @return attestationId Unique identifier generated for the attestation.
     */
    function createAttestation(
        bytes32 assetId,
        bytes32 claimHash,
        bytes32 evidenceHash,
        uint16 confidence
    ) external returns (bytes32 attestationId) {
        if (confidence > 100) revert InvalidConfidence();

        _nonce++;
        attestationId = keccak256(
            abi.encodePacked(assetId, claimHash, evidenceHash, block.timestamp, msg.sender, _nonce)
        );

        _attestations[attestationId] = Attestation({
            assetId: assetId,
            claimHash: claimHash,
            evidenceHash: evidenceHash,
            confidence: confidence,
            status: uint8(Status.Verified),
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        emit AttestationCreated(attestationId, assetId, confidence, block.timestamp);
    }

    /**
     * @notice Updates evidence hash and confidence for an existing attestation.
     * @param attestationId Unique identifier of the attestation.
     * @param newEvidenceHash Updated evidence bundle root hash.
     * @param newConfidence Updated confidence percentage (0-100).
     */
    function updateAttestation(
        bytes32 attestationId,
        bytes32 newEvidenceHash,
        uint16 newConfidence
    ) external {
        Attestation storage attestation = _attestations[attestationId];
        if (attestation.createdAt == 0) revert AttestationNotFound();
        if (attestation.status == uint8(Status.Revoked)) revert AttestationRevoked();
        if (newConfidence > 100) revert InvalidConfidence();

        attestation.evidenceHash = newEvidenceHash;
        attestation.confidence = newConfidence;
        attestation.updatedAt = block.timestamp;

        emit AttestationUpdated(attestationId, newConfidence, block.timestamp);
    }

    /**
     * @notice Publicly disputes an active attestation.
     * @param attestationId Unique identifier of the attestation being contested.
     * @param reason Description or context for the dispute.
     */
    function disputeAttestation(
        bytes32 attestationId,
        string calldata reason
    ) external {
        Attestation storage attestation = _attestations[attestationId];
        if (attestation.createdAt == 0) revert AttestationNotFound();
        if (attestation.status == uint8(Status.Revoked)) revert AttestationRevoked();
        if (attestation.status == uint8(Status.Disputed)) revert AttestationAlreadyDisputed();

        attestation.status = uint8(Status.Disputed);
        attestation.updatedAt = block.timestamp;

        emit AttestationDisputed(attestationId, reason, block.timestamp);
    }

    /**
     * @notice Resolves an open dispute after independent re-audit.
     * @dev Restricted to the contract owner / designated resolver authority.
     * @param attestationId Unique identifier of the disputed attestation.
     * @param newEvidenceHash Updated evidence hash reflecting resolution findings.
     * @param newConfidence Re-evaluated confidence percentage (0-100).
     * @param resolvedStatus Final status (e.g. ReVerified or Revoked).
     */
    function resolveDispute(
        bytes32 attestationId,
        bytes32 newEvidenceHash,
        uint16 newConfidence,
        Status resolvedStatus
    ) external onlyOwner {
        Attestation storage attestation = _attestations[attestationId];
        if (attestation.createdAt == 0) revert AttestationNotFound();
        if (attestation.status != uint8(Status.Disputed)) revert AttestationNotDisputed();
        if (newConfidence > 100) revert InvalidConfidence();

        attestation.evidenceHash = newEvidenceHash;
        attestation.confidence = newConfidence;
        attestation.status = uint8(resolvedStatus);
        attestation.updatedAt = block.timestamp;

        emit AttestationResolved(attestationId, resolvedStatus, newConfidence, block.timestamp);
    }

    /**
     * @notice Retrieves full attestation record by ID.
     * @param attestationId Unique identifier of the attestation.
     * @return Attestation struct record.
     */
    function getAttestation(
        bytes32 attestationId
    ) external view returns (Attestation memory) {
        Attestation memory attestation = _attestations[attestationId];
        if (attestation.createdAt == 0) revert AttestationNotFound();
        return attestation;
    }
}
