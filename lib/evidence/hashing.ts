import { createHash } from "crypto";

/**
 * Computes a deterministic 0x-prefixed SHA-256 hash for any evidence content or string.
 */
export function hashEvidenceContent(content: string | Buffer): string {
  const hash = createHash("sha256").update(content).digest("hex");
  return `0x${hash}`;
}

/**
 * Combines multiple evidence hashes into a single root evidence hash.
 */
export function combineEvidenceHashes(hashes: string[]): string {
  const sorted = [...hashes].sort();
  const concatenated = sorted.join(":");
  return hashEvidenceContent(concatenated);
}
