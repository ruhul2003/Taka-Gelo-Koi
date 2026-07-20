"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Wallet, LogOut, Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";

export default function LandingNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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
    <header className="sticky top-0 z-50 mx-auto max-w-[1440px] w-full px-3 sm:px-8 py-3 sm:py-4">
      <nav className="glass-panel border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between rounded-2xl backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 p-2 sm:p-2.5 shadow-indigo-500/20 shadow-md">
            <Wallet className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <span className="bengali-title text-lg sm:text-2xl font-extrabold tracking-wider text-gradient">
            Taka Gelo Koi
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.id}
                href={link.path}
                className={`relative text-sm font-medium transition-colors py-1.5 ${
                  isActive ? "text-indigo-600 dark:text-indigo-400 font-bold" : "text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300"
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

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:text-slate-300 dark:hover:text-white transition-all duration-300 hover:scale-[1.02]"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <div className="hidden sm:flex items-center gap-3">
            {isPending ? (
              <div className="w-[100px] h-10 flex items-center justify-end">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
              </div>
            ) : session ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:text-slate-300 dark:hover:text-white transition-all duration-300 hover:scale-[1.02] px-5 py-2.5 text-sm font-semibold"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Link href="/login" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors">
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

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:text-slate-300 dark:hover:text-white transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Animated Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 p-4 rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl space-y-3"
          >
            <div className="flex flex-col space-y-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.id}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 font-bold"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col space-y-2">
              {session ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300 px-4 py-2.5 text-sm font-semibold transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-4 py-2.5 text-sm font-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2.5 text-sm font-semibold shadow-md shadow-indigo-500/20"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
