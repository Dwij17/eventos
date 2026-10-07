"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Ticket,
  Award,
  Clock,
  ArrowRight,
  QrCode,
  Flame,
  Activity,
  Compass,
  CalendarX,
} from "lucide-react";
import { demoEvents } from "@/lib/demoData";
import {
  getUserRegistrations,
  getUserProfile,
  getUserCertificates,
  UserRegistration,
  UserProfileData,
} from "@/lib/userStore";

export default function ParticipantDashboard() {
  const [registrations, setRegistrations] = useState<UserRegistration[]>([]);
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [certCount, setCertCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const load = () => {
      setRegistrations(getUserRegistrations());
      setProfile(getUserProfile());
      setCertCount(getUserCertificates().length);
      setIsLoaded(true);
    };

    load();
    window.addEventListener("eventos_storage_updated", load);
    return () => window.removeEventListener("eventos_storage_updated", load);
  }, []);

  if (!isLoaded) {
    return <div className="p-8 text-center text-sm text-slate-500">Loading your dashboard...</div>;
  }

  const upcomingEvent = registrations[0] || null;
  const totalDistance = registrations.reduce(
    (acc, cur) => acc + (cur.distance || 0),
    0
  );
  const activePasses = registrations.filter((r) => r.status === "CONFIRMED").length;
  const userName = profile?.firstName ? profile.firstName : "Athlete";

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-secondary via-slate-900 to-black p-6 sm:p-8 text-white border border-white/10 shadow-xl">
        <div className="absolute right-0 top-0 -bottom-8 w-1/3 bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          {upcomingEvent ? (
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-3 border border-primary/30">
                <Flame size={14} className="text-primary" />
                Upcoming Event Confirmed
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] tracking-tight">
                Welcome back, {userName}!
              </h2>
              <p className="mt-2 text-white/70 text-sm leading-relaxed">
                Your entry for <span className="text-white font-medium">{upcomingEvent.eventTitle}</span> ({upcomingEvent.categoryName}) is ready. Assigned bib:{" "}
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-primary font-bold">
                  {upcomingEvent.bibNumber}
                </span>.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/dashboard/tickets"
                  className="btn-primary text-xs sm:text-sm px-5 py-2.5 flex items-center gap-2"
                >
                  <QrCode size={16} />
                  View Digital Pass
                </Link>
                <Link
                  href="/explore"
                  className="px-5 py-2.5 rounded-xl border border-white/20 text-white text-xs sm:text-sm font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <Compass size={16} />
                  Find More Races
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-3 border border-white/15">
                <Compass size={14} className="text-primary" />
                Ready for your next challenge
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] tracking-tight">
                Welcome to EventOS, {userName}!
              </h2>
              <p className="mt-2 text-white/70 text-sm leading-relaxed">
                You haven't registered for any events yet. Explore upcoming sports tournaments, marathons, cycling races, and campus fests across India.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/explore"
                  className="btn-primary text-xs sm:text-sm px-5 py-2.5 flex items-center gap-2"
                >
                  <Compass size={16} />
                  Browse Live Events
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-white/60">Registered Events</span>
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-primary flex items-center justify-center">
              <Calendar size={16} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-900 dark:text-white font-[family-name:var(--font-display)]">
            {registrations.length}
          </div>
          <p className="mt-1 text-xs text-slate-600 dark:text-white/60">
            {registrations.length === 0 ? "No active registrations" : "Confirmed entries"}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-white/60">Active Passes</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Ticket size={16} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-900 dark:text-white font-[family-name:var(--font-display)]">
            {activePasses}
          </div>
          <p className="mt-1 text-xs text-slate-600 dark:text-white/60">
            QR codes ready for check-in
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-white/60">Target Distance</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Activity size={16} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-900 dark:text-white font-[family-name:var(--font-display)]">
            {totalDistance > 0 ? totalDistance : "0"} <span className="text-xs font-normal text-slate-600 dark:text-white/60">km</span>
          </div>
          <p className="mt-1 text-xs text-slate-600 dark:text-white/60">
            Across registered runs
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-white/60">Certificates</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Award size={16} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-900 dark:text-white font-[family-name:var(--font-display)]">
            {certCount}
          </div>
          <p className="mt-1 text-xs text-slate-600 dark:text-white/60">
            Verified finisher badges
          </p>
        </div>
      </div>

      {/* Main Section: My Registered Events */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
              My Registrations
            </h3>
            <p className="text-xs text-slate-600 dark:text-white/60">
              Your confirmed race entries and event passes
            </p>
          </div>
          {registrations.length > 0 && (
            <Link
              href="/dashboard/events"
              className="text-xs text-primary font-semibold hover:underline"
            >
              View All ({registrations.length})
            </Link>
          )}
        </div>

        {registrations.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 dark:border-white/10 p-10 text-center space-y-3 bg-white/40 dark:bg-white/[0.02]">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <CalendarX size={24} />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              No Registrations Yet
            </h4>
            <p className="text-xs text-slate-600 dark:text-white/60 max-w-sm mx-auto">
              When you sign up for any marathon, tournament, or sports event on EventOS, your passes and bib numbers will be displayed right here.
            </p>
            <div className="pt-2">
              <Link href="/explore" className="btn-primary text-xs px-4 py-2 inline-flex items-center gap-1.5">
                <Compass size={14} />
                Explore Events
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {registrations.map((reg) => (
              <div
                key={reg.id}
                className="group rounded-3xl bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-white/10 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={reg.coverImage || "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&q=80"}
                      alt={reg.eventTitle}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="badge-primary font-medium text-xs px-2.5 py-1">
                        {reg.eventType}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[11px] font-bold tracking-wide">
                        {reg.status}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h4 className="text-base font-bold truncate">
                        {reg.eventTitle}
                      </h4>
                      <p className="text-xs text-white/80 mt-0.5 truncate">
                        {reg.categoryName}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 dark:border-white/5 text-xs">
                    <div>
                      <span className="text-slate-600 dark:text-white/60 block">Event Date</span>
                      <span className="font-semibold text-slate-800 dark:text-white">
                        {reg.date}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-white/60 block">Assigned Bib</span>
                      <span className="font-mono font-bold text-primary">
                        {reg.bibNumber}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-white/60 block">Venue</span>
                      <span className="font-medium text-slate-800 dark:text-white truncate block">
                        {reg.venue}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-white/60 block">T-Shirt Size</span>
                      <span className="font-medium text-slate-800 dark:text-white">
                        {reg.tShirtSize || "M"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-2 flex items-center justify-between gap-3">
                  <div className="text-[11px] font-mono text-slate-600 dark:text-white/60 truncate">
                    Ref: {reg.registrationNo}
                  </div>
                  <Link
                    href="/dashboard/tickets"
                    className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5"
                  >
                    <QrCode size={14} />
                    View Pass
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Events Row */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
              Recommended For You
            </h3>
            <p className="text-xs text-slate-600 dark:text-white/60">
              Popular sports and endurance challenges coming up next
            </p>
          </div>
          <Link
            href="/explore"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            See All <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoEvents.slice(0, 3).map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className="group rounded-2xl bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-white/10 p-4 shadow-sm hover:shadow-md transition-all block"
            >
              <div className="relative h-36 w-full rounded-xl overflow-hidden mb-3">
                <Image
                  src={event.coverImage}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2">
                  <span className="badge-primary text-[10px] px-2 py-0.5 font-medium">
                    {event.type}
                  </span>
                </div>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary transition-colors truncate">
                {event.title}
              </h4>
              <div className="mt-2 space-y-1 text-xs text-slate-600 dark:text-white/60">
                <div className="flex items-center gap-1.5 truncate">
                  <Calendar size={13} className="text-primary shrink-0" />
                  <span>
                    {new Date(event.startDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin size={13} className="text-primary shrink-0" />
                  <span>
                    {event.venueName}, {event.city}
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">From</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    ₹{Math.min(...event.categories.map((c) => c.price))}
                  </span>
                </div>
                <span className="text-primary font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Event <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
