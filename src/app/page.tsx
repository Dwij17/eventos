import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Play,
  Trophy,
  Users,
  Calendar,
  MapPin,
  Timer,
  Zap,
  Shield,
  BarChart3,
  QrCode,
  Smartphone,
  Star,
  ChevronRight,
} from "lucide-react";
import EventCard from "@/components/events/EventCard";
import prisma from "@/lib/prisma";

// Demo data for when DB is empty
const demoEvents = [
  {
    id: "1",
    title: "Mumbai Marathon 2027",
    slug: "mumbai-marathon-2027",
    type: "RUNNING",
    coverImage: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&q=80",
    startDate: "2027-01-15T06:00:00Z",
    endDate: "2027-01-15T14:00:00Z",
    city: "Mumbai",
    state: "Maharashtra",
    venueName: "Chhatrapati Shivaji Terminus",
    isFeatured: true,
    organizer: { orgName: "RunIndia Sports", slug: "runindia-sports", logo: null },
    categories: [
      { id: "c1", name: "Full Marathon", price: 2500, distance: 42.2, capacity: 5000, registeredCount: 3200 },
      { id: "c2", name: "Half Marathon", price: 1500, distance: 21.1, capacity: 8000, registeredCount: 5500 },
      { id: "c3", name: "10K Run", price: 800, distance: 10, capacity: 10000, registeredCount: 7800 },
      { id: "c4", name: "5K Fun Run", price: 500, distance: 5, capacity: 15000, registeredCount: 9200 },
    ],
    _count: { registrations: 25700 },
  },
  {
    id: "2",
    title: "IPL Fan Cricket Tournament",
    slug: "ipl-fan-cricket-2027",
    type: "CRICKET",
    coverImage: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80",
    startDate: "2027-03-10T09:00:00Z",
    endDate: "2027-03-12T18:00:00Z",
    city: "Bangalore",
    state: "Karnataka",
    venueName: "M. Chinnaswamy Stadium",
    isFeatured: true,
    organizer: { orgName: "CricBuzz Events", slug: "cricbuzz-events", logo: null },
    categories: [
      { id: "c5", name: "Under-19 Team", price: 5000, distance: null, capacity: 32, registeredCount: 28 },
      { id: "c6", name: "Open Team", price: 8000, distance: null, capacity: 64, registeredCount: 52 },
    ],
    _count: { registrations: 80 },
  },
  {
    id: "3",
    title: "Sunrise Yoga & Fitness Festival",
    slug: "sunrise-yoga-fitness-2027",
    type: "FITNESS",
    coverImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    startDate: "2027-02-14T05:30:00Z",
    endDate: "2027-02-14T12:00:00Z",
    city: "Goa",
    state: "Goa",
    venueName: "Baga Beach",
    isFeatured: false,
    organizer: { orgName: "FitLife India", slug: "fitlife-india", logo: null },
    categories: [
      { id: "c7", name: "Yoga Session", price: 0, distance: null, capacity: 500, registeredCount: 320 },
      { id: "c8", name: "CrossFit Challenge", price: 1200, distance: null, capacity: 200, registeredCount: 145 },
    ],
    _count: { registrations: 465 },
  },
  {
    id: "4",
    title: "Delhi Football Championship",
    slug: "delhi-football-championship-2027",
    type: "FOOTBALL",
    coverImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    startDate: "2027-04-05T08:00:00Z",
    endDate: "2027-04-07T18:00:00Z",
    city: "New Delhi",
    state: "Delhi",
    venueName: "Jawaharlal Nehru Stadium",
    isFeatured: true,
    organizer: { orgName: "Delhi Sports Council", slug: "delhi-sports-council", logo: null },
    categories: [
      { id: "c9", name: "Men's Open", price: 3000, distance: null, capacity: 24, registeredCount: 20 },
      { id: "c10", name: "Women's Open", price: 3000, distance: null, capacity: 16, registeredCount: 12 },
    ],
    _count: { registrations: 32 },
  },
  {
    id: "5",
    title: "TechFest 2027 — IIT Bombay",
    slug: "techfest-iitb-2027",
    type: "COLLEGE",
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    startDate: "2027-01-28T09:00:00Z",
    endDate: "2027-01-30T22:00:00Z",
    city: "Mumbai",
    state: "Maharashtra",
    venueName: "IIT Bombay Campus",
    isFeatured: false,
    organizer: { orgName: "TechFest IIT Bombay", slug: "techfest-iitb", logo: null },
    categories: [
      { id: "c11", name: "General Pass", price: 500, distance: null, capacity: 10000, registeredCount: 7500 },
      { id: "c12", name: "VIP Pass", price: 2000, distance: null, capacity: 500, registeredCount: 380 },
    ],
    _count: { registrations: 7880 },
  },
  {
    id: "6",
    title: "Comedy Nights Live — Bangalore",
    slug: "comedy-nights-bangalore-2027",
    type: "ENTERTAINMENT",
    coverImage: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80",
    startDate: "2027-02-20T19:00:00Z",
    endDate: "2027-02-20T22:00:00Z",
    city: "Bangalore",
    state: "Karnataka",
    venueName: "Phoenix Marketcity",
    isFeatured: false,
    organizer: { orgName: "LiveWire Entertainment", slug: "livewire-entertainment", logo: null },
    categories: [
      { id: "c13", name: "Silver", price: 999, distance: null, capacity: 500, registeredCount: 420 },
      { id: "c14", name: "Gold", price: 1999, distance: null, capacity: 200, registeredCount: 175 },
      { id: "c15", name: "Platinum", price: 3999, distance: null, capacity: 50, registeredCount: 42 },
    ],
    _count: { registrations: 637 },
  },
];

