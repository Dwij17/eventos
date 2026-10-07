import { Suspense } from "react";
import { Search, SlidersHorizontal, X, Calendar, MapPin, Tag } from "lucide-react";
import EventCard from "@/components/events/EventCard";
import ExploreFilters from "@/components/events/ExploreFilters";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Events",
  description: "Discover amazing sports, college, and entertainment events near you. Filter by category, location, date, and price.",
};

// Demo events for when DB is empty
const demoEvents = [
  {
    id: "1", title: "Mumbai Marathon 2027", slug: "mumbai-marathon-2027", type: "RUNNING",
    coverImage: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&q=80",
    startDate: "2027-01-15T06:00:00Z", endDate: "2027-01-15T14:00:00Z",
    city: "Mumbai", state: "Maharashtra", venueName: "CST",
    isFeatured: true,
    organizer: { orgName: "RunIndia Sports", slug: "runindia-sports", logo: null },
    categories: [
      { id: "c1", name: "Full Marathon", price: 2500, distance: 42.2, capacity: 5000, registeredCount: 3200 },
      { id: "c2", name: "Half Marathon", price: 1500, distance: 21.1, capacity: 8000, registeredCount: 5500 },
      { id: "c3", name: "10K Run", price: 800, distance: 10, capacity: 10000, registeredCount: 7800 },
    ],
    _count: { registrations: 16500 },
  },
  {
    id: "2", title: "IPL Fan Cricket Tournament", slug: "ipl-fan-cricket-2027", type: "CRICKET",
    coverImage: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80",
    startDate: "2027-03-10T09:00:00Z", endDate: "2027-03-12T18:00:00Z",
    city: "Bangalore", state: "Karnataka", venueName: "M. Chinnaswamy Stadium",
    isFeatured: true,
    organizer: { orgName: "CricBuzz Events", slug: "cricbuzz-events", logo: null },
    categories: [
      { id: "c5", name: "Under-19", price: 5000, distance: null, capacity: 32, registeredCount: 28 },
      { id: "c6", name: "Open", price: 8000, distance: null, capacity: 64, registeredCount: 52 },
    ],
    _count: { registrations: 80 },
  },
  {
    id: "3", title: "Sunrise Yoga & Fitness Festival", slug: "sunrise-yoga-fitness-2027", type: "FITNESS",
    coverImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    startDate: "2027-02-14T05:30:00Z", endDate: "2027-02-14T12:00:00Z",
    city: "Goa", state: "Goa", venueName: "Baga Beach", isFeatured: false,
    organizer: { orgName: "FitLife India", slug: "fitlife-india", logo: null },
    categories: [
      { id: "c7", name: "Yoga", price: 0, distance: null, capacity: 500, registeredCount: 320 },
      { id: "c8", name: "CrossFit", price: 1200, distance: null, capacity: 200, registeredCount: 145 },
    ],
    _count: { registrations: 465 },
  },
  {
    id: "4", title: "Delhi Football Championship", slug: "delhi-football-championship-2027", type: "FOOTBALL",
    coverImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    startDate: "2027-04-05T08:00:00Z", endDate: "2027-04-07T18:00:00Z",
    city: "New Delhi", state: "Delhi", venueName: "JN Stadium", isFeatured: true,
    organizer: { orgName: "Delhi Sports Council", slug: "delhi-sports-council", logo: null },
    categories: [
      { id: "c9", name: "Men's Open", price: 3000, distance: null, capacity: 24, registeredCount: 20 },
    ],
    _count: { registrations: 20 },
  },
  {
    id: "5", title: "TechFest 2027 — IIT Bombay", slug: "techfest-iitb-2027", type: "COLLEGE",
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    startDate: "2027-01-28T09:00:00Z", endDate: "2027-01-30T22:00:00Z",
    city: "Mumbai", state: "Maharashtra", venueName: "IIT Bombay", isFeatured: false,
    organizer: { orgName: "TechFest IIT Bombay", slug: "techfest-iitb", logo: null },
    categories: [
      { id: "c11", name: "General", price: 500, distance: null, capacity: 10000, registeredCount: 7500 },
    ],
    _count: { registrations: 7500 },
  },
  {
    id: "6", title: "Comedy Nights Live", slug: "comedy-nights-bangalore-2027", type: "ENTERTAINMENT",
    coverImage: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80",
    startDate: "2027-02-20T19:00:00Z", endDate: "2027-02-20T22:00:00Z",
    city: "Bangalore", state: "Karnataka", venueName: "Phoenix Marketcity", isFeatured: false,
    organizer: { orgName: "LiveWire", slug: "livewire", logo: null },
    categories: [
      { id: "c13", name: "Silver", price: 999, distance: null, capacity: 500, registeredCount: 420 },
      { id: "c14", name: "Gold", price: 1999, distance: null, capacity: 200, registeredCount: 175 },
    ],
    _count: { registrations: 595 },
  },
  {
    id: "7", title: "Hyderabad Night Run", slug: "hyderabad-night-run-2027", type: "RUNNING",
    coverImage: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
    startDate: "2027-02-01T20:00:00Z", endDate: "2027-02-01T23:00:00Z",
    city: "Hyderabad", state: "Telangana", venueName: "Hussain Sagar", isFeatured: false,
    organizer: { orgName: "RunHyd", slug: "runhyd", logo: null },
    categories: [
      { id: "c16", name: "10K", price: 600, distance: 10, capacity: 3000, registeredCount: 2100 },
      { id: "c17", name: "5K", price: 400, distance: 5, capacity: 5000, registeredCount: 3500 },
    ],
    _count: { registrations: 5600 },
  },
  {
    id: "8", title: "Chennai Badminton Open", slug: "chennai-badminton-2027", type: "OTHER",
    coverImage: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80",
    startDate: "2027-03-22T08:00:00Z", endDate: "2027-03-23T18:00:00Z",
    city: "Chennai", state: "Tamil Nadu", venueName: "SDAT Complex", isFeatured: false,
    organizer: { orgName: "Chennai Sports", slug: "chennai-sports", logo: null },
    categories: [
      { id: "c18", name: "Singles", price: 1500, distance: null, capacity: 128, registeredCount: 96 },
      { id: "c19", name: "Doubles", price: 2000, distance: null, capacity: 64, registeredCount: 48 },
    ],
    _count: { registrations: 144 },
  },
  {
    id: "9", title: "Pune Cycling Challenge", slug: "pune-cycling-2027", type: "FITNESS",
    coverImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
    startDate: "2027-03-01T05:00:00Z", endDate: "2027-03-01T12:00:00Z",
    city: "Pune", state: "Maharashtra", venueName: "Shaniwar Wada", isFeatured: false,
    organizer: { orgName: "CyclePune", slug: "cyclepune", logo: null },
    categories: [
      { id: "c20", name: "50K", price: 1200, distance: 50, capacity: 1000, registeredCount: 720 },
      { id: "c21", name: "100K", price: 2000, distance: 100, capacity: 500, registeredCount: 380 },
    ],
    _count: { registrations: 1100 },
  },
];

