"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ConfidenceBadge } from "@/components/ui/confidence-badge";
import { useClaims } from "@/hooks/use-claims";
import { FiCheckCircle, FiClock, FiAlertTriangle, FiFileText, FiArrowRight } from "react-icons/fi";

export default function OverviewDashboardPage() {
  const { data, isLoading } = useClaims();
  const claims = data?.claims || [];

  const verifiedCount = claims.filter((c) => c.status === "verified").length;
  const pendingCount = claims.filter((c) => c.status === "pending" || c.status === "verifying").length;
  const disputedCount = claims.filter((c) => c.status === "disputed").length;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#282a2b] pb-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#059669] uppercase tracking-wider">
              System Metrics
            </span>
            <h1 className="font-heading text-3xl font-bold text-[#e1e3e4]">
              Reality Ledger Overview
            </h1>
          </div>

          <Link
            href="/dashboard/claims"
            className="border border-[#059669] bg-[#059669] text-black font-semibold text-xs px-4 py-2 uppercase hover:bg-[#10b981] transition-colors"
          >
            Submit New Claim +
          </Link>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="border border-[#282a2b] bg-[#191c1d] p-5 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-[#87948b] uppercase font-semibold">
              <span>Total Claims</span>
              <FiFileText />
            </div>
            <div className="font-mono text-3xl font-bold text-[#e1e3e4]">
              {isLoading ? "..." : claims.length}
            </div>
          </div>

          <div className="border border-[#282a2b] bg-[#191c1d] p-5 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-[#059669] uppercase font-semibold">
              <span>Verified Proofs</span>
              <FiCheckCircle />
            </div>
            <div className="font-mono text-3xl font-bold text-[#059669]">
              {isLoading ? "..." : verifiedCount}
            </div>
          </div>

          <div className="border border-[#282a2b] bg-[#191c1d] p-5 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-[#87948b] uppercase font-semibold">
              <span>Pending Pipeline</span>
              <FiClock />
            </div>
            <div className="font-mono text-3xl font-bold text-[#e1e3e4]">
              {isLoading ? "..." : pendingCount}
            </div>
          </div>

          <div className="border border-[#282a2b] bg-[#191c1d] p-5 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-[#ffb4ab] uppercase font-semibold">
              <span>Disputed Claims</span>
              <FiAlertTriangle />
            </div>
            <div className="font-mono text-3xl font-bold text-[#ffb4ab]">
              {isLoading ? "..." : disputedCount}
            </div>
          </div>
        </div>

        {/* Recent Ledger Activity Table */}
        <div className="border border-[#282a2b] bg-[#191c1d] flex flex-col">
          <div className="p-4 border-b border-[#282a2b] flex items-center justify-between">
            <h2 className="font-heading text-xl font-semibold text-[#e1e3e4]">
              Recent Activity Ledger
            </h2>
            <span className="text-xs font-mono text-[#87948b]">
              Updated Real-Time
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#282a2b] bg-[#0c0f10] text-[#87948b] uppercase font-semibold tracking-wider">
                <tr>
                  <th className="p-3.5">Asset ID</th>
                  <th className="p-3.5">Claim Statement</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Confidence</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#282a2b]">
                {claims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-[#282a2b]/40 transition-colors">
                    <td className="p-3.5 font-mono text-[#e1e3e4] font-semibold">{claim.assetId}</td>
                    <td className="p-3.5 text-[#e1e3e4] max-w-xs truncate">{claim.claimText}</td>
                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2 py-0.5 uppercase font-semibold text-[10px] ${
                          claim.status === "verified"
                            ? "bg-[#059669]/20 text-[#059669]"
                            : claim.status === "disputed"
                            ? "bg-[#93000a]/40 text-[#ffb4ab]"
                            : "bg-[#282a2b] text-[#87948b]"
                        }`}
                      >
                        {claim.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right font-mono text-[#059669] font-bold">
                      {claim.confidence !== null ? `${claim.confidence}%` : "—"}
                    </td>
                    <td className="p-3.5 text-right">
                      <Link
                        href={`/dashboard/claims/${claim.id}`}
                        className="text-[#059669] hover:underline flex items-center justify-end gap-1 font-medium"
                      >
                        Details <FiArrowRight />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
