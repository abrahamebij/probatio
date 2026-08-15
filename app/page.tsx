"use client";

import Link from "next/link";
import { FiArrowRight, FiShield, FiUser, FiCheckCircle } from "react-icons/fi";

export default function LandingPage() {
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
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#e1e3e4] bg-[#323536] ring-1 ring-[#3d4a42]"
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

          <div className="flex items-center gap-6">
            <Link
              href="/dashboard/claims"
              className="bg-[#059669] hover:bg-[#10b981] text-black font-semibold text-xs px-6 py-3 uppercase tracking-widest transition-all font-mono"
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
      <main className="w-full pt-20 bg-[#111415] flex-1">
        {/* Hero Section */}
        <section className="w-full relative py-28 overflow-hidden bg-[#111415] flex flex-col justify-center min-h-[850px]">
          <div aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern height="64" id="grid" patternUnits="userSpaceOnUse" width="64">
                  <path className="text-[#3d4a42]" d="M 64 0 L 0 0 0 64" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                </pattern>
              </defs>
              <rect fill="url(#grid)" height="100%" width="100%"></rect>
            </svg>
          </div>

          <div className="max-w-[1280px] mx-auto px-6 lg:px-[64px] w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="col-span-1 lg:col-span-6 flex flex-col items-start space-y-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#282a2b] outline outline-1 outline-[#3d4a42] rounded-full mb-4">
                <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse"></span>
                <span className="text-xs font-semibold text-[#e1e3e4] uppercase tracking-widest font-mono">
                  Network Live • Height: 18.2M
                </span>
              </div>

              <h1 className="font-serif text-5xl lg:text-6xl font-bold text-[#e1e3e4] m-0 pr-12 leading-tight">
                Verify reality. <br />
                <span className="text-[#059669] opacity-90">Anchor the proof.</span>
              </h1>

              <p className="text-lg text-[#bccac0] max-w-lg m-0 leading-relaxed">
                Probatio provides absolute cryptographic certainty for physical-world data. Institutional-grade verification utilizing AI reconciliation and immutable ledger technology.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/dashboard/claims"
                  className="bg-[#059669] hover:bg-[#10b981] text-black font-semibold text-xs px-8 py-4 uppercase font-mono tracking-widest transition-all"
                >
                  Verify a claim
                </Link>
                <Link
                  href="/dashboard"
                  className="bg-transparent text-[#e1e3e4] font-semibold text-xs px-8 py-4 outline outline-1 outline-[#87948b] hover:bg-[#323536] transition-all uppercase tracking-widest font-mono"
                >
                  Explore attestations
                </Link>
              </div>
            </div>

            {/* Diagram Component */}
            <div className="col-span-1 lg:col-span-6 mt-16 lg:mt-0 relative h-[500px] w-full bg-[#1d2021] border border-[#3d4a42]/50 p-8 flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-4 text-xs font-semibold text-[#bccac0] uppercase tracking-widest font-mono">
                Fig 1. Consensus Model
              </div>

              <div className="w-full flex-1 flex flex-col items-center justify-center space-y-8 mt-8 font-mono">
                {/* Step 1 */}
                <div className="w-full max-w-sm flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
                  <span className="text-xs text-[#e1e3e4] uppercase w-32 text-right mr-4 font-semibold">Real-World Claim</span>
                  <div className="h-[1px] flex-1 bg-[#3d4a42] relative">
                    <div className="absolute top-1/2 right-0 w-2 h-2 bg-[#e1e3e4] transform -translate-y-1/2 rounded-full"></div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="w-full max-w-sm flex items-center justify-between pl-8 opacity-90 hover:opacity-100 transition-opacity">
                  <span className="text-xs text-[#059669] uppercase w-32 text-right mr-4 font-semibold">Evidence Input</span>
                  <div className="h-[1px] flex-1 bg-[#059669]/50 relative">
                    <div className="absolute top-1/2 right-0 w-2 h-2 bg-[#059669] transform -translate-y-1/2 rounded-full shadow-[0_0_8px_rgba(5,150,105,0.5)]"></div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="w-full max-w-sm flex items-center justify-between pl-16">
                  <span className="text-xs text-[#e1e3e4] uppercase w-32 text-right mr-4 font-bold bg-[#373a3b] px-2 py-1">AI Verification</span>
                  <div className="h-[1px] flex-1 bg-[#87948b] relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-[#e1e3e4]"></div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="w-full max-w-sm flex items-center justify-between pl-8 opacity-90 hover:opacity-100 transition-opacity">
                  <span className="text-xs text-[#85f8c4] uppercase w-32 text-right mr-4 font-semibold">Reality Attestation</span>
                  <div className="h-[1px] flex-1 bg-[#85f8c4]/50 relative">
                    <div className="absolute top-1/2 right-0 w-3 h-3 bg-[#85f8c4] transform -translate-y-1/2 rounded-sm shadow-[0_0_12px_rgba(133,248,196,0.6)]"></div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="w-full max-w-sm flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
                  <span className="text-xs text-[#bccac0] uppercase w-32 text-right mr-4 font-semibold">BOT Chain Anchor</span>
                  <div className="h-[1px] flex-1 bg-[#3d4a42]/30 relative">
                    <div className="absolute top-1/2 right-0 w-4 h-4 bg-transparent outline outline-2 outline-[#3d4a42] transform -translate-y-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="w-full bg-[#1d2021] py-28 border-y border-[#3d4a42]/20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-[64px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col space-y-6">
                <div className="text-5xl font-serif text-[#3d4a42] font-bold">01</div>
                <h3 className="font-serif text-3xl font-semibold text-[#e1e3e4] m-0">Submit Evidence.</h3>
                <p className="text-sm text-[#bccac0] m-0 leading-relaxed">
                  Provide structured raw data, sensor logs, or cryptographic proofs representing the physical event.
                </p>
                <div className="h-1 w-12 bg-[#3d4a42]/50 mt-4"></div>
              </div>

              <div className="flex flex-col space-y-6">
                <div className="text-5xl font-serif text-[#3d4a42] font-bold">02</div>
                <h3 className="font-serif text-3xl font-semibold text-[#e1e3e4] m-0">AI Reconciles.</h3>
                <p className="text-sm text-[#bccac0] m-0 leading-relaxed">
                  Deterministic machine learning models analyze inputs against historical benchmarks and cross-reference APIs to establish a confidence score.
                </p>
                <div className="h-1 w-12 bg-[#3d4a42]/50 mt-4"></div>
              </div>

              <div className="flex flex-col space-y-6">
                <div className="text-5xl font-serif text-[#059669]">03</div>
                <h3 className="font-serif text-3xl font-semibold text-[#059669] m-0">Attest on BOT Chain.</h3>
                <p className="text-sm text-[#bccac0] m-0 leading-relaxed">
                  A permanent, verifiable Reality Passport is minted, anchoring the truth definitively to the immutable ledger.
                </p>
                <div className="h-1 w-12 bg-[#059669]/50 mt-4"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study / Passport Preview */}
        <section className="w-full bg-[#111415] py-28">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-[64px] grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="col-span-1 lg:col-span-4 flex flex-col justify-center mb-16 lg:mb-0">
              <span className="text-xs font-semibold text-[#bccac0] uppercase tracking-widest mb-4 block font-mono">
                Case Study
              </span>
              <h2 className="font-serif text-4xl font-bold text-[#e1e3e4] m-0 mb-6 leading-tight">
                Live Reality Passport
              </h2>
              <p className="text-sm text-[#bccac0] m-0 mb-8 leading-relaxed">
                An active verification evaluating renewable energy output. The system processes inverter logs against satellite irradiance data to confirm the claim.
              </p>
              <Link
                href="/dashboard/passports/solar-farm-042"
                className="text-xs font-semibold text-[#059669] uppercase tracking-widest hover:text-[#10b981] inline-flex items-center transition-colors font-mono"
              >
                View Full Passport <FiArrowRight className="ml-2 text-base" />
              </Link>
            </div>

            <div className="col-span-1 lg:col-span-8 lg:pl-12">
              <div className="w-full bg-[#191c1d] border border-[#3d4a42] p-8 shadow-xl">
                <div className="flex justify-between items-start mb-12 border-b border-[#3d4a42]/30 pb-6">
                  <div>
                    <h3 className="font-serif text-3xl font-semibold text-[#e1e3e4] m-0 mb-2">Solar Farm #042</h3>
                    <span className="text-xs text-[#bccac0] uppercase tracking-widest block font-mono">
                      ADDR: 0x8fB4...c9A2
                    </span>
                  </div>
                  <div className="bg-[#059669]/10 text-[#059669] text-xs font-semibold px-3 py-1 uppercase tracking-widest font-mono">
                    Status: Verified
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div>
                    <span className="text-xs text-[#bccac0] uppercase tracking-widest block mb-2 font-mono">
                      Claimed Yield
                    </span>
                    <div className="text-lg font-semibold text-[#e1e3e4]">18,421 kWh</div>
                  </div>
                  <div>
                    <span className="text-xs text-[#bccac0] uppercase tracking-widest block mb-2 font-mono">
                      Verification Timestamp
                    </span>
                    <div className="text-lg font-semibold text-[#e1e3e4] font-mono">1698745200 (UTC)</div>
                  </div>
                </div>

                <div className="w-full bg-[#111415] p-6 border border-[#3d4a42]/50 relative">
                  <div className="absolute -top-3 left-6 bg-[#111415] px-2 text-xs font-semibold text-[#bccac0] uppercase tracking-widest font-mono">
                    Confidence Metric
                  </div>
                  <div className="flex justify-between items-end mb-4 mt-2 font-mono">
                    <span className="text-sm text-[#e1e3e4]">AI Reconciliation</span>
                    <span className="text-xl font-bold text-[#059669]">91%</span>
                  </div>

                  {/* 10 Segment Bar */}
                  <div className="w-full flex gap-1 h-8">
                    <div className="flex-1 bg-[#059669]"></div>
                    <div className="flex-1 bg-[#059669]"></div>
                    <div className="flex-1 bg-[#059669]"></div>
                    <div className="flex-1 bg-[#059669]"></div>
                    <div className="flex-1 bg-[#059669]"></div>
                    <div className="flex-1 bg-[#059669]"></div>
                    <div className="flex-1 bg-[#059669]"></div>
                    <div className="flex-1 bg-[#059669]"></div>
                    <div className="flex-1 bg-[#059669]"></div>
                    <div className="flex-1 bg-transparent border border-[#3d4a42]"></div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-[#bccac0] text-xs font-mono">
                    <span className="uppercase tracking-widest">Sources: Inverter API, NOAA Satellite</span>
                    <FiCheckCircle className="text-[#059669] text-base" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#0c0f10] border-t border-[#3d4a42]/20 py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[64px] flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 text-[#bccac0]">
            <span className="font-mono text-xs tracking-widest uppercase">Probatio Immutable Registry</span>
          </div>
          <nav className="flex gap-6 font-mono text-xs">
            <Link className="text-[#bccac0] hover:text-[#059669] transition-colors uppercase" href="/dashboard">
              Network Status
            </Link>
            <Link className="text-[#bccac0] hover:text-[#059669] transition-colors uppercase" href="/dashboard/claims">
              Documentation
            </Link>
            <Link className="text-[#bccac0] hover:text-[#059669] transition-colors uppercase" href="/attestation/att-sf042">
              Legal
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
