"use client";

import Link from "next/link";
import { FiShield, FiExternalLink, FiGlobe } from "react-icons/fi";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#282a2b] bg-[#111415]/95 backdrop-blur-sm px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center bg-[#059669] text-black font-bold text-lg">
            P
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xl font-bold tracking-tight text-[#e1e3e4] group-hover:text-[#059669] transition-colors">
              PROBATIO
            </span>
            <span className="text-[10px] tracking-widest text-[#87948b] uppercase font-mono">
              REALITY LEDGER
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            href="/dashboard"
            className="text-[#e1e3e4] hover:text-[#059669] transition-colors tracking-wide"
          >
            Overview
          </Link>
          <Link
            href="/dashboard/claims"
            className="text-[#87948b] hover:text-[#e1e3e4] transition-colors tracking-wide"
          >
            Claims
          </Link>
          <Link
            href="/dashboard/disputes"
            className="text-[#87948b] hover:text-[#e1e3e4] transition-colors tracking-wide"
          >
            Disputes
          </Link>
          <Link
            href="/attestation/att-sf042"
            className="text-[#87948b] hover:text-[#e1e3e4] transition-colors tracking-wide flex items-center gap-1"
          >
            Public Proof <FiExternalLink className="text-xs" />
          </Link>
        </nav>

        {/* Status / CTA */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 border border-[#282a2b] bg-[#191c1d] px-3 py-1.5 text-xs text-[#87948b]">
            <span className="h-2 w-2 rounded-full bg-[#059669] animate-pulse"></span>
            <span className="font-mono text-[#e1e3e4]">BOT Chain 677</span>
          </div>

          <Link
            href="/dashboard"
            className="border border-[#059669] bg-[#059669] text-black font-semibold text-xs tracking-wider px-4 py-2 hover:bg-[#10b981] hover:border-[#10b981] transition-all uppercase"
          >
            Launch Console
          </Link>
        </div>
      </div>
    </header>
  );
}
