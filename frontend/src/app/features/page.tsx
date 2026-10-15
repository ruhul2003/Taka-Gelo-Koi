"use client";

import { Coins, Briefcase, GraduationCap, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesPage() {
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
        <h1 className="bengali-title text-4xl sm:text-5xl font-extrabold mb-4 text-slate-900 dark:text-slate-100">৩টি বিশেষায়িত ড্যাশবোর্ড মোড</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">আপনার জীবনের প্রতিটি স্তরের আর্থিক হিসাবকে সুশৃঙ্খল ও সহজ করার জন্য প্রস্তুতকৃত।</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Card 1: Daily Life */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl p-7 flex flex-col gap-5 border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 transition-all duration-200 hover:border-indigo-500/40"
        >
          <div className="rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 p-3 w-fit text-indigo-600 dark:text-indigo-400">
            <Coins className="h-6 w-6" />
          </div>
          <div>
            <h3 className="bengali-title text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
              দৈনন্দিন জীবন ড্যাশবোর্ড
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              বাজার খরচ, বাড়িভাড়া, বিদ্যুৎ বিল এবং ট্রান্সপোর্ট খরচের সুনির্দিষ্ট হিসাব রাখুন। মাস শেষে সহজে দেখুন মোট ব্যয়ের চিত্র।
            </p>
          </div>
          <ul className="mt-auto space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              আয় ও ব্যয়ের নিয়মিত ট্র্যাকার
            </li>
            <li className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              ক্যাটাগরি-ভিত্তিক ভিজ্যুয়াল চার্ট
            </li>
          </ul>
        </motion.div>

        {/* Card 2: Business */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl p-7 flex flex-col gap-5 border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 transition-all duration-200 hover:border-indigo-500/40"
        >
          <div className="rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 p-3 w-fit text-indigo-600 dark:text-indigo-400">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <h3 className="bengali-title text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
              ব্যবসায়িক ড্যাশবোর্ড
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              ব্যবসায়ের মোট বিক্রয়, পরিচালন ব্যয়, লাভ-ক্ষতির মার্জিন এবং কাস্টমার পেমেন্ট ট্র্যাকিং করুন এক জায়গায়।
            </p>
          </div>
          <ul className="mt-auto space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              লাভ ও ক্ষতির সুস্পষ্ট বিবরণী
            </li>
            <li className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              রেভিনিউ ফিল্টারিং ব্যবস্থা
            </li>
          </ul>
        </motion.div>

        {/* Card 3: Study */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl p-7 flex flex-col gap-5 border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 transition-all duration-200 hover:border-indigo-500/40"
        >
          <div className="rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 p-3 w-fit text-indigo-600 dark:text-indigo-400">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h3 className="bengali-title text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
              শিক্ষার্থীদের বাজেট
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              সেমিস্টার ফি, বইপত্র, মেস ভাড়া কিংবা হাতখরচ—প্রতি মাসের জন্য আলাদা বাজেট সেট করে অতিরিক্ত খরচ রোধ করুন।
            </p>
          </div>
          <ul className="mt-auto space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              পড়াশোনা ও হাতখরচ বিভাজন
            </li>
            <li className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              বাজেট লিমিট ও প্রগ্রেস ট্র্যাকিং
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
}
