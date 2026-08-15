"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Attestation, Dispute } from "@/types/attestation";

export function useAttestation(id: string) {
  return useQuery<{ attestation: Attestation; claim: any; evidence: any[] }>({
    queryKey: ["attestation", id],
    queryFn: async () => {
      const res = await fetch(`/api/attestations/${id}`);
      if (!res.ok) throw new Error("Failed to fetch attestation");
      return res.json();
    },
    enabled: !!id,
  });
}

export function useDisputes() {
  return useQuery<{ disputes: Dispute[] }>({
    queryKey: ["disputes"],
    queryFn: async () => {
      const res = await fetch("/api/disputes");
      if (!res.ok) throw new Error("Failed to fetch disputes");
      return res.json();
    },
  });
}

export function useCreateAttestation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (claimId: string) => {
      const res = await fetch("/api/attestations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claimId }),
      });
      if (!res.ok) throw new Error("Failed to create attestation");
      return res.json();
    },
    onSuccess: (_, claimId) => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
      queryClient.invalidateQueries({ queryKey: ["claim", claimId] });
      queryClient.invalidateQueries({ queryKey: ["attestation", claimId] });
    },
  });
}

export function useSubmitDispute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ attestationId, reason, evidenceProvided }: { attestationId: string; reason: string; evidenceProvided?: string[] }) => {
      const res = await fetch(`/api/attestations/${attestationId}/dispute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason, evidenceProvided }),
      });
      if (!res.ok) throw new Error("Failed to submit dispute");
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
      queryClient.invalidateQueries({ queryKey: ["attestation", variables.attestationId] });
    },
  });
}
