"use client";

import React from "react";
import LandingNavbar from "@/components/LandingNavbar";
import { Coins, Briefcase, GraduationCap, CheckCircle2, Wallet } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100 selection:bg-indigo-500">
      {/* Background Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-violet-900/20 blur-[120px]" />
      <div className="absolute bottom-[20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blue-900/20 blur-[150px]" />

      <LandingNavbar />

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="bengali-title text-4xl sm:text-5xl font-extrabold mb-4">৩টি ভিন্ন ভিন্ন ড্যাশবোর্ড সুবিধা</h1>
          <p className="text-slate-400 max-w-xl mx-auto">আপনার জীবনের প্রতিটি খাতের খরচের গতিবিধি আলাদাভাবে বিশ্লেষণ করার জন্য প্রস্তুতকৃত ড্যাশবোর্ডসমূহ।</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1: Daily Life */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="glass-panel rounded-2xl p-8 flex flex-col gap-6"
          >
            <div className="rounded-xl bg-violet-950/60 border border-violet-800/30 p-4 w-fit">
              <Coins className="h-8 w-8 text-violet-400" />
            </div>
            <div>
              <h3 className="bengali-title text-2xl font-bold mb-2 text-violet-200">দৈনন্দিন জীবন ড্যাশবোর্ড</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                আপনার নিত্যদিনের বাজার খরচ, বাড়ি ভাড়া, বিল পরিশোধ ও যাতায়াত খরচ ট্র্যাক করুন। মাসের শেষে আপনার মূল খরচগুলো পাই-চার্টে দেখুন।
              </p>
            </div>
            <ul className="mt-auto space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-violet-400" /> আয় ও ব্যয় ট্র্যাকার</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-violet-400" /> ক্যাটাগরিভিত্তিক পাই-চার্ট</li>
            </ul>
          </motion.div>

          {/* Card 2: Business */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="glass-panel rounded-2xl p-8 flex flex-col gap-6"
          >
            <div className="rounded-xl bg-blue-950/60 border border-blue-800/30 p-4 w-fit">
              <Briefcase className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h3 className="bengali-title text-2xl font-bold mb-2 text-blue-200">ব্যবসায়িক ড্যাশবোর্ড</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                আপনার ব্যবসার মোট রেভিনিউ বা সেলস, অপারেশনাল কস্ট, প্রফিট মার্জিন এবং ক্লায়েন্ট পেমেন্ট ট্র্যাক করুন সুনির্দিষ্টভাবে।
              </p>
            </div>
            <ul className="mt-auto space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-400" /> প্রফিট ও লস স্টেটমেন্ট</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-400" /> রেভিনিউ ফিল্টারস</li>
            </ul>
          </motion.div>

          {/* Card 3: Study */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="glass-panel rounded-2xl p-8 flex flex-col gap-6"
          >
            <div className="rounded-xl bg-emerald-950/60 border border-emerald-800/30 p-4 w-fit">
              <GraduationCap className="h-8 w-8 text-emerald-400" />
            </div>
            <div>
              <h3 className="bengali-title text-2xl font-bold mb-2 text-emerald-200">শিক্ষা ব্যয় ড্যাশবোর্ড</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                সেমিস্টার ফি, বই কেনা, মেস ভাড়া বা হাত খরচের হিসাব রাখুন। বাজেট অ্যালার্ট সিস্টেম আপনাকে অতিরিক্ত ব্যয় থেকে রক্ষা করবে।
              </p>
            </div>
            <ul className="mt-auto space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> পড়ার খরচ ও হাতখরচ বিভাজন</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> বাজেট ও প্রগ্রেস বার ট্র্যাকিং</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-12 px-6 bg-slate-950/60">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-slate-900 p-2 border border-slate-800">
              <Wallet className="h-5 w-5 text-indigo-400" />
            </div>
            <span className="bengali-title text-xl font-bold tracking-wider text-slate-200">
              টাকা গেল কই ?
            </span>
          </div>
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} টাকা গেল কই ? সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </footer>
    </div>
  );
}