const eventTypes = [
  { type: "RUNNING", icon: "🏃", label: "Running", color: "from-orange-500 to-red-500" },
  { type: "CRICKET", icon: "🏏", label: "Cricket", color: "from-green-500 to-emerald-500" },
  { type: "FOOTBALL", icon: "⚽", label: "Football", color: "from-blue-500 to-cyan-500" },
  { type: "FITNESS", icon: "💪", label: "Fitness", color: "from-purple-500 to-pink-500" },
  { type: "COLLEGE", icon: "🎓", label: "College", color: "from-indigo-500 to-violet-500" },
  { type: "ENTERTAINMENT", icon: "🎭", label: "Entertainment", color: "from-pink-500 to-rose-500" },
];

const stats = [
  { value: "50K+", label: "Events Hosted" },
  { value: "2M+", label: "Registrations" },
  { value: "500+", label: "Organizers" },
  { value: "100+", label: "Cities" },
];

const features = [
  {
    icon: <QrCode size={24} />,
    title: "QR Check-in",
    description: "Instant check-in with unique QR codes. No more long queues.",
  },
  {
    icon: <Timer size={24} />,
    title: "Live Timing",
    description: "Real-time checkpoint timing, pace tracking, and live leaderboards.",
  },
  {
    icon: <BarChart3 size={24} />,
    title: "Smart Analytics",
    description: "AI-powered insights for organizers. Track registrations, revenue, and more.",
  },
  {
    icon: <Shield size={24} />,
    title: "Secure Payments",
    description: "PCI-compliant payments via Razorpay. Instant confirmation.",
  },
  {
    icon: <Smartphone size={24} />,
    title: "Mobile-First",
    description: "Beautiful experience on every device. Digital tickets in your pocket.",
  },
  {
    icon: <Zap size={24} />,
    title: "AI Assistant",
    description: "Event-specific AI answers all participant questions instantly.",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Marathon Organizer",
    avatar: "PS",
    content:
      "EventOS transformed how we manage our marathons. The QR check-in and live timing features saved us hours of manual work.",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    role: "Cricket Tournament Director",
    avatar: "RM",
    content:
      "Managing 64 teams across 3 days was seamless with EventOS. The live scorecard and points table kept everyone engaged.",
    rating: 5,
  },
  {
    name: "Ananya Iyer",
    role: "College Fest Coordinator",
    avatar: "AI",
    content:
      "We had 10,000 registrations for TechFest and EventOS handled it like a breeze. The analytics dashboard is incredible.",
    rating: 5,
  },
];

