export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/70 shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square w-full bg-slate-200" />

      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col justify-between p-4 space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-3/4 rounded-md bg-slate-200" />
          <div className="h-3 w-1/2 rounded-md bg-slate-100" />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="space-y-1">
            <div className="h-2.5 w-10 rounded bg-slate-100" />
            <div className="h-4 w-16 rounded bg-slate-200" />
          </div>
          <div className="h-8 w-8 rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

export function CategoryFeedSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Banner Skeleton */}
      <div className="h-36 sm:h-44 w-full rounded-3xl bg-slate-200" />

      {/* Search Bar & Count Skeleton */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        <div className="h-11 w-full max-w-md rounded-full bg-slate-200" />
        <div className="h-4 w-20 rounded bg-slate-200 self-end sm:self-center" />
      </div>

      {/* 4 to 8 Card Skeletons */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="relative pb-28 md:pb-8 max-w-4xl mx-auto space-y-4 animate-pulse">
      {/* Top Header Skeleton */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="h-4 w-32 rounded bg-slate-200" />
        <div className="flex items-center gap-2">
          <div className="h-8 w-14 rounded-full bg-slate-200" />
          <div className="h-8 w-14 rounded-full bg-slate-200" />
        </div>
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start pt-2">
        {/* Carousel Image Box */}
        <div className="aspect-square w-full rounded-3xl bg-slate-200" />

        {/* Details Box */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="h-5 w-16 rounded-full bg-slate-200" />
              <div className="h-5 w-20 rounded-full bg-slate-200" />
            </div>
            <div className="h-8 w-3/4 rounded-lg bg-slate-200" />
            <div className="h-7 w-1/3 rounded-lg bg-slate-200" />
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-5">
            <div className="h-3 w-24 rounded bg-slate-200" />
            <div className="h-3 w-full rounded bg-slate-100" />
            <div className="h-3 w-5/6 rounded bg-slate-100" />
            <div className="h-3 w-2/3 rounded bg-slate-100" />
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
            <div className="h-14 rounded-2xl bg-slate-100" />
            <div className="h-14 rounded-2xl bg-slate-100" />
          </div>

          <div className="hidden md:block h-12 w-full rounded-2xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
