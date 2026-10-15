"use client";

import React, { useState } from "react";
import { PieChart as PieIcon } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryDonutChartProps {
  expensesByCategory: Record<string, number>;
  totalExpense: number;
}

const CATEGORY_META: Record<string, { label: string; color: string }> = {
  food: { label: "খাবার (Food)", color: "#4f46e5" },
  rent: { label: "বাসা ভাড়া (Rent)", color: "#6366f1" },
  bills: { label: "ইউটিলিটি বিল (Bills)", color: "#818cf8" },
  shopping: { label: "শপিং (Shopping)", color: "#a5b4fc" },
  transport: { label: "যাতায়াত (Transport)", color: "#475569" },
  entertainment: { label: "বিনোদন (Entertainment)", color: "#64748b" },
  others: { label: "অন্যান্য (Others)", color: "#94a3b8" }
};

export default function CategoryDonutChart({ expensesByCategory, totalExpense }: CategoryDonutChartProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const entries = Object.entries(expensesByCategory).filter(([_, amount]) => amount > 0);

  // SVG parameters
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let cumulativeOffset = 0;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 p-6 shadow-sm bg-white dark:bg-slate-900/60 backdrop-blur-md">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800/60">
            <PieIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              খাতভিত্তিক খরচের চার্ট
              <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold">
                Analytics
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              কোন খাতে কত শতাংশ ব্যয় হয়েছে তার নিখুঁত চিত্র
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          মোট: ৳{totalExpense.toLocaleString()}
        </span>
      </div>

      {entries.length === 0 ? (
        <div className="py-12 text-center text-slate-400 text-xs">
          কোনো খরচের ডেটা পাওয়া যায়নি।
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
          {/* Donut Visual */}
          <div className="relative flex items-center justify-center">
            <svg className="w-48 h-48 -rotate-90" viewBox="0 0 160 160">
              {entries.map(([cat, amount]) => {
                const ratio = totalExpense > 0 ? amount / totalExpense : 0;
                const dashLength = ratio * circumference;
                const currentOffset = cumulativeOffset;
                cumulativeOffset += dashLength;
                const color = CATEGORY_META[cat]?.color || "#a855f7";
                const isHovered = activeCategory === cat;

                return (
                  <circle
                    key={cat}
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="transparent"
                    stroke={color}
                    strokeWidth={isHovered ? 24 : 18}
                    strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                    strokeDashoffset={-currentOffset}
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setActiveCategory(cat)}
                    onMouseLeave={() => setActiveCategory(null)}
                  />
                );
              })}
            </svg>

            <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-xs font-semibold text-slate-400">
                {activeCategory ? CATEGORY_META[activeCategory]?.label.split(" ")[0] : "মোট ব্যয়"}
              </span>
              <span className="text-base font-black text-slate-800 dark:text-white">
                {activeCategory
                  ? `৳${(expensesByCategory[activeCategory] || 0).toLocaleString()}`
                  : `৳${totalExpense.toLocaleString()}`}
              </span>
            </div>
          </div>

          {/* Legend Items */}
          <div className="space-y-2">
            {entries.map(([cat, amount]) => {
              const meta = CATEGORY_META[cat] || { label: cat, color: "#64748b" };
              const percentage = totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0;
              const isHovered = activeCategory === cat;

              return (
                <div
                  key={cat}
                  onMouseEnter={() => setActiveCategory(cat)}
                  onMouseLeave={() => setActiveCategory(null)}
                  className={`flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer ${
                    isHovered
                      ? "bg-slate-100 dark:bg-slate-800 scale-[1.02]"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: meta.color }}
                    />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      {meta.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-extrabold text-slate-800 dark:text-white">
                      ৳{amount.toLocaleString()}
                    </span>
                    <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-slate-200/60 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold">
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
