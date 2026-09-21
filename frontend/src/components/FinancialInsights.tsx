"use client";

import React from "react";
import { Sparkles, Lightbulb, TrendingDown, AlertCircle, Award, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface FinancialInsightsProps {
  totalIncome: number;
  totalExpense: number;
  expensesByCategory: Record<string, number>;
}

export default function FinancialInsights({
  totalIncome,
  totalExpense,
  expensesByCategory
}: FinancialInsightsProps) {
  const insights: {
    id: string;
    type: "positive" | "warning" | "tip";
    title: string;
    description: string;
  }[] = [];

  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;
  const foodSpend = expensesByCategory["food"] || 0;
  const foodPercentage = totalExpense > 0 ? (foodSpend / totalExpense) * 100 : 0;
  const shoppingSpend = expensesByCategory["shopping"] || 0;
  const shoppingPercentage = totalExpense > 0 ? (shoppingSpend / totalExpense) * 100 : 0;

  // 1. Savings rate rule
  if (savingsRate >= 25) {
    insights.push({
      id: "sav-high",
      type: "positive",
      title: "চমৎকার সঞ্চয় প্রবণতা!",
      description: `আপনার সঞ্চয়ের হার ${savingsRate.toFixed(0)}%, যা ৫০-৩০-২০ নিয়মের ২০% সঞ্চয় লক্ষ্যমাত্রার চেয়েও বেশি।`
    });
  } else if (savingsRate < 10 && totalIncome > 0) {
    insights.push({
      id: "sav-low",
      type: "warning",
      title: "সঞ্চয়ের হার কম রয়েছে",
      description: `বর্তমানে আপনার সঞ্চয় মাত্র ${savingsRate.toFixed(0)}%। অন্তত ১৫% সঞ্চয় নিশ্চিত করতে অপ্রয়োজনীয় খরচ কমানোর চেষ্টা করুন।`
    });
  }

  // 2. Food category spike
  if (foodPercentage > 40) {
    insights.push({
      id: "food-high",
      type: "warning",
      title: "খাবার খাতে খরচের চাপ বেশি",
      description: `আপনার মোট খরচের ${foodPercentage.toFixed(0)}% খাবার খাতে ব্যয় হয়েছে। বাইরের খাবার বা রেস্তোরাঁ কমালে উল্লেখযোগ্য টাকা বাঁচানো সম্ভব।`
    });
  }

  // 3. Shopping category spike
  if (shoppingPercentage > 25) {
    insights.push({
      id: "shop-high",
      type: "tip",
      title: "শপিং ও কেনাকাটা নিয়ন্ত্রণ টিপস",
      description: `মোট খরচের ${shoppingPercentage.toFixed(0)}% শপিংয়ে ব্যয় হয়েছে। কেনাকাটার পূর্বে ৪৮ ঘণ্টার 'অপেক্ষা নিয়ম' (48-hour rule) মেনে চলতে পারেন।`
    });
  }

  // 4. Emergency runway tip
  insights.push({
    id: "emergency-fund",
    type: "tip",
    title: "৩-৬ মাসের ইমার্জেন্সি ফান্ড গড়ে তুলুন",
    description: "যেকোনো অপ্রত্যাশিত চিকিৎসা বা জরুরি পরিস্থিতির জন্য আপনার মাসিক মোট খরচের ৩ গুণের সমপরিমাণ টাকা আলাদা অ্যাকাউন্টে রাখুন।"
  });

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              স্মার্ট আর্থিক পরামর্শ (AI Insights)
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 font-semibold">
                Smart Tips
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ব্যয়ের ধরন বিশ্লেষণ করে স্বয়ংক্রিয় সুপরামর্শ
            </p>
          </div>
        </div>

        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
          {insights.length} টি টিপস
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {insights.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-4 rounded-2xl border transition-all ${
              item.type === "positive"
                ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-950 dark:text-emerald-100"
                : item.type === "warning"
                ? "bg-amber-500/5 border-amber-500/20 text-amber-950 dark:text-amber-100"
                : "bg-indigo-500/5 border-indigo-500/20 text-indigo-950 dark:text-indigo-100"
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              {item.type === "positive" && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
              {item.type === "warning" && <AlertCircle className="h-4 w-4 text-amber-500" />}
              {item.type === "tip" && <Lightbulb className="h-4 w-4 text-indigo-500" />}
              <h4 className="text-xs font-bold text-slate-800 dark:text-white">{item.title}</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
