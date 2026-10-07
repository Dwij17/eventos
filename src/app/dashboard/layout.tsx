"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Ticket,
  Calendar,
  Award,
  User,
  LogOut,
  Menu,
  X,
  Compass,
  Bell,
  ExternalLink,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { getUserProfile, UserProfileData } from "@/lib/userStore";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Tickets", href: "/dashboard/tickets", icon: Ticket },
  { label: "My Events", href: "/dashboard/events", icon: Calendar },
  { label: "Results & Certificates", href: "/dashboard/certificates", icon: Award },
  { label: "My Profile", href: "/dashboard/profile", icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfileData | null>(null);

  useEffect(() => {
    const load = () => setProfile(getUserProfile());
    load();
    window.addEventListener("eventos_storage_updated", load);
    return () => window.removeEventListener("eventos_storage_updated", load);
  }, []);

  const displayName = profile?.firstName ? `${profile.firstName} ${profile.lastName}`.trim() : "Participant";
  const displayEmail = profile?.email || "participant@eventos.com";
  const initial = profile?.firstName ? profile.firstName[0].toUpperCase() : "U";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08080c] flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0c14] p-5 shrink-0">
        {/* Brand */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-lg shadow-primary/20 text-white font-bold font-[family-name:var(--font-display)] text-lg">
            E
          </div>
          <div>
            <span className="font-bold text-lg font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
              Event<span className="text-primary">OS</span>
            </span>
            <span className="block text-[11px] text-slate-600 dark:text-white/60 font-medium">
              Participant Hub
            </span>
          </div>
        </div>

        {/* Quick Explore Link */}
        <Link
          href="/explore"
          className="flex items-center justify-between px-3.5 py-2.5 mb-6 rounded-xl bg-orange-500/10 text-primary border border-orange-500/20 text-xs font-semibold hover:bg-orange-500/15 transition-all"
        >
          <span className="flex items-center gap-2">
            <Compass size={15} />
            Explore Live Events
          </span>
          <ExternalLink size={13} />
        </Link>

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
                  isActive
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

        {/* User Card & Sign Out */}
        <div className="pt-4 border-t border-slate-200 dark:border-white/10 mt-auto space-y-2">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center font-bold text-slate-700 dark:text-white text-sm">
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                {displayName}
              </p>
              <p className="text-[11px] text-slate-600 dark:text-white/60 truncate">
                {displayEmail}
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

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-[#0c0c14]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-white font-bold text-sm">
            E
          </div>
          <span className="font-bold text-base font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
            Event<span className="text-primary">OS</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/explore"
            className="p-2 rounded-lg text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5"
          >
            <Compass size={18} />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm pt-16">
          <div className="bg-white dark:bg-[#0c0c14] h-full p-6 flex flex-col space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 pt-16 lg:pt-0">
        {/* Top Navbar */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white dark:bg-[#0c0c14] border-b border-slate-200 dark:border-white/10">
          <div>
            <h1 className="text-xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
              Participant Dashboard
            </h1>
            <p className="text-xs text-slate-600 dark:text-white/60">
              Track your upcoming races, digital passes, and certificates.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/explore"
              className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5"
            >
              <Compass size={14} />
              Browse Events
            </Link>
            <button
              aria-label="Notifications"
              className="p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5"
            >
              <Bell size={18} />
            </button>
          </div>
        </header>

        {/* Content View */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
