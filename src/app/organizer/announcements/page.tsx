"use client";

import { useState } from "react";
import {
  BellRing,
  Send,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Radio,
  Users,
  Plus,
} from "lucide-react";

interface AnnouncementItem {
  id: string;
  title: string;
  message: string;
  event: string;
  priority: "URGENT" | "HIGH" | "NORMAL";
  sentAt: string;
  deliveredTo: number;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([
    {
      id: "ann-01",
      title: "Bib Expo Venue Location & Timing Details",
      message:
        "Bib kit collection will take place at World Trade Centre, Cuffe Parade on Jan 13-14 from 9 AM to 6 PM. Please bring valid photo ID.",
      event: "Mumbai Marathon 2027",
      priority: "HIGH",
      sentAt: "Yesterday at 11:30 AM",
      deliveredTo: 16500,
    },
    {
      id: "ann-02",
      title: "Bandra-Worli Sea Link Weather & Headwind Advisory",
      message:
        "Light coastal breeze expected on the Sea Link bridge stretch (km 24-30). Adequate hydration and electrolyte stations have been positioned every 1.5 km.",
      event: "Mumbai Marathon 2027",
      priority: "NORMAL",
      sentAt: "Oct 2, 2026",
      deliveredTo: 16500,
    },
    {
      id: "ann-03",
      title: "Security Gate A Closes Strictly at 05:40 AM",
      message:
        "Due to VIP movement and official marathon start wave protocol, Gate A will close at 05:40 AM sharp. Late arrivals will not be permitted on course.",
      event: "Mumbai Marathon 2027",
      priority: "URGENT",
      sentAt: "Sep 28, 2026",
      deliveredTo: 16500,
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    message: "",
    priority: "HIGH" as "URGENT" | "HIGH" | "NORMAL",
    event: "Mumbai Marathon 2027",
  });

  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.message) return;

    setIsSending(true);
    await new Promise((r) => setTimeout(r, 1000));

    const newAnn: AnnouncementItem = {
      id: `ann-${Date.now()}`,
      title: form.title,
      message: form.message,
      event: form.event,
      priority: form.priority,
      sentAt: "Just now",
      deliveredTo: 16500,
    };

    setAnnouncements((prev) => [newAnn, ...prev]);
    setForm({ title: "", message: "", priority: "NORMAL", event: "Mumbai Marathon 2027" });
    setIsSending(false);
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
          Event Announcements & Broadcasts
        </h2>
        <p className="text-xs text-slate-600 dark:text-white/60">
          Push critical updates, weather advisories, and bib expo instructions directly to all registered participants.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Compose Form */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-5 shadow-sm">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Radio size={18} className="text-primary animate-pulse" />
              Broadcast New Announcement
            </h3>

            {sentSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <CheckCircle size={15} />
                Announcement broadcast successfully to 16,500 runners!
              </div>
            )}

            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                  Target Event
                </label>
                <select
                  value={form.event}
                  onChange={(e) => setForm({ ...form, event: e.target.value })}
                  className="input-field text-xs"
                >
                  <option value="Mumbai Marathon 2027">Mumbai Marathon 2027 (16,500 runners)</option>
                  <option value="Hyderabad Night Run 2027">Hyderabad Night Run 2027 (5,600 runners)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                  Urgency / Priority
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["NORMAL", "HIGH", "URGENT"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setForm({ ...form, priority: p })}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        form.priority === p
                          ? p === "URGENT"
                            ? "bg-red-500 text-white shadow-md shadow-red-500/25"
                            : p === "HIGH"
                            ? "bg-amber-500 text-white shadow-md shadow-amber-500/25"
                            : "bg-primary text-white shadow-md shadow-primary/25"
                          : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 hover:bg-slate-200"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                  Announcement Headline *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Weather Alert: Early Morning Hydration Stations Active"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="input-field text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                  Message Content *
                </label>
                <textarea
                  rows={4}
                  placeholder="Type clear instructions for runners, timings, gate numbers, or route diversions..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input-field resize-none text-xs"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full btn-primary text-xs py-3 flex items-center justify-center gap-2"
              >
                <Send size={14} />
                {isSending ? "Broadcasting to Runners..." : "Send Live Broadcast"}
              </button>
            </form>
          </div>
        </div>

        {/* Feed of Past Broadcasts */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Broadcast History ({announcements.length})
          </h3>

          <div className="space-y-3">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 shadow-sm space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      ann.priority === "URGENT"
                        ? "bg-red-500/10 text-red-500"
                        : ann.priority === "HIGH"
                        ? "bg-amber-500/10 text-amber-500"
                        : "bg-blue-500/10 text-blue-500"
                    }`}
                  >
                    {ann.priority}
                  </span>
                  <span className="text-[11px] text-slate-600 dark:text-white/60">
                    {ann.sentAt}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {ann.title}
                </h4>

                <p className="text-xs text-slate-600 dark:text-white/70 leading-relaxed">
                  {ann.message}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-600 dark:text-white/60">
                  <span>Target: {ann.event}</span>
                  <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                    <Users size={12} />
                    Delivered to {ann.deliveredTo.toLocaleString()} runners
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
