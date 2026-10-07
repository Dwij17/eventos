"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  Users,
  Calendar,
  TrendingUp,
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  MoreVertical,
  Star,
  Eye,
  Ban,
  Trash2,
  Activity,
  MapPin,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Download,
  Bell,
  Settings,
  LayoutDashboard,
  UserCheck,
  BarChart2,
  Flag,
} from "lucide-react";
import { format } from "date-fns";
import { useLiveRegistrations } from "@/lib/realtimeHooks";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AdminStats {
  totalUsers: number;
  totalEvents: number;
  totalRegistrations: number;
  totalRevenue: number;
  activeEvents: number;
  pendingApprovals: number;
  newUsersToday: number;
  newRegistrationsToday: number;
  revenueToday: number;
  platformGrowth: { users: number; events: number; revenue: number };
  topCities: { city: string; events: number; registrations: number }[];
  categoryBreakdown: { type: string; count: number; registrations: number }[];
  monthlyRevenue: { month: string; revenue: number; registrations: number }[];
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "PARTICIPANT" | "ORGANIZER" | "ADMIN";
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  joinedAt: string;
  registrations: number;
  eventsOrganized?: number;
}

type AdminTab = "overview" | "users" | "events" | "approvals" | "analytics";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"];

const formatCurrency = (paise: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
    paise / 100
  );

const formatNumber = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n.toString();

