export interface DemoCategory {
  id: string;
  name: string;
  price: number;
  distance: number | null;
  capacity: number | null;
  registeredCount: number;
}

export interface DemoEvent {
  id: string;
  title: string;
  slug: string;
  type: string;
  coverImage: string;
  startDate: string;
  endDate: string;
  city: string;
  state: string;
  venueName: string;
  isFeatured: boolean;
  organizer: {
    orgName: string;
    slug: string;
    logo: string | null;
  };
  categories: DemoCategory[];
  _count: {
    registrations: number;
  };
}

export const demoEvents: DemoEvent[] = [
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
    venueName: "CST",
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
      { id: "c5", name: "Under-19", price: 5000, distance: null, capacity: 32, registeredCount: 28 },
      { id: "c6", name: "Open", price: 8000, distance: null, capacity: 64, registeredCount: 52 },
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
      { id: "c7", name: "Yoga", price: 0, distance: null, capacity: 500, registeredCount: 320 },
      { id: "c8", name: "CrossFit", price: 1200, distance: null, capacity: 200, registeredCount: 145 },
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
    venueName: "JN Stadium",
    isFeatured: true,
    organizer: { orgName: "Delhi Sports Council", slug: "delhi-sports-council", logo: null },
    categories: [
      { id: "c9", name: "Men's Open", price: 3000, distance: null, capacity: 24, registeredCount: 20 },
    ],
    _count: { registrations: 20 },
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
    venueName: "IIT Bombay",
    isFeatured: false,
    organizer: { orgName: "TechFest IIT Bombay", slug: "techfest-iitb", logo: null },
    categories: [
      { id: "c11", name: "General", price: 500, distance: null, capacity: 10000, registeredCount: 7500 },
    ],
    _count: { registrations: 7500 },
  },
  {
    id: "6",
    title: "Comedy Nights Live",
    slug: "comedy-nights-bangalore-2027",
    type: "ENTERTAINMENT",
    coverImage: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80",
    startDate: "2027-02-20T19:00:00Z",
    endDate: "2027-02-20T22:00:00Z",
    city: "Bangalore",
    state: "Karnataka",
    venueName: "Phoenix Marketcity",
    isFeatured: false,
    organizer: { orgName: "LiveWire", slug: "livewire", logo: null },
    categories: [
      { id: "c13", name: "Silver", price: 999, distance: null, capacity: 500, registeredCount: 420 },
      { id: "c14", name: "Gold", price: 1999, distance: null, capacity: 200, registeredCount: 175 },
    ],
    _count: { registrations: 595 },
  },
  {
    id: "7",
    title: "Hyderabad Night Run",
    slug: "hyderabad-night-run-2027",
    type: "RUNNING",
    coverImage: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
    startDate: "2027-02-01T20:00:00Z",
    endDate: "2027-02-01T23:00:00Z",
    city: "Hyderabad",
    state: "Telangana",
    venueName: "Hussain Sagar",
    isFeatured: false,
    organizer: { orgName: "RunHyd", slug: "runhyd", logo: null },
    categories: [
      { id: "c16", name: "10K", price: 600, distance: 10, capacity: 3000, registeredCount: 2100 },
      { id: "c17", name: "5K", price: 400, distance: 5, capacity: 5000, registeredCount: 3500 },
    ],
    _count: { registrations: 5600 },
  },
  {
    id: "8",
    title: "Chennai Badminton Open",
    slug: "chennai-badminton-2027",
    type: "OTHER",
    coverImage: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80",
    startDate: "2027-03-22T08:00:00Z",
    endDate: "2027-03-23T18:00:00Z",
    city: "Chennai",
    state: "Tamil Nadu",
    venueName: "SDAT Complex",
    isFeatured: false,
    organizer: { orgName: "Chennai Sports", slug: "chennai-sports", logo: null },
    categories: [
      { id: "c18", name: "Singles", price: 1500, distance: null, capacity: 128, registeredCount: 96 },
      { id: "c19", name: "Doubles", price: 2000, distance: null, capacity: 64, registeredCount: 48 },
    ],
    _count: { registrations: 144 },
  },
  {
    id: "9",
    title: "Pune Cycling Challenge",
    slug: "pune-cycling-2027",
    type: "FITNESS",
    coverImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
    startDate: "2027-03-01T05:00:00Z",
    endDate: "2027-03-01T12:00:00Z",
    city: "Pune",
    state: "Maharashtra",
    venueName: "Shaniwar Wada",
    isFeatured: false,
    organizer: { orgName: "CyclePune", slug: "cyclepune", logo: null },
    categories: [
      { id: "c20", name: "50K", price: 1200, distance: 50, capacity: 1000, registeredCount: 720 },
      { id: "c21", name: "100K", price: 2000, distance: 100, capacity: 500, registeredCount: 380 },
    ],
    _count: { registrations: 1100 },
  },
];
