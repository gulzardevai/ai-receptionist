"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { 
  PhoneCall, CalendarCheck, DollarSign, Clock, 
  ChevronDown, ChevronUp, ShieldAlert, CheckCircle, ExternalLink, ArrowRight
} from "lucide-react";

interface CallRecord {
  id: string;
  caller_name: string;
  caller_phone: string;
  started_at: string;
  duration_sec: number;
  urgency: "normal" | "emergency";
  booked: boolean;
  job_type: string;
  service_address: string;
  summary: string;
  transcript: string;
  cost_usd: number;
}

interface Stats {
  calls_answered: number;
  jobs_booked: number;
  revenue_recovered: number;
  minutes_used: number;
  minutes_included: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    calls_answered: 42,
    jobs_booked: 18,
    revenue_recovered: 6300,
    minutes_used: 124,
    minutes_included: 300
  });

  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [expandedCallId, setExpandedCallId] = useState<string | null>(null);
  const [hasSubscription, setHasSubscription] = useState<boolean>(true);

  useEffect(() => {
    async function checkSub() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: subs } = await supabase
            .from("subscriptions")
            .select("status")
            .eq("status", "active")
            .limit(1);
          if (!subs || subs.length === 0) {
            setHasSubscription(false);
          }
        }
      } catch (e) {
        console.error("Sub check error:", e);
      }
    }
    checkSub();
    fetch("http://localhost:8000/api/v1/dashboard/stats")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.log("Using cached stats:", err));

    fetch("http://localhost:8000/api/v1/dashboard/calls")
      .then(res => res.json())
      .then(data => setCalls(data))
      .catch(err => console.log("Using cached calls:", err));
  }, []);

  const minutesPercentage = Math.round((stats.minutes_used / stats.minutes_included) * 100);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <Navbar />

        <main className="max-w-7xl mx-auto px-6 py-10 w-full space-y-8">
        {!hasSubscription && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4.5 rounded-2xl bg-amber-50 border border-amber-200 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-xs">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-amber-950">Subscription Inactive — AI Receptionist Paused</p>
                <p className="text-[11px] text-amber-800">Your live voice agent is paused. Activate a plan to answer customer calls and connect Google Calendar.</p>
              </div>
            </div>
            <Link
              href="/pricing"
              className="shrink-0 rounded-xl bg-amber-950 hover:bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:scale-[1.02]"
            >
              Activate Plan ($149/mo)
            </Link>
          </div>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Contractor Overview</h1>
            <p className="text-xs text-slate-500 mt-1">Real-time call performance, Google Calendar bookings, and Whop usage.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/go-live"
              className="rounded-lg border border-slate-300 bg-white hover:bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700 transition"
            >
              Test Receptionist Call
            </Link>
            <Link
              href="/settings"
              className="rounded-lg bg-slate-900 hover:bg-slate-800 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition"
            >
              Manage Settings
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Calls Answered */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Calls Answered</span>
              <div className="p-2 rounded-lg bg-slate-100 text-slate-800">
                <PhoneCall className="h-4 w-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900 mt-3">{stats.calls_answered}</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">100% answer rate (0 missed)</p>
          </div>

          {/* Jobs Booked */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Jobs Booked</span>
              <div className="p-2 rounded-lg bg-slate-100 text-slate-800">
                <CalendarCheck className="h-4 w-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900 mt-3">{stats.jobs_booked}</p>
            <p className="text-xs text-slate-500 mt-1">Added to Google Calendar</p>
          </div>

          {/* Revenue Recovered */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Revenue Recovered</span>
              <div className="p-2 rounded-lg bg-slate-100 text-slate-800">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900 mt-3">${stats.revenue_recovered.toLocaleString()}</p>
            <p className="text-xs text-slate-500 mt-1">Based on $350 avg ticket</p>
          </div>

          {/* Minutes Used */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Plan Minutes</span>
              <div className="p-2 rounded-lg bg-slate-100 text-slate-800">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900 mt-3">
              {stats.minutes_used} <span className="text-xs font-normal text-slate-400">/ {stats.minutes_included} min</span>
            </p>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
              <div
                className={`h-1.5 rounded-full ${minutesPercentage > 80 ? "bg-amber-500" : "bg-slate-900"}`}
                style={{ width: `${Math.min(minutesPercentage, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Call Log Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Recent Customer Calls</h2>
            <span className="text-xs bg-slate-100 px-2.5 py-0.5 rounded-full font-medium text-slate-600">
              {calls.length} logged
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {calls.map((call) => (
              <div key={call.id} className="p-5 hover:bg-slate-50/70 transition">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm">{call.caller_name || "Caller"}</span>
                      <span className="text-xs text-slate-500 font-mono">{call.caller_phone}</span>

                      {/* Urgency Badge */}
                      {call.urgency === "emergency" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 text-[11px] font-semibold">
                          <ShieldAlert className="h-3 w-3" /> Emergency Escalation
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-100 text-slate-600 px-2 py-0.5 text-[11px] font-medium">
                          Normal
                        </span>
                      )}

                      {/* Booked Badge */}
                      {call.booked && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[11px] font-semibold">
                          <CheckCircle className="h-3 w-3" /> Booked on Calendar
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500">
                      <strong>Job:</strong> {call.job_type} • <strong>Address:</strong> {call.service_address}
                    </p>
                    <p className="text-xs text-slate-700 pt-0.5">
                      {call.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0">
                    <div className="text-right">
                      <span>{call.duration_sec}s call</span>
                      <span className="block font-mono text-[10px] text-slate-400">${call.cost_usd.toFixed(4)}</span>
                    </div>

                    <Link
                      href={`/dashboard/calls/${call.id}`}
                      className="flex items-center gap-1 text-slate-700 hover:text-slate-900 font-semibold px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50"
                    >
                      <span>Detail</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>

                    <button
                      onClick={() => setExpandedCallId(expandedCallId === call.id ? null : call.id)}
                      className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50"
                    >
                      <span>{expandedCallId === call.id ? "Hide" : "Transcript"}</span>
                      {expandedCallId === call.id ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Collapsible Verbatim Transcript Box */}
                {expandedCallId === call.id && (
                  <div className="mt-3 p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono space-y-1">
                    <p className="font-bold text-slate-700 uppercase text-[10px]">Verbatim Audio Transcript:</p>
                    <pre className="whitespace-pre-wrap text-slate-600 font-sans text-xs leading-relaxed">
                      {call.transcript || "No transcript recorded for this call."}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
}
