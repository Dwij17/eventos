"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { getPusherClient, CHANNELS, EVENTS } from "@/lib/pusher";
import type { Channel } from "pusher-js";

interface Announcement {
  title: string;
  message: string;
  priority: "low" | "medium" | "high";
  timestamp: string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  bibNumber: string;
  time?: string;
  points?: number;
  category?: string;
  change?: number;
}

interface RegistrationUpdate {
  participantName: string;
  category: string;
  timestamp: string;
}

interface CheckinUpdate {
  participantName: string;
  bibNumber: string;
  timestamp: string;
}

// Hook: subscribe to live announcements for an event
export function useEventAnnouncements(eventId: string) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const channelRef = useRef<Channel | null>(null);

  useEffect(() => {
    if (!eventId) return;

    try {
      const pusher = getPusherClient();
      const channel = pusher.subscribe(CHANNELS.announcements(eventId));
      channelRef.current = channel;

      channel.bind(EVENTS.ANNOUNCEMENT, (data: Announcement) => {
        setAnnouncements((prev) => [data, ...prev].slice(0, 20));
      });
    } catch {
      // Demo mode: simulate announcements
      const mockAnnouncement: Announcement = {
        title: "Race Update",
        message: "Water station 3 is now open at km marker 21.",
        priority: "medium",
        timestamp: new Date().toISOString(),
      };
      setTimeout(() => {
        setAnnouncements([mockAnnouncement]);
      }, 2000);
    }

    return () => {
      try {
        getPusherClient().unsubscribe(CHANNELS.announcements(eventId));
      } catch {}
    };
  }, [eventId]);

  return announcements;
}

// Hook: subscribe to live leaderboard updates
export function useLiveLeaderboard(eventId: string, initialEntries: LeaderboardEntry[] = []) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(initialEntries);

  useEffect(() => {
    if (!eventId) return;

    try {
      const pusher = getPusherClient();
      const channel = pusher.subscribe(CHANNELS.leaderboard(eventId));

      channel.bind(EVENTS.LEADERBOARD_UPDATE, (data: { entries: LeaderboardEntry[] }) => {
        setEntries(data.entries);
      });

      return () => {
        pusher.unsubscribe(CHANNELS.leaderboard(eventId));
      };
    } catch {
      // Demo mode: simulate periodic updates
      const interval = setInterval(() => {
        setEntries((prev) =>
          prev.map((e) => ({
            ...e,
            points: e.points ? e.points + Math.floor(Math.random() * 3) : e.points,
          }))
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [eventId]);

  return entries;
}

// Hook: live registration feed
export function useLiveRegistrations(eventId: string) {
  const [registrations, setRegistrations] = useState<RegistrationUpdate[]>([]);

  useEffect(() => {
    if (!eventId) return;

    try {
      const pusher = getPusherClient();
      const channel = pusher.subscribe(CHANNELS.event(eventId));

      channel.bind(EVENTS.NEW_REGISTRATION, (data: RegistrationUpdate) => {
        setRegistrations((prev) => [data, ...prev].slice(0, 10));
      });

      return () => {
        pusher.unsubscribe(CHANNELS.event(eventId));
      };
    } catch {
      // Demo mode
      const names = ["Arjun Mehta", "Priya Singh", "Rahul Kumar", "Anita Nair"];
      const cats = ["Full Marathon", "Half Marathon", "10K Run"];
      let i = 0;
      const interval = setInterval(() => {
        setRegistrations((prev) =>
          [
            {
              participantName: names[i % names.length],
              category: cats[i % cats.length],
              timestamp: new Date().toISOString(),
            },
            ...prev,
          ].slice(0, 10)
        );
        i++;
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [eventId]);

  return registrations;
}

// Hook: live check-in feed
export function useLiveCheckins(eventId: string) {
  const [checkins, setCheckins] = useState<CheckinUpdate[]>([]);

  useEffect(() => {
    if (!eventId) return;

    try {
      const pusher = getPusherClient();
      const channel = pusher.subscribe(CHANNELS.event(eventId));

      channel.bind(EVENTS.CHECKIN, (data: CheckinUpdate) => {
        setCheckins((prev) => [data, ...prev].slice(0, 20));
      });

      return () => {
        pusher.unsubscribe(CHANNELS.event(eventId));
      };
    } catch {
      // Demo mode
      const names = ["Vikram Rao", "Deepa Patel", "Suresh Kumar", "Kavya Reddy"];
      let i = 0;
      const interval = setInterval(() => {
        setCheckins((prev) =>
          [
            {
              participantName: names[i % names.length],
              bibNumber: `BIB-${1000 + i}`,
              timestamp: new Date().toISOString(),
            },
            ...prev,
          ].slice(0, 20)
        );
        i++;
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [eventId]);

  return checkins;
}

// Helper: trigger a real-time event from the client
export async function triggerRealtimeEvent(
  eventId: string,
  type: string,
  data: Record<string, unknown>
) {
  try {
    await fetch("/api/realtime/trigger", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, type, data }),
    });
  } catch {
    // Silently fail in demo
  }
}
