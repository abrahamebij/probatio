"use client";

import { use } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ConfidenceBadge } from "@/components/ui/confidence-badge";
import { useClaim } from "@/hooks/use-claims";
import { useTriggerVerification } from "@/hooks/use-verification";
import { useCreateAttestation } from "@/hooks/use-attestation";
import { FiCpu, FiShield, FiFileText, FiUploadCloud, FiExternalLink } from "react-icons/fi";

export default function ClaimDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading } = useClaim(id);
  const triggerVerification = useTriggerVerification();
  const createAttestation = useCreateAttestation();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-12 text-center text-[#87948b]">Loading claim details...</div>
      </DashboardLayout>
    );
  }

  const claim = data?.claim;
  const evidenceList = data?.evidence || [];
  const verification = data?.verification;
  const attestation = data?.attestation;

  if (!claim) {
    return (
      <DashboardLayout>
        <div className="p-12 text-center text-[#ffb4ab]">Claim not found.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#282a2b] pb-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#059669] uppercase tracking-wider font-mono">
              ASSET ID: {claim.assetId}
            </span>
            <h1 className="font-heading text-3xl font-bold text-[#e1e3e4]">
              Claim Record &amp; Evidence Audit
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerVerification.mutate(claim.id)}
              disabled={triggerVerification.isPending}
              className="border border-[#059669] bg-[#059669] text-black font-semibold text-xs px-4 py-2.5 uppercase hover:bg-[#10b981] transition-colors flex items-center gap-2"
            >
              <FiCpu /> {triggerVerification.isPending ? "Running Pipeline..." : "Execute AI Verification"}
            </button>

            {claim.status === "verified" && !attestation && (
              <button
                onClick={() => createAttestation.mutate(claim.id)}
                disabled={createAttestation.isPending}
                className="border border-[#3d4a42] bg-[#191c1d] text-[#059669] font-semibold text-xs px-4 py-2.5 uppercase hover:border-[#059669] transition-colors flex items-center gap-2"
              >
                <FiShield /> {createAttestation.isPending ? "Generating..." : "Mint Attestation Stub"}
              </button>
            )}
          </div>
        </div>

        {/* Overview Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 border border-[#282a2b] bg-[#191c1d] p-6 flex flex-col gap-4">
            <span className="text-xs uppercase font-semibold text-[#87948b]">
              Primary Claim Statement
            </span>
            <blockquote className="font-heading text-2xl font-semibold text-[#e1e3e4] border-l-2 border-[#059669] pl-4 italic">
              &quot;{claim.claimText}&quot;
            </blockquote>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#282a2b] text-xs font-mono text-[#87948b]">
              <div>CREATED: {new Date(claim.createdAt).toUTCString()}</div>
              <div>UPDATED: {new Date(claim.updatedAt).toUTCString()}</div>
            </div>
          </div>

          <div className="border border-[#282a2b] bg-[#191c1d] p-6 flex flex-col justify-between gap-4">
            <span className="text-xs uppercase font-semibold text-[#87948b]">
              Reality Confidence Score
            </span>
            <ConfidenceBadge confidence={claim.confidence} status={claim.status} />

            <div className="pt-4 border-t border-[#282a2b] flex items-center justify-between text-xs">
              <span className="text-[#87948b]">Attestation Record:</span>
              {attestation ? (
                <Link
                  href={`/attestation/${attestation.id}`}
                  className="text-[#059669] hover:underline font-mono flex items-center gap-1 font-semibold"
                >
                  {attestation.id} <FiExternalLink />
                </Link>
              ) : (
                <span className="text-[#87948b] font-mono">NOT MINTED</span>
              )}
            </div>
          </div>
        </div>

        {/* Evidence Bundle List */}
        <div className="border border-[#282a2b] bg-[#191c1d] flex flex-col">
          <div className="p-4 border-b border-[#282a2b] flex items-center justify-between">
            <h2 className="font-heading text-xl font-semibold text-[#e1e3e4]">
              Evidence Bundle ({evidenceList.length} items)
            </h2>
            <span className="text-xs font-mono text-[#87948b]">
              Cryptographically Hashed (SHA-256)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#282a2b] bg-[#0c0f10] text-[#87948b] uppercase font-semibold tracking-wider">
                <tr>
                  <th className="p-4">Type</th>
                  <th className="p-4">Evidence Source</th>
                  <th className="p-4 font-mono">Sha-256 Hash</th>
                  <th className="p-4 text-right">Uploaded</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#282a2b]">
                {evidenceList.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-[#87948b]">
                      No evidence files attached.
                    </td>
                  </tr>
                ) : (
                  evidenceList.map((ev) => (
                    <tr key={ev.id} className="hover:bg-[#282a2b]/40 transition-colors">
                      <td className="p-4 font-semibold uppercase text-[#059669]">{ev.type}</td>
                      <td className="p-4 text-[#e1e3e4] font-medium">{ev.source}</td>
                      <td className="p-4 font-mono text-[11px] text-[#87948b] truncate max-w-xs">{ev.hash}</td>
                      <td className="p-4 text-right font-mono text-[#87948b]">
                        {new Date(ev.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Link to AI Pipeline Workspace */}
        <div className="border border-[#282a2b] bg-[#0c0f10] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiCpu className="text-[#059669] text-2xl" />
            <div className="flex flex-col">
              <span className="font-heading text-lg font-semibold text-[#e1e3e4]">
                Multi-Agent AI Verification Workspace
              </span>
              <span className="text-xs text-[#87948b]">
                Inspect real-time outputs from Document, Vision, Data, Consistency, and Reality Agents.
              </span>
            </div>
          </div>

          <Link
            href={`/dashboard/verification/${claim.id}`}
            className="border border-[#059669] bg-transparent text-[#059669] text-xs font-semibold px-4 py-2 uppercase hover:bg-[#059669] hover:text-black transition-colors"
          >
            Open Workspace →
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
