"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Trophy,
  CheckCircle,
  Calendar,
  Megaphone,
  Info,
  X,
  Filter,
  CheckCheck,
} from "lucide-react";
import { format, subHours, subDays, subMinutes } from "date-fns";

interface Notification {
  id: string;
  type: "registration" | "announcement" | "result" | "reminder" | "system";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  eventSlug?: string;
  eventTitle?: string;
  action?: { label: string; href: string };
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "registration",
    title: "Registration Confirmed! 🎉",
    message: "You're officially registered for Mumbai Marathon 2027 — Full Marathon category.",
    timestamp: subMinutes(new Date(), 15),
    read: false,
    eventTitle: "Mumbai Marathon 2027",
    eventSlug: "mumbai-marathon-2027",
    action: { label: "View Ticket", href: "/dashboard/tickets" },
  },
  {
    id: "n2",
    type: "announcement",
    title: "Race Kit Collection Open",
    message: "Race bibs for Mumbai Marathon 2027 are available for pickup at CST from Jan 12-14.",
    timestamp: subHours(new Date(), 2),
    read: false,
    eventTitle: "Mumbai Marathon 2027",
    eventSlug: "mumbai-marathon-2027",
  },
  {
    id: "n3",
    type: "result",
    title: "Results Published 🏅",
    message: "Your finisher certificate for Hyderabad Night Run is ready to download!",
    timestamp: subHours(new Date(), 6),
    read: false,
    eventTitle: "Hyderabad Night Run",
    eventSlug: "hyderabad-night-run-2027",
    action: { label: "Download Certificate", href: "/dashboard/certificates" },
  },
  {
    id: "n4",
    type: "reminder",
    title: "Event Tomorrow!",
    message: "IPL Fan Cricket Tournament starts tomorrow at 9:00 AM at Chinnaswamy Stadium.",
    timestamp: subDays(new Date(), 1),
    read: true,
    eventTitle: "IPL Fan Cricket Tournament",
    eventSlug: "ipl-fan-cricket-2027",
  },
  {
    id: "n5",
    type: "system",
    title: "Profile Updated",
    message: "Your profile has been updated successfully. Changes are reflected across all events.",
    timestamp: subDays(new Date(), 2),
    read: true,
  },
  {
    id: "n6",
    type: "announcement",
    title: "New Event: Pune Cycling Challenge",
    message: "Early bird registration is now open for Pune Cycling Challenge. Save ₹300 till Dec 31!",
    timestamp: subDays(new Date(), 3),
    read: true,
    eventTitle: "Pune Cycling Challenge",
    eventSlug: "pune-cycling-2027",
    action: { label: "Register Now", href: "/events/pune-cycling-2027" },
  },
  {
    id: "n7",
    type: "registration",
    title: "Waitlist Update",
    message: "A spot opened up! You can now complete your registration for Delhi Football Championship.",
    timestamp: subDays(new Date(), 4),
    read: true,
    eventTitle: "Delhi Football Championship",
    eventSlug: "delhi-football-championship-2027",
  },
];

const TYPE_CONFIG: Record<
  Notification["type"],
  { icon: React.ElementType; color: string; bg: string }
> = {
  registration: { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-400/15" },
  announcement: { icon: Megaphone, color: "text-amber-400", bg: "bg-amber-400/15" },
  result: { icon: Trophy, color: "text-purple-400", bg: "bg-purple-400/15" },
  reminder: { icon: Calendar, color: "text-blue-400", bg: "bg-blue-400/15" },
  system: { icon: Info, color: "text-gray-400", bg: "bg-gray-400/15" },
};

function formatRelativeTime(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

import { useEffect } from "react";
import { getUserRegistrations } from "@/lib/userStore";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    const regs = getUserRegistrations();
    if (regs.length === 0) {
      setNotifications([
        {
          id: "welcome-1",
          type: "system",
          title: "Welcome to EventOS 👋",
          message: "Discover and register for premier marathons, tournaments, and events across India.",
          timestamp: new Date(),
          read: false,
          action: { label: "Explore Events", href: "/explore" },
        },
      ]);
    } else {
      const regNotifs: Notification[] = regs.map((r, i) => ({
        id: `reg-notif-${r.id}`,
        type: "registration",
        title: "Registration Confirmed! 🎉",
        message: `You're officially registered for ${r.eventTitle} (${r.categoryName}). Bib: ${r.bibNumber}`,
        timestamp: new Date(r.createdAt || Date.now() - i * 3600000),
        read: false,
        eventTitle: r.eventTitle,
        eventSlug: r.eventSlug,
        action: { label: "View Ticket", href: "/dashboard/tickets" },
      }));
      setNotifications(regNotifs);
    }
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) =>
    filter === "unread" ? !n.read : true
  );

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const dismiss = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Bell className="h-6 w-6 text-indigo-400" />
            Notifications
            {unreadCount > 0 && (
              <span className="rounded-full bg-indigo-600 px-2.5 py-0.5 text-sm font-medium">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Stay up to date with your events and registrations
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-colors"
          >
            <CheckCheck className="h-4 w-4" />
            Mark all read
          </button>
        )}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(["all", "unread"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all capitalize ${
              filter === f
                ? "bg-indigo-600 text-white"
                : "border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            {f}
            {f === "unread" && unreadCount > 0 && (
              <span className="ml-1.5 rounded-full bg-white/20 px-1.5 py-0.5 text-xs">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-white/10 bg-white/5 py-16 text-center"
            >
              <Bell className="mx-auto mb-3 h-10 w-10 text-gray-600" />
              <p className="text-gray-400">No notifications here</p>
            </motion.div>
          ) : (
            filtered.map((notif) => {
              const config = TYPE_CONFIG[notif.type];
              const Icon = config.icon;

              return (
                <motion.div
                  key={notif.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  onClick={() => markRead(notif.id)}
                  className={`group relative flex gap-4 rounded-2xl border p-5 cursor-pointer transition-all ${
                    notif.read
                      ? "border-white/5 bg-white/3 hover:bg-white/5"
                      : "border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10"
                  }`}
                >
                  {/* Unread dot */}
                  {!notif.read && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-indigo-500" />
                  )}

                  {/* Icon */}
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${config.bg}`}>
                    <Icon className={`h-5 w-5 ${config.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className={`text-sm font-semibold ${notif.read ? "text-gray-300" : "text-white"}`}>
                          {notif.title}
                        </p>
                        <p className="mt-0.5 text-sm text-gray-500 leading-relaxed">
                          {notif.message}
                        </p>
                        {notif.action && (
                          <a
                            href={notif.action.href}
                            onClick={(e) => e.stopPropagation()}
                            className="mt-2 inline-flex items-center gap-1 rounded-lg bg-indigo-600/20 px-3 py-1 text-xs font-medium text-indigo-400 hover:bg-indigo-600/30 transition-colors"
                          >
                            {notif.action.label} →
                          </a>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {formatRelativeTime(notif.timestamp)}
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); dismiss(notif.id); }}
                          className="opacity-0 group-hover:opacity-100 rounded-lg p-1 text-gray-600 hover:text-gray-400 transition-all"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
