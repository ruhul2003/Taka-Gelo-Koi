"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  ChevronDown
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

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-20 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
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
            <span className="text-gradient">নিরাপদ ও সহজ</span> উপায়ে।
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="max-w-2xl text-lg text-slate-400 font-normal leading-relaxed"
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
              className="rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 px-8 py-4 text-base font-bold transition-all duration-300"
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
