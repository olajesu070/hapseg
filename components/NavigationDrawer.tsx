"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { 
  X, 
  Shirt, 
  UtensilsCrossed, 
  Sparkles, 
  ShoppingBag, 
  PhoneCall, 
  Info, 
  ChevronRight,
  MessageCircle,
  MapPin,
  ExternalLink,
  Search,
  Clock,
  Phone,
  ShieldCheck,
  Check
} from "lucide-react";

interface CollectionItem {
  name: string;
  href: string;
  badge: string;
  tagline: string;
  icon: typeof Shirt;
  accentBg: string;
  accentColor: string;
}

const COLLECTIONS: CollectionItem[] = [
  {
    name: "Fashion & Apparel",
    href: "/fashion",
    badge: "Trending",
    tagline: "Shoes, luxury wear & sneakers",
    icon: Shirt,
    accentBg: "bg-violet-100",
    accentColor: "text-[#6c40d9]",
  },
  {
    name: "Kitchen & Dining",
    href: "/kitchen",
    badge: "Popular",
    tagline: "Cookware, tableware & dinner sets",
    icon: UtensilsCrossed,
    accentBg: "bg-orange-100",
    accentColor: "text-[#e67e51]",
  },
  {
    name: "Lifestyle Varieties",
    href: "/varieties",
    badge: "New Drops",
    tagline: "Everyday utility, gadgets & home tools",
    icon: Sparkles,
    accentBg: "bg-purple-100",
    accentColor: "text-[#7b39df]",
  },
];

const PAGES = [
  { name: "All Shop Collections", href: "/fashion", icon: ShoppingBag, detail: "Explore complete catalog" },
  { name: "About Hapseg Store", href: "/about-us", icon: Info, detail: "Our brand story & quality pledge" },
  { name: "Contact & Branches", href: "/contact-us", icon: PhoneCall, detail: "Ado Ekiti physical stores" },
];

