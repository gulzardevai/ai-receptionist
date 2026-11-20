"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";
import { PhoneCall, Sparkles, LayoutDashboard, Settings, ShieldCheck, DollarSign, LogOut, User as UserIcon, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

function NavItems({ user }: { user: any }) {
  const pathname = usePathname();
  const router = useRouter();

  // All contractor tabs shown in Navbar (Settings is in profile dropdown, Admin is excluded)
  const navLinks = [
    { name: "Pricing", href: "/pricing", icon: DollarSign, isPublic: true },
    { name: "Setup Wizard", href: "/wizard", icon: Sparkles, isPublic: false },
    { name: "Go Live", href: "/go-live", icon: ShieldCheck, isPublic: false },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, isPublic: false },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isPublic: boolean) => {
    // If not public and user is not signed in, redirect directly to login
    if (!isPublic && !user) {
      e.preventDefault();
      router.push(`/login?next=${encodeURIComponent(href)}`);
    }
  };

  return (
    <nav className="hidden md:flex items-center gap-1">
      {navLinks.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href, link.isPublic)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              isActive
                ? "bg-slate-100 text-slate-900 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Icon className="h-3.5 w-3.5 text-slate-500" />
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth state changes (login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setMenuOpen(false);
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-2.5 z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-300">
      <div className="flex w-full items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl border border-slate-300/80 bg-slate-100/90 backdrop-blur-md shadow-md shadow-slate-300/40 hover:shadow-lg hover:border-slate-400/80 transition-all duration-200">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8.5 w-8.5 items-center justify-center rounded-lg bg-slate-900 text-white shadow-xs group-hover:scale-105 transition-transform p-1.5">
            <PhoneCall className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-black tracking-tight text-slate-950">
              CatchCall AI
            </span>
            <span className="rounded border border-slate-300 bg-white/90 px-1.5 py-0.5 text-[10px] font-bold text-slate-700 shadow-2xs">
              Voice SaaS
            </span>
          </div>
        </Link>

        <Suspense fallback={<div className="hidden md:flex w-72" />}>
          <NavItems user={user} />
        </Suspense>

        <div className="flex items-center gap-2.5">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full sm:rounded-xl border border-slate-300/80 bg-white/90 hover:bg-white text-slate-800 shadow-2xs transition hover:shadow-xs focus:outline-none"
                aria-label="User Profile Menu"
              >
                <div className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white shadow-xs">
                  {userInitial}
                </div>
                <span className="hidden sm:inline-block text-xs font-semibold text-slate-800 max-w-[120px] truncate">
                  {displayName}
                </span>
                <ChevronDown className={`h-3.5 w-3.5 text-slate-500 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-60 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2.5 bg-slate-50 rounded-xl mb-1.5 border border-slate-100">
                    <p className="text-xs font-bold text-slate-950 truncate">{displayName}</p>
                    <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">{user.email}</p>
                  </div>

                  <Link
                    href="/settings"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
                  >
                    <Settings className="h-4 w-4 text-slate-500" />
                    <span>Account & Settings</span>
                  </Link>

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition text-left"
                  >
                    <LogOut className="h-4 w-4 text-red-500" />
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition"
              >
                Start Free Setup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
