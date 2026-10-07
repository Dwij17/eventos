"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trophy,
  Medal,
  Search,
  Timer,
  Activity,
  ArrowLeft,
  ChevronRight,
  Filter,
  CheckCircle,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";
import { demoEvents } from "@/lib/demoData";

interface LeaderboardProps {
  params: Promise<{ slug: string }>;
}

interface RunnerEntry {
  rank: number;
  bib: string;
  name: string;
  category: string;
  gender: "M" | "F";
  ageGroup: string;
  chipTime: string;
  gunTime: string;
  pace: string;
  split10k: string;
  splitHalf: string;
  split30k: string;
  status: "FINISHED" | "ON_COURSE" | "SPLIT_30K";
}

export default function EventLeaderboardPage({ params }: LeaderboardProps) {
  const resolvedParams = use(params);
  const event = demoEvents.find((e) => e.slug === resolvedParams.slug) || demoEvents[0];

  const [activeCategory, setActiveCategory] = useState<string>("Full Marathon");
  const [activeGender, setActiveGender] = useState<"ALL" | "M" | "F">("ALL");
  const [searchBibOrName, setSearchBibOrName] = useState<string>("");

  const runnersData: RunnerEntry[] = [
    {
      rank: 1,
      bib: "FM-1001",
      name: "Eliud Kipchoge",
      category: "Full Marathon",
      gender: "M",
      ageGroup: "35-39",
      chipTime: "02:04:12",
      gunTime: "02:04:12",
      pace: "2:56 min/km",
      split10k: "00:29:15",
      splitHalf: "01:01:45",
      split30k: "01:28:10",
      status: "FINISHED",
    },
    {
      rank: 2,
      bib: "FM-1002",
      name: "Kenenisa Bekele",
      category: "Full Marathon",
      gender: "M",
      ageGroup: "40-44",
      chipTime: "02:05:48",
      gunTime: "02:05:50",
      pace: "2:58 min/km",
      split10k: "00:29:20",
      splitHalf: "01:02:10",
      split30k: "01:29:05",
      status: "FINISHED",
    },
    {
      rank: 3,
      bib: "FM-1008",
      name: "Gopi Thonakal",
      category: "Full Marathon",
      gender: "M",
      ageGroup: "30-34",
      chipTime: "02:14:30",
      gunTime: "02:14:32",
      pace: "3:11 min/km",
      split10k: "00:31:05",
      splitHalf: "01:06:20",
      split30k: "01:34:40",
      status: "FINISHED",
    },
    {
      rank: 4,
      bib: "FM-1092",
      name: "Aakash Patel",
      category: "Full Marathon",
      gender: "M",
      ageGroup: "25-29",
      chipTime: "02:48:15",
      gunTime: "02:48:30",
      pace: "3:59 min/km",
      split10k: "00:39:10",
      splitHalf: "01:23:45",
      split30k: "01:59:10",
      status: "FINISHED",
    },
    {
      rank: 5,
      bib: "FM-2041",
      name: "Karan Johar",
      category: "Full Marathon",
      gender: "M",
      ageGroup: "30-34",
      chipTime: "03:02:10",
      gunTime: "03:02:40",
      pace: "4:19 min/km",
      split10k: "00:41:50",
      splitHalf: "01:29:10",
      split30k: "02:08:30",
      status: "FINISHED",
    },
    {
      rank: 1,
      bib: "HM-3001",
      name: "Avinash Sable",
      category: "Half Marathon",
      gender: "M",
      ageGroup: "25-29",
      chipTime: "01:02:14",
      gunTime: "01:02:14",
      pace: "2:57 min/km",
      split10k: "00:29:22",
      splitHalf: "01:02:14",
      split30k: "-",
      status: "FINISHED",
    },
    {
      rank: 2,
      bib: "HM-3012",
      name: "Parul Chaudhary",
      category: "Half Marathon",
      gender: "F",
      ageGroup: "25-29",
      chipTime: "01:10:45",
      gunTime: "01:10:48",
      pace: "3:21 min/km",
      split10k: "00:33:10",
      splitHalf: "01:10:45",
      split30k: "-",
      status: "FINISHED",
    },
    {
      rank: 3,
      bib: "HM-4029",
      name: "Priya Sharma",
      category: "Half Marathon",
      gender: "F",
      ageGroup: "25-29",
      chipTime: "01:42:18",
      gunTime: "01:42:40",
      pace: "4:50 min/km",
      split10k: "00:47:30",
      splitHalf: "01:42:18",
      split30k: "-",
      status: "FINISHED",
    },
    {
      rank: 4,
      bib: "HM-4401",
      name: "Sneha Sen",
      category: "Half Marathon",
      gender: "F",
      ageGroup: "30-34",
      chipTime: "01:49:50",
      gunTime: "01:50:15",
      pace: "5:12 min/km",
      split10k: "00:51:20",
      splitHalf: "01:49:50",
      split30k: "-",
      status: "FINISHED",
    },
    {
      rank: 1,
      bib: "10K-1001",
      name: "Kartik Kumar",
      category: "10K Run",
      gender: "M",
      ageGroup: "20-24",
      chipTime: "00:28:40",
      gunTime: "00:28:40",
      pace: "2:52 min/km",
      split10k: "00:28:40",
      splitHalf: "-",
      split30k: "-",
      status: "FINISHED",
    },
    {
      rank: 2,
      bib: "10K-2940",
      name: "Vikram Malhotra",
      category: "10K Run",
      gender: "M",
      ageGroup: "30-34",
      chipTime: "00:39:15",
      gunTime: "00:39:30",
      pace: "3:55 min/km",
      split10k: "00:39:15",
      splitHalf: "-",
      split30k: "-",
      status: "FINISHED",
    },
    {
      rank: 3,
      bib: "10K-8120",
      name: "Ananya Deshmukh",
      category: "10K Run",
      gender: "F",
      ageGroup: "25-29",
      chipTime: "00:44:10",
      gunTime: "00:44:25",
      pace: "4:25 min/km",
      split10k: "00:44:10",
      splitHalf: "-",
      split30k: "-",
      status: "FINISHED",
    },
  ];

  const filteredRunners = runnersData.filter((r) => {
    const matchesCat = r.category === activeCategory;
    const matchesGender = activeGender === "ALL" || r.gender === activeGender;
    const matchesSearch =
      r.name.toLowerCase().includes(searchBibOrName.toLowerCase()) ||
      r.bib.toLowerCase().includes(searchBibOrName.toLowerCase());
    return matchesCat && matchesGender && matchesSearch;
  });

  const podiumRunners = filteredRunners.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08080c] py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-white/60 hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            Back to {event.title}
          </Link>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Live RFID Timing Active
            </span>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-secondary via-slate-900 to-[#1e1b4b] p-6 sm:p-8 text-white border border-white/10 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-2 border border-primary/30">
              Official Live Leaderboard
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)]">
              {event.title}
            </h1>
            <p className="text-xs text-white/70 mt-1 max-w-xl">
              Real-time chip timings recorded at RFID checkpoints along the course.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs sm:text-right">
            <div>
              <span className="text-white/50 block">Timing Partner</span>
              <span className="font-bold text-white">EventOS Precision Chip</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <span className="text-white/50 block">Course Verified</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle size={13} />
                AIMS Certified
              </span>
            </div>
          </div>
        </div>

        {/* Category Tabs & Search Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 overflow-x-auto self-stretch sm:self-auto text-xs">
            {["Full Marathon", "Half Marathon", "10K Run"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Gender filter */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 text-xs">
              {(["ALL", "M", "F"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setActiveGender(g)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                    activeGender === g
                      ? "bg-primary text-white"
                      : "text-slate-600 dark:text-white/60"
                  }`}
                >
                  {g === "ALL" ? "All" : g === "M" ? "Men" : "Women"}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-white/60" />
              <input
                type="text"
                placeholder="Search bib or runner..."
                value={searchBibOrName}
                onChange={(e) => setSearchBibOrName(e.target.value)}
                className="input-field pl-8 text-xs py-2"
              />
            </div>
          </div>
        </div>

        {/* Podium Finishers Visual Cards */}
        {podiumRunners.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* 2nd Place */}
            <div className="order-2 md:order-1 rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 p-6 text-center space-y-3 relative overflow-hidden shadow-sm">
              <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-white flex items-center justify-center font-bold text-sm mx-auto shadow-inner">
                🥈 2nd
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {podiumRunners[1].name}
                </h3>
                <span className="font-mono text-xs text-primary font-bold">
                  {podiumRunners[1].bib}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 space-y-1 text-xs">
                <span className="text-[11px] text-slate-600 dark:text-white/60 block">Chip Finish Time</span>
                <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                  {podiumRunners[1].chipTime}
                </span>
                <span className="text-[11px] text-slate-600 dark:text-white/60 block">
                  Pace: {podiumRunners[1].pace}
                </span>
              </div>
            </div>

            {/* 1st Place Champion */}
            <div className="order-1 md:order-2 rounded-3xl bg-gradient-to-b from-amber-500/10 via-white to-white dark:from-amber-500/10 dark:via-[#0c0c16] dark:to-[#0c0c16] border-2 border-amber-500/40 p-6 sm:p-8 text-center space-y-3 relative overflow-hidden shadow-xl scale-105 z-10">
              <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-base mx-auto shadow-lg shadow-amber-500/30">
                🥇 1st
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block mb-0.5">
                  Category Champion
                </span>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  {podiumRunners[0].name}
                </h3>
                <span className="font-mono text-xs text-primary font-bold">
                  {podiumRunners[0].bib}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1 text-xs">
                <span className="text-[11px] text-amber-700 dark:text-amber-300 block font-semibold">
                  Course Winning Time
                </span>
                <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                  {podiumRunners[0].chipTime}
                </span>
                <span className="text-[11px] text-slate-600 dark:text-white/60 block font-medium">
                  Average Pace: {podiumRunners[0].pace}
                </span>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="order-3 rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 p-6 text-center space-y-3 relative overflow-hidden shadow-sm">
              <div className="w-10 h-10 rounded-full bg-amber-700/20 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold text-sm mx-auto shadow-inner">
                🥉 3rd
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {podiumRunners[2].name}
                </h3>
                <span className="font-mono text-xs text-primary font-bold">
                  {podiumRunners[2].bib}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 space-y-1 text-xs">
                <span className="text-[11px] text-slate-600 dark:text-white/60 block">Chip Finish Time</span>
                <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                  {podiumRunners[2].chipTime}
                </span>
                <span className="text-[11px] text-slate-600 dark:text-white/60 block">
                  Pace: {podiumRunners[2].pace}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Full Leaderboard Table */}
        <div className="rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy size={16} className="text-primary" />
              Complete Race Rankings ({filteredRunners.length})
            </h3>
            <span className="text-xs text-slate-600 dark:text-white/60">
              Sorted by Official Chip Time
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/10 text-slate-600 dark:text-white/60 font-semibold uppercase tracking-wider text-[10px] bg-slate-50/50 dark:bg-white/[0.02]">
                  <th className="py-3.5 px-4 text-center">Rank</th>
                  <th className="py-3.5 px-4">Bib</th>
                  <th className="py-3.5 px-4">Runner Name</th>
                  <th className="py-3.5 px-4">Div / Gender</th>
                  <th className="py-3.5 px-4">10K Split</th>
                  <th className="py-3.5 px-4">Halfway</th>
                  <th className="py-3.5 px-4">Avg Pace</th>
                  <th className="py-3.5 px-4">Chip Time</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-mono">
                {filteredRunners.map((r) => (
                  <tr
                    key={r.bib}
                    className={`hover:bg-slate-50/50 dark:hover:bg-white/[0.02] ${
                      r.rank <= 3 ? "bg-amber-500/[0.02]" : ""
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center font-bold">
                      {r.rank === 1 ? (
                        <span className="inline-block px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold text-[11px]">
                          #1
                        </span>
                      ) : r.rank === 2 ? (
                        <span className="inline-block px-2 py-0.5 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white font-bold text-[11px]">
                          #2
                        </span>
                      ) : r.rank === 3 ? (
                        <span className="inline-block px-2 py-0.5 rounded-full bg-amber-700/20 text-amber-700 dark:text-amber-400 font-bold text-[11px]">
                          #3
                        </span>
                      ) : (
                        <span className="text-slate-600 dark:text-white/60">#{r.rank}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-primary">
                      {r.bib}
                    </td>
                    <td className="py-3.5 px-4 font-sans font-bold text-slate-900 dark:text-white">
                      {r.name}
                    </td>
                    <td className="py-3.5 px-4 font-sans text-slate-700 dark:text-white/80">
                      {r.gender} • {r.ageGroup}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-white/80">
                      {r.split10k}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-white/80">
                      {r.splitHalf}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-white/80 font-sans">
                      {r.pace}
                    </td>
                    <td className="py-3.5 px-4 font-black text-slate-900 dark:text-white text-sm">
                      {r.chipTime}
                    </td>
                    <td className="py-3.5 px-4 font-sans">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                        <CheckCircle size={10} />
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
