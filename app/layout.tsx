import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { MobileNavigation } from "@/components/MobileNavigation";
import { CategoryPills } from "@/components/CategoryPills";
import { ShoppingBag, MessageCircle, ShieldCheck } from "lucide-react";
import "./globals.css";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "HAPSEG — Premium Lifestyle & Retail",
  description: "Browse the latest fashion, kitchenware, and lifestyle varieties. Direct ordering and fast nationwide delivery.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontSans.variable} font-sans h-full bg-slate-50/70 antialiased`}>
      <body className="min-h-screen flex flex-col text-slate-900 pb-20 md:pb-10 selection:bg-slate-900 selection:text-white">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
            
            {/* Brand Logo */}
            <Link href="/fashion" className="group flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm transition-transform group-hover:scale-105 active:scale-95">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-tight text-slate-950">
                  HAPSEG<span className="text-emerald-600">.</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Official Store
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 rounded-full bg-slate-100 p-1 border border-slate-200/70">
              <Link
                href="/fashion"
                className="rounded-full px-4 py-1.5 text-xs font-bold text-slate-600 transition hover:text-slate-900 hover:bg-white"
              >
                Fashion
              </Link>
              <Link
                href="/kitchen"
                className="rounded-full px-4 py-1.5 text-xs font-bold text-slate-600 transition hover:text-slate-900 hover:bg-white"
              >
                Kitchen
              </Link>
              <Link
                href="/varieties"
                className="rounded-full px-4 py-1.5 text-xs font-bold text-slate-600 transition hover:text-slate-900 hover:bg-white"
              >
                Varieties
              </Link>
            </nav>

            {/* Customer Assurance Badge */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200/80 rounded-full px-3 py-1">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available Now</span>
            </div>
          </div>

          {/* Quick Category Filter Pills for Mobile */}
          <div className="md:hidden border-t border-slate-100 bg-white/70 px-4 py-2">
            <CategoryPills />
          </div>
        </header>

        {/* Main Storefront Area */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-5">
          {children}
        </main>

        {/* Footer */}
        <footer className="hidden md:block border-t border-slate-200/70 bg-white py-8 mt-12 text-center text-xs text-slate-500">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} HAPSEG. All rights reserved.</p>
            <div className="flex items-center gap-5 text-slate-600 font-medium">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Guaranteed Quality</span>
              <span className="flex items-center gap-1.5"><MessageCircle className="h-4 w-4 text-emerald-600" /> Direct WhatsApp Inquiries</span>
            </div>
          </div>
        </footer>

        {/* Floating Mobile Bottom Navigation */}
        <MobileNavigation />
      </body>
    </html>
  );
}
