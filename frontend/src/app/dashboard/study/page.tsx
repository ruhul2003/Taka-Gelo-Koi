"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Plus, Trash2, ArrowUpRight, ArrowDownRight, CircleAlert, GraduationCap, Coins } from "lucide-react";

interface Transaction {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  description: string;
  date: string;
}

export default function StudyDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("tuition");
  const [description, setDescription] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState(10000); // Default budget
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [date, setDate] = useState(() => {
    const local = new Date();
    const offset = local.getTimezoneOffset();
    const localDate = new Date(local.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split("T")[0];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    { value: "tuition", label: "সেমিস্টার/টিউশন ফি (Tuition)" },
    { value: "books", label: "বই ও খাতাপত্র (Books)" },
    { value: "rent", label: "মেস/হল ভাড়া (Rent)" },
    { value: "food", label: "খাবার/ডাইনিং (Food)" },
    { value: "pocket", label: "হাত খরচ (Pocket Money)" },
    { value: "exam", label: "পরীক্ষার ফি (Exam)" },
    { value: "others", label: "অন্যান্য (Others)" },
  ];

  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/transactions?dashboard=study", {
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
          date: date ? new Date(date).toISOString() : new Date().toISOString(),
          dashboard: "study",
        }),
        credentials: "include",
      });

      if (res.ok) {
        setAmount("");
        setDescription("");
        const local = new Date();
        const offset = local.getTimezoneOffset();
        const localDate = new Date(local.getTime() - offset * 60 * 1000);
        setDate(localDate.toISOString().split("T")[0]);
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

  const uniqueMonths = Array.from(
    new Set(
      transactions.map((t) => {
        const d = new Date(t.date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      })
    )
  ).sort((a, b) => b.localeCompare(a));

  const filteredTransactions = transactions.filter((t) => {
    if (selectedMonth === "all") return true;
    const d = new Date(t.date);
    const mStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    return mStr === selectedMonth;
  });

  const totalPocket = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const budgetUsagePercent = Math.min(Math.round((totalExpense / monthlyBudget) * 100), 100);

  const categoryTotals: Record<string, number> = {};
  filteredTransactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

  return (
    <DashboardLayout allowedRole="study">
      <div className="space-y-8">
        {/* Banner */}
        <div className="flex flex-col gap-2">
          <h1 className="bengali-title text-3xl font-extrabold text-slate-100">শিক্ষা ব্যয় ট্র্যাকার</h1>
          <p className="text-slate-400 text-sm">শিক্ষার্থীদের টিউশন ফি, বই কেনা, হল ভাড়া ও হাত খরচের হিসাব রাখার বিশেষ ড্যাশবোর্ড।</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-rose-950/40 border border-rose-900 px-4 py-3 text-sm text-rose-300">
            <CircleAlert className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Summaries */}
        <div className="grid gap-6 sm:grid-cols-3">
          {/* Monthly Budget */}
          <div className="rounded-2xl glass-panel p-6 border-l-4 border-l-emerald-500">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">মাসিক বাজেট লিমিট</p>
              <input
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(parseInt(e.target.value) || 0)}
                className="w-20 bg-slate-900/60 border border-slate-800 rounded px-1.5 py-0.5 text-right text-xs font-bold text-emerald-400 outline-none"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <GraduationCap className="h-5 w-5 text-emerald-400" />
              <h3 className="text-3xl font-bold text-slate-100">
                {monthlyBudget.toLocaleString()} ৳
              </h3>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-slate-400 font-bold mb-1">
                <span>বাজেট ব্যবহারের হার</span>
                <span>{budgetUsagePercent}%</span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    budgetUsagePercent > 85 ? "bg-rose-500" : "bg-emerald-500"
                  }`}
                  style={{ width: `${budgetUsagePercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Income/Allowances */}
          <div className="rounded-2xl glass-panel p-6 border-l-4 border-l-violet-500">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">গৃহীত অর্থ (Scholarship / Pocket Money)</p>
            <div className="flex items-center gap-1.5">
              <ArrowUpRight className="h-5 w-5 text-violet-400" />
              <h3 className="text-3xl font-bold text-violet-400">
                {totalPocket.toLocaleString()} ৳
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-2">বাড়ি থেকে বা টিউশনি থেকে মোট আয়</p>
          </div>

          {/* Total Expense */}
          <div className="rounded-2xl glass-panel p-6 border-l-4 border-l-rose-500">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">মোট পড়াশোনা ব্যয় (Expenses)</p>
            <div className="flex items-center gap-1.5">
              <ArrowDownRight className="h-5 w-5 text-rose-400" />
              <h3 className="text-3xl font-bold text-rose-400">
                {totalExpense.toLocaleString()} ৳
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-2">সেমিস্টার ও লাইফস্টাইল সংক্রান্ত সর্বমোট ব্যয়</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Add form */}
          <div className="rounded-2xl glass-panel p-6 h-fit">
            <h3 className="bengali-title text-xl font-bold mb-4 text-slate-200">নতুন এন্ট্রি যোগ করুন</h3>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">ধরণ</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setType("expense")}
                    className={`rounded-xl border py-2.5 text-xs font-bold transition-all ${
                      type === "expense"
                        ? "border-rose-500 bg-rose-950/20 text-rose-400"
                        : "border-slate-800 bg-slate-900/40 text-slate-400 hover:bg-slate-900"
                    }`}
                  >
                    খরচ (Expense)
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("income")}
                    className={`rounded-xl border py-2.5 text-xs font-bold transition-all ${
                      type === "income"
                        ? "border-emerald-500 bg-emerald-950/20 text-emerald-400"
                        : "border-slate-800 bg-slate-900/40 text-slate-400 hover:bg-slate-900"
                    }`}
                  >
                    আয়/উপহার (Income)
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
                  placeholder="টাকার পরিমাণ লিখুন"
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2.5 text-sm text-slate-200 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">সংক্ষিপ্ত বিবরণ</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="যেমন: ডাইনিং বিল, মিডটার্ম এক্সাম ফি"
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2.5 text-sm text-slate-200 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">তারিখ (Date)</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2.5 text-sm text-slate-200 focus:border-indigo-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 py-3 font-bold text-white transition-all duration-300"
              >
                <Plus className="h-4.5 w-4.5" />
                <span>সংরক্ষণ করুন</span>
              </button>
            </form>
          </div>

          {/* Transactions list */}
          <div className="rounded-2xl glass-panel p-6 lg:col-span-2 flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h3 className="bengali-title text-xl font-bold text-slate-200">শিক্ষা ব্যয় বিবরণী</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-semibold">Filter Month:</span>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="rounded-xl bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-slate-200 focus:border-indigo-500 outline-none cursor-pointer"
                >
                  <option value="all">All Months</option>
                  {uniqueMonths.map((m) => {
                    const [yr, mo] = m.split("-");
                    const d = new Date(parseInt(yr), parseInt(mo) - 1, 1);
                    const label = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
                    return (
                      <option key={m} value={m}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            
            {loading ? (
              <div className="py-12 flex justify-center items-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div className="py-16 text-center text-slate-500 text-sm">
                কোনো পড়াশোনার হিসাব পাওয়া যায়নি।
              </div>
            ) : (
              <div className="space-y-3 overflow-y-auto max-h-[420px] pr-1">
                {filteredTransactions.map((t) => (
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

            {/* Expenditure distribution */}
            {totalExpense > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-800">
                <h4 className="bengali-title text-sm font-bold mb-3 text-slate-300">ব্যয় বিভাজন</h4>
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
                            className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full"
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

        {/* Monthly History & Summary */}
        <div className="rounded-2xl glass-panel p-6">
          <h3 className="bengali-title text-xl font-bold mb-4 text-slate-200">মাসিক ইতিহাস ও সারসংক্ষেপ (Monthly History)</h3>
          {uniqueMonths.length === 0 ? (
            <p className="text-slate-500 text-sm">কোনো ইতিহাস পাওয়া যায়নি।</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {uniqueMonths.map((m) => {
                const [yr, mo] = m.split("-");
                const monthTransactions = transactions.filter((t) => {
                  const d = new Date(t.date);
                  return d.getFullYear() === parseInt(yr) && (d.getMonth() + 1) === parseInt(mo);
                });
                const mIncome = monthTransactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
                const mExpense = monthTransactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
                const mBalance = mIncome - mExpense;

                const dateObj = new Date(parseInt(yr), parseInt(mo) - 1, 1);
                const monthName = dateObj.toLocaleDateString("en-US", { month: "long", year: "numeric" });

                return (
                  <div
                    key={m}
                    onClick={() => setSelectedMonth(m === selectedMonth ? "all" : m)}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      selectedMonth === m
                        ? "border-indigo-500 bg-indigo-950/20 shadow-lg shadow-indigo-500/10"
                        : "border-slate-800/80 bg-slate-900/40 hover:border-slate-700"
                    }`}
                  >
                    <h4 className="font-bold text-sm text-slate-100 mb-2">{monthName}</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Income:</span>
                        <span className="text-emerald-400 font-semibold">+{mIncome.toLocaleString()} ৳</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Expense:</span>
                        <span className="text-rose-400 font-semibold">-{mExpense.toLocaleString()} ৳</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-800">
                        <span className="text-slate-300 font-semibold">Balance:</span>
                        <span className={`font-bold ${mBalance >= 0 ? "text-slate-100" : "text-rose-400"}`}>
                          {mBalance.toLocaleString()} ৳
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
