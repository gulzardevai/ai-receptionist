"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Settings, CreditCard, CheckCircle2, ExternalLink, User as UserIcon, Building2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function SettingsPage() {
  const [userId, setUserId] = useState<string>("");
  const [formData, setFormData] = useState({
    // User Profile
    full_name: "John Doe",
    email: "contractor@apexhvac.com",
    phone: "+1 (512) 555-0199",
    // Business Persona
    name: "Apex HVAC & Heating Solutions",
    trade: "HVAC",
    service_area: "Greater Austin Metro & Round Rock",
    dispatch_fee: "$89 diagnostic fee",
    oncall_number: "+1 (512) 555-0911",
    services: "AC Repair & Troubleshooting, Furnace & Heat Pump Maintenance, Ductwork Cleaning & Sealing",
    hours: "Monday-Friday: 8:00 AM - 6:00 PM; Saturday: 9:00 AM - 2:00 PM; Sunday: Closed",
    emergency_keywords: "gas smell, carbon monoxide, sparking, flooding, no heat in freezing weather",
    alert_emails: "owner@apexhvac.com"
  });

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch current user & settings on mount
  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const userEmail = user.email || "";
        const userFullName = user.user_metadata?.full_name || userEmail.split("@")[0] || "";
        const userPhone = user.user_metadata?.phone || "";

        setFormData(prev => ({
          ...prev,
          email: userEmail,
          full_name: userFullName || prev.full_name,
          phone: userPhone || prev.phone,
          alert_emails: userEmail || prev.alert_emails
        }));

        try {
          const res = await fetch(`http://localhost:8000/api/v1/settings/me?user_id=${user.id}&email=${encodeURIComponent(userEmail)}`);
          if (res.ok) {
            const data = await res.json();
            if (data.business) {
              setFormData(prev => ({
                ...prev,
                name: data.business.name || prev.name,
                trade: data.business.trade || prev.trade,
                service_area: data.business.service_area || prev.service_area,
                dispatch_fee: data.business.dispatch_fee || prev.dispatch_fee,
                oncall_number: data.business.oncall_number || prev.oncall_number,
                emergency_keywords: data.business.emergency_keywords || prev.emergency_keywords,
                alert_emails: data.business.alert_emails || prev.alert_emails
              }));
            }
          }
        } catch (e) {
          console.log("Could not fetch remote settings:", e);
        }
      }
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call /me update API
      await fetch("http://localhost:8000/api/v1/settings/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          email: formData.email,
          full_name: formData.full_name,
          phone: formData.phone,
          company_name: formData.name,
          trade: formData.trade,
          service_area: formData.service_area,
          dispatch_fee: formData.dispatch_fee,
          oncall_number: formData.oncall_number,
          services: formData.services,
          hours: formData.hours,
          emergency_keywords: formData.emergency_keywords,
          alert_emails: formData.alert_emails
        })
      });

      // Also update local Supabase user metadata
      if (userId) {
        await supabase.auth.updateUser({
          data: { full_name: formData.full_name, phone: formData.phone }
        });
      }
    } catch (err) {
      console.log("Error saving settings:", err);
    }

    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-10 w-full space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings & Subscription</h1>
          <p className="text-xs text-slate-500 mt-1">Configure your contractor profile, voice receptionist persona, and subscription.</p>
        </div>

        {/* Subscription Plan Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">Starter Plan ($149/mo)</span>
                <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold">
                  Active Plan
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">124 of 300 monthly minutes used. Renews in 18 days.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://whop.com/hub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition"
            >
              <span>Manage Billing</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="/pricing"
              className="rounded-lg bg-slate-900 hover:bg-slate-800 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition"
            >
              Upgrade to Pro
            </a>
          </div>
        </div>

        {/* Unified Profile & Business Settings Form */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* User Account / Profile Section */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <UserIcon className="h-4 w-4 text-slate-600" />
              <h2 className="text-sm font-bold text-slate-900">Account Owner Profile</h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs focus:bg-white focus:outline-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Account Email</label>
                <input
                  type="email"
                  disabled
                  value={formData.email}
                  className="w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-xs text-slate-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Direct Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (512) 555-0199"
                  className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs focus:bg-white focus:outline-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Business & Voice Assistant Persona Section */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Building2 className="h-4 w-4 text-slate-600" />
              <h2 className="text-sm font-bold text-slate-900">Voice Assistant Persona & Dispatch Facts</h2>
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
                <label className="block text-xs font-medium text-slate-600 mb-1">Trade</label>
                <input
                  type="text"
                  value={formData.trade}
                  onChange={(e) => setFormData({ ...formData, trade: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Service Area</label>
              <input
                type="text"
                value={formData.service_area}
                onChange={(e) => setFormData({ ...formData, service_area: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Diagnostic Fee</label>
                <input
                  type="text"
                  value={formData.dispatch_fee}
                  onChange={(e) => setFormData({ ...formData, dispatch_fee: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">On-Call Phone Number (Emergencies)</label>
                <input
                  type="text"
                  value={formData.oncall_number}
                  onChange={(e) => setFormData({ ...formData, oncall_number: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Emergency Keywords (Separated by commas)</label>
              <input
                type="text"
                value={formData.emergency_keywords}
                onChange={(e) => setFormData({ ...formData, emergency_keywords: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Alert Email Address (Instant Post-Call Notifications)</label>
              <input
                type="email"
                value={formData.alert_emails}
                onChange={(e) => setFormData({ ...formData, alert_emails: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs"
              />
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              {saved ? (
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Profile & Voice Agent persona saved!
                </span>
              ) : <span></span>}

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white px-6 py-2.5 text-xs font-semibold shadow-sm transition"
              >
                {loading ? "Saving..." : "Save All Changes"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
    </ProtectedRoute>
  );
}
