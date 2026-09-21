"use client";

import React, { useState } from "react";
import { Target, AlertTriangle, CheckCircle2, Edit2, Plus, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface BudgetGoalTrackerProps {
  expensesByCategory: Record<string, number>;
}

interface CategoryBudget {
  category: string;
  label: string;
  limit: number;
}

const DEFAULT_BUDGETS: CategoryBudget[] = [
  { category: "food", label: "খাবার (Food)", limit: 8000 },
  { category: "rent", label: "বাসা ভাড়া (Rent)", limit: 15000 },
  { category: "bills", label: "ইউটিলিটি বিল (Bills)", limit: 3500 },
  { category: "shopping", label: "শপিং (Shopping)", limit: 4000 },
  { category: "transport", label: "যাতায়াত (Transport)", limit: 2500 },
  { category: "entertainment", label: "বিনোদন (Entertainment)", limit: 2000 },
  { category: "others", label: "অন্যান্য (Others)", limit: 3000 }
];

export default function BudgetGoalTracker({ expensesByCategory }: BudgetGoalTrackerProps) {
  const [budgets, setBudgets] = useState<CategoryBudget[]>(DEFAULT_BUDGETS);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [tempLimit, setTempLimit] = useState<string>("");

  const handleStartEdit = (item: CategoryBudget) => {
    setEditingCategory(item.category);
    setTempLimit(item.limit.toString());
  };

  const handleSaveEdit = (category: string) => {
    const val = parseFloat(tempLimit);
    if (!isNaN(val) && val >= 0) {
      setBudgets((prev) =>
        prev.map((b) => (b.category === category ? { ...b, limit: val } : b))
      );
    }
    setEditingCategory(null);
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpentInTracked = budgets.reduce((sum, b) => sum + (expensesByCategory[b.category] || 0), 0);
  const totalPercentage = totalBudget > 0 ? Math.min(100, Math.round((totalSpentInTracked / totalBudget) * 100)) : 0;

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              বাজেট লিমিট ও গোল ট্র্যাকার
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-300 font-semibold">
                Monthly Target
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              খাতভিত্তিক খরচের সীমা নির্ধারণ ও সতর্কতা পর্যবেক্ষণ
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 block">মোট বাজেট ব্যবহৃত</span>
          <span className="text-sm font-extrabold text-slate-800 dark:text-white">
            {totalPercentage}%
          </span>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800">
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="font-semibold text-slate-600 dark:text-slate-300">
            সর্বমোট খরচ: ৳ {totalSpentInTracked.toLocaleString()} / বাজেট: ৳ {totalBudget.toLocaleString()}
          </span>
          <span className={`font-bold ${totalSpentInTracked > totalBudget ? "text-rose-500" : "text-emerald-500"}`}>
            {totalSpentInTracked > totalBudget ? "বাজেট সীমা ছাড়িয়েছে!" : `৳ ${(totalBudget - totalSpentInTracked).toLocaleString()} বাকি আছে`}
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, totalPercentage)}%` }}
            transition={{ duration: 0.8 }}
            className={`h-full rounded-full ${
              totalPercentage > 90
                ? "bg-rose-500"
                : totalPercentage > 75
                ? "bg-amber-500"
                : "bg-gradient-to-r from-indigo-500 to-emerald-400"
            }`}
          />
        </div>
      </div>

      {/* Individual Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {budgets.map((item) => {
          const spent = expensesByCategory[item.category] || 0;
          const percentage = item.limit > 0 ? Math.round((spent / item.limit) * 100) : 0;
          const isOver = spent > item.limit;
          const isNear = percentage >= 80 && !isOver;

          return (
            <div
              key={item.category}
              className="p-3.5 rounded-2xl border border-slate-200/60 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/30 hover:border-slate-300 dark:hover:border-white/10 transition-all"
            >
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  {item.label}
                </span>

                {editingCategory === item.category ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={tempLimit}
                      onChange={(e) => setTempLimit(e.target.value)}
                      className="w-16 px-1.5 py-0.5 text-xs rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveEdit(item.category)}
                      className="px-2 py-0.5 text-[11px] rounded bg-indigo-600 text-white font-medium"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleStartEdit(item)}
                    className="text-[11px] text-slate-400 hover:text-indigo-500 flex items-center gap-1"
                    title="বাজেট সীমা পরিবর্তন করুন"
                  >
                    <span>৳ {item.limit.toLocaleString()}</span>
                    <Edit2 className="h-3 w-3" />
                  </button>
                )}
              </div>

              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mb-1.5">
                <div
                  style={{ width: `${Math.min(100, percentage)}%` }}
                  className={`h-full rounded-full transition-all duration-500 ${
                    isOver ? "bg-rose-500" : isNear ? "bg-amber-500" : "bg-indigo-500"
                  }`}
                />
              </div>

              <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400">
                <span>খরচ: ৳ {spent.toLocaleString()} ({percentage}%)</span>
                {isOver && (
                  <span className="text-rose-500 font-bold flex items-center gap-0.5">
                    <AlertTriangle className="h-3 w-3" /> অতিরিক্ত!
                  </span>
                )}
                {isNear && (
                  <span className="text-amber-500 font-medium">৮০% শেষ</span>
                )}
                {!isOver && !isNear && (
                  <span className="text-emerald-500">নিরাপদ</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
