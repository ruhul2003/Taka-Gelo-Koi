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
    { id: "user", label: "সাধারণ ব্যবহারকারী", icon: Coins },
    { id: "admin", label: "অ্যাডমিন প্যানেল", icon: ShieldAlert },
  ];

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#090d16] px-4 py-12 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="z-10 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/70 p-8 shadow-sm backdrop-blur-md"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2.5 text-center mb-8">
          <div className="rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 p-2.5 text-indigo-600 dark:text-indigo-400">
            <Wallet className="h-6 w-6" />
          </div>
          <span className="bengali-title text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            টাকা গেল <span className="text-indigo-600 dark:text-indigo-400">কই ?</span>
          </span>
          <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">নতুন অ্যাকাউন্ট তৈরি করুন</h2>
        </div>

        {success ? (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center gap-4 py-8 text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-500 text-indigo-600 dark:text-indigo-400 font-bold">
              ✓
            </div>
            <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400">নিবন্ধন সফল হয়েছে!</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">আপনাকে লগইন পেজে রিডাইরেক্ট করা হচ্ছে...</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <div className="rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-4 py-3 text-xs font-semibold text-slate-800 dark:text-slate-200">
                {error}
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-3.5">
              {/* Name */}
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">নাম</label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="আপনার নাম লিখুন"
                    className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-indigo-600 px-4 py-2.5 pl-10 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none transition-all"
                  />
                </div>
              </div>

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
                    placeholder="নূন্যতম ৬ ডিজিট"
                    className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-indigo-600 px-4 py-2.5 pl-10 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">ভূমিকা নির্বাচন করুন</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {rolesConfig.map((cfg) => {
                    const Icon = cfg.icon;
                    const isSelected = role === cfg.id;
                    return (
                      <button
                        key={cfg.id}
                        type="button"
                        onClick={() => setRole(cfg.id as any)}
                        className={`flex items-center gap-2 rounded-xl border p-2.5 text-left transition-all ${
                          isSelected 
                            ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold" 
                            : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-xs">{cfg.label}</span>
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
                    <div className="pt-1">
                      <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">অ্যাডমিন সিক্রেট কী</label>
                      <div className="relative">
                        <Key className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <input
                          type="password"
                          required
                          value={adminSecret}
                          onChange={(e) => setAdminSecret(e.target.value)}
                          placeholder="অ্যাডমিন সাইনআপের সিক্রেট কী দিন"
                          className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-indigo-600 px-4 py-2.5 pl-10 text-sm text-slate-900 dark:text-slate-100 outline-none transition-all"
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
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 py-3 font-semibold text-white shadow-sm transition-colors disabled:cursor-not-allowed cursor-pointer"
            >
              <span>{loading ? "প্রক্রিয়াকরণ হচ্ছে..." : "নিবন্ধন করুন"}</span>
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>

            <p className="text-center text-xs text-slate-500 pt-2">
              ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
              <Link href="/login" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                প্রবেশ করুন
              </Link>
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}
