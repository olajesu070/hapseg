"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Utensils, LayoutGrid } from "lucide-react";

const CATEGORIES = [
  { label: "Fashion", href: "/fashion", icon: Sparkles },
  { label: "Kitchen", href: "/kitchen", icon: Utensils },
  { label: "Varieties", href: "/varieties", icon: LayoutGrid },
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
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
              isActive
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100/90 text-slate-600 hover:bg-slate-200/70"
            }`}
          >
            <Icon className={`h-3.5 w-3.5 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />
            <span>{cat.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
