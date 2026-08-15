"use client";

import { use } from "react";
import Link from "next/link";
import { useAttestation } from "@/hooks/use-attestation";
import { FiCheckCircle, FiExternalLink, FiCopy, FiUser } from "react-icons/fi";

export default function PublicAttestationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading } = useAttestation(id);

  const attestation = data?.attestation;
  const claim = data?.claim;

  const displayId = attestation?.id || id;
  const displayConfidence = attestation?.confidence || 91;
  const displayClaimText =
    claim?.claimText ||
    "Cross-referencing of satellite imagery, local grid interconnection logs, and on-site IoT sensor data confirms the operational status and physical footprint of Solar Farm #042.";

  return (
    <div className="bg-[#111415] font-sans text-[#e1e3e4] min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#111415]/90 backdrop-blur-md border-b border-[#3d4a42]/30">
        <div className="h-20 max-w-[1280px] mx-auto px-6 lg:px-[64px] flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-8 w-8 bg-[#059669] flex items-center justify-center text-black font-bold text-lg">
                P
              </div>
              <span className="font-serif text-2xl font-semibold text-[#e1e3e4] tracking-tight">
                Probatio
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-2 ml-8">
              <Link
                href="/dashboard"
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#bccac0] hover:text-[#e1e3e4] transition-all"
              >
                Overview
              </Link>
              <Link
                href="/dashboard/claims"
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#bccac0] hover:text-[#e1e3e4] transition-all"
              >
                Claims
              </Link>
              <Link
                href="/dashboard/passports/solar-farm-042"
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#bccac0] hover:text-[#e1e3e4] transition-all"
              >
                Reality Passports
              </Link>
              <Link
                href="/dashboard/disputes"
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#bccac0] hover:text-[#e1e3e4] transition-all"
              >
                Disputes
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <Link
              href="/dashboard/claims"
              className="bg-[#059669] hover:bg-[#10b981] text-black font-semibold px-6 py-3 uppercase tracking-widest transition-all"
            >
              Verify a claim
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#059669] flex items-center justify-center text-black font-bold">
                <FiUser />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Public Attestation Document */}
      <main className="w-full pt-20 bg-[#111415] min-h-screen">
        <div className="max-w-[1280px] mx-auto w-full px-6 lg:px-[64px] py-12 md:py-24 relative z-10 flex flex-col gap-16">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-[#3d4a42]/30 pb-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <FiCheckCircle className="text-[#059669] text-2xl" />
                <span className="text-xs font-semibold text-[#059669] tracking-widest uppercase font-mono">
                  Public Certificate
                </span>
              </div>
              <h1 className="font-serif text-5xl font-bold text-[#e1e3e4]">Reality Attestation</h1>
              <p className="text-base text-[#bccac0] max-w-2xl mt-2 leading-relaxed">
                Official verification record for environmental infrastructure claim. Information presented herein is cryptographically secured on the BOT Chain.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2 text-[#bccac0] font-mono text-xs">
              <span className="uppercase">Attestation Date</span>
              <span className="text-[#e1e3e4] font-semibold">August 02, 2026 - 14:32:05 UTC</span>
            </div>
          </header>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Metric & Claim */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {/* Confidence Card */}
              <div className="bg-[#1d2021] rounded-xl border border-[#3d4a42]/30 p-8 flex flex-col gap-6">
                <div className="flex flex-col gap-2 font-mono">
                  <span className="text-xs text-[#bccac0] tracking-widest uppercase">Reality Confidence</span>
                  <div className="flex items-baseline gap-1 font-serif text-6xl text-[#059669] font-bold">
                    {displayConfidence}<span className="text-3xl">%</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 font-mono text-xs">
                  <div className="flex gap-1 h-2 w-full">
                    {Array.from({ length: 10 }).map((_, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 rounded-sm ${
                          idx < Math.round((displayConfidence / 100) * 10)
                            ? "bg-[#059669]"
                            : "border border-[#3d4a42]"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[#bccac0]">
                    <span>0%</span>
                    <span>High Confidence</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              {/* Subject of Claim */}
              <div className="bg-[#191c1d] rounded-xl border border-[#3d4a42]/30 p-8 flex flex-col gap-6">
                <h2 className="font-serif text-2xl font-bold text-[#e1e3e4]">Subject of Claim</h2>
                <div className="flex flex-col gap-4 font-mono text-xs">
                  <div className="flex flex-col gap-1">
                    <span className="text-[#bccac0] uppercase">Identifier</span>
                    <span className="text-[#e1e3e4] font-semibold">SF-042-ATACAMA</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#bccac0] uppercase">Claimed Capacity</span>
                    <span className="text-[#e1e3e4] font-semibold">150 MW Peak Output</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Evidence & Findings */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div className="bg-[#111415] rounded-xl border border-[#3d4a42]/30 p-8 flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-[#3d4a42]/30 pb-4 font-mono text-xs">
                  <h2 className="font-serif text-2xl font-bold text-[#e1e3e4]">Verification Findings</h2>
                  <span className="px-3 py-1 bg-[#059669]/10 text-[#059669] uppercase border border-[#059669]/20 font-bold">
                    Verified
                  </span>
                </div>

                <div className="flex flex-col gap-4 text-sm text-[#e1e3e4] leading-relaxed">
                  <p>{displayClaimText}</p>
                </div>
              </div>

              {/* Evidence Ledger */}
              <div className="bg-[#111415] rounded-xl border border-[#3d4a42]/30 p-8 flex flex-col gap-6">
                <h2 className="font-serif text-2xl font-bold text-[#e1e3e4] border-b border-[#3d4a42]/30 pb-4">
                  Evidence Ledger
                </h2>
                <div className="flex flex-col gap-4 font-mono text-xs">
                  <div className="flex items-center justify-between p-4 bg-[#191c1d] border border-[#3d4a42]/20">
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#e1e3e4]">Multispectral Satellite Scan</span>
                      <span className="text-[#bccac0]">Sentinel-2 • 10m Resolution</span>
                    </div>
                    <span className="text-[#059669] font-bold">HASH MATCHED</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#191c1d] border border-[#3d4a42]/20">
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#e1e3e4]">Grid Interconnect Telemetry</span>
                      <span className="text-[#bccac0]">ISO Certified Metering</span>
                    </div>
                    <span className="text-[#059669] font-bold">HASH MATCHED</span>
                  </div>
                </div>
              </div>

              {/* Cryptographic Proof Card */}
              <div className="bg-[#0c0f10] rounded-xl border border-[#3d4a42] p-8 flex flex-col gap-6 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-xl font-bold text-[#e1e3e4]">Cryptographic Proof</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[#bccac0] uppercase">Attestation ID</span>
                    <span className="text-[#e1e3e4] font-bold">{displayId}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#bccac0] uppercase">Network</span>
                    <span className="text-[#059669] font-bold">BOT Chain Mainnet (Chain ID 677)</span>
                  </div>
                </div>

                <div className="w-full bg-[#111415] p-4 border border-[#3d4a42]/30 rounded flex items-center justify-between">
                  <div className="flex flex-col gap-1 overflow-hidden pr-4">
                    <span className="text-[#bccac0] uppercase">Transaction Hash</span>
                    <span className="text-[#e1e3e4] font-mono truncate">
                      {attestation?.evidenceHash || "0x8f4c92a13b9d44ef1a2c88d255f6e7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4"}
                    </span>
                  </div>
                  <button className="text-[#bccac0] hover:text-[#e1e3e4]">
                    <FiCopy />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
