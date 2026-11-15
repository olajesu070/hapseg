import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { MobileNavigation } from "@/components/MobileNavigation";
import { CategoryPills } from "@/components/CategoryPills";
import { NavigationDrawer } from "@/components/NavigationDrawer";
import { MessageCircle, ShieldCheck } from "lucide-react";
import "./globals.css";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Hapseg Varieties Store",
  description: "Browse the latest fashion, kitchenware, and lifestyle varieties. Direct ordering and fast nationwide delivery.",
  icons: {
    icon: "/logo.png",
  },
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
            
            {/* Brand Official Logo */}
            <Link href="/fashion" className="group flex items-center gap-2">
              <div className="relative h-10 w-32 sm:h-11 sm:w-36 transition-transform group-hover:scale-105 active:scale-95">
                <Image
                  src="/logo.png"
                  alt="Hapseg Varieties Store"
                  fill
                  priority
                  className="object-contain object-left"
                />
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
              <span className="h-4 w-px bg-slate-300 mx-1" />
              <Link
                href="/about-us"
                className="rounded-full px-3 py-1.5 text-xs font-bold text-slate-500 transition hover:text-slate-900"
              >
                About
              </Link>
              <Link
                href="/contact-us"
                className="rounded-full px-3 py-1.5 text-xs font-bold text-slate-500 transition hover:text-slate-900"
              >
                Contact
              </Link>
            </nav>

            {/* Right Side: Collections Drawer Menu + WhatsApp Chat */}
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/2347030797836?text=Hello%20Hapseg%20Store%2C%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 rounded-full px-3.5 py-1.5 hover:bg-emerald-100 transition active:scale-95"
              >
                <MessageCircle className="h-3.5 w-3.5 fill-current" />
                <span>Chat</span>
              </a>

              {/* Collections & Info Slide-out Menu Button */}
              <NavigationDrawer />
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
            <div className="flex items-center gap-3">
              <div className="relative h-7 w-24">
                <Image
                  src="/logo.png"
                  alt="Hapseg Varieties Store"
                  fill
                  className="object-contain"
                />
              </div>
              <p>© {new Date().getFullYear()} Hapseg Varieties Store. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-5 text-slate-600 font-medium">
              <Link href="/fashion" className="hover:text-slate-950 transition">Fashion</Link>
              <Link href="/kitchen" className="hover:text-slate-950 transition">Kitchen</Link>
              <Link href="/varieties" className="hover:text-slate-950 transition">Varieties</Link>
              <Link href="/about-us" className="hover:text-slate-950 transition">About Us</Link>
              <Link href="/contact-us" className="hover:text-slate-950 transition">Contact Us</Link>
              <span className="flex items-center gap-1.5 ml-2 text-emerald-700 font-semibold"><ShieldCheck className="h-4 w-4" /> Guaranteed Quality</span>
            </div>
          </div>
        </footer>

        {/* Floating Mobile Bottom Navigation */}
        <MobileNavigation />
      </body>
    </html>
  );
}
