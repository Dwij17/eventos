"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Trophy, Download, Share2, Medal, Clock, MapPin, Calendar, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { demoEvents } from "@/lib/demoData";

// Mock results database
const MOCK_RESULTS = [
  {
    bibNumber: "MMB-0042",
    name: "Arjun Mehta",
    event: "Mumbai Marathon 2027",
    slug: "mumbai-marathon-2027",
    category: "Half Marathon",
    finishTime: "1:58:34",
    rank: 12,
    totalParticipants: 5500,
    percentile: 99.8,
    splits: [
      { distance: "5K", time: "27:12", pace: "5:26" },
      { distance: "10K", time: "55:04", pace: "5:22" },
      { distance: "15K", time: "1:23:18", pace: "5:25" },
      { distance: "21.1K", time: "1:58:34", pace: "5:24" },
    ],
    medalType: "gold",
    certificateId: "MMB2027-HM-0042",
  },
  {
    bibNumber: "HNR-0155",
    name: "Priya Singh",
    event: "Hyderabad Night Run",
    slug: "hyderabad-night-run-2027",
    category: "10K",
    finishTime: "52:18",
    rank: 34,
    totalParticipants: 2100,
    percentile: 98.4,
    splits: [
      { distance: "5K", time: "26:02", pace: "5:12" },
      { distance: "10K", time: "52:18", pace: "5:14" },
    ],
    medalType: "silver",
    certificateId: "HNR2027-10K-0155",
  },
  {
    bibNumber: "PCY-0088",
    name: "Vikram Rao",
    event: "Pune Cycling Challenge",
    slug: "pune-cycling-2027",
    category: "50K",
    finishTime: "1:42:56",
    rank: 8,
    totalParticipants: 720,
    percentile: 99.9,
    splits: [
      { distance: "25K", time: "51:20", pace: "2:03/km" },
      { distance: "50K", time: "1:42:56", pace: "2:04/km" },
    ],
    medalType: "gold",
    certificateId: "PCY2027-50K-0088",
  },
];

const MEDAL_COLORS: Record<string, string> = {
  gold: "from-yellow-400 to-amber-500",
  silver: "from-gray-300 to-gray-400",
  bronze: "from-amber-600 to-amber-700",
};

const MEDAL_LABELS: Record<string, string> = {
  gold: "🥇 Gold Finisher",
  silver: "🥈 Silver Finisher",
  bronze: "🥉 Bronze Finisher",
};

