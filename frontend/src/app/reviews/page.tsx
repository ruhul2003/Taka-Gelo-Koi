import React from "react";
import { Star } from "lucide-react";

export default function ReviewsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="bengali-title text-4xl sm:text-5xl font-extrabold mb-4">User Testimonials</h1>
        <p className="text-slate-400 max-w-xl mx-auto">Hear from users who successfully controlled their expenses using Taka Gelo Koi.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
        <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex text-amber-400 gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
          </div>
          <p className="text-sm text-slate-300 leading-relaxed italic">
            &quot;I used to struggle balancing my mess food costs and pocket money every month. Now everything is in one place.&quot;
          </p>
          <div className="mt-auto">
            <h5 className="text-xs font-bold text-slate-100">Rakib Hossain</h5>
            <span className="text-[10px] text-slate-500 font-semibold">Student, University of Dhaka</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex text-amber-400 gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
          </div>
          <p className="text-sm text-slate-300 leading-relaxed italic">
            &quot;It plays a wonderful role in matching revenue and courier costs for my online clothing store.&quot;
          </p>
          <div className="mt-auto">
            <h5 className="text-xs font-bold text-slate-100">Fariha Akhter</h5>
            <span className="text-[10px] text-slate-500 font-semibold">F-Commerce Entrepreneur</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex text-amber-400 gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
          </div>
          <p className="text-sm text-slate-300 leading-relaxed italic">
            &quot;This dashboard helped me identify the exact flow of my family&apos;s monthly groceries and utility bills.&quot;
          </p>
          <div className="mt-auto">
            <h5 className="text-xs font-bold text-slate-100">Mahmud Hasan</h5>
            <span className="text-[10px] text-slate-500 font-semibold">Software Engineer</span>
          </div>
        </div>
      </div>
    </section>
  );
}
