export type VerificationStatus = "verified" | "unverified" | "inconclusive";

export type AgentStepStatus = "pending" | "processing" | "completed" | "failed";

export type AgentStepResult = {
  agentName: "Document Agent" | "Vision Agent" | "Data Agent" | "Consistency Agent" | "Reality Agent";
  status: AgentStepStatus;
  output?: string;
  timestamp?: string;
};

export type VerificationResult = {
  id: string;
  claimId: string;
  status: VerificationStatus;
  confidence: number; // 0 - 100
  findings: string[];
  contradictions: string[];
  evidenceIds: string[];
  steps: AgentStepResult[];
  createdAt: string;
  updatedAt: string;
};
