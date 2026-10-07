"use client";

import { useState, use } from "react";
import Link from "next/link";
import {
  Award,
  Search,
  Download,
  Printer,
  ArrowLeft,
  Timer,
  CheckCircle,
  Share2,
  Calendar,
  MapPin,
  Trophy,
} from "lucide-react";
import { demoEvents } from "@/lib/demoData";

interface ResultsPageProps {
  params: Promise<{ slug: string }>;
}

export default function EventResultsPage({ params }: ResultsPageProps) {
  const resolvedParams = use(params);
  const event = demoEvents.find((e) => e.slug === resolvedParams.slug) || demoEvents[0];

  const [searchBib, setSearchBib] = useState("HM-4029");
  const [selectedResult, setSelectedResult] = useState({
    name: "Priya Sharma",
    bib: "HM-4029",
    category: "Half Marathon (21.1 km)",
    gunTime: "01:42:40",
    chipTime: "01:42:18",
    pace: "4:50 min/km",
    overallRank: 342,
    totalRunners: 8000,
    genderRank: 48,
    categoryRank: 32,
    splits: [
      { name: "5K Split", time: "00:23:40", pace: "4:44 min/km" },
      { name: "10K Split", time: "00:47:30", pace: "4:45 min/km" },
      { name: "15K Split", time: "01:12:10", pace: "4:48 min/km" },
      { name: "Halfway Finish (21.1K)", time: "01:42:18", pace: "4:50 min/km" },
    ],
    certNo: "EVT-2027-MM-8921-CERT",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate lookup
    if (searchBib.toUpperCase().includes("1092")) {
      setSelectedResult({
        name: "Aakash Patel",
        bib: "FM-1092",
        category: "Full Marathon (42.2 km)",
        gunTime: "02:48:30",
        chipTime: "02:48:15",
        pace: "3:59 min/km",
        overallRank: 124,
        totalRunners: 5000,
        genderRank: 110,
        categoryRank: 42,
        splits: [
          { name: "10K Split", time: "00:39:10", pace: "3:55 min/km" },
          { name: "21.1K Halfway", time: "01:23:45", pace: "3:58 min/km" },
          { name: "30K Split", time: "01:59:10", pace: "3:58 min/km" },
          { name: "Full Finish (42.2K)", time: "02:48:15", pace: "3:59 min/km" },
        ],
        certNo: "EVT-2027-MM-1092-CERT",
      });
    } else {
      setSelectedResult({
        name: "Priya Sharma",
        bib: "HM-4029",
        category: "Half Marathon (21.1 km)",
        gunTime: "01:42:40",
        chipTime: "01:42:18",
        pace: "4:50 min/km",
        overallRank: 342,
        totalRunners: 8000,
        genderRank: 48,
        categoryRank: 32,
        splits: [
          { name: "5K Split", time: "00:23:40", pace: "4:44 min/km" },
          { name: "10K Split", time: "00:47:30", pace: "4:45 min/km" },
          { name: "15K Split", time: "01:12:10", pace: "4:48 min/km" },
          { name: "Halfway Finish (21.1K)", time: "01:42:18", pace: "4:50 min/km" },
        ],
        certNo: "EVT-2027-MM-8921-CERT",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08080c] py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-white/60 hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Event Details
          </Link>
          <Link
            href={`/events/${event.slug}/leaderboard`}
            className="btn-secondary text-xs px-3.5 py-1.5 flex items-center gap-1.5"
          >
            <Trophy size={14} />
            Full Leaderboard
          </Link>
        </div>

        {/* Search Runner Box */}
        <div className="rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-4 shadow-sm text-center">
          <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
            Official Results & Finisher Certificate Lookup
          </h1>
          <p className="text-xs text-slate-600 dark:text-white/60 max-w-md mx-auto">
            Enter your assigned race bib number to look up your official chip timing breakdown and download your finisher certificate.
          </p>

          <form onSubmit={handleSearch} className="max-w-md mx-auto flex items-center gap-2 pt-2">
            <input
              type="text"
              placeholder="Enter Bib Number (e.g. HM-4029 or FM-1092)..."
              value={searchBib}
              onChange={(e) => setSearchBib(e.target.value)}
              className="input-field text-xs font-mono"
            />
            <button
              type="submit"
              className="btn-primary text-xs px-6 py-2.5 whitespace-nowrap"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results Card */}
        <div className="rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/5 pb-6">
            <div>
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">
                Official Finisher
              </span>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
                {selectedResult.name}
              </h2>
              <p className="text-xs text-slate-600 dark:text-white/60">
                {selectedResult.category} • Bib: <span className="font-mono font-bold text-primary">{selectedResult.bib}</span>
              </p>
            </div>
            <div className="sm:text-right">
              <span className="text-[11px] text-slate-600 dark:text-white/60 block">Official Chip Time</span>
              <span className="text-3xl font-black font-mono text-slate-900 dark:text-white">
                {selectedResult.chipTime}
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5">
              <span className="text-slate-600 dark:text-white/60 block">Gun Time</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white text-base">
                {selectedResult.gunTime}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5">
              <span className="text-slate-600 dark:text-white/60 block">Avg Pace</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white text-base">
                {selectedResult.pace}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5">
              <span className="text-slate-600 dark:text-white/60 block">Overall Rank</span>
              <span className="font-bold text-slate-900 dark:text-white text-base">
                #{selectedResult.overallRank} <span className="text-xs font-normal text-slate-600 dark:text-white/60">/ {selectedResult.totalRunners}</span>
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5">
              <span className="text-slate-600 dark:text-white/60 block">Category Rank</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-base">
                #{selectedResult.categoryRank}
              </span>
            </div>
          </div>

          {/* Splits Table */}
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Checkpoint Split Times
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/10 text-slate-600 uppercase text-[10px]">
                    <th className="py-2.5">Checkpoint</th>
                    <th className="py-2.5">Elapsed Time</th>
                    <th className="py-2.5">Split Pace</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {selectedResult.splits.map((s) => (
                    <tr key={s.name}>
                      <td className="py-2.5 font-sans font-semibold text-slate-900 dark:text-white">
                        {s.name}
                      </td>
                      <td className="py-2.5 text-slate-700 dark:text-white/80">{s.time}</td>
                      <td className="py-2.5 text-slate-700 dark:text-white/80">{s.pace}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Certificate Preview Frame */}
        <div className="border-4 border-double border-amber-500/40 rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-amber-50/30 via-white to-amber-50/30 dark:from-amber-950/20 dark:via-[#0c0c16] dark:to-amber-950/20 text-center space-y-5 shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-amber-500/15 text-amber-500 flex items-center justify-center mx-auto">
            <Award size={32} />
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-slate-600 dark:text-white/60 font-semibold block">
              Official Finisher Certificate
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white mt-1">
              {event.title}
            </h2>
          </div>

          <div className="py-2">
            <p className="text-xs text-slate-600 dark:text-white/60">This certifies that</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white font-[family-name:var(--font-display)] mt-0.5">
              {selectedResult.name}
            </p>
            <p className="text-xs text-slate-600 dark:text-white/60 mt-1">
              successfully conquered the {selectedResult.category} with official race bib <span className="font-mono font-bold text-primary">{selectedResult.bib}</span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 py-4 border-y border-amber-500/20 max-w-md mx-auto text-xs">
            <div>
              <span className="text-slate-600 dark:text-white/60 block">Official Chip Time</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                {selectedResult.chipTime}
              </span>
            </div>
            <div>
              <span className="text-slate-600 dark:text-white/60 block">Average Pace</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                {selectedResult.pace}
              </span>
            </div>
            <div>
              <span className="text-slate-600 dark:text-white/60 block">Category Rank</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                #{selectedResult.categoryRank}
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-600 dark:text-white/60 max-w-md mx-auto">
            <span>Verified by EventOS RFID</span>
            <span className="font-mono">{selectedResult.certNo}</span>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="btn-primary text-xs px-6 py-2.5 flex items-center gap-2"
            >
              <Printer size={15} />
              Print / Save Certificate PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
