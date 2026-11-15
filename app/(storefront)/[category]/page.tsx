import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { Pagination } from "@/components/Pagination";
import { PageSizeSelector } from "@/components/PageSizeSelector";
import { ShoppingBag, SearchX } from "lucide-react";
import { Suspense } from "react";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ q?: string; page?: string; limit?: string }>;
}

const VALID_CATEGORIES = ["fashion", "kitchen", "varieties"];
const ALLOWED_LIMITS = [10, 20, 50, 100];
const DEFAULT_LIMIT = 10;

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category: rawCategory } = await params;
  const { q, page, limit } = await searchParams;
  const category = rawCategory.toLowerCase();

  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }

  // Parse page size (10, 20, 50, 100) with fallback
  const parsedLimit = parseInt(limit || `${DEFAULT_LIMIT}`, 10);
  const itemsPerPage = ALLOWED_LIMITS.includes(parsedLimit) ? parsedLimit : DEFAULT_LIMIT;

  // Sanitize search query and page number
  const searchQuery = q ? q.trim().slice(0, 50) : "";
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);

  // Filter conditions
  const whereClause: any = { category };
  if (searchQuery) {
    whereClause.OR = [
      { name: { contains: searchQuery, mode: "insensitive" } },
      { description: { contains: searchQuery, mode: "insensitive" } },
      { itemNo: { contains: searchQuery, mode: "insensitive" } },
    ];
  }

  // Fetch count and paginated items in parallel
  const [totalItems, products] = await Promise.all([
    prisma.product.count({ where: whereClause }),
    prisma.product.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
    }),
  ]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const categoryMeta: Record<string, { title: string; subtitle: string }> = {
    fashion: {
      title: "Fashion & Style",
      subtitle: "Clothing, luxury watches, sneakers, and modern wear",
    },
    kitchen: {
      title: "Kitchen & Home",
      subtitle: "Cookware, kitchen appliances, dinnerware, and accessories",
    },
    varieties: {
      title: "General Varieties",
      subtitle: "Curated gadgets, everyday lifestyle tools, and home picks",
    },
  };

  const meta = categoryMeta[category] || {
    title: category,
    subtitle: "Explore our latest arrivals",
  };

  return (
    <div className="space-y-6">
      {/* Category Header Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 text-white shadow-xl shadow-slate-900/10">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-semibold text-emerald-300 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Direct Store
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {meta.title}
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
            {meta.subtitle}
          </p>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -right-8 -bottom-8 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
      </div>

      {/* Real-Time Search Bar & Page Size Selector Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        <Suspense fallback={<div className="h-11 w-full max-w-md rounded-full bg-slate-100 animate-pulse" />}>
          <SearchBar />
        </Suspense>

        <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-auto">
          {/* Display Per-Page Selector (10, 20, 50, 100) */}
          <Suspense fallback={null}>
            <PageSizeSelector currentLimit={itemsPerPage} />
          </Suspense>

          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
        </div>
      </div>

      {/* Product Grid Area */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white/60 p-12 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 mb-4">
            {searchQuery ? <SearchX className="h-8 w-8" /> : <ShoppingBag className="h-8 w-8 text-emerald-600" />}
          </div>
          <h2 className="text-base font-bold text-slate-800">
            {searchQuery ? `No results for "${searchQuery}"` : `No items in ${meta.title} yet`}
          </h2>
          <p className="mt-1 max-w-sm text-xs sm:text-sm text-slate-500 leading-relaxed">
            {searchQuery
              ? "Try checking your spelling or searching for another keyword like shoes, dress, or knife."
              : "New products posted to your Telegram channel will automatically sync and appear right here."}
          </p>
        </div>
      ) : (
        <div>
          {/* 1 Column on Mobile, 2 on Tablet, 3 on Desktop, 4 on XL */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} searchQuery={searchQuery} />
            ))}
          </div>

          {/* Previous / Next Pagination Controls with Limit preservation */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            category={category}
            searchQuery={searchQuery}
            limit={itemsPerPage}
          />
        </div>
      )}
    </div>
  );
}
