"use client";

import { useState } from "react";
import Link from "next/link";
import { useClaims, useCreateClaim } from "@/hooks/use-claims";
import { FiSearch, FiPlus, FiUser } from "react-icons/fi";

export default function ClaimsLedgerPage() {
  const { data, isLoading } = useClaims();
  const createClaim = useCreateClaim();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [assetId, setAssetId] = useState("");
  const [claimText, setClaimText] = useState("");

  const claims = data?.claims || [];
  const filteredClaims = claims.filter((c) => {
    const matchesSearch =
      c.assetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.claimText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetId || !claimText) return;
    await createClaim.mutateAsync({ assetId, claimText });
    setAssetId("");
    setClaimText("");
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

          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#059669] hover:bg-[#10b981] text-black font-semibold text-xs px-6 py-3 uppercase tracking-widest transition-all font-mono flex items-center gap-2"
            >
              <FiPlus /> Submit Claim
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
        <div className="flex flex-col w-full relative">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-[64px] w-full py-16 relative z-10 flex flex-col gap-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#3d4a42]/30">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#059669]"></span>
                  <span className="text-xs font-semibold text-[#059669] tracking-widest uppercase font-mono">
                    Registry Ledger
                  </span>
                </div>
                <h1 className="font-serif text-5xl font-bold text-[#e1e3e4] m-0">Claims Architecture</h1>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-center bg-[#1d2021] p-2 border border-[#3d4a42]/30">
                <div className="relative w-full md:w-64">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bccac0]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search hash, asset, or entity..."
                    className="w-full bg-[#111415] text-[#e1e3e4] text-xs font-mono pl-10 pr-4 py-3 border border-[#3d4a42]/30 focus:outline-none focus:border-[#059669] placeholder:text-[#bccac0]"
                  />
                </div>

                <div className="flex gap-2 font-mono text-xs">
                  {["all", "pending", "verified", "disputed"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-4 py-3 uppercase tracking-wider transition-colors ${
                        statusFilter === st
                          ? "bg-[#111415] text-[#059669] border border-[#059669]"
                          : "bg-[#111415] text-[#bccac0] border border-[#3d4a42]/30 hover:border-[#3d4a42]"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </header>

            {/* Claims Table / Grid */}
            <div className="w-full overflow-x-auto pb-8">
              <div className="min-w-[1000px] flex flex-col gap-4">
                <div className="grid grid-cols-12 gap-6 px-6 py-3 border-b border-[#3d4a42]/30 text-[#bccac0] font-mono text-xs uppercase tracking-widest">
                  <div className="col-span-3">Entity / Claim</div>
                  <div className="col-span-2">Asset Identifier</div>
                  <div className="col-span-2">Consensus Status</div>
                  <div className="col-span-3">Confidence Index</div>
                  <div className="col-span-2 text-right">Created Date</div>
                </div>

                {isLoading ? (
                  <div className="p-8 text-center text-[#bccac0] font-mono">Loading claims...</div>
                ) : filteredClaims.length === 0 ? (
                  <div className="p-8 text-center text-[#bccac0] font-mono">No matching claims found.</div>
                ) : (
                  filteredClaims.map((claim) => (
                    <Link
                      key={claim.id}
                      href={`/dashboard/claims/${claim.id}`}
                      className="grid grid-cols-12 gap-6 px-6 py-6 bg-[#1d2021] border border-[#3d4a42]/30 hover:border-[#3d4a42] transition-colors items-center group relative overflow-hidden"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#059669] scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                      <div className="col-span-3 flex flex-col gap-1">
                        <span className="font-serif text-lg font-semibold text-[#e1e3e4]">
                          {claim.claimText}
                        </span>
                        <span className="font-mono text-xs text-[#bccac0] uppercase truncate">
                          id: {claim.id}
                        </span>
                      </div>

                      <div className="col-span-2 font-mono text-xs text-[#e1e3e4]">
                        {claim.assetId}
                      </div>

                      <div className="col-span-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest border ${
                            claim.status === "verified"
                              ? "bg-[#059669]/10 text-[#059669] border-[#059669]/20"
                              : claim.status === "disputed"
                              ? "bg-[#93000a]/20 text-[#ffb4ab] border-[#93000a]/30"
                              : "bg-[#373a3b]/10 text-[#bccac0] border-[#373a3b]"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {claim.status}
                        </span>
                      </div>

                      <div className="col-span-3 flex flex-col gap-2">
                        <div className="flex justify-between items-end font-mono text-xs">
                          <span className="text-[#bccac0] uppercase">Confidence</span>
                          <span className="text-[#059669]">
                            {claim.confidence !== null ? `${claim.confidence}%` : "Pending"}
                          </span>
                        </div>
                        <div className="flex gap-[2px] h-2">
                          {Array.from({ length: 10 }).map((_, idx) => (
                            <div
                              key={idx}
                              className={`flex-1 ${
                                claim.confidence && idx < Math.round((claim.confidence / 100) * 10)
                                  ? "bg-[#059669]"
                                  : "border border-[#3d4a42] bg-transparent"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="col-span-2 flex flex-col items-end gap-1 text-[#bccac0] font-mono text-xs">
                        <span>{new Date(claim.createdAt).toISOString().split("T")[0]}</span>
                        <span className="text-[10px]">12:00 UTC</span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal for creating a new claim */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="w-full max-w-lg border border-[#3d4a42] bg-[#191c1d] p-6 flex flex-col gap-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#3d4a42] pb-4">
                <h3 className="font-serif text-xl font-bold text-[#e1e3e4]">
                  Submit New Reality Claim
                </h3>
                <button onClick={() => setShowModal(false)} className="text-[#bccac0] hover:text-[#e1e3e4]">
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreate} className="flex flex-col gap-4 font-mono text-xs">
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase font-semibold text-[#bccac0] tracking-wider">
                    Asset Identifier / ID
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. solar-farm-042"
                    value={assetId}
                    onChange={(e) => setAssetId(e.target.value)}
                    className="border border-[#3d4a42] bg-[#111415] p-3 text-sm text-[#e1e3e4] focus:border-[#059669] focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="uppercase font-semibold text-[#bccac0] tracking-wider">
                    Claim Statement
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder='e.g. "Solar Farm #042 generated 18,421 kWh in July."'
                    value={claimText}
                    onChange={(e) => setClaimText(e.target.value)}
                    className="border border-[#3d4a42] bg-[#111415] p-3 text-sm text-[#e1e3e4] focus:border-[#059669] focus:outline-none font-sans"
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
                    disabled={createClaim.isPending}
                    className="border border-[#059669] bg-[#059669] text-black font-semibold px-5 py-2 uppercase hover:bg-[#10b981]"
                  >
                    {createClaim.isPending ? "Submitting..." : "Create Claim"}
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
