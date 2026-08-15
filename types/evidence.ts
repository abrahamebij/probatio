export type EvidenceType = "pdf" | "csv" | "image" | "metadata";

export type Evidence = {
  id: string;
  claimId: string;
  type: EvidenceType;
  source: string;
  hash: string;
  createdAt: string;
};
