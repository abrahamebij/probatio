"use client";

import { use } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ConfidenceBadge } from "@/components/ui/confidence-badge";
import { useClaim } from "@/hooks/use-claims";
import { FiShield, FiFileText, FiLock, FiCheckCircle, FiExternalLink } from "react-icons/fi";

export default function RealityPassportPage({
  params,
}: {
  params: Promise<{ assetId: string }>;
}) {
  const { assetId } = use(params);
  const { data, isLoading } = useClaim(assetId);

  const claim = data?.claim;
  const evidence = data?.evidence || [];
  const attestation = data?.attestation;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#282a2b] pb-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#059669] uppercase tracking-wider font-mono">
              DIGITAL ASSET PASSPORT
            </span>
            <h1 className="font-heading text-3xl font-bold text-[#e1e3e4]">
              Reality Passport: {assetId}
            </h1>
          </div>

          <div className="border border-[#059669]/40 bg-[#059669]/10 px-4 py-2 text-xs font-mono text-[#059669] flex items-center gap-2">
            <FiShield /> VERIFIED RWA ANCHOR
          </div>
        </div>

        {/* Main Passport Card */}
        <div className="border border-[#282a2b] bg-[#191c1d] p-8 flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl font-heading font-bold select-none">
            PASSPORT
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="flex flex-col gap-4">
              <span className="text-xs uppercase font-semibold text-[#87948b]">Asset Classification</span>
              <div className="font-heading text-2xl font-bold text-[#e1e3e4]">
                Solar Energy Generation Facility #042
              </div>
              <p className="text-xs text-[#87948b] leading-relaxed">
                Photovoltaic Array (1,200 monocrystalline silicon panels, dual-axis tracking). Connected to regional distribution grid Node #677.
              </p>
            </div>

            <div className="flex flex-col gap-4 border-l-0 md:border-l border-[#282a2b] md:pl-8">
              <span className="text-xs uppercase font-semibold text-[#87948b]">Verification Record</span>
              <ConfidenceBadge confidence={claim?.confidence || 91} status={claim?.status || "verified"} />

              <div className="flex flex-col gap-1 font-mono text-xs text-[#87948b] pt-2">
                <div>CLAIM ID: {claim?.id || "claim-sf042"}</div>
                <div>ATTESTATION HASH: {attestation?.evidenceHash || "0x98f6bcd4621d373cade..."}</div>
              </div>
            </div>
          </div>

          {/* Audit History Timeline */}
          <div className="border-t border-[#282a2b] pt-6 flex flex-col gap-4">
            <h3 className="font-heading text-lg font-semibold text-[#e1e3e4] flex items-center gap-2">
              <FiLock className="text-[#059669]" /> Immutable Verification Audit History
            </h3>

            <div className="flex flex-col divide-y divide-[#282a2b] border border-[#282a2b] bg-[#0c0f10]">
              <div className="p-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <FiCheckCircle className="text-[#059669]" />
                  <div className="flex flex-col font-mono">
                    <span className="text-[#e1e3e4] font-semibold">Attestation Anchored to BOT Chain Mainnet</span>
                    <span className="text-[#87948b]">Block #14,892,104 • Chain ID 677</span>
                  </div>
                </div>
                <span className="font-mono text-[#87948b]">July 31, 2026</span>
              </div>

              <div className="p-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <FiCheckCircle className="text-[#059669]" />
                  <div className="flex flex-col font-mono">
                    <span className="text-[#e1e3e4] font-semibold">Multi-Agent AI Verification Completed</span>
                    <span className="text-[#87948b]">5 Agents Executed • 91% Confidence</span>
                  </div>
                </div>
                <span className="font-mono text-[#87948b]">July 31, 2026</span>
              </div>

              <div className="p-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <FiFileText className="text-[#87948b]" />
                  <div className="flex flex-col font-mono">
                    <span className="text-[#e1e3e4] font-semibold">Evidence Bundle Uploaded &amp; Hashed</span>
                    <span className="text-[#87948b]">PDF Invoice + CSV Inverter Log + Panel Image</span>
                  </div>
                </div>
                <span className="font-mono text-[#87948b]">July 31, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
