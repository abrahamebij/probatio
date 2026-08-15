"use client";

import { use } from "react";
import Link from "next/link";
import { useClaim } from "@/hooks/use-claims";
import { useTriggerVerification } from "@/hooks/use-verification";
import { useCreateAttestation } from "@/hooks/use-attestation";
import { FiCheck, FiArrowRight, FiUser } from "react-icons/fi";

export default function ClaimDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading } = useClaim(id);
  const triggerVerification = useTriggerVerification();
  const createAttestation = useCreateAttestation();

  const claim = data?.claim;
  const evidenceList = data?.evidence || [];
  const attestation = data?.attestation;

  const displayClaimText =
    claim?.claimText ||
    "Solar Farm #042 generated 18,421 kWh of verifiable energy during the operational period of July 1, 2026 to July 31, 2026.";
  const displayAssetId = claim?.assetId || "SF-042";
  const confidenceVal = claim?.confidence !== null && claim?.confidence !== undefined ? claim.confidence : 91.04;

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
              className="bg-[#059669] hover:bg-[#10b981] text-black font-semibold px-6 py-3 uppercase tracking-widest transition-all"
            >
              {triggerVerification.isPending ? "Verifying..." : "Verify a claim"}
            </button>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#059669] flex items-center justify-center text-black font-bold">
                <FiUser />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full pt-20 bg-[#111415] min-h-screen">
        <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-[64px] py-12 md:py-24 space-y-24">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 w-full">
            <div className="space-y-6">
              <div className="flex items-center gap-4 font-mono text-xs">
                <span className="px-3 py-1 text-[#e1e3e4] uppercase tracking-widest bg-[#323536]">
                  Asset ID: {displayAssetId}
                </span>
                <span className="px-3 py-1 text-[#bccac0] uppercase tracking-widest bg-[#191c1d]">
                  Energy Production
                </span>
              </div>
              <h1 className="font-serif text-5xl font-bold text-[#e1e3e4]">
                Solar Farm #042<br />July Yield Attestation
              </h1>
              <div className="flex items-center gap-8 font-mono text-xs text-[#bccac0] uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <FiCheck className="text-[#059669] text-base" />
                  <span className="text-[#e1e3e4]">Status: {claim?.status || "Verified"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Recorded: Aug 02, 2026</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4 min-w-[240px]">
              <div className="text-xs text-[#bccac0] uppercase tracking-widest mb-2 font-mono">
                Reality Confidence
              </div>
              <div className="flex gap-1 h-3 w-full">
                {Array.from({ length: 10 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 ${
                      idx < Math.round((confidenceVal / 100) * 10)
                        ? "bg-[#059669]"
                        : "bg-[#323536] border border-[#3d4a42]"
                    }`}
                  />
                ))}
              </div>
              <div className="font-serif text-3xl font-bold text-[#059669]">{confidenceVal}%</div>
            </div>
          </header>

          <div className="h-px w-full bg-[#3d4a42]/30"></div>

          {/* Claim & Evidence Cards */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="col-span-1 lg:col-span-4 flex flex-col gap-8">
              <h2 className="text-xs font-mono text-[#bccac0] uppercase tracking-widest bg-[#0c0f10] inline-block self-start py-1 px-2 -ml-2">
                01 / The Claim
              </h2>
              <div className="font-serif text-2xl text-[#e1e3e4] leading-relaxed italic">
                &quot;{displayClaimText}&quot;
              </div>
            </div>

            <div className="col-span-1 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1d2021] p-6 space-y-4 border border-[#3d4a42]/50 hover:border-[#059669]/50 transition-colors">
                <div className="flex justify-between items-start">
                  <span className="text-[#059669] font-mono text-xs uppercase tracking-widest">
                    Smart Meter Telemetry
                  </span>
                  <span className="px-2 py-0.5 bg-[#059669]/10 text-[#059669] text-[10px] uppercase font-mono tracking-widest">
                    Verified
                  </span>
                </div>
                <div className="font-serif text-lg font-semibold text-[#e1e3e4]">Smart Meter Telemetry</div>
                <div className="text-sm text-[#bccac0] leading-relaxed">
                  Continuous 15-minute interval readings cross-referenced with local grid intake nodes. Variance &lt; 0.02%.
                </div>
              </div>

              <div className="bg-[#1d2021] p-6 space-y-4 border border-[#3d4a42]/50 hover:border-[#059669]/50 transition-colors">
                <div className="flex justify-between items-start">
                  <span className="text-[#bccac0] font-mono text-xs uppercase tracking-widest">
                    Satellite Data
                  </span>
                  <span className="px-2 py-0.5 bg-[#059669]/10 text-[#059669] text-[10px] uppercase font-mono tracking-widest">
                    Verified
                  </span>
                </div>
                <div className="font-serif text-lg font-semibold text-[#e1e3e4]">Satellite Irradiance Data</div>
                <div className="text-sm text-[#bccac0] leading-relaxed">
                  NOAA insolation models confirm optimal sunlight hours matching production curves for coordinates 34.05°N, 118.24°W.
                </div>
              </div>

              <div className="bg-[#1d2021] p-6 space-y-4 border border-[#3d4a42]/50 hover:border-[#059669]/50 transition-colors">
                <div className="flex justify-between items-start">
                  <span className="text-[#e1e3e4] font-mono text-xs uppercase tracking-widest">
                    Drone Inspection
                  </span>
                  <span className="px-2 py-0.5 bg-[#059669]/10 text-[#059669] text-[10px] uppercase font-mono tracking-widest">
                    Verified
                  </span>
                </div>
                <div className="font-serif text-lg font-semibold text-[#e1e3e4]">Visual Inspection</div>
                <div className="text-sm text-[#bccac0] leading-relaxed">
                  Drone imagery confirmed panel integrity. No physical obstruction anomalies detected on 2026-07-15.
                </div>
              </div>

              <div className="bg-[#1d2021] p-6 space-y-4 border border-[#3d4a42]/50 hover:border-[#059669]/50 transition-colors">
                <div className="flex justify-between items-start">
                  <span className="text-[#bccac0] font-mono text-xs uppercase tracking-widest">
                    Maintenance Log
                  </span>
                  <span className="px-2 py-0.5 bg-[#323536] text-[#bccac0] text-[10px] uppercase font-mono tracking-widest border border-[#3d4a42]/50">
                    Audited
                  </span>
                </div>
                <div className="font-serif text-lg font-semibold text-[#e1e3e4]">Maintenance Log PDF</div>
                <div className="text-sm text-[#bccac0] leading-relaxed">
                  Routine cleaning logged on July 12. Hash signature matches authorized contractor registry.
                </div>
              </div>
            </div>
          </section>

          <div className="h-px w-full bg-[#3d4a42]/30"></div>

          {/* Attestation Record Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="col-span-1 lg:col-span-4">
              <h2 className="text-xs font-mono text-[#bccac0] uppercase tracking-widest bg-[#0c0f10] inline-block self-start py-1 px-2 -ml-2 mb-8">
                02 / Attestation Record
              </h2>
              <div className="space-y-6">
                <div className="bg-[#1d2021] p-6 border border-[#3d4a42]/50 font-mono text-xs">
                  <div className="text-[#bccac0] uppercase tracking-widest mb-4 border-b border-[#3d4a42]/30 pb-2">
                    Network Resolution
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-[#059669] rounded-full"></div>
                    <div className="text-[#e1e3e4] font-semibold">BOT Chain: Success</div>
                  </div>
                  <div className="text-[#bccac0] break-all font-mono">
                    {attestation?.evidenceHash || "0x8f3c4a2b9e1c7f83b1657ff1fc53b92dc18148a1d65d"}
                  </div>
                </div>

                <div className="flex flex-col gap-4 font-mono text-xs">
                  <Link
                    href={`/attestation/${attestation?.id || "att-sf042"}`}
                    className="w-full bg-[#059669] hover:bg-[#10b981] text-black font-semibold py-4 px-6 uppercase tracking-widest transition-colors flex justify-between items-center"
                  >
                    <span>View Public Ledger</span>
                    <FiArrowRight className="text-base" />
                  </Link>

                  <Link
                    href="/dashboard/disputes"
                    className="w-full bg-transparent hover:bg-[#282a2b] text-[#e1e3e4] text-center font-semibold py-4 px-6 uppercase tracking-widest transition-colors border border-[#3d4a42]"
                  >
                    Initiate Dispute
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-8 bg-[#191c1d] border border-[#3d4a42]/30 p-8 md:p-12">
              <div className="text-xs font-mono text-[#bccac0] uppercase tracking-widest mb-8">
                Resolution Findings
              </div>
              <div className="text-sm text-[#e1e3e4] space-y-6 leading-relaxed">
                <p>
                  The submitted claim of 18,421 kWh production has been evaluated against primary telemetry and secondary environmental datasets. Correlation between primary meter intervals and grid absorption data is absolute (R² = 0.9998).
                </p>
                <p>
                  Secondary validation via satellite irradiance modeling yields an expected production envelope of 18,100 - 18,650 kWh for the specified coordinates and time range. The claimed value falls precisely within this margin.
                </p>
                <div className="p-4 bg-[#111415]/50 border-l-2 border-[#059669] font-mono text-xs text-[#059669] leading-relaxed">
                  &gt; EXECUTING VERIFICATION PROTOCOL V4.2<br />
                  &gt; TELEMETRY MATCH: TRUE<br />
                  &gt; MODEL VARIANCE: NOMINAL (0.012)<br />
                  &gt; CONCLUSION: CLAIM SUBSTANTIATED
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