export default async function HomePage() {
  // Try to fetch real events, fall back to demo data
  let events = demoEvents;
  try {
    const dbEvents = await prisma.event.findMany({
      where: { status: "PUBLISHED" },
      include: {
        organizer: { select: { orgName: true, slug: true, logo: true } },
        categories: {
          select: { id: true, name: true, price: true, distance: true, capacity: true, registeredCount: true },
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        },
        _count: { select: { registrations: true } },
      },
      orderBy: { startDate: "asc" },
      take: 6,
    });
    if (dbEvents.length > 0) {
      events = dbEvents.map((e: any) => ({
        ...e,
        startDate: e.startDate.toISOString(),
        endDate: e.endDate.toISOString(),
      })) as any;
    }
  } catch {
    // Use demo data if DB not available
  }

  const featuredEvents = events.filter((e) => e.isFeatured);

  return (
    <>
      {/* ====== HERO SECTION ====== */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-secondary">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-[#16213e] to-[#0f3460]" />
          <div className="absolute inset-0 grid-pattern opacity-30" />
          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[120px] animate-float"
            style={{ animationDelay: "3s" }}
          />
          <div
            className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] animate-float"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="container-main relative z-10 py-32 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 mb-6 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Now with AI-powered event assistant
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-[family-name:var(--font-display)] text-white leading-[1.1] tracking-tight animate-fade-in-up">
                Discover.
                <br />
                Register.
                <br />
                <span className="gradient-text">Experience.</span>
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-white/60 max-w-lg mx-auto lg:mx-0 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                The all-in-one platform for sports events, college fests, and
                entertainment. From discovery to finish line.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <Link
                  href="/explore"
                  className="btn-primary text-base px-8 py-3.5 shadow-xl shadow-primary/20"
                >
                  Explore Events
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/register?role=organizer"
                  className="btn-secondary text-base px-8 py-3.5 border-white/20 text-white hover:bg-white/10"
                >
                  Host an Event
                </Link>
              </div>
              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl lg:text-3xl font-bold text-white font-[family-name:var(--font-display)]">
                      {stat.value}
                    </p>
                    <p className="text-sm text-white/40 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Featured Event Card */}
            <div className="hidden lg:block animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="relative">
                {/* Glow behind card */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                  {featuredEvents[0] && (
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={featuredEvents[0].coverImage || ""}
                          alt={featuredEvents[0].title}
                          fill
                          className="object-cover"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="badge bg-primary text-white text-xs mb-2 inline-block">
                            ⭐ Featured Event
                          </span>
                          <h3 className="text-xl font-bold text-white">
                            {featuredEvents[0].title}
                          </h3>
                          <div className="flex items-center gap-3 mt-2 text-sm text-white/70">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(featuredEvents[0].startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={14} />
                              {featuredEvents[0].city}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex gap-2">
                          {featuredEvents[0].categories.slice(0, 3).map((cat) => (
                            <span
                              key={cat.name}
                              className="text-xs px-2 py-1 rounded-md bg-white/10 text-white/70"
                            >
                              {cat.distance ? `${cat.distance}K` : cat.name}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={`/events/${featuredEvents[0].slug}`}
                          className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1"
                        >
                          View Details
                          <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== EVENT TYPES ====== */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-display)]">
              Explore by <span className="gradient-text">Category</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto">
              From marathons to music festivals — find events that match your
              passion.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {eventTypes.map((et) => (
              <Link
                key={et.type}
                href={`/explore?type=${et.type}`}
                className="group relative overflow-hidden rounded-2xl p-6 text-center card-hover border border-border bg-card"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${et.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                <span className="text-4xl block mb-3">{et.icon}</span>
                <span className="font-semibold text-sm">{et.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====== UPCOMING EVENTS ====== */}
      <section className="py-20 lg:py-24 bg-muted/30">
        <div className="container-main">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-display)]">
                Upcoming <span className="gradient-text">Events</span>
              </h2>
              <p className="mt-2 text-muted-foreground">
                Don&apos;t miss out on these popular events happening soon.
              </p>
            </div>
            <Link
              href="/explore"
              className="btn-secondary text-sm"
            >
              View All Events
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 6).map((event, i) => (
              <EventCard key={event.id} event={event as any} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ====== FEATURES ====== */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container-main">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Why EventOS
            </span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold font-[family-name:var(--font-display)]">
              Everything you need to{" "}
              <span className="gradient-text">run events</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              From registration to results, we handle everything so you can
              focus on creating amazing experiences.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl border border-border bg-card card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      <section className="py-20 lg:py-24 bg-secondary text-white overflow-hidden">
        <div className="container-main">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold font-[family-name:var(--font-display)]">
              Loved by <span className="gradient-text">organizers</span> &{" "}
              <span className="gradient-text">participants</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 card-hover"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-white text-sm font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-white/40">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container-main">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              How It Works
            </span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold font-[family-name:var(--font-display)]">
              From discovery to{" "}
              <span className="gradient-text">finish line</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discover",
                desc: "Browse events by category, location, date, or interest.",
                icon: "🔍",
              },
              {
                step: "02",
                title: "Register",
                desc: "Choose your category, fill details, and pay securely.",
                icon: "📝",
              },
              {
                step: "03",
                title: "Get Ready",
                desc: "Receive your digital ticket with QR code and event updates.",
                icon: "🎫",
              },
              {
                step: "04",
                title: "Experience",
                desc: "Check in, participate, and get live results and certificates.",
                icon: "🏆",
              },
            ].map((item) => (
              <div key={item.step} className="text-center relative">
                <span className="text-6xl mb-4 block">{item.icon}</span>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  Step {item.step}
                </span>
                <h3 className="font-bold text-lg mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
