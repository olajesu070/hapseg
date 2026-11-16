import Image from "next/image";
import Link from "next/link";
import { Tag, ArrowRight } from "lucide-react";
import { formatProductImageUrl } from "@/lib/image";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number | null;
    itemNo?: string | null;
    images: string[];
    category: string;
  };
  searchQuery?: string;
}

export function ProductCard({ product, searchQuery }: ProductCardProps) {
  const primaryImage = formatProductImageUrl(product.images[0]);
  const querySuffix = searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : "";

  return (
    <Link
      href={`/${product.category}/${product.id}${querySuffix}`}
      prefetch={true}
      className="group flex flex-col overflow-hidden rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(108,64,217,0.08)] hover:border-violet-200 active:scale-[0.98]"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Item Tag Pill */}
        {product.itemNo && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 inline-flex items-center gap-0.5 sm:gap-1 rounded-full bg-slate-950/80 backdrop-blur-md px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[11px] font-bold text-white tracking-wide shadow-sm">
            <Tag className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#fda173]" />
            #{product.itemNo}
          </span>
        )}

        {/* Photo count indicator for albums */}
        {product.images.length > 1 && (
          <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 rounded-full bg-black/60 backdrop-blur-md px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium text-white">
            {product.images.length}
          </span>
        )}
      </div>

      {/* Product Metadata Content */}
      <div className="flex flex-1 flex-col justify-between p-2.5 sm:p-4">
        <div>
          <h3 className="line-clamp-2 text-xs sm:text-sm font-bold text-slate-800 leading-snug group-hover:text-[#6c40d9] transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="mt-2.5 sm:mt-4 flex items-center justify-between pt-2 sm:pt-3 border-t border-slate-100">
          <div>
            <span className="block text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-slate-400">
              Price
            </span>
            <p className="text-xs sm:text-base font-extrabold text-slate-950 group-hover:text-[#6c40d9] transition-colors">
              {product.price !== null ? `₦${Math.round(product.price).toLocaleString()}` : "Inquire"}
            </p>
          </div>

          <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 group-hover:bg-[#6c40d9] group-hover:text-white transition-all shadow-sm">
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
