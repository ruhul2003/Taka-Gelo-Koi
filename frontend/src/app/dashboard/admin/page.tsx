"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Users, Coins, ShieldAlert, Award, FileText, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface UserStat {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  _count: {
    transactions: number;
  };
}

interface AdminStats {
  totalUsers: number;
  userCountByRole: {
    admin: number;
    user: number;
  };
  totalTransactions: number;
  globalFinances: {
    totalIncome: number;
    totalExpense: number;
    netBalance: number;
  };
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserStat[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const [usersRes, statsRes] = await Promise.all([
        fetch("http://localhost:5000/api/admin/users", { credentials: "include" }),
        fetch("http://localhost:5000/api/admin/stats", { credentials: "include" }),
      ]);

      if (usersRes.ok && statsRes.ok) {
        const usersData = await usersRes.json();
        const statsData = await statsRes.json();
        setUsers(usersData);
        setStats(statsData);
      } else {
        setError("অ্যাডমিন ডেটা লোড করতে ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      console.error(err);
      setError("সার্ভার কানেকশন এরর।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout allowedRole="admin">
      <div className="space-y-8">
        {/* Banner */}
        <div className="flex flex-col gap-2">
          <h1 className="bengali-title text-3xl font-extrabold text-slate-100">সিস্টেম অ্যাডমিন ড্যাশবোর্ড</h1>
          <p className="text-slate-400 text-sm">সমগ্র অ্যাপ্লিকেশনের ব্যবহারকারী, লেনদেন এবং বৈশ্বিক পরিসংখ্যান মনিটর করুন।</p>
        </div>

        {error && (
          <div className="rounded-xl bg-rose-950/40 border border-rose-900 px-4 py-3 text-sm text-rose-300">
            {error}
          </div>
        )}

        {stats && (
          <>
            {/* Global Stats */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl glass-panel p-6 border-l-4 border-l-violet-500">
                <div className="flex justify-between items-start">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">মোট ব্যবহারকারী</p>
                  <Users className="h-5 w-5 text-violet-400" />
                </div>
                <h3 className="text-3xl font-bold text-slate-100 mt-1">{stats.totalUsers} জন</h3>
                <p className="text-xs text-slate-500 mt-2">সিস্টেমে নিবন্ধিত মোট অ্যাকাউন্ট</p>
              </div>

              <div className="rounded-2xl glass-panel p-6 border-l-4 border-l-blue-500">
                <div className="flex justify-between items-start">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">বৈশ্বিক আয়</p>
                  <ArrowUpRight className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="text-3xl font-bold text-emerald-400 mt-1">
                  {stats.globalFinances.totalIncome.toLocaleString()} ৳
                </h3>
                <p className="text-xs text-slate-500 mt-2">সকল ব্যবহারকারীর মোট জমানো বা আয়</p>
              </div>

              <div className="rounded-2xl glass-panel p-6 border-l-4 border-l-rose-500">
                <div className="flex justify-between items-start">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">বৈশ্বিক ব্যয়</p>
                  <ArrowDownRight className="h-5 w-5 text-rose-400" />
                </div>
                <h3 className="text-3xl font-bold text-rose-400 mt-1">
                  {stats.globalFinances.totalExpense.toLocaleString()} ৳
                </h3>
                <p className="text-xs text-slate-500 mt-2">সকল ব্যবহারকারীর মোট খরচ বিবরণী</p>
              </div>

              <div className="rounded-2xl glass-panel p-6 border-l-4 border-l-emerald-500">
                <div className="flex justify-between items-start">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">মোট ট্রানজেকশন</p>
                  <FileText className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="text-3xl font-bold text-slate-100 mt-1">{stats.totalTransactions} টি</h3>
                <p className="text-xs text-slate-500 mt-2">মোট সংগৃহীত হিসাবের সংখ্যা</p>
              </div>
            </div>

            {/* Role Breakdown */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4 text-center">
                <span className="text-xs font-bold text-slate-400">সাধারণ ব্যবহারকারী (Users)</span>
                <h4 className="text-2xl font-black text-violet-400 mt-1">{stats.userCountByRole.user || 0}</h4>
              </div>
              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4 text-center">
                <span className="text-xs font-bold text-slate-400">সিস্টেম অ্যাডমিন (Admins)</span>
                <h4 className="text-2xl font-black text-amber-400 mt-1">{stats.userCountByRole.admin || 0}</h4>
              </div>
            </div>
          </>
        )}

        {/* User Listing Table */}
        <div className="rounded-2xl glass-panel p-6">
          <h3 className="bengali-title text-xl font-bold mb-4 text-slate-200">ব্যবহারকারী তালিকা</h3>
          
          {loading ? (
            <div className="py-12 flex justify-center items-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
            </div>
          ) : users.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              কোনো ব্যবহারকারী পাওয়া যায়নি।
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4">নাম</th>
                    <th className="py-3 px-4">ইমেইল</th>
                    <th className="py-3 px-4">ভূমিকা</th>
                    <th className="py-3 px-4">লেনদেন সংখ্যা</th>
                    <th className="py-3 px-4">নিবন্ধন তারিখ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-900/20 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-slate-200">{u.name}</td>
                      <td className="py-3.5 px-4 text-slate-400">{u.email}</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase font-extrabold ${
                          u.role === "admin" 
                            ? "bg-amber-950 text-amber-400 border border-amber-900" 
                            : u.role === "business" 
                            ? "bg-blue-950 text-blue-400 border border-blue-900"
                            : u.role === "study"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-900"
                            : "bg-violet-950 text-violet-400 border border-violet-900"
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 font-bold">{u._count.transactions} টি</td>
                      <td className="py-3.5 px-4 text-slate-500 text-xs">
                        {new Date(u.createdAt).toLocaleDateString("bn-BD", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
