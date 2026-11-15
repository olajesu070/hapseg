"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";
import { SlidersHorizontal } from "lucide-react";

interface PageSizeSelectorProps {
  currentLimit: number;
}

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export function PageSizeSelector({ currentLimit }: PageSizeSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleLimitChange = (newLimit: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", newLimit.toString());
    params.set("page", "1"); // Reset to page 1 when changing page size

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex items-center gap-1.5 text-xs text-slate-500">
      <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
      <span className="hidden sm:inline font-medium">Show:</span>
      <div className="inline-flex rounded-xl bg-slate-100 p-0.5 border border-slate-200/70">
        {PAGE_SIZE_OPTIONS.map((size) => {
          const isSelected = size === currentLimit;
          return (
            <button
              key={size}
              onClick={() => handleLimitChange(size)}
              disabled={isPending}
              className={`min-h-[28px] min-w-[32px] px-2 py-0.5 rounded-lg text-xs font-bold transition-all ${
                isSelected
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
