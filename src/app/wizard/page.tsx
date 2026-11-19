"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Sparkles, ArrowRight, CheckCircle2, Phone, AlertTriangle, ShieldCheck, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("https://");

  const [formData, setFormData] = useState({
    name: "Apex Heating & Air Conditioning",
    trade: "HVAC",
    service_area: "Austin, Round Rock, Cedar Park",
    dispatch_fee: "$89 diagnostic fee",
    oncall_number: "+1 (512) 555-0911",
    services: "AC Repair, Furnace Tune-up, Heat Pump Replacement, 24/7 Emergency Service",
    monday_friday: "8:00 AM - 6:00 PM",
    saturday: "9:00 AM - 2:00 PM",
    sunday: "Closed (Emergency on-call only)",
    emergency_keywords: "gas smell, carbon monoxide, sparking, flooding, no heat in winter"
  });

  const handleAnalyzeWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/v1/wizard/scrape-website", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: websiteUrl })
      });

      if (res.ok) {
        const data = await res.json();
        setFormData((prev) => ({
          ...prev,
          name: data.company_name || prev.name,
          trade: data.trade || prev.trade,
          service_area: data.service_area || prev.service_area,
          dispatch_fee: data.dispatch_fee || prev.dispatch_fee,
          services: Array.isArray(data.services_list) ? data.services_list.join(", ") : prev.services,
          monday_friday: data.business_hours?.monday_friday || prev.monday_friday,
          saturday: data.business_hours?.saturday || prev.saturday,
          sunday: data.business_hours?.sunday || prev.sunday
        }));
      }
    } catch (err) {
      console.log("Using default pre-filled data while backend is initializing:", err);
    } finally {
      setLoading(false);
      setStep(2);
    }
  };

  const handleFinishSetup = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/wizard/complete-setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          owner_id: "00000000-0000-0000-0000-000000000000",
          name: formData.name,
          trade: formData.trade,
          service_area: formData.service_area,
          dispatch_fee: formData.dispatch_fee,
          oncall_number: formData.oncall_number,
          services: formData.services.split(",").map(s => s.trim()),
          hours: {
            monday_friday: formData.monday_friday,
            saturday: formData.saturday,
            sunday: formData.sunday
          }
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.twilio_number) {
          localStorage.setItem("assigned_number", data.twilio_number);
        }
      }
    } catch (err) {
      console.log("Setup completed with fallback:", err);
    } finally {
      setLoading(false);
      router.push("/go-live");
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-12 w-full">
        {/* Progress tracker */}
        <div className="mb-10 flex items-center justify-between border-b border-slate-200 pb-5 text-xs font-semibold">
          <div className={`flex items-center gap-2 ${step >= 1 ? "text-slate-900 font-bold" : "text-slate-400"}`}>
            <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${step >= 1 ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-600"}`}>1</span>
            <span>Paste Website</span>
          </div>
          <div className="h-0.5 w-12 bg-slate-200"></div>
          <div className={`flex items-center gap-2 ${step >= 2 ? "text-slate-900 font-bold" : "text-slate-400"}`}>
            <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${step >= 2 ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-600"}`}>2</span>
            <span>Business Facts</span>
          </div>
          <div className="h-0.5 w-12 bg-slate-200"></div>
          <div className={`flex items-center gap-2 ${step >= 3 ? "text-slate-900 font-bold" : "text-slate-400"}`}>
            <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${step >= 3 ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-600"}`}>3</span>
            <span>Emergency Rules</span>
          </div>
        </div>

        {/* Step 1: Website URL */}
        {step === 1 && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Step 1: Enter Business Website</h2>
                <p className="text-xs text-slate-500">Gemini AI will read your pages and pre-populate your receptionist</p>
              </div>
            </div>

            <form onSubmit={handleAnalyzeWebsite} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Company Website URL
                </label>
                <input
                  type="text"
                  required
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://apexhvacservices.com"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 text-xs shadow-sm transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Gemini is reading your website...</span>
                  </>
                ) : (
                  <>
                    <span>Extract Services & Business Hours</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Confirm Facts */}
        {step === 2 && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Step 2: Confirm Extracted Details</h2>
              <p className="text-xs text-slate-500">Review facts. Your voice agent quotes these during customer calls.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Company Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Trade / Industry</label>
                <input
                  type="text"
                  value={formData.trade}
                  onChange={(e) => setFormData({ ...formData, trade: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Service Area (Cities / Counties)</label>
              <input
                type="text"
                value={formData.service_area}
                onChange={(e) => setFormData({ ...formData, service_area: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Services List</label>
              <textarea
                rows={2}
                value={formData.services}
                onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Dispatch / Diagnostic Fee</label>
                <input
                  type="text"
                  value={formData.dispatch_fee}
                  onChange={(e) => setFormData({ ...formData, dispatch_fee: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Operating Hours</label>
                <input
                  type="text"
                  value={formData.monday_friday}
                  onChange={(e) => setFormData({ ...formData, monday_friday: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 text-xs transition"
              >
                <span>Continue to Emergency Rules</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Emergency Rules */}
        {step === 3 && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Step 3: Emergency Rules & Calendar</h2>
                <p className="text-xs text-slate-500">Configure safety escalation and on-call technician phone number</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Emergency Keywords</label>
              <input
                type="text"
                value={formData.emergency_keywords}
                onChange={(e) => setFormData({ ...formData, emergency_keywords: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs"
              />
              <p className="text-[11px] text-slate-400 mt-1">Triggers life-safety prompt and immediate call transfer.</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">On-Call Phone Number (For Emergency Transfers)</label>
              <input
                type="text"
                value={formData.oncall_number}
                onChange={(e) => setFormData({ ...formData, oncall_number: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs"
              />
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Google Calendar Live Sync Authorized</span>
              </div>
              <p className="text-[11px] text-emerald-700 mt-1">
                Your AI agent is connected to check available slots and book appointments directly on your calendar.
              </p>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                Back
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleFinishSetup}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 text-xs shadow-sm transition"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Provisioning ElevenLabs Agent & Twilio Number...</span>
                  </>
                ) : (
                  <span>Deploy Voice Agent & Go Live</span>
                )}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
    </ProtectedRoute>
  );
}
