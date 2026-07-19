"use client";

import React, { useState } from "react";
import LandingNavbar from "@/components/LandingNavbar";
import { Wallet } from "lucide-react";
import { motion } from "framer-motion";

export default function DemoPage() {
  const [demoType, setDemoType] = useState<"income" | "expense">("expense");
  const [demoAmount, setDemoAmount] = useState("2000");
  const [demoCategory, setDemoCategory] = useState("food");
  const [demoList, setDemoList] = useState([
    { id: 1, type: "income", category: "salary", amount: 15000, desc: "পার্ট টাইম টিউশনি" },
    { id: 2, type: "expense", category: "food", amount: 1200, desc: "সাপ্তাহিক বাজার" },
  ]);

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

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100 selection:bg-indigo-500">
      {/* Background Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-violet-900/20 blur-[120px]" />
      <div className="absolute bottom-[20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blue-900/20 blur-[150px]" />

      <LandingNavbar />

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="bengali-title text-4xl sm:text-5xl font-extrabold mb-4">সরাসরি ট্রাই করুন (লাইভ ডেমো)</h1>
          <p className="text-slate-400 max-w-xl mx-auto">অ্যাকাউন্ট তৈরি করার পূর্বেই দেখে নিন কিভাবে আমাদের ট্র্যাকিং সিস্টেমটি কাজ করে।</p>
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

      {/* Footer */}
      <footer className="border-t border-slate-900 py-12 px-6 bg-slate-950/60">
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
