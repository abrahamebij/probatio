"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useDisputes, useSubmitDispute } from "@/hooks/use-attestation";
import { FiAlertCircle, FiPlus, FiCheckCircle, FiClock, FiFileText } from "react-icons/fi";

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
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#282a2b] pb-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#ffb4ab] uppercase tracking-wider font-mono">
              AUDIT GOVERNANCE
            </span>
            <h1 className="font-heading text-3xl font-bold text-[#e1e3e4]">
              Disputes Registry
            </h1>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="border border-[#ffb4ab] bg-[#93000a]/40 text-[#ffb4ab] font-semibold text-xs px-4 py-2 uppercase hover:bg-[#93000a] transition-colors flex items-center gap-1.5"
          >
            <FiPlus /> File Attestation Dispute
          </button>
        </div>

        {/* Disputes List */}
        <div className="border border-[#282a2b] bg-[#191c1d] flex flex-col">
          <div className="p-4 border-b border-[#282a2b] flex items-center justify-between">
            <h2 className="font-heading text-xl font-semibold text-[#e1e3e4]">
              Active &amp; Historical Disputes ({disputes.length})
            </h2>
            <span className="text-xs font-mono text-[#87948b]">
              Auditable Governance Log
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#282a2b] bg-[#0c0f10] text-[#87948b] uppercase font-semibold tracking-wider">
                <tr>
                  <th className="p-4">Dispute ID</th>
                  <th className="p-4">Attestation ID</th>
                  <th className="p-4">Dispute Reason</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Filed Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#282a2b]">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[#87948b]">
                      Loading disputes...
                    </td>
                  </tr>
                ) : disputes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[#87948b]">
                      No disputes filed.
                    </td>
                  </tr>
                ) : (
                  disputes.map((d) => (
                    <tr key={d.id} className="hover:bg-[#282a2b]/40 transition-colors">
                      <td className="p-4 font-mono text-[#e1e3e4] font-semibold">{d.id}</td>
                      <td className="p-4 font-mono text-[#059669] font-medium">{d.attestationId}</td>
                      <td className="p-4 text-[#e1e3e4] max-w-md leading-relaxed">{d.reason}</td>
                      <td className="p-4">
                        <span className="inline-block px-2 py-0.5 uppercase font-semibold text-[10px] bg-[#93000a]/30 text-[#ffb4ab]">
                          {d.status}
                        </span>
                      </td>
                      <td className="p-4 text-right font-mono text-[#87948b]">
                        {new Date(d.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for filing dispute */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="w-full max-w-lg border border-[#282a2b] bg-[#191c1d] p-6 flex flex-col gap-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#282a2b] pb-4">
                <h3 className="font-heading text-xl font-bold text-[#e1e3e4] flex items-center gap-2">
                  <FiAlertCircle className="text-[#ffb4ab]" /> File Attestation Dispute
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-[#87948b] hover:text-[#e1e3e4]"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleDisputeSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase font-semibold text-[#87948b] tracking-wider">
                    Attestation ID
                  </label>
                  <input
                    type="text"
                    required
                    value={attestationId}
                    onChange={(e) => setAttestationId(e.target.value)}
                    className="border border-[#282a2b] bg-[#0c0f10] p-2.5 text-sm font-mono text-[#e1e3e4] focus:border-[#ffb4ab] focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase font-semibold text-[#87948b] tracking-wider">
                    Dispute Reason &amp; Counter-Evidence Summary
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe the discrepancy or physical contradiction found in the attestation..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="border border-[#282a2b] bg-[#0c0f10] p-2.5 text-sm text-[#e1e3e4] focus:border-[#ffb4ab] focus:outline-none"
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
                    disabled={submitDispute.isPending}
                    className="border border-[#ffb4ab] bg-[#93000a] text-[#ffb4ab] font-semibold text-xs px-5 py-2 uppercase hover:bg-[#ba1a1a]"
                  >
                    {submitDispute.isPending ? "Submitting..." : "Submit Dispute"}
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
