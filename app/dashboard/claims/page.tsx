"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useClaims, useCreateClaim } from "@/hooks/use-claims";
import { FiSearch, FiPlus, FiFileText, FiCheckCircle } from "react-icons/fi";

export default function ClaimsLedgerPage() {
  const { data, isLoading } = useClaims();
  const createClaim = useCreateClaim();

  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [assetId, setAssetId] = useState("");
  const [claimText, setClaimText] = useState("");

  const claims = data?.claims || [];
  const filteredClaims = claims.filter(
    (c) =>
      c.assetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.claimText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetId || !claimText) return;
    await createClaim.mutateAsync({ assetId, claimText });
    setAssetId("");
    setClaimText("");
    setShowModal(false);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#282a2b] pb-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#059669] uppercase tracking-wider">
              Registry Database
            </span>
            <h1 className="font-heading text-3xl font-bold text-[#e1e3e4]">
              Claims Ledger
            </h1>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="border border-[#059669] bg-[#059669] text-black font-semibold text-xs px-4 py-2 uppercase hover:bg-[#10b981] transition-colors flex items-center gap-1.5"
          >
            <FiPlus /> Submit New Claim
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-3 border border-[#282a2b] bg-[#191c1d] px-4 py-2.5">
          <FiSearch className="text-[#87948b]" />
          <input
            type="text"
            placeholder="Search by Asset ID or claim statement..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-[#e1e3e4] placeholder-[#87948b] focus:outline-none"
          />
        </div>

        {/* Claims Table */}
        <div className="border border-[#282a2b] bg-[#191c1d]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#282a2b] bg-[#0c0f10] text-[#87948b] uppercase font-semibold tracking-wider">
                <tr>
                  <th className="p-4">Asset ID</th>
                  <th className="p-4">Claim Statement</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Confidence</th>
                  <th className="p-4 text-right">Created</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#282a2b]">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-[#87948b]">
                      Loading registry data...
                    </td>
                  </tr>
                ) : filteredClaims.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-[#87948b]">
                      No claims found.
                    </td>
                  </tr>
                ) : (
                  filteredClaims.map((claim) => (
                    <tr key={claim.id} className="hover:bg-[#282a2b]/40 transition-colors">
                      <td className="p-4 font-mono text-[#e1e3e4] font-semibold">{claim.assetId}</td>
                      <td className="p-4 text-[#e1e3e4] font-medium max-w-sm leading-relaxed">{claim.claimText}</td>
                      <td className="p-4">
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
                      <td className="p-4 text-right font-mono text-[#059669] font-bold text-sm">
                        {claim.confidence !== null ? `${claim.confidence}%` : "—"}
                      </td>
                      <td className="p-4 text-right font-mono text-[#87948b]">
                        {new Date(claim.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/dashboard/claims/${claim.id}`}
                          className="border border-[#3d4a42] bg-[#0c0f10] px-3 py-1 text-[11px] font-semibold text-[#059669] hover:bg-[#059669] hover:text-black transition-colors uppercase inline-block"
                        >
                          Inspect
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for creating a new claim */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="w-full max-w-lg border border-[#282a2b] bg-[#191c1d] p-6 flex flex-col gap-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#282a2b] pb-4">
                <h3 className="font-heading text-xl font-bold text-[#e1e3e4]">
                  Submit New Reality Claim
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-[#87948b] hover:text-[#e1e3e4]"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreate} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase font-semibold text-[#87948b] tracking-wider">
                    Asset ID / Identifier
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. solar-farm-042"
                    value={assetId}
                    onChange={(e) => setAssetId(e.target.value)}
                    className="border border-[#282a2b] bg-[#0c0f10] p-2.5 text-sm text-[#e1e3e4] focus:border-[#059669] focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase font-semibold text-[#87948b] tracking-wider">
                    Claim Statement
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder='e.g. "Solar Farm #042 generated 18,421 kWh in July."'
                    value={claimText}
                    onChange={(e) => setClaimText(e.target.value)}
                    className="border border-[#282a2b] bg-[#0c0f10] p-2.5 text-sm text-[#e1e3e4] focus:border-[#059669] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#282a2b]">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-xs uppercase font-semibold text-[#87948b] hover:text-[#e1e3e4]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createClaim.isPending}
                    className="border border-[#059669] bg-[#059669] text-black font-semibold text-xs px-5 py-2 uppercase hover:bg-[#10b981]"
                  >
                    {createClaim.isPending ? "Submitting..." : "Create Claim"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
