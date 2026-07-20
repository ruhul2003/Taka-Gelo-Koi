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

      {/* Footer */}
      <footer className="border-t border-slate-900 py-12 px-6 bg-slate-950/60">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-slate-900 p-2 border border-slate-800">
              <Wallet className="h-5 w-5 text-indigo-400" />
            </div>
            <span className="bengali-title text-xl font-bold tracking-wider text-slate-200">
              Taka Gelo Koi
            </span>
          </div>
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Taka Gelo Koi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
