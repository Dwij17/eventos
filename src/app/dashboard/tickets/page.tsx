"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  QrCode,
  Download,
  Calendar,
  MapPin,
  Clock,
  Printer,
  Compass,
  Ticket as TicketIcon,
} from "lucide-react";
import QRCode from "qrcode";
import { getUserRegistrations } from "@/lib/userStore";

interface TicketData {
  id: string;
  ticketNumber: string;
  registrationNo: string;
  bibNumber: string;
  eventName: string;
  categoryName: string;
  participantName: string;
  participantEmail: string;
  date: string;
  time: string;
  reportingTime: string;
  venue: string;
  tShirtSize: string;
  emergencyContact: string;
  qrPayload: string;
}

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState<string>("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const load = () => {
      const regs = getUserRegistrations();
      const mapped: TicketData[] = regs.map((r) => ({
        id: r.id,
        ticketNumber: `TKT-${r.registrationNo.replace("EVT-", "")}`,
        registrationNo: r.registrationNo,
        bibNumber: r.bibNumber,
        eventName: r.eventTitle,
        categoryName: r.categoryName,
        participantName: r.participantName,
        participantEmail: r.participantEmail,
        date: r.date,
        time: r.time,
        reportingTime: `${r.time} (Gate opens 45m prior)`,
        venue: r.venue,
        tShirtSize: r.tShirtSize || "M",
        emergencyContact: r.emergencyContact || "Provided at registration",
        qrPayload: JSON.stringify({
          tkt: `TKT-${r.registrationNo.replace("EVT-", "")}`,
          reg: r.registrationNo,
          bib: r.bibNumber,
          name: r.participantName,
          event: r.eventTitle,
          cat: r.categoryName,
        }),
      }));
      setTickets(mapped);
      if (mapped.length > 0) {
        setSelectedTicketId((prev) => (mapped.some((m) => m.id === prev) ? prev : mapped[0].id));
      }
      setIsLoaded(true);
    };

    load();
    window.addEventListener("eventos_storage_updated", load);
    return () => window.removeEventListener("eventos_storage_updated", load);
  }, []);

  const activeTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  useEffect(() => {
    if (!activeTicket) return;
    QRCode.toDataURL(activeTicket.qrPayload, {
      width: 260,
      margin: 2,
      color: {
        dark: "#0f172a",
        light: "#ffffff",
      },
    })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error(err));
  }, [activeTicket]);

  const handlePrint = () => {
    window.print();
  };

  if (!isLoaded) {
    return <div className="p-8 text-center text-sm text-slate-500">Loading tickets...</div>;
  }

  // EMPTY STATE: User has not registered for any events yet
  if (tickets.length === 0) {
    return (
      <div className="space-y-8 max-w-4xl mx-auto py-12">
        <div className="text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
            <TicketIcon size={32} />
          </div>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
            No Digital Tickets Found
          </h2>
          <p className="text-sm text-slate-600 dark:text-white/60 leading-relaxed">
            You haven't registered for any events yet. Once you complete registration for a marathon, tournament, or sports event, your verified e-ticket and check-in QR code will appear here automatically.
          </p>
          <div className="pt-2">
            <Link
              href="/explore"
              className="btn-primary text-sm px-6 py-3 inline-flex items-center gap-2"
            >
              <Compass size={16} />
              Explore Live Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
            Digital Tickets & Passes
          </h2>
          <p className="text-xs text-slate-600 dark:text-white/60">
            Show this QR code at the bib expo or start gate for instant barcode scan check-in.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white text-xs font-semibold hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            <Printer size={15} />
            Print Ticket
          </button>
        </div>
      </div>

      {/* Ticket Selector Tabs */}
      {tickets.length > 1 && (
        <div className="flex gap-2 border-b border-slate-200 dark:border-white/10 pb-2 overflow-x-auto">
          {tickets.map((tkt) => (
            <button
              key={tkt.id}
              onClick={() => setSelectedTicketId(tkt.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedTicketId === tkt.id
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-white dark:bg-[#0f0f18] text-slate-600 dark:text-white/60 border border-slate-200 dark:border-white/10 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <QrCode size={15} />
              {tkt.eventName}
            </button>
          ))}
        </div>
      )}

      {/* Digital Pass / Ticket Layout */}
      {activeTicket && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pass Visual Card */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-white/10 overflow-hidden shadow-xl">
              {/* Ticket Header Graphic */}
              <div className="bg-gradient-to-r from-secondary via-slate-900 to-[#1e1b4b] p-6 sm:p-8 text-white relative">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-1 rounded-full bg-white/10 text-white/90 text-[11px] font-semibold tracking-wide uppercase mb-2">
                      Official Participant Pass
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-display)]">
                      {activeTicket.eventName}
                    </h3>
                    <p className="text-primary font-semibold text-sm mt-0.5">
                      {activeTicket.categoryName}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-white/50 block uppercase tracking-wider">
                      Assigned Bib
                    </span>
                    <div className="text-2xl sm:text-3xl font-mono font-black text-primary tracking-tight">
                      {activeTicket.bibNumber}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ticket Body */}
              <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Event & Runner details */}
                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-600 dark:text-white/60 block">
                      Runner / Participant
                    </span>
                    <span className="text-base font-bold text-slate-900 dark:text-white">
                      {activeTicket.participantName}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-white/60 block">
                      {activeTicket.participantEmail}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-600 dark:text-white/60 block">
                        Date
                      </span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-white">
                        {activeTicket.date}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-600 dark:text-white/60 block">
                        Start Time
                      </span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-white">
                        {activeTicket.time}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-600 dark:text-white/60 block">
                      Venue
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-white">
                      {activeTicket.venue}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-white/5">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-600 dark:text-white/60 block">
                        T-Shirt Size
                      </span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-white">
                        {activeTicket.tShirtSize}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-600 dark:text-white/60 block">
                        Registration ID
                      </span>
                      <span className="text-xs font-mono font-medium text-slate-700 dark:text-white/70 truncate block">
                        {activeTicket.registrationNo}
                      </span>
                    </div>
                  </div>
                </div>

                {/* QR Code Presentation */}
                <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 text-center">
                  <div className="bg-white p-3 rounded-2xl shadow-md border border-slate-200">
                    {qrCodeUrl ? (
                      <img
                        src={qrCodeUrl}
                        alt="Check-in QR Code"
                        className="w-48 h-48 rounded-lg"
                      />
                    ) : (
                      <div className="w-48 h-48 flex items-center justify-center bg-slate-100 rounded-lg text-xs text-slate-400">
                        Generating QR Code...
                      </div>
                    )}
                  </div>
                  <span className="mt-3 text-xs font-mono font-bold text-slate-700 dark:text-white/80">
                    {activeTicket.ticketNumber}
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-white/60 mt-1">
                    Scan for immediate badge & bib verification
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Event Info */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-white/10 space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Event Day Schedule
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <Clock size={15} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white">
                      Reporting Time
                    </p>
                    <p className="text-slate-600 dark:text-white/60">
                      {activeTicket.reportingTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Calendar size={15} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white">
                      Race Start
                    </p>
                    <p className="text-slate-600 dark:text-white/60">
                      {activeTicket.time} sharp
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin size={15} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white">
                      Assembly Point
                    </p>
                    <p className="text-slate-600 dark:text-white/60">
                      {activeTicket.venue}
                    </p>
                  </div>
                </div>
              </div>

              {qrCodeUrl && (
                <a
                  href={qrCodeUrl}
                  download={`Ticket-${activeTicket.bibNumber}.png`}
                  className="w-full btn-secondary text-xs py-2.5 flex items-center justify-center gap-2 mt-4"
                >
                  <Download size={14} />
                  Download QR Image
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
