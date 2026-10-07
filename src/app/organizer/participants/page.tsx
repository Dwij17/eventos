"use client";

import { useState } from "react";
import {
  Users,
  Search,
  Download,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Mail,
  ChevronDown,
  ShieldCheck,
  FileSpreadsheet,
} from "lucide-react";

interface ParticipantItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  event: string;
  category: string;
  bib: string;
  tShirtSize: string;
  bloodGroup: string;
  emergencyContact: string;
  checkedIn: boolean;
  paymentStatus: "PAID" | "PENDING";
  regDate: string;
}

export default function ParticipantsPage() {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("ALL");
  const [filterCheckIn, setFilterCheckIn] = useState("ALL");

  const [participants, setParticipants] = useState<ParticipantItem[]>([
    {
      id: "p-01",
      name: "Priya Sharma",
      email: "participant@eventos.com",
      phone: "+91 98765 43210",
      event: "Mumbai Marathon 2027",
      category: "Half Marathon",
      bib: "HM-4029",
      tShirtSize: "M",
      bloodGroup: "O+",
      emergencyContact: "Rajesh (+91 98765 43211)",
      checkedIn: true,
      paymentStatus: "PAID",
      regDate: "2026-09-12",
    },
    {
      id: "p-02",
      name: "Aakash Patel",
      email: "aakash.patel@gmail.com",
      phone: "+91 98111 22334",
      event: "Mumbai Marathon 2027",
      category: "Full Marathon",
      bib: "FM-1092",
      tShirtSize: "L",
      bloodGroup: "B+",
      emergencyContact: "Sunita (+91 98111 22335)",
      checkedIn: true,
      paymentStatus: "PAID",
      regDate: "2026-09-15",
    },
    {
      id: "p-03",
      name: "Sneha Sen",
      email: "sneha.sen@outlook.com",
      phone: "+91 97222 33445",
      event: "Mumbai Marathon 2027",
      category: "Half Marathon",
      bib: "HM-4401",
      tShirtSize: "S",
      bloodGroup: "A+",
      emergencyContact: "Amit (+91 97222 33446)",
      checkedIn: false,
      paymentStatus: "PAID",
      regDate: "2026-09-20",
    },
    {
      id: "p-04",
      name: "Vikram Malhotra",
      email: "vikram.m@techcorp.in",
      phone: "+91 96333 44556",
      event: "Mumbai Marathon 2027",
      category: "10K Run",
      bib: "10K-2940",
      tShirtSize: "XL",
      bloodGroup: "AB+",
      emergencyContact: "Meera (+91 96333 44557)",
      checkedIn: false,
      paymentStatus: "PAID",
      regDate: "2026-09-22",
    },
    {
      id: "p-05",
      name: "Ananya Deshmukh",
      email: "ananya.d@gmail.com",
      phone: "+91 95444 55667",
      event: "Mumbai Marathon 2027",
      category: "10K Run",
      bib: "10K-8120",
      tShirtSize: "M",
      bloodGroup: "O+",
      emergencyContact: "Nikhil (+91 95444 55668)",
      checkedIn: true,
      paymentStatus: "PAID",
      regDate: "2026-09-25",
    },
    {
      id: "p-06",
      name: "Karan Johar",
      email: "karan.j@mumbai.com",
      phone: "+91 94555 66778",
      event: "Mumbai Marathon 2027",
      category: "Full Marathon",
      bib: "FM-1180",
      tShirtSize: "L",
      bloodGroup: "B-",
      emergencyContact: "Rohit (+91 94555 66779)",
      checkedIn: false,
      paymentStatus: "PAID",
      regDate: "2026-09-28",
    },
  ]);

  const toggleCheckIn = (id: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, checkedIn: !p.checkedIn } : p))
    );
  };

  const filteredParticipants = participants.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.bib.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCat === "ALL" || p.category === filterCat;
    const matchesCheckIn =
      filterCheckIn === "ALL" ||
      (filterCheckIn === "CHECKED_IN" && p.checkedIn) ||
      (filterCheckIn === "PENDING" && !p.checkedIn);
    return matchesSearch && matchesCat && matchesCheckIn;
  });

  const exportCSV = () => {
    const headers = [
      "Participant ID",
      "Full Name",
      "Email",
      "Phone",
      "Category",
      "Bib Number",
      "T-Shirt Size",
      "Blood Group",
      "Emergency Contact",
      "Checked In",
      "Registration Date",
    ];

    const rows = filteredParticipants.map((p) => [
      p.id,
      p.name,
      p.email,
      p.phone,
      p.category,
      p.bib,
      p.tShirtSize,
      p.bloodGroup,
      p.emergencyContact,
      p.checkedIn ? "YES" : "NO",
      p.regDate,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `EventOS_Roster_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
            Participant Roster & Bib Management
          </h2>
          <p className="text-xs text-slate-600 dark:text-white/60">
            Export participant records, verify medical cards, and mark race kit check-ins.
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="btn-primary text-xs px-4 py-2.5 flex items-center gap-2 self-start"
        >
          <FileSpreadsheet size={15} />
          Export CSV Roster
        </button>
      </div>

      {/* Roster Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-600 dark:text-white/60 block">Total Filtered</span>
          <span className="text-xl font-bold text-slate-900 dark:text-white font-[family-name:var(--font-display)]">
            {filteredParticipants.length}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-600 dark:text-white/60 block">Checked In</span>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-[family-name:var(--font-display)]">
            {filteredParticipants.filter((p) => p.checkedIn).length}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-600 dark:text-white/60 block">Kits Pending</span>
          <span className="text-xl font-bold text-amber-600 dark:text-amber-400 font-[family-name:var(--font-display)]">
            {filteredParticipants.filter((p) => !p.checkedIn).length}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-600 dark:text-white/60 block">Check-in Rate</span>
          <span className="text-xl font-bold text-primary font-[family-name:var(--font-display)]">
            {filteredParticipants.length
              ? Math.round(
                  (filteredParticipants.filter((p) => p.checkedIn).length /
                    filteredParticipants.length) *
                    100
                )
              : 0}
            %
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 dark:text-white/60" />
          <input
            type="text"
            placeholder="Search by name, bib (e.g. HM-4029), or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-9 text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto text-xs">
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="input-field text-xs py-2 w-auto"
          >
            <option value="ALL">All Categories</option>
            <option value="Full Marathon">Full Marathon</option>
            <option value="Half Marathon">Half Marathon</option>
            <option value="10K Run">10K Run</option>
          </select>

          <select
            value={filterCheckIn}
            onChange={(e) => setFilterCheckIn(e.target.value)}
            className="input-field text-xs py-2 w-auto"
          >
            <option value="ALL">All Check-in Statuses</option>
            <option value="CHECKED_IN">Checked In</option>
            <option value="PENDING">Kit Pending</option>
          </select>
        </div>
      </div>

      {/* Roster Table */}
      <div className="rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/10 text-slate-600 dark:text-white/60 font-semibold uppercase tracking-wider text-[10px] bg-slate-50/50 dark:bg-white/[0.02]">
                <th className="py-3.5 px-4">Participant</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Bib Number</th>
                <th className="py-3.5 px-4">Gear & Blood Group</th>
                <th className="py-3.5 px-4">Emergency Contact</th>
                <th className="py-3.5 px-4">Check-in Status</th>
                <th className="py-3.5 px-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredParticipants.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {p.name}
                    </span>
                    <span className="text-[11px] text-slate-600 dark:text-white/60">
                      {p.email} • {p.phone}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-white">
                    {p.category}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                      {p.bib}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-800 dark:text-white block">
                      T-Shirt: {p.tShirtSize}
                    </span>
                    <span className="text-[11px] text-rose-500 font-semibold">
                      Blood: {p.bloodGroup}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-white/80 text-[11px]">
                    {p.emergencyContact}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        p.checkedIn
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {p.checkedIn ? (
                        <>
                          <CheckCircle2 size={11} />
                          Checked In
                        </>
                      ) : (
                        <>
                          <Clock size={11} />
                          Kit Pending
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => toggleCheckIn(p.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        p.checkedIn
                          ? "border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 hover:bg-slate-100"
                          : "btn-primary"
                      }`}
                    >
                      {p.checkedIn ? "Undo" : "Check In"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
