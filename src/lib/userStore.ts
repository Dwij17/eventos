export interface UserRegistration {
  id: string;
  eventId: string;
  eventSlug: string;
  eventTitle: string;
  eventType: string;
  eventCity: string;
  coverImage: string;
  categoryName: string;
  distance?: number | null;
  registrationNo: string;
  bibNumber: string;
  status: "CONFIRMED" | "PENDING" | "CANCELLED";
  paymentStatus: "PAID" | "FREE" | "PENDING";
  amountPaid: number;
  tShirtSize: string;
  date: string;
  time: string;
  venue: string;
  participantName: string;
  participantEmail: string;
  emergencyContact?: string;
  createdAt: string;
}

export interface UserCertificate {
  id: string;
  eventName: string;
  category: string;
  date: string;
  finishTime: string;
  pace: string;
  overallRank: number;
  totalParticipants: number;
  categoryRank: number;
  certificateNo: string;
}

export interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  city: string;
  state: string;
  country: string;
  bloodGroup: string;
  tShirtSize: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  medicalNotes: string;
}

const REGISTRATIONS_KEY = "eventos_user_registrations";
const PROFILE_KEY = "eventos_user_profile";
const CERTIFICATES_KEY = "eventos_user_certificates";

export function getUserRegistrations(): UserRegistration[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(REGISTRATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUserRegistration(reg: UserRegistration): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getUserRegistrations();
    const updated = [reg, ...existing.filter((r) => r.id !== reg.id)];
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("eventos_storage_updated"));
  } catch (err) {
    console.error("Failed to save registration:", err);
  }
}

export function getUserCertificates(): UserCertificate[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CERTIFICATES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUserCertificate(cert: UserCertificate): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getUserCertificates();
    const updated = [cert, ...existing.filter((c) => c.id !== cert.id)];
    localStorage.setItem(CERTIFICATES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("eventos_storage_updated"));
  } catch (err) {
    console.error("Failed to save certificate:", err);
  }
}

export function getUserProfile(): UserProfileData {
  const defaultProfile: UserProfileData = {
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
  };

  if (typeof window === "undefined") return defaultProfile;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? { ...defaultProfile, ...JSON.parse(raw) } : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

export function saveUserProfile(profile: Partial<UserProfileData>): void {
  if (typeof window === "undefined") return;
  try {
    const current = getUserProfile();
    const updated = { ...current, ...profile };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("eventos_storage_updated"));
  } catch (err) {
    console.error("Failed to save profile:", err);
  }
}
