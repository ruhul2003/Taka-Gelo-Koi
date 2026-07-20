"use client";

import React, { useState } from "react";
import LandingNavbar from "@/components/LandingNavbar";
import { ChevronDown, Wallet } from "lucide-react";
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
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100 selection:bg-indigo-500">
      {/* Background Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-violet-900/20 blur-[120px]" />
      <div className="absolute bottom-[20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blue-900/20 blur-[150px]" />

      <LandingNavbar />

      <section className="relative z-10 mx-auto max-w-4xl px-6 py-16">
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
