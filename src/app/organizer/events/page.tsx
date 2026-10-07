"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  PlusCircle,
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  MoreVertical,
  ExternalLink,
  Edit3,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  ArrowUpDown,
} from "lucide-react";
import { demoEvents } from "@/lib/demoData";

export default function OrganizerEventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  const [eventsList, setEventsList] = useState([
    {
      id: "evt-01",
      title: "Mumbai Marathon 2027",
      slug: "mumbai-marathon-2027",
      type: "RUNNING",
      status: "PUBLISHED",
      startDate: "2027-01-15T06:00:00Z",
      city: "Mumbai",
      venue: "CST, Mumbai",
      coverImage: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&q=80",
      registered: 16500,
      capacity: 23000,
      revenue: 21850000,
    },
    {
      id: "evt-02",
      title: "Hyderabad Night Run 2027",
      slug: "hyderabad-night-run-2027",
      type: "RUNNING",
      status: "PUBLISHED",
      startDate: "2027-02-01T20:00:00Z",
      city: "Hyderabad",
      venue: "Hussain Sagar",
      coverImage: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
      registered: 5600,
      capacity: 8000,
      revenue: 2840000,
    },
    {
      id: "evt-03",
      title: "Pune Cycling Challenge 2027",
      slug: "pune-cycling-2027",
      type: "FITNESS",
      status: "DRAFT",
      startDate: "2027-03-01T05:00:00Z",
      city: "Pune",
      venue: "Shaniwar Wada",
      coverImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
      registered: 0,
      capacity: 1500,
      revenue: 0,
    },
    {
      id: "evt-04",
      title: "Monsoon Trail Run 2026",
      slug: "monsoon-trail-run-2026",
      type: "RUNNING",
      status: "COMPLETED",
      startDate: "2026-08-15T06:00:00Z",
      city: "Lonavala",
      venue: "Tiger Point",
      coverImage: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
      registered: 2400,
      capacity: 2400,
      revenue: 2400000,
    },
  ]);

  const togglePublishStatus = (id: string) => {
    setEventsList((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          const nextStatus = e.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
          return { ...e, status: nextStatus };
        }
        return e;
      })
    );
  };

  const filteredEvents = eventsList.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "ALL" || e.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
            Manage Events
          </h2>
          <p className="text-xs text-slate-600 dark:text-white/60">
            Publish, edit, and monitor registrations across all your hosted tournaments and races.
          </p>
        </div>
        <Link
          href="/organizer/events/create"
          className="btn-primary text-xs px-4 py-2.5 flex items-center gap-2 self-start"
        >
          <PlusCircle size={15} />
          Create New Event
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 dark:text-white/60" />
          <input
            type="text"
            placeholder="Search by title or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 self-stretch sm:self-auto overflow-x-auto text-xs">
          {["ALL", "PUBLISHED", "DRAFT", "COMPLETED"].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                selectedStatus === st
                  ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-xs font-semibold"
                  : "text-slate-600 dark:text-white/60"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Events Table */}
      <div className="rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/10 text-slate-600 dark:text-white/60 font-semibold uppercase tracking-wider text-[10px] bg-slate-50/50 dark:bg-white/[0.02]">
                <th className="py-3.5 px-4">Event Details</th>
                <th className="py-3.5 px-4">Sport / Type</th>
                <th className="py-3.5 px-4">Date & Venue</th>
                <th className="py-3.5 px-4">Registrations</th>
                <th className="py-3.5 px-4">Revenue</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredEvents.map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-white/10">
                        <Image
                          src={evt.coverImage}
                          alt={evt.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white text-sm block">
                          {evt.title}
                        </span>
                        <span className="text-[11px] text-slate-600 dark:text-white/60">
                          Slug: /{evt.slug}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="badge-primary text-[10px] px-2.5 py-0.5 font-medium">
                      {evt.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-slate-800 dark:text-white block">
                      {new Date(evt.startDate).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-[11px] text-slate-600 dark:text-white/60">
                      {evt.city}, {evt.venue}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {evt.registered.toLocaleString()} <span className="font-normal text-slate-600 dark:text-white/60">/ {evt.capacity.toLocaleString()}</span>
                    </span>
                    <div className="w-24 h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{
                          width: `${Math.min((evt.registered / evt.capacity) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-white font-[family-name:var(--font-display)]">
                    ₹{evt.revenue.toLocaleString("en-IN")}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        evt.status === "PUBLISHED"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : evt.status === "DRAFT"
                          ? "bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-white/60"
                          : "bg-blue-500/10 text-blue-500"
                      }`}
                    >
                      {evt.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => togglePublishStatus(evt.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                          evt.status === "PUBLISHED"
                            ? "border border-amber-500/30 text-amber-600 hover:bg-amber-500/10"
                            : "bg-emerald-500 text-white hover:bg-emerald-600"
                        }`}
                      >
                        {evt.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                      </button>
                      <Link
                        href={`/events/${evt.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5"
                        title="View Public Page"
                      >
                        <ExternalLink size={14} />
                      </Link>
                      <Link
                        href={`/organizer/participants?event=${evt.id}`}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5"
                        title="Manage Roster"
                      >
                        <Users size={14} />
                      </Link>
                    </div>
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
