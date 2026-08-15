import { Claim } from "@/types/claim";
import { Evidence } from "@/types/evidence";
import { VerificationResult } from "@/types/verification";
import { Attestation, Dispute } from "@/types/attestation";
import { hashEvidenceContent } from "@/lib/evidence/hashing";

// Pre-seeded Solar Farm #042 data
const defaultClaims: Claim[] = [
  {
    id: "claim-sf042",
    assetId: "solar-farm-042",
    claimText: "Solar Farm #042 generated 18,421 kWh in July.",
    status: "verified",
    confidence: 91,
    createdAt: "2026-07-31T23:59:59Z",
    updatedAt: "2026-08-01T08:30:00Z",
  },
  {
    id: "claim-wind108",
    assetId: "wind-farm-108",
    claimText: "Wind Turbine Cluster #108 produced 42,100 kWh during Q2 Storm Delta.",
    status: "pending",
    confidence: null,
    createdAt: "2026-08-10T14:15:00Z",
    updatedAt: "2026-08-10T14:15:00Z",
  },
  {
    id: "claim-bio015",
    assetId: "biomass-015",
    claimText: "Biomass Plant #015 offset 310 Metric Tons CO2e in Q2 2026.",
    status: "disputed",
    confidence: 64,
    createdAt: "2026-08-05T10:00:00Z",
    updatedAt: "2026-08-12T16:20:00Z",
  },
];

const defaultEvidence: Evidence[] = [
  {
    id: "ev-sf042-pdf",
    claimId: "claim-sf042",
    type: "pdf",
    source: "Monthly_Production_Report_July_2026.pdf",
    hash: hashEvidenceContent("Solar Farm #042 PDF Production Report July 2026 - Claimed: 18,421 kWh"),
    createdAt: "2026-07-31T23:59:59Z",
  },
  {
    id: "ev-sf042-csv",
    claimId: "claim-sf042",
    type: "csv",
    source: "Inverter_Telemetry_Logs_July_2026.csv",
    hash: hashEvidenceContent("CSV Telemetry Log Solar Farm #042 July 2026 - Sum: 18,392 kWh"),
    createdAt: "2026-08-01T00:05:00Z",
  },
  {
    id: "ev-sf042-img",
    claimId: "claim-sf042",
    type: "image",
    source: "Site_Inspection_Panel_Array_July_31.jpg",
    hash: hashEvidenceContent("Thermal Photo Inspection Solar Farm #042 String B active"),
    createdAt: "2026-07-31T17:30:00Z",
  },
  {
    id: "ev-sf042-meta",
    claimId: "claim-sf042",
    type: "metadata",
    source: "Grid_Operator_Attestation_Metadata.json",
    hash: hashEvidenceContent("Metadata JSON Grid Operator Node #677 Timestamp 1722470399"),
    createdAt: "2026-08-01T01:00:00Z",
  },
];

const defaultVerifications: VerificationResult[] = [
  {
    id: "ver-sf042",
    claimId: "claim-sf042",
    status: "verified",
    confidence: 91,
    findings: [
      "Document Agent confirmed PDF invoice matches reported asset ID solar-farm-042.",
      "Vision Agent reconciled thermal image with physical array configuration (zero hot-spot anomalies).",
      "Data Agent parsed 744 hourly CSV telemetry records indicating total generation of 18,392 kWh.",
      "Consistency Agent detected a minor 29 kWh discrepancy between PDF claim (18,421 kWh) and raw telemetry (18,392 kWh).",
      "Reality Agent synthesized overall confidence at 91% due to strong physical evidence despite 0.15% telemetry variance.",
    ],
    contradictions: [
      "29 kWh discrepancy between PDF statement (18,421 kWh) and raw inverter CSV telemetry (18,392 kWh).",
    ],
    evidenceIds: ["ev-sf042-pdf", "ev-sf042-csv", "ev-sf042-img", "ev-sf042-meta"],
    steps: [
      { agentName: "Document Agent", status: "completed", output: "Extracted: Asset Solar Farm #042, claimed 18,421 kWh for July 2026." },
      { agentName: "Vision Agent", status: "completed", output: "Visual inspection verified panel count (1,200 units) & inverter health." },
      { agentName: "Data Agent", status: "completed", output: "Parsed 744 hourly CSV intervals. Sum = 18,392 kWh." },
      { agentName: "Consistency Agent", status: "completed", output: "Contradiction found: 18,421 kWh claimed vs 18,392 kWh telemetry data." },
      { agentName: "Reality Agent", status: "completed", output: "Final Synthesis: Status VERIFIED with 91% confidence." },
    ],
    createdAt: "2026-08-01T08:30:00Z",
    updatedAt: "2026-08-01T08:30:00Z",
  },
];

