"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { 
  Wallet, 
  User as UserIcon, 
  Mail, 
  Lock, 
  Key, 
  Coins, 
  Briefcase, 
  GraduationCap, 
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [adminSecret, setAdminSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload: any = {
        email,
        password,
        name,
        role,
      };

      if (role === "admin") {
        payload.adminSecret = adminSecret;
      }

      const { data, error: authError } = await authClient.signUp.email(payload);

      if (authError) {
        setError(authError.message || "নিবন্ধনে ব্যর্থতা। অনুগ্রহ করে পুনরায় চেষ্টা করুন।");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setError("সার্ভারে যোগাযোগ করা যাচ্ছে না। অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।");
      setLoading(false);
    }
  };

  const rolesConfig = [
    { id: "user", label: "সাধারণ ব্যবহারকারী", icon: Coins, color: "text-violet-400 border-violet-800/40 bg-violet-950/20" },
    { id: "admin", label: "অ্যাডমিন প্যানেল", icon: ShieldAlert, color: "text-amber-400 border-amber-800/40 bg-amber-950/20" },
  ];

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-slate-100">
      <div className="absolute top-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-indigo-900/10 blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-violet-900/10 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-lg rounded-2xl glass-panel p-8 shadow-2xl"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center mb-8">
          <div className="rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 p-2.5 shadow-indigo-500/20 shadow-md">
            <Wallet className="h-6 w-6 text-white" />
          </div>
          <span className="bengali-title text-2xl font-extrabold tracking-wider text-gradient">
            টাকা গেল কই ?
          </span>
          <h2 className="text-xl font-bold text-slate-200 mt-2">নতুন অ্যাকাউন্ট তৈরি করুন</h2>
        </div>

        {success ? (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center gap-4 py-8 text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-400">
              ✓
            </div>
            <p className="text-lg font-semibold text-emerald-400">নিবন্ধন সফল হয়েছে!</p>
            <p className="text-sm text-slate-400">আপনাকে লগইন পেজে রিডাইরেক্ট করা হচ্ছে...</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSignup} className="space-y-5">
            {error && (
              <div className="rounded-xl bg-rose-950/40 border border-rose-900 px-4 py-3 text-sm font-semibold text-rose-300">
                {error}
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">নাম</label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="আপনার নাম লিখুন"
                    className="w-full rounded-xl bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80 px-4 py-3 pl-10 text-sm placeholder:text-slate-600 outline-none transition-all"
                  />
                </div>
              </div>

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
                    placeholder="নূন্যতম ৬ ডিজিট"
                    className="w-full rounded-xl bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80 px-4 py-3 pl-10 text-sm placeholder:text-slate-600 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">ভূমিকা নির্বাচন করুন</label>
                <div className="grid grid-cols-2 gap-3">
                  {rolesConfig.map((cfg) => {
                    const Icon = cfg.icon;
                    const isSelected = role === cfg.id;
                    return (
                      <button
                        key={cfg.id}
                        type="button"
                        onClick={() => setRole(cfg.id as any)}
                        className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all duration-300 ${
                          isSelected 
                            ? "border-indigo-500 bg-indigo-950/40 text-indigo-300 ring-1 ring-indigo-500/50" 
                            : "border-slate-800/80 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/80 text-slate-400"
                        }`}
                      >
                        <Icon className="h-4.5 w-4.5 shrink-0" />
                        <span className="text-xs font-bold">{cfg.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Admin Secret Key (Condition-based) */}
              <AnimatePresence>
                {role === "admin" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2">
                      <label className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-2">অ্যাডমিন সিক্রেট কী</label>
                      <div className="relative">
                        <Key className="absolute left-3.5 top-3.5 h-4 w-4 text-amber-500" />
                        <input
                          type="password"
                          required
                          value={adminSecret}
                          onChange={(e) => setAdminSecret(e.target.value)}
                          placeholder="অ্যাডমিন সাইনআপের সিক্রেট কী দিন"
                          className="w-full rounded-xl bg-slate-900/60 border border-amber-900/50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 px-4 py-3 pl-10 text-sm text-amber-100 placeholder:text-amber-900 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-slate-800 disabled:to-slate-800 py-3.5 font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 disabled:cursor-not-allowed hover:scale-[1.01]"
            >
              <span>{loading ? "প্রক্রিয়াকরণ হচ্ছে..." : "নিবন্ধন করুন"}</span>
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>

            <p className="text-center text-xs text-slate-500">
              ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
              <Link href="/login" className="font-semibold text-indigo-400 hover:underline">
                প্রবেশ করুন
              </Link>
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}
