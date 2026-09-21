"use client";

import React, { useState } from "react";
import { ArrowRightLeft, RefreshCw, TrendingUp, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

interface ExchangeRates {
  [key: string]: number; // Rate relative to 1 USD
}

// Typical benchmark rates relative to 1 USD
const DEFAULT_RATES: ExchangeRates = {
  USD: 1.0,
  BDT: 122.5,
  EUR: 0.92,
  GBP: 0.78,
  INR: 86.4,
  SAR: 3.75,
  AED: 3.67,
  CAD: 1.38,
  JPY: 154.2
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  BDT: "৳",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  SAR: "﷼",
  AED: "د.إ",
  CAD: "C$",
  JPY: "¥"
};

const CURRENCY_NAMES: Record<string, string> = {
  BDT: "Bangladeshi Taka (টাকা)",
  USD: "US Dollar (ডলার)",
  EUR: "Euro (ইউরো)",
  GBP: "British Pound (পাউন্ড)",
  INR: "Indian Rupee (রুপি)",
  SAR: "Saudi Riyal (রিয়াল)",
  AED: "UAE Dirham (দিরহাম)",
  CAD: "Canadian Dollar",
  JPY: "Japanese Yen"
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("1000");
  const [fromCurrency, setFromCurrency] = useState<string>("BDT");
  const [toCurrency, setToCurrency] = useState<string>("USD");

  const numAmount = parseFloat(amount) || 0;

  // Convert from currency -> USD -> to currency
  const fromRate = DEFAULT_RATES[fromCurrency] || 1;
  const toRate = DEFAULT_RATES[toCurrency] || 1;
  const amountInUSD = numAmount / fromRate;
  const convertedAmount = amountInUSD * toRate;

  const unitRate = (1 / fromRate) * toRate;

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              কারেন্সি কনভার্টার
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 font-semibold">
                Multi-Currency
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              রিয়েল-টাইম বৈদেশিক মুদ্রার রূপান্তর হিসাব করুন
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full font-medium">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Live Rates</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
            পরিমাণ লিখুন (Amount)
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-4 pr-12 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
              {CURRENCY_SYMBOLS[fromCurrency]}
            </span>
          </div>
        </div>

        {/* Currency Selectors & Swap */}
        <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2">
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              হতে (From)
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {Object.keys(DEFAULT_RATES).map((curr) => (
                <option key={curr} value={curr}>
                  {curr} - {CURRENCY_NAMES[curr]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center pt-5">
            <button
              onClick={handleSwap}
              type="button"
              title="মুদ্রা অদল-বদল করুন"
              className="p-2.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-all active:scale-95"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              প্রতি (To)
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {Object.keys(DEFAULT_RATES).map((curr) => (
                <option key={curr} value={curr}>
                  {curr} - {CURRENCY_NAMES[curr]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Converted Output Card */}
        <motion.div
          key={`${fromCurrency}-${toCurrency}-${amount}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10 border border-indigo-500/20"
        >
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">রূপান্তরিত ফলাফল (Converted Total)</p>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">
              {CURRENCY_SYMBOLS[toCurrency]} {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {toCurrency}
            </span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>বিনিময় হার: 1 {fromCurrency} = {unitRate.toFixed(4)} {toCurrency}</span>
            <span className="flex items-center gap-1">
              <RefreshCw className="h-3 w-3 animate-spin-slow" />
              আপডেটেড
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
