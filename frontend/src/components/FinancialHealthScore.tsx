"use client";

import React from "react";
import { Activity, ShieldCheck, AlertTriangle, ArrowUpRight, Award, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface FinancialHealthScoreProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export default function FinancialHealthScore({
  totalIncome,
  totalExpense,
  balance,
}: FinancialHealthScoreProps) {
  // Savings rate
  const savingsRate = totalIncome > 0 ? Math.max(0, Math.round(((totalIncome - totalExpense) / totalIncome) * 100)) : 0;

  // Compute a comprehensive financial health score (0 - 100)
  let score = 50;
  if (totalIncome === 0 && totalExpense === 0) {
    score = 50;
  } else if (totalIncome === 0 && totalExpense > 0) {
    score = 15;
  } else {
    // 50 base + savingsRate contribution (up to 40) + balance buffer (up to 10)
    const savingsComponent = Math.min(40, (savingsRate / 50) * 40);
    const balanceComponent = balance > 0 ? Math.min(10, (balance / totalIncome) * 10) : -15;
    score = Math.max(5, Math.min(100, Math.round(50 + savingsComponent + balanceComponent)));
  }

  let statusText = "সতর্ক থাকুন (Needs Attention)";
  let statusColor = "text-amber-500 bg-amber-500/10 border-amber-500/20";
  let ringColor = "from-amber-500 to-orange-500";

  if (score >= 80) {
    statusText = "অসাধারণ অর্থনৈতিক অবস্থা (Excellent)";
    statusColor = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    ringColor = "from-emerald-500 to-teal-400";
  } else if (score >= 60) {
    statusText = "ভালো ও স্থিতিশীল (Good & Stable)";
    statusColor = "text-indigo-500 bg-indigo-500/10 border-indigo-500/20";
    ringColor = "from-indigo-500 to-cyan-400";
  } else if (score < 40) {
    statusText = "উদ্বেগজনক মাত্রা (Critical Alert)";
    statusColor = "text-rose-500 bg-rose-500/10 border-rose-500/20";
    ringColor = "from-rose-500 to-red-600";
  }

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/20">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              ফাইন্যান্সিয়াল হেলথ স্কোর
              <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-300 font-semibold">
                Health Meter
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              আপনার সঞ্চয় ও ব্যয়ের অনুপাতের স্বয়ংক্রিয় নিরীক্ষা
            </p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColor}`}>
          {score}/100
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Score Circular Progress Visual */}
        <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-slate-200 dark:stroke-slate-700"
                strokeWidth="10"
                fill="transparent"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                className={`stroke-current bg-gradient-to-r ${ringColor}`}
                strokeWidth="10"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * score) / 100}
                strokeLinecap="round"
                fill="transparent"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 - (251.2 * score) / 100 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-slate-800 dark:text-white">
                {score}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">স্কোর</span>
            </div>
          </div>
          <p className="mt-2 text-xs font-medium text-center text-slate-600 dark:text-slate-300">
            {statusText}
          </p>
        </div>

        {/* Breakdown Stats */}
        <div className="md:col-span-2 space-y-3">
          <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-white/5">
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
              <span>সঞ্চয়ের হার (Savings Rate)</span>
              <span className="text-teal-600 dark:text-teal-400 font-bold">{savingsRate}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, savingsRate)}%` }}
                transition={{ duration: 0.8 }}
                className="h-full bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full"
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              {savingsRate >= 20 ? "✓ আদর্শ মান ২০% এর উপরে রয়েছে।" : "লক্ষ্য রাখুন অন্তত ২০% আয় সঞ্চয় করার।"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">নেট অবশিষ্ট ব্যালেন্স</span>
              <span className={`text-base font-extrabold ${balance >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"}`}>
                ৳ {balance.toLocaleString()}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">ব্যয়-আয় অনুপাত</span>
              <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                {totalIncome > 0 ? ((totalExpense / totalIncome) * 100).toFixed(0) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
