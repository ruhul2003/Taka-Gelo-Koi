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

      {/* Minimal Hero Section */}
      <section className="relative z-10 mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-140px)] flex flex-col items-center justify-center text-center py-16 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 max-w-4xl mx-auto"
        >
          {/* Minimal Tag Pill */}
          <motion.div 
            variants={itemVariants} 
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/80 dark:bg-indigo-950/40 px-3.5 py-1.5 text-xs font-medium text-indigo-700 dark:text-indigo-300 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>স্মার্ট পার্সোনাল ফাইন্যান্স ম্যানেজার</span>
          </motion.div>

          {/* Clean High-Contrast Headline */}
          <motion.h1 
            variants={itemVariants}
            className="bengali-title text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.18] tracking-tight text-slate-900 dark:text-slate-50"
          >
            আপনার প্রতিদিনের হিসাব, <br />
            <span className="text-indigo-600 dark:text-indigo-400">
              সহজ ও নির্ভুল
            </span> উপায়ে।
          </motion.h1>

          {/* Minimal Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed"
          >
            দৈনন্দিন খরচ, ব্যবসার হিসাব কিংবা পড়াশোনার বাজেট—সবকিছু ট্র্যাক করুন একক মিনিমাল ড্যাশবোর্ডে কোন বাড়তি ঝামেলা ছাড়াই।
          </motion.p>

          {/* Primary and Secondary CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="mt-2 flex flex-wrap gap-3.5 justify-center"
          >
            <Link 
              href="/signup" 
              className="group flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200"
            >
              <span>হিসাব শুরু করুন</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link 
              href="/login" 
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 px-7 py-3.5 text-sm font-semibold transition-all duration-200"
            >
              ড্যাশবোর্ড ডেমো
            </Link>
          </motion.div>

          {/* Minimal Key Metrics Bar */}
          <motion.div
            variants={itemVariants}
            className="mt-8 grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-2xl pt-6 border-t border-slate-200 dark:border-slate-800/80"
          >
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">১০০%</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">তথ্য নিরাপত্তা</p>
            </div>
            <div className="text-center border-x border-slate-200 dark:border-slate-800/80">
              <p className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">৩টি</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">ডেডিকেটেড মোড</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">ফ্রি</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">আজীবন ব্যবহার</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Dashboard Features Grid */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 border-t border-slate-200 dark:border-slate-800/80">
        <div className="text-center mb-14">
          <h2 className="bengali-title text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">৩টি বিশেষায়িত ড্যাশবোর্ড মোড</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">আপনার জীবনের প্রতিটি স্তরের আর্থিক হিসাবকে সুশৃঙ্খল ও সহজ করার জন্য প্রস্তুতকৃত।</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1: Daily Life */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-2xl p-7 flex flex-col gap-5 border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 transition-all duration-200 hover:border-indigo-500/40"
          >
            <div className="rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 p-3 w-fit text-indigo-600 dark:text-indigo-400">
              <Coins className="h-6 w-6" />
            </div>
            <div>
              <h3 className="bengali-title text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                দৈনন্দিন জীবন ড্যাশবোর্ড
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                বাজার খরচ, বাড়িভাড়া, বিদ্যুৎ বিল এবং ট্রান্সপোর্ট খরচের সুনির্দিষ্ট হিসাব রাখুন। মাস শেষে সহজে দেখুন মোট ব্যয়ের চিত্র।
              </p>
            </div>
            <ul className="mt-auto space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                আয় ও ব্যয়ের নিয়মিত ট্র্যাকার
              </li>
              <li className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                ক্যাটাগরি-ভিত্তিক ভিজ্যুয়াল চার্ট
              </li>
            </ul>
          </motion.div>

          {/* Card 2: Business */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-2xl p-7 flex flex-col gap-5 border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 transition-all duration-200 hover:border-indigo-500/40"
          >
            <div className="rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 p-3 w-fit text-indigo-600 dark:text-indigo-400">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h3 className="bengali-title text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                ব্যবসায়িক ড্যাশবোর্ড
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                ব্যবসায়ের মোট বিক্রয়, পরিচালন ব্যয়, লাভ-ক্ষতির মার্জিন এবং কাস্টমার পেমেন্ট ট্র্যাকিং করুন এক জায়গায়।
              </p>
            </div>
            <ul className="mt-auto space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                লাভ ও ক্ষতির সুস্পষ্ট বিবরণী
              </li>
              <li className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                রেভিনিউ ফিল্টারিং ব্যবস্থা
              </li>
            </ul>
          </motion.div>

          {/* Card 3: Study */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-2xl p-7 flex flex-col gap-5 border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 transition-all duration-200 hover:border-indigo-500/40"
          >
            <div className="rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 p-3 w-fit text-indigo-600 dark:text-indigo-400">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="bengali-title text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                শিক্ষার্থীদের বাজেট
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                সেমিস্টার ফি, বইপত্র, মেস ভাড়া কিংবা হাতখরচ—প্রতি মাসের জন্য আলাদা বাজেট সেট করে অতিরিক্ত খরচ রোধ করুন।
              </p>
            </div>
            <ul className="mt-auto space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                পড়াশোনা ও হাতখরচ বিভাজন
              </li>
              <li className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                বাজেট লিমিট ও প্রগ্রেস ট্র্যাকিং
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Live Demo Widget / Quick Calculator */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 border-t border-slate-200 dark:border-slate-800/80">
        <div className="text-center mb-12">
          <h2 className="bengali-title text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">লাইভ ট্রায়াল ট্র্যাকার</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">অ্যাকাউন্ট তৈরি করার আগেই দেখে নিন কিভাবে হিসাব রাখা সহজ হয়।</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
          {/* Demo input */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 h-fit">
            <h4 className="bengali-title text-base font-bold mb-4 text-slate-900 dark:text-slate-100">হিসাব এন্ট্রি করুন</h4>
            <form onSubmit={addDemoItem} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">ধরণ নির্ধারণ করুন</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDemoType("expense")}
                    className={`rounded-xl border py-2 text-xs font-semibold transition-all ${
                      demoType === "expense"
                        ? "border-indigo-600 bg-indigo-600 text-white shadow-sm"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    খরচ (Expense)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDemoType("income")}
                    className={`rounded-xl border py-2 text-xs font-semibold transition-all ${
                      demoType === "income"
                        ? "border-indigo-600 bg-indigo-600 text-white shadow-sm"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    আয় (Income)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">পরিমাণ (৳)</label>
                <input
                  type="number"
                  required
                  value={demoAmount}
                  onChange={(e) => setDemoAmount(e.target.value)}
                  placeholder="টাকার পরিমাণ লিখুন"
                  className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-600"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 py-2.5 text-sm font-semibold text-white transition-colors shadow-sm cursor-pointer"
              >
                হিসাবে যোগ করুন
              </button>
            </form>
          </div>

          {/* Demo logs & summaries */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-5">
                <h4 className="bengali-title text-base font-bold text-slate-900 dark:text-slate-100">ডেমো লেজার তালিকা</h4>
                <div className="flex gap-4 text-xs font-medium">
                  <span className="text-slate-900 dark:text-slate-200">মোট আয়: <strong className="text-indigo-600 dark:text-indigo-400">{demoIncome.toLocaleString()}৳</strong></span>
                  <span className="text-slate-600 dark:text-slate-400">মোট ব্যয়: {demoExpense.toLocaleString()}৳</span>
                </div>
              </div>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {demoList.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-between items-center rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 px-4 py-2.5 text-sm"
                  >
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{item.desc}</span>
                    <span className={`font-semibold ${item.type === "income" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400"}`}>
                      {item.type === "income" ? "+" : "-"}{item.amount.toLocaleString()} ৳
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">অবশিষ্ট ব্যালেন্স:</span>
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
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
