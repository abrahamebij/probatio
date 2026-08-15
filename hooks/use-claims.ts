"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Claim } from "@/types/claim";

export function useClaims() {
  return useQuery<{ claims: Claim[] }>({
    queryKey: ["claims"],
    queryFn: async () => {
      const res = await fetch("/api/claims");
      if (!res.ok) throw new Error("Failed to fetch claims");
      return res.json();
    },
  });
}

export function useClaim(id: string) {
  return useQuery<{ claim: Claim; evidence: any[]; verification?: any; attestation?: any }>({
    queryKey: ["claim", id],
    queryFn: async () => {
      const res = await fetch(`/api/claims/${id}`);
      if (!res.ok) throw new Error("Failed to fetch claim detail");
      return res.json();
    },
    enabled: !!id,
  });
}

export function useCreateClaim() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { assetId: string; claimText: string }) => {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create claim");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
    },
  });
}
