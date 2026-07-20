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
          <h1 className="bengali-title text-4xl sm:text-5xl font-extrabold mb-4">User Testimonials</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Hear from users who successfully controlled their expenses using Taka Gelo Koi.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed italic">
              &quot;I used to struggle balancing my mess food costs and pocket money every month. Now everything is in one place.&quot;
            </p>
            <div className="mt-auto">
              <h5 className="text-xs font-bold text-slate-100">Rakib Hossain</h5>
              <span className="text-[10px] text-slate-500 font-semibold">Student, University of Dhaka</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed italic">
              &quot;It plays a wonderful role in matching revenue and courier costs for my online clothing store.&quot;
            </p>
            <div className="mt-auto">
              <h5 className="text-xs font-bold text-slate-100">Fariha Akhter</h5>
              <span className="text-[10px] text-slate-500 font-semibold">F-Commerce Entrepreneur</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed italic">
              &quot;This dashboard helped me identify the exact flow of my family&apos;s monthly groceries and utility bills.&quot;
            </p>
            <div className="mt-auto">
              <h5 className="text-xs font-bold text-slate-100">Mahmud Hasan</h5>
              <span className="text-[10px] text-slate-500 font-semibold">Software Engineer</span>
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
              Taka Gelo Koi
            </span>
          </div>
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Taka Gelo Koi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
