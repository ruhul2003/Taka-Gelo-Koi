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
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#090d16] px-4 py-12 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="z-10 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/70 p-8 shadow-sm backdrop-blur-md"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2.5 text-center mb-8">
          <div className="rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 p-2.5 text-indigo-600 dark:text-indigo-400">
            <Wallet className="h-6 w-6" />
          </div>
          <span className="bengali-title text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            টাকা গেল <span className="text-indigo-600 dark:text-indigo-400">কই ?</span>
          </span>
          <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">অ্যাকাউন্টে প্রবেশ করুন</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-4 py-3 text-xs font-semibold text-slate-800 dark:text-slate-200">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">ইমেইল</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="আপনার ইমেইল ঠিকানা লিখুন"
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-indigo-600 px-4 py-2.5 pl-10 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">পাসওয়ার্ড</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="আপনার পাসওয়ার্ড দিন"
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-indigo-600 px-4 py-2.5 pl-10 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 py-3 font-semibold text-white shadow-sm transition-colors disabled:cursor-not-allowed cursor-pointer"
          >
            <span>{loading ? "প্রবেশ করা হচ্ছে..." : "প্রবেশ করুন"}</span>
            {!loading && <ArrowRight className="h-4 w-4" />}
          </button>

          <p className="text-center text-xs text-slate-500 pt-2">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
              নিবন্ধন করুন
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
