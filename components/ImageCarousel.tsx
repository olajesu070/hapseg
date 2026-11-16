"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { formatProductImageUrl } from "@/lib/image";

interface ImageCarouselProps {
  images: string[];
  productName: string;
}

export function ImageCarousel({ images, productName }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="aspect-square w-full rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400">
        No image available
      </div>
    );
  }

  const prev = () => setActiveIndex((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  const next = () => setActiveIndex((curr) => (curr === images.length - 1 ? 0 : curr + 1));

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      next(); // Swiped left -> next image
    } else if (distance < -minSwipeDistance) {
      prev(); // Swiped right -> prev image
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="w-full space-y-3">
      {/* Primary Carousel Stage */}
      <div
        className="relative aspect-square w-full overflow-hidden rounded-3xl bg-slate-900/5 shadow-md touch-pan-y select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full w-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map((url, i) => (
            <div key={i} className="relative h-full w-full flex-shrink-0">
              <Image
                src={formatProductImageUrl(url)}
                alt={`${productName} - photo ${i + 1}`}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>

        {/* Carousel Prev/Next Buttons (Min 44px tap targets) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg shadow-black/10 backdrop-blur-md transition-transform active:scale-90 hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg shadow-black/10 backdrop-blur-md transition-transform active:scale-90 hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Counter Badge */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
            <Layers className="h-3.5 w-3.5 text-[#fda173]" />
            <span>
              {activeIndex + 1} / {images.length}
            </span>
          </div>
        )}

        {/* Indicator Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === activeIndex ? "w-6 bg-white shadow-sm" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails Strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {images.map((url, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                idx === activeIndex
                  ? "border-[#6c40d9] scale-95 shadow-md shadow-purple-500/20"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={formatProductImageUrl(url)} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
