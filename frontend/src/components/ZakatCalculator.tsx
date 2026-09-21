"use client";

import React, { useState } from "react";
import { Coins, HeartHandshake, HelpCircle, CheckCircle2, Calculator } from "lucide-react";
import { motion } from "framer-motion";

export default function ZakatCalculator() {
  const [cash, setCash] = useState<string>("");
  const [goldSilver, setGoldSilver] = useState<string>("");
  const [investments, setInvestments] = useState<string>("");
  const [businessStock, setBusinessStock] = useState<string>("");
  const [debts, setDebts] = useState<string>("");

  // Silver Nisab benchmark in BDT (Approx 52.5 Tola silver @ ~৳২,২০০/ভরি = ~৳১১৫,০০০)
  const NISAB_THRESHOLD = 115000;

  const numCash = parseFloat(cash) || 0;
  const numGold = parseFloat(goldSilver) || 0;
  const numInvest = parseFloat(investments) || 0;
  const numStock = parseFloat(businessStock) || 0;
  const numDebts = parseFloat(debts) || 0;

  const grossAssets = numCash + numGold + numInvest + numStock;
  const netZakatableWealth = Math.max(0, grossAssets - numDebts);
  const isEligible = netZakatableWealth >= NISAB_THRESHOLD;
  const zakatPayable = isEligible ? netZakatableWealth * 0.025 : 0;

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Coins className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              যাকাত ও সদকা ক্যালকুলেটর
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 font-semibold">
                Islamic Finance
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              নিসাব পরিমাণ সম্পদ অনুযায়ী বার্ষিক ২.৫% যাকাত হিসাব করুন
            </p>
          </div>
        </div>

        <div className="text-right text-xs">
          <span className="text-slate-400 block">রৌপ্য নিসাব সীমা</span>
          <span className="font-bold text-amber-600 dark:text-amber-400">৳ {NISAB_THRESHOLD.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
            হাতে বা ব্যাংকে থাকা নগদ টাকা (Cash & Bank)
          </label>
          <input
            type="number"
            placeholder="0"
            value={cash}
            onChange={(e) => setCash(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
            সোনা ও রূপার বর্তমান বাজারমূল্য (Gold & Silver)
          </label>
          <input
            type="number"
            placeholder="0"
            value={goldSilver}
            onChange={(e) => setGoldSilver(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
            শেয়ার, বন্ড ও সঞ্চয়পত্র (Investments)
          </label>
          <input
            type="number"
            placeholder="0"
            value={investments}
            onChange={(e) => setInvestments(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
            ব্যবসায়িক পণ্য বা মালের মূল্য (Business Stock)
          </label>
          <input
            type="number"
            placeholder="0"
            value={businessStock}
            onChange={(e) => setBusinessStock(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-rose-500 mb-1">
          বর্তমান অপরিশোধিত ঋণ বা দায় (Liabilities to Deduct)
        </label>
        <input
          type="number"
          placeholder="0"
          value={debts}
          onChange={(e) => setDebts(e.target.value)}
          className="w-full px-3 py-2 text-xs rounded-xl border border-rose-300 dark:border-rose-900/50 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500"
        />
      </div>

      {/* Result Card */}
      <motion.div
        key={`${zakatPayable}-${isEligible}`}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-emerald-500/10 border border-amber-500/20"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">
              যাকাতযোগ্য নিট সম্পদ: ৳ {netZakatableWealth.toLocaleString()}
            </span>
            <span className={`text-xs font-semibold ${isEligible ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>
              {isEligible ? "✓ আপনার সম্পদ নিসাব পরিমাণ অতিক্রম করেছে।" : "সম্পদ নিসাব পরিমাণের নিচে, যাকাত ফরজ নয়।"}
            </span>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-amber-700 dark:text-amber-300 block font-medium">প্রদেয় যাকাত (২.৫%)</span>
            <span className="text-2xl font-black bg-gradient-to-r from-amber-600 to-yellow-500 dark:from-amber-400 dark:to-yellow-300 bg-clip-text text-transparent">
              ৳ {zakatPayable.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
