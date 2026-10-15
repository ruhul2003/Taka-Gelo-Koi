"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import LandingNavbar from "./LandingNavbar";
import Footer from "./Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Do not show landing navbar and footer on dashboard and auth pages
  const isDashboard = pathname.startsWith("/dashboard");
  const isAuth = pathname === "/login" || pathname === "/signup";

  if (isDashboard || isAuth) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white overflow-x-hidden transition-colors duration-200">
      {/* Subtle Minimal Primary Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[360px] bg-indigo-500/[0.04] dark:bg-indigo-500/[0.06] blur-[120px] pointer-events-none" />
      
      <LandingNavbar />
      <main className="flex-grow w-full relative z-10">
        {children}
      </main>
      <Footer />

      {/* Minimal Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md border border-indigo-500/20 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
        >
          <ArrowUp className="h-4 w-4 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
}
