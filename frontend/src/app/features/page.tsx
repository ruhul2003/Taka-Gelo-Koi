"use client";

import { Coins, Briefcase, GraduationCap, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="bengali-title text-4xl sm:text-5xl font-extrabold mb-4">3 Different Dashboard Options</h1>
        <p className="text-slate-400 max-w-xl mx-auto">Pre-built dashboards designed to analyze spending trends for every area of your life.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Card 1: Daily Life */}
        <motion.div
          whileHover={{ y: -8 }}
          className="relative overflow-hidden rounded-3xl p-8 flex flex-col gap-6 bg-purple-100/70 dark:bg-violet-950/40 backdrop-blur-xl border border-purple-200/80 dark:border-violet-800/50 shadow-md shadow-purple-500/5 dark:shadow-none transition-all duration-300"
        >
          <div className="rounded-2xl bg-purple-600 dark:bg-violet-500/20 border border-purple-600 dark:border-violet-500/30 p-4 w-fit shadow-md shadow-purple-600/30 dark:shadow-none">
            <Coins className="h-7 w-7 text-white dark:text-violet-300" />
          </div>
          <div>
            <h3 className="bengali-title text-2xl font-bold mb-2 text-purple-950 dark:text-violet-200">
              Daily Life Dashboard
            </h3>
            <p className="text-purple-900/80 dark:text-slate-300 text-sm leading-relaxed">
              Track your daily groceries, rent, utilities, and transport costs. View your main expenses in a pie chart at the end of the month.
            </p>
          </div>
          <ul className="mt-auto space-y-2.5 text-sm text-purple-950 dark:text-slate-200">
            <li className="flex items-center gap-2.5 font-semibold">
              <CheckCircle2 className="h-4.5 w-4.5 text-purple-700 dark:text-violet-400 shrink-0" />
              Income & Expense Tracker
            </li>
            <li className="flex items-center gap-2.5 font-semibold">
              <CheckCircle2 className="h-4.5 w-4.5 text-purple-700 dark:text-violet-400 shrink-0" />
              Category-wise Pie Chart
            </li>
          </ul>
        </motion.div>

        {/* Card 2: Business */}
        <motion.div
          whileHover={{ y: -8 }}
          className="relative overflow-hidden rounded-3xl p-8 flex flex-col gap-6 bg-blue-100/70 dark:bg-blue-950/40 backdrop-blur-xl border border-blue-200/80 dark:border-blue-800/50 shadow-md shadow-blue-500/5 dark:shadow-none transition-all duration-300"
        >
          <div className="rounded-2xl bg-blue-600 dark:bg-blue-500/20 border border-blue-600 dark:border-blue-500/30 p-4 w-fit shadow-md shadow-blue-600/30 dark:shadow-none">
            <Briefcase className="h-7 w-7 text-white dark:text-blue-300" />
          </div>
          <div>
            <h3 className="bengali-title text-2xl font-bold mb-2 text-blue-950 dark:text-blue-200">
              Business Dashboard
            </h3>
            <p className="text-blue-900/80 dark:text-slate-300 text-sm leading-relaxed">
              Track your business revenue, sales, operational costs, profit margins, and client payments with precision.
            </p>
          </div>
          <ul className="mt-auto space-y-2.5 text-sm text-blue-950 dark:text-slate-200">
            <li className="flex items-center gap-2.5 font-semibold">
              <CheckCircle2 className="h-4.5 w-4.5 text-blue-700 dark:text-blue-400 shrink-0" />
              Profit & Loss Statement
            </li>
            <li className="flex items-center gap-2.5 font-semibold">
              <CheckCircle2 className="h-4.5 w-4.5 text-blue-700 dark:text-blue-400 shrink-0" />
              Revenue Filters
            </li>
          </ul>
        </motion.div>

        {/* Card 3: Study */}
        <motion.div
          whileHover={{ y: -8 }}
          className="relative overflow-hidden rounded-3xl p-8 flex flex-col gap-6 bg-emerald-100/70 dark:bg-emerald-950/40 backdrop-blur-xl border border-emerald-200/80 dark:border-emerald-800/50 shadow-md shadow-emerald-500/5 dark:shadow-none transition-all duration-300"
        >
          <div className="rounded-2xl bg-emerald-600 dark:bg-emerald-500/20 border border-emerald-600 dark:border-emerald-500/30 p-4 w-fit shadow-md shadow-emerald-600/30 dark:shadow-none">
            <GraduationCap className="h-7 w-7 text-white dark:text-emerald-300" />
          </div>
          <div>
            <h3 className="bengali-title text-2xl font-bold mb-2 text-emerald-950 dark:text-emerald-200">
              Education Dashboard
            </h3>
            <p className="text-emerald-900/80 dark:text-slate-300 text-sm leading-relaxed">
              Keep track of semester fees, books, rent, or pocket money. The budget alert system protects you from overspending.
            </p>
          </div>
          <ul className="mt-auto space-y-2.5 text-sm text-emerald-950 dark:text-slate-200">
            <li className="flex items-center gap-2.5 font-semibold">
              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
              Study vs Pocket Money Breakdown
            </li>
            <li className="flex items-center gap-2.5 font-semibold">
              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
              Budget & Progress Bar Tracking
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
