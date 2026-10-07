"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, TrendingUp, TrendingDown, Minus, Zap, Medal } from "lucide-react";
import { useLiveLeaderboard } from "@/lib/realtimeHooks";

interface LeaderboardEntry {
  rank: number;
  name: string;
  bibNumber: string;
  time?: string;
  points?: number;
  category?: string;
  change?: number; // rank change since last update
}

interface Props {
  eventId: string;
  eventType: "RUNNING" | "CRICKET" | "FOOTBALL" | "OTHER";
  initialEntries?: LeaderboardEntry[];
  compact?: boolean;
}

const MEDALS = ["🥇", "🥈", "🥉"];

export function LiveLeaderboard({ eventId, eventType, initialEntries = [], compact = false }: Props) {
  // Generate realistic demo data if no initial entries
  const demoEntries: LeaderboardEntry[] =
    initialEntries.length > 0
      ? initialEntries
      : eventType === "RUNNING"
      ? [
          { rank: 1, name: "Kiptoo Wanjiru", bibNumber: "E-0001", time: "2:04:38", points: 100, change: 0 },
          { rank: 2, name: "Arjun Mehta", bibNumber: "E-0042", time: "2:08:22", points: 95, change: 1 },
          { rank: 3, name: "Samuel Kimani", bibNumber: "E-0017", time: "2:11:05", points: 90, change: -1 },
          { rank: 4, name: "Rahul Sharma", bibNumber: "E-0088", time: "2:13:44", points: 85, change: 2 },
          { rank: 5, name: "David Mwangi", bibNumber: "E-0033", time: "2:15:30", points: 80, change: 0 },
          { rank: 6, name: "Priya Singh", bibNumber: "E-0055", time: "2:18:12", points: 75, change: -2 },
          { rank: 7, name: "Vikram Rao", bibNumber: "E-0071", time: "2:20:55", points: 70, change: 1 },
          { rank: 8, name: "Anita Kumar", bibNumber: "E-0099", time: "2:23:07", points: 65, change: 0 },
        ]
      : [
          { rank: 1, name: "Royal Strikers", bibNumber: "T-01", points: 24, change: 0 },
          { rank: 2, name: "City Hawks", bibNumber: "T-02", points: 20, change: 1 },
          { rank: 3, name: "Thunder Bulls", bibNumber: "T-03", points: 18, change: -1 },
          { rank: 4, name: "Sea Warriors", bibNumber: "T-04", points: 16, change: 0 },
          { rank: 5, name: "Mountain Kings", bibNumber: "T-05", points: 14, change: 2 },
          { rank: 6, name: "Desert Eagles", bibNumber: "T-06", points: 12, change: -1 },
        ];

  const entries = useLiveLeaderboard(eventId, demoEntries);

  const isRunning = eventType === "RUNNING";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-400" />
          <h3 className="font-semibold text-white">
            {compact ? "Leaderboard" : "Live Leaderboard"}
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-xs font-medium text-emerald-400">Live</span>
          <span className="ml-1 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-12 gap-2 border-b border-white/5 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
        <div className="col-span-1">#</div>
        <div className="col-span-5">Participant</div>
        <div className="col-span-3">BIB</div>
        <div className="col-span-2 text-right">{isRunning ? "Time" : "Pts"}</div>
        <div className="col-span-1 text-right">Δ</div>
      </div>

      {/* Entries */}
      <div className="divide-y divide-white/5">
        <AnimatePresence mode="popLayout">
          {entries.slice(0, compact ? 5 : entries.length).map((entry, i) => (
            <motion.div
              key={entry.bibNumber}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className={`grid grid-cols-12 items-center gap-2 px-5 py-3.5 transition-colors ${
                i < 3 ? "bg-amber-500/5" : "hover:bg-white/5"
              }`}
            >
              {/* Rank */}
              <div className="col-span-1 text-lg font-bold">
                {i < 3 ? (
                  <span>{MEDALS[i]}</span>
                ) : (
                  <span className="text-gray-500 text-sm">{entry.rank}</span>
                )}
              </div>

              {/* Name */}
              <div className="col-span-5">
                <p className={`text-sm font-semibold ${i < 3 ? "text-white" : "text-gray-300"}`}>
                  {entry.name}
                </p>
                {entry.category && (
                  <p className="text-xs text-gray-500">{entry.category}</p>
                )}
              </div>

              {/* BIB */}
              <div className="col-span-3">
                <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-xs text-gray-400">
                  {entry.bibNumber}
                </span>
              </div>

              {/* Time / Points */}
              <div className="col-span-2 text-right">
                <span className={`text-sm font-bold ${i < 3 ? "text-amber-400" : "text-gray-300"}`}>
                  {isRunning ? entry.time : entry.points}
                </span>
              </div>

              {/* Change */}
              <div className="col-span-1 flex justify-end">
                {entry.change === 0 || entry.change === undefined ? (
                  <Minus className="h-3.5 w-3.5 text-gray-600" />
                ) : entry.change > 0 ? (
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-red-400" />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {compact && entries.length > 5 && (
        <div className="border-t border-white/10 p-3 text-center">
          <span className="text-xs text-gray-500">+{entries.length - 5} more participants</span>
        </div>
      )}
    </div>
  );
}
