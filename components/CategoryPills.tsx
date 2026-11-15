"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shirt, UtensilsCrossed, Grid } from "lucide-react";

const CATEGORIES = [
  { label: "Fashion", href: "/fashion", icon: Shirt },
  { label: "Kitchen", href: "/kitchen", icon: UtensilsCrossed },
  { label: "Varieties", href: "/varieties", icon: Grid },
];

export function CategoryPills() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth-touch py-0.5">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isActive = pathname.startsWith(cat.href);

        return (
          <Link
            key={cat.href}
            href={cat.href}
            prefetch={true}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all active:scale-95 ${
              isActive
                ? "bg-[#6c40d9] text-white shadow-sm shadow-purple-500/25"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
            }`}
          >
            <Icon className={`h-3.5 w-3.5 ${isActive ? "text-[#fda173]" : "text-slate-500"}`} />
            <span>{cat.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
