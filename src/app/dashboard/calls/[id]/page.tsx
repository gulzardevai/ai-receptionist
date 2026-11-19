"use client";

import { useState, Suspense } from "react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin, Calendar, ShieldAlert, CheckCircle, Play, Pause } from "lucide-react";

function CallDetailContent() {
  const params = useParams();
  const callId = params?.id ? String(params.id) : "call_01";
  const [isPlaying, setIsPlaying] = useState(false);

  const call = {
    id: callId,
    caller_name: "Sarah Miller",
    caller_phone: "+1 (512) 890-4122",
    started_at: "Today at 10:14 AM",
    duration_sec: 142,
    urgency: "normal",
    booked: true,
    job_type: "AC Repair & Diagnostic",
    service_address: "4102 Oak Springs Dr, Austin, TX",
    scheduled_slot: "Tuesday at 9:00 AM",
    summary: "Customer's AC blowing warm air and making a vibrating buzzing sound. Verified service area in Austin. Offered earliest slots. Booked diagnostic appointment for Tuesday 9:00 AM. Quoted $89 service-call fee.",
    transcript: `Agent: "Thanks for calling Apex HVAC, this is the AI assistant. This call may be recorded. How can I help?"
Caller: "Hi, our air conditioner stopped blowing cold air this morning and it's making a weird buzzing noise."
Agent: "I'm sorry to hear that! We can definitely get a technician out to diagnose that. May I have your name and service address?"
Caller: "Yes, Sarah Miller. 4102 Oak Springs Drive here in Austin."
Agent: "Thanks, Sarah. We do serve Oak Springs Drive. Our diagnostic service fee is $89, which is confirmed on site. Looking at our calendar, I have an opening tomorrow morning at 9:00 AM or 1:00 PM. Would 9:00 AM work for you?"
Caller: "Yes, tomorrow at 9:00 AM is perfect."
Agent: "Great, I have Sarah Miller booked for tomorrow at 9:00 AM at 4102 Oak Springs Drive for AC repair. Is there anything else I can help with?"
Caller: "No, that's everything, thank you!"
Agent: "You're welcome, have a great day!" [Call Ended]`,
    cost_usd: 0.1893
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 w-full space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Call Logs</span>
      </Link>

      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-slate-900">{call.caller_name}</h1>
              {call.urgency === "emergency" ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 text-red-700 border border-red-200 px-2.5 py-0.5 text-xs font-semibold">
                  <ShieldAlert className="h-3.5 w-3.5" /> Emergency
                </span>
              ) : (
                <span className="rounded-full bg-slate-100 text-slate-600 px-2.5 py-0.5 text-xs font-medium">
                  Standard Inquiry
                </span>
              )}
              {call.booked && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 text-xs font-semibold">
                  <CheckCircle className="h-3.5 w-3.5" /> Appointment Booked
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-mono mt-1">{call.caller_phone} • {call.started_at} ({call.duration_sec}s)</p>
          </div>

          <div className="text-right text-xs">
            <span className="text-slate-400">Infrastructure Cost:</span>
            <span className="font-mono font-bold text-slate-900 ml-1">${call.cost_usd.toFixed(4)}</span>
          </div>
        </div>

        {/* Audio Player Mock */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-9 w-9 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </button>
            <div>
              <p className="text-xs font-semibold text-slate-900">Audio Recording</p>
              <p className="text-[11px] text-slate-500">{isPlaying ? "Playing 0:42 / 2:22" : "Recorded call audio (MP3)"}</p>
            </div>
          </div>
          <div className="flex-1 max-w-xs bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-slate-900 h-full" style={{ width: isPlaying ? "35%" : "0%" }}></div>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Job & Address Details</h2>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-700">Service Address:</span>
                <p className="text-slate-600">{call.service_address}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Calendar className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-700">Scheduled Calendar Slot:</span>
                <p className="text-slate-600 font-medium text-emerald-700">{call.scheduled_slot}</p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <span className="font-semibold text-slate-700">AI Call Summary:</span>
              <p className="text-slate-600 mt-1 leading-relaxed">{call.summary}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h2 className="text-sm font-bold text-slate-900">Verbatim Call Audio Transcript</h2>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono max-h-72 overflow-y-auto leading-relaxed text-slate-700">
            <pre className="whitespace-pre-wrap font-sans text-xs">{call.transcript}</pre>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CallDetailPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <Navbar />
        <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500">Loading call details...</div>}>
          <CallDetailContent />
        </Suspense>
      </div>
    </ProtectedRoute>
  );
}
