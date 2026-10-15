"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function DemoPage() {
  const [demoType, setDemoType] = useState<"income" | "expense">("expense");
  const [demoAmount, setDemoAmount] = useState("2000");
  const [demoCategory, setDemoCategory] = useState("food");
  const [demoList, setDemoList] = useState([
    { id: 1, type: "income", category: "salary", amount: 15000, desc: "টিউশনি পেমেন্ট" },
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
      desc: demoType === "income" ? "আয় এন্ট্রি" : "খরচ বিবরণ"
    };
    setDemoList([newItem, ...demoList]);
    setDemoAmount("");
  };

  const demoIncome = demoList.filter(d => d.type === "income").reduce((s, i) => s + i.amount, 0);
  const demoExpense = demoList.filter(d => d.type === "expense").reduce((s, e) => s + e.amount, 0);
  const demoBalance = demoIncome - demoExpense;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto max-w-7xl px-6 py-16"
    >
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-center mb-12"
      >
        <h1 className="bengali-title text-4xl sm:text-5xl font-extrabold mb-4 text-slate-900 dark:text-slate-100">লাইভ ট্রায়াল ট্র্যাকার</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">অ্যাকাউন্ট তৈরি করার আগেই দেখে নিন কিভাবে হিসাব রাখা সহজ হয়।</p>
      </motion.div>

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
    </motion.section>
  );
}
