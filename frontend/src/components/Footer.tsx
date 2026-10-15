"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowUpRight, Mail } from "lucide-react";

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
    <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/60 dark:bg-slate-950/80 backdrop-blur-md text-slate-800 dark:text-slate-200 shrink-0 transition-colors duration-200">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <Image
                src="/logo.png"
                alt="Taka Gelo Koi Logo"
                width={56}
                height={56}
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain transition-transform duration-200 group-hover:scale-105"
              />
              <span className="bengali-title text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                টাকা গেল <span className="text-indigo-600 dark:text-indigo-400">কই ?</span>
              </span>
            </Link>
            <p className="bengali-title text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              আপনার দৈনন্দিন জীবন, ব্যবসা এবং পড়াশোনার খরচের সঠিক হিসেব রাখুন একদম সহজ ও নিরাপদ উপায়ে।
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 shadow-sm transition-all duration-200 hover:scale-105"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-wider uppercase text-slate-900 dark:text-slate-100">
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
            <h4 className="bengali-title text-xs font-bold tracking-wider uppercase text-slate-900 dark:text-slate-100">
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
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* App Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-wider uppercase text-slate-900 dark:text-slate-100">
              About Platform
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              পরিকল্পিত আর্থিক স্বাধীনতা ও নিরাপদ হিসাব ব্যবস্থার জন্য নির্মিত মিনিমালিস্ট ফিনান্স ট্র্যাকার।
            </p>
            <div className="rounded-xl p-3.5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
                ১০০% ফ্রি ও নিরাপদ ব্যবস্থা
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>&copy; {currentYear} Taka Gelo Koi. All rights reserved.</p>
          <div className="flex items-center gap-1.5 bengali-title">
            <span>বাংলাদেশে নির্মিত</span>
            <Heart className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 fill-indigo-600 dark:fill-indigo-400" />
          </div>
        </div>

      </div>
    </footer>
  );
}
