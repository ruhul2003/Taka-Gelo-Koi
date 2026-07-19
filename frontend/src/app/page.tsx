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
    { id: 1, type: "income", category: "salary", amount: 15000, desc: "পার্ট টাইম টিউশনি" },
    { id: 2, type: "expense", category: "food", amount: 1200, desc: "সাপ্তাহিক বাজার" },
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
      desc: demoType === "income" ? "পেমেন্ট প্রাপ্তি" : "খরচ বিবরণ"
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
    { q: "টাকা গেল কই অ্যাপটি কি সম্পূর্ণ ফ্রি?", a: "হ্যাঁ, টাকা গেল কই অ্যাপ্লিকেশনের বেসিক ট্র্যাকিং ফিচারগুলো সাধারণ ব্যবহারকারীদের জন্য সম্পূর্ণ ফ্রি।" },
    { q: "অ্যাডমিন প্যানেল কিভাবে কাজ করে?", a: "অ্যাডমিন প্যানেলের মাধ্যমে সিস্টেমের মোট ব্যবহারকারী এবং সমষ্টিগত লেনদেনের পরিমাণ মনিটর করা যায়। এটি ব্যবহারের জন্য সিক্রেট কী প্রয়োজন।" },
    { q: "আমার ফাইন্যান্সিয়াল ডেটা কতটা নিরাপদ?", a: "আপনার সকল ডেটা নিজস্ব সেশনে সুরক্ষিত থাকে। Better Auth সিকিউর এনক্রিপশনের মাধ্যমে সেশন ও পাসওয়ার্ড রক্ষা করে।" }
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100 selection:bg-indigo-500">
      {/* Background Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-violet-900/20 blur-[120px]" />
      <div className="absolute bottom-[20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blue-900/20 blur-[150px]" />

      <LandingNavbar />

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
          <h2 className="bengali-title text-3xl sm:text-4xl font-extrabold">৩টি ভিন্ন ভিন্ন ড্যাশবোর্ড সুবিধা</h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">আপনার জীবনের প্রতিটি খাতের খরচের গতিবিধি আলাদাভাবে বিশ্লেষণ করার জন্য প্রস্তুতকৃত ড্যাশবোর্ডসমূহ।</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1: Daily Life */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="glass-panel glass-panel-hover rounded-2xl p-8 flex flex-col gap-6"
          >
            <div className="rounded-xl bg-violet-950/60 border border-violet-800/30 p-4 w-fit">
              <Coins className="h-8 w-8 text-violet-400" />
            </div>
            <div>
              <h3 className="bengali-title text-2xl font-bold mb-2 text-violet-200">দৈনন্দিন জীবন ড্যাশবোর্ড</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                আপনার নিত্যদিনের বাজার খরচ, বাড়ি ভাড়া, বিল পরিশোধ ও যাতায়াত খরচ ট্র্যাক করুন। মাসের শেষে আপনার মূল খরচগুলো পাই-চার্টে দেখুন।
              </p>
            </div>
            <ul className="mt-auto space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-violet-400" /> আয় ও ব্যয় ট্র্যাকার</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-violet-400" /> ক্যাটাগরিভিত্তিক পাই-চার্ট</li>
            </ul>
          </motion.div>

          {/* Card 2: Business */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="glass-panel glass-panel-hover rounded-2xl p-8 flex flex-col gap-6"
          >
            <div className="rounded-xl bg-blue-950/60 border border-blue-800/30 p-4 w-fit">
              <Briefcase className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h3 className="bengali-title text-2xl font-bold mb-2 text-blue-200">ব্যবসায়িক ড্যাশবোর্ড</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                আপনার ব্যবসার মোট রেভিনিউ বা সেলস, অপারেশনাল কস্ট, প্রফিট মার্জিন এবং ক্লায়েন্ট পেমেন্ট ট্র্যাক করুন সুনির্দিষ্টভাবে।
              </p>
            </div>
            <ul className="mt-auto space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-400" /> প্রফিট ও লস স্টেটমেন্ট</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-400" /> রেভিনিউ ফিল্টারস</li>
            </ul>
          </motion.div>

          {/* Card 3: Study */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="glass-panel glass-panel-hover rounded-2xl p-8 flex flex-col gap-6"
          >
            <div className="rounded-xl bg-emerald-950/60 border border-emerald-800/30 p-4 w-fit">
              <GraduationCap className="h-8 w-8 text-emerald-400" />
            </div>
            <div>
              <h3 className="bengali-title text-2xl font-bold mb-2 text-emerald-200">শিক্ষা ব্যয় ড্যাশবোর্ড</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                সেমিস্টার ফি, বই কেনা, মেস ভাড়া বা হাত খরচের হিসাব রাখুন। বাজেট অ্যালার্ট সিস্টেম আপনাকে অতিরিক্ত ব্যয় থেকে রক্ষা করবে।
              </p>
            </div>
            <ul className="mt-auto space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> পড়ার খরচ ও হাতখরচ বিভাজন</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> বাজেট ও প্রগ্রেস বার ট্র্যাকিং</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Live Demo Widget / Quick Calculator */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 border-t border-slate-900">
        <div className="text-center mb-12">
          <h2 className="bengali-title text-3xl sm:text-4xl font-extrabold">সরাসরি ট্রাই করুন (লাইভ ডেমো)</h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto">অ্যাকাউন্ট তৈরি করার পূর্বেই দেখে নিন কিভাবে আমাদের ট্র্যাকিং সিস্টেমটি কাজ করে।</p>
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
                <h4 className="bengali-title text-lg font-bold text-slate-200">ডেমো লেজার খতিয়ান</h4>
                <div className="flex gap-4 text-xs font-semibold">
                  <span className="text-emerald-400">আয়: {demoIncome.toLocaleString()}৳</span>
                  <span className="text-rose-400">ব্যয়: {demoExpense.toLocaleString()}৳</span>
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
              <span className="text-xs font-bold text-slate-400">অবশিষ্ট ব্যালেন্স:</span>
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
          <h2 className="bengali-title text-3xl sm:text-4xl font-extrabold">ব্যবহারকারীদের অভিজ্ঞতা</h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">টাকা গেল কই অ্যাপ্লিকেশন ব্যবহার করে যারা তাদের খরচ নিয়ন্ত্রণ করতে পেরেছেন।</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed italic">
              "মেসের খাবারের হিসাব আর হাত খরচ মেলাতে আমার প্রতি মাসে মাথা নষ্ট হয়ে যেত। এখন সব হিসাব এক জায়গায় থাকে।"
            </p>
            <div className="mt-auto">
              <h5 className="text-xs font-bold text-slate-100">রাকিব হোসেন</h5>
              <span className="text-[10px] text-slate-500 font-semibold">শিক্ষার্থী, ঢাকা বিশ্ববিদ্যালয়</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed italic">
              "আমার অনলাইন ক্লোথিং স্টোরের রেভিনিউ আর কুরিয়ার খরচ মেলানোর জন্য এটি অত্যন্ত চমৎকার ভূমিকা রাখছে।"
            </p>
            <div className="mt-auto">
              <h5 className="text-xs font-bold text-slate-100">ফারিহা আক্তার</h5>
              <span className="text-[10px] text-slate-500 font-semibold">এফ-কমার্স উদ্যোক্তা</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed italic">
              "ফ্যামিলির মাসিক বাজার ও ইউটিলিটি বিলের সঠিক গতিপথ চিহ্নিত করতে এই ড্যাশবোর্ডটি দারুণ সাহায্য করেছে।"
            </p>
            <div className="mt-auto">
              <h5 className="text-xs font-bold text-slate-100">মাহমুদ হাসান</h5>
              <span className="text-[10px] text-slate-500 font-semibold">সফটওয়্যার ইঞ্জিনিয়ার</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-20 border-t border-slate-900">
        <div className="text-center mb-12">
          <h2 className="bengali-title text-3xl sm:text-4xl font-extrabold">প্রায়শই জিজ্ঞাসিত প্রশ্ন</h2>
          <p className="mt-3 text-slate-400">টাকা গেল কই সম্পর্কে সাধারণ কিছু প্রশ্নের উত্তর নিচে দেওয়া হল।</p>
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
              নিরাপত্তা এবং ভূমিকা-ভিত্তিক <br />
              সাইন-আপ পদ্ধতি
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 h-fit">
                  <ShieldCheck className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-200">ভূমিকা ভিত্তিক অ্যাক্সেস (RBAC)</h4>
                  <p className="text-slate-400 text-sm mt-1">লগইন করার সাথে সাথে আপনার নির্দিষ্ট ক্যাটাগরির ড্যাশবোর্ডে নিয়ে যাওয়া হবে।</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 h-fit">
                  <PieChart className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-200">রিয়েল-টাইম গ্রাফিক্যাল অ্যানালিটিক্স</h4>
                  <p className="text-slate-400 text-sm mt-1">সব খরচ ও আয়ের অনুপাত সরাসরি এবং সুন্দর অ্যানিমেটেড ইন্টারফেসের মাধ্যমে দেখতে পাবেন।</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-tr from-indigo-600/10 to-violet-600/10 border border-slate-800 p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
            <TrendingUp className="h-16 w-16 text-indigo-400 mb-6 animate-pulse" />
            <h3 className="bengali-title text-2xl font-extrabold text-slate-100">টাকা জমানো এখন আরও সহজ!</h3>
            <p className="text-slate-400 text-sm max-w-sm mt-3 mb-6">
              আজই হিসাব রাখা শুরু করুন এবং নিজের টাকা কোথায় যাচ্ছে তা নিমিষেই চিহ্নিত করুন।
            </p>
            <Link 
              href="/signup" 
              className="rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 px-6 py-3 text-sm font-semibold transition-all duration-300"
            >
              নতুন অ্যাকাউন্ট তৈরি করুন
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 py-12 px-6 bg-slate-950">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-slate-900 p-2 border border-slate-800">
              <Wallet className="h-5 w-5 text-indigo-400" />
            </div>
            <span className="bengali-title text-xl font-bold tracking-wider text-slate-200">
              টাকা গেল কই ?
            </span>
          </div>
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} টাকা গেল কই ? সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </footer>
    </div>
  );
}
