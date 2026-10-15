"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { LogOut, Wallet, User as UserIcon, Shield, Coins, Briefcase, GraduationCap, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
  children: React.ReactNode;
  allowedRole: "daily" | "business" | "study" | "admin";
}

export default function DashboardLayout({ children, allowedRole }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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
    { id: "demo", label: "Live Demo", path: "/demo" },
    {
      id: "dashboard",
      label: "Dashboard",
      path: allowedRole === "admin" ? "/dashboard/admin" : "/dashboard/daily"
    }
  ];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        if (!session || !session.data) {
          router.push("/login");
          return;
        }

        const currentUser = session.data.user as any;
        setUser(currentUser);

        // Enforce role permission checks
        if (currentUser.role === "admin") {
          if (allowedRole !== "admin") {
            router.push("/dashboard/admin");
            return;
          }
        } else {
          // Normal user
          if (allowedRole === "admin") {
            router.push("/dashboard/daily");
            return;
          }
        }
        setLoading(false);
      } catch (err) {
        console.error("Auth check failed:", err);
        router.push("/login");
      }
    };

    checkAuth();
  }, [router, allowedRole]);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
          <p className="bengali-title text-xl text-indigo-400 font-semibold tracking-wide">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/80 dark:border-slate-800/80 px-6 py-2.5 sm:py-3 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0 group" onClick={() => router.push("/")}>
            <Image
              src="/logo.png"
              alt="Taka Gelo Koi Logo"
              width={48}
              height={48}
              className="h-9 w-9 sm:h-11 sm:w-11 object-contain transition-transform duration-200 group-hover:scale-105"
              priority
            />
            <span className="bengali-title text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              টাকা গেল <span className="text-indigo-600 dark:text-indigo-400">কই</span>
            </span>
          </div>

          {/* Navigation Links in Center */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.path || (link.id === "dashboard" && pathname.startsWith("/dashboard"));
              return (
                <Link
                  key={link.id}
                  href={link.path}
                  className={`relative text-sm font-medium transition-colors py-1.5 ${
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

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-300 dark:hover:text-white transition-all duration-200"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <div className="flex items-center gap-2 rounded-xl bg-white dark:bg-slate-900 px-3.5 py-1.5 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">
              {user.role === "admin" ? (
                <Shield className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              ) : (
                <UserIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              )}
              <span className="text-xs font-semibold max-w-[120px] truncate">{user.name}</span>
              <span className="text-[10px] uppercase bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 px-2 py-0.5 rounded-full font-bold">
                {user.role}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-300 dark:hover:text-white transition-all duration-200 px-4 py-2 text-xs font-semibold"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sub-Header Navigation for Normal Users */}
      {user && user.role !== "admin" && (
        <div className="border-b border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md px-6 py-2.5">
          <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto">
            <button
              onClick={() => router.push("/dashboard/daily")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all border shrink-0 ${
                allowedRole === "daily"
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Coins className="h-3.5 w-3.5" />
              <span>দৈনন্দিন জীবন</span>
            </button>
            <button
              onClick={() => router.push("/dashboard/business")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all border shrink-0 ${
                allowedRole === "business"
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              <span>ব্যবসায়িক হিসাব</span>
            </button>
            <button
              onClick={() => router.push("/dashboard/study")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all border shrink-0 ${
                allowedRole === "study"
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span>পড়াশোনার খরচ</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
