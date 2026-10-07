"use client";

import { useState, use } from "react";
import Link from "next/link";
import {
  Trophy,
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Radio,
  ChevronRight,
  Shield,
  Activity,
  Flame,
} from "lucide-react";
import { demoEvents } from "@/lib/demoData";

interface TournamentPageProps {
  params: Promise<{ slug: string }>;
}

export default function TournamentCenterPage({ params }: TournamentPageProps) {
  const resolvedParams = use(params);
  const event = demoEvents.find((e) => e.slug === resolvedParams.slug) || demoEvents[1]; // IPL Fan Cricket

  const [activeTab, setActiveTab] = useState<"live" | "points" | "fixtures">("live");
  const [showFullScorecard, setShowFullScorecard] = useState(false);

  const pointsTable = [
    { rank: 1, team: "Mumbai Blasters", p: 7, w: 6, l: 1, nr: 0, nrr: "+1.240", pts: 12, form: ["W", "W", "W", "L", "W"] },
    { rank: 2, team: "Bangalore Strikers", p: 7, w: 5, l: 2, nr: 0, nrr: "+0.850", pts: 10, form: ["W", "L", "W", "W", "W"] },
    { rank: 3, team: "Chennai Kings XI", p: 7, w: 4, l: 3, nr: 0, nrr: "+0.310", pts: 8, form: ["L", "W", "W", "L", "W"] },
    { rank: 4, team: "Delhi Capitals Club", p: 7, w: 3, l: 4, nr: 0, nrr: "-0.120", pts: 6, form: ["W", "L", "L", "W", "L"] },
    { rank: 5, team: "Kolkata Knights Fan Club", p: 7, w: 2, l: 5, nr: 0, nrr: "-0.780", pts: 4, form: ["L", "L", "W", "L", "L"] },
    { rank: 6, team: "Hyderabad Hawks", p: 7, w: 1, l: 6, nr: 0, nrr: "-1.450", pts: 2, form: ["L", "L", "L", "L", "W"] },
  ];

  const fixtures = [
    {
      id: "m-01",
      matchNo: "Match 21",
      stage: "Group Stage",
      teamA: "Mumbai Blasters",
      scoreA: "182/4 (20.0 ov)",
      teamB: "Bangalore Strikers",
      scoreB: "164/5 (18.2 ov)",
      status: "LIVE",
      note: "Bangalore Strikers need 19 runs in 10 balls",
      venue: "M. Chinnaswamy Stadium, Bangalore",
      time: "Live Now",
    },
    {
      id: "m-02",
      matchNo: "Match 22",
      stage: "Group Stage",
      teamA: "Chennai Kings XI",
      scoreA: "172/7 (20.0 ov)",
      teamB: "Delhi Capitals Club",
      scoreB: "158/9 (20.0 ov)",
      status: "COMPLETED",
      note: "Chennai Kings XI won by 14 runs",
      venue: "M. Chinnaswamy Stadium, Bangalore",
      time: "Yesterday",
    },
    {
      id: "m-03",
      matchNo: "Match 23",
      stage: "Semi-Final 1",
      teamA: "Mumbai Blasters",
      scoreA: "",
      teamB: "Chennai Kings XI",
      scoreB: "",
      status: "UPCOMING",
      note: "Starts at 07:00 PM IST",
      venue: "M. Chinnaswamy Stadium, Bangalore",
      time: "Tomorrow, 07:00 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08080c] py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-white/60 hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Event Overview
          </Link>
          <span className="badge-primary text-xs px-3 py-1 font-semibold">
            {event.type} TOURNAMENT
          </span>
        </div>

        {/* Hero Header */}
        <div className="rounded-3xl bg-gradient-to-r from-secondary via-slate-900 to-[#1e1b4b] p-6 sm:p-8 text-white border border-white/10 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-500/30">
              <Radio size={13} className="animate-pulse" />
              Live Match Center & Points Table
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)]">
              {event.title}
            </h1>
            <p className="text-xs text-white/70 mt-1 max-w-xl">
              Ball-by-ball tournament scorecards, team standings, and qualification scenarios.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-right">
            <div>
              <span className="text-white/50 block">Venue</span>
              <span className="font-bold text-white">{event.venueName}, {event.city}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-slate-200 dark:border-white/10 pb-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab("live")}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
              activeTab === "live"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white dark:bg-[#0c0c16] text-slate-600 dark:text-white/60 border border-slate-200 dark:border-white/10"
            }`}
          >
            <Radio size={14} className={activeTab === "live" ? "animate-pulse" : ""} />
            Live Match Center
          </button>
          <button
            onClick={() => setActiveTab("points")}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
              activeTab === "points"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white dark:bg-[#0c0c16] text-slate-600 dark:text-white/60 border border-slate-200 dark:border-white/10"
            }`}
          >
            <Trophy size={14} />
            Points Table (Standings)
          </button>
          <button
            onClick={() => setActiveTab("fixtures")}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
              activeTab === "fixtures"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white dark:bg-[#0c0c16] text-slate-600 dark:text-white/60 border border-slate-200 dark:border-white/10"
            }`}
          >
            <Calendar size={14} />
            Match Schedule & Fixtures
          </button>
        </div>

        {/* TAB 1: LIVE MATCH CENTER */}
        {activeTab === "live" && (
          <div className="space-y-6">
            {/* Live Match Hero Card */}
            <div className="rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 overflow-hidden shadow-xl">
              <div className="bg-gradient-to-r from-orange-500/10 via-primary/10 to-red-500/10 p-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-primary">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  MATCH 21 • 2ND INNINGS IN PROGRESS
                </span>
                <span className="text-xs text-slate-600 dark:text-white/60 font-mono">
                  Current Run Rate: 8.94 • Req: 11.40
                </span>
              </div>

              {/* Match Teams & Score Summary */}
              <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Team A */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-sm">
                      MB
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                        Mumbai Blasters
                      </h3>
                      <span className="text-xs text-slate-600 dark:text-white/60">1st Innings Completed</span>
                    </div>
                  </div>
                  <div className="text-3xl font-black font-mono text-slate-900 dark:text-white">
                    182/4 <span className="text-sm font-normal text-slate-600 dark:text-white/60">(20.0 ov)</span>
                  </div>
                </div>

                {/* Team B */}
                <div className="space-y-2 md:text-right border-t md:border-t-0 md:border-l border-slate-100 dark:border-white/5 pt-4 md:pt-0 md:pl-8">
                  <div className="flex items-center md:justify-end gap-3">
                    <div className="md:order-2 w-10 h-10 rounded-xl bg-red-500/20 text-red-500 flex items-center justify-center font-bold text-sm">
                      BS
                    </div>
                    <div className="md:order-1">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                        Bangalore Strikers
                      </h3>
                      <span className="text-xs text-primary font-bold">Currently Batting</span>
                    </div>
                  </div>
                  <div className="text-3xl font-black font-mono text-primary">
                    164/5 <span className="text-sm font-normal text-slate-600 dark:text-white/60">(18.2 ov)</span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Need 19 runs in 10 balls to win
                  </p>
                </div>
              </div>

              {/* Live Batsmen & Bowlers mini card */}
              <div className="p-6 bg-slate-50 dark:bg-white/5 border-t border-slate-100 dark:border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* Batters */}
                <div className="space-y-2">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-slate-600 dark:text-white/60 block">
                    Batters on Strike
                  </span>
                  <div className="space-y-1.5 font-mono">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-black/30 font-semibold">
                      <span className="font-sans text-slate-900 dark:text-white">
                        Rohan Verma *
                      </span>
                      <span>54 (32b, 5x4, 2x6) • SR 168.7</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-black/30 text-slate-700 dark:text-white/80">
                      <span className="font-sans text-slate-900 dark:text-white">
                        Karan Mehra
                      </span>
                      <span>18 (9b, 2x4, 1x6) • SR 200.0</span>
                    </div>
                  </div>
                </div>

                {/* Bowler */}
                <div className="space-y-2">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-slate-600 dark:text-white/60 block">
                    Current Bowler
                  </span>
                  <div className="p-2 rounded-xl bg-white dark:bg-black/30 flex items-center justify-between font-mono font-semibold">
                    <span className="font-sans text-slate-900 dark:text-white">
                      Jaspreet Bumrah
                    </span>
                    <span>3.2-0-28-2 • Econ 8.40</span>
                  </div>
                  <div className="flex items-center gap-1.5 pt-1 text-[11px] text-slate-600 dark:text-white/60">
                    <span>This Over:</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 font-bold">1</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white font-bold">4</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 font-bold">0</span>
                    <span className="px-1.5 py-0.5 rounded bg-primary text-white font-bold">6</span>
                    <span className="px-1.5 py-0.5 rounded bg-red-500 text-white font-bold">W</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 font-bold">1</span>
                  </div>
                </div>
              </div>

              {/* Full Scorecard Toggle */}
              <div className="p-4 border-t border-slate-100 dark:border-white/5 text-center">
                <button
                  onClick={() => setShowFullScorecard(!showFullScorecard)}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  {showFullScorecard ? "Hide Detailed Scorecard" : "View Complete Innings Scorecard"}
                </button>
              </div>

              {showFullScorecard && (
                <div className="p-6 border-t border-slate-200 dark:border-white/10 space-y-6 text-xs">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                      Mumbai Blasters Innings (182/4)
                    </h4>
                    <table className="w-full text-left font-mono text-[11px]">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-white/10 text-slate-600">
                          <th className="py-2">Batter</th>
                          <th>R</th>
                          <th>B</th>
                          <th>4s</th>
                          <th>6s</th>
                          <th>SR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                        <tr><td className="py-2 font-sans font-semibold">Rohit Sharma c & b Chahal</td><td>48</td><td>30</td><td>5</td><td>2</td><td>160.0</td></tr>
                        <tr><td className="py-2 font-sans font-semibold">Ishan Kishan b Siraj</td><td>24</td><td>15</td><td>3</td><td>1</td><td>160.0</td></tr>
                        <tr><td className="py-2 font-sans font-semibold">Suryakumar Yadav c Kohli b Patel</td><td>68</td><td>38</td><td>7</td><td>4</td><td>178.9</td></tr>
                        <tr><td className="py-2 font-sans font-semibold">Hardik Pandya not out</td><td>32</td><td>18</td><td>2</td><td>2</td><td>177.7</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: POINTS TABLE */}
        {activeTab === "points" && (
          <div className="rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Trophy size={16} className="text-primary" />
                  Tournament Standings
                </h3>
                <p className="text-xs text-slate-600 dark:text-white/60">
                  Top 4 teams qualify for the semi-finals playoffs
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/10 text-slate-600 dark:text-white/60 font-semibold uppercase tracking-wider text-[10px] bg-slate-50/50 dark:bg-white/[0.02]">
                    <th className="py-3 px-4">Pos</th>
                    <th className="py-3 px-4 font-sans">Team</th>
                    <th className="py-3 px-4">P</th>
                    <th className="py-3 px-4">W</th>
                    <th className="py-3 px-4">L</th>
                    <th className="py-3 px-4">NRR</th>
                    <th className="py-3 px-4">PTS</th>
                    <th className="py-3 px-4 font-sans text-center">Recent Form</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {pointsTable.map((t) => (
                    <tr
                      key={t.team}
                      className={`hover:bg-slate-50/50 dark:hover:bg-white/[0.02] ${
                        t.rank <= 4 ? "bg-emerald-500/[0.02]" : ""
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold">
                        <span className={`inline-block w-6 h-6 rounded-full text-center leading-6 text-xs ${
                          t.rank <= 4 ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold" : "text-slate-600"
                        }`}>
                          {t.rank}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-sans font-bold text-slate-900 dark:text-white">
                        {t.team}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 dark:text-white/80">{t.p}</td>
                      <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-bold">{t.w}</td>
                      <td className="py-3.5 px-4 text-red-500">{t.l}</td>
                      <td className="py-3.5 px-4 font-semibold">{t.nrr}</td>
                      <td className="py-3.5 px-4 font-black text-primary text-sm">{t.pts}</td>
                      <td className="py-3.5 px-4 font-sans">
                        <div className="flex items-center justify-center gap-1">
                          {t.form.map((f, i) => (
                            <span
                              key={i}
                              className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                                f === "W"
                                  ? "bg-emerald-500 text-white"
                                  : "bg-red-500 text-white"
                              }`}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: FIXTURES */}
        {activeTab === "fixtures" && (
          <div className="space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Tournament Match Schedule
            </h3>
            <div className="space-y-3">
              {fixtures.map((m) => (
                <div
                  key={m.id}
                  className="rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-600 dark:text-white/60">
                        {m.matchNo} • {m.stage}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          m.status === "LIVE"
                            ? "bg-red-500 text-white animate-pulse"
                            : m.status === "COMPLETED"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-white/60"
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>

                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {m.teamA} {m.scoreA && <span className="font-mono text-xs text-primary">({m.scoreA})</span>}{" "}
                      vs{" "}
                      {m.teamB} {m.scoreB && <span className="font-mono text-xs text-primary">({m.scoreB})</span>}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-white/70">
                      {m.note}
                    </p>
                  </div>

                  <div className="sm:text-right text-xs text-slate-600 dark:text-white/60 space-y-1">
                    <div className="flex items-center sm:justify-end gap-1.5">
                      <Clock size={13} className="text-primary" />
                      <span>{m.time}</span>
                    </div>
                    <div className="flex items-center sm:justify-end gap-1.5">
                      <MapPin size={13} className="text-primary" />
                      <span>{m.venue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
