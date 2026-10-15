"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Sun, Moon, Menu, X } from "lucide-react";
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
    { id: "demo", label: "Live Demo", path: "/demo" },
    { id: "reviews", label: "Reviews", path: "/reviews" },
    { id: "faq", label: "FAQ", path: "/faq" }
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
    <header className="sticky top-0 z-50 mx-auto max-w-[1440px] w-full px-3 sm:px-8 py-2 sm:py-2.5">
      <nav className="glass-panel border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between rounded-2xl backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group">
          <Image
            src="/logo.png"
            alt="Taka Gelo Koi Logo"
            width={48}
            height={48}
            className="h-9 w-9 sm:h-11 sm:w-11 object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <span className="bengali-title text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            টাকা গেল <span className="text-indigo-600 dark:text-indigo-400">কই</span>
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
                className={`relative text-sm font-medium transition-colors py-1 ${
                  isActive ? "text-indigo-600 dark:text-indigo-400 font-semibold" : "text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                }`}
              >
                <span className="bengali-title">{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="landing-navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-300 dark:hover:text-white transition-all duration-200"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <div className="hidden sm:flex items-center gap-3">
            {isPending ? (
              <div className="w-[80px] h-9 flex items-center justify-end">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 dark:border-indigo-400 border-t-transparent"></div>
              </div>
            ) : session ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-300 dark:hover:text-white transition-all duration-200 px-4 py-2 text-xs sm:text-sm font-medium"
              >
                <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors px-2">
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors"
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
            className="md:hidden mt-2 p-4 rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-xl space-y-3"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.id}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 font-semibold"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <div className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
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
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-4 py-2.5 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 text-sm font-semibold shadow-sm transition-colors"
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
