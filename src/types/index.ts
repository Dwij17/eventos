import type { UserRole } from "@prisma/client";
import "next-auth";
import "next-auth/jwt";

export interface EventCardData {
  id: string;
  title: string;
  slug: string;
  type: string;
  coverImage: string | null;
  startDate: string;
  endDate: string;
  city: string | null;
  state: string | null;
  venueName: string | null;
  isFeatured: boolean;
  organizer: {
    orgName: string;
    slug: string;
    logo: string | null;
  };
  categories: {
    id: string;
    name: string;
    price: number;
    distance: number | null;
    capacity: number | null;
    registeredCount: number;
  }[];
  _count: {
    registrations: number;
  };
}

export interface EventDetailData extends EventCardData {
  description: string | null;
  shortDescription: string | null;
  gallery: string[];
  registrationStart: string | null;
  registrationEnd: string | null;
  venueAddress: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  maxParticipants: number | null;
  isOnline: boolean;
  tags: string[];
  rules: string | null;
  faq: Array<{ question: string; answer: string }> | null;
  termsConditions: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  checkpoints: {
    id: string;
    name: string;
    distance: number | null;
  }[];
  eventRoutes: {
    id: string;
    name: string;
    distance: number | null;
    color: string | null;
  }[];
  announcements: {
    id: string;
    title: string;
    content: string;
    priority: string;
    createdAt: string;
  }[];
}

export interface DashboardStats {
  totalRegistrations: number;
  totalRevenue: number;
  totalCheckIns: number;
  conversionRate: number;
  recentRegistrations: Array<{
    id: string;
    registrationNo: string;
    user: { firstName: string; lastName: string; email: string };
    category: { name: string };
    status: string;
    createdAt: string;
  }>;
}

export interface SearchFilters {
  query?: string;
  type?: string;
  city?: string;
  dateFrom?: string;
  dateTo?: string;
  priceMin?: number;
  priceMax?: number;
  category?: string;
  sortBy?: "date" | "price" | "popularity";
  page?: number;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string | null;
}

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }

  interface User extends AuthUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends AuthUser {}
}