export function NavigationDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const drawerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close drawer automatically when user navigates
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Senior scroll-locking without layout shift (Radix/Shadcn pattern)
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
        document.body.style.paddingRight = "";
      };
    }
  }, [isOpen]);

  // Handle quick search inside drawer
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const currentCategory = pathname.startsWith("/kitchen") 
      ? "kitchen" 
      : pathname.startsWith("/varieties") 
        ? "varieties" 
        : "fashion";
    router.push(`/${currentCategory}?q=${encodeURIComponent(searchQuery.trim())}`);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      {/* ======================================================== */}
      {/* 1. Sleek Modern Hamburger Trigger Button                 */}
      {/* ======================================================== */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="navigation-drawer"
        className="group relative flex min-h-[44px] items-center gap-2 rounded-full border border-violet-200/90 bg-white px-3 sm:px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-sm transition-all duration-200 hover:border-[#6c40d9] hover:bg-violet-50/70 hover:text-[#6c40d9] hover:shadow-md hover:shadow-violet-500/10 active:scale-95"
      >
        {/* Animated Custom 3-Line Hamburger Icon */}
        <span className="flex h-5 w-5 flex-col items-center justify-center gap-1">
          <span className="h-0.5 w-4 rounded-full bg-slate-800 transition-all duration-200 group-hover:w-4.5 group-hover:bg-[#6c40d9]" />
          <span className="h-0.5 w-3 self-start ml-0.5 rounded-full bg-slate-800 transition-all duration-200 group-hover:w-4 group-hover:bg-[#6c40d9]" />
          <span className="h-0.5 w-4 rounded-full bg-slate-800 transition-all duration-200 group-hover:bg-[#6c40d9]" />
        </span>
        <span className="font-extrabold text-[12px] tracking-tight">Menu</span>
      </button>

      {/* ======================================================== */}
      {/* 2. Backdrop Overlay with Smooth Fade Transition          */}
      {/* ======================================================== */}
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ======================================================== */}
      {/* 3. Slide-Out Drawer Panel (Isolated from Layout Flow)    */}
      {/* ======================================================== */}
      <aside
        id="navigation-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Store Navigation Drawer"
        className={`fixed top-0 bottom-0 right-0 z-50 flex h-[100dvh] w-full max-w-[360px] sm:max-w-[400px] flex-col bg-white shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
          isOpen 
            ? "translate-x-0 opacity-100 visible pointer-events-auto shadow-[0_0_50px_rgba(0,0,0,0.25)]" 
            : "translate-x-full opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Drawer Header with Official Brand Identity */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-violet-100/80 bg-white px-5 pt-[env(safe-area-inset-top,0px)]">
          <Link 
            href="/fashion" 
            onClick={() => setIsOpen(false)} 
            className="flex items-center gap-2 active:opacity-80 transition-opacity"
          >
            <div className="relative h-8 w-28">
              <Image
                src="/logo.png"
                alt="Hapseg Varieties Store"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>
          
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-violet-50 text-slate-500 hover:bg-violet-100 hover:text-slate-900 transition-colors active:scale-90"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 scroll-smooth-touch overscroll-contain">
          
          {/* In-Drawer Quick Product Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shoes, bags, kitchen..."
              className="w-full min-h-[44px] rounded-2xl bg-slate-100/90 pl-10 pr-9 text-xs font-medium text-slate-900 placeholder:text-slate-400 border border-slate-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-[#6c40d9] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </form>

          {/* Section: Collections Catalog */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#6c40d9]" />
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  Shop Departments
                </span>
              </div>
              <span className="text-[10px] font-bold text-[#6c40d9] bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full">
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
                        ? "border-[#6c40d9] bg-[#6c40d9] text-white shadow-md shadow-purple-500/20"
                        : "border-slate-200/80 bg-white text-slate-900 hover:border-violet-200 hover:bg-violet-50/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition ${
                          isActive 
                            ? "bg-white/20 text-white" 
                            : `${item.accentBg} ${item.accentColor}`
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <p className={`text-xs font-extrabold leading-tight ${isActive ? "text-white" : "text-slate-900"}`}>
                            {item.name}
                          </p>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {item.badge}
                          </span>
                        </div>
                        <p className={`text-[11px] mt-0.5 ${isActive ? "text-violet-100" : "text-slate-500"}`}>
                          {item.tagline}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {isActive && <Check className="h-4 w-4 text-[#fda173]" />}
                      <ChevronRight
                        className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                          isActive ? "text-white" : "text-slate-400"
                        }`}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Section: Information & Support */}
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
                    className={`flex min-h-[48px] items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                      isActive
                        ? "bg-violet-50 text-[#6c40d9]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[#6c40d9]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isActive ? "bg-violet-100 text-[#6c40d9]" : "bg-slate-100 text-slate-500"}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <p className="leading-tight">{page.name}</p>
                        <p className="text-[10px] text-slate-400 font-normal mt-0.5">{page.detail}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Section: Physical Branches in Ado Ekiti */}
          <div className="rounded-2xl border border-violet-100 bg-violet-50/40 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
                <MapPin className="h-4 w-4 text-[#6c40d9]" />
                <span>Physical Branches</span>
              </div>
              <span className="text-[10px] font-bold text-[#e67e51] bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
                Ado Ekiti
              </span>
            </div>

            <div className="space-y-2 text-[11px] text-slate-600">
              <div className="rounded-xl bg-white/90 p-2.5 border border-violet-100/70 shadow-2xs">
                <p className="font-bold text-slate-900">1. Okesha Market (Main Branch)</p>
                <p className="text-slate-500 text-[10px] mt-0.5 leading-snug">
                  Blue Two-Storey Building, Opposite Subeb School, Ado Ekiti.
                </p>
              </div>
              <div className="rounded-xl bg-white/90 p-2.5 border border-violet-100/70 shadow-2xs">
                <p className="font-bold text-slate-900">2. Okeise Street Branch</p>
                <p className="text-slate-500 text-[10px] mt-0.5 leading-snug">
                  Possibility Complex, Opposite Fajuyi Lane, Okeise Street, Ado Ekiti.
                </p>
              </div>
            </div>

            {/* Quick Call Lines */}
            <div className="pt-2 border-t border-violet-100/60 flex items-center gap-2">
              <a
                href="tel:+2348161241045"
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-white py-2 text-[11px] font-bold text-slate-700 border border-violet-100 hover:text-[#6c40d9] hover:border-violet-200 transition"
              >
                <Phone className="h-3 w-3 text-[#6c40d9]" />
                <span>Call Branch 1</span>
              </a>
              <a
                href="tel:+2347079828222"
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-white py-2 text-[11px] font-bold text-slate-700 border border-violet-100 hover:text-[#6c40d9] hover:border-violet-200 transition"
              >
                <Phone className="h-3 w-3 text-[#6c40d9]" />
                <span>Call Branch 2</span>
              </a>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <Clock className="h-3 w-3 text-slate-400" />
                <span>Mon–Sat: 9am–6pm (Sun: Closed)</span>
              </div>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#6c40d9] hover:underline"
              >
                <span>Full Hours</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Guaranteed Authenticity Trust Banner */}
          <div className="flex items-center gap-2.5 rounded-2xl bg-slate-50 p-3 border border-slate-200/70">
            <ShieldCheck className="h-5 w-5 text-[#6c40d9] shrink-0" />
            <div className="text-left">
              <p className="text-[11px] font-bold text-slate-800 leading-tight">Guaranteed Quality</p>
              <p className="text-[10px] text-slate-500">All products physically inspected prior to dispatch</p>
            </div>
          </div>
        </div>

        {/* Drawer Footer with Safe Area Padding */}
        <div className="shrink-0 border-t border-slate-100 bg-white/95 p-4 backdrop-blur-md pb-[max(env(safe-area-inset-bottom),1rem)] space-y-2 shadow-[0_-8px_20px_rgba(0,0,0,0.04)]">
          <a
            href="https://wa.me/2347030797836?text=Hello%20Hapseg%20Store%2C%20I%20have%20an%20inquiry%20from%20the%20store%20menu."
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-md transition hover:bg-emerald-500 active:scale-[0.98]"
          >
            <MessageCircle className="h-4 w-4 fill-white" />
            <span>Chat on WhatsApp (+234 703 079 7836)</span>
          </a>
        </div>
      </aside>
    </>
  );
}
