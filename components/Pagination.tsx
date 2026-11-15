import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  category: string;
  searchQuery?: string;
  limit?: number;
}

export function Pagination({ currentPage, totalPages, category, searchQuery, limit }: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (limit && limit !== 10) params.set("limit", limit.toString());
    if (page > 1) params.set("page", page.toString());
    const queryString = params.toString();
    return `/${category}${queryString ? `?${queryString}` : ""}`;
  };

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/80 pt-6">
      {/* Page status label */}
      <p className="text-xs font-semibold text-slate-500 order-2 sm:order-1">
        Page <span className="text-slate-900 font-bold">{currentPage}</span> of{" "}
        <span className="text-slate-900 font-bold">{totalPages}</span>
      </p>

      {/* Prev / Next buttons with mobile min-44px tap targets */}
      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center order-1 sm:order-2">
        {hasPrev ? (
          <Link
            href={buildPageUrl(currentPage - 1)}
            prefetch={true}
            className="flex-1 sm:flex-initial inline-flex min-h-[44px] min-w-[100px] items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300 active:scale-95"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Link>
        ) : (
          <button
            disabled
            className="flex-1 sm:flex-initial inline-flex min-h-[44px] min-w-[100px] items-center justify-center gap-1.5 rounded-full border border-slate-100 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-300 cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>
        )}

        {/* Page pills for quick jumping on desktop */}
        <div className="hidden sm:flex items-center gap-1">
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => {
            const isCurrent = p === currentPage;
            return (
              <Link
                key={p}
                href={buildPageUrl(p)}
                prefetch={true}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  isCurrent
                    ? "bg-[#6c40d9] text-white shadow shadow-purple-500/25"
                    : "text-slate-600 hover:bg-violet-50 hover:text-[#6c40d9]"
                }`}
              >
                {p}
              </Link>
            );
          })}
        </div>

        {hasNext ? (
          <Link
            href={buildPageUrl(currentPage + 1)}
            prefetch={true}
            className="flex-1 sm:flex-initial inline-flex min-h-[44px] min-w-[100px] items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300 active:scale-95"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <button
            disabled
            className="flex-1 sm:flex-initial inline-flex min-h-[44px] min-w-[100px] items-center justify-center gap-1.5 rounded-full border border-slate-100 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-300 cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
