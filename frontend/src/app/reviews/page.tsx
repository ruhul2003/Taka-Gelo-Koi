"use client";

import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function ReviewsPage() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto max-w-7xl px-6 py-16"
    >
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-center mb-14"
      >
        <h1 className="bengali-title text-4xl sm:text-5xl font-extrabold mb-4 text-slate-900 dark:text-slate-100">ব্যবহারকারীদের অভিজ্ঞতা</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">যাদের প্রতিদিনের অর্থ ব্যবস্থাপনাকে সহজ করেছে আমাদের সিস্টেম।</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 p-6 flex flex-col gap-4">
          <div className="flex text-indigo-600 dark:text-indigo-400 gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-indigo-600 dark:fill-indigo-400" />)}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
            &quot;মেসের বাজার খরচ এবং পড়াশোনার হাতখরচ মেলানো খুব কঠিন ছিল। এখন মাস শেষে সহজেই ব্যালেন্স বুঝতে পারি।&quot;
          </p>
          <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-800/60">
            <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">রাকিব হোসেন</h5>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">শিক্ষার্থী, ঢাকা বিশ্ববিদ্যালয়</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 p-6 flex flex-col gap-4">
          <div className="flex text-indigo-600 dark:text-indigo-400 gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-indigo-600 dark:fill-indigo-400" />)}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
            &quot;আমার অনলাইন শপের কুরিয়ার বিল ও দৈনিক লাভ-ক্ষতি ক্যালকুলেট করার জন্য এর চেয়ে নিখুঁত টুল আর পাইনি।&quot;
          </p>
          <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-800/60">
            <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">ফারিহা আক্তার</h5>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">উদ্যোক্তা, এফ-কমার্স</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 p-6 flex flex-col gap-4">
          <div className="flex text-indigo-600 dark:text-indigo-400 gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-indigo-600 dark:fill-indigo-400" />)}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
            &quot;সংসারের মাসিক কেনাকাটা এবং ইউটিলিটি বিলের স্বচ্ছ হিসাব পরিবারে বাজেট নিয়ন্ত্রণ এনে দিয়েছে।&quot;
          </p>
          <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-800/60">
            <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">মাহমুদ হাসান</h5>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">সফটওয়্যার প্রকৌশলী</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
