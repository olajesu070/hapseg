import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ImageCarousel } from "@/components/ImageCarousel";
import { WhatsAppOrderButton } from "@/components/WhatsAppOrderButton";
import { Tag, ArrowLeft, ShieldCheck, Truck, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductDetailPageProps {
  params: Promise<{
    category: string;
    id: string;
  }>;
  searchParams: Promise<{
    q?: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params, searchParams }: ProductDetailPageProps) {
  const { category, id } = await params;
  const { q } = await searchParams;
  const searchQuery = q?.trim() || "";

  // 1. Fetch current product
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  // 2. Build where filter matching search query (if present) within the same category
  const whereClause: any = { category: product.category };
  if (searchQuery) {
    whereClause.OR = [
      { name: { contains: searchQuery, mode: "insensitive" } },
      { description: { contains: searchQuery, mode: "insensitive" } },
      { itemNo: { contains: searchQuery, mode: "insensitive" } },
    ];
  }

  // 3. Fetch all sibling product IDs in the current search/category scope to calculate Previous / Next
  const scopedProducts = await prisma.product.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true },
  });

  const currentIndex = scopedProducts.findIndex((p) => p.id === id);
  const totalInScope = scopedProducts.length;

  const prevProduct = currentIndex > 0 ? scopedProducts[currentIndex - 1] : null;
  const nextProduct = currentIndex >= 0 && currentIndex < totalInScope - 1 ? scopedProducts[currentIndex + 1] : null;

  // Build query string to preserve search term across next/prev navigation
  const querySuffix = searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : "";

  return (
    <div className="relative pb-28 md:pb-8 max-w-4xl mx-auto space-y-4">
      {/* Top Header: Back to Category/Search + Next/Previous Navigation Bar */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 gap-2">
        <Link
          href={`/${category}${querySuffix}`}
          className="inline-flex min-h-[44px] items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>
            {searchQuery ? `Back to results ("${searchQuery}")` : `Back to ${category.toUpperCase()}`}
          </span>
        </Link>

        {/* Previous / Next Controls */}
        <div className="flex items-center gap-2">
          {currentIndex >= 0 && (
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-400 mr-1">
              {currentIndex + 1} of {totalInScope}
            </span>
          )}

          {prevProduct ? (
            <Link
              href={`/${category}/${prevProduct.id}${querySuffix}`}
              aria-label="Previous product"
              className="inline-flex min-h-[40px] items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300 active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Prev</span>
            </Link>
          ) : (
            <button
              disabled
              className="inline-flex min-h-[40px] items-center gap-1 rounded-full border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-300 cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>
          )}

          {nextProduct ? (
            <Link
              href={`/${category}/${nextProduct.id}${querySuffix}`}
              aria-label="Next product"
              className="inline-flex min-h-[40px] items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300 active:scale-95"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <button
              disabled
              className="inline-flex min-h-[40px] items-center gap-1 rounded-full border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-300 cursor-not-allowed"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start pt-2">
        {/* Left: Swipeable Product Carousel */}
        <div className="w-full">
          <ImageCarousel images={product.images} productName={product.name} />
        </div>

        {/* Right: Product Details & Sticky Actions */}
        <div className="flex flex-col space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
                {product.category}
              </span>
              {product.itemNo && (
                <span className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100">
                  <Tag className="h-3 w-3 text-[#e67e51]" />
                  Item #{product.itemNo}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {product.name}
            </h1>

            <div className="pt-2">
              <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
                Price
              </span>
              <p className="text-3xl font-black text-[#6c40d9]">
                {product.price !== null ? `₦${Math.round(product.price).toLocaleString()}` : "Price upon request"}
              </p>
            </div>
          </div>

          {/* Description Section */}
          <div className="border-t border-slate-100 pt-5 space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Product Overview
            </h2>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
              {product.description}
            </p>
          </div>

          {/* Trust Value Props */}
          <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
            <div className="flex items-center gap-2.5 rounded-2xl bg-violet-50/50 p-3 border border-violet-100">
              <ShieldCheck className="h-5 w-5 text-[#6c40d9] shrink-0" />
              <div className="text-left">
                <p className="text-[11px] font-bold text-slate-800 leading-tight">100% Verified</p>
                <p className="text-[10px] text-slate-500">Authentic product</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 rounded-2xl bg-amber-50/50 p-3 border border-amber-100">
              <Truck className="h-5 w-5 text-[#e67e51] shrink-0" />
              <div className="text-left">
                <p className="text-[11px] font-bold text-slate-800 leading-tight">Fast Dispatch</p>
                <p className="text-[10px] text-slate-500">Order via chat</p>
              </div>
            </div>
          </div>

          {/* Desktop WhatsApp CTA Button */}
          <div className="hidden md:block pt-3">
            <WhatsAppOrderButton
              phoneNumber={product.phoneNumber}
              productName={product.name}
              itemNo={product.itemNo}
            />
          </div>
        </div>
      </div>

      {/* Bottom Sticky Bar for Mobile: Next/Prev Navigation + WhatsApp CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] shadow-[0_-10px_25px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-2">
          {prevProduct ? (
            <Link
              href={`/${category}/${prevProduct.id}${querySuffix}`}
              className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 active:scale-95"
              aria-label="Previous product"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
          ) : (
            <button
              disabled
              className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <div className="flex-1">
            <WhatsAppOrderButton
              phoneNumber={product.phoneNumber}
              productName={product.name}
              itemNo={product.itemNo}
            />
          </div>

          {nextProduct ? (
            <Link
              href={`/${category}/${nextProduct.id}${querySuffix}`}
              className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 active:scale-95"
              aria-label="Next product"
            >
              <ChevronRight className="h-5 w-5" />
            </Link>
          ) : (
            <button
              disabled
              className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
