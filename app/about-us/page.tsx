import { Metadata } from "next";
import Link from "next/link";
import { Sparkles, CheckCircle2, ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Hapseg Varieties Store",
  description: "Delivering quality products and unforgettable shopping experiences across fashion, kitchenware, and lifestyle varieties.",
};

export default function AboutUsPage() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#35186b] via-[#4d239c] to-[#6c40d9] p-6 sm:p-12 text-white shadow-xl shadow-purple-950/10">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-block rounded-full bg-white/10 backdrop-blur-md text-[#fda173] border border-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            Our Story & Values
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Delivering Quality Products & Unforgettable Experiences
          </h1>
          <p className="text-xs sm:text-base text-purple-100/90 leading-relaxed pt-2">
            At Hapseg Varieties Store, we bring style, comfort, and innovation to your everyday life. We believe that authentic quality and timeless value never go out of fashion.
          </p>
        </div>
        <div className="absolute -right-8 -bottom-10 h-56 w-56 rounded-full bg-white/5 blur-2xl pointer-events-none" />
      </div>

      {/* Brand Mission & Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-slate-950">Who We Are</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Welcome to <strong className="text-[#6c40d9]">Hapseg Varieties Store</strong>. Born out of a passion for accessible luxury and practical everyday essentials, our physical stores in Ado Ekiti and our live digital catalog serve thousands of satisfied customers across Nigeria.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            From modern men’s and women’s fashion and footwear to high-durability kitchenware and lifestyle accessories, every product in our collection is personally inspected and curated to guarantee premium craftsmanship.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm space-y-2">
            <ShieldCheck className="h-6 w-6 text-[#6c40d9]" />
            <h3 className="font-bold text-slate-900 text-sm">Verified Authenticity</h3>
            <p className="text-xs text-slate-500">Every item is rigorously quality-checked before dispatch.</p>
          </div>

          <div className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm space-y-2">
            <HeartHandshake className="h-6 w-6 text-[#e67e51]" />
            <h3 className="font-bold text-slate-900 text-sm">Customer-Centric</h3>
            <p className="text-xs text-slate-500">Direct human support on WhatsApp with zero bots or friction.</p>
          </div>

          <div className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm space-y-2">
            <CheckCircle2 className="h-6 w-6 text-[#6c40d9]" />
            <h3 className="font-bold text-slate-900 text-sm">Fair & Honest Pricing</h3>
            <p className="text-xs text-slate-500">Direct importer pricing in Nigerian Naira with no hidden fees.</p>
          </div>

          <div className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm space-y-2">
            <Sparkles className="h-6 w-6 text-[#e67e51]" />
            <h3 className="font-bold text-slate-900 text-sm">Instant Daily Drops</h3>
            <p className="text-xs text-slate-500">Fresh arrivals updated constantly direct from our physical stores.</p>
          </div>
        </div>
      </div>

      {/* Explore Store Callout Banner */}
      <div className="rounded-3xl bg-slate-100 border border-slate-200/80 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-black text-slate-950">Ready to explore our catalog?</h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Browse our curated collections across fashion, kitchenware, and lifestyle items.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#6c40d9] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-500/20 transition hover:bg-[#592ebf] active:scale-95 whitespace-nowrap"
        >
          <span>Browse All Shops</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
