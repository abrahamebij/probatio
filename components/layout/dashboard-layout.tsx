"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Header } from "./header";
import {
  FiGrid,
  FiFileText,
  FiCpu,
  FiShield,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: FiGrid },
  { href: "/dashboard/claims", label: "Claims Ledger", icon: FiFileText },
  { href: "/dashboard/verification/claim-sf042", label: "AI Verification", icon: FiCpu },
  { href: "/dashboard/passports/solar-farm-042", label: "Reality Passport", icon: FiShield },
  { href: "/dashboard/disputes", label: "Disputes Registry", icon: FiAlertCircle },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#111415] text-[#e1e3e4] flex flex-col">
      <Header />

      <div className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-3 flex flex-col gap-6">
          <div className="border border-[#282a2b] bg-[#191c1d] p-4 flex flex-col gap-2">
            <span className="text-[11px] font-semibold text-[#87948b] uppercase tracking-wider">
              Consolidated Infrastructure
            </span>
            <div className="flex items-center gap-2 text-sm font-bold text-[#e1e3e4]">
              <FiCheckCircle className="text-[#059669]" />
              Solar Energy RWA Node #01
            </div>
          </div>

          <nav className="border border-[#282a2b] bg-[#191c1d] divide-y divide-[#282a2b] flex flex-col">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#282a2b] text-[#059669] border-l-2 border-[#059669]"
                      : "text-[#87948b] hover:text-[#e1e3e4] hover:bg-[#1d2021]"
                  }`}
                >
                  <Icon className="text-base" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border border-[#282a2b] bg-[#0c0f10] p-4 text-xs flex flex-col gap-2">
            <span className="text-[#87948b] uppercase tracking-wider font-semibold">
              BOT Chain Status
            </span>
            <div className="flex items-center justify-between text-[#e1e3e4] font-mono text-[11px]">
              <span>Chain ID:</span>
              <span className="text-[#059669]">677</span>
            </div>
            <div className="flex items-center justify-between text-[#e1e3e4] font-mono text-[11px]">
              <span>Engine:</span>
              <span>Gemini 2.5 Flash</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-9 flex flex-col gap-6">{children}</main>
      </div>
    </div>
  );
}
