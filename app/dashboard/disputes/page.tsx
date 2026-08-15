"use client";

import { useState } from "react";
import Link from "next/link";
import { useDisputes, useSubmitDispute } from "@/hooks/use-attestation";
import { FiAlertTriangle, FiCheckCircle, FiPlus, FiUser } from "react-icons/fi";

export default function DisputesRegistryPage() {
  const { data, isLoading } = useDisputes();
  const submitDispute = useSubmitDispute();

  const [showModal, setShowModal] = useState(false);
  const [attestationId, setAttestationId] = useState("att-sf042");
  const [reason, setReason] = useState("");

  const disputes = data?.disputes || [];

  const handleDisputeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason || !attestationId) return;
    await submitDispute.mutateAsync({ attestationId, reason });
    setReason("");
    setShowModal(false);
  };

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
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#e1e3e4] bg-[#323536] ring-1 ring-[#3d4a42]"
              >
                Disputes
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#93000a] hover:bg-[#ba1a1a] text-[#ffb4ab] font-semibold px-6 py-3 uppercase tracking-widest transition-all flex items-center gap-2"
            >
              <FiPlus /> File Dispute
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
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[64px] w-full pb-32">
          {/* Header Section */}
          <div className="mb-16 mt-8">
            <h1 className="font-serif text-5xl font-bold text-[#e1e3e4] mb-4">Disputes Registry</h1>
            <p className="text-base text-[#bccac0] max-w-2xl leading-relaxed">
              Immutable ledger of challenged verifications. This interface tracks the lifecycle of claims subject to multi-party contestation and independent re-audit.
            </p>
          </div>

          {/* Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Active Disputes List */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-[#3d4a42]/30 pb-4 font-mono text-xs">
                <h2 className="font-serif text-xl font-semibold text-[#e1e3e4]">Challenged Claims</h2>
                <span className="text-[#bccac0] uppercase">
                  {disputes.length} Active
                </span>
              </div>

              {isLoading ? (
                <div className="p-8 text-center text-[#bccac0] font-mono">Loading disputes...</div>
              ) : (
                disputes.map((d) => (
                  <div
                    key={d.id}
                    className="w-full text-left bg-[#1d2021] border border-[#3d4a42] p-6 flex flex-col gap-4 relative overflow-hidden group"
                  >
                    <div className="absolute inset-y-0 left-0 w-1 bg-[#ffb4ab]"></div>
                    <div className="flex justify-between items-start font-mono text-xs">
                      <div className="flex flex-col">
                        <span className="text-[#bccac0] uppercase mb-1">Ref: {d.attestationId}</span>
                        <h3 className="font-serif text-xl font-semibold text-[#e1e3e4]">
                          {d.claimId}
                        </h3>
                      </div>
                      <div className="bg-[#93000a]/20 border border-[#93000a] text-[#ffb4ab] px-2 py-1 flex items-center gap-1 font-mono text-[10px] uppercase">
                        <FiAlertTriangle />
                        <span>{d.status}</span>
                      </div>
                    </div>
                    <p className="text-xs text-[#bccac0] leading-relaxed">{d.reason}</p>
                  </div>
                ))
              )}
            </div>

            {/* Right Column: Detail View */}
            <div className="lg:col-span-8 bg-[#1d2021] border border-[#3d4a42]/30 p-8 flex flex-col min-h-[600px]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-[#3d4a42]/30 pb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2 font-mono text-xs">
                    <span className="bg-[#93000a]/20 border border-[#93000a] text-[#ffb4ab] px-2 py-1 flex items-center gap-1 text-[10px] uppercase">
                      <FiAlertTriangle />
                      <span>Re-investigating</span>
                    </span>
                    <span className="text-[#bccac0] uppercase">ID: 42-8A9F-X99</span>
                  </div>
                  <h2 className="font-serif text-4xl text-[#e1e3e4] mt-4">Solar Farm #042</h2>
                  <p className="text-sm text-[#bccac0] mt-2 max-w-xl leading-relaxed">
                    Contestation raised regarding the reported energy output figures for July 2026. Independent telemetry analysis currently underway.
                  </p>
                </div>
                <div className="flex flex-col items-end text-right font-mono">
                  <span className="text-xs text-[#bccac0] uppercase tracking-widest mb-1">Current Confidence</span>
                  <div className="flex items-end gap-2 text-[#059669]">
                    <span className="font-serif text-5xl font-bold">87</span>
                    <span className="text-2xl pb-1">%</span>
                  </div>
                </div>
              </div>

              {/* Timeline Audit View */}
              <div className="flex-1">
                <h3 className="text-xs font-mono text-[#bccac0] uppercase tracking-widest mb-8 border-b border-[#3d4a42]/30 pb-2">
                  Audit Ledger
                </h3>
                <div className="relative pl-8 border-l border-[#3d4a42]/30 ml-4 flex flex-col gap-8 font-mono text-xs">
                  <div className="relative">
                    <div className="absolute w-3 h-3 rounded-full bg-[#059669] -left-[38px] top-1.5"></div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[#e1e3e4] uppercase font-semibold">Re-verified</span>
                        <span className="text-[#059669] font-bold">87%</span>
                      </div>
                      <p className="text-xs text-[#bccac0] font-sans leading-relaxed">
                        Secondary satellite telemetry confirms partial output. Discrepancy noted in sector 4 inverters. Adjusting total valuation model.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute w-3 h-3 rounded-full bg-[#ffb4ab] -left-[38px] top-1.5"></div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[#ffb4ab] uppercase font-semibold">Re-investigating</span>
                      </div>
                      <p className="text-xs text-[#bccac0] font-sans leading-relaxed">
                        Independent audit firm commissioned to review raw sensor data from July 01 - July 31.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for filing dispute */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="w-full max-w-lg border border-[#3d4a42] bg-[#191c1d] p-6 flex flex-col gap-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#3d4a42] pb-4">
                <h3 className="font-serif text-xl font-bold text-[#e1e3e4] flex items-center gap-2">
                  <FiAlertTriangle className="text-[#ffb4ab]" /> File Attestation Dispute
                </h3>
                <button onClick={() => setShowModal(false)} className="text-[#bccac0] hover:text-[#e1e3e4]">
                  ✕
                </button>
              </div>

              <form onSubmit={handleDisputeSubmit} className="flex flex-col gap-4 font-mono text-xs">
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase font-semibold text-[#bccac0] tracking-wider">
                    Attestation ID
                  </label>
                  <input
                    type="text"
                    required
                    value={attestationId}
                    onChange={(e) => setAttestationId(e.target.value)}
                    className="border border-[#3d4a42] bg-[#111415] p-3 text-sm text-[#e1e3e4] focus:border-[#ffb4ab] focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="uppercase font-semibold text-[#bccac0] tracking-wider">
                    Dispute Reason &amp; Evidence
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe the discrepancy or physical contradiction found in the attestation..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="border border-[#3d4a42] bg-[#111415] p-3 text-sm text-[#e1e3e4] focus:border-[#ffb4ab] focus:outline-none font-sans"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#3d4a42]">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 uppercase font-semibold text-[#bccac0] hover:text-[#e1e3e4]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitDispute.isPending}
                    className="border border-[#ffb4ab] bg-[#93000a] text-[#ffb4ab] font-semibold px-5 py-2 uppercase hover:bg-[#ba1a1a]"
                  >
                    {submitDispute.isPending ? "Submitting..." : "Submit Dispute"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
