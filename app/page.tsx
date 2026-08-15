import Link from "next/link";
import { Header } from "@/components/layout/header";
import { ConfidenceBadge } from "@/components/ui/confidence-badge";
import { FiCheckCircle, FiShield, FiCpu, FiArrowRight, FiFileText } from "react-icons/fi";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#111415] text-[#e1e3e4] flex flex-col font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative border-b border-[#282a2b] py-24 px-6">
        <div className="mx-auto max-w-5xl flex flex-col items-start gap-8">
          <div className="inline-flex items-center gap-2 border border-[#059669]/40 bg-[#059669]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#059669]">
            <span className="h-2 w-2 bg-[#059669]"></span>
            BOT Chain Attestation Infrastructure
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-[#e1e3e4] leading-[1.1]">
            Verify Reality. <br />
            <span className="text-[#059669]">Anchor the Proof.</span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-[#87948b] leading-relaxed">
            Probatio reconciles real-world asset evidence using a multi-agent AI verification pipeline, then cryptographically anchors the proof to BOT Chain as an immutable Reality Attestation.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/dashboard"
              className="border border-[#059669] bg-[#059669] text-black font-semibold px-8 py-3.5 text-sm tracking-wider uppercase hover:bg-[#10b981] transition-colors flex items-center gap-2"
            >
              Open Reality Ledger <FiArrowRight />
            </Link>

            <Link
              href="/dashboard/claims"
              className="border border-[#3d4a42] bg-[#191c1d] text-[#e1e3e4] font-semibold px-8 py-3.5 text-sm tracking-wider uppercase hover:border-[#059669] transition-colors flex items-center gap-2"
            >
              Explore Claims <FiFileText />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-20 px-6 border-b border-[#282a2b] bg-[#191c1d]">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-[#282a2b] bg-[#111415] p-8 flex flex-col gap-4">
            <div className="h-12 w-12 border border-[#059669]/40 bg-[#059669]/10 flex items-center justify-center text-[#059669] text-2xl font-bold">
              01
            </div>
            <h3 className="font-heading text-2xl font-semibold text-[#e1e3e4]">Evidence Reconciliation</h3>
            <p className="text-sm text-[#87948b] leading-relaxed">
              Upload PDF statements, CSV inverter logs, thermal imagery, and telemetry. Every file is deterministically hashed on upload before analysis.
            </p>
          </div>

          <div className="border border-[#282a2b] bg-[#111415] p-8 flex flex-col gap-4">
            <div className="h-12 w-12 border border-[#059669]/40 bg-[#059669]/10 flex items-center justify-center text-[#059669] text-2xl font-bold">
              02
            </div>
            <h3 className="font-heading text-2xl font-semibold text-[#e1e3e4]">Multi-Agent Pipeline</h3>
            <p className="text-sm text-[#87948b] leading-relaxed">
              Five specialized agents (Document, Vision, Data, Consistency, Reality) audit evidence in parallel to synthesize a mathematically grounded confidence score.
            </p>
          </div>

          <div className="border border-[#282a2b] bg-[#111415] p-8 flex flex-col gap-4">
            <div className="h-12 w-12 border border-[#059669]/40 bg-[#059669]/10 flex items-center justify-center text-[#059669] text-2xl font-bold">
              03
            </div>
            <h3 className="font-heading text-2xl font-semibold text-[#e1e3e4]">BOT Chain Attestation</h3>
            <p className="text-sm text-[#87948b] leading-relaxed">
              Verified findings and evidence hashes are committed directly to BOT Chain Mainnet, generating a publicly verifiable Reality Passport.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Proof / MVP Section */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-[#059669] uppercase tracking-widest">
              Live Reference Attestation
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#e1e3e4]">
              Solar Energy RWA Vertical MVP
            </h2>
          </div>

          <div className="border border-[#282a2b] bg-[#191c1d] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="font-mono text-xs text-[#87948b]">ASSET ID: solar-farm-042</span>
              <h3 className="font-heading text-xl md:text-2xl font-semibold text-[#e1e3e4]">
                &quot;Solar Farm #042 generated 18,421 kWh in July.&quot;
              </h3>
              <p className="text-xs text-[#87948b]">
                Evidence attached: 1 PDF Invoice • 1 CSV Telemetry Log (18,392 kWh recorded) • 1 Inspection Image • 1 Grid Operator Metadata JSON
              </p>
            </div>

            <div className="flex flex-col gap-4 items-end">
              <ConfidenceBadge confidence={91} status="VERIFIED" />
              <Link
                href="/dashboard/verification/claim-sf042"
                className="border border-[#059669] bg-transparent text-[#059669] text-xs font-semibold px-4 py-2 uppercase hover:bg-[#059669] hover:text-black transition-colors"
              >
                Inspect AI Pipeline Workspace →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#282a2b] bg-[#0c0f10] py-8 px-6 text-xs text-[#87948b]">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 font-mono">
            <span className="text-[#e1e3e4] font-bold">PROBATIO</span>
            <span>|</span>
            <span>BOT Chain Mainnet (Chain ID 677)</span>
          </div>
          <div>© 2026 Probatio Protocol. Real-world verification layer.</div>
        </div>
      </footer>
    </div>
  );
}