interface ExplorePageProps {
  searchParams: Promise<{
    q?: string;
    type?: string;
    city?: string;
    dateFrom?: string;
    dateTo?: string;
    priceMin?: string;
    priceMax?: string;
    sortBy?: string;
    page?: string;
  }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const type = params.type || "";
  const city = params.city || "";
  const sortBy = params.sortBy || "date";
  const page = parseInt(params.page || "1");

  // Try to fetch from database
  let events = demoEvents;
  let totalPages = 1;

  try {
    const where: any = { status: "PUBLISHED" };
    if (query) {
      where.OR = [
        { title: { contains: query, mode: "insensitive" } },
        { city: { contains: query, mode: "insensitive" } },
        { shortDescription: { contains: query, mode: "insensitive" } },
      ];
    }
    if (type) where.type = type;
    if (city) where.city = { contains: city, mode: "insensitive" };

    const [dbEvents, total] = await Promise.all([
      prisma.event.findMany({
        where,
        include: {
          organizer: { select: { orgName: true, slug: true, logo: true } },
          categories: {
            select: { id: true, name: true, price: true, distance: true, capacity: true, registeredCount: true },
            where: { isActive: true },
            orderBy: { sortOrder: "asc" },
          },
          _count: { select: { registrations: true } },
        },
        orderBy: sortBy === "popularity" ? { registrations: { _count: "desc" } } : { startDate: "asc" },
        skip: (page - 1) * 12,
        take: 12,
      }),
      prisma.event.count({ where }),
    ]);

    if (dbEvents.length > 0) {
      events = dbEvents.map((e: any) => ({
        ...e,
        startDate: e.startDate.toISOString(),
        endDate: e.endDate.toISOString(),
      })) as any;
      totalPages = Math.ceil(total / 12);
    }
  } catch {
    // Filter demo data client-side
    if (query) {
      events = events.filter(
        (e) =>
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.city?.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (type) {
      events = events.filter((e) => e.type === type);
    }
  }

  const eventTypes = [
    { value: "", label: "All Types" },
    { value: "RUNNING", label: "🏃 Running" },
    { value: "CRICKET", label: "🏏 Cricket" },
    { value: "FOOTBALL", label: "⚽ Football" },
    { value: "FITNESS", label: "💪 Fitness" },
    { value: "COLLEGE", label: "🎓 College" },
    { value: "ENTERTAINMENT", label: "🎭 Entertainment" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary text-white py-16 lg:py-20">
        <div className="container-main">
          <h1 className="text-3xl lg:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
            Explore <span className="gradient-text">Events</span>
          </h1>
          <p className="text-white/60 text-lg max-w-lg mb-8">
            Find your next adventure. Search by name, category, location, or date.
          </p>

          {/* Search Bar */}
          <ExploreFilters
            initialQuery={query}
            initialType={type}
            initialCity={city}
            eventTypes={eventTypes}
          />
        </div>
      </div>

      {/* Results */}
      <div className="container-main py-10 lg:py-14">
        {/* Active Filters */}
        {(query || type) && (
          <div className="flex items-center gap-2 flex-wrap mb-6">
            <span className="text-sm text-muted-foreground">Filters:</span>
            {query && (
              <a
                href={`/explore?type=${type}`}
                className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                &ldquo;{query}&rdquo;
                <X size={14} />
              </a>
            )}
            {type && (
              <a
                href={`/explore?q=${query}`}
                className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                {eventTypes.find((t) => t.value === type)?.label || type}
                <X size={14} />
              </a>
            )}
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {events.length} events
          {query && ` for "${query}"`}
        </p>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <EventCard key={event.id} event={event as any} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters to find what you&apos;re looking
              for.
            </p>
            <a href="/explore" className="btn-primary">
              Clear Filters
            </a>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={`/explore?q=${query}&type=${type}&page=${p}`}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                  p === page
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {p}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
