"use client";

import { use } from "react";
import Link from "next/link";
import { useVerification, useTriggerVerification } from "@/hooks/use-verification";
import { useClaim } from "@/hooks/use-claims";
import { useCreateAttestation } from "@/hooks/use-attestation";
import {
  FiCheckCircle,
  FiRefreshCw,
  FiFileText,
  FiEye,
  FiDatabase,
  FiGitCommit,
  FiUser,
  FiArrowRight,
} from "react-icons/fi";

export default function VerificationWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: claimData } = useClaim(id);
  const { data: verData, isLoading } = useVerification(id);
  const triggerVerification = useTriggerVerification();
  const createAttestation = useCreateAttestation();

  const verification = verData?.verification;
  const claim = claimData?.claim;

  const confidenceScore = verification?.confidence || 91;

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
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#e1e3e4] bg-[#323536] ring-1 ring-[#3d4a42]"
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
            <button
              onClick={() => triggerVerification.mutate(id)}
              disabled={triggerVerification.isPending}
              className="bg-[#059669] hover:bg-[#10b981] text-black font-semibold px-6 py-3 uppercase tracking-widest transition-all flex items-center gap-2"
            >
              <FiRefreshCw className={triggerVerification.isPending ? "animate-spin" : ""} />
              {triggerVerification.isPending ? "Re-Running..." : "Re-Run Verification"}
            </button>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#059669] flex items-center justify-center text-black font-bold">
                <FiUser />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Grid */}
      <main className="w-full pt-20 bg-[#111415] min-h-screen">
        <div className="flex flex-col w-full px-6 lg:px-[64px] py-12 gap-8 max-w-[1280px] mx-auto relative">
          <div className="flex flex-col gap-2 z-10 w-full mb-4">
            <span className="font-mono text-xs text-[#bccac0] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse"></span>
              Investigation Mode Active
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-[#e1e3e4] uppercase tracking-tight leading-none mt-2">
              VERIFYING CLAIM: {claim?.assetId || "Solar Farm #042"}
            </h1>
            <div className="flex items-center gap-4 mt-4 font-mono text-xs text-[#bccac0]">
              <span>Period: July 2026</span>
              <span>•</span>
              <span>Initiated: 12:43 UTC</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 w-full items-start">
            {/* Left Panel: Evidence & Claim */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              <div className="bg-[#1d2021] rounded-xl p-6 border border-[#3d4a42]/50">
                <h3 className="font-mono text-xs text-[#e1e3e4] mb-4 uppercase tracking-wider font-semibold">
                  Claim Basis
                </h3>
                <p className="text-sm text-[#bccac0] leading-relaxed mb-4">
                  {claim?.claimText ||
                    "Energy generation output for Facility Alpha-7 over July. Reported total stands at 18,421 kWh."}
                </p>
                <div className="flex items-center justify-between border-t border-[#3d4a42]/30 pt-4 mt-2 font-mono text-xs">
                  <span className="text-[#bccac0] uppercase">Target Attestation</span>
                  <span className="text-[#059669] uppercase bg-[#059669]/10 px-2 py-1">Tier-2</span>
                </div>
              </div>

              <div className="bg-[#1d2021] rounded-xl p-6 border border-[#3d4a42]/50">
                <h3 className="font-mono text-xs text-[#e1e3e4] mb-4 uppercase tracking-wider font-semibold flex items-center justify-between">
                  <span>Evidence Corpus</span>
                  <span className="text-[#bccac0]">4 Files</span>
                </h3>
                <div className="flex flex-col gap-3 font-mono text-xs">
                  <div className="flex items-center justify-between p-3 bg-[#191c1d] border-l-2 border-[#059669]">
                    <span className="text-[#e1e3e4] truncate">Raw_Meter_Logs_July.csv</span>
                    <span className="text-[#bccac0] ml-2">1.2 MB</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#191c1d] border-l-2 border-transparent">
                    <span className="text-[#e1e3e4] truncate">Drone_Survey_July.jpg</span>
                    <span className="text-[#bccac0] ml-2">8.4 MB</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#191c1d] border-l-2 border-transparent">
                    <span className="text-[#e1e3e4] truncate">Maintenance_Audit.pdf</span>
                    <span className="text-[#bccac0] ml-2">450 KB</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#191c1d] border-l-2 border-transparent">
                    <span className="text-[#e1e3e4] truncate">Inverter_API_Dump.json</span>
                    <span className="text-[#bccac0] ml-2">3.1 MB</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Panel: Agent Progress Pipeline */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-[#1d2021] rounded-xl p-8 border border-[#3d4a42]/50 shadow-md">
                <h2 className="font-serif text-2xl font-semibold text-[#e1e3e4] mb-8 uppercase flex items-center gap-3">
                  Verification Pipeline
                </h2>

                <div className="flex flex-col gap-4 relative">
                  {isLoading ? (
                    <div className="p-6 text-center text-[#bccac0] font-mono">Running pipeline...</div>
                  ) : (
                    verification?.steps?.map((step, idx) => (
                      <div key={idx} className="flex gap-4 items-start bg-[#282a2b] p-4 rounded-lg border border-[#3d4a42]/50">
                        <div className="w-8 h-8 rounded-full bg-[#059669] text-black flex items-center justify-center font-bold flex-shrink-0">
                          <FiCheckCircle />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                          <div className="flex justify-between items-center font-mono text-xs">
                            <h4 className="font-semibold text-[#e1e3e4] uppercase">{step.agentName}</h4>
                            <span className="text-[#059669] uppercase font-bold">{step.status}</span>
                          </div>
                          <p className="text-xs text-[#bccac0] font-mono leading-relaxed mt-1">
                            {step.output}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right Panel: Findings & Result Card */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Telemetry log */}
              <div className="bg-[#1d2021] rounded-xl p-6 border border-[#3d4a42]/50 flex flex-col gap-4 font-mono text-xs">
                <h3 className="font-semibold text-[#e1e3e4] uppercase tracking-wider border-b border-[#3d4a42]/30 pb-3">
                  Live Telemetry Summary
                </h3>

                <div className="flex justify-between py-1 border-b border-[#3d4a42]/20">
                  <span className="text-[#bccac0]">Reported Yield:</span>
                  <span className="text-[#e1e3e4]">18,421.00 kWh</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#3d4a42]/20">
                  <span className="text-[#bccac0]">Meter Summation:</span>
                  <span className="text-[#059669]">18,392.45 kWh</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#3d4a42]/20">
                  <span className="text-[#bccac0]">Variance Found:</span>
                  <span className="text-[#ffb3ae] bg-[#93000a]/20 px-1">-28.55 kWh (0.15%)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#bccac0]">Inverter Efficiency:</span>
                  <span className="text-[#059669]">PASS (98.2%)</span>
                </div>
              </div>

              {/* Dominant Result Card */}
              <div className="bg-[#323536] rounded-xl p-8 border border-[#3d4a42] relative overflow-hidden text-center flex flex-col items-center">
                <span className="font-mono text-xs text-[#bccac0] uppercase tracking-[0.2em] mb-4">
                  Current Projection
                </span>
                <div className="font-serif text-6xl font-bold text-[#059669] leading-none mb-2">
                  {confidenceScore}<span className="text-3xl">%</span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#e1e3e4] uppercase mb-6">
                  Reality Confidence
                </h3>

                {/* Segmented Bar */}
                <div className="w-full flex gap-1 mb-8">
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-3 flex-1 rounded-sm ${
                        idx < Math.round((confidenceScore / 100) * 10)
                          ? "bg-[#059669]"
                          : "border border-[#3d4a42]"
                      }`}
                    />
                  ))}
                </div>

                <div className="inline-block bg-[#059669]/20 border border-[#059669] text-[#059669] px-4 py-1 font-mono text-xs uppercase tracking-widest mb-8">
                  Status: Verified
                </div>

                <button
                  onClick={() => createAttestation.mutate(id)}
                  disabled={createAttestation.isPending}
                  className="w-full bg-[#059669] hover:bg-[#10b981] text-black font-semibold text-xs py-4 px-6 uppercase tracking-widest transition-all font-mono flex items-center justify-center gap-2"
                >
                  <span>{createAttestation.isPending ? "Creating..." : "Create Reality Attestation"}</span>
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
