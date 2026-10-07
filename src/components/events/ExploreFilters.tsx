"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

interface ExploreFiltersProps {
  initialQuery: string;
  initialType: string;
  initialCity: string;
  eventTypes: Array<{ value: string; label: string }>;
}

export default function ExploreFilters({
  initialQuery,
  initialType,
  initialCity,
  eventTypes,
}: ExploreFiltersProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (initialType) params.set("type", initialType);
      router.push(`/explore?${params.toString()}`);
    },
    [query, initialType, router]
  );

  const handleTypeFilter = useCallback(
    (type: string) => {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (type) params.set("type", type);
      router.push(`/explore?${params.toString()}`);
    },
    [query, router]
  );

  return (
    <div>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative max-w-2xl">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
        />
        <input
          type="text"
          placeholder="Search events, cities, organizers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-32 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-base"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-lg bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors lg:hidden"
          >
            <SlidersHorizontal size={18} />
          </button>
          <button
            type="submit"
            className="btn-primary py-2 px-5 text-sm"
          >
            Search
          </button>
        </div>
      </form>

      {/* Type Filters */}
      <div className={`flex flex-wrap gap-2 mt-5 ${showFilters ? "block" : "hidden lg:flex"}`}>
        {eventTypes.map((et) => (
          <button
            key={et.value}
            onClick={() => handleTypeFilter(et.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              initialType === et.value
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10"
            }`}
          >
            {et.label}
          </button>
        ))}
      </div>
    </div>
  );
}
