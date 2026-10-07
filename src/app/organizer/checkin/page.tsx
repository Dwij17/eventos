"use client";

import { useState } from "react";
import {
  QrCode,
  CheckCircle2,
  AlertCircle,
  Search,
  ScanLine,
  Camera,
  UserCheck,
  ShieldCheck,
  Sparkles,
  Clock,
  Shirt,
} from "lucide-react";

interface ScannedRecord {
  id: string;
  name: string;
  bib: string;
  category: string;
  tShirtSize: string;
  time: string;
  status: "SUCCESS" | "ALREADY_CHECKED_IN" | "NOT_FOUND";
}

export default function CheckInScannerPage() {
  const [manualInput, setManualInput] = useState("");
  const [lastScanned, setLastScanned] = useState<ScannedRecord | null>(null);
  const [recentScans, setRecentScans] = useState<ScannedRecord[]>([
    {
      id: "scan-01",
      name: "Aakash Patel",
      bib: "FM-1092",
      category: "Full Marathon",
      tShirtSize: "L",
      time: "Just now",
      status: "SUCCESS",
    },
    {
      id: "scan-02",
      name: "Priya Sharma",
      bib: "HM-4029",
      category: "Half Marathon",
      tShirtSize: "M",
      time: "2 mins ago",
      status: "SUCCESS",
    },
    {
      id: "scan-03",
      name: "Ananya Deshmukh",
      bib: "10K-8120",
      category: "10K Run",
      tShirtSize: "M",
      time: "5 mins ago",
      status: "SUCCESS",
    },
  ]);

  const [counter, setCounter] = useState(18503);

  const handleScanSimulation = (codeToTest?: string) => {
    const code = codeToTest || manualInput.trim().toUpperCase();
    if (!code) return;

    if (code.includes("4029") || code.includes("PRIYA") || code === "HM-4029") {
      const res: ScannedRecord = {
        id: `s-${Date.now()}`,
        name: "Priya Sharma",
        bib: "HM-4029",
        category: "Half Marathon (21.1 km)",
        tShirtSize: "M",
        time: "Just now",
        status: "SUCCESS",
      };
      setLastScanned(res);
      setRecentScans((prev) => [res, ...prev.slice(0, 7)]);
      setCounter((c) => c + 1);
    } else if (code.includes("1092") || code === "FM-1092") {
      const res: ScannedRecord = {
        id: `s-${Date.now()}`,
        name: "Aakash Patel",
        bib: "FM-1092",
        category: "Full Marathon (42.2 km)",
        tShirtSize: "L",
        time: "Just now",
        status: "ALREADY_CHECKED_IN",
      };
      setLastScanned(res);
    } else {
      const res: ScannedRecord = {
        id: `s-${Date.now()}`,
        name: code.length > 5 ? code : `Runner (${code})`,
        bib: code,
        category: "10K Timed Run",
        tShirtSize: "XL",
        time: "Just now",
        status: "SUCCESS",
      };
      setLastScanned(res);
      setRecentScans((prev) => [res, ...prev.slice(0, 7)]);
      setCounter((c) => c + 1);
    }

    setManualInput("");
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
            Bib Expo & Check-in Scanner
          </h2>
          <p className="text-xs text-slate-600 dark:text-white/60">
            Scan participant digital ticket QR codes or type bib numbers to issue race kits and activate timing chips.
          </p>
        </div>
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold self-start">
          <CheckCircle2 size={16} />
          <span>{counter.toLocaleString()} Kits Checked In</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Scanner Viewfinder / Simulation Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-slate-900 text-white border border-white/10 p-6 sm:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
            {/* Laser Line Animation */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse top-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="relative w-64 h-64 border-2 border-dashed border-primary/50 rounded-3xl flex flex-col items-center justify-center p-6 bg-black/40 backdrop-blur-xs">
              <Camera size={44} className="text-primary animate-bounce mb-3" />
              <span className="text-xs font-semibold text-white/80">
                Camera Viewfinder Ready
              </span>
              <p className="text-[11px] text-white/50 mt-1 max-w-[180px]">
                Hold QR ticket in front of scanner camera
              </p>

              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary" />
            </div>

            {/* Quick Demo Simulator Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-white/60 mr-1">Simulate Scan:</span>
              <button
                onClick={() => handleScanSimulation("HM-4029")}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono font-semibold transition-colors"
              >
                Scan HM-4029 (Priya)
              </button>
              <button
                onClick={() => handleScanSimulation("FM-1092")}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono font-semibold transition-colors"
              >
                Scan FM-1092 (Duplicate)
              </button>
              <button
                onClick={() => handleScanSimulation("10K-8120")}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono font-semibold transition-colors"
              >
                Scan 10K-8120
              </button>
            </div>
          </div>

          {/* Manual Input Form */}
          <div className="rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 p-6 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Search size={16} className="text-primary" />
              Manual Bib / Ticket Lookup
            </h3>
            <p className="text-xs text-slate-600 dark:text-white/60 mb-4">
              If runner cannot display QR code, search by Bib Number (e.g. HM-4029) or registration ID.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleScanSimulation();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Enter Bib Number or Ticket Ref..."
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                className="input-field text-xs font-mono"
              />
              <button
                type="submit"
                className="btn-primary text-xs px-5 py-2.5 whitespace-nowrap"
              >
                Verify & Check In
              </button>
            </form>
          </div>
        </div>

        {/* Scan Result & Recent Scans Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Last Scanned Result Card */}
          {lastScanned ? (
            <div
              className={`rounded-3xl p-6 border shadow-xl transition-all ${
                lastScanned.status === "SUCCESS"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-100"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/40 dark:bg-white/10">
                  {lastScanned.status === "SUCCESS" ? (
                    <>
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      Verified & Checked In
                    </>
                  ) : (
                    <>
                      <AlertCircle size={14} className="text-amber-500" />
                      Already Checked In
                    </>
                  )}
                </span>
                <span className="text-[11px] font-mono text-slate-600 dark:text-white/60">
                  {lastScanned.time}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[11px] uppercase tracking-wider block font-semibold opacity-70">
                    Participant
                  </span>
                  <h4 className="text-xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
                    {lastScanned.name}
                  </h4>
                  <p className="text-xs opacity-80">{lastScanned.category}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-black/10 dark:border-white/10">
                  <div className="p-3 rounded-xl bg-white/60 dark:bg-black/30">
                    <span className="text-[10px] uppercase font-bold block opacity-70">
                      Assigned Bib
                    </span>
                    <span className="text-xl font-mono font-black text-primary">
                      {lastScanned.bib}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/60 dark:bg-black/30">
                    <span className="text-[10px] uppercase font-bold block opacity-70 flex items-center gap-1">
                      <Shirt size={12} />
                      T-Shirt Size
                    </span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                      {lastScanned.tShirtSize}
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-xs opacity-80 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  Timing chip ID activated on course gateway.
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 p-8 text-center text-xs text-slate-600 dark:text-white/60 space-y-2">
              <ScanLine size={32} className="mx-auto text-primary opacity-60" />
              <p className="font-semibold text-slate-800 dark:text-white">
                Awaiting First Scan
              </p>
              <p className="text-[11px] text-slate-600 dark:text-white/60">
                Scan a barcode or click a demo simulation button above.
              </p>
            </div>
          )}

          {/* Recent Scans Live Stream */}
          <div className="rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 p-6 shadow-sm space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-white/60 flex items-center gap-2">
              <Clock size={14} />
              Recent Check-in Feed
            </h4>

            <div className="space-y-2.5">
              {recentScans.map((scan) => (
                <div
                  key={scan.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {scan.name}
                      </span>
                      <span className="text-[11px] text-slate-600 dark:text-white/60">
                        {scan.category} • Size {scan.tShirtSize}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-primary block">
                      {scan.bib}
                    </span>
                    <span className="text-[10px] text-slate-600 dark:text-white/60">
                      {scan.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
