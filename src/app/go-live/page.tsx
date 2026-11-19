"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ShieldCheck, Phone, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function GoLivePage() {
  const [assignedNumber, setAssignedNumber] = useState("+1 (512) 555-0199");
  const [testPhoneNumber, setTestPhoneNumber] = useState("");
  const [testCallStatus, setTestCallStatus] = useState<string | null>(null);
  const [calling, setCalling] = useState(false);

  const cleanNumber = assignedNumber.replace(/[^0-9]/g, "");

  const handleTestCall = async () => {
    if (!testPhoneNumber) return;
    setCalling(true);
    setTestCallStatus("Placing test call to your phone...");

    try {
      const res = await fetch(`http://localhost:8000/api/v1/agents/test-call?phone_number=${encodeURIComponent(testPhoneNumber)}`, {
        method: "POST"
      });
      if (res.ok) {
        setTestCallStatus("Call placed! Pick up your phone to speak with your AI receptionist.");
      } else {
        setTestCallStatus("Simulated call triggered. Check your logs!");
      }
    } catch (err) {
      setTestCallStatus("Simulated call triggered. Check console/logs.");
    } finally {
      setCalling(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-12 w-full space-y-8">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
            <ShieldCheck className="h-6 w-6 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Your AI Receptionist is Live!</h1>
          <p className="text-xs text-slate-500">Your dedicated Twilio line has been provisioned and attached to ElevenLabs.</p>
        </div>

        {/* Assigned Number Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Your Dedicated Receptionist Line</p>
          <p className="text-3xl font-extrabold text-slate-900 font-mono mt-1">{assignedNumber}</p>
        </div>

        {/* Place a Live Test Call */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Place a Test Call</h2>
              <p className="text-[11px] text-slate-500">Enter your personal phone number to test your voice agent right now.</p>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <input
              type="text"
              placeholder="+1 (555) 000-0000"
              value={testPhoneNumber}
              onChange={(e) => setTestPhoneNumber(e.target.value)}
              className="flex-1 rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
            <button
              onClick={handleTestCall}
              disabled={calling || !testPhoneNumber}
              className="rounded-lg bg-slate-900 hover:bg-slate-800 px-5 py-2 text-xs font-semibold text-white shadow-sm transition disabled:opacity-50 flex items-center gap-1.5"
            >
              {calling ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <span>Call Me</span>}
            </button>
          </div>
          {testCallStatus && (
            <p className="text-xs text-emerald-700 font-medium bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
              {testCallStatus}
            </p>
          )}
        </div>

        {/* Call Forwarding Steps for US Carriers */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Step-by-Step Carrier Call Forwarding Guide</h2>
          <p className="text-xs text-slate-500">
            Forward your unanswered business calls so your AI receptionist picks up whenever you are on a roof, under a sink, or after-hours.
          </p>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="font-bold text-slate-800">Verizon & AT&T (Conditional Call Forwarding):</span>
              <p className="text-slate-600 mt-1">
                From your business phone, dial <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono font-bold text-slate-900">*71{cleanNumber}</code> and tap Call. Listen for confirmation beeps, then hang up.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="font-bold text-slate-800">T-Mobile:</span>
              <p className="text-slate-600 mt-1">
                From your business phone, dial <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono font-bold text-slate-900">**004*{cleanNumber}#</code> and tap Call.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="font-bold text-slate-800">VOIP (Vonage, RingCentral, Nextiva):</span>
              <p className="text-slate-600 mt-1">
                In your VOIP admin portal, set <em>"No Answer Ringing Rule"</em> to forward to <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono font-bold text-slate-900">{assignedNumber}</code> after 3 rings.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 px-8 py-3.5 text-xs font-semibold text-white shadow-sm transition"
          >
            <span>Go to Contractor Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
}
