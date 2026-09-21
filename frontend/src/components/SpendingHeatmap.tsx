"use client";

import React from "react";
import { Calendar, Flame, CheckCircle, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

interface SpendingHeatmapProps {
  transactions: Array<{
    amount: number;
    type: "income" | "expense";
    date: string | Date;
  }>;
}

export default function SpendingHeatmap({ transactions }: SpendingHeatmapProps) {
  // Aggregate expenses by day of the current month
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const dailyExpenses: Record<number, number> = {};
  for (let d = 1; d <= daysInMonth; d++) {
    dailyExpenses[d] = 0;
  }

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const d = new Date(t.date);
      if (d.getFullYear() === currentYear && d.getMonth() === currentMonth) {
        const dayNum = d.getDate();
        dailyExpenses[dayNum] = (dailyExpenses[dayNum] || 0) + t.amount;
      }
    });

  const monthNames = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];

  // Calculate no-spend days & streak
  let noSpendDays = 0;
  for (let d = 1; d <= now.getDate(); d++) {
    if (dailyExpenses[d] === 0) noSpendDays++;
  }

  const getHeatmapColor = (amount: number, day: number) => {
    if (day > now.getDate()) {
      return "bg-slate-100 dark:bg-slate-800/40 text-slate-400 opacity-40";
    }
    if (amount === 0) {
      return "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30";
    }
    if (amount < 500) {
      return "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30";
    }
    if (amount < 2000) {
      return "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30";
    }
    return "bg-rose-500/25 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-bold";
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/20">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              দৈনিক ব্যয়ের হিটম্যাপ ও স্ট্রিক
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-300 font-semibold">
                Heatmap
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {monthNames[currentMonth]} {currentYear} এর প্রতিদিনের খরচের ঘনত্ব
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
            <CheckCircle className="h-3.5 w-3.5" />
            <span>{noSpendDays} দিন জিরো-খরচ</span>
          </div>
        </div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const day = idx + 1;
          const amt = dailyExpenses[day] || 0;
          const isToday = day === now.getDate();

          return (
            <motion.div
              key={day}
              whileHover={{ scale: 1.05 }}
              className={`p-2 rounded-xl text-center text-xs flex flex-col items-center justify-center transition-all min-h-[48px] ${getHeatmapColor(
                amt,
                day
              )} ${isToday ? "ring-2 ring-indigo-500 ring-offset-1 dark:ring-offset-slate-900" : ""}`}
              title={`${day} তারিখ: ৳${amt.toLocaleString()} খরচ`}
            >
              <span className="text-[10px] font-medium text-slate-400 dark:text-slate-400">{day}</span>
              <span className="text-[11px] font-extrabold truncate max-w-full">
                {amt > 0 ? `৳${amt >= 1000 ? (amt / 1000).toFixed(1) + "k" : amt}` : "০"}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <span>লেভেল:</span>
          <span className="inline-block w-3 h-3 rounded bg-emerald-500/30"></span> জিরো
          <span className="inline-block w-3 h-3 rounded bg-cyan-500/30"></span> কম (&lt;৫০০)
          <span className="inline-block w-3 h-3 rounded bg-indigo-500/30"></span> মাঝারি
          <span className="inline-block w-3 h-3 rounded bg-rose-500/30"></span> বেশি (&gt;২,০০০)
        </div>
        <span>আজকের তারিখ চিহ্নিত</span>
      </div>
    </div>
  );
}
