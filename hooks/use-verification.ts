"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { VerificationResult } from "@/types/verification";

export function useVerification(id: string) {
  return useQuery<{ verification: VerificationResult }>({
    queryKey: ["verification", id],
    queryFn: async () => {
      const res = await fetch(`/api/verification/${id}`);
      if (!res.ok) throw new Error("Failed to fetch verification status");
      return res.json();
    },
    enabled: !!id,
    refetchInterval: (query) => {
      const status = query.state.data?.verification?.status;
      return status === "verified" || status === "unverified" || status === "inconclusive" ? false : 2000;
    },
  });
}

export function useTriggerVerification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (claimId: string) => {
      const res = await fetch("/api/verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claimId }),
      });
      if (!res.ok) throw new Error("Failed to trigger verification");
      return res.json();
    },
    onSuccess: (_, claimId) => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
      queryClient.invalidateQueries({ queryKey: ["claim", claimId] });
      queryClient.invalidateQueries({ queryKey: ["verification", claimId] });
    },
  });
}
