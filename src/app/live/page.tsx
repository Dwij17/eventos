"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LiveLeaderboard } from "@/components/LiveLeaderboard";
import { LiveAnnouncementsBanner } from "@/components/LiveAnnouncementsBanner";
import { useLiveCheckins } from "@/lib/realtimeHooks";
import { demoEvents } from "@/lib/demoData";
import {
  Trophy,
  Users,
  Clock,
  MapPin,
  Activity,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

// Combined live event hub - shows all live events and their real-time data
export default function LivePage() {
  const [selectedEvent, setSelectedEvent] = useState(demoEvents[0]);
  const checkins = useLiveCheckins(selectedEvent.id);

  const runningEvents = demoEvents.filter((e) =>
    ["RUNNING", "FITNESS"].includes(e.type)
  );
  const teamEvents = demoEvents.filter((e) =>
    ["CRICKET", "FOOTBALL"].includes(e.type)
  );

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#0d0d20] via-[#12103a] to-[#0a0a1a] px-4 py-16 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_70%)]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400 mb-4">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Live Now
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
            Live Event Hub
          </h1>
          <p className="mt-3 text-gray-400 max-w-xl mx-auto">
            Real-time leaderboards, live check-ins, and instant announcements for all active events.
          </p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Sidebar: Event Selector */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Active Events
            </h2>

            {demoEvents.slice(0, 6).map((event) => (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className={`w-full text-left rounded-xl border p-4 transition-all ${
                  selectedEvent.id === event.id
                    ? "border-indigo-500/50 bg-indigo-500/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={event.coverImage}
                    alt={event.title}
                    className="h-12 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" />
                      {event.city}
                    </p>
                    <div className="mt-1 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs text-emerald-400">
                        {event._count.registrations.toLocaleString()} registered
                      </span>
                    </div>
                  </div>
                  {selectedEvent.id === event.id && (
                    <ChevronRight className="h-4 w-4 text-indigo-400 shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Main: Live Data */}
          <div className="lg:col-span-2 space-y-6">
            {/* Announcements */}
            <LiveAnnouncementsBanner eventId={selectedEvent.id} />

            {/* Event Header */}
            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
              <img
                src={selectedEvent.coverImage}
                alt={selectedEvent.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {selectedEvent.title}
                    </h2>
                    <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {selectedEvent.venueName}, {selectedEvent.city}
                      <span className="text-gray-600">·</span>
                      <Calendar className="h-4 w-4" />
                      {format(new Date(selectedEvent.startDate), "dd MMM yyyy")}
                    </p>
                  </div>
                  <Link
                    href={`/events/${selectedEvent.slug}`}
                    className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                  >
                    View Event
                  </Link>
                </div>

                {/* Stats Row */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    {
                      icon: Users,
                      label: "Registered",
                      value: selectedEvent._count.registrations.toLocaleString(),
                    },
                    {
                      icon: Activity,
                      label: "Checked In",
                      value: checkins.length.toString(),
                    },
                    {
                      icon: Clock,
                      label: "Starts",
                      value: format(new Date(selectedEvent.startDate), "HH:mm"),
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl bg-white/5 p-3 text-center"
                    >
                      <stat.icon className="mx-auto mb-1 h-5 w-5 text-indigo-400" />
                      <p className="text-lg font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Leaderboard */}
            <LiveLeaderboard
              eventId={selectedEvent.id}
              eventType={
                ["RUNNING", "FITNESS"].includes(selectedEvent.type)
                  ? "RUNNING"
                  : "OTHER"
              }
            />

            {/* Live Check-in Feed */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Activity className="h-5 w-5 text-indigo-400" />
                  Live Check-ins
                </h3>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Real-time
                </span>
              </div>

              {checkins.length === 0 ? (
                <p className="py-6 text-center text-sm text-gray-500">
                  Waiting for check-ins to begin...
                </p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {checkins.map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold">
                          {c.participantName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {c.participantName}
                          </p>
                          <p className="text-xs text-gray-500 font-mono">
                            {c.bibNumber}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-emerald-400 bg-emerald-400/10 rounded-full px-2 py-0.5">
                          ✓ Checked in
                        </span>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {format(new Date(c.timestamp), "HH:mm:ss")}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
