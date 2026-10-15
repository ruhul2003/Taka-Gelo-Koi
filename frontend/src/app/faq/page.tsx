"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQPage() {
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const faqs = [
    { q: "টাকা গেল কই অ্যাপটি কি সম্পূর্ণ ফ্রি?", a: "হ্যাঁ, টাকা গেল কই অ্যাপের মূল ট্র্যাকিং ও বাজেট ফিচারগুলো সবার জন্য আজীবন বিনামূল্যে উন্মুক্ত।" },
    { q: "অ্যাডমিন প্যানেল কিভাবে কাজ করে?", a: "অ্যাডমিন প্যানেল মোট ব্যবহারকারী ও সামগ্রিক লেনদেনের সারসংক্ষেপ প্রদর্শন করে। এটি অ্যাক্সেস করতে বিশেষ সিক্রেট কি প্রয়োজন।" },
    { q: "আমার আর্থিক তথ্য কতটা নিরাপদ?", a: "আপনার তথ্য সম্পূর্ণ সুরক্ষিত। Better Auth আধুনিক এনক্রিপশন ও সেশন ম্যানেজমেন্টের মাধ্যমে আপনার পাসওয়ার্ড ও ডাটা রক্ষা করে।" }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto max-w-4xl px-6 py-16"
    >
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-center mb-12"
      >
        <h1 className="bengali-title text-4xl sm:text-5xl font-extrabold mb-4 text-slate-900 dark:text-slate-100">সাধারণ জিজ্ঞাসা (FAQ)</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">টাকা গেল কই সংক্রান্ত আপনার সাধারণ প্রশ্নের উত্তর জেনে নিন।</p>
      </motion.div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = !!faqOpen[index];
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.08 }}
              key={index} 
              className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 transition-colors"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm sm:text-base outline-none transition-colors cursor-pointer"
              >
                <span className="bengali-title">{faq.q}</span>
                <ChevronDown className={`h-4 w-4 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180 text-indigo-600 dark:text-indigo-400" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-1 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
