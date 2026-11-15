"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  Menu, 
  X, 
  Shirt, 
  UtensilsCrossed, 
  Grid, 
  ShoppingBag, 
  PhoneCall, 
  Info, 
  ChevronRight,
  MessageCircle,
  MapPin,
  ExternalLink
} from "lucide-react";

const COLLECTIONS = [
  {
    name: "Fashion & Apparel",
    href: "/fashion",
    desc: "Shoes, clothing, sneakers & luxury wear",
    icon: Shirt,
    accent: "bg-purple-50 text-purple-700",
  },
  {
    name: "Kitchen & Dining",
    href: "/kitchen",
    desc: "Cookware, appliances & dining sets",
    icon: UtensilsCrossed,
    accent: "bg-emerald-50 text-emerald-700",
  },
  {
    name: "Lifestyle Varieties",
    href: "/varieties",
    desc: "Everyday utility, gadgets & home tools",
    icon: Grid,
    accent: "bg-amber-50 text-amber-700",
  },
];

const PAGES = [
  { name: "All Shops", href: "/fashion", icon: ShoppingBag },
  { name: "About Hapseg", href: "/about-us", icon: Info },
  { name: "Contact & Branches", href: "/contact-us", icon: PhoneCall },
];

export function NavigationDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on route navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Trigger Button: Visible in Header */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Collections Menu"
        className="flex min-h-[44px] items-center gap-2 rounded-full border border-slate-200/90 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-800 transition hover:bg-slate-100 hover:border-slate-300 active:scale-95"
      >
        <Menu className="h-4 w-4" />
        <span className="hidden sm:inline">Collections</span>
        <span className="sm:hidden font-extrabold text-[11px]">Menu</span>
      </button>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Slide-out Side Drawer Panel */}
      <aside
        className={`fixed top-0 bottom-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <div className="relative h-8 w-28">
            <Image
              src="/logo.png"
              alt="Hapseg Varieties Store"
              fill
              className="object-contain object-left"
            />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition active:scale-90"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Drawer Body - Scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
          {/* Section: Product Collections */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Browse Collections
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Live Inventory
              </span>
            </div>

            <div className="space-y-2">
              {COLLECTIONS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center justify-between rounded-2xl border p-3.5 transition-all active:scale-[0.98] ${
                      isActive
                        ? "border-slate-950 bg-slate-950 text-white shadow-sm"
                        : "border-slate-200/80 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                          isActive ? "bg-white/20 text-white" : item.accent
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <p className={`text-xs font-bold leading-tight ${isActive ? "text-white" : "text-slate-900"}`}>
                          {item.name}
                        </p>
                        <p className={`text-[10px] mt-0.5 ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 ${
                        isActive ? "text-white" : "text-slate-400"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Section: Store Pages */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Information & Support
            </span>
            <div className="space-y-1">
              {PAGES.map((page) => {
                const Icon = page.icon;
                const isActive = pathname === page.href;

                return (
                  <Link
                    key={page.name}
                    href={page.href}
                    className={`flex min-h-[44px] items-center gap-3 rounded-xl px-3 py-2 text-xs font-bold transition ${
                      isActive
                        ? "bg-slate-100 text-slate-950"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-slate-400" />
                    <span>{page.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Section: Branch Locations Snippet */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <MapPin className="h-4 w-4 text-emerald-600" />
              <span>Ado Ekiti Branches</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Okesha Market (Opposite Subeb School) & Possibility Complex (Okeise Street).
            </p>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:underline pt-1"
            >
              <span>View full store hours & directions</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Drawer Footer with Quick WhatsApp Chat */}
        <div className="border-t border-slate-100 p-4 bg-slate-50/50">
          <a
            href="https://wa.me/2347030797836?text=Hello%20Hapseg%20Store%2C%20I%20have%20an%20inquiry."
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-md transition hover:bg-emerald-500 active:scale-98"
          >
            <MessageCircle className="h-4 w-4 fill-white" />
            <span>Chat on WhatsApp (+234 703 079 7836)</span>
          </a>
        </div>
      </aside>
    </>
  );
}