export default function ResultsPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<(typeof MOCK_RESULTS)[0] | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setNotFound(false);
    setResult(null);

    await new Promise((r) => setTimeout(r, 800)); // Simulate API

    const found = MOCK_RESULTS.find(
      (r) =>
        r.bibNumber.toLowerCase() === query.toLowerCase() ||
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.certificateId.toLowerCase() === query.toLowerCase()
    );

    if (found) {
      setResult(found);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#0d0d20] via-[#1a0d3a] to-[#0a0a1a] px-4 py-20 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-2xl mx-auto">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-400">
            <Trophy className="h-4 w-4" />
            Results & Certificates
          </div>
          <h1 className="text-5xl font-black tracking-tight text-white">
            Find Your Result
          </h1>
          <p className="mt-4 text-gray-400 text-lg">
            Enter your BIB number, name, or certificate ID to view your performance and download your finisher certificate.
          </p>

          {/* Search */}
          <div className="mt-8 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="results-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="BIB number, name, or certificate ID..."
                className="w-full rounded-2xl border border-white/20 bg-white/10 py-4 pl-12 pr-4 text-white placeholder-gray-400 outline-none focus:border-purple-500 backdrop-blur-sm text-base"
              />
            </div>
            <button
              id="results-search-btn"
              onClick={handleSearch}
              disabled={loading}
              className="rounded-2xl bg-purple-600 px-6 py-4 font-semibold text-white hover:bg-purple-700 disabled:opacity-60 transition-all"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Search"
              )}
            </button>
          </div>

          <p className="mt-3 text-xs text-gray-600">
            Try: <button onClick={() => setQuery("MMB-0042")} className="text-purple-400 hover:underline">MMB-0042</button>
            {" · "}
            <button onClick={() => setQuery("Priya Singh")} className="text-purple-400 hover:underline">Priya Singh</button>
            {" · "}
            <button onClick={() => setQuery("PCY2027-50K-0088")} className="text-purple-400 hover:underline">PCY2027-50K-0088</button>
          </p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12">
        {/* Not Found */}
        {notFound && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center"
          >
            <p className="text-4xl mb-3">🔍</p>
            <h3 className="text-lg font-semibold text-white">No results found</h3>
            <p className="mt-1 text-sm text-gray-400">
              We couldn't find a result for "{query}". Please check your BIB number or name and try again.
            </p>
          </motion.div>
        )}

        {/* Result Card */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Medal Header */}
            <div className={`rounded-2xl bg-gradient-to-br ${MEDAL_COLORS[result.medalType]} p-0.5`}>
              <div className="rounded-[14px] bg-[#0a0a1a] p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className={`inline-block rounded-full bg-gradient-to-r ${MEDAL_COLORS[result.medalType]} px-3 py-1 text-sm font-bold text-white mb-3`}>
                      {MEDAL_LABELS[result.medalType]}
                    </div>
                    <h2 className="text-2xl font-black text-white">{result.name}</h2>
                    <p className="text-gray-400 mt-1">{result.event} • {result.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black text-white">{result.finishTime}</p>
                    <p className="text-sm text-gray-400">Finish Time</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  {[
                    { label: "Overall Rank", value: `#${result.rank}` },
                    { label: "Total Starters", value: result.totalParticipants.toLocaleString() },
                    { label: "Top Percentile", value: `${result.percentile}%` },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-white/5 p-4 text-center">
                      <p className="text-2xl font-black text-white">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 text-xs text-gray-600 flex items-center gap-1">
                  <span>Certificate ID:</span>
                  <code className="font-mono text-gray-400">{result.certificateId}</code>
                </div>
              </div>
            </div>

            {/* Splits Table */}
            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
              <div className="border-b border-white/10 px-5 py-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-400" />
                <h3 className="font-semibold text-white">Timing Splits</h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5">
                    {["Distance", "Split Time", "Average Pace"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {result.splits.map((split) => (
                    <tr key={split.distance}>
                      <td className="px-5 py-3 text-sm font-semibold text-white">{split.distance}</td>
                      <td className="px-5 py-3 text-sm font-mono text-gray-300">{split.time}</td>
                      <td className="px-5 py-3 text-sm text-purple-400 font-medium">{split.pace}/km</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard/certificates"
                className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-medium text-white hover:bg-purple-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download Certificate
              </Link>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: `${result.name} — ${result.event}`, url: window.location.href });
                  }
                }}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-gray-300 hover:bg-white/10 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Share Result
              </button>
              <Link
                href={`/events/${result.slug}`}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-gray-300 hover:bg-white/10 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                View Event
              </Link>
            </div>
          </motion.div>
        )}

        {/* Browse Past Events */}
        {!result && !notFound && (
          <div className="mt-4">
            <h2 className="mb-4 text-lg font-bold text-white">Recent Events with Results</h2>
            <div className="space-y-3">
              {demoEvents.slice(0, 5).map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors"
                >
                  <img src={event.coverImage} alt={event.title} className="h-14 w-20 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold text-white">{event.title}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="h-3 w-3" /> {event.city}
                      <span className="text-gray-600">·</span>
                      <Calendar className="h-3 w-3" /> {new Date(event.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </p>
                  </div>
                  <button
                    onClick={() => setQuery(event.title)}
                    className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300"
                  >
                    Search <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
