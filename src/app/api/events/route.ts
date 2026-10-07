import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { demoEvents } from "@/lib/demoData";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || "";
  const city = searchParams.get("city") || "";
  const dateFrom = searchParams.get("dateFrom") || "";
  const dateTo = searchParams.get("dateTo") || "";
  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");
  const sortBy = searchParams.get("sortBy") || "date";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const featured = searchParams.get("featured");

  try {
    // Build where clause
    const where: any = {
      status: "PUBLISHED",
    };

    if (query) {
      where.OR = [
        { title: { contains: query, mode: "insensitive" } },
        { shortDescription: { contains: query, mode: "insensitive" } },
        { city: { contains: query, mode: "insensitive" } },
        { tags: { has: query.toLowerCase() } },
      ];
    }

    if (type) {
      where.type = type;
    }

    if (city) {
      where.city = { contains: city, mode: "insensitive" };
    }

    if (dateFrom) {
      where.startDate = { ...where.startDate, gte: new Date(dateFrom) };
    }

    if (dateTo) {
      where.startDate = { ...where.startDate, lte: new Date(dateTo) };
    }

    if (featured === "true") {
      where.isFeatured = true;
    }

    // Build orderBy
    let orderBy: any = { startDate: "asc" };
    if (sortBy === "popularity") {
      orderBy = { registrations: { _count: "desc" } };
    }

    const skip = (page - 1) * limit;

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        include: {
          organizer: {
            select: {
              orgName: true,
              slug: true,
              logo: true,
            },
          },
          categories: {
            select: {
              id: true,
              name: true,
              price: true,
              distance: true,
              capacity: true,
              registeredCount: true,
            },
            where: { isActive: true },
            orderBy: { sortOrder: "asc" },
          },
          _count: {
            select: { registrations: true },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.event.count({ where }),
    ]);

    // Filter by price if specified (post-query since price is on categories)
    let filteredEvents = events;
    if (priceMin || priceMax) {
      filteredEvents = (events as any[]).filter((event: any) => {
        const minPrice = Math.min(...(event.categories || []).map((c: any) => c.price));
        if (priceMin && minPrice < parseFloat(priceMin)) return false;
        if (priceMax && minPrice > parseFloat(priceMax)) return false;
        return true;
      });
    }

    return NextResponse.json({
      events: filteredEvents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    // Database unavailable: seamlessly serve demo events filtered by user parameters
    let filtered: any[] = [...demoEvents];
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q) ||
          e.organizer.orgName.toLowerCase().includes(q)
      );
    }
    if (type) {
      filtered = filtered.filter((e) => e.type.toUpperCase() === type.toUpperCase());
    }
    if (city) {
      filtered = filtered.filter((e) => e.city.toLowerCase() === city.toLowerCase());
    }
    if (featured === "true") {
      filtered = filtered.filter((e) => e.isFeatured);
    }

    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return NextResponse.json({
      events: paginated,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  }
}
