"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Users,
  DollarSign,
  Shirt,
  MapPin,
  Calendar,
  Filter,
  Download,
} from "lucide-react";

export default function AnalyticsDashboardPage() {
  const [selectedEvent, setSelectedEvent] = useState("Mumbai Marathon 2027");

  const categoryBreakdown = [
    { name: "10K Timed Run", count: 7800, revenue: 6240000, percentage: 47, color: "bg-blue-500" },
    { name: "Half Marathon (21.1k)", count: 5500, revenue: 8250000, percentage: 33, color: "bg-primary" },
    { name: "Full Marathon (42.2k)", count: 3200, revenue: 8000000, percentage: 20, color: "bg-purple-500" },
  ];

  const tShirtSizes = [
    { size: "Medium (M)", count: 6930, percentage: 42 },
    { size: "Large (L)", count: 4620, percentage: 28 },
    { size: "Small (S)", count: 2970, percentage: 18 },
    { size: "Extra Large (XL)", count: 1980, percentage: 12 },
  ];

  const cityDistribution = [
    { city: "Mumbai & MMR", runners: 9900, percentage: 60 },
    { city: "Pune", runners: 2475, percentage: 15 },
    { city: "Bangalore", runners: 1650, percentage: 10 },
    { city: "Delhi NCR", runners: 1320, percentage: 8 },
    { city: "Other / International", runners: 1155, percentage: 7 },
  ];

  const ageGroups = [
    { group: "18 - 25 yrs", percentage: 22 },
    { group: "26 - 35 yrs", percentage: 46 },
    { group: "36 - 45 yrs", percentage: 21 },
    { group: "46 - 55 yrs", percentage: 8 },
    { group: "55+ yrs (Masters)", percentage: 3 },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
            Analytics & Demographics
          </h2>
          <p className="text-xs text-slate-600 dark:text-white/60">
            In-depth runner data, category revenue breakdown, and inventory logistics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="input-field text-xs py-2 w-auto"
          >
            <option value="Mumbai Marathon 2027">Mumbai Marathon 2027</option>
            <option value="Hyderabad Night Run 2027">Hyderabad Night Run 2027</option>
          </select>
        </div>
      </div>

      {/* Top Stat Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 shadow-sm">
          <span className="text-xs font-semibold text-slate-600 dark:text-white/60">Total Registrations</span>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white font-[family-name:var(--font-display)]">
            16,500
          </div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            71.7% of total 23,000 capacity
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 shadow-sm">
          <span className="text-xs font-semibold text-slate-600 dark:text-white/60">Total Collections</span>
          <div className="mt-2 text-2xl font-bold text-primary font-[family-name:var(--font-display)]">
            ₹2,24,90,000
          </div>
          <span className="text-xs text-slate-600 dark:text-white/60">
            Avg ticket value: ₹1,363
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 shadow-sm">
          <span className="text-xs font-semibold text-slate-600 dark:text-white/60">Gender Ratio</span>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white font-[family-name:var(--font-display)]">
            62% <span className="text-xs font-normal text-slate-600 dark:text-white/60">M</span> / 38% <span className="text-xs font-normal text-slate-600 dark:text-white/60">F</span>
          </div>
          <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
            +6% female runner increase YoY
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 shadow-sm">
          <span className="text-xs font-semibold text-slate-600 dark:text-white/60">Out-of-Town Runners</span>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white font-[family-name:var(--font-display)]">
            40%
          </div>
          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
            6,600 traveling runners
          </span>
        </div>
      </div>

      {/* Category Breakdown & Progress Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-6 shadow-sm">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <PieChart size={18} className="text-primary" />
            Category & Ticket Volume
          </h3>

          <div className="space-y-4">
            {categoryBreakdown.map((cat) => (
              <div key={cat.name} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {cat.name}
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-white/80">
                    {cat.count.toLocaleString()} runners ({cat.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cat.color} rounded-full`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-600 dark:text-white/60">
                  <span>Gross Sales</span>
                  <span className="font-mono font-semibold">
                    ₹{cat.revenue.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* T-Shirt Size Distribution for Inventory Suppliers */}
        <div className="rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-6 shadow-sm">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Shirt size={18} className="text-primary" />
            Finisher T-Shirt Inventory Demand
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {tShirtSizes.map((t) => (
              <div
                key={t.size}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center"
              >
                <span className="text-xs text-slate-600 dark:text-white/60 block mb-1">
                  {t.size}
                </span>
                <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white block">
                  {t.count.toLocaleString()}
                </span>
                <span className="text-[11px] font-semibold text-primary">
                  {t.percentage}% of order
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-600 dark:text-white/60 leading-relaxed">
            * Share this inventory split with your official apparel sponsor at least 3 weeks before bib distribution expo.
          </p>
        </div>
      </div>

      {/* Geographic & Age Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* City Origin */}
        <div className="rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-4 shadow-sm">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <MapPin size={18} className="text-primary" />
            Participant City of Origin
          </h3>

          <div className="space-y-3 pt-2">
            {cityDistribution.map((c) => (
              <div key={c.city} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 dark:border-white/5">
                <span className="font-semibold text-slate-800 dark:text-white">
                  {c.city}
                </span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-600 dark:text-white/60">
                    {c.runners.toLocaleString()} runners
                  </span>
                  <span className="w-10 text-right font-bold text-primary">
                    {c.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Age Groups */}
        <div className="rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-4 shadow-sm">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Users size={18} className="text-primary" />
            Age Demographic Distribution
          </h3>

          <div className="space-y-3.5 pt-2">
            {ageGroups.map((a) => (
              <div key={a.group} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-white">
                    {a.group}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {a.percentage}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${a.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