// ─── Subcomponents ────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  growth,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  color: string;
  growth?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="mt-1 text-3xl font-bold text-white">{value}</p>
          {sub && <p className="mt-1 text-xs text-gray-500">{sub}</p>}
          {growth !== undefined && (
            <div
              className={`mt-2 flex items-center gap-1 text-xs font-medium ${growth >= 0 ? "text-emerald-400" : "text-red-400"}`}
            >
              <TrendingUp className="h-3 w-3" />
              {growth >= 0 ? "+" : ""}
              {growth}% this month
            </div>
          )}
        </div>
        <div className={`rounded-xl p-3 ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className={`absolute -bottom-4 -right-4 h-16 w-16 rounded-full opacity-20 blur-xl ${color}`} />
    </motion.div>
  );
}

function UserRow({
  user,
  onAction,
}: {
  user: AdminUser;
  onAction: (id: string, action: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const roleColors: Record<string, string> = {
    ADMIN: "bg-red-500/20 text-red-400",
    ORGANIZER: "bg-purple-500/20 text-purple-400",
    PARTICIPANT: "bg-blue-500/20 text-blue-400",
  };

  const statusColors: Record<string, string> = {
    ACTIVE: "bg-emerald-500/20 text-emerald-400",
    INACTIVE: "bg-gray-500/20 text-gray-400",
    SUSPENDED: "bg-red-500/20 text-red-400",
  };

  return (
    <tr className="border-b border-white/5 transition-colors hover:bg-white/5">
      <td className="py-3 pl-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
            {user.name[0]}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="py-3">
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${roleColors[user.role]}`}>
          {user.role}
        </span>
      </td>
      <td className="py-3">
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[user.status]}`}>
          {user.status}
        </span>
      </td>
      <td className="py-3 text-sm text-gray-400">
        {format(new Date(user.joinedAt), "dd MMM yyyy")}
      </td>
      <td className="py-3 text-sm text-gray-400">
        {user.role === "ORGANIZER" ? `${user.eventsOrganized || 0} events` : `${user.registrations} regs`}
      </td>
      <td className="relative py-3 pr-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-4 top-10 z-10 min-w-[140px] rounded-xl border border-white/10 bg-[#1a1a2e] py-1 shadow-xl"
            >
              <button
                onClick={() => { onAction(user.id, "view"); setMenuOpen(false); }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-white/5"
              >
                <Eye className="h-3.5 w-3.5" /> View Profile
              </button>
              {user.status === "ACTIVE" ? (
                <button
                  onClick={() => { onAction(user.id, "suspend"); setMenuOpen(false); }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-amber-400 hover:bg-white/5"
                >
                  <Ban className="h-3.5 w-3.5" /> Suspend
                </button>
              ) : (
                <button
                  onClick={() => { onAction(user.id, "activate"); setMenuOpen(false); }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-emerald-400 hover:bg-white/5"
                >
                  <CheckCircle className="h-3.5 w-3.5" /> Activate
                </button>
              )}
              <button
                onClick={() => { onAction(user.id, "delete"); setMenuOpen(false); }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-white/5"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </td>
    </tr>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [pendingEvents, setPendingEvents] = useState<any[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [userPage, setUserPage] = useState(1);
  const [userTotal, setUserTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [actionToast, setActionToast] = useState<string | null>(null);

  const liveRegs = useLiveRegistrations("global");

  const fetchStats = useCallback(async () => {
    const res = await fetch("/api/admin?resource=stats");
    const data = await res.json();
    setStats(data);
  }, []);

  const fetchUsers = useCallback(async () => {
    const params = new URLSearchParams({
      resource: "users",
      page: userPage.toString(),
      limit: "8",
    });
    if (userSearch) params.set("search", userSearch);
    const res = await fetch(`/api/admin?${params}`);
    const data = await res.json();
    setUsers(data.users);
    setUserTotal(data.total);
  }, [userPage, userSearch]);

  const fetchPending = useCallback(async () => {
    const res = await fetch("/api/admin?resource=pending");
    const data = await res.json();
    setPendingEvents(data.events);
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchStats(), fetchUsers(), fetchPending()]).finally(() =>
      setLoading(false)
    );
  }, [fetchStats, fetchUsers, fetchPending]);

  const handleAction = async (id: string, action: string, targetType = "user") => {
    const res = await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, targetId: id, targetType }),
    });
    const data = await res.json();
    setActionToast(data.message);
    setTimeout(() => setActionToast(null), 3000);
    fetchUsers();
    fetchPending();
  };

  const tabs: { id: AdminTab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "users", label: "Users", icon: Users },
    { id: "events", label: "Events", icon: Calendar },
    { id: "approvals", label: "Approvals", icon: UserCheck },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a1a]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
          <p className="text-gray-400">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0d0d20]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-500">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Admin Dashboard</h1>
              <p className="text-xs text-gray-500">EventOS Platform Control</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {stats?.pendingApprovals ? (
              <div className="flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1.5 text-xs font-medium text-amber-400">
                <AlertTriangle className="h-3.5 w-3.5" />
                {stats.pendingApprovals} pending
              </div>
            ) : null}
            <button className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button
              onClick={() => { fetchStats(); fetchUsers(); fetchPending(); }}
              className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-auto max-w-7xl px-4 flex gap-1 pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-indigo-500 text-indigo-400"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {actionToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-medium text-white shadow-lg"
          >
            <CheckCircle className="mr-2 inline h-4 w-4" />
            {actionToast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl px-4 py-8">

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && stats && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Stat Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={Users} label="Total Users" value={formatNumber(stats.totalUsers)} sub={`+${stats.newUsersToday} today`} color="bg-indigo-600" growth={stats.platformGrowth.users} />
              <StatCard icon={Calendar} label="Total Events" value={stats.totalEvents.toString()} sub={`${stats.activeEvents} active`} color="bg-purple-600" growth={stats.platformGrowth.events} />
              <StatCard icon={Activity} label="Registrations" value={formatNumber(stats.totalRegistrations)} sub={`+${formatNumber(stats.newRegistrationsToday)} today`} color="bg-pink-600" />
              <StatCard icon={DollarSign} label="Total Revenue" value={formatCurrency(stats.totalRevenue)} sub={`${formatCurrency(stats.revenueToday)} today`} color="bg-amber-600" growth={stats.platformGrowth.revenue} />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Revenue Chart */}
              <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-4 text-base font-semibold text-white">Monthly Revenue & Registrations</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={stats.monthlyRevenue}>
                    <defs>
                      <linearGradient id="adminRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                    <Tooltip
                      contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      formatter={(value: any, name: any) => {
                        const num = typeof value === "number" ? value : 0;
                        const key = typeof name === "string" ? name : "";
                        return [
                          key === "revenue" ? formatCurrency(num) : formatNumber(num),
                          key === "revenue" ? "Revenue" : "Registrations",
                        ];
                      }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#adminRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Category Breakdown */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-4 text-base font-semibold text-white">Event Categories</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={stats.categoryBreakdown} dataKey="registrations" nameKey="type" cx="50%" cy="50%" outerRadius={70} stroke="none">
                      {stats.categoryBreakdown.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-2 space-y-1">
                  {stats.categoryBreakdown.slice(0, 4).map((cat, i) => (
                    <div key={cat.type} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ background: COLORS[i] }} />
                        <span className="text-gray-400">{cat.type}</span>
                      </div>
                      <span className="font-medium text-gray-300">{cat.count} events</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Top Cities */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-4 text-base font-semibold text-white">Top Cities</h3>
                <div className="space-y-3">
                  {stats.topCities.map((city, i) => (
                    <div key={city.city} className="flex items-center gap-3">
                      <span className="w-5 text-xs font-bold text-gray-500">#{i + 1}</span>
                      <MapPin className="h-4 w-4 text-indigo-400" />
                      <div className="flex-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-white">{city.city}</span>
                          <span className="text-gray-400">{formatNumber(city.registrations)} regs</span>
                        </div>
                        <div className="mt-1 h-1.5 rounded-full bg-white/10">
                          <div
                            className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                            style={{ width: `${(city.registrations / stats.topCities[0].registrations) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Feed */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-white">Live Registration Feed</h3>
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    Live
                  </span>
                </div>
                <div className="space-y-2 max-h-52 overflow-y-auto">
                  {liveRegs.length === 0 ? (
                    <p className="text-center text-sm text-gray-500 py-8">Waiting for registrations...</p>
                  ) : (
                    liveRegs.map((reg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">
                            {reg.participantName[0]}
                          </div>
                          <div>
                            <p className="text-xs font-medium text-white">{reg.participantName}</p>
                            <p className="text-xs text-gray-500">{reg.category}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {format(new Date(reg.timestamp), "HH:mm")}
                        </span>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">User Management</h2>
              <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
                <Download className="h-4 w-4" /> Export CSV
              </button>
            </div>

            <div className="flex gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={userSearch}
                  onChange={(e) => { setUserSearch(e.target.value); setUserPage(1); }}
                  placeholder="Search users..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-indigo-500"
                />
              </div>
              <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-400 hover:bg-white/10 transition-colors">
                <Filter className="h-4 w-4" /> Filter
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 overflow-hidden">
              <table className="w-full">
                <thead className="border-b border-white/10 bg-white/5">
                  <tr>
                    {["User", "Role", "Status", "Joined", "Activity", "Actions"].map((h) => (
                      <th key={h} className="py-3 pl-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <UserRow key={user.id} user={user} onAction={handleAction} />
                  ))}
                </tbody>
              </table>

              <div className="flex items-center justify-between border-t border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs text-gray-500">
                  Showing {(userPage - 1) * 8 + 1}–{Math.min(userPage * 8, userTotal)} of {userTotal} users
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setUserPage((p) => Math.max(1, p - 1))}
                    disabled={userPage === 1}
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-xs text-gray-400">Page {userPage}</span>
                  <button
                    onClick={() => setUserPage((p) => p + 1)}
                    disabled={userPage * 8 >= userTotal}
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 disabled:opacity-40"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* APPROVALS TAB */}
        {activeTab === "approvals" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                Pending Approvals
                <span className="ml-2 rounded-full bg-amber-500/20 px-2 py-0.5 text-sm text-amber-400">
                  {pendingEvents.length}
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              {pendingEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <img
                    src={event.coverImage}
                    alt={event.title}
                    className="h-20 w-32 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-white">{event.title}</h3>
                        <p className="text-sm text-gray-400">
                          by {event.organizer?.orgName} • {event.city}, {event.state}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Submitted {format(new Date(event.submittedAt), "dd MMM yyyy, HH:mm")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-400">
                          {event.type}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleAction(event.id, "approve", "event")}
                        className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 transition-colors"
                      >
                        <CheckCircle className="h-3.5 w-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => handleAction(event.id, "reject", "event")}
                        className="flex items-center gap-1.5 rounded-lg bg-red-600/20 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-600/30 transition-colors"
                      >
                        <XCircle className="h-3.5 w-3.5" /> Reject
                      </button>
                      <button
                        onClick={() => handleAction(event.id, "feature", "event")}
                        className="flex items-center gap-1.5 rounded-lg bg-amber-500/20 px-3 py-1.5 text-xs font-medium text-amber-400 hover:bg-amber-500/30 transition-colors"
                      >
                        <Star className="h-3.5 w-3.5" /> Feature
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {pendingEvents.length === 0 && (
                <div className="py-20 text-center">
                  <CheckCircle className="mx-auto mb-3 h-12 w-12 text-emerald-500" />
                  <p className="text-gray-400">All caught up! No pending approvals.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === "analytics" && stats && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <h2 className="text-xl font-bold text-white">Platform Analytics</h2>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Registrations Chart */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-4 text-base font-semibold text-white">Monthly Registrations</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={stats.monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatNumber(v)} />
                    <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} />
                    <Bar dataKey="registrations" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Revenue per Category */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-4 text-base font-semibold text-white">Registrations by Category</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={stats.categoryBreakdown} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatNumber(v)} />
                    <YAxis type="category" dataKey="type" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} width={90} />
                    <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} />
                    <Bar dataKey="registrations" radius={[0, 4, 4, 0]}>
                      {stats.categoryBreakdown.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* KPI Grid */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Avg. Revenue / Event", value: formatCurrency(stats.totalRevenue / stats.totalEvents) },
                { label: "Avg. Registrations / Event", value: Math.round(stats.totalRegistrations / stats.totalEvents).toLocaleString() },
                { label: "Platform Fill Rate", value: "73.4%" },
              ].map((kpi) => (
                <div key={kpi.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                  <p className="text-2xl font-bold text-white">{kpi.value}</p>
                  <p className="mt-1 text-sm text-gray-400">{kpi.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* EVENTS TAB */}
        {activeTab === "events" && (
          <EventsTab onAction={handleAction} />
        )}
      </div>
    </div>
  );
}

// ─── Events Tab ───────────────────────────────────────────────────────────────
function EventsTab({ onAction }: { onAction: (id: string, action: string, type: string) => void }) {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin?resource=events")
      .then((r) => r.json())
      .then((d) => setEvents(d.events));
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-xl font-bold text-white">All Events ({events.length})</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <img src={event.coverImage} alt={event.title} className="h-36 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-white truncate">{event.title}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{event.city} • {event.type}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-emerald-400 bg-emerald-400/10 rounded-full px-2 py-0.5">PUBLISHED</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => onAction(event.id, "feature", "event")}
                    className="rounded-lg p-1.5 text-amber-400 hover:bg-white/10 transition-colors"
                    title="Feature event"
                  >
                    <Star className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onAction(event.id, "suspend", "event")}
                    className="rounded-lg p-1.5 text-red-400 hover:bg-white/10 transition-colors"
                    title="Suspend event"
                  >
                    <Flag className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
