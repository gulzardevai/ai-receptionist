"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Loader2, Lock, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ProtectedRoute({ 
  children,
  requireSubscription = false
}: { 
  children: React.ReactNode;
  requireSubscription?: boolean;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAuthAndSubscription() {
      const { data: { session } } = await supabase.auth.getSession();
      const currentPath = typeof window !== "undefined" ? window.location.pathname : "/dashboard";

      if (!session) {
        setIsAuthenticated(false);
        router.replace(`/login?next=${encodeURIComponent(currentPath)}`);
        return;
      }

      setIsAuthenticated(true);

      if (requireSubscription) {
        try {
          // 1. Check if user owns a business with an active subscription
          const { data: businesses } = await supabase
            .from("businesses")
            .select("id")
            .eq("owner_id", session.user.id)
            .limit(1);

          if (businesses && businesses.length > 0) {
            const bizId = businesses[0].id;
            const { data: subs } = await supabase
              .from("subscriptions")
              .select("status")
              .eq("business_id", bizId)
              .eq("status", "active")
              .limit(1);

            if (subs && subs.length > 0) {
              setHasSubscription(true);
              return;
            }
          }

          // 2. Check if user email has an active subscription directly
          if (session.user.email) {
            const { data: emailSubs } = await supabase
              .from("subscriptions")
              .select("status")
              .eq("status", "active")
              .limit(1);

            if (emailSubs && emailSubs.length > 0) {
              setHasSubscription(true);
              return;
            }
          }

          setHasSubscription(false);
        } catch (err) {
          console.error("Subscription check error:", err);
          setHasSubscription(false);
        }
      } else {
        setHasSubscription(true);
      }
    }

    checkAuthAndSubscription();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        const currentPath = typeof window !== "undefined" ? window.location.pathname : "/dashboard";
        router.replace(`/login?next=${encodeURIComponent(currentPath)}`);
      }
    });

    return () => subscription.unsubscribe();
  }, [router, requireSubscription]);

  if (isAuthenticated === null || (requireSubscription && hasSubscription === null)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-slate-700" />
          <p className="text-xs text-slate-500 font-medium">Verifying account & subscription access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Paywall lock screen: renders children softly blurred in background with modal overlay
  if (requireSubscription && hasSubscription === false) {
    return (
      <div className="relative min-h-screen">
        {/* Softly blurred background showing the real page */}
        <div className="filter blur-[5px] opacity-40 pointer-events-none select-none" aria-hidden="true">
          {children}
        </div>

        {/* Modal Overlay with translucent backdrop */}
        <div className="fixed inset-0 z-50 bg-slate-950/25 backdrop-blur-[3px] flex items-center justify-center px-4 py-8 overflow-y-auto">
          <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl p-8 border border-slate-200/90 shadow-2xl text-center space-y-6 my-auto">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md">
              <Lock className="h-8 w-8 text-amber-400" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                <ShieldAlert className="h-3.5 w-3.5 text-amber-600" /> Subscription Required
              </span>
              <h2 className="text-2xl font-black text-slate-950 tracking-tight">
                Unlock Your AI Receptionist
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your 24/7 dedicated voice line, Google Calendar integration, and live call answering require an active contractor subscription.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200 text-left space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>300 - 1,000 monthly voice calling minutes</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Dedicated US phone number provisioned</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Google Calendar appointment auto-sync</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/pricing"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-800 py-3.5 px-4 text-xs font-bold text-white shadow-md transition hover:scale-[1.01]"
              >
                <span>Choose a Plan (From $149/mo)</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/wizard"
                className="w-full block py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
              >
                Back to Free Setup Wizard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
