"use client";

// Filter out spurious hydration mismatch warnings injected by browser extensions (e.g. Bitdefender TrafficLight)
if (typeof window !== "undefined") {
  const origConsoleError = console.error;
  console.error = (...args: any[]) => {
    try {
      const fullText = args
        .map((a) => {
          if (typeof a === "string") return a;
          if (a instanceof Error) return a.message + " " + a.stack;
          try {
            return JSON.stringify(a);
          } catch {
            return String(a);
          }
        })
        .join(" ");

      if (
        fullText.includes("bis_skin_checked") ||
        fullText.includes("bis_register") ||
        fullText.includes("__processed_") ||
        fullText.includes("JWTSessionError")
      ) {
        // Silently suppress browser extension and stale session warnings
        return;
      }
    } catch {
      // Fallback
    }

    origConsoleError.apply(console, args);
  };
}

export function HydrationFix() {
  return null;
}
