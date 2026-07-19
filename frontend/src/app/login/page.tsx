"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { 
  Wallet, 
  Mail, 
  Lock, 
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || "ইমেইল বা পাসওয়ার্ড ভুল। আবার চেষ্টা করুন।");
        setLoading(false);
        return;
      }

      // Check current user role to redirect appropriately
      const session = await authClient.getSession();
      if (session && session.data) {
        const userRole = (session.data.user as any).role;
        if (userRole === "admin") {
          router.push("/dashboard/admin");
        } else {
          router.push("/dashboard/daily");
        }
      } else {
        setError("সেশন চালু করা সম্ভব হয়নি।");
        setLoading(false);
      }
    } catch (err: any) {
      console.error(err);
      setError("সার্ভারে যোগাযোগ করা যাচ্ছে না। অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-slate-100">
      <div className="absolute top-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-indigo-900/10 blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-violet-900/10 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-md rounded-2xl glass-panel p-8 shadow-2xl"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center mb-8">
          <div className="rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 p-2.5 shadow-indigo-500/20 shadow-md">
            <Wallet className="h-6 w-6 text-white" />
          </div>
          <span className="bengali-title text-2xl font-extrabold tracking-wider text-gradient">
            টাকা গেল কই ?
          </span>
          <h2 className="text-xl font-bold text-slate-200 mt-2">অ্যাকাউন্টে প্রবেশ করুন</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="rounded-xl bg-rose-950/40 border border-rose-900 px-4 py-3 text-sm font-semibold text-rose-300">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">ইমেইল</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="আপনার ইমেইল ঠিকানা লিখুন"
                className="w-full rounded-xl bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80 px-4 py-3 pl-10 text-sm placeholder:text-slate-600 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">পাসওয়ার্ড</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="আপনার পাসওয়ার্ড দিন"
                className="w-full rounded-xl bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80 px-4 py-3 pl-10 text-sm placeholder:text-slate-600 outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-slate-800 disabled:to-slate-800 py-3.5 font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 disabled:cursor-not-allowed hover:scale-[1.01]"
          >
            <span>{loading ? "প্রবেশ করা হচ্ছে..." : "প্রবেশ করুন"}</span>
            {!loading && <ArrowRight className="h-4 w-4" />}
          </button>

          <p className="text-center text-xs text-slate-500">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="font-semibold text-indigo-400 hover:underline">
              নিবন্ধন করুন
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
