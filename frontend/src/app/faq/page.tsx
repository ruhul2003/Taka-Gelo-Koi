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
    { q: "Is Taka Gelo Koi app completely free?", a: "Yes, the basic tracking features of Taka Gelo Koi are completely free for all users." },
    { q: "How does the admin panel work?", a: "The admin panel monitors total users and aggregate transactions. A secret key is required to access it." },
    { q: "My financial data is how much safe?", a: "All your data is secure in your session. Better Auth secures sessions and passwords using modern encryption." }
  ];

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="bengali-title text-4xl sm:text-5xl font-extrabold mb-4">Frequently Asked Questions</h1>
        <p className="text-slate-400">Find answers to common questions about Taka Gelo Koi below.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = !!faqOpen[index];
          return (
            <div 
              key={index} 
              className="glass-panel rounded-xl overflow-hidden border border-slate-900"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left font-bold text-slate-200 hover:text-slate-100 text-sm sm:text-base outline-none transition-colors"
              >
                <span className="bengali-title">{faq.q}</span>
                <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-1 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-900/50">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
