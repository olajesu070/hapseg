"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shirt, UtensilsCrossed, Grid } from "lucide-react";

const NAV_ITEMS = [
  { label: "Fashion", href: "/fashion", icon: Shirt },
  { label: "Kitchen", href: "/kitchen", icon: UtensilsCrossed },
  { label: "Varieties", href: "/varieties", icon: Grid },
];

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] px-3 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1.5">
      <div className="flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              className={`relative flex min-h-[48px] min-w-[64px] flex-col items-center justify-center gap-1 rounded-2xl py-1 text-[11px] font-bold transition-all active:scale-95 ${
                isActive
                  ? "text-slate-950"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              {isActive && (
                <span className="absolute top-1 h-1 w-6 rounded-full bg-slate-950" />
              )}
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-xl transition-colors ${
                  isActive ? "bg-slate-100 text-slate-950" : "text-slate-400"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span className="tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
