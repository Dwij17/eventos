import Pusher from "pusher";
import PusherClient from "pusher-js";

// Server-side Pusher instance
export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID || "demo-app-id",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || "demo-key",
  secret: process.env.PUSHER_SECRET || "demo-secret",
  cluster: process.env.PUSHER_CLUSTER || "ap2",
  useTLS: true,
});

// Client-side Pusher instance (singleton)
let pusherClientInstance: PusherClient | null = null;

export function getPusherClient(): PusherClient {
  if (!pusherClientInstance) {
    pusherClientInstance = new PusherClient(
      process.env.NEXT_PUBLIC_PUSHER_KEY || "demo-key",
      {
        cluster: process.env.PUSHER_CLUSTER || "ap2",
      }
    );
  }
  return pusherClientInstance;
}

// Channel name helpers
export const CHANNELS = {
  event: (eventId: string) => `event-${eventId}`,
  leaderboard: (eventId: string) => `leaderboard-${eventId}`,
  admin: "admin-dashboard",
  announcements: (eventId: string) => `announcements-${eventId}`,
};

// Event name helpers
export const EVENTS = {
  NEW_REGISTRATION: "new-registration",
  LEADERBOARD_UPDATE: "leaderboard-update",
  ANNOUNCEMENT: "new-announcement",
  CHECKIN: "participant-checkin",
  PLATFORM_STATS: "platform-stats-update",
};
