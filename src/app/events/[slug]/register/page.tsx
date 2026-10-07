"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Calendar,
  MapPin,
  Clock,
  Tag,
  CreditCard,
  QrCode,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { demoEvents } from "@/lib/demoData";
import { saveUserRegistration, saveUserProfile } from "@/lib/userStore";

interface RegisterPageProps {
  params: Promise<{ slug: string }>;
}

export default function EventRegistrationPage({ params }: RegisterPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();

  // Find event by slug or fall back to first demo event
  const event =
    demoEvents.find((e) => e.slug === resolvedParams.slug) || demoEvents[0];

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedCategory, setSelectedCategory] = useState(
    event.categories[0]?.id || ""
  );

  // Form State
  const [formData, setFormData] = useState({
    firstName: "Priya",
    lastName: "Sharma",
    email: "participant@eventos.com",
    phone: "+91 98765 43210",
    gender: "Female",
    dateOfBirth: "1996-05-14",
    bloodGroup: "O+",
    emergencyName: "Rajesh Sharma",
    emergencyPhone: "+91 98765 43211",
    tShirtSize: "M",
    termsAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReg, setConfirmedReg] = useState<{
    registrationNo: string;
    bibNumber: string;
    categoryName: string;
    amount: number;
  } | null>(null);

  const activeCat =
    event.categories.find((c) => c.id === selectedCategory) ||
    event.categories[0];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCompleteRegistration = async () => {
    setIsSubmitting(true);
    // Simulate payment / registration creation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const regNo = `EVT-2027-${Date.now().toString(36).toUpperCase()}`;
    const bibNo = `${activeCat.name.substring(0, 2).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const newReg = {
      id: `reg-${Date.now()}`,
      eventId: event.id,
      eventSlug: event.slug,
      eventTitle: event.title,
      eventType: event.type,
      eventCity: event.city,
      coverImage: event.coverImage,
      categoryName: activeCat.name,
      distance: activeCat.distance || null,
      registrationNo: regNo,
      bibNumber: bibNo,
      status: "CONFIRMED" as const,
      paymentStatus: activeCat.price > 0 ? ("PAID" as const) : ("FREE" as const),
      amountPaid: activeCat.price,
      tShirtSize: formData.tShirtSize,
      date: new Date(event.startDate).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      time: new Date(event.startDate).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      venue: `${event.venueName}, ${event.city}`,
      participantName: `${formData.firstName} ${formData.lastName}`.trim(),
      participantEmail: formData.email,
      emergencyContact: `${formData.emergencyName} (${formData.emergencyPhone})`,
      createdAt: new Date().toISOString(),
    };

    saveUserRegistration(newReg);
    saveUserProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      bloodGroup: formData.bloodGroup,
      tShirtSize: formData.tShirtSize,
      emergencyName: formData.emergencyName,
      emergencyPhone: formData.emergencyPhone,
    });

    setConfirmedReg({
      registrationNo: regNo,
      bibNumber: bibNo,
      categoryName: activeCat.name,
      amount: activeCat.price,
    });
    setIsSubmitting(false);
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08080c] py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link & Event Pill */}
        <div className="flex items-center justify-between">
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-white/60 hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Event Overview
          </Link>
          <span className="badge-primary text-xs px-3 py-1 font-medium">
            {event.type}
          </span>
        </div>

        {/* Header Event Summary Card */}
        <div className="rounded-3xl bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-white/10 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-200 dark:border-white/10">
              <Image
                src={event.coverImage}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
                {event.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-600 dark:text-white/60">
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-primary" />
                  {event.city}, {event.venueName}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} className="text-primary" />
                  {new Date(event.startDate).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="sm:text-right">
            <span className="text-[11px] text-slate-600 dark:text-white/60 block">Organizer</span>
            <span className="text-xs font-semibold text-slate-900 dark:text-white">
              {event.organizer.orgName}
            </span>
          </div>
        </div>

        {/* Step Progress Bar */}
        {step < 4 && (
          <div className="flex items-center justify-between px-2">
            {[
              { num: 1, label: "Category" },
              { num: 2, label: "Runner Details" },
              { num: 3, label: "Payment & Review" },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= s.num
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-white/60"
                  }`}
                >
                  {s.num}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:inline ${
                    step >= s.num
                      ? "text-slate-900 dark:text-white font-semibold"
                      : "text-slate-600 dark:text-white/60"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Step 1: Category Selection */}
        {step === 1 && (
          <div className="rounded-3xl bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
                Step 1: Choose Your Race Category
              </h2>
              <p className="text-xs text-slate-600 dark:text-white/60 mt-1">
                Select your preferred distance or division for this event.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {event.categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`cursor-pointer rounded-2xl p-5 border transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-md shadow-primary/10 ring-1 ring-primary"
                        : "border-slate-200 dark:border-white/10 hover:border-primary/40 bg-white dark:bg-white/5"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-base text-slate-900 dark:text-white">
                          {cat.name}
                        </h3>
                        {cat.distance && (
                          <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white">
                            {cat.distance} km
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-primary font-[family-name:var(--font-display)]">
                          {cat.price === 0
                            ? "FREE"
                            : `₹${cat.price.toLocaleString("en-IN")}`}
                        </span>
                        <span className="block text-[10px] text-slate-600 dark:text-white/60">
                          per ticket
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-600 dark:text-white/60">
                      <span>Available Slots</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {cat.capacity
                          ? `${cat.capacity - cat.registeredCount} spots left`
                          : "Open"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="btn-primary text-xs sm:text-sm px-6 py-3 flex items-center gap-2"
              >
                Continue to Runner Details
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Runner Details & Medical */}
        {step === 2 && (
          <div className="rounded-3xl bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
                Step 2: Participant & Safety Information
              </h2>
              <p className="text-xs text-slate-600 dark:text-white/60 mt-1">
                This info is printed on your race bib and used for on-course medical safety.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary / Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                  Blood Group (Medical Card) *
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                  Official Finisher T-Shirt Size *
                </label>
                <select
                  name="tShirtSize"
                  value={formData.tShirtSize}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="S">Small (S) - 38"</option>
                  <option value="M">Medium (M) - 40"</option>
                  <option value="L">Large (L) - 42"</option>
                  <option value="XL">Extra Large (XL) - 44"</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                  Emergency Contact Name *
                </label>
                <input
                  type="text"
                  name="emergencyName"
                  value={formData.emergencyName}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                  Emergency Contact Phone *
                </label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-white"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="btn-primary text-xs sm:text-sm px-6 py-3 flex items-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment & Review */}
        {step === 3 && (
          <div className="rounded-3xl bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
                Step 3: Review & Payment
              </h2>
              <p className="text-xs text-slate-600 dark:text-white/60 mt-1">
                Test mode enabled — no real charge will be incurred.
              </p>
            </div>

            {/* Order Summary */}
            <div className="rounded-2xl bg-slate-50 dark:bg-white/5 p-5 border border-slate-200 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-800 dark:text-white">
                  {event.title} — {activeCat.name}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  ₹{activeCat.price.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-white/60">
                <span>Timing Chip & Bib Kit</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Included</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-white/60">
                <span>Finisher Medal & Digital Certificate</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Included</span>
              </div>
              <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-base font-bold text-slate-900 dark:text-white">
                <span>Total Amount</span>
                <span className="text-primary font-[family-name:var(--font-display)] text-lg">
                  ₹{activeCat.price.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary"
              />
              <label htmlFor="termsAccepted" className="text-xs text-slate-600 dark:text-white/70">
                I declare that I am physically fit to participate in this event and agree to the event rules, medical waiver, and terms & conditions.
              </label>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-white"
              >
                Back
              </button>
              <button
                disabled={!formData.termsAccepted || isSubmitting}
                onClick={handleCompleteRegistration}
                className={`btn-primary text-xs sm:text-sm px-8 py-3.5 flex items-center gap-2 ${
                  !formData.termsAccepted || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard size={16} />
                    Confirm & Complete Registration
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success Screen & Instant Ticket Pass */}
        {step === 4 && confirmedReg && (
          <div className="rounded-3xl bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-white/10 p-8 text-center space-y-6 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle size={36} />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                Registration Confirmed!
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
                You're in for {event.title}!
              </h2>
              <p className="text-xs text-slate-600 dark:text-white/60 max-w-md mx-auto">
                A confirmation email with your digital pass and race packet instructions has been sent to <span className="font-semibold text-slate-800 dark:text-white">{formData.email}</span>.
              </p>
            </div>

            {/* Bib Badge Card */}
            <div className="max-w-sm mx-auto p-6 rounded-2xl bg-gradient-to-br from-secondary to-slate-900 text-white border border-white/10 shadow-lg space-y-3">
              <span className="text-[11px] text-white/50 uppercase tracking-widest block font-semibold">
                Assigned Race Bib
              </span>
              <div className="text-4xl font-mono font-black text-primary tracking-tight">
                {confirmedReg.bibNumber}
              </div>
              <div className="pt-2 border-t border-white/10 text-xs text-white/70">
                Category: <span className="text-white font-semibold">{confirmedReg.categoryName}</span>
              </div>
              <div className="text-[11px] font-mono text-white/40">
                Ref: {confirmedReg.registrationNo}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                href="/dashboard/tickets"
                className="w-full sm:w-auto btn-primary text-xs sm:text-sm px-6 py-3 flex items-center justify-center gap-2"
              >
                <QrCode size={16} />
                View Digital Ticket in Dashboard
              </Link>
              <Link
                href={`/events/${event.slug}`}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-semibold text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5"
              >
                Back to Event Details
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
