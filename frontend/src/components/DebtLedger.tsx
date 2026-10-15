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
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 p-6 shadow-sm bg-white dark:bg-slate-900/60 backdrop-blur-md">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800/60">
            <Handshake className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              ধারের খাতা (দেনা-পাওনা লেজার)
              <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold">
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
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-semibold shadow-sm transition-all cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>নতুন রেকর্ড</span>
        </button>
      </div>

      {/* Summary Chips */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60">
          <div className="flex items-center gap-1.5 text-xs text-indigo-700 dark:text-indigo-300 font-semibold mb-1">
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>টাকা পাবেন (পাওনা)</span>
          </div>
          <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
            ৳ {totalLentPending.toLocaleString()}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-semibold mb-1">
            <ArrowDownLeft className="h-3.5 w-3.5" />
            <span>টাকা পরিশোধ বাকি (দেনা)</span>
          </div>
          <span className="text-base font-extrabold text-slate-800 dark:text-slate-200">
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
            className="mb-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="ব্যক্তির নাম"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-indigo-600"
                required
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "lent" | "borrowed")}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-indigo-600"
              >
                <option value="lent">টাকা দিয়েছি (পাবো - Lent)</option>
                <option value="borrowed">টাকা নিয়েছি (দিতে হবে - Borrowed)</option>
              </select>
              <input
                type="number"
                placeholder="পরিমাণ (৳)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-indigo-600"
                required
              />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-indigo-600"
              />
            </div>
            <input
              type="text"
              placeholder="নোট / বিবরণ (ঐচ্ছিক)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-indigo-600"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm cursor-pointer"
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
            className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
              d.isSettled
                ? "opacity-50 bg-slate-100/50 dark:bg-slate-800/20 border-slate-200/50"
                : d.type === "lent"
                ? "border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20"
                : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40"
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <h4 className={`text-xs font-bold ${d.isSettled ? "line-through text-slate-400" : "text-slate-800 dark:text-white"}`}>
                  {d.personName}
                </h4>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  d.type === "lent" ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300" : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
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
              <span className={`text-sm font-extrabold ${d.type === "lent" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-700 dark:text-slate-300"}`}>
                ৳ {d.amount.toLocaleString()}
              </span>

              <button
                onClick={() => toggleSettled(d.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                  d.isSettled
                    ? "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent"
                    : "border-slate-300 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-300 hover:text-indigo-600"
                }`}
              >
                {d.isSettled ? "পরিশোধিত" : "মিটিয়ে নিন"}
              </button>

              <button
                onClick={() => handleDelete(d.id)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
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

