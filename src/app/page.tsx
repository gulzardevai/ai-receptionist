"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { 
  Phone, Calendar, ShieldAlert, Zap, CheckCircle2, ArrowRight, 
  Play, Pause, Volume2, Clock, Check
} from "lucide-react";

export default function Home() {
  const demoPhone = process.env.NEXT_PUBLIC_DEMO_PHONE_NUMBER || "+1 (512) 555-0199";

  // Interactive Live Call Animation Simulation
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimulating) {
      if (simStep === 0) {
        timer = setTimeout(() => setSimStep(1), 1200);
      } else if (simStep === 1) {
        timer = setTimeout(() => setSimStep(2), 2200);
      } else if (simStep === 2) {
        timer = setTimeout(() => setSimStep(3), 2600);
      }
    } else {
      setSimStep(0);
    }
    return () => clearTimeout(timer);
  }, [isSimulating, simStep]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      <Navbar />

      {/* Hero Section with Clean, Aesthetic Light SaaS Theme */}
      <section className="relative overflow-hidden pt-14 pb-24 border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/80 to-slate-100/60">
        {/* Soft, Delicate Micro-dots Pattern (Clean & Ultra Aesthetic) */}
        <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-35 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,#000_70%,transparent_100%)] pointer-events-none" />
        
        {/* Soft Ambient Light Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-gradient-to-tr from-slate-200/30 via-slate-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          {/* Aesthetic Modern Pill Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur transition hover:scale-105 duration-200">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Autonomous Voice AI for HVAC, Plumbing & Contractors</span>
          </div>

          <h1 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.12]">
            Never Miss Another $500 Job. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600">
              AI Phone Receptionist for Contractors.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Answers your business phone 24/7 in 2 rings. Screens urgent emergencies, checks your live Google Calendar, books appointments, and emails you verbatim audio transcripts.
          </p>

          {/* Live Demo Phone Banner with Sleek Aesthetic Depth */}
          <div className="mt-10 inline-flex flex-col sm:flex-row items-center gap-4 p-3 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/60 max-w-xl mx-auto w-full backdrop-blur transition-all duration-300 hover:shadow-2xl hover:border-slate-300">
            <div className="flex items-center gap-3 px-3 py-1 flex-1">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white shrink-0 shadow-md">
                <Phone className="h-5 w-5 animate-pulse text-emerald-400" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
              <div className="text-left">
                <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Dial Our Live Test Line</p>
                <p className="text-xl font-black text-slate-950 font-mono tracking-tight">{demoPhone}</p>
              </div>
            </div>
            <Link
              href="/wizard"
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 text-xs font-bold shadow-md transition-all duration-200 hover:scale-[1.02] w-full sm:w-auto"
            >
              <span>Set Up in 15 Min</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-semibold">
            <div className="flex items-center gap-1.5 bg-white/80 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Zero scripts or coding needed</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Direct Google Calendar Sync</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Dedicated Twilio Phone Line</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Animated Call Simulator Section (Aesthetic Light Theme) */}
      <section className="py-20 bg-slate-50/70 border-b border-slate-200/80">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 border border-slate-200 px-3.5 py-1 rounded-full shadow-2xs">
              Live AI Experience
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-950">
              Watch The Receptionist In Action
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium">
              Click simulate to see what happens when a customer calls your number while you are busy.
            </p>
          </div>

          {/* Interactive Card with Soundwave Animation */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-xl shadow-slate-200/50 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3">
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center transition-colors shadow-xs ${
                  isSimulating ? "bg-emerald-600 text-white animate-pulse" : "bg-slate-100 text-slate-900 border border-slate-200"
                }`}>
                  <Volume2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-950">
                    {isSimulating ? "Inbound Call Connected (2 Rings)" : "Simulated Phone Call"}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {isSimulating ? "Audio streaming with low-latency voice model" : "Click the button to preview a real call flow"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsSimulating(!isSimulating)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all duration-200 ${
                  isSimulating 
                    ? "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100" 
                    : "bg-slate-900 text-white hover:bg-slate-800 shadow-md"
                }`}
              >
                {isSimulating ? (
                  <>
                    <Pause className="h-3.5 w-3.5" />
                    <span>Stop Call</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" />
                    <span>Simulate Inbound Call</span>
                  </>
                )}
              </button>
            </div>

            {/* Visual Equalizer / Sound Wave Animation */}
            {isSimulating && (
              <div className="flex items-center justify-center gap-1.5 py-6">
                <span className="w-1.5 h-6 bg-slate-700 rounded-full animate-pulse" />
                <span className="w-1.5 h-10 bg-slate-900 rounded-full animate-bounce [animation-delay:0.1s]" />
                <span className="w-1.5 h-14 bg-slate-800 rounded-full animate-pulse [animation-delay:0.2s]" />
                <span className="w-1.5 h-8 bg-slate-950 rounded-full animate-bounce [animation-delay:0.3s]" />
                <span className="w-1.5 h-12 bg-slate-800 rounded-full animate-pulse [animation-delay:0.15s]" />
                <span className="w-1.5 h-7 bg-slate-900 rounded-full animate-bounce [animation-delay:0.25s]" />
                <span className="w-1.5 h-10 bg-slate-700 rounded-full animate-pulse [animation-delay:0.05s]" />
              </div>
            )}

            {/* Conversation Flow Step-by-Step */}
            <div className="mt-6 space-y-4 text-xs font-sans">
              {/* Step 1: AI Greeting */}
              <div className={`p-4 rounded-2xl border-2 transition-all duration-500 ${
                isSimulating && simStep >= 1 
                  ? "bg-slate-100 border-slate-300 opacity-100 translate-y-0 shadow-sm" 
                  : "bg-slate-50 border-slate-200 opacity-40"
              }`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-bold text-slate-950">AI Receptionist:</span>
                  <span className="text-[10px] bg-slate-300 px-2 py-0.5 rounded text-slate-800 font-bold">Voice Line</span>
                </div>
                <p className="text-slate-800 italic font-medium">
                  "Thanks for calling Apex Heating & Air Conditioning, this is the AI assistant. How can I help you today?"
                </p>
              </div>

              {/* Step 2: Customer Inquiry */}
              <div className={`p-4 rounded-2xl border-2 transition-all duration-500 ${
                isSimulating && simStep >= 2 
                  ? "bg-white border-slate-400 shadow-md opacity-100 translate-y-0" 
                  : "bg-white/50 border-slate-200 opacity-40"
              }`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-bold text-slate-950">Customer (Sarah):</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded font-bold">Austin, TX</span>
                </div>
                <p className="text-slate-800 font-medium">
                  "Hi, my AC unit stopped blowing cold air this morning and it's making a loud vibrating noise. Do you have someone available today?"
                </p>
              </div>

              {/* Step 3: Google Calendar Check & Booking */}
              <div className={`p-4 rounded-2xl border-2 transition-all duration-500 ${
                isSimulating && simStep >= 3 
                  ? "bg-emerald-50 border-emerald-400 shadow-md opacity-100 translate-y-0" 
                  : "bg-slate-50 border-slate-200 opacity-40"
              }`}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-950">AI Receptionist (Google Calendar Synced):</span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-bold">Slot Booked</span>
                  </div>
                  <span className="text-emerald-800 font-bold flex items-center gap-1 text-[11px]">
                    <Check className="h-3.5 w-3.5 text-emerald-700" /> Added to your Schedule
                  </span>
                </div>
                <p className="text-slate-900 font-medium">
                  "I can definitely get a technician out to diagnose that. Our diagnostic fee is $89. Looking at our calendar, I have an opening tomorrow morning at 9:00 AM or 1:00 PM. Would 9:00 AM work for you?"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps: How It Works (Clean Aesthetic Light Section) */}
      <section className="py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 border border-slate-200 px-3.5 py-1 rounded-full shadow-2xs">
              Automated Process
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-950">
              From Missed Ring to Booked Job in 60s
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium">
              You stay focused on the physical work while your phone assistant captures every single dollar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 text-slate-950 flex items-center justify-center mb-6 font-black text-base shadow-xs">
                  01
                </div>
                <h3 className="text-base font-bold text-slate-950 mb-2">Customer Calls Line</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  If you don't pick up after 2 rings, the call automatically transfers. The AI answers with your exact company name, operating hours, and services.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs text-slate-600 font-semibold">
                <Clock className="h-3.5 w-3.5 text-slate-500" />
                <span>Under 2 seconds pick up</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 text-slate-950 flex items-center justify-center mb-6 font-black text-base shadow-xs">
                  02
                </div>
                <h3 className="text-base font-bold text-slate-950 mb-2">Live Calendar Query</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  The AI queries your Google Calendar in real time. It confirms the customer's street address, offers the 2 earliest open time slots, and locks the job on your schedule.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs text-emerald-700 font-semibold">
                <Calendar className="h-3.5 w-3.5" />
                <span>Zero double bookings</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 text-slate-950 flex items-center justify-center mb-6 font-black text-base shadow-xs">
                  03
                </div>
                <h3 className="text-base font-bold text-slate-950 mb-2">Instant Email Alert</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Within 10 seconds of hanging up, your phone receives a clean summary, caller phone, service address, transcript, and full recording playback.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs text-slate-800 font-semibold">
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                <span>Delivered via Resend</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (Clean Aesthetic Theme) */}
      <section id="pricing" className="py-24 bg-slate-50/80 border-b border-slate-200/80">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 border border-slate-200 px-3.5 py-1 rounded-full shadow-2xs">
            Simple Pricing
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-950">Subscription Plans</h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium">
            One single saved HVAC or plumbing repair call pays for the entire monthly plan.
          </p>

          <div className="mt-14 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Starter Plan Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left">
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-950">Starter Plan</h3>
                  <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[11px] font-bold text-slate-700">Single Van</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">For solo operators and single-truck contractors.</p>
                
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-black tracking-tight text-slate-950">$149</span>
                  <span className="ml-1.5 text-xs text-slate-500 font-bold">/ month</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-slate-700 border-t border-slate-100 pt-6 font-medium">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span><strong>300 minutes</strong> included per month</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Dedicated local Twilio number</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Google Calendar slot booking</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Emergency keyword transfer to technician</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Instant email summaries via Resend</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/pricing"
                className="mt-8 block text-center rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 py-3 text-xs font-bold text-slate-900 transition shadow-2xs"
              >
                Choose Starter Plan
              </Link>
            </div>

            {/* Pro Plan Card */}
            <div className="relative rounded-3xl border-2 border-slate-950 bg-white p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between text-left">
              <div className="absolute -top-3.5 right-6 rounded-full bg-slate-950 px-3.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                Most Popular
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-950">Pro Plan</h3>
                  <span className="rounded-full bg-slate-900 text-white px-2.5 py-0.5 text-[11px] font-bold">Multi-Crew</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">For established contractors handling 30+ calls daily.</p>
                
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-black tracking-tight text-slate-950">$299</span>
                  <span className="ml-1.5 text-xs text-slate-500 font-bold">/ month</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-slate-700 border-t border-slate-100 pt-6 font-medium">
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
                    <span>ElevenLabs Turbo voice latency</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Monthly automated ROI performance report</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Custom emergency keywords & routing</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/pricing"
                className="mt-8 block text-center rounded-xl bg-slate-950 hover:bg-slate-800 py-3 text-xs font-bold text-white shadow-md transition"
              >
                Choose Pro Plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 font-medium">
        <p>© 2026 CatchCall AI. All rights reserved. • Contact: <a href="mailto:support@catchcall.tech" className="text-slate-800 hover:underline">support@catchcall.tech</a></p>
      </footer>
    </div>
  );
}
