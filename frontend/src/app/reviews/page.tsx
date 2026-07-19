"use client";

import React from "react";
import LandingNavbar from "@/components/LandingNavbar";
import { Star, Wallet } from "lucide-react";

export default function ReviewsPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100 selection:bg-indigo-500">
      {/* Background Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-violet-900/20 blur-[120px]" />
      <div className="absolute bottom-[20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blue-900/20 blur-[150px]" />

      <LandingNavbar />

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="bengali-title text-4xl sm:text-5xl font-extrabold mb-4">ব্যবহারকারীদের অভিজ্ঞতা</h1>
          <p className="text-slate-400 max-w-xl mx-auto">টাকা গেল কই অ্যাপ্লিকেশন ব্যবহার করে যারা তাদের খরচ নিয়ন্ত্রণ করতে পেরেছেন।</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed italic">
              "মেসের খাবারের হিসাব আর হাত খরচ মেলাতে আমার প্রতি মাসে মাথা নষ্ট হয়ে যেত। এখন সব হিসাব এক জায়গায় থাকে।"
            </p>
            <div className="mt-auto">
              <h5 className="text-xs font-bold text-slate-100">রাকিব হোসেন</h5>
              <span className="text-[10px] text-slate-500 font-semibold">শিক্ষার্থী, ঢাকা বিশ্ববিদ্যালয়</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed italic">
              "আমার অনলাইন ক্লোথিং স্টোরের রেভিনিউ আর কুরিয়ার খরচ মেলানোর জন্য এটি অত্যন্ত চমৎকার ভূমিকা রাখছে।"
            </p>
            <div className="mt-auto">
              <h5 className="text-xs font-bold text-slate-100">ফারিহা আক্তার</h5>
              <span className="text-[10px] text-slate-500 font-semibold">এফ-কমার্স উদ্যোক্তা</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed italic">
              "ফ্যামিলির মাসিক বাজার ও ইউটিলিটি বিলের সঠিক গতিপথ চিহ্নিত করতে এই ড্যাশবোর্ডটি দারুণ সাহায্য করেছে।"
            </p>
            <div className="mt-auto">
              <h5 className="text-xs font-bold text-slate-100">মাহমুদ হাসান</h5>
              <span className="text-[10px] text-slate-500 font-semibold">সফটওয়্যার ইঞ্জিনিয়ার</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-12 px-6 bg-slate-950/60">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-slate-900 p-2 border border-slate-800">
              <Wallet className="h-5 w-5 text-indigo-400" />
            </div>
            <span className="bengali-title text-xl font-bold tracking-wider text-slate-200">
              টাকা গেল কই ?
            </span>
          </div>
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} টাকা গেল কই ? সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </footer>
    </div>
  );
}
