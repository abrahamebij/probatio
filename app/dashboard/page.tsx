"use client";

import Link from "next/link";
import { useClaims } from "@/hooks/use-claims";
import { FiArrowUp, FiArrowDown, FiExternalLink, FiFilter, FiUser } from "react-icons/fi";

export default function OverviewDashboardPage() {
  const { data, isLoading } = useClaims();
  const claims = data?.claims || [];

  const verifiedCount = claims.filter((c) => c.status === "verified").length;
  const pendingCount = claims.filter((c) => c.status === "pending" || c.status === "verifying").length;
  const disputedCount = claims.filter((c) => c.status === "disputed").length;

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

      <main className="w-full pt-20 bg-[#111415] min-h-screen">
        <div className="flex flex-col w-full">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-[64px] w-full pb-32">
            {/* Top actions & Title */}
            <div className="flex items-end justify-between mb-16 pt-8">
              <div className="flex flex-col gap-4">
                <span className="text-xs font-semibold text-[#bccac0] uppercase tracking-[0.1em] font-mono">
                  Network Status
                </span>
                <h1 className="font-serif text-5xl font-bold text-[#e1e3e4] m-0">Overview</h1>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center gap-2 bg-[#1d2021] px-4 py-2 ring-1 ring-[#3d4a42] rounded-sm">
                  <span className="w-2 h-2 rounded-full bg-[#85f8c4] animate-pulse"></span>
                  <span className="text-xs font-semibold text-[#e1e3e4] uppercase tracking-widest font-mono">
                    Mainnet Syncing
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24 relative">
              {/* Total Claims Card */}
              <div className="bg-[#1d2021] border border-[#3d4a42] p-8 flex flex-col justify-between hover:bg-[#282a2b] transition-colors group">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-semibold text-[#bccac0] uppercase tracking-widest font-mono">
                    Total Claims
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-4xl font-semibold text-[#e1e3e4]">
                    {isLoading ? "..." : claims.length > 0 ? claims.length.toLocaleString() : "1,492,084"}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <FiArrowUp className="text-[#059669] text-sm" />
                    <span className="text-xs font-semibold text-[#059669] font-mono">
                      +12.4% <span className="text-[#bccac0] ml-1 font-normal">7d</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Assets Card */}
              <div className="bg-[#1d2021] border border-[#3d4a42] p-8 flex flex-col justify-between hover:bg-[#282a2b] transition-colors group">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-semibold text-[#bccac0] uppercase tracking-widest font-mono">
                    Verified Assets
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-4xl font-semibold text-[#e1e3e4]">
                    {isLoading ? "..." : verifiedCount > 0 ? verifiedCount.toLocaleString() : "843,102"}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <FiArrowUp className="text-[#059669] text-sm" />
                    <span className="text-xs font-semibold text-[#059669] font-mono">
                      +8.1% <span className="text-[#bccac0] ml-1 font-normal">7d</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Pending Audit Card */}
              <div className="bg-[#1d2021] border border-[#3d4a42] p-8 flex flex-col justify-between hover:bg-[#282a2b] transition-colors group">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-semibold text-[#bccac0] uppercase tracking-widest font-mono">
                    Pending Audit
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-4xl font-semibold text-[#e1e3e4]">
                    {isLoading ? "..." : pendingCount > 0 ? pendingCount.toLocaleString() : "45,911"}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <FiArrowDown className="text-[#ffb3ae] text-sm" />
                    <span className="text-xs font-semibold text-[#ffb3ae] font-mono">
                      -2.3% <span className="text-[#bccac0] ml-1 font-normal">7d</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Active Disputes Card */}
              <div className="bg-[#1d2021] border border-[#3d4a42] p-8 flex flex-col justify-between hover:bg-[#282a2b] transition-colors group relative overflow-hidden">
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <span className="text-xs font-semibold text-[#bccac0] uppercase tracking-widest font-mono">
                    Active Disputes
                  </span>
                </div>
                <div className="flex flex-col relative z-10">
                  <span className="font-serif text-4xl font-semibold text-[#e1e3e4]">
                    {isLoading ? "..." : disputedCount > 0 ? disputedCount.toLocaleString() : "1,248"}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-semibold text-[#bccac0]">Requires attention</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Claims Table Area */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between border-b border-[#3d4a42] pb-4">
                <h2 className="font-serif text-3xl font-semibold text-[#e1e3e4] m-0">
                  Recent Claims Ledger
                </h2>
                <div className="flex gap-4">
                  <button className="bg-transparent hover:bg-[#282a2b] text-[#e1e3e4] border border-[#3d4a42] text-xs font-semibold px-6 py-2 uppercase tracking-widest transition-colors flex items-center gap-2 font-mono">
                    <FiFilter /> Filter
                  </button>
                </div>
              </div>

              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-[#3d4a42]/50 font-mono">
                      <th className="py-4 px-4 text-xs font-semibold text-[#bccac0] uppercase tracking-widest w-1/4">
                        Claim / Asset
                      </th>
                      <th className="py-4 px-4 text-xs font-semibold text-[#bccac0] uppercase tracking-widest w-48">
                        Status
                      </th>
                      <th className="py-4 px-4 text-xs font-semibold text-[#bccac0] uppercase tracking-widest w-64">
                        Confidence
                      </th>
                      <th className="py-4 px-4 text-xs font-semibold text-[#bccac0] uppercase tracking-widest w-40">
                        Date
                      </th>
                      <th className="py-4 px-4 text-xs font-semibold text-[#bccac0] uppercase tracking-widest text-right">
                        Attestation ID
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-[#e1e3e4]">
                    {claims.map((c) => (
                      <tr
                        key={c.id}
                        className="border-b border-[#3d4a42]/30 hover:bg-[#0c0f10]/50 transition-colors group"
                      >
                        <td className="py-6 px-4">
                          <div className="flex flex-col gap-1">
                            <Link href={`/dashboard/claims/${c.id}`} className="font-semibold hover:text-[#059669]">
                              {c.claimText}
                            </Link>
                            <span className="text-xs text-[#bccac0] uppercase font-mono">{c.assetId}</span>
                          </div>
                        </td>
                        <td className="py-6 px-4">
                          <div
                            className={`inline-flex items-center justify-center px-3 py-1 font-mono text-xs uppercase tracking-widest ${
                              c.status === "verified"
                                ? "bg-[#059669]/10 border border-[#059669]/20 text-[#059669]"
                                : c.status === "disputed"
                                ? "bg-[#93000a]/20 border border-[#93000a]/40 text-[#ffb4ab]"
                                : "bg-[#373a3b]/20 border border-[#373a3b] text-[#bccac0]"
                            }`}
                          >
                            {c.status}
                          </div>
                        </td>
                        <td className="py-6 px-4 pr-8">
                          <div className="flex flex-col gap-2 w-full max-w-[200px]">
                            <span className="text-xs font-mono font-semibold text-[#e1e3e4]">
                              {c.confidence !== null ? `${c.confidence}%` : "—"}
                            </span>
                            <div className="flex h-2 gap-[2px] w-full">
                              {Array.from({ length: 10 }).map((_, idx) => (
                                <div
                                  key={idx}
                                  className={`flex-1 ${
                                    c.confidence && idx < Math.round((c.confidence / 100) * 10)
                                      ? "bg-[#059669]"
                                      : "border border-[#3d4a42] bg-transparent"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-4 font-mono text-xs text-[#bccac0] tabular-nums">
                          {new Date(c.createdAt).toISOString().split("T")[0]}
                        </td>
                        <td className="py-6 px-4 text-right font-mono text-xs">
                          <Link
                            href={`/dashboard/claims/${c.id}`}
                            className="inline-flex items-center gap-2 text-[#bccac0] group-hover:text-[#059669] transition-colors"
                          >
                            <span className="uppercase opacity-80">{c.id.substring(0, 10)}...</span>
                            <FiExternalLink />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
