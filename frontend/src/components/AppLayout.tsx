"use client";

import React from "react";
import { usePathname } from "next/navigation";
import LandingNavbar from "./LandingNavbar";
import Footer from "./Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
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
    </div>
  );
}
