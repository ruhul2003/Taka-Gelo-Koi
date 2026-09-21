"use client";

import React, { useState } from "react";
import { PiggyBank, Plus, CheckCircle, Sparkles, TrendingUp, Calendar, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

const INITIAL_GOALS: SavingsGoal[] = [
  {
    id: "g1",
    name: "ইমার্জেন্সি ফান্ড (Emergency Fund)",
    targetAmount: 50000,
    currentAmount: 24500,
    deadline: "2026-12-31",
    category: "Safety"
  },
  {
    id: "g2",
    name: "নতুন ল্যাপটপ ক্রয় (New Laptop)",
    targetAmount: 85000,
    currentAmount: 62000,
    deadline: "2026-10-15",
    category: "Gadget"
  },
  {
    id: "g3",
    name: "ঈদের উপহার ও কেনাকাটা (Eid Fund)",
    targetAmount: 20000,
    currentAmount: 18000,
    deadline: "2026-06-01",
    category: "Festival"
  }
];

export default function SavingsGoalTracker() {
  const [goals, setGoals] = useState<SavingsGoal[]>(INITIAL_GOALS);
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !target) return;

    const newGoal: SavingsGoal = {
      id: `goal-${Date.now()}`,
      name,
      targetAmount: parseFloat(target),
      currentAmount: parseFloat(current) || 0,
      deadline: deadline || "2026-12-31",
      category: "Personal"
    };

    setGoals([...goals, newGoal]);
    setName("");
    setTarget("");
    setCurrent("");
    setDeadline("");
    setIsAdding(false);
  };

  const handleDeposit = (id: string, amount: number) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, currentAmount: Math.min(g.targetAmount, g.currentAmount + amount) } : g
      )
    );
  };

  const handleDelete = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <PiggyBank className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              সঞ্চয় লক্ষ্যমাত্রা (Savings Goals)
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 font-semibold">
                Milestones
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ভবিষ্যতের আর্থিক লক্ষ্য ও জমার অগ্রগতি পর্যবেক্ষণ
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all active:scale-95"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>নতুন লক্ষ্য</span>
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAddGoal}
            className="mb-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="লক্ষ্যের নাম (যেমন: বাড়ি নির্মাণ, বাইক ক্রয়)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                required
              />
              <input
                type="number"
                placeholder="টার্গেট পরিমাণ (৳)"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                required
              />
              <input
                type="number"
                placeholder="বর্তমানে জমানো পরিমাণ (৳)"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700"
              >
                সংরক্ষণ করুন
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {goals.map((g) => {
          const percentage = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
          const isCompleted = percentage >= 100;

          return (
            <div
              key={g.id}
              className="p-4 rounded-2xl border border-slate-200/70 dark:border-white/5 bg-slate-50/60 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-white/10 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                    {g.name}
                    {isCompleted && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> সমাপ্ত!
                      </span>
                    )}
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> মেয়াদ: {g.deadline}
                    </span>
                    <span>•</span>
                    <span>বাকি: ৳ {Math.max(0, g.targetAmount - g.currentAmount).toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(g.id)}
                  className="text-slate-400 hover:text-rose-500 p-1"
                  title="মুছুন"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                />
              </div>

              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-200">
                  ৳ {g.currentAmount.toLocaleString()} / ৳ {g.targetAmount.toLocaleString()} ({percentage}%)
                </span>

                {!isCompleted && (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDeposit(g.id, 500)}
                      className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 text-[11px]"
                    >
                      +৳৫০০
                    </button>
                    <button
                      onClick={() => handleDeposit(g.id, 1000)}
                      className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 text-[11px]"
                    >
                      +৳১০০০
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
