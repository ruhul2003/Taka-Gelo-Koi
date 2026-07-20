"use client";

import React from "react";
import Link from "next/link";
import { Wallet, Heart, ArrowUpRight, Mail } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/ruhul2003/Taka-Gelo-Koi", icon: GithubIcon },
    { name: "Facebook", href: "#", icon: FacebookIcon },
    { name: "Twitter", href: "#", icon: TwitterIcon },
    { name: "LinkedIn", href: "#", icon: LinkedinIcon },
    { name: "Email", href: "mailto:support@takagelokoi.com", icon: Mail },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Live Demo", href: "/demo" },
    { name: "FAQ", href: "/faq" },
    { name: "User Reviews", href: "/reviews" },
  ];

  const dashboardLinks = [
    { name: "দৈনন্দিন জীবন (Daily)", href: "/dashboard/daily" },
    { name: "ব্যবসায়িক হিসাব (Business)", href: "/dashboard/business" },
    { name: "পড়াশোনার খরচ (Study)", href: "/dashboard/study" },
  ];

  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-slate-900 bg-slate-100/90 dark:bg-slate-950/90 backdrop-blur-md text-slate-800 dark:text-slate-200 shrink-0 transition-colors duration-300">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 w-fit">
              <div className="rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 p-2.5 shadow-indigo-500/20 shadow-md text-white">
                <Wallet className="h-6 w-6" />
              </div>
              <span className="bengali-title text-2xl font-extrabold tracking-wider text-indigo-600 dark:text-gradient">
                টাকা গেল কই ?
              </span>
            </Link>
            <p className="bengali-title text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              আপনার দৈনন্দিন জীবন, ব্যবসা এবং পড়াশোনার খরচের সঠিক হিসেব রাখুন একদম সহজ ও নিরাপদ উপায়ে।
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-slate-900 dark:text-slate-100">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors flex items-center gap-1.5 w-fit"
                  >
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dashboards */}
          <div className="space-y-4">
            <h4 className="bengali-title text-sm font-bold tracking-wider uppercase text-slate-900 dark:text-slate-100">
              ড্যাশবোর্ডসমূহ
            </h4>
            <ul className="space-y-2.5 text-sm">
              {dashboardLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="bengali-title text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors flex items-center gap-1.5 w-fit"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / App Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-slate-900 dark:text-slate-100">
              Stay Connected
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Track your financial freedom with precision. Designed for personal, business & student life.
            </p>
            <div className="rounded-2xl p-4 bg-white/80 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                100% Free & Open System
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>&copy; {currentYear} Taka Gelo Koi. All rights reserved.</p>
          <div className="flex items-center gap-1 bengali-title">
            <span>বাংলাদেশে নির্মিত</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 mx-0.5 animate-pulse" />
          </div>
        </div>

      </div>
    </footer>
  );
}
