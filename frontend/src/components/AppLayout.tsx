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
    <div className="relative min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 overflow-x-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-violet-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blue-900/10 blur-[150px] pointer-events-none" />
      
      <LandingNavbar />
      <main className="flex-grow w-full relative z-10">
        {children}
      </main>
      <Footer />

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 p-3.5 rounded-2xl bg-indigo-600/90 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 backdrop-blur-md border border-indigo-400/30 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
        >
          <ArrowUp className="h-5 w-5 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
}
