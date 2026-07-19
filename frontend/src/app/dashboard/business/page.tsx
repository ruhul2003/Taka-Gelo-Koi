"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Plus, Trash2, ArrowUpRight, ArrowDownRight, CircleAlert, Briefcase, Percent, Receipt } from "lucide-react";

interface Transaction {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  description: string;
  date: string;
}

export default function BusinessDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [category, setCategory] = useState("revenue");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    { value: "revenue", label: "বিক্রয়/রেভিনিউ (Revenue)" },
    { value: "inventory", label: "ইনভেন্টরি/মালপত্র (Inventory)" },
    { value: "marketing", label: "বিজ্ঞাপন/মার্কেটিং (Marketing)" },
    { value: "salaries", label: "কর্মচারী বেতন (Salaries)" },
    { value: "rent", label: "অফিস/দোকান ভাড়া (Rent)" },
    { value: "utilities", label: "ইউটিলিটি বিল (Utilities)" },
    { value: "taxes", label: "কর/ট্যাক্স (Taxes)" },
    { value: "others", label: "অন্যান্য (Others)" },
  ];

  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/transactions?dashboard=business", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
      } else {
        setError("লেনদেন ডেটা লোড করতে ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      console.error(err);
      setError("সার্ভার কানেকশন এরর।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    try {
      const res = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          category,
          amount: parseFloat(amount),
          description,
          dashboard: "business",
        }),
        credentials: "include",
      });

      if (res.ok) {
        setAmount("");
        setDescription("");
        fetchTransactions();
      } else {
        const data = await res.json();
        setError(data.error || "লেনদেন সংরক্ষণ করতে ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      console.error(err);
      setError("সার্ভার কানেকশন এরর।");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        fetchTransactions();
      } else {
        setError("লেনদেন মুছতে ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      console.error(err);
      setError("সার্ভার কানেকশন এরর।");
    }
  };

  const totalRevenue = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalRevenue - totalExpense;
  const profitMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : "0.0";

  // Calculate percentage of category expenses
  const categoryTotals: Record<string, number> = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

  return (
    <DashboardLayout allowedRole="business">
      <div className="space-y-8">
        {/* Banner */}
        <div className="flex flex-col gap-2">
          <h1 className="bengali-title text-3xl font-extrabold text-slate-100">ব্যবসায়িক হিসাব ট্র্যাকার</h1>
          <p className="text-slate-400 text-sm">আপনার কোম্পানির লাভ-ক্ষতি, মোট রেভিনিউ এবং ব্যবসার খরচ পরিচালনা করুন।</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-rose-950/40 border border-rose-900 px-4 py-3 text-sm text-rose-300">
            <CircleAlert className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Summaries */}
        <div className="grid gap-6 sm:grid-cols-4">
          {/* Net Profit */}
          <div className="rounded-2xl glass-panel p-6 border-l-4 border-l-blue-500">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">নীট লাভ (Net Profit)</p>
            <div className="flex items-center gap-1.5">
              <Briefcase className="h-5 w-5 text-blue-400" />
              <h3 className={`text-3xl font-bold ${netProfit >= 0 ? "text-slate-100" : "text-rose-400"}`}>
                {netProfit.toLocaleString()} ৳
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-2">মোট আয় থেকে মোট খরচ বিয়োগ</p>
          </div>

          {/* Profit Margin */}
          <div className="rounded-2xl glass-panel p-6 border-l-4 border-l-violet-500">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">লাভের হার (Margin)</p>
            <div className="flex items-center gap-1.5">
              <Percent className="h-5 w-5 text-violet-400" />
              <h3 className="text-3xl font-bold text-violet-400">
                {profitMargin}%
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-2">আয়ের তুলনায় লাভের শতকরা হার</p>
          </div>

          {/* Revenue */}
          <div className="rounded-2xl glass-panel p-6 border-l-4 border-l-emerald-500">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">মোট রেভিনিউ (Revenue)</p>
            <div className="flex items-center gap-1.5">
              <ArrowUpRight className="h-5 w-5 text-emerald-400" />
              <h3 className="text-3xl font-bold text-emerald-400">
                {totalRevenue.toLocaleString()} ৳
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-2">মোট বিক্রয় বা আয়ের অংক</p>
          </div>

          {/* Expense */}
          <div className="rounded-2xl glass-panel p-6 border-l-4 border-l-rose-500">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">ব্যবসায়িক ব্যয় (Expense)</p>
            <div className="flex items-center gap-1.5">
              <ArrowDownRight className="h-5 w-5 text-rose-400" />
              <h3 className="text-3xl font-bold text-rose-400">
                {totalExpense.toLocaleString()} ৳
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-2">মোট অপারেশনাল ও অন্যান্য খরচ</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Add form */}
          <div className="rounded-2xl glass-panel p-6 h-fit">
            <h3 className="bengali-title text-xl font-bold mb-4 text-slate-200">ব্যবসায়িক এন্ট্রি দিন</h3>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">ধরণ</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setType("income")}
                    className={`rounded-xl border py-2.5 text-xs font-bold transition-all ${
                      type === "income"
                        ? "border-emerald-500 bg-emerald-950/20 text-emerald-400"
                        : "border-slate-800 bg-slate-900/40 text-slate-400 hover:bg-slate-900"
                    }`}
                  >
                    রেভিনিউ (Revenue)
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("expense")}
                    className={`rounded-xl border py-2.5 text-xs font-bold transition-all ${
                      type === "expense"
                        ? "border-rose-500 bg-rose-950/20 text-rose-400"
                        : "border-slate-800 bg-slate-900/40 text-slate-400 hover:bg-slate-900"
                    }`}
                  >
                    খরচ/ব্যয় (Expense)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">ক্যাটাগরি</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2.5 text-sm text-slate-200 focus:border-indigo-500 outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value} className="bg-slate-950">
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">পরিমাণ (৳)</label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="টাকার পরিমাণ"
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2.5 text-sm text-slate-200 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">সংক্ষিপ্ত বিবরণ / ক্লায়েন্ট নাম</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="যেমন: ক্লায়েন্ট এক্স পেমেন্ট, স্টক ক্রয়"
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2.5 text-sm text-slate-200 focus:border-indigo-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-3 font-bold text-white transition-all duration-300"
              >
                <Plus className="h-4.5 w-4.5" />
                <span>সংরক্ষণ করুন</span>
              </button>
            </form>
          </div>

          {/* Transactions list */}
          <div className="rounded-2xl glass-panel p-6 lg:col-span-2 flex flex-col">
            <h3 className="bengali-title text-xl font-bold mb-4 text-slate-200">ব্যবসায়িক খতিয়ান</h3>
            
            {loading ? (
              <div className="py-12 flex justify-center items-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
              </div>
            ) : transactions.length === 0 ? (
              <div className="py-16 text-center text-slate-500 text-sm">
                কোনো ব্যবসায়িক রেকর্ড পাওয়া যায়নি।
              </div>
            ) : (
              <div className="space-y-3 overflow-y-auto max-h-[420px] pr-1">
                {transactions.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between rounded-xl bg-slate-900/40 border border-slate-800/80 px-4 py-3 hover:border-slate-700/80 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`rounded-xl p-2 shrink-0 ${
                        t.type === "income" ? "bg-emerald-950/40 text-emerald-400" : "bg-rose-950/40 text-rose-400"
                      }`}>
                        {t.type === "income" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-200">
                            {categories.find((c) => c.value === t.category)?.label.split(" (")[0] || t.category}
                          </span>
                          {t.description && (
                            <span className="text-xs text-slate-500 truncate max-w-[120px] sm:max-w-xs">
                              — {t.description}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-600 block mt-0.5">
                          {new Date(t.date).toLocaleDateString("bn-BD", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-bold ${
                        t.type === "income" ? "text-emerald-400" : "text-rose-400"
                      }`}>
                        {t.type === "income" ? "+" : "-"}{t.amount.toLocaleString()} ৳
                      </span>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="rounded-lg p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Expenditure analysis */}
            {totalExpense > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-800">
                <h4 className="bengali-title text-sm font-bold mb-3 text-slate-300">ব্যয় বিশ্লেষণ</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {Object.entries(categoryTotals).map(([cat, amt]) => {
                    const percent = Math.round((amt / totalExpense) * 100);
                    const label = categories.find((c) => c.value === cat)?.label.split(" (")[0] || cat;
                    return (
                      <div key={cat} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-400">
                          <span>{label}</span>
                          <span>{percent}% ({amt.toLocaleString()} ৳)</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
