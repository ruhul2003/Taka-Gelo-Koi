import React from "react";
import { Wallet } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-900 py-12 px-6 bg-slate-950/60 w-full shrink-0">
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
  );
}
