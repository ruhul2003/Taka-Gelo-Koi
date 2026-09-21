"use client";

import React from "react";
import { Zap, Coffee, Bus, ShoppingBag, Smartphone, Utensils, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface QuickPreset {
  label: string;
  amount: number;
  category: string;
  description: string;
  icon: React.ElementType;
}

const PRESETS: QuickPreset[] = [
  { label: "চা-নাস্তা (Tea)", amount: 50, category: "food", description: "চা ও বিস্কুট/নাস্তা", icon: Coffee },
  { label: "রিকশা/বাস ভাড়া", amount: 100, category: "transport", description: "দৈনিক যাতায়াত", icon: Bus },
  { label: "দুপুরের লাঞ্চ", amount: 150, category: "food", description: "দুপুরের খাবার", icon: Utensils },
  { label: "কাঁচাবাজার", amount: 500, category: "food", description: "দৈনিক তরকারি ও বাজার", icon: ShoppingBag },
  { label: "মোবাইল রিচার্জ", amount: 200, category: "bills", description: "ফ্লেক্সিলোড / ডাটা প্যাক", icon: Smartphone }
];

interface QuickExpensePresetsProps {
  onSelectPreset: (preset: { amount: number; category: string; description: string }) => void;
}

export default function QuickExpensePresets({ onSelectPreset }: QuickExpensePresetsProps) {
  return (
    <div className="glass-panel p-4 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-lg bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <Zap className="h-4 w-4" />
        </div>
        <span className="text-xs font-bold text-slate-800 dark:text-white">
          কুইক এন্ট্রি প্রিসেট (১-ট্যাপে খরচ যোগ করুন)
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {PRESETS.map((preset, index) => {
          const Icon = preset.icon;
          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => onSelectPreset({
                amount: preset.amount,
                category: preset.category,
                description: preset.description
              })}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 hover:border-indigo-300 dark:hover:bg-indigo-950/40 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all cursor-pointer shadow-sm"
            >
              <Icon className="h-3.5 w-3.5 text-indigo-500" />
              <span>{preset.label}</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-md bg-white dark:bg-slate-900 text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                ৳{preset.amount}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
