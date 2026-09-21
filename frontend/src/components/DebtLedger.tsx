"use client";

import React, { useState } from "react";
import { Handshake, Plus, CheckCircle, ArrowDownLeft, ArrowUpRight, Trash2, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DebtItem {
  id: string;
  personName: string;
  type: "lent" | "borrowed"; // lent = টাকা পাওনা, borrowed = টাকা দেনা
  amount: number;
  dueDate: string;
  isSettled: boolean;
  notes?: string;
}

const INITIAL_DEBTS: DebtItem[] = [
  {
    id: "debt-1",
    personName: "রাকিব হাসান (Rakib)",
    type: "lent",
    amount: 3500,
    dueDate: "2026-07-20",
    isSettled: false,
    notes: "জরুরি প্রয়োজনে ধার দিয়েছিলাম"
  },
  {
    id: "debt-2",
    personName: "সাকিব আহমেদ (Sakib)",
    type: "borrowed",
    amount: 1200,
    dueDate: "2026-07-15",
    isSettled: true,
    notes: "রেস্তোরাঁর বিল পরিশোধ"
  }
];

export default function DebtLedger() {
  const [debts, setDebts] = useState<DebtItem[]>(INITIAL_DEBTS);
  const [isAdding, setIsAdding] = useState(false);
  const [personName, setPersonName] = useState("");
  const [type, setType] = useState<"lent" | "borrowed">("lent");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  const totalLentPending = debts
    .filter((d) => d.type === "lent" && !d.isSettled)
    .reduce((sum, d) => sum + d.amount, 0);

  const totalBorrowedPending = debts
    .filter((d) => d.type === "borrowed" && !d.isSettled)
    .reduce((sum, d) => sum + d.amount, 0);

  const toggleSettled = (id: string) => {
    setDebts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isSettled: !d.isSettled } : d))
    );
  };

  const handleDelete = (id: string) => {
    setDebts((prev) => prev.filter((d) => d.id !== id));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personName || !amount) return;

    const newItem: DebtItem = {
      id: `debt-${Date.now()}`,
      personName,
      type,
      amount: parseFloat(amount),
      dueDate: dueDate || "2026-12-31",
      isSettled: false,
      notes
    };

    setDebts([newItem, ...debts]);
    setPersonName("");
    setAmount("");
    setDueDate("");
    setNotes("");
    setIsAdding(false);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <Handshake className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              ধারের খাতা (দেনা-পাওনা লেজার)
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 font-semibold">
                Debt Ledger
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              কাউকে ধার দেওয়া বা কারো থেকে নেওয়া টাকার নিখুঁত হিসাব
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700 text-xs font-semibold shadow-md shadow-purple-600/20 transition-all active:scale-95"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>নতুন রেকর্ড</span>
        </button>
      </div>

      {/* Summary Chips */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-1">
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>টাকা পাবেন (পাওনা)</span>
          </div>
          <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
            ৳ {totalLentPending.toLocaleString()}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20">
          <div className="flex items-center gap-1.5 text-xs text-rose-500 font-semibold mb-1">
            <ArrowDownLeft className="h-3.5 w-3.5" />
            <span>টাকা পরিশোধ বাকি (দেনা)</span>
          </div>
          <span className="text-base font-extrabold text-rose-500">
            ৳ {totalBorrowedPending.toLocaleString()}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="ব্যক্তির নাম"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                required
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "lent" | "borrowed")}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="lent">টাকা দিয়েছি (পাবো - Lent)</option>
                <option value="borrowed">টাকা নিয়েছি (দিতে হবে - Borrowed)</option>
              </select>
              <input
                type="number"
                placeholder="পরিমাণ (৳)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                required
              />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <input
              type="text"
              placeholder="নোট / বিবরণ (ঐচ্ছিক)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-purple-600 text-white hover:bg-purple-700"
              >
                যুক্ত করুন
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-2.5">
        {debts.map((d) => (
          <div
            key={d.id}
            className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
              d.isSettled
                ? "opacity-60 bg-slate-100/50 dark:bg-slate-800/20 border-slate-200/50"
                : d.type === "lent"
                ? "border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20"
                : "border-rose-500/20 bg-rose-500/5 dark:bg-rose-950/20"
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <h4 className={`text-xs font-bold ${d.isSettled ? "line-through text-slate-400" : "text-slate-800 dark:text-white"}`}>
                  {d.personName}
                </h4>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  d.type === "lent" ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300" : "bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-300"
                }`}>
                  {d.type === "lent" ? "পাওনা" : "দেনা"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> পরিশোধের তারিখ: {d.dueDate}
                </span>
                {d.notes && <span>• {d.notes}</span>}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-sm font-extrabold ${d.type === "lent" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"}`}>
                ৳ {d.amount.toLocaleString()}
              </span>

              <button
                onClick={() => toggleSettled(d.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${
                  d.isSettled
                    ? "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-transparent"
                    : "border-slate-300 dark:border-slate-600 hover:border-emerald-500 text-slate-700 dark:text-slate-300"
                }`}
              >
                {d.isSettled ? "পরিশোধিত" : "মিটিয়ে নিন"}
              </button>

              <button
                onClick={() => handleDelete(d.id)}
                className="text-slate-400 hover:text-rose-500 p-1"
                title="মুছুন"
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
