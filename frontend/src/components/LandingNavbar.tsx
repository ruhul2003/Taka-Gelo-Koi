"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingNavbar() {
  const pathname = usePathname();

  const navLinks = [
    { id: "home", label: "হোম", path: "/" },
    { id: "features", label: "ফিচারসমূহ", path: "/features" },
    { id: "demo", label: "লাইভ ডেমো", path: "/demo" },
    { id: "reviews", label: "মতামত", path: "/reviews" },
    { id: "faq", label: "প্রশ্নোত্তরি", path: "/faq" }
  ];

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-slate-800 px-6 py-4 mx-auto max-w-7xl flex items-center justify-between rounded-b-2xl backdrop-blur-md">
      <Link href="/" className="flex items-center gap-3">
        <div className="rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 p-2.5 shadow-indigo-500/20 shadow-md">
          <Wallet className="h-6 w-6 text-white" />
        </div>
        <span className="bengali-title text-2xl font-extrabold tracking-wider text-gradient">
          টাকা গেল কই ?
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.id}
              href={link.path}
              className={`relative text-sm font-medium transition-colors py-1.5 ${
                isActive ? "text-indigo-400 font-bold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span className="bengali-title">{link.label}</span>
              {isActive && (
                <motion.div
                  layoutId="landing-navbar-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-semibold hover:text-indigo-400 transition-colors">
          প্রবেশ করুন
        </Link>
        <Link 
          href="/signup" 
          className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02]"
        >
          শুরু করুন
        </Link>
      </div>
    </nav>
  );
}
