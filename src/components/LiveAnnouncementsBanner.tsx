"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, AlertTriangle, Info, Zap } from "lucide-react";
import { useEventAnnouncements } from "@/lib/realtimeHooks";
import { format } from "date-fns";

interface Props {
  eventId: string;
}

export function LiveAnnouncementsBanner({ eventId }: Props) {
  const announcements = useEventAnnouncements(eventId);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const visible = announcements.filter((a) => !dismissed.includes(a.timestamp));
  const latest = visible[0];

  if (!latest) return null;

  const icons: Record<string, React.ElementType> = {
    high: Zap,
    medium: AlertTriangle,
    low: Info,
  };

  const colors: Record<string, string> = {
    high: "border-red-500/50 bg-red-500/10 text-red-400",
    medium: "border-amber-500/50 bg-amber-500/10 text-amber-400",
    low: "border-blue-500/50 bg-blue-500/10 text-blue-400",
  };

  const Icon = icons[latest.priority] || Bell;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`rounded-xl border px-4 py-3 ${colors[latest.priority]}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <Icon className="h-4 w-4 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">{latest.title}</p>
              <p className="text-xs opacity-80 mt-0.5">{latest.message}</p>
              {visible.length > 1 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-1 text-xs underline opacity-60 hover:opacity-100"
                >
                  {isExpanded ? "Show less" : `+${visible.length - 1} more announcement${visible.length > 2 ? "s" : ""}`}
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs opacity-50">{format(new Date(latest.timestamp), "HH:mm")}</span>
            <button
              onClick={() => setDismissed((p) => [...p, latest.timestamp])}
              className="rounded-full p-0.5 opacity-60 hover:opacity-100 transition-opacity"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 space-y-2 border-t border-current/20 pt-3">
                {visible.slice(1).map((ann) => {
                  const AnnIcon = icons[ann.priority] || Bell;
                  return (
                    <div key={ann.timestamp} className="flex items-start gap-2">
                      <AnnIcon className="h-3.5 w-3.5 mt-0.5 shrink-0 opacity-60" />
                      <div>
                        <p className="text-xs font-medium">{ann.title}</p>
                        <p className="text-xs opacity-70">{ann.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
