import { NextRequest, NextResponse } from "next/server";
import { demoEvents } from "@/lib/demoData";

// Mock admin stats
function getAdminStats() {
  return {
    totalUsers: 28450,
    totalEvents: 142,
    totalRegistrations: 89230,
    totalRevenue: 45670000, // in paise
    activeEvents: 23,
    pendingApprovals: 7,
    newUsersToday: 234,
    newRegistrationsToday: 1203,
    revenueToday: 340000,
    platformGrowth: {
      users: 12.4,
      events: 8.7,
      revenue: 23.1,
    },
    topCities: [
      { city: "Mumbai", events: 32, registrations: 24500 },
      { city: "Delhi", events: 28, registrations: 18700 },
      { city: "Bangalore", events: 25, registrations: 16300 },
      { city: "Chennai", events: 18, registrations: 12100 },
      { city: "Hyderabad", events: 15, registrations: 9800 },
    ],
    categoryBreakdown: [
      { type: "RUNNING", count: 45, registrations: 38000 },
      { type: "CRICKET", count: 22, registrations: 12000 },
      { type: "FOOTBALL", count: 18, registrations: 9500 },
      { type: "FITNESS", count: 24, registrations: 14500 },
      { type: "COLLEGE", count: 12, registrations: 8200 },
      { type: "ENTERTAINMENT", count: 21, registrations: 7030 },
    ],
    monthlyRevenue: [
      { month: "Jan", revenue: 3200000, registrations: 8400 },
      { month: "Feb", revenue: 4100000, registrations: 10200 },
      { month: "Mar", revenue: 5800000, registrations: 14500 },
      { month: "Apr", revenue: 4900000, registrations: 12100 },
      { month: "May", revenue: 3700000, registrations: 9200 },
      { month: "Jun", revenue: 2900000, registrations: 7300 },
      { month: "Jul", revenue: 3400000, registrations: 8500 },
      { month: "Aug", revenue: 4200000, registrations: 10500 },
      { month: "Sep", revenue: 5100000, registrations: 12700 },
      { month: "Oct", revenue: 4600000, registrations: 11500 },
      { month: "Nov", revenue: 3800000, registrations: 9500 },
      { month: "Dec", revenue: 4670000, registrations: 11730 },
    ],
  };
}

function getMockUsers(page: number, limit: number, search?: string) {
  const allUsers = [
    { id: "u1", name: "Arjun Mehta", email: "arjun@example.com", role: "PARTICIPANT", status: "ACTIVE", joinedAt: "2026-08-15", registrations: 8 },
    { id: "u2", name: "Priya Singh", email: "priya@example.com", role: "ORGANIZER", status: "ACTIVE", joinedAt: "2026-06-10", registrations: 0, eventsOrganized: 5 },
    { id: "u3", name: "Rahul Kumar", email: "rahul@example.com", role: "PARTICIPANT", status: "ACTIVE", joinedAt: "2026-09-01", registrations: 3 },
    { id: "u4", name: "Anita Nair", email: "anita@example.com", role: "ORGANIZER", status: "SUSPENDED", joinedAt: "2026-07-22", registrations: 0, eventsOrganized: 2 },
    { id: "u5", name: "Vikram Rao", email: "vikram@example.com", role: "PARTICIPANT", status: "ACTIVE", joinedAt: "2026-10-01", registrations: 1 },
    { id: "u6", name: "Deepa Patel", email: "deepa@example.com", role: "PARTICIPANT", status: "ACTIVE", joinedAt: "2026-05-14", registrations: 12 },
    { id: "u7", name: "Suresh Kumar", email: "suresh@example.com", role: "ORGANIZER", status: "ACTIVE", joinedAt: "2026-04-08", registrations: 0, eventsOrganized: 9 },
    { id: "u8", name: "Kavya Reddy", email: "kavya@example.com", role: "PARTICIPANT", status: "INACTIVE", joinedAt: "2026-09-15", registrations: 0 },
    { id: "u9", name: "Amit Sharma", email: "amit@example.com", role: "ADMIN", status: "ACTIVE", joinedAt: "2026-01-01", registrations: 0 },
    { id: "u10", name: "Sanya Iyer", email: "sanya@example.com", role: "PARTICIPANT", status: "ACTIVE", joinedAt: "2026-08-28", registrations: 5 },
  ];

  const filtered = search
    ? allUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      )
    : allUsers;

  const start = (page - 1) * limit;
  return {
    users: filtered.slice(start, start + limit),
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / limit),
  };
}

function getMockPendingEvents() {
  return demoEvents.slice(0, 3).map((e) => ({
    ...e,
    status: "PENDING",
    submittedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  }));
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const resource = searchParams.get("resource");

  switch (resource) {
    case "stats":
      return NextResponse.json(getAdminStats());

    case "users": {
      const page = parseInt(searchParams.get("page") || "1");
      const limit = parseInt(searchParams.get("limit") || "10");
      const search = searchParams.get("search") || undefined;
      return NextResponse.json(getMockUsers(page, limit, search));
    }

    case "events":
      return NextResponse.json({
        events: demoEvents.map((e) => ({
          ...e,
          status: "PUBLISHED",
          revenue: Math.floor(Math.random() * 500000),
        })),
        total: demoEvents.length,
      });

    case "pending":
      return NextResponse.json({ events: getMockPendingEvents() });

    default:
      return NextResponse.json({ error: "Unknown resource" }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { action, targetId, targetType } = body;

  // Simulate admin actions
  const actions: Record<string, string> = {
    approve: "approved",
    reject: "rejected",
    suspend: "suspended",
    activate: "activated",
    delete: "deleted",
    feature: "featured",
  };

  if (!actions[action]) {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    message: `Successfully ${actions[action]} ${targetType} ${targetId}`,
  });
}
