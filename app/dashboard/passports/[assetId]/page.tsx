"use client";

import { use } from "react";
import Link from "next/link";
import { useClaim } from "@/hooks/use-claims";
import { FiUser } from "react-icons/fi";

export default function RealityPassportPage({
  params,
}: {
  params: Promise<{ assetId: string }>;
}) {
  const { assetId } = use(params);
  const { data } = useClaim(assetId);
  const claim = data?.claim;

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
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#e1e3e4] bg-[#323536] ring-1 ring-[#3d4a42]"
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

      {/* Main Content */}
      <main className="w-full pt-20 bg-[#111415] min-h-screen">
        <div className="flex flex-col w-full max-w-[1280px] mx-auto px-6 lg:px-[64px] py-12 gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 font-mono text-xs">
                  <h1 className="font-serif text-5xl font-bold text-[#e1e3e4]">
                    {assetId === "solar-farm-042" ? "Solar Farm #042" : assetId}
                  </h1>
                  <div className="bg-[#059669]/10 text-[#059669] px-3 py-1 font-mono text-xs uppercase tracking-widest border border-[#059669]/20">
                    Verified
                  </div>
                </div>
                <p className="text-base text-[#bccac0] max-w-2xl leading-relaxed">
                  Reality Passport establishing the physical existence, operational capacity, and regulatory compliance of energy generation asset #{assetId}.
                </p>
              </div>

              <div className="flex flex-col items-end gap-2 bg-[#1d2021] p-6 border border-[#3d4a42] shadow-lg min-w-[280px]">
                <span className="text-xs font-mono text-[#bccac0] uppercase tracking-widest">
                  Global Confidence
                </span>
                <div className="flex items-end gap-3 font-serif">
                  <span className="text-6xl text-[#059669] font-bold">
                    {claim?.confidence ? `${claim.confidence}%` : "91%"}
                  </span>
                </div>
                <div className="w-full flex gap-1 mt-4 h-2">
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 ${
                        idx < 9 ? "bg-[#059669]" : "border border-[#3d4a42] bg-transparent"
                      }`}
                    />
                  ))}
                </div>
                <div className="w-full flex justify-between mt-2 font-mono text-xs text-[#bccac0]">
                  <span>T-00:00</span>
                  <span>Last Ver: Today</span>
                </div>
              </div>
            </div>

            {/* Asset Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
              <div className="bg-[#1d2021] p-4 border border-[#3d4a42] flex flex-col gap-2">
                <span className="text-[#bccac0] uppercase">Asset Type</span>
                <span className="text-[#e1e3e4] font-semibold text-sm">Energy Generation</span>
              </div>
              <div className="bg-[#1d2021] p-4 border border-[#3d4a42] flex flex-col gap-2">
                <span className="text-[#bccac0] uppercase">Location</span>
                <span className="text-[#e1e3e4] font-semibold text-sm">Nevada, USA</span>
              </div>
              <div className="bg-[#1d2021] p-4 border border-[#3d4a42] flex flex-col gap-2">
                <span className="text-[#bccac0] uppercase">Capacity</span>
                <span className="text-[#e1e3e4] font-semibold text-sm">150 MW</span>
              </div>
              <div className="bg-[#1d2021] p-4 border border-[#3d4a42] flex flex-col gap-2">
                <span className="text-[#bccac0] uppercase">Registry ID</span>
                <span className="text-[#e1e3e4] font-semibold text-sm">0x7F...4A2</span>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-[#3d4a42]/50"></div>

          {/* History Timeline & Evidence Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 flex flex-col gap-16">
              <section className="flex flex-col gap-8">
                <h2 className="font-serif text-3xl font-semibold text-[#e1e3e4]">Verification History</h2>
                <div className="relative pl-8 flex flex-col gap-12 border-l border-[#3d4a42]">
                  <div className="relative">
                    <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-[#111415] border-2 border-[#059669]"></div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-4 font-mono text-xs">
                        <span className="text-[#059669] uppercase tracking-widest">Aug 14, 2026 • 14:00 UTC</span>
                        <span className="bg-[#059669]/10 text-[#059669] px-2 py-0.5 uppercase border border-[#059669]/20">
                          Production Telemetry
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-[#e1e3e4]">
                        Nominal Power Generation Logged
                      </h3>
                      <p className="text-sm text-[#bccac0] leading-relaxed">
                        Inverter logs matched against expected irradiance models from satellite weather data. Output steady at 142 MW.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-[#111415] border-2 border-[#3d4a42]"></div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-4 font-mono text-xs">
                        <span className="text-[#bccac0] uppercase tracking-widest">Aug 12, 2026 • 09:30 UTC</span>
                        <span className="bg-[#323536] text-[#e1e3e4] px-2 py-0.5 uppercase border border-[#3d4a42]">
                          Physical Inspection
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-[#e1e3e4]">
                        Routine Drone Survey
                      </h3>
                      <p className="text-sm text-[#bccac0] leading-relaxed">
                        Thermal imaging sweep identified 3 anomalous panels in Sector G. Maintenance order generated on-chain.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Evidence Overview Side Panel */}
            <div className="lg:col-span-4 flex flex-col gap-12">
              <section className="bg-[#1d2021] p-8 border border-[#3d4a42] shadow-lg flex flex-col gap-6">
                <h3 className="font-serif text-xl font-semibold text-[#e1e3e4] border-b border-[#3d4a42] pb-4">
                  Evidence Overview
                </h3>
                <div className="flex flex-col gap-4 font-mono text-xs">
                  <div className="flex justify-between text-[#e1e3e4]">
                    <span>IoT Meters</span>
                    <span className="font-bold">14 Active</span>
                  </div>
                  <div className="flex justify-between text-[#e1e3e4]">
                    <span>Satellite Passes</span>
                    <span className="font-bold">Daily</span>
                  </div>
                  <div className="flex justify-between text-[#e1e3e4]">
                    <span>Inspections</span>
                    <span className="font-bold">Quarterly</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
