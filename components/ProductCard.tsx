import Image from "next/image";
import Link from "next/link";
import { Tag, ArrowRight } from "lucide-react";

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
  const primaryImage = product.images[0] || "https://placehold.co/600x600/f8fafc/94a3b8?text=Hapseg+Store";
  const querySuffix = searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : "";

  return (
    <Link
      href={`/${product.category}/${product.id}${querySuffix}`}
      prefetch={true}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.07)] hover:border-slate-300 active:scale-[0.98]"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Item Tag Pill */}
        {product.itemNo && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-slate-900/75 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-white tracking-wide shadow-sm">
            <Tag className="h-3 w-3 text-emerald-400" />
            #{product.itemNo}
          </span>
        )}

        {/* Image count badge if album */}
        {product.images.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-medium text-white">
            {product.images.length} photos
          </span>
        )}
      </div>

      {/* Product Metadata Content */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="line-clamp-2 text-sm font-bold text-slate-800 leading-snug group-hover:text-emerald-700 transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-400">
              Price
            </span>
            <p className="text-base font-extrabold text-slate-950">
              {product.price !== null ? `₦${Math.round(product.price).toLocaleString()}` : "Inquire"}
            </p>
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-all">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
