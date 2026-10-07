"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Heart,
  Shield,
  Save,
  CheckCircle2,
  AlertCircle,
  Activity,
} from "lucide-react";

import { useEffect } from "react";
import { getUserProfile, saveUserProfile, UserProfileData } from "@/lib/userStore";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "Not specified",
    city: "",
    state: "",
    country: "India",
    bloodGroup: "",
    tShirtSize: "M",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",
    medicalNotes: "",
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setProfile(getUserProfile());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveUserProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
          Participant Profile
        </h2>
        <p className="text-xs text-slate-600 dark:text-white/60">
          Manage your personal details, emergency contacts, and default sports gear sizes.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} />
          Profile updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details */}
        <div className="rounded-3xl bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-5 shadow-sm">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <User size={18} className="text-primary" />
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                disabled
                className="input-field opacity-60 cursor-not-allowed bg-slate-100 dark:bg-white/5"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={profile.dateOfBirth}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                Gender
              </label>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className="input-field"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary / Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location & Gear Details */}
        <div className="rounded-3xl bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-5 shadow-sm">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <MapPin size={18} className="text-primary" />
            Location & Gear Preferences
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                City
              </label>
              <input
                type="text"
                name="city"
                value={profile.city}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                State
              </label>
              <input
                type="text"
                name="state"
                value={profile.state}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                T-Shirt Size (Standard)
              </label>
              <select
                name="tShirtSize"
                value={profile.tShirtSize}
                onChange={handleChange}
                className="input-field"
              >
                <option value="S">Small (S)</option>
                <option value="M">Medium (M)</option>
                <option value="L">Large (L)</option>
                <option value="XL">Extra Large (XL)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Safety & Medical Card */}
        <div className="rounded-3xl bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-5 shadow-sm">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Heart size={18} className="text-rose-500" />
            Medical & Emergency Safety Card
          </h3>
          <p className="text-xs text-slate-600 dark:text-white/60">
            This information is used by event medics in case of emergencies on race routes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={profile.bloodGroup}
                onChange={handleChange}
                className="input-field"
              >
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                Emergency Contact Name
              </label>
              <input
                type="text"
                name="emergencyName"
                value={profile.emergencyName}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
                Emergency Contact Phone
              </label>
              <input
                type="tel"
                name="emergencyPhone"
                value={profile.emergencyPhone}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-white/80 mb-1.5">
              Medical Notes / Allergies
            </label>
            <textarea
              name="medicalNotes"
              value={profile.medicalNotes}
              onChange={handleChange}
              rows={2}
              className="input-field resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="btn-primary text-xs sm:text-sm px-6 py-3 flex items-center gap-2"
          >
            <Save size={16} />
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
}
