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
          className="glass-panel backdrop-blur-md rounded-2xl p-8 flex flex-col gap-6"
        >
          <div className="rounded-xl bg-violet-100/60 border border-violet-200/50 p-4 w-fit dark:bg-violet-950/60 dark:border-violet-800/30">
            <Coins className="h-8 w-8 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h3 className="bengali-title text-2xl font-bold mb-2 text-violet-900 dark:text-violet-200">Daily Life Dashboard</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Track your daily groceries, rent, utilities, and transport costs. View your main expenses in a pie chart at the end of the month.
            </p>
          </div>
          <ul className="mt-auto space-y-2 text-sm text-slate-300">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-violet-600 dark:text-violet-400" /> Income & Expense Tracker</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-violet-600 dark:text-violet-400" /> Category-wise Pie Chart</li>
          </ul>
        </motion.div>

        {/* Card 2: Business */}
        <motion.div 
          whileHover={{ y: -8 }}
          className="glass-panel backdrop-blur-md rounded-2xl p-8 flex flex-col gap-6"
        >
          <div className="rounded-xl bg-blue-100/60 border border-blue-200/50 p-4 w-fit dark:bg-blue-950/60 dark:border-blue-800/30">
            <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="bengali-title text-2xl font-bold mb-2 text-blue-900 dark:text-blue-200">Business Dashboard</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Track your business revenue, sales, operational costs, profit margins, and client payments with precision.
            </p>
          </div>
          <ul className="mt-auto space-y-2 text-sm text-slate-300">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Profit & Loss Statement</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Revenue Filters</li>
          </ul>
        </motion.div>

        {/* Card 3: Study */}
        <motion.div 
          whileHover={{ y: -8 }}
          className="glass-panel backdrop-blur-md rounded-2xl p-8 flex flex-col gap-6"
        >
          <div className="rounded-xl bg-emerald-100/60 border border-emerald-200/50 p-4 w-fit dark:bg-emerald-950/60 dark:border-emerald-800/30">
            <GraduationCap className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="bengali-title text-2xl font-bold mb-2 text-emerald-900 dark:text-emerald-200">Education Dashboard</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Keep track of semester fees, books, rent, or pocket money. The budget alert system protects you from overspending.
            </p>
          </div>
          <ul className="mt-auto space-y-2 text-sm text-slate-300">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Study vs Pocket Money Breakdown</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Budget & Progress Bar Tracking</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
