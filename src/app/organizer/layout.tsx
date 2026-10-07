"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  PlusCircle,
  Users,
  QrCode,
  BellRing,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Building,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { label: "Dashboard", href: "/organizer", icon: LayoutDashboard },
  { label: "My Events", href: "/organizer/events", icon: Calendar },
  { label: "Create Event", href: "/organizer/events/create", icon: PlusCircle, highlight: true },
  { label: "Participants", href: "/organizer/participants", icon: Users },
  { label: "QR Check-in Scanner", href: "/organizer/checkin", icon: QrCode },
  { label: "Announcements", href: "/organizer/announcements", icon: BellRing },
  { label: "Analytics", href: "/organizer/analytics", icon: BarChart3 },
];

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07070b] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0a12] p-5 shrink-0">
        {/* Brand & Organization Badge */}
        <div className="flex items-center gap-3 px-2 py-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-lg shadow-primary/25 text-white font-bold font-[family-name:var(--font-display)] text-lg">
            E
          </div>
          <div>
            <span className="font-bold text-lg font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
              Event<span className="text-primary">OS</span>
            </span>
            <span className="block text-[11px] font-semibold text-primary uppercase tracking-wider">
              Organizer Portal
            </span>
          </div>
        </div>

        {/* Organization Switcher Card */}
        <div className="p-3 mb-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-primary flex items-center justify-center shrink-0">
              <Building size={16} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  RunIndia Sports
                </span>
                <CheckCircle2 size={12} className="text-blue-500 shrink-0" />
              </div>
              <span className="text-[10px] text-slate-600 dark:text-white/60 block">Verified Organizer</span>
            </div>
          </div>
          <ChevronDown size={14} className="text-slate-600 dark:text-white/60" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  item.highlight && !isActive
                    ? "text-primary bg-primary/10 hover:bg-primary/15 font-semibold"
                    : isActive
                    ? "bg-primary text-white shadow-md shadow-primary/25 font-semibold"
                    : "text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="pt-4 border-t border-slate-200 dark:border-white/10 mt-auto space-y-2">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="w-9 h-9 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-sm">
              RM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                Rohan Mehta
              </p>
              <p className="text-[11px] text-slate-600 dark:text-white/60 truncate">
                organizer@eventos.com
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#0a0a12]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-white font-bold text-sm">
            E
          </div>
          <span className="font-bold text-base font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
            Event<span className="text-primary">OS</span> <span className="text-xs text-primary font-normal">Org</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm pt-16">
          <div className="bg-white dark:bg-[#0a0a12] h-full p-6 flex flex-col space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-slate-600 dark:text-white/60 hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-6 mt-auto border-t border-slate-200 dark:border-white/10">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 flex flex-col min-w-0 pt-16 lg:pt-0">
        {/* Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white dark:bg-[#0a0a12] border-b border-slate-200 dark:border-white/10">
          <div>
            <h1 className="text-xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
              Organizer Command Center
            </h1>
            <p className="text-xs text-slate-600 dark:text-white/60">
              Real-time race metrics, registrations, and participant check-ins
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/organizer/events/create"
              className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5"
            >
              <PlusCircle size={14} />
              Create New Event
            </Link>
            <Link
              href="/explore"
              target="_blank"
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5"
            >
              <span>Public Portal</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
