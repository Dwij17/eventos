"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DollarSign,
  Users,
  Calendar,
  CheckCircle,
  TrendingUp,
  PlusCircle,
  QrCode,
  BellRing,
  Download,
  ArrowUpRight,
  Clock,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Search,
} from "lucide-react";
import { demoEvents } from "@/lib/demoData";

export default function OrganizerDashboard() {
  const [filterPeriod, setFilterPeriod] = useState<"7d" | "30d" | "all">("30d");

  // Organizer events
  const organizerEvents = [
    {
      id: "evt-01",
      event: demoEvents[0], // Mumbai Marathon
      status: "PUBLISHED",
      registeredCount: 16500,
      totalCapacity: 23000,
      revenue: 21850000,
      daysToEvent: 101,
    },
    {
      id: "evt-02",
      event: demoEvents[6], // Hyderabad Night Run
      status: "PUBLISHED",
      registeredCount: 5600,
      totalCapacity: 8000,
      revenue: 2840000,
      daysToEvent: 118,
    },
    {
      id: "evt-03",
      event: demoEvents[8], // Pune Cycling Challenge
      status: "DRAFT",
      registeredCount: 0,
      totalCapacity: 1500,
      revenue: 0,
      daysToEvent: 146,
    },
  ];

  // Recent registrations live feed
  const recentRegistrations = [
    {
      id: "reg-01",
      name: "Aakash Patel",
      email: "aakash.patel@gmail.com",
      event: "Mumbai Marathon 2027",
      category: "Full Marathon (42.2k)",
      bib: "FM-1092",
      amount: "₹2,500",
      status: "PAID",
      time: "2 mins ago",
    },
    {
      id: "reg-02",
      name: "Sneha Sen",
      email: "sneha.sen@outlook.com",
      event: "Mumbai Marathon 2027",
      category: "Half Marathon (21.1k)",
      bib: "HM-4401",
      amount: "₹1,500",
      status: "PAID",
      time: "8 mins ago",
    },
    {
      id: "reg-03",
      name: "Vikram Malhotra",
      email: "vikram.m@techcorp.in",
      event: "Hyderabad Night Run",
      category: "10K Timed Run",
      bib: "10K-2940",
      amount: "₹600",
      status: "PAID",
      time: "24 mins ago",
    },
    {
      id: "reg-04",
      name: "Ananya Deshmukh",
      email: "ananya.d@gmail.com",
      event: "Mumbai Marathon 2027",
      category: "10K Fun Run",
      bib: "10K-8120",
      amount: "₹800",
      status: "PAID",
      time: "41 mins ago",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Bar with KPI Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
            Overview & Performance
          </h2>
          <p className="text-xs text-slate-600 dark:text-white/60">
            Real-time analytics for RunIndia Sports events
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-xl bg-slate-200/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center text-xs">
            <button
              onClick={() => setFilterPeriod("7d")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filterPeriod === "7d"
                  ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-xs font-semibold"
                  : "text-slate-600 dark:text-white/60"
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setFilterPeriod("30d")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filterPeriod === "30d"
                  ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-xs font-semibold"
                  : "text-slate-600 dark:text-white/60"
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setFilterPeriod("all")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filterPeriod === "all"
                  ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-xs font-semibold"
                  : "text-slate-600 dark:text-white/60"
              }`}
            >
              All Time
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-white/60">Gross Ticket Sales</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <DollarSign size={16} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-900 dark:text-white font-[family-name:var(--font-display)]">
            ₹2,46,90,000
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <TrendingUp size={13} />
            <span>+18.4% from last period</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-white/60">Confirmed Runners</span>
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-primary flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-900 dark:text-white font-[family-name:var(--font-display)]">
            22,100
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600 dark:text-white/60">
            <span>Across 2 active live races</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-white/60">Slots Occupancy</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-900 dark:text-white font-[family-name:var(--font-display)]">
            71.3%
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-medium">
            <span>8,900 spots remaining</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-white/60">Bib Kits Prepped</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <ShieldCheck size={16} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-900 dark:text-white font-[family-name:var(--font-display)]">
            18,500 <span className="text-xs font-normal text-slate-600 dark:text-white/60">/ 22.1k</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 font-medium">
            <span>84% timing chips tested</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Strip */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-secondary via-slate-900 to-black text-white border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm font-[family-name:var(--font-display)]">
            Organizer Quick Tools
          </h3>
          <p className="text-xs text-white/60">
            Speed up event management with single-click operational shortcuts
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/organizer/events/create"
            className="btn-primary text-xs px-3.5 py-2 flex items-center gap-1.5"
          >
            <PlusCircle size={14} />
            Create Event
          </Link>
          <Link
            href="/organizer/checkin"
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <QrCode size={14} />
            Open Scanner
          </Link>
          <Link
            href="/organizer/announcements"
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <BellRing size={14} />
            Send Alert
          </Link>
          <Link
            href="/organizer/participants"
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Download size={14} />
            Export Roster
          </Link>
        </div>
      </div>

      {/* Active Events Management Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
              My Organized Events
            </h3>
            <p className="text-xs text-slate-600 dark:text-white/60">
              Active sports competitions, marathons, and tournaments
            </p>
          </div>
          <Link
            href="/organizer/events"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            View all ({organizerEvents.length})
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {organizerEvents.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-36 w-full rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={item.event.coverImage}
                    alt={item.event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        item.status === "PUBLISHED"
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-700 text-white"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="font-bold text-sm truncate">
                      {item.event.title}
                    </h4>
                  </div>
                </div>

                <div className="space-y-2 text-xs py-2 border-y border-slate-100 dark:border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-white/60">Registrations</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {item.registeredCount.toLocaleString()} / {item.totalCapacity.toLocaleString()}
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${Math.min((item.registeredCount / item.totalCapacity) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-600 dark:text-white/60">Revenue</span>
                    <span className="font-bold text-primary font-[family-name:var(--font-display)]">
                      ₹{item.revenue.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2 flex items-center justify-between gap-2">
                <Link
                  href={`/events/${item.event.slug}`}
                  target="_blank"
                  className="text-xs font-semibold text-slate-600 dark:text-white/70 hover:text-primary transition-colors flex items-center gap-1"
                >
                  View Live
                  <ArrowUpRight size={13} />
                </Link>
                <Link
                  href={`/organizer/participants?event=${item.id}`}
                  className="btn-primary text-xs px-3 py-1.5"
                >
                  Manage Roster
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Registrations Feed Table */}
      <div className="rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
              Recent Participant Registrations
            </h3>
            <p className="text-xs text-slate-600 dark:text-white/60">
              Live feed of incoming registrations and assigned bibs
            </p>
          </div>
          <Link
            href="/organizer/participants"
            className="btn-secondary text-xs px-3.5 py-2 border-slate-200 dark:border-white/10 self-start"
          >
            View Complete Roster
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/10 text-slate-600 dark:text-white/60 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Participant</th>
                <th className="py-3 px-3">Event & Category</th>
                <th className="py-3 px-3">Assigned Bib</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {recentRegistrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {reg.name}
                    </span>
                    <span className="text-[11px] text-slate-600 dark:text-white/60">
                      {reg.email}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-slate-800 dark:text-white block">
                      {reg.event}
                    </span>
                    <span className="text-[11px] text-primary">
                      {reg.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-mono font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded">
                      {reg.bib}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-900 dark:text-white">
                    {reg.amount}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                      <CheckCircle size={10} />
                      {reg.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 dark:text-white/60 text-[11px]">
                    {reg.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