const defaultAttestations: Attestation[] = [
  {
    id: "att-sf042",
    claimId: "claim-sf042",
    assetId: "solar-farm-042",
    claimHash: hashEvidenceContent("Solar Farm #042 generated 18,421 kWh in July."),
    evidenceHash: hashEvidenceContent("ev-sf042-pdf:ev-sf042-csv:ev-sf042-img:ev-sf042-meta"),
    confidence: 91,
    status: "active",
    createdAt: "2026-08-01T09:00:00Z",
    updatedAt: "2026-08-01T09:00:00Z",
  },
];

const defaultDisputes: Dispute[] = [
  {
    id: "disp-bio015",
    attestationId: "att-bio015",
    claimId: "claim-bio015",
    reason: "Discrepancy in feedstock transport emissions calculation reported in biomass audit.",
    evidenceProvided: ["Audit_Rebuttal_Transport_Log.pdf"],
    status: "under_review",
    createdAt: "2026-08-12T16:20:00Z",
  },
];

class MemoryStore {
  private claims: Claim[] = [...defaultClaims];
  private evidence: Evidence[] = [...defaultEvidence];
  private verifications: VerificationResult[] = [...defaultVerifications];
  private attestations: Attestation[] = [...defaultAttestations];
  private disputes: Dispute[] = [...defaultDisputes];

  // Claims
  getClaims(): Claim[] {
    return this.claims;
  }

  getClaimById(id: string): Claim | undefined {
    return this.claims.find((c) => c.id === id || c.assetId === id);
  }

  createClaim(claim: Omit<Claim, "id" | "createdAt" | "updatedAt">): Claim {
    const newClaim: Claim = {
      ...claim,
      id: `claim-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.claims.unshift(newClaim);
    return newClaim;
  }

  updateClaimStatus(id: string, status: Claim["status"], confidence?: number | null): Claim | undefined {
    const claim = this.getClaimById(id);
    if (!claim) return undefined;
    claim.status = status;
    if (confidence !== undefined) claim.confidence = confidence;
    claim.updatedAt = new Date().toISOString();
    return claim;
  }

  // Evidence
  getEvidenceForClaim(claimId: string): Evidence[] {
    return this.evidence.filter((e) => e.claimId === claimId);
  }

  addEvidence(item: Omit<Evidence, "id" | "createdAt">): Evidence {
    const newEv: Evidence = {
      ...item,
      id: `ev-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.evidence.push(newEv);
    return newEv;
  }

  // Verifications
  getVerification(id: string): VerificationResult | undefined {
    return this.verifications.find((v) => v.id === id || v.claimId === id);
  }

  saveVerification(ver: VerificationResult): VerificationResult {
    const idx = this.verifications.findIndex((v) => v.id === ver.id);
    if (idx >= 0) {
      this.verifications[idx] = ver;
    } else {
      this.verifications.unshift(ver);
    }
    return ver;
  }

  // Attestations
  getAttestation(id: string): Attestation | undefined {
    return this.attestations.find((a) => a.id === id || a.claimId === id || a.assetId === id);
  }

  createAttestation(att: Omit<Attestation, "id" | "createdAt" | "updatedAt">): Attestation {
    const newAtt: Attestation = {
      ...att,
      id: `att-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.attestations.unshift(newAtt);
    return newAtt;
  }

  // Disputes
  getDisputes(): Dispute[] {
    return this.disputes;
  }

  createDispute(dispute: Omit<Dispute, "id" | "createdAt">): Dispute {
    const newDisp: Dispute = {
      ...dispute,
      id: `disp-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.disputes.unshift(newDisp);

    // Update attestation and claim status
    const att = this.getAttestation(dispute.attestationId);
    if (att) {
      att.status = "disputed";
      att.updatedAt = new Date().toISOString();
      this.updateClaimStatus(att.claimId, "disputed");
    }
    return newDisp;
  }
}

// Global singleton instance
export const db = new MemoryStore();
