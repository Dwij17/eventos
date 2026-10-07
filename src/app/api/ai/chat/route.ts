import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { demoEvents } from "@/lib/demoData";

const SYSTEM_CONTEXT = `You are EventBot, the smart, helpful, and friendly AI assistant for EventOS — India's premier event discovery and management platform.
You help users:
1. Discover sports events, marathons, tournaments, festivals, and campus events.
2. Understand registration processes, pricing tiers, and payment options.
3. Get preparation, training, nutrition, and gear tips for running, cycling, cricket, football, etc.
4. Check tickets, QR codes, race results, timing splits, and finisher certificates.
5. Guide organizers on event creation, live QR check-ins, and participant analytics.

Current available events on the platform:
${demoEvents
  .map(
    (e) =>
      `- ${e.title} (${e.type}) in ${e.city}, ${e.state} on ${new Date(e.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} | Venue: ${e.venueName} | Slug: /events/${e.slug}`
  )
  .join("\n")}

Format responses cleanly with bold highlights and bullet points. Keep answers concise, engaging, and action-oriented.`;

function generateSmartFallback(query: string): string {
  const q = query.toLowerCase().trim();

  // 1. Greetings
  if (
    q === "hi" ||
    q === "hello" ||
    q === "hey" ||
    q.startsWith("hello") ||
    q.startsWith("hi ") ||
    q.includes("who are you") ||
    q.includes("what can you do")
  ) {
    return (
      "Hey there! 👋 I'm **EventBot**, your AI assistant for EventOS.\n\n" +
      "I'm here to help you:\n" +
      "• **Find sports & events** by sport, city, or date\n" +
      "• **Guide you through registration** and ticket downloads\n" +
      "• **Get training tips** for marathons, cycling, and fitness\n" +
      "• **Check live leaderboards & race certificates**\n\n" +
      "What type of event are you looking for today? 🏃‍♂️🏏🚴‍♀️"
    );
  }

  // 2. Training & Preparation Tips
  if (
    q.includes("tip") ||
    q.includes("train") ||
    q.includes("prepare") ||
    q.includes("diet") ||
    q.includes("shoes") ||
    q.includes("plan")
  ) {
    return (
      "💪 **Essential Race Day & Training Preparation:**\n\n" +
      "1. **Pacing Strategy**: Don't sprint the start. Run the first 20% at a conservative pace.\n" +
      "2. **Hydration**: Sip 150-200ml water or electrolytes at every 3-5km aid station.\n" +
      "3. **Gear Rule**: Never try brand-new shoes or apparel on race day; break them in at least 3 weeks prior.\n" +
      "4. **Carb-Loading**: Focus on complex carbohydrates (oats, sweet potatoes, rice) 48 hours before the event.\n" +
      "5. **Recovery**: Stretch, hydrate, and take a 15-minute cool-down walk post-finish.\n\n" +
      "Need a specific plan for 10K, Half, or Full Marathon? Just ask!"
    );
  }

  // 3. How to register / Booking / Payment / Ticket
  if (
    q.includes("register") ||
    q.includes("how do i") ||
    q.includes("book") ||
    q.includes("payment") ||
    q.includes("pay") ||
    q.includes("razorpay") ||
    q.includes("ticket")
  ) {
    return (
      "📝 **How to Register on EventOS:**\n\n" +
      "1. Explore events on the **[Explore Page](/explore)**.\n" +
      "2. Choose your category (e.g., 10K, Half Marathon, Under-19).\n" +
      "3. Fill in your participant details (emergency contact, t-shirt size).\n" +
      "4. Pay securely via Razorpay (UPI, Credit/Debit Cards, NetBanking).\n" +
      "5. Your digital ticket with QR code appears instantly in **[My Tickets](/dashboard/tickets)**!"
    );
  }

  // 4. Certificates & Results
  if (
    q.includes("certificate") ||
    q.includes("result") ||
    q.includes("timing") ||
    q.includes("bib") ||
    q.includes("leaderboard")
  ) {
    return (
      "🏅 **Results & Certificates:**\n\n" +
      "• **Live Leaderboard**: Watch real-time race positions in the **[Live Hub](/live)**.\n" +
      "• **Search Results**: Look up any BIB number or participant name on the **[Results Page](/results)** (e.g. Try searching `MMB-0042` or `Priya Singh`).\n" +
      "• **Finisher Certificates**: Auto-generated with official gun & net times. Download and share yours directly from **[Dashboard → Certificates](/dashboard/certificates)**."
    );
  }

  // 5. Organizer / Hosting
  if (
    q.includes("organizer") ||
    q.includes("create event") ||
    q.includes("host") ||
    q.includes("publish") ||
    q.includes("checkin") ||
    q.includes("scanner")
  ) {
    return (
      "⚡ **For Event Organizers:**\n\n" +
      "EventOS provides a full suite of management tools:\n" +
      "• **Event Wizard**: Create multi-tier tickets in minutes at **[Create Event](/organizer/events/create)**.\n" +
      "• **Live Check-in**: Scan participant QR codes at the gate using **[Check-in Scanner](/organizer/checkin)**.\n" +
      "• **Real-time Announcements**: Broadcast weather and schedule alerts to racers.\n" +
      "• **Analytics**: Track registrations, revenue, and demographics at **[Organizer Analytics](/organizer/analytics)**."
    );
  }

  // 6. City-based queries
  const cities = ["mumbai", "bangalore", "delhi", "goa", "pune", "hyderabad", "chennai"];
  const matchedCity = cities.find((city) => q.includes(city));
  if (matchedCity) {
    const cityEvents = demoEvents.filter((e) =>
      e.city.toLowerCase().includes(matchedCity)
    );
    if (cityEvents.length > 0) {
      const eventList = cityEvents
        .map(
          (e) =>
            `• **[${e.title}](/events/${e.slug})** — ${e.type} at ${e.venueName} (Starting from ₹${Math.min(...e.categories.map((c) => c.price))})`
        )
        .join("\n");
      return (
        `📍 Here are the upcoming events in **${matchedCity.toUpperCase()}**:\n\n` +
        eventList +
        `\n\nClick any link above to view details and grab your spot!`
      );
    }
  }

  // 7. Running / Marathon queries
  if (q.includes("marathon") || q.includes("run") || q.includes("10k") || q.includes("half marathon")) {
    const runningEvents = demoEvents.filter((e) => e.type === "RUNNING");
    return (
      "🏃‍♂️ **Featured Running Events on EventOS:**\n\n" +
      runningEvents
        .map(
          (e) =>
            `• **[${e.title}](/events/${e.slug})** in ${e.city} (${new Date(e.startDate).toLocaleDateString("en-IN", { month: "short", day: "numeric" })})\n  Categories: ${e.categories.map((c) => `${c.name} (₹${c.price})`).join(", ")}`
        )
        .join("\n\n") +
      "\n\n💡 *Pro-tip: Early bird slots fill fast! You can also track live splits on race day in the [Live Hub](/live).*"
    );
  }

  // 8. Cricket
  if (q.includes("cricket") || q.includes("tournament") || q.includes("ipl") || q.includes("match")) {
    return (
      "🏏 **IPL Fan Cricket Tournament 2027** is live for team entries!\n\n" +
      "• **Venue:** M. Chinnaswamy Stadium, Bangalore\n" +
      "• **Format:** Knockout T20 (11 players/team)\n" +
      "• **Categories:** Under-19 (₹5,000/team) & Open (₹8,000/team)\n" +
      "• **Status:** Limited slots remaining\n\n" +
      "Check out full details and register your squad at **[/events/ipl-fan-cricket-2027](/events/ipl-fan-cricket-2027)**!"
    );
  }

  // 9. Cycling & Fitness
  if (q.includes("cycling") || q.includes("cycle") || q.includes("bike")) {
    return (
      "🚴‍♀️ **Pune Cycling Challenge 2027:**\n\n" +
      "• **Categories:** 50K Scenic Route (₹1,200) & 100K Century Endurance (₹2,000)\n" +
      "• **Date:** 1st March 2027 starting at Shaniwar Wada, Pune\n" +
      "• **Perks:** Finisher medal, timing chip, hydration support, and jersey\n\n" +
      "Register now at **[/events/pune-cycling-2027](/events/pune-cycling-2027)**."
    );
  }

  if (q.includes("yoga") || q.includes("fitness") || q.includes("crossfit")) {
    return (
      "🧘 **Sunrise Yoga & Fitness Festival (Goa):**\n\n" +
      "• **Venue:** Baga Beach, Goa at sunrise (5:30 AM)\n" +
      "• **Yoga Sessions:** Completely **FREE** registration!\n" +
      "• **Beach CrossFit Challenge:** ₹1,200 entry with cash prizes\n\n" +
      "Join the beach vibes at **[/events/sunrise-yoga-fitness-2027](/events/sunrise-yoga-fitness-2027)**."
    );
  }

  // 10. Football / Badminton
  if (q.includes("football") || q.includes("soccer")) {
    return (
      "⚽ **Delhi Football Championship 2027:**\n\n" +
      "• **Venue:** Jawaharlal Nehru Stadium, New Delhi\n" +
      "• **Format:** 7-a-side Open Championship\n" +
      "• **Entry:** ₹3,000 per team\n\n" +
      "View bracket and register at **[/events/delhi-football-championship-2027](/events/delhi-football-championship-2027)**."
    );
  }

  if (q.includes("badminton")) {
    return (
      "🏸 **Chennai Badminton Open 2027:**\n\n" +
      "• **Venue:** SDAT Complex, Chennai\n" +
      "• **Categories:** Men's & Women's Singles (₹1,500), Doubles (₹2,000)\n" +
      "• **Sanctioned by:** Chennai Sports Council\n\n" +
      "Register at **[/events/chennai-badminton-2027](/events/chennai-badminton-2027)**."
    );
  }

  // 11. Generic fallback with context
  return (
    `I can help you with that! EventOS hosts marathons, cricket tournaments, cycling races, and campus fests across India.\n\n` +
    `Popular quick links:\n` +
    `• 🏃 **[Explore All Events](/explore)**\n` +
    `• ⚡ **[Live Race Hub](/live)**\n` +
    `• 🏆 **[Results & Timing](/results)**\n` +
    `• 🎟️ **[My Dashboard](/dashboard)**\n\n` +
    `Ask me about any sport, city, or event details!`
  );
}

export async function POST(req: NextRequest) {
  try {
    const { messages, userContext } = await req.json();
    const lastMessage = messages?.[messages.length - 1]?.content || "";

    const apiKey = process.env.GEMINI_API_KEY;
    const hasValidKey =
      apiKey &&
      apiKey !== "placeholder" &&
      apiKey.trim().length > 10 &&
      !apiKey.includes("your-");

    if (!hasValidKey) {
      const response = generateSmartFallback(lastMessage);
      return NextResponse.json({ response });
    }

    // Try calling Gemini API with graceful fallback on any error
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const history = (messages || []).slice(0, -1).map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      }));

      const chat = model.startChat({
        history: [
          { role: "user", parts: [{ text: SYSTEM_CONTEXT }] },
          {
            role: "model",
            parts: [
              {
                text: "Understood! I'm EventBot, ready to help EventOS users discover events, prepare for races, and manage their registrations.",
              },
            ],
          },
          ...history,
        ],
      });

      const contextualMessage = userContext
        ? `[User context: ${JSON.stringify(userContext)}]\n\n${lastMessage}`
        : lastMessage;

      const result = await chat.sendMessage(contextualMessage);
      const response = result.response.text();

      return NextResponse.json({ response });
    } catch (aiErr) {
      console.warn("Gemini API call failed, falling back to smart engine:", aiErr);
      const fallbackResponse = generateSmartFallback(lastMessage);
      return NextResponse.json({ response: fallbackResponse });
    }
  } catch (error) {
    console.error("AI chat route error:", error);
    return NextResponse.json({
      response:
        "I'm EventBot! I can help you discover events, prepare for races, and manage your registrations. What would you like to know? 🏃‍♂️",
    });
  }
}
