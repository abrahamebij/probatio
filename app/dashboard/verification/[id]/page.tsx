"use client";

import { use } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ConfidenceBadge } from "@/components/ui/confidence-badge";
import { useVerification, useTriggerVerification } from "@/hooks/use-verification";
import { useClaim } from "@/hooks/use-claims";
import {
  FiCpu,
  FiFileText,
  FiEye,
  FiDatabase,
  FiGitCommit,
  FiCheckCircle,
  FiAlertTriangle,
  FiRefreshCw,
} from "react-icons/fi";

const agentIcons = {
  "Document Agent": FiFileText,
  "Vision Agent": FiEye,
  "Data Agent": FiDatabase,
  "Consistency Agent": FiGitCommit,
  "Reality Agent": FiCheckCircle,
};

export default function VerificationWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: claimData } = useClaim(id);
  const { data: verData, isLoading } = useVerification(id);
  const triggerVerification = useTriggerVerification();

  const verification = verData?.verification;
  const claim = claimData?.claim;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#282a2b] pb-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#059669] uppercase tracking-wider font-mono">
              AI PIPELINE ORCHESTRATOR
            </span>
            <h1 className="font-heading text-3xl font-bold text-[#e1e3e4]">
              Verification Workspace
            </h1>
          </div>

          <button
            onClick={() => triggerVerification.mutate(id)}
            disabled={triggerVerification.isPending}
            className="border border-[#059669] bg-[#059669] text-black font-semibold text-xs px-4 py-2 uppercase hover:bg-[#10b981] transition-colors flex items-center gap-2"
          >
            <FiRefreshCw className={triggerVerification.isPending ? "animate-spin" : ""} />
            {triggerVerification.isPending ? "Processing Engine..." : "Re-Run Verification"}
          </button>
        </div>

        {/* Claim context banner */}
        {claim && (
          <div className="border border-[#282a2b] bg-[#191c1d] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] uppercase font-semibold text-[#87948b]">
                Claim Under Audit ({claim.assetId})
              </span>
              <p className="font-heading text-lg font-semibold text-[#e1e3e4]">
                &quot;{claim.claimText}&quot;
              </p>
            </div>
            {verification && <ConfidenceBadge confidence={verification.confidence} status={verification.status} />}
          </div>
        )}

        {/* Pipeline Agents Progress View */}
        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-xl font-semibold text-[#e1e3e4] flex items-center gap-2">
            <FiCpu className="text-[#059669]" /> Multi-Perspective Agent Execution Pipeline
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {isLoading ? (
              <div className="p-8 border border-[#282a2b] bg-[#191c1d] text-center text-[#87948b]">
                Loading pipeline steps...
              </div>
            ) : !verification ? (
              <div className="p-8 border border-[#282a2b] bg-[#191c1d] text-center text-[#87948b] flex flex-col items-center gap-4">
                <span>No active verification run found for this claim.</span>
                <button
                  onClick={() => triggerVerification.mutate(id)}
                  className="border border-[#059669] bg-[#059669] text-black font-semibold text-xs px-6 py-2 uppercase"
                >
                  Start Verification Run
                </button>
              </div>
            ) : (
              verification.steps?.map((step, idx) => {
                const IconComponent = agentIcons[step.agentName] || FiCpu;
                return (
                  <div
                    key={idx}
                    className="border border-[#282a2b] bg-[#191c1d] p-5 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 border border-[#059669]/40 bg-[#059669]/10 flex items-center justify-center text-[#059669]">
                          <IconComponent />
                        </div>
                        <span className="font-heading text-lg font-semibold text-[#e1e3e4]">
                          0{idx + 1}. {step.agentName}
                        </span>
                      </div>

                      <span className="px-2.5 py-0.5 text-[10px] uppercase font-semibold font-mono bg-[#059669]/20 text-[#059669]">
                        {step.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#e1e3e4] font-mono leading-relaxed pl-11 bg-[#0c0f10] p-3 border border-[#282a2b]">
                      {step.output}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Structured Findings & Discrepancies */}
        {verification && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Supporting Findings */}
            <div className="border border-[#282a2b] bg-[#191c1d] p-6 flex flex-col gap-4">
              <h3 className="font-heading text-lg font-semibold text-[#e1e3e4] flex items-center gap-2">
                <FiCheckCircle className="text-[#059669]" /> Evidence-Backed Findings
              </h3>
              <ul className="flex flex-col gap-2.5 text-xs text-[#e1e3e4]">
                {verification.findings.map((finding, i) => (
                  <li key={i} className="flex items-start gap-2 border-l-2 border-[#059669] pl-3 py-1 bg-[#0c0f10]">
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contradictions & Discrepancies */}
            <div className="border border-[#282a2b] bg-[#191c1d] p-6 flex flex-col gap-4">
              <h3 className="font-heading text-lg font-semibold text-[#e1e3e4] flex items-center gap-2">
                <FiAlertTriangle className="text-[#ffb4ab]" /> Identified Discrepancies
              </h3>
              {verification.contradictions.length === 0 ? (
                <div className="text-xs text-[#87948b] italic p-4 bg-[#0c0f10] border border-[#282a2b]">
                  Zero contradictions detected across evidence bundle.
                </div>
              ) : (
                <ul className="flex flex-col gap-2.5 text-xs text-[#ffb4ab]">
                  {verification.contradictions.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 border-l-2 border-[#93000a] pl-3 py-1 bg-[#93000a]/20">
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
