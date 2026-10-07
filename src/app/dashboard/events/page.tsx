"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  QrCode,
  Compass,
  CalendarX,
} from "lucide-react";
import { getUserRegistrations, UserRegistration } from "@/lib/userStore";

export default function MyEventsPage() {
  const [registeredEvents, setRegisteredEvents] = useState<UserRegistration[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const load = () => {
      setRegisteredEvents(getUserRegistrations());
      setIsLoaded(true);
    };
    load();
    window.addEventListener("eventos_storage_updated", load);
    return () => window.removeEventListener("eventos_storage_updated", load);
  }, []);

  if (!isLoaded) {
    return <div className="p-8 text-center text-sm text-slate-500">Loading your events...</div>;
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
            My Registered Events
          </h2>
          <p className="text-xs text-slate-600 dark:text-white/60">
            All sports tournaments, marathons, and fests you have signed up for.
          </p>
        </div>
        <Link
          href="/explore"
          className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 self-start"
        >
          <Compass size={14} />
          Explore More Events
        </Link>
      </div>

      {registeredEvents.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 dark:border-white/10 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <CalendarX size={30} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No Events Registered Yet
          </h3>
          <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed">
            You haven't signed up for any events yet. Explore upcoming marathons, tournaments, and fitness challenges across India.
          </p>
          <div className="pt-2">
            <Link href="/explore" className="btn-primary text-xs px-5 py-2.5 inline-flex items-center gap-2">
              <Compass size={15} />
              Browse Events
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {registeredEvents.map((item) => (
            <div
              key={item.registrationNo}
              className="rounded-3xl bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-white/10 p-5 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={item.coverImage || "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&q=80"}
                    alt={item.eventTitle}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="badge-primary text-xs px-2.5 py-1">
                      {item.eventType}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-base font-bold truncate">
                      {item.eventTitle}
                    </h3>
                    <p className="text-xs text-white/80">{item.categoryName}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs py-2 border-y border-slate-100 dark:border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-white/60">Assigned Bib</span>
                    <span className="font-mono font-bold text-primary">{item.bibNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-white/60">Date & Location</span>
                    <span className="font-medium text-slate-800 dark:text-white">
                      {item.date} • {item.eventCity}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-white/60">Registration ID</span>
                    <span className="font-mono text-slate-600 dark:text-white/60">
                      {item.registrationNo}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <Link
                  href={`/events/${item.eventSlug}`}
                  className="text-xs font-semibold text-slate-600 dark:text-white/70 hover:text-primary transition-colors"
                >
                  Event Details
                </Link>
                <Link
                  href="/dashboard/tickets"
                  className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5"
                >
                  <QrCode size={14} />
                  View Pass & QR
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
