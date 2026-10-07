import { NextRequest, NextResponse } from "next/server";
import { pusherServer, CHANNELS, EVENTS } from "@/lib/pusher";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId, type, data } = body;

    switch (type) {
      case "registration":
        await pusherServer.trigger(
          CHANNELS.event(eventId),
          EVENTS.NEW_REGISTRATION,
          {
            participantName: data.participantName,
            category: data.category,
            timestamp: new Date().toISOString(),
          }
        );
        break;

      case "leaderboard":
        await pusherServer.trigger(
          CHANNELS.leaderboard(eventId),
          EVENTS.LEADERBOARD_UPDATE,
          { entries: data.entries }
        );
        break;

      case "announcement":
        await pusherServer.trigger(
          CHANNELS.announcements(eventId),
          EVENTS.ANNOUNCEMENT,
          {
            title: data.title,
            message: data.message,
            priority: data.priority,
            timestamp: new Date().toISOString(),
          }
        );
        break;

      case "checkin":
        await pusherServer.trigger(
          CHANNELS.event(eventId),
          EVENTS.CHECKIN,
          {
            participantName: data.participantName,
            bibNumber: data.bibNumber,
            timestamp: new Date().toISOString(),
          }
        );
        break;

      case "platform-stats":
        await pusherServer.trigger(CHANNELS.admin, EVENTS.PLATFORM_STATS, data);
        break;

      default:
        return NextResponse.json({ error: "Unknown event type" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Pusher trigger error:", error);
    // Return success even if Pusher fails (demo mode)
    return NextResponse.json({ success: true, demo: true });
  }
}
