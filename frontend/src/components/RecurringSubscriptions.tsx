"use client";

import React, { useState } from "react";
import { Repeat, Plus, Calendar, Check, AlertCircle, Trash2, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Subscription {
  id: string;
  title: string;
  amount: number;
  dueDay: number; // Day of month (1-31)
  category: string;
  isPaidThisMonth: boolean;
}

const DEFAULT_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "sub-1",
    title: "ওয়াইফাই ইন্টারনেট বিল (Broadband)",
    amount: 1000,
    dueDay: 5,
    category: "bills",
    isPaidThisMonth: true
  },
  {
    id: "sub-2",
    title: "বাসা ভাড়া (Monthly Rent)",
    amount: 14000,
    dueDay: 7,
    category: "rent",
    isPaidThisMonth: false
  },
  {
    id: "sub-3",
    title: "বিদ্যুৎ ও গ্যাস বিল (Utilities)",
    amount: 2200,
    dueDay: 12,
    category: "bills",
    isPaidThisMonth: false
  },
  {
    id: "sub-4",
    title: "জিম মেম্বারশিপ (Fitness Gym)",
    amount: 1500,
    dueDay: 20,
    category: "entertainment",
    isPaidThisMonth: false
  }
];

export default function RecurringSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(DEFAULT_SUBSCRIPTIONS);
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDay, setDueDay] = useState("5");

  const totalMonthly = subscriptions.reduce((sum, s) => sum + s.amount, 0);
  const totalPaid = subscriptions.filter(s => s.isPaidThisMonth).reduce((sum, s) => sum + s.amount, 0);

  const togglePaid = (id: string) => {
    setSubscriptions(prev =>
      prev.map(s => s.id === id ? { ...s, isPaidThisMonth: !s.isPaidThisMonth } : s)
    );
  };

  const handleDelete = (id: string) => {
    setSubscriptions(prev => prev.filter(s => s.id !== id));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    const newSub: Subscription = {
      id: `sub-${Date.now()}`,
      title,
      amount: parseFloat(amount),
      dueDay: parseInt(dueDay) || 1,
      category: "bills",
      isPaidThisMonth: false
    };

    setSubscriptions([...subscriptions, newSub]);
    setTitle("");
    setAmount("");
    setIsAdding(false);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <Repeat className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              নিয়মিত বিল ও সাবস্ক্রিপশন
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-300 font-semibold">
                Recurring
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              প্রতি মাসের নির্ধারিত খরচ ও কিস্তির তালিকা
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 text-xs font-semibold shadow-md shadow-cyan-600/20 transition-all active:scale-95"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>বিল যোগ করুন</span>
        </button>
      </div>

      {/* Summary Header */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block">মাসিক নির্ধারিত মোট দায়</span>
          <span className="text-base font-extrabold text-slate-800 dark:text-white">
            ৳ {totalMonthly.toLocaleString()}
          </span>
        </div>
        <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
          <span className="text-[11px] text-cyan-700 dark:text-cyan-300 block">পরিশোধ করা হয়েছে</span>
          <span className="text-base font-extrabold text-cyan-600 dark:text-cyan-400">
            ৳ {totalPaid.toLocaleString()}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAdd}
            className="mb-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="বিলের নাম (যেমন: ওয়াইফাই, বিদ্যুৎ)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                required
              />
              <input
                type="number"
                placeholder="টাকার পরিমাণ (৳)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                required
              />
              <input
                type="number"
                min="1"
                max="31"
                placeholder="মাসের কত তারিখে দেয়? (1-31)"
                value={dueDay}
                onChange={(e) => setDueDay(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1 text-xs font-medium text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-4 py-1 text-xs font-bold bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
              >
                যুক্ত করুন
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Subscriptions List */}
      <div className="space-y-2.5">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
              sub.isPaidThisMonth
                ? "border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20"
                : "border-slate-200/80 dark:border-white/5 bg-slate-50/60 dark:bg-slate-800/40"
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => togglePaid(sub.id)}
                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors border ${
                  sub.isPaidThisMonth
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "border-slate-300 dark:border-slate-600 hover:border-emerald-500"
                }`}
                title={sub.isPaidThisMonth ? "পরিশোধ চিহ্নিত হয়েছে" : "পরিশোধ চিহ্নিত করুন"}
              >
                {sub.isPaidThisMonth && <Check className="h-3.5 w-3.5" />}
              </button>

              <div>
                <h4 className={`text-xs font-bold ${sub.isPaidThisMonth ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-white"}`}>
                  {sub.title}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> প্রতি মাসের {sub.dueDay} তারিখ
                  </span>
                  <span>•</span>
                  <span className={sub.isPaidThisMonth ? "text-emerald-500 font-semibold" : "text-amber-500 font-medium"}>
                    {sub.isPaidThisMonth ? "পরিশোধিত" : "বকেয়া"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                ৳ {sub.amount.toLocaleString()}
              </span>
              <button
                onClick={() => handleDelete(sub.id)}
                className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                title="মুছে ফেলুন"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
