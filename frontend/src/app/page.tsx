"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import LandingNavbar from "@/components/LandingNavbar";
import { 
  ArrowRight, 
  ShieldCheck, 
  PieChart, 
  Sparkles, 
  TrendingUp,
  Wallet,
  Coins,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Star,
  ChevronDown,
  CreditCard,
  DollarSign,
  Receipt,
  Target,
  Lock
} from "lucide-react";

export default function LandingPage() {
  const [demoType, setDemoType] = useState<"income" | "expense">("expense");
  const [demoAmount, setDemoAmount] = useState("2000");
  const [demoCategory, setDemoCategory] = useState("food");
  const [demoList, setDemoList] = useState([
    { id: 1, type: "income", category: "salary", amount: 15000, desc: "Part-time Tuition" },
    { id: 2, type: "expense", category: "food", amount: 1200, desc: "Weekly Groceries" },
  ]);
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const addDemoItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoAmount || parseFloat(demoAmount) <= 0) return;
    const newItem = {
      id: Date.now(),
      type: demoType,
      category: demoCategory,
      amount: parseFloat(demoAmount),
      desc: demoType === "income" ? "Payment Received" : "Expense Detail"
    };
    setDemoList([newItem, ...demoList]);
    setDemoAmount("");
  };

  const demoIncome = demoList.filter(d => d.type === "income").reduce((s, i) => s + i.amount, 0);
  const demoExpense = demoList.filter(d => d.type === "expense").reduce((s, e) => s + e.amount, 0);
  const demoBalance = demoIncome - demoExpense;

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: any = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const faqs = [
    { q: "Is Taka Gelo Koi app completely free?", a: "Yes, the basic tracking features of Taka Gelo Koi are completely free for all users." },
    { q: "How does the admin panel work?", a: "The admin panel monitors total users and aggregate transactions. A secret key is required to access it." },
    { q: "My financial data is how much safe?", a: "All your data is secure in your session. Better Auth secures sessions and passwords using modern encryption." }
  ];

  return (
    <>

      {/* Hero Section - Full Screen with Random Scattered Finance Constellation */}
      <section className="relative z-10 mx-auto max-w-[1440px] w-full px-4 xl:px-12 min-h-[calc(100vh-120px)] flex flex-col items-center justify-center text-center py-12 overflow-hidden">
        {/* Ambient Glowing Orbs Background */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-violet-600/20 via-indigo-600/20 to-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

        {/* Scattered Item 1: Income Badge (Top Far Left) */}
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [-7, 3, -7] }}
          whileHover={{ x: 18, y: -22, scale: 1.08, rotate: 10, transition: { type: "spring", stiffness: 200, damping: 12 } }}
          transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
          className="hidden xl:flex absolute top-[6%] left-[2%] items-center gap-3 glass-panel px-4 py-3 rounded-2xl border border-emerald-500/30 shadow-xl shadow-emerald-500/10 backdrop-blur-xl z-20 cursor-pointer"
        >
          <div className="rounded-xl bg-emerald-500/20 p-2.5 text-emerald-400">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">নতুন আয় যোগ</p>
            <p className="text-sm font-extrabold text-emerald-400">+১৫,০০০ ৳</p>
          </div>
        </motion.div>

        {/* Scattered Item 2: Credit Card Icon (Top Mid Left) */}
        <motion.div
          animate={{ y: [0, 16, 0], rotate: [14, -6, 14] }}
          whileHover={{ x: -24, y: -16, scale: 1.12, rotate: -18, transition: { type: "spring", stiffness: 180, damping: 10 } }}
          transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.2 }}
          className="hidden lg:flex absolute top-[16%] left-[19%] rounded-2xl bg-indigo-500/15 border border-indigo-500/30 p-3.5 text-indigo-400 backdrop-blur-md shadow-xl z-10 cursor-pointer"
        >
          <CreditCard className="h-6 w-6" />
        </motion.div>

        {/* Scattered Item 3: Coins Icon (Top Upper Center Right) */}
        <motion.div
          animate={{ y: [0, -14, 0], rotate: [-12, 8, -12] }}
          whileHover={{ x: 20, y: -28, scale: 1.15, rotate: 22, transition: { type: "spring", stiffness: 220, damping: 14 } }}
          transition={{ repeat: Infinity, duration: 5.4, ease: "easeInOut", delay: 0.7 }}
          className="hidden lg:flex absolute top-[5%] right-[28%] rounded-2xl bg-amber-500/15 border border-amber-500/30 p-3.5 text-amber-400 backdrop-blur-md shadow-xl z-10 cursor-pointer"
        >
          <Coins className="h-6 w-6" />
        </motion.div>

        {/* Scattered Item 4: Savings Badge (Top Far Right) */}
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [6, -3, 6] }}
          whileHover={{ x: -20, y: 18, scale: 1.09, rotate: -12, transition: { type: "spring", stiffness: 200, damping: 11 } }}
          transition={{ repeat: Infinity, duration: 4.6, ease: "easeInOut", delay: 0.4 }}
          className="hidden xl:flex absolute top-[12%] right-[1%] items-center gap-3 glass-panel px-4 py-3 rounded-2xl border border-violet-500/30 shadow-xl shadow-violet-500/10 backdrop-blur-xl z-20 cursor-pointer"
        >
          <div className="rounded-xl bg-violet-500/20 p-2.5 text-violet-400">
            <Wallet className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">মাসিক সেভিংস</p>
            <p className="text-sm font-extrabold text-violet-400">৮৫% টার্গেট অর্জিত</p>
          </div>
        </motion.div>

        {/* Scattered Item 5: Dollar Icon (Middle Far Left) */}
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [4, -8, 4] }}
          whileHover={{ x: 30, y: 20, scale: 1.13, rotate: 15, transition: { type: "spring", stiffness: 190, damping: 10 } }}
          transition={{ repeat: Infinity, duration: 5.1, ease: "easeInOut", delay: 1.1 }}
          className="hidden lg:flex absolute top-[40%] left-[4%] rounded-2xl bg-emerald-500/15 border border-emerald-500/30 p-3.5 text-emerald-400 backdrop-blur-md shadow-xl z-10 cursor-pointer"
        >
          <DollarSign className="h-6 w-6" />
        </motion.div>

        {/* Scattered Item 6: Receipt Icon (Middle Right Outer) */}
        <motion.div
          animate={{ y: [0, 14, 0], rotate: [-18, 5, -18] }}
          whileHover={{ x: -26, y: -20, scale: 1.1, rotate: 20, transition: { type: "spring", stiffness: 210, damping: 13 } }}
          transition={{ repeat: Infinity, duration: 4.7, ease: "easeInOut", delay: 1.5 }}
          className="hidden lg:flex absolute top-[35%] right-[12%] rounded-2xl bg-rose-500/15 border border-rose-500/30 p-3.5 text-rose-400 backdrop-blur-md shadow-xl z-10 cursor-pointer"
        >
          <Receipt className="h-6 w-6" />
        </motion.div>

        {/* Scattered Item 7: Briefcase Icon (Lower Mid Left) */}
        <motion.div
          animate={{ y: [0, -13, 0], rotate: [15, -4, 15] }}
          whileHover={{ x: 22, y: -24, scale: 1.14, rotate: -20, transition: { type: "spring", stiffness: 230, damping: 12 } }}
          transition={{ repeat: Infinity, duration: 5.3, ease: "easeInOut", delay: 0.9 }}
          className="hidden lg:flex absolute top-[62%] left-[21%] rounded-2xl bg-blue-500/15 border border-blue-500/30 p-3.5 text-blue-400 backdrop-blur-md shadow-xl z-10 cursor-pointer"
        >
          <Briefcase className="h-6 w-6" />
        </motion.div>

        {/* Scattered Item 8: Target Icon (Lower Mid Right) */}
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [-10, 6, -10] }}
          whileHover={{ x: -18, y: 26, scale: 1.11, rotate: 16, transition: { type: "spring", stiffness: 200, damping: 11 } }}
          transition={{ repeat: Infinity, duration: 4.9, ease: "easeInOut", delay: 1.3 }}
          className="hidden lg:flex absolute bottom-[26%] right-[25%] rounded-2xl bg-cyan-500/15 border border-cyan-500/30 p-3.5 text-cyan-400 backdrop-blur-md shadow-xl z-10 cursor-pointer"
        >
          <Target className="h-6 w-6" />
        </motion.div>

        {/* Scattered Item 9: Analytics Badge (Bottom Far Left) */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [-4, 6, -4] }}
          whileHover={{ x: 24, y: -18, scale: 1.08, rotate: -10, transition: { type: "spring", stiffness: 195, damping: 12 } }}
          transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 1.0 }}
          className="hidden xl:flex absolute bottom-[14%] left-[3%] items-center gap-3 glass-panel px-4 py-3 rounded-2xl border border-indigo-500/30 shadow-xl shadow-indigo-500/10 backdrop-blur-xl z-20 cursor-pointer"
        >
          <div className="rounded-xl bg-indigo-500/20 p-2.5 text-indigo-400">
            <PieChart className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">স্মার্ট রিপোর্ট</p>
            <p className="text-sm font-extrabold text-indigo-300">পাই-চার্ট ট্র্যাকিং</p>
          </div>
        </motion.div>

        {/* Scattered Item 10: Lock Icon (Bottom Mid Center-Left) */}
        <motion.div
          animate={{ y: [0, -16, 0], rotate: [8, -12, 8] }}
          whileHover={{ x: -28, y: 22, scale: 1.16, rotate: 18, transition: { type: "spring", stiffness: 220, damping: 10 } }}
          transition={{ repeat: Infinity, duration: 4.4, ease: "easeInOut", delay: 1.7 }}
          className="hidden lg:flex absolute bottom-[8%] left-[28%] rounded-2xl bg-purple-500/15 border border-purple-500/30 p-3.5 text-purple-400 backdrop-blur-md shadow-xl z-10 cursor-pointer"
        >
          <Lock className="h-6 w-6" />
        </motion.div>

        {/* Scattered Item 11: Security Badge (Bottom Far Right) */}
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [4, -3, 4] }}
          whileHover={{ x: -22, y: -26, scale: 1.09, rotate: 14, transition: { type: "spring", stiffness: 205, damping: 11 } }}
          transition={{ repeat: Infinity, duration: 4.4, ease: "easeInOut", delay: 1.4 }}
          className="hidden xl:flex absolute bottom-[6%] right-[2%] items-center gap-3 glass-panel px-4 py-3 rounded-2xl border border-blue-500/30 shadow-xl shadow-blue-500/10 backdrop-blur-xl z-20 cursor-pointer"
        >
          <div className="rounded-xl bg-blue-500/20 p-2.5 text-blue-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">এনক্রিপ্টেড ডাটা</p>
            <p className="text-sm font-extrabold text-blue-400">১০০% তথ্য সুরক্ষা</p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 my-auto z-10"
        >
          {/* Tag */}
          <motion.div 
            variants={itemVariants} 
            className="flex items-center gap-2 rounded-full bg-indigo-950/60 border border-indigo-800/50 px-4 py-1.5 text-sm font-medium text-indigo-300 backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>স্মার্ট ফাইন্যান্স ট্র্যাকিং সিস্টেম</span>
          </motion.div>

          {/* Bengali Stylish Title */}
          <motion.h1 
            variants={itemVariants}
            className="bengali-title max-w-4xl text-5xl sm:text-7xl font-black leading-[1.15] tracking-tight"
          >
            আপনার প্রতিদিনের হিসাব, <br />
            <span className="bg-gradient-to-r from-violet-700 via-indigo-600 to-blue-600 dark:from-violet-400 dark:via-indigo-300 dark:to-cyan-400 bg-clip-text text-transparent">
              নিরাপদ ও সহজ
            </span> উপায়ে।
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="max-w-2xl text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed"
          >
            দৈনন্দিন খরচ, ব্যবসার লাভ-ক্ষতি অথবা শিক্ষার্থীদের পড়াশোনার খরচের হিসাব আলাদা আলাদা ড্যাশবোর্ডে ট্র্যাক করুন পেশাদার অ্যানালিটিক্স সহ।
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="mt-4 flex flex-wrap gap-4 justify-center"
          >
            <Link 
              href="/signup" 
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-indigo-500/20 transition-all duration-300 hover:scale-[1.03]"
            >
              <span>হিসাব রাখা শুরু করুন</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/login" 
              className="rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 dark:hover:border-slate-700 dark:text-white px-8 py-4 text-base font-bold transition-all duration-300"
            >
              ড্যাশবোর্ডে প্রবেশ করুন
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Dashboard Features Grid */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 border-t border-slate-900">
        <div className="text-center mb-16">
          <h2 className="bengali-title text-3xl sm:text-4xl font-extrabold">3 Different Dashboard Options</h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">Pre-built dashboards designed to analyze spending trends for every area of your life.</p>
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

      {/* Live Demo Widget / Quick Calculator */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 border-t border-slate-900">
        <div className="text-center mb-12">
          <h2 className="bengali-title text-3xl sm:text-4xl font-extrabold">Try It Live (Live Demo)</h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto">See how our tracking system works before creating an account.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 max-w-5xl mx-auto">
          {/* Demo input */}
          <div className="glass-panel rounded-2xl p-6 h-fit">
            <h4 className="bengali-title text-lg font-bold mb-4 text-slate-200">হিসাবটি এন্ট্রি করুন</h4>
            <form onSubmit={addDemoItem} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">ধরণ</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDemoType("expense")}
                    className={`rounded-xl border py-2 text-xs font-bold transition-all ${
                      demoType === "expense"
                        ? "border-rose-500 bg-rose-950/20 text-rose-400"
                        : "border-slate-800 bg-slate-900/40 text-slate-400"
                    }`}
                  >
                    খরচ (Cost)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDemoType("income")}
                    className={`rounded-xl border py-2 text-xs font-bold transition-all ${
                      demoType === "income"
                        ? "border-emerald-500 bg-emerald-950/20 text-emerald-400"
                        : "border-slate-800 bg-slate-900/40 text-slate-400"
                    }`}
                  >
                    আয় (Income)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">পরিমাণ (৳)</label>
                <input
                  type="number"
                  required
                  value={demoAmount}
                  onChange={(e) => setDemoAmount(e.target.value)}
                  placeholder="টাকার পরিমাণ লিখুন"
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-sm text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-2.5 text-sm font-bold text-white shadow"
              >
                যোগ করুন
              </button>
            </form>
          </div>

          {/* Demo logs & summaries */}
          <div className="lg:col-span-2 glass-panel rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h4 className="bengali-title text-lg font-bold text-slate-200">Demo Ledger</h4>
                <div className="flex gap-4 text-xs font-semibold">
                  <span className="text-emerald-400">Income: {demoIncome.toLocaleString()}৳</span>
                  <span className="text-rose-400">Expense: {demoExpense.toLocaleString()}৳</span>
                </div>
              </div>

              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                {demoList.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-between items-center rounded-xl bg-slate-900/40 border border-slate-800/80 px-4 py-2.5 text-sm"
                  >
                    <span className="text-slate-300 font-semibold">{item.desc}</span>
                    <span className={`font-bold ${item.type === "income" ? "text-emerald-400" : "text-rose-400"}`}>
                      {item.type === "income" ? "+" : "-"}{item.amount.toLocaleString()} ৳
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400">Remaining Balance:</span>
              <span className={`text-xl font-extrabold ${demoBalance >= 0 ? "text-indigo-400" : "text-rose-400"}`}>
                {demoBalance.toLocaleString()} ৳
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* User Reviews Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 border-t border-slate-900">
        <div className="text-center mb-16">
          <h2 className="bengali-title text-3xl sm:text-4xl font-extrabold">User Testimonials</h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">Hear from users who successfully controlled their expenses using Taka Gelo Koi.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed italic">
              &quot;I used to struggle balancing my mess food costs and pocket money every month. Now everything is in one place.&quot;
            </p>
            <div className="mt-auto">
              <h5 className="text-xs font-bold text-slate-100">Rakib Hossain</h5>
              <span className="text-[10px] text-slate-500 font-semibold">Student, University of Dhaka</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed italic">
              &quot;It plays a wonderful role in matching revenue and courier costs for my online clothing store.&quot;
            </p>
            <div className="mt-auto">
              <h5 className="text-xs font-bold text-slate-100">Fariha Akhter</h5>
              <span className="text-[10px] text-slate-500 font-semibold">F-Commerce Entrepreneur</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed italic">
              &quot;This dashboard helped me identify the exact flow of my family&apos;s monthly groceries and utility bills.&quot;
            </p>
            <div className="mt-auto">
              <h5 className="text-xs font-bold text-slate-100">Mahmud Hasan</h5>
              <span className="text-[10px] text-slate-500 font-semibold">Software Engineer</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-20 border-t border-slate-900">
        <div className="text-center mb-12">
          <h2 className="bengali-title text-3xl sm:text-4xl font-extrabold">Frequently Asked Questions</h2>
          <p className="mt-3 text-slate-400">Find answers to common questions about Taka Gelo Koi below.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = !!faqOpen[index];
            return (
              <div 
                key={index} 
                className="glass-panel rounded-xl overflow-hidden border border-slate-900"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left font-bold text-slate-200 hover:text-slate-100 text-sm sm:text-base outline-none transition-colors"
                >
                  <span className="bengali-title">{faq.q}</span>
                  <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-900/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust & Safety Features */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 border-t border-slate-900">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h2 className="bengali-title text-3xl sm:text-4xl font-extrabold mb-6 leading-tight">
              Security and Role-Based <br />
              Sign-Up Approach
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 h-fit">
                  <ShieldCheck className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-200">Role-Based Access Control (RBAC)</h4>
                  <p className="text-slate-400 text-sm mt-1">You will be redirected to your specific category dashboard right after logging in.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 h-fit">
                  <PieChart className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-200">Real-Time Graphical Analytics</h4>
                  <p className="text-slate-400 text-sm mt-1">See your expense-to-income ratio directly through a beautiful animated interface.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-tr from-indigo-600/10 to-violet-600/10 border border-slate-800 p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
            <TrendingUp className="h-16 w-16 text-indigo-400 mb-6 animate-pulse" />
            <h3 className="bengali-title text-2xl font-extrabold text-slate-100">Saving Money is Now Easier!</h3>
            <p className="text-slate-400 text-sm max-w-sm mt-3 mb-6">
              Start tracking today and see where your money goes instantly.
            </p>
            <Link 
              href="/signup" 
              className="rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 px-6 py-3 text-sm font-semibold transition-all duration-300"
            >
              Create New Account
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
