"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Utensils, LayoutGrid } from "lucide-react";

const NAV_ITEMS = [
  { label: "Fashion", href: "/fashion", icon: Sparkles },
  { label: "Kitchen", href: "/kitchen", icon: Utensils },
  { label: "Varieties", href: "/varieties", icon: LayoutGrid },
];

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] px-3 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1.5">
      <div className="flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              className={`relative flex min-h-[48px] min-w-[64px] flex-col items-center justify-center gap-1 rounded-2xl py-1 text-[11px] font-semibold transition-all active:scale-95 ${
                isActive
                  ? "text-emerald-700"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {isActive && (
                <span className="absolute top-1 h-1 w-6 rounded-full bg-emerald-600" />
              )}
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-xl transition-colors ${
                  isActive ? "bg-emerald-50 text-emerald-600" : "text-slate-500"
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
