export type AttestationStatus = "active" | "disputed" | "revoked";

export type Attestation = {
  id: string;
  claimId: string;
  assetId: string;
  claimHash: string;
  evidenceHash: string;
  confidence: number;
  status: AttestationStatus;
  createdAt: string;
  updatedAt: string;
};

export type Dispute = {
  id: string;
  attestationId: string;
  claimId: string;
  reason: string;
  evidenceProvided: string[];
  status: "open" | "under_review" | "resolved" | "rejected";
  createdAt: string;
};
