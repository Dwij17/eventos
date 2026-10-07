"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Users, Tag } from "lucide-react";
import { cn, formatDate, formatCurrency, getEventTypeIcon } from "@/lib/utils";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    slug: string;
    type: string;
    coverImage: string | null;
    startDate: string;
    city: string | null;
    state: string | null;
    venueName: string | null;
    isFeatured: boolean;
    organizer: {
      orgName: string;
      slug: string;
    };
    categories: Array<{
      name: string;
      price: number;
      distance: number | null;
      capacity: number | null;
      registeredCount: number;
    }>;
    _count: {
      registrations: number;
    };
  };
  index?: number;
}

export default function EventCard({ event, index = 0 }: EventCardProps) {
  const minPrice = event.categories.length
    ? Math.min(...event.categories.map((c) => c.price))
    : 0;
  const totalCapacity = event.categories.reduce(
    (sum, c) => sum + (c.capacity || 0),
    0
  );
  const totalRegistered = event._count.registrations;
  const spotsLeft = totalCapacity > 0 ? totalCapacity - totalRegistered : null;

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="bg-card rounded-2xl border border-border overflow-hidden card-hover h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {event.coverImage ? (
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <span className="text-5xl">{getEventTypeIcon(event.type)}</span>
            </div>
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Featured badge */}
          {event.isFeatured && (
            <div className="absolute top-3 left-3">
              <span className="badge bg-primary text-white shadow-lg shadow-primary/30 text-xs font-semibold px-2.5 py-1">
                ⭐ Featured
              </span>
            </div>
          )}

          {/* Event type badge */}
          <div className="absolute top-3 right-3">
            <span className="badge bg-black/50 backdrop-blur-md text-white text-xs px-2.5 py-1">
              {getEventTypeIcon(event.type)} {event.type.charAt(0) + event.type.slice(1).toLowerCase()}
            </span>
          </div>

          {/* Spots warning */}
          {spotsLeft !== null && spotsLeft > 0 && spotsLeft <= 50 && (
            <div className="absolute bottom-3 left-3">
              <span className="badge bg-red-500/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1">
                🔥 Only {spotsLeft} spots left
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Date and location row */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2.5">
            <span className="flex items-center gap-1">
              <Calendar size={12} className="text-primary" />
              {formatDate(event.startDate)}
            </span>
            {event.city && (
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-primary" />
                {event.city}
                {event.state ? `, ${event.state}` : ""}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-base lg:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {event.title}
          </h3>

          {/* Organizer */}
          <p className="text-xs text-muted-foreground mb-3">
            by {event.organizer.orgName}
          </p>

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {event.categories.slice(0, 4).map((cat) => (
              <span
                key={cat.name}
                className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
              >
                {cat.distance ? `${cat.distance}K` : cat.name}
              </span>
            ))}
            {event.categories.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{event.categories.length - 4} more
              </span>
            )}
          </div>

          {/* Bottom: price & registrations */}
          <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
            <div>
              <span className="text-xs text-muted-foreground">Starting at</span>
              <p className="text-lg font-bold text-primary">
                {minPrice === 0 ? "Free" : formatCurrency(minPrice)}
              </p>
            </div>
            {totalRegistered > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users size={14} />
                <span>{totalRegistered} registered</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
