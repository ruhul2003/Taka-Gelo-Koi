"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Wallet, LogOut, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

export default function LandingNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(isDark ? "dark" : "light");

    const observer = new MutationObserver(() => {
      const currentDark = document.documentElement.classList.contains("dark");
      setTheme(currentDark ? "dark" : "light");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navLinks = [
    { id: "home", label: "Home", path: "/" },
    { id: "features", label: "Features", path: "/features" },
    { id: "demo", label: "Live Demo", path: "/demo" }
  ];

  if (session) {
    const dashboardPath = (session.user as { role?: string }).role === "admin" 
      ? "/dashboard/admin" 
      : "/dashboard/daily";
    navLinks.push({ id: "dashboard", label: "Dashboard", path: dashboardPath });
  }

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-slate-800 px-6 py-4 mx-auto max-w-7xl flex items-center justify-between rounded-b-2xl backdrop-blur-md">
      <Link href="/" className="flex items-center gap-3">
        <div className="rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 p-2.5 shadow-indigo-500/20 shadow-md">
          <Wallet className="h-6 w-6 text-white" />
        </div>
        <span className="bengali-title text-2xl font-extrabold tracking-wider text-gradient">
          Taka Gelo Koi
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
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md text-slate-300 hover:text-white transition-all duration-300 hover:scale-[1.02]"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        {isPending ? (
          <div className="w-[120px] h-10 flex items-center justify-end">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
          </div>
        ) : session ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300 hover:scale-[1.02]"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        ) : (
          <>
            <Link href="/login" className="text-sm font-semibold hover:text-indigo-400 transition-colors">
              Login
            </Link>
            <Link 
              href="/signup" 
              className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02]"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
