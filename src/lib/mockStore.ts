import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export interface MockUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  role: "PARTICIPANT" | "ORGANIZER" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED" | "DEACTIVATED";
  avatar: string | null;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

// Default initial demo users
const DEFAULT_USERS: MockUser[] = [
  {
    id: "usr_admin_1",
    email: "admin@eventos.com",
    firstName: "Alex",
    lastName: "Vance",
    passwordHash: bcrypt.hashSync("Admin@12345", 10),
    role: "ADMIN",
    status: "ACTIVE",
    avatar: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "usr_org_1",
    email: "organizer@eventos.com",
    firstName: "Rohan",
    lastName: "Mehta",
    passwordHash: bcrypt.hashSync("Organizer@12345", 10),
    role: "ORGANIZER",
    status: "ACTIVE",
    avatar: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "usr_user_1",
    email: "participant@eventos.com",
    firstName: "Priya",
    lastName: "Sharma",
    passwordHash: bcrypt.hashSync("Participant@12345", 10),
    role: "PARTICIPANT",
    status: "ACTIVE",
    avatar: null,
    createdAt: new Date().toISOString(),
  },
];

function ensureFileExists(): MockUser[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify(DEFAULT_USERS, null, 2), "utf-8");
      return DEFAULT_USERS;
    }
    const raw = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return DEFAULT_USERS;
  }
}

function saveUsers(users: MockUser[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save mock users to file:", err);
  }
}

export const mockUserStore = {
  findUniqueByEmail(email: string): MockUser | null {
    const users = ensureFileExists();
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  create(user: Omit<MockUser, "id" | "createdAt" | "status" | "avatar"> & { avatar?: string | null }): MockUser {
    const users = ensureFileExists();
    const newUser: MockUser = {
      ...user,
      id: `usr_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`,
      status: "ACTIVE",
      avatar: user.avatar || null,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    saveUsers(users);
    return newUser;
  },

  getAll(): MockUser[] {
    return ensureFileExists();
  },
};
