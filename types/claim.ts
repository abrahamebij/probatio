export type ClaimStatus = "pending" | "verifying" | "verified" | "disputed" | "revoked";

export type Claim = {
  id: string;
  assetId: string;
  claimText: string;
  status: ClaimStatus;
  confidence: number | null;
  createdAt: string;
  updatedAt: string;
};
