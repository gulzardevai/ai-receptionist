"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { PhoneCall, ArrowRight, Mail, Lock, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextRoute = searchParams ? searchParams.get("next") || "/dashboard" : "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (error) {
        setErrorMsg(error.message);
      } else if (data.session) {
        router.push(nextRoute);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-200/50 space-y-6">
      <div className="text-center space-y-1">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white mb-3 shadow-md shadow-slate-900/10">
          <PhoneCall className="h-5 w-5" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Contractor Sign In</h1>
        <p className="text-xs text-slate-500">Sign in to manage your AI Receptionist and calendar calls</p>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Business Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="email"
              required
              placeholder="contractor@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-semibold text-slate-700">Password</label>
            <a href="#" className="text-[11px] text-slate-500 hover:text-slate-900">Forgot?</a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white py-2.5 text-xs font-semibold shadow-sm transition disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
            <>
              <span>Sign In</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
        Don't have an account?{" "}
        <Link href="/signup" className="font-semibold text-slate-900 hover:underline">
          Create account
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading sign in...</div>}>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}
