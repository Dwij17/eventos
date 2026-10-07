"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  MapPin,
  Clock,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  HelpCircle,
  FileText,
  DollarSign,
  Sparkles,
  Info,
  ShieldAlert,
} from "lucide-react";

interface CategoryInput {
  name: string;
  distance: string;
  price: number;
  capacity: number;
  bibPrefix: string;
}

interface CheckpointInput {
  name: string;
  distance: number;
  type: string;
}

export default function CreateEventWizardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 6;

  // Step 1: Basic Details
  const [basicInfo, setBasicInfo] = useState({
    title: "",
    slug: "",
    type: "RUNNING",
    shortDescription: "",
    description: "",
    coverImage: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=1200&q=80",
  });

  // Step 2: Dates & Deadlines
  const [schedule, setSchedule] = useState({
    startDate: "2027-04-10",
    startTime: "06:00",
    endDate: "2027-04-10",
    endTime: "14:00",
    regStart: "2027-01-01",
    regEnd: "2027-04-01",
  });

  // Step 3: Venue & Location
  const [location, setLocation] = useState({
    venueName: "",
    address: "",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
  });

  // Step 4: Categories / Tickets
  const [categories, setCategories] = useState<CategoryInput[]>([
    { name: "Full Marathon", distance: "42.2", price: 2500, capacity: 3000, bibPrefix: "FM" },
    { name: "Half Marathon", distance: "21.1", price: 1500, capacity: 5000, bibPrefix: "HM" },
    { name: "10K Timed Run", distance: "10.0", price: 800, capacity: 8000, bibPrefix: "10K" },
  ]);

  // Step 5: Checkpoints
  const [checkpoints, setCheckpoints] = useState<CheckpointInput[]>([
    { name: "Start Line / Timing Gate A", distance: 0, type: "START" },
    { name: "Marine Drive Timing Mat", distance: 10, type: "SPLIT" },
    { name: "Halfway Checkpoint", distance: 21.1, type: "SPLIT" },
    { name: "Azad Maidan Finish Arch", distance: 42.2, type: "FINISH" },
  ]);

  // Step 6: Rules & FAQs
  const [rules, setRules] = useState({
    minAge: "18",
    rulesText: "Runners must wear the assigned bib on their chest at all times.\nNo personal pacing bicycles allowed.\nOfficial cutoff time is 6 hours for the full marathon.",
    medicalRequirement: "Participants must present a valid medical fitness certificate.",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const handleTitleChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setBasicInfo((prev) => ({ ...prev, title: val, slug }));
  };

  const addCategory = () => {
    setCategories((prev) => [
      ...prev,
      { name: "New Category", distance: "5.0", price: 500, capacity: 1000, bibPrefix: "5K" },
    ]);
  };

  const removeCategory = (index: number) => {
    setCategories((prev) => prev.filter((_, i) => i !== index));
  };

  const addCheckpoint = () => {
    setCheckpoints((prev) => [
      ...prev,
      { name: "Checkpoint", distance: 5, type: "SPLIT" },
    ]);
  };

  const removeCheckpoint = (index: number) => {
    setCheckpoints((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setPublishSuccess(true);
  };

  const stepLabels = [
    "Event Info",
    "Schedule",
    "Venue",
    "Categories & Pricing",
    "Checkpoints",
    "Rules & Publish",
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
            Create New Event
          </h2>
          <p className="text-xs text-slate-600 dark:text-white/60">
            Configure your sports race, match, or festival in 6 simple steps
          </p>
        </div>
        <Link
          href="/organizer/events"
          className="text-xs font-semibold text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white"
        >
          Cancel & Exit
        </Link>
      </div>

      {/* Progress Steps Header */}
      <div className="rounded-2xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 p-4 shadow-sm">
        <div className="flex items-center justify-between overflow-x-auto gap-2">
          {stepLabels.map((lbl, idx) => {
            const stepNum = idx + 1;
            const isDone = currentStep > stepNum;
            const isCurrent = currentStep === stepNum;
            return (
              <div
                key={lbl}
                onClick={() => !publishSuccess && setCurrentStep(stepNum)}
                className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-xl whitespace-nowrap text-xs transition-colors ${
                  isCurrent
                    ? "bg-primary text-white font-bold"
                    : isDone
                    ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                    : "text-slate-600 dark:text-white/60"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isCurrent ? "bg-white text-primary" : isDone ? "bg-emerald-500/20" : "bg-slate-200 dark:bg-white/10"
                }`}>
                  {stepNum}
                </span>
                <span>{lbl}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Contents */}
      {!publishSuccess ? (
        <div className="rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-6 shadow-sm">
          {/* STEP 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Step 1: Event Essentials
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                  Event Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bangalore City Half Marathon 2027"
                  value={basicInfo.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                    Event Type / Sport *
                  </label>
                  <select
                    value={basicInfo.type}
                    onChange={(e) => setBasicInfo({ ...basicInfo, type: e.target.value })}
                    className="input-field"
                  >
                    <option value="RUNNING">Running / Marathon</option>
                    <option value="CRICKET">Cricket Tournament</option>
                    <option value="FOOTBALL">Football Championship</option>
                    <option value="FITNESS">Fitness / Cycling</option>
                    <option value="COLLEGE">College Fest</option>
                    <option value="ENTERTAINMENT">Entertainment</option>
                    <option value="OTHER">Other Sport</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    value={basicInfo.slug}
                    onChange={(e) => setBasicInfo({ ...basicInfo, slug: e.target.value })}
                    className="input-field font-mono"
                    placeholder="bangalore-city-half-marathon-2027"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                  Short Tagline
                </label>
                <input
                  type="text"
                  placeholder="Run through the Garden City's greenest parks and landmarks"
                  value={basicInfo.shortDescription}
                  onChange={(e) => setBasicInfo({ ...basicInfo, shortDescription: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                  Detailed Description (Markdown Supported)
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your event, route details, spectator zones, and what participants can expect..."
                  value={basicInfo.description}
                  onChange={(e) => setBasicInfo({ ...basicInfo, description: e.target.value })}
                  className="input-field resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Schedule */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Step 2: Dates, Timings & Registration Window
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                    Event Start Date *
                  </label>
                  <input
                    type="date"
                    value={schedule.startDate}
                    onChange={(e) => setSchedule({ ...schedule, startDate: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                    Start Wave Time *
                  </label>
                  <input
                    type="time"
                    value={schedule.startTime}
                    onChange={(e) => setSchedule({ ...schedule, startTime: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                    Registration Opens
                  </label>
                  <input
                    type="date"
                    value={schedule.regStart}
                    onChange={(e) => setSchedule({ ...schedule, regStart: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                    Registration Closes / Bib Freeze
                  </label>
                  <input
                    type="date"
                    value={schedule.regEnd}
                    onChange={(e) => setSchedule({ ...schedule, regEnd: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Venue */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Step 3: Venue & Location
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                    Venue / Stadium Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kanteerava Outdoor Stadium"
                    value={location.venueName}
                    onChange={(e) => setLocation({ ...location, venueName: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                    City *
                  </label>
                  <input
                    type="text"
                    value={location.city}
                    onChange={(e) => setLocation({ ...location, city: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                    Street Address / Assembly Point
                  </label>
                  <input
                    type="text"
                    placeholder="Kasturba Road, Sampangi Rama Nagar, Bengaluru"
                    value={location.address}
                    onChange={(e) => setLocation({ ...location, address: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Categories */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Step 4: Race Categories & Pricing Tiers
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-white/60">
                    Define entry tickets, distances, capacities, and custom bib prefixes.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addCategory}
                  className="btn-secondary text-xs px-3 py-1.5 border-slate-200 dark:border-white/10 flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  Add Category
                </button>
              </div>

              <div className="space-y-3">
                {categories.map((cat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-6 gap-3 items-end"
                  >
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-white/80 mb-1">
                        Category Name
                      </label>
                      <input
                        type="text"
                        value={cat.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCategories((prev) =>
                            prev.map((c, i) => (i === idx ? { ...c, name: val } : c))
                          );
                        }}
                        className="input-field text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-white/80 mb-1">
                        Distance (km)
                      </label>
                      <input
                        type="text"
                        value={cat.distance}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCategories((prev) =>
                            prev.map((c, i) => (i === idx ? { ...c, distance: val } : c))
                          );
                        }}
                        className="input-field text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-white/80 mb-1">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        value={cat.price}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setCategories((prev) =>
                            prev.map((c, i) => (i === idx ? { ...c, price: val } : c))
                          );
                        }}
                        className="input-field text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-white/80 mb-1">
                        Capacity
                      </label>
                      <input
                        type="number"
                        value={cat.capacity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setCategories((prev) =>
                            prev.map((c, i) => (i === idx ? { ...c, capacity: val } : c))
                          );
                        }}
                        className="input-field text-xs font-mono"
                      />
                    </div>

                    <div className="flex items-center justify-end pb-1">
                      {categories.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCategory(idx)}
                          className="p-2 rounded-lg text-red-500 hover:bg-red-500/10"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Checkpoints */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Step 5: Route Checkpoints & Timing Mats
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-white/60">
                    Set up RFID timing mats, split points, and medical aid hydration stops.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addCheckpoint}
                  className="btn-secondary text-xs px-3 py-1.5 border-slate-200 dark:border-white/10 flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  Add Point
                </button>
              </div>

              <div className="space-y-2.5">
                {checkpoints.map((cp, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={cp.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCheckpoints((prev) =>
                            prev.map((c, i) => (i === idx ? { ...c, name: val } : c))
                          );
                        }}
                        className="input-field text-xs flex-1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={cp.distance}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setCheckpoints((prev) =>
                            prev.map((c, i) => (i === idx ? { ...c, distance: val } : c))
                          );
                        }}
                        className="w-20 input-field text-xs font-mono"
                        placeholder="km"
                      />
                      <span className="text-xs text-slate-600 dark:text-white/60">km</span>
                      <button
                        type="button"
                        onClick={() => removeCheckpoint(idx)}
                        className="p-1.5 text-slate-600 hover:text-red-500"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: Rules & Final Review */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Step 6: Rules & Medical Guidelines
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                  Official Event Rules & Regulations
                </label>
                <textarea
                  rows={4}
                  value={rules.rulesText}
                  onChange={(e) => setRules({ ...rules, rulesText: e.target.value })}
                  className="input-field resize-none text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                  Medical & Safety Declaration
                </label>
                <textarea
                  rows={2}
                  value={rules.medicalRequirement}
                  onChange={(e) => setRules({ ...rules, medicalRequirement: e.target.value })}
                  className="input-field resize-none text-xs"
                />
              </div>

              {/* Ready to Publish Summary */}
              <div className="p-5 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-xs space-y-2">
                <span className="font-bold text-primary block">
                  🎉 Ready to Publish!
                </span>
                <p className="text-slate-700 dark:text-white/80">
                  Publishing will immediately make this event discoverable on the EventOS explore feed and enable real-time registrations and ticket check-ins.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              className={`px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-white flex items-center gap-1.5 ${
                currentStep === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-slate-100 dark:hover:bg-white/5"
              }`}
            >
              <ArrowLeft size={14} />
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
                className="btn-primary text-xs px-6 py-2.5 flex items-center gap-2"
              >
                Next Step
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handlePublish}
                className="btn-primary text-xs sm:text-sm px-8 py-3 flex items-center gap-2 shadow-lg shadow-primary/25"
              >
                {isSubmitting ? (
                  "Publishing Event..."
                ) : (
                  <>
                    <Sparkles size={16} />
                    Publish Live Event
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Publication Success Screen */
        <div className="rounded-3xl bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/10 p-8 text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle size={36} />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              Event Published Live!
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
              {basicInfo.title || "Bangalore City Half Marathon 2027"}
            </h2>
            <p className="text-xs text-slate-600 dark:text-white/60 max-w-md mx-auto">
              Your event is now live and accepting registrations across {categories.length} race categories.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              href="/organizer/events"
              className="btn-primary text-xs sm:text-sm px-6 py-3"
            >
              Go to Event Roster
            </Link>
            <Link
              href="/explore"
              target="_blank"
              className="px-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-semibold text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5"
            >
              View on Public Portal
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
