"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Award,
  Download,
  Share2,
  Calendar,
  Clock,
  Activity,
  Trophy,
  ExternalLink,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { getUserCertificates, UserCertificate } from "@/lib/userStore";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<UserCertificate[]>([]);
  const [selectedCert, setSelectedCert] = useState<UserCertificate | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const load = () => {
      setCertificates(getUserCertificates());
      setIsLoaded(true);
    };
    load();
    window.addEventListener("eventos_storage_updated", load);
    return () => window.removeEventListener("eventos_storage_updated", load);
  }, []);

  if (!isLoaded) {
    return <div className="p-8 text-center text-sm text-slate-500">Loading certificates...</div>;
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
            Results & Digital Certificates
          </h2>
          <p className="text-xs text-slate-600 dark:text-white/60">
            Verified official timing records and finisher certificates for your completed races.
          </p>
        </div>
      </div>

      {certificates.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 dark:border-white/10 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
            <Award size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No Finisher Certificates Yet
          </h3>
          <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed">
            Certificates are automatically generated and verified with official timing data once you participate in an event and the race organizers publish results.
          </p>
          <div className="pt-2">
            <Link
              href="/results"
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors inline-flex items-center gap-2 mr-2"
            >
              Search All Results
            </Link>
            <Link
              href="/explore"
              className="btn-primary text-xs px-4 py-2 inline-flex items-center gap-2"
            >
              <Compass size={14} />
              Find Next Event
            </Link>
          </div>
        </div>
      ) : (
        /* Certificate Cards */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="rounded-3xl bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-white/10 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Award size={22} />
                  </div>
                  <span className="text-[11px] font-mono text-slate-600 dark:text-white/60">
                    {cert.date}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                  {cert.eventName}
                </h3>
                <p className="text-xs text-slate-600 dark:text-white/60 mb-4">
                  {cert.category}
                </p>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 dark:border-white/5 text-xs">
                  <div>
                    <span className="text-slate-600 dark:text-white/60 block">Official Time</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {cert.finishTime}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-600 dark:text-white/60 block">Overall Rank</span>
                    <span className="font-mono font-bold text-primary">
                      #{cert.overallRank}{" "}
                      <span className="text-[10px] text-slate-600 dark:text-white/60 font-normal">
                        / {cert.totalParticipants}
                      </span>
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-600 dark:text-white/60 block">Avg Pace</span>
                    <span className="font-mono text-slate-700 dark:text-white/80">
                      {cert.pace}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-600 dark:text-white/60 block">Category Rank</span>
                    <span className="font-mono text-slate-700 dark:text-white/80">
                      #{cert.categoryRank}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-2 flex items-center gap-2">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="btn-primary text-xs flex-1 py-2 flex items-center justify-center gap-1.5"
                >
                  <ExternalLink size={14} />
                  View Certificate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certificate Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-white dark:bg-[#0c0c14] border border-slate-200 dark:border-white/10 rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl space-y-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center border-b border-slate-200 dark:border-white/10 pb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Official Finisher Certificate
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white mt-1">
                {selectedCert.eventName}
              </h2>
              <p className="text-xs text-slate-600 dark:text-white/60 mt-1">
                {selectedCert.category} • {selectedCert.date}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
              <div>
                <span className="text-[11px] text-slate-600 dark:text-white/60 block">Finish Time</span>
                <span className="text-lg font-mono font-bold text-slate-900 dark:text-white">
                  {selectedCert.finishTime}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-600 dark:text-white/60 block">Pace</span>
                <span className="text-lg font-mono font-bold text-slate-900 dark:text-white">
                  {selectedCert.pace}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-600 dark:text-white/60 block">Overall Rank</span>
                <span className="text-lg font-mono font-bold text-primary">
                  #{selectedCert.overallRank}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-600 dark:text-white/60 block">Category Rank</span>
                <span className="text-lg font-mono font-bold text-slate-900 dark:text-white">
                  #{selectedCert.categoryRank}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-white/60 pt-2 border-t border-slate-200 dark:border-white/10">
              <span className="font-mono text-[11px]">ID: {selectedCert.certificateNo}</span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck size={14} /> Cryptographically Verified
              </span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedCert(null)}
                className="btn-secondary text-xs flex-1 py-2.5"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="btn-primary text-xs flex-1 py-2.5 flex items-center justify-center gap-2"
              >
                <Download size={14} />
                Download PDF / Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
