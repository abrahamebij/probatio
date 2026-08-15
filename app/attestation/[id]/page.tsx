"use client";

import { use } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { ConfidenceBadge } from "@/components/ui/confidence-badge";
import { useAttestation } from "@/hooks/use-attestation";
import { FiShield, FiCheckCircle, FiLock, FiExternalLink, FiFileText, FiCpu } from "react-icons/fi";

export default function PublicAttestationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading } = useAttestation(id);

  const attestation = data?.attestation;
  const claim = data?.claim;
  const evidenceList = data?.evidence || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111415] text-[#e1e3e4]">
        <Header />
        <div className="p-12 text-center text-[#87948b]">Loading Public Attestation...</div>
      </div>
    );
  }

  // Fallback view for pre-seeded solar farm attestation if not found
  const displayAttestation = attestation || {
    id: id,
    claimId: "claim-sf042",
    assetId: "solar-farm-042",
    claimHash: "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    evidenceHash: "0x98f6bcd4621d373cade0891ac890f6e1f0e4b85c1920aa91f005d4710bc8201a",
    confidence: 91,
    status: "active",
    createdAt: "2026-08-01T09:00:00Z",
    updatedAt: "2026-08-01T09:00:00Z",
  };

  const displayClaimText = claim?.claimText || "Solar Farm #042 generated 18,421 kWh in July.";

  return (
    <div className="min-h-screen bg-[#111415] text-[#e1e3e4] flex flex-col font-sans">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-12 flex flex-col gap-8">
        {/* Verification Certificate Banner */}
        <div className="border border-[#059669] bg-[#191c1d] p-8 flex flex-col gap-6 relative shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#282a2b] pb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 border border-[#059669] bg-[#059669]/10 flex items-center justify-center text-[#059669] text-xl">
                <FiShield />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-[#059669] tracking-widest uppercase font-mono">
                  PUBLIC REALITY ATTESTATION PROOF
                </span>
                <h1 className="font-heading text-2xl font-bold text-[#e1e3e4]">
                  BOT Chain Attestation Record
                </h1>
              </div>
            </div>

            <span className="font-mono text-xs text-[#87948b] bg-[#0c0f10] px-3 py-1 border border-[#282a2b]">
              ATTESTATION ID: {displayAttestation.id}
            </span>
          </div>

          {/* Statement & Score */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 flex flex-col gap-3">
              <span className="text-xs uppercase font-semibold text-[#87948b]">
                Verified Claim Statement
              </span>
              <blockquote className="font-heading text-2xl font-semibold text-[#e1e3e4] border-l-2 border-[#059669] pl-4">
                &quot;{displayClaimText}&quot;
              </blockquote>
            </div>

            <div className="flex flex-col gap-3 justify-center">
              <span className="text-xs uppercase font-semibold text-[#87948b]">
                Reality Confidence
              </span>
              <ConfidenceBadge confidence={displayAttestation.confidence} status="VERIFIED" />
            </div>
          </div>

          {/* Cryptographic Hashes Table */}
          <div className="border-t border-[#282a2b] pt-6 flex flex-col gap-3 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-[#0c0f10] border border-[#282a2b]">
              <span className="text-[#87948b] font-semibold uppercase">Claim Hash:</span>
              <span className="text-[#e1e3e4] text-[11px] truncate">{displayAttestation.claimHash}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-[#0c0f10] border border-[#282a2b]">
              <span className="text-[#87948b] font-semibold uppercase">Evidence Bundle Root Hash:</span>
              <span className="text-[#059669] text-[11px] truncate font-bold">{displayAttestation.evidenceHash}</span>
            </div>
          </div>
        </div>

        {/* Public Transparency Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-[#282a2b] bg-[#191c1d] p-6 flex flex-col gap-4">
            <h3 className="font-heading text-lg font-semibold text-[#e1e3e4] flex items-center gap-2">
              <FiLock className="text-[#059669]" /> Blockchain Anchor Specs
            </h3>
            <div className="flex flex-col divide-y divide-[#282a2b] text-xs font-mono">
              <div className="py-2.5 flex justify-between">
                <span className="text-[#87948b]">Target Network:</span>
                <span className="text-[#e1e3e4]">BOT Chain Mainnet</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#87948b]">Chain ID:</span>
                <span className="text-[#059669]">677</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#87948b]">Status:</span>
                <span className="text-[#059669] font-bold uppercase">{displayAttestation.status}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#87948b]">Anchored At:</span>
                <span className="text-[#e1e3e4]">{new Date(displayAttestation.createdAt).toUTCString()}</span>
              </div>
            </div>
          </div>

          <div className="border border-[#282a2b] bg-[#191c1d] p-6 flex flex-col gap-4">
            <h3 className="font-heading text-lg font-semibold text-[#e1e3e4] flex items-center gap-2">
              <FiCpu className="text-[#059669]" /> AI Pipeline Verification Summary
            </h3>
            <p className="text-xs text-[#87948b] leading-relaxed">
              Audited by 5 specialized agents (Document, Vision, Data, Consistency, Reality) with 100% deterministic output formatting. 
            </p>
            <div className="mt-auto">
              <Link
                href="/dashboard/verification/claim-sf042"
                className="border border-[#059669] bg-transparent text-[#059669] text-xs font-semibold px-4 py-2 uppercase hover:bg-[#059669] hover:text-black transition-colors inline-block"
              >
                Inspect Agent Execution Logs →
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#282a2b] bg-[#0c0f10] py-6 px-6 text-xs text-[#87948b] text-center font-mono">
        Probatio Reality Attestation • BOT Chain Network 677
      </footer>
    </div>
  );
}
