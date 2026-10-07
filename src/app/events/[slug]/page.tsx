import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Share2,
  Heart,
  ChevronRight,
  Tag,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  Info,
  Trophy,
  Route,
  MessageCircle,
} from "lucide-react";
import prisma from "@/lib/prisma";
import { formatDate, formatDateTime, formatCurrency, getEventTypeIcon, daysUntil } from "@/lib/utils";
import type { Metadata } from "next";

// Demo event detail
const demoEventDetail = {
  id: "1",
  title: "Mumbai Marathon 2027",
  slug: "mumbai-marathon-2027",
  type: "RUNNING" as const,
  status: "PUBLISHED" as const,
  description: `## About Mumbai Marathon 2027

The Mumbai Marathon is India's largest and most prestigious running event, attracting over 50,000 participants from around the world. Now in its 23rd edition, the event continues to inspire runners of all levels.

### What to Expect

- **World-class route** through iconic Mumbai landmarks
- **Professional timing** with chip-based tracking at every checkpoint
- **Live leaderboard** — track your progress in real-time
- **Hydration stations** every 2.5 km with water and electrolytes
- **Medical support** with 50+ aid stations along the route
- **Finisher medal and certificate** for all participants

### Route Highlights

The marathon route takes you through the heart of Mumbai — starting from the historic Chhatrapati Shivaji Terminus, passing the Gateway of India, Marine Drive (the Queen's Necklace), Haji Ali, Bandra-Worli Sea Link, and finishing at the iconic Azad Maidan.

### Who Can Participate

Runners of all levels are welcome! Whether you're a seasoned marathoner or a first-time 5K runner, there's a category for everyone. Children aged 8-14 can participate in the 5K Fun Run with parental consent.`,
  shortDescription: "India's largest marathon — run through the heart of Mumbai with 50,000+ participants from around the world.",
  coverImage: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=1200&q=85",
  gallery: [
    "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
    "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80",
    "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
  ],
  startDate: "2027-01-15T06:00:00Z",
  endDate: "2027-01-15T14:00:00Z",
  registrationStart: "2026-09-01T00:00:00Z",
  registrationEnd: "2027-01-10T23:59:00Z",
  venueName: "Chhatrapati Shivaji Terminus",
  venueAddress: "Chhatrapati Shivaji Terminus Area, Fort, Mumbai, Maharashtra 400001",
  city: "Mumbai",
  state: "Maharashtra",
  country: "India",
  latitude: 18.9398,
  longitude: 72.8354,
  maxParticipants: 38000,
  isOnline: false,
  isFeatured: true,
  tags: ["marathon", "running", "mumbai", "sports", "fitness"],
  rules: "All participants must carry a valid government-issued ID. Bib number must be worn visibly on the chest. No headphones allowed for Full Marathon and Half Marathon categories.",
  faq: [
    { question: "Where do I collect my BIB and race kit?", answer: "BIB collection is at the Expo held at MMRDA Grounds, BKC on January 12-14, from 10 AM to 8 PM. You must carry a valid ID proof." },
    { question: "What time should I arrive?", answer: "Gates open at 4:30 AM. We recommend arriving by 5:00 AM to complete warm-up and settle into your starting corral." },
    { question: "Is parking available?", answer: "Yes, limited parking is available at CSMT area. We strongly recommend using public transport or the official shuttle service from BKC." },
    { question: "Can I change my category after registration?", answer: "Category upgrades are allowed up to 7 days before the event, subject to availability. Downgrades are not permitted." },
    { question: "What documents are required on race day?", answer: "You need your BIB (with timing chip), a valid government-issued ID proof, and the medical fitness certificate for Full Marathon participants." },
  ],
  termsConditions: "By registering, you agree to abide by all event rules and regulations. The organizer reserves the right to modify the event schedule.",
  contactEmail: "support@mumbaimarathon.com",
  contactPhone: "+91 22 2345 6789",
  organizer: {
    id: "org1",
    orgName: "RunIndia Sports",
    slug: "runindia-sports",
    logo: null,
    description: "India's premier running event management company. Organizing world-class marathons since 2004.",
    verified: true,
  },
  categories: [
    { id: "c1", name: "Full Marathon", price: 2500, distance: 42.2, capacity: 5000, registeredCount: 3200, ageMin: 18, ageMax: null, gender: null, startTime: "2027-01-15T06:00:00Z", bibPrefix: "FM" },
    { id: "c2", name: "Half Marathon", price: 1500, distance: 21.1, capacity: 8000, registeredCount: 5500, ageMin: 16, ageMax: null, gender: null, startTime: "2027-01-15T06:45:00Z", bibPrefix: "HM" },
    { id: "c3", name: "10K Run", price: 800, distance: 10, capacity: 10000, registeredCount: 7800, ageMin: 14, ageMax: null, gender: null, startTime: "2027-01-15T07:30:00Z", bibPrefix: "TK" },
    { id: "c4", name: "5K Fun Run", price: 500, distance: 5, capacity: 15000, registeredCount: 9200, ageMin: 8, ageMax: null, gender: null, startTime: "2027-01-15T08:00:00Z", bibPrefix: "FK" },
  ],
  checkpoints: [
    { id: "cp1", name: "Start", distance: 0 },
    { id: "cp2", name: "Marine Drive", distance: 8 },
    { id: "cp3", name: "Haji Ali", distance: 14 },
    { id: "cp4", name: "Bandra-Worli Sea Link", distance: 21 },
    { id: "cp5", name: "Mahim", distance: 28 },
    { id: "cp6", name: "Dadar", distance: 35 },
    { id: "cp7", name: "Finish - Azad Maidan", distance: 42.2 },
  ],
  eventRoutes: [
    { id: "r1", name: "Full Marathon Route", distance: 42.2, color: "#FF6B00" },
    { id: "r2", name: "Half Marathon Route", distance: 21.1, color: "#6C5CE7" },
  ],
  announcements: [
    { id: "a1", title: "Route Map Released", content: "The official route map for Mumbai Marathon 2027 is now available. Check the route section for details.", priority: "NORMAL", createdAt: "2026-11-01T10:00:00Z" },
    { id: "a2", title: "Early Bird Registration Closes Soon", content: "Early bird pricing ends on October 31st. Register now to avail discounted rates!", priority: "HIGH", createdAt: "2026-10-20T10:00:00Z" },
  ],
  _count: { registrations: 25700 },
};

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  // Try DB first, fall back to demo
  let event: any = null;
  try {
    event = await prisma.event.findUnique({
      where: { slug },
      select: { title: true, shortDescription: true, coverImage: true, city: true },
    });
  } catch {}
  if (!event && slug === "mumbai-marathon-2027") {
    event = demoEventDetail;
  }
  if (!event) return { title: "Event Not Found" };

  return {
    title: event.title,
    description: event.shortDescription || `${event.title} in ${event.city}`,
    openGraph: {
      title: event.title,
      description: event.shortDescription || "",
      images: event.coverImage ? [event.coverImage] : [],
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;

  // Try to fetch from database
  let event: any = null;
  try {
    event = await prisma.event.findUnique({
      where: { slug, status: "PUBLISHED" },
      include: {
        organizer: {
          select: { id: true, orgName: true, slug: true, logo: true, description: true, verified: true },
        },
        categories: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        },
        checkpoints: { orderBy: { sortOrder: "asc" } },
        eventRoutes: true,
        announcements: { orderBy: { createdAt: "desc" }, take: 5 },
        _count: { select: { registrations: true } },
      },
    });
    if (event) {
      event = {
        ...event,
        startDate: event.startDate.toISOString(),
        endDate: event.endDate.toISOString(),
        registrationStart: event.registrationStart?.toISOString() || null,
        registrationEnd: event.registrationEnd?.toISOString() || null,
      };
    }
  } catch {}

  // Fall back to demo data
  if (!event && slug === "mumbai-marathon-2027") {
    event = demoEventDetail;
  }

  if (!event) {
    notFound();
  }

  const days = daysUntil(event.startDate);
  const isRegistrationOpen =
    (!event.registrationEnd || new Date(event.registrationEnd) > new Date()) &&
    (!event.registrationStart || new Date(event.registrationStart) <= new Date());
  const totalRegistered = event._count.registrations;
  const totalCapacity = event.categories.reduce((s: number, c: any) => s + (c.capacity || 0), 0);
  const minPrice = Math.min(...event.categories.map((c: any) => c.price));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        {event.coverImage ? (
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

        {/* Content on hero */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="container-main">
            <div className="flex items-center gap-2 mb-3">
              <span className="badge bg-primary text-white text-xs">
                {getEventTypeIcon(event.type)} {event.type.charAt(0) + event.type.slice(1).toLowerCase()}
              </span>
              {event.isFeatured && (
                <span className="badge bg-yellow-500/90 text-white text-xs">⭐ Featured</span>
              )}
              {days > 0 && days <= 7 && (
                <span className="badge bg-red-500/90 text-white text-xs">🔥 {days} days left</span>
              )}
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-white font-[family-name:var(--font-display)] max-w-3xl">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-white/70">
              <span className="flex items-center gap-1.5 text-sm">
                <Calendar size={16} className="text-primary" />
                {formatDate(event.startDate)}
              </span>
              {event.city && (
                <span className="flex items-center gap-1.5 text-sm">
                  <MapPin size={16} className="text-primary" />
                  {event.venueName}, {event.city}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-sm">
                <Users size={16} className="text-primary" />
                {totalRegistered.toLocaleString()} registered
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-main py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-xl font-bold mb-4 font-[family-name:var(--font-display)]">About This Event</h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                {event.description?.replace(/^##\s/gm, '\n').replace(/^###\s/gm, '\n').replace(/\*\*/g, '').replace(/^- /gm, '• ') || event.shortDescription}
              </div>
            </section>

            {/* Categories Table */}
            <section>
              <h2 className="text-xl font-bold mb-4 font-[family-name:var(--font-display)]">
                <Tag size={20} className="inline mr-2 text-primary" />
                Categories & Pricing
              </h2>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border">
                      <th className="text-left px-4 py-3 font-semibold">Category</th>
                      <th className="text-left px-4 py-3 font-semibold">Distance</th>
                      <th className="text-left px-4 py-3 font-semibold">Price</th>
                      <th className="text-left px-4 py-3 font-semibold">Availability</th>
                      <th className="text-left px-4 py-3 font-semibold">Start Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.categories.map((cat: any) => {
                      const spotsLeft = cat.capacity ? cat.capacity - cat.registeredCount : null;
                      const percentFull = cat.capacity ? (cat.registeredCount / cat.capacity) * 100 : 0;
                      return (
                        <tr key={cat.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3.5">
                            <p className="font-semibold">{cat.name}</p>
                            {cat.ageMin && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Age: {cat.ageMin}+
                              </p>
                            )}
                          </td>
                          <td className="px-4 py-3.5">
                            {cat.distance ? `${cat.distance} km` : "—"}
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="font-bold text-primary">
                              {cat.price === 0 ? "Free" : formatCurrency(cat.price)}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            {spotsLeft !== null ? (
                              <div>
                                <div className="flex items-center gap-2">
                                  <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full transition-all ${
                                        percentFull > 90 ? "bg-red-500" : percentFull > 70 ? "bg-yellow-500" : "bg-green-500"
                                      }`}
                                      style={{ width: `${Math.min(percentFull, 100)}%` }}
                                    />
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {spotsLeft > 0 ? `${spotsLeft} left` : "Sold out"}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">Open</span>
                            )}
                          </td>
                          <td className="px-4 py-3.5 text-muted-foreground">
                            {cat.startTime
                              ? new Date(cat.startTime).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
                              : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Checkpoints (for running events) */}
            {event.checkpoints && event.checkpoints.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 font-[family-name:var(--font-display)]">
                  <Route size={20} className="inline mr-2 text-primary" />
                  Route & Checkpoints
                </h2>
                <div className="space-y-3">
                  {event.checkpoints.map((cp: any, i: number) => (
                    <div
                      key={cp.id}
                      className="flex items-center gap-4 p-3 rounded-xl bg-card border border-border"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        i === 0
                          ? "bg-green-500 text-white"
                          : i === event.checkpoints.length - 1
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground"
                      }`}>
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{cp.name}</p>
                      </div>
                      {cp.distance !== null && (
                        <span className="text-sm text-muted-foreground font-medium">
                          {cp.distance} km
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            {event.faq && event.faq.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 font-[family-name:var(--font-display)]">
                  <MessageCircle size={20} className="inline mr-2 text-primary" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {(event.faq as any[]).map((item: any, i: number) => (
                    <details
                      key={i}
                      className="group rounded-xl border border-border bg-card overflow-hidden"
                    >
                      <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <span className="font-medium text-sm pr-4">{item.question}</span>
                        <ChevronRight
                          size={16}
                          className="text-muted-foreground shrink-0 transition-transform group-open:rotate-90"
                        />
                      </summary>
                      <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Announcements */}
            {event.announcements && event.announcements.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 font-[family-name:var(--font-display)]">
                  📢 Announcements
                </h2>
                <div className="space-y-3">
                  {event.announcements.map((ann: any) => (
                    <div
                      key={ann.id}
                      className={`p-4 rounded-xl border ${
                        ann.priority === "HIGH" || ann.priority === "URGENT"
                          ? "border-orange-500/30 bg-orange-500/5"
                          : "border-border bg-card"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-sm">{ann.title}</h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(ann.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{ann.content}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Rules */}
            {event.rules && (
              <section>
                <h2 className="text-xl font-bold mb-4 font-[family-name:var(--font-display)]">
                  <AlertCircle size={20} className="inline mr-2 text-primary" />
                  Rules & Guidelines
                </h2>
                <div className="p-5 rounded-xl bg-card border border-border text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {event.rules}
                </div>
              </section>
            )}
          </div>

          {/* Right: Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Registration Card */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4">
                  <span className="text-sm text-muted-foreground">Starting at</span>
                  <p className="text-3xl font-bold text-primary font-[family-name:var(--font-display)]">
                    {minPrice === 0 ? "Free" : formatCurrency(minPrice)}
                  </p>
                </div>

                {/* Countdown */}
                {days > 0 && (
                  <div className="flex items-center gap-2 text-sm mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <Clock size={16} className="text-primary" />
                    <span>
                      <strong className="text-primary">{days}</strong> days until event
                    </span>
                  </div>
                )}

                {/* Capacity bar */}
                {totalCapacity > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{totalRegistered.toLocaleString()} registered</span>
                      <span>{totalCapacity.toLocaleString()} total spots</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full transition-all"
                        style={{
                          width: `${Math.min((totalRegistered / totalCapacity) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {isRegistrationOpen ? (
                  <Link
                    href={`/events/${event.slug}/register`}
                    className="btn-primary w-full text-base py-3 justify-center"
                  >
                    Register Now
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 rounded-xl bg-muted text-muted-foreground font-semibold text-base cursor-not-allowed"
                  >
                    Registration Closed
                  </button>
                )}

                {event.registrationEnd && (
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Registration closes {formatDate(event.registrationEnd)}
                  </p>
                )}

                {/* Share / Save */}
                <div className="flex gap-2 mt-4">
                  <button className="btn-secondary flex-1 text-sm py-2">
                    <Share2 size={16} />
                    Share
                  </button>
                  <button className="btn-secondary flex-1 text-sm py-2">
                    <Heart size={16} />
                    Save
                  </button>
                </div>
              </div>

              {/* Event Details Card */}
              <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                  Event Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{formatDate(event.startDate)}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.startDate).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                        {" — "}
                        {new Date(event.endDate).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                  {event.venueName && (
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium">{event.venueName}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.city}, {event.state}
                        </p>
                      </div>
                    </div>
                  )}
                  {event.contactEmail && (
                    <div className="flex items-start gap-3">
                      <Mail size={18} className="text-primary mt-0.5 shrink-0" />
                      <a href={`mailto:${event.contactEmail}`} className="text-sm hover:text-primary transition-colors">
                        {event.contactEmail}
                      </a>
                    </div>
                  )}
                  {event.contactPhone && (
                    <div className="flex items-start gap-3">
                      <Phone size={18} className="text-primary mt-0.5 shrink-0" />
                      <a href={`tel:${event.contactPhone}`} className="text-sm hover:text-primary transition-colors">
                        {event.contactPhone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Organizer Card */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                  Organizer
                </h3>
                <Link
                  href={`/organizers/${event.organizer.slug}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {event.organizer.orgName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                        {event.organizer.orgName}
                      </p>
                      {event.organizer.verified && (
                        <CheckCircle size={14} className="text-blue-500 fill-blue-500" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                      {event.organizer.description || "Event organizer"}
                    </p>
                  </div>
                </Link>
              </div>

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/explore?q=${tag}`}
                      className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
