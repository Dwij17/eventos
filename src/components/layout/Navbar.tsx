"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
  Calendar,
  Settings,
  Bell,
  Search,
  Zap,
} from "lucide-react";

interface NavbarProps {
  user?: {
    firstName: string;
    lastName: string;
    role: string;
    avatar?: string | null;
  } | null;
}

const publicLinks = [
  { href: "/explore", label: "Explore Events" },
  { href: "/live", label: "Live Hub", badge: true },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/tickets", label: "My Tickets" },
  { href: "/organizer", label: "Organizer Hub" },
];

export default function Navbar({ user }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const isTransparent = isHome && !isScrolled;

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isTransparent
            ? "bg-transparent"
            : "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
        )}
      >
        <div className="container-main">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
                <span className="text-white font-bold text-sm font-[family-name:var(--font-display)]">
                  E
                </span>
              </div>
              <span
                className={cn(
                  "text-xl font-bold font-[family-name:var(--font-display)] tracking-tight transition-colors",
                  isTransparent ? "text-white" : "text-foreground"
                )}
              >
                Event<span className="text-primary">OS</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {publicLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-primary bg-primary/10"
                      : isTransparent
                        ? "text-white/80 hover:text-white hover:bg-white/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.badge && <Zap size={13} className="text-emerald-400" />}
                  {link.label}
                  {link.badge && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/explore"
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isTransparent
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Search size={18} />
              </Link>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-full transition-all",
                      isTransparent
                        ? "text-white hover:bg-white/10 border border-white/20"
                        : "text-foreground hover:bg-muted border border-border"
                    )}
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-white text-xs font-semibold">
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </div>
                    <span className="text-sm font-medium">
                      {user.firstName}
                    </span>
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform",
                        isProfileOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {isProfileOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsProfileOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-card rounded-xl border border-border shadow-xl z-50 overflow-hidden animate-scale-in">
                        <div className="px-4 py-3 border-b border-border">
                          <p className="text-sm font-semibold">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {user.role.toLowerCase()}
                          </p>
                        </div>
                        <div className="py-1">
                          {user.role === "ORGANIZER" && (
                            <Link
                              href="/organizer"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                            >
                              <LayoutDashboard size={16} />
                              Organizer Dashboard
                            </Link>
                          )}
                          {user.role === "ADMIN" && (
                            <Link
                              href="/admin"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                            >
                              <Settings size={16} />
                              Admin Panel
                            </Link>
                          )}
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                          >
                            <Calendar size={16} />
                            My Events
                          </Link>
                          <Link
                            href="/dashboard/profile"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                          >
                            <User size={16} />
                            Profile
                          </Link>
                          <Link
                            href="/dashboard/notifications"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                          >
                            <Bell size={16} />
                            Notifications
                          </Link>
                        </div>
                        <div className="border-t border-border py-1">
                          <button
                            onClick={() => {
                              // Sign out logic
                              window.location.href = "/api/auth/signout";
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors w-full text-left"
                          >
                            <LogOut size={16} />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      isTransparent
                        ? "text-white hover:bg-white/10"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    Sign In
                  </Link>
                  <Link href="/register" className="btn-primary text-sm">
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors",
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-foreground hover:bg-muted"
              )}
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="lg:hidden bg-card border-t border-border animate-fade-in-down">
            <div className="container-main py-4 space-y-1">
              {publicLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border mt-3">
                {user ? (
                  <>
                    <div className="px-4 py-2 mb-2">
                      <p className="text-sm font-semibold">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {user.role.toLowerCase()}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted"
                    >
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <div className="flex gap-2 px-4">
                    <Link
                      href="/login"
                      className="btn-secondary flex-1 text-center text-sm"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="btn-primary flex-1 text-center text-sm"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer when not transparent */}
      {!isHome && <div className="h-16 lg:h-18" />}
    </>
  );
}
