"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { CheckCircle2, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (plan: string) => {
    setLoadingPlan(plan);
    try {
      const res = await fetch(`http://localhost:8000/api/v1/settings/whop-checkout?plan=${plan}`);
      if (res.ok) {
        const data = await res.json();
        if (data.checkout_url) {
          window.location.href = data.checkout_url;
          return;
        }
      }
      window.location.href = `/wizard?plan=${plan}`;
    } catch (err) {
      window.location.href = `/wizard?plan=${plan}`;
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-16 w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 bg-slate-200/80 px-3 py-1 rounded-full">
            Subscription Plans
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Select Your Receptionist Plan
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Activate self-serve in minutes. Cancel or upgrade anytime with zero hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Starter Plan */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">Starter Plan</h3>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">Single Van</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">Essential 24/7 call answering and Google Calendar booking.</p>
              
              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-extrabold text-slate-900">$149</span>
                <span className="ml-1.5 text-xs text-slate-500">/ month</span>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-6">
                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span><strong>300 minutes</strong> included per month</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Dedicated local phone number</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Google Calendar two-way slot sync</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Emergency keyword transfer to technician</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Instant email alerts with transcripts</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => handleCheckout("starter")}
              disabled={loadingPlan !== null}
              className="mt-8 w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 text-xs font-semibold transition"
            >
              {loadingPlan === "starter" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <span>Subscribe to Starter</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

          {/* Pro Plan */}
          <div className="relative rounded-2xl border-2 border-slate-900 bg-white p-8 shadow-md flex flex-col justify-between">
            <div className="absolute -top-3 right-6 rounded-full bg-slate-900 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              Recommended
            </div>

            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">Pro Plan</h3>
                <span className="rounded-full bg-slate-900 text-white px-2.5 py-0.5 text-xs font-semibold">Multi-Crew</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">For high-call volume businesses and multi-truck fleets.</p>
              
              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-extrabold text-slate-900">$299</span>
                <span className="ml-1.5 text-xs text-slate-500">/ month</span>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-6">
                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span><strong>1,000 minutes</strong> included per month</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Multi-technician calendar scheduling</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Priority low-latency speech model</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Monthly automated performance reports</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Priority on-call escalation rules</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => handleCheckout("pro")}
              disabled={loadingPlan !== null}
              className="mt-8 w-full flex items-center justify-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white py-3 text-xs font-semibold shadow-sm transition"
            >
              {loadingPlan === "pro" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <span>Subscribe to Pro</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="h-4 w-4 text-slate-400" />
          <span>Payments processed securely. 256-bit SSL encryption.</span>
        </div>
      </main>
    </div>
  );
}
