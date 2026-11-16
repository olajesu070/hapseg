"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Share2, 
  Copy, 
  Check, 
  Download, 
  X, 
  Send,
  MessageCircle,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { formatProductImageUrl } from "@/lib/image";

interface ShareProductProps {
  product: {
    id: string;
    name: string;
    price: number | null;
    itemNo?: string | null;
    category: string;
    images: string[];
    description?: string;
  };
  variant?: "primary" | "icon" | "pill";
}

export function ShareProductButton({ product, variant = "pill" }: ShareProductProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSharingImage, setIsSharingImage] = useState(false);

  const primaryImage = formatProductImageUrl(product.images[0]) || "/logo.png";
  const formattedPrice = product.price !== null ? `₦${Math.round(product.price).toLocaleString()}` : "Price upon request";
  
  // Build canonical share URL
  const productUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/${product.category}/${product.id}`
    : `https://hapseg.vercel.app/${product.category}/${product.id}`;

  // Formatted share text for social apps
  const shareText = `🔥 *${product.name}*\n` +
    `💰 *Price:* ${formattedPrice}\n` +
    (product.itemNo ? `🏷️ *Item No:* #${product.itemNo}\n` : "") +
    `🛒 Available at *Hapseg Varieties Store*, Ado Ekiti.\n` +
    `👉 View full photos & order here:\n${productUrl}`;

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Handle native Web Share API with image file if supported
  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        setIsSharingImage(true);

        // Try to fetch image as a File blob so image is forwarded natively on iOS/Android
        let filesToShare: File[] = [];
        if (primaryImage && primaryImage.startsWith("http")) {
          try {
            const response = await fetch(primaryImage, { mode: "cors" });
            if (response.ok) {
              const blob = await response.blob();
              const ext = blob.type.split("/")[1] || "jpg";
              const file = new File([blob], `hapseg-${product.itemNo || product.id}.${ext}`, { type: blob.type });
              if (navigator.canShare && navigator.canShare({ files: [file] })) {
                filesToShare = [file];
              }
            }
          } catch {
            // Ignore file fetch error and fall back to standard text + url share
          }
        }

        const shareData: ShareData = {
          title: `${product.name} | Hapseg Varieties Store`,
          text: `Check out ${product.name} (${formattedPrice}) at Hapseg Varieties Store!\n\n${productUrl}`,
          url: productUrl,
          ...(filesToShare.length > 0 ? { files: filesToShare } : {}),
        };

        await navigator.share(shareData);
        setIsSharingImage(false);
        return;
      } catch (err: any) {
        setIsSharingImage(false);
        // If user cancelled, do nothing. If error or unsupported, open modal
        if (err.name === "AbortError") return;
      }
    }

    // Fallback: Open polished share modal
    setIsOpen(true);
  };

  // Copy link with visual confirmation
  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(productUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback copy
      const input = document.createElement("input");
      input.value = productUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Direct Social Links
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(`🔥 ${product.name} (${formattedPrice})\nAvailable at Hapseg Varieties Store!`)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
  const xTwitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`🔥 Check out ${product.name} (${formattedPrice}) at Hapseg Store!`)}&url=${encodeURIComponent(productUrl)}`;

  // Download product image directly
  const handleDownloadImage = async () => {
    try {
      const response = await fetch(primaryImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `hapseg-${product.name.replace(/\s+/g, "-").toLowerCase()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(primaryImage, "_blank");
    }
  };

  return (
    <>
      {/* Trigger Variant: Pill Button */}
      {variant === "pill" && (
        <button
          type="button"
          onClick={handleNativeShare}
          aria-label="Share product details"
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-violet-200/90 bg-violet-50/70 px-3.5 py-1.5 text-xs font-bold text-[#6c40d9] shadow-2xs transition-all duration-200 hover:bg-[#6c40d9] hover:text-white hover:border-[#6c40d9] active:scale-95"
        >
          <Share2 className="h-3.5 w-3.5" />
          <span>Share</span>
        </button>
      )}

      {/* Trigger Variant: Full Primary Action Button */}
      {variant === "primary" && (
        <button
          type="button"
          onClick={handleNativeShare}
          aria-label="Share product on socials"
          className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border-2 border-violet-200 bg-white px-4 py-3 text-xs font-extrabold text-[#6c40d9] shadow-sm transition-all duration-200 hover:border-[#6c40d9] hover:bg-violet-50 active:scale-[0.98]"
        >
          <Share2 className="h-4 w-4" />
          <span>Forward & Share Product</span>
        </button>
      )}

      {/* Trigger Variant: Icon Button */}
      {variant === "icon" && (
        <button
          type="button"
          onClick={handleNativeShare}
          aria-label="Share product"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md backdrop-blur-md transition-all hover:bg-white hover:text-[#6c40d9] active:scale-90"
        >
          <Share2 className="h-4 w-4" />
        </button>
      )}

      {/* ======================================================== */}
      {/* Polished Social Forwarding Modal / Bottom Sheet          */}
      {/* ======================================================== */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Modal Panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Share product with image and details"
            className="relative z-10 w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-2xl space-y-5 animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-100 text-[#6c40d9]">
                  <Share2 className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                    Forward & Share Product
                  </h3>
                  <p className="text-[11px] text-slate-500">Share with photo and details to socials</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close share window"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Product Snapshot Card */}
            <div className="flex items-center gap-3.5 rounded-2xl bg-violet-50/60 border border-violet-100/80 p-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white border border-slate-200 shadow-2xs">
                <Image
                  src={primaryImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  {product.itemNo && (
                    <span className="text-[10px] font-bold text-[#e67e51] bg-amber-50 px-1.5 py-0.5 rounded-md">
                      #{product.itemNo}
                    </span>
                  )}
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate mt-0.5">
                  {product.name}
                </h4>
                <p className="font-black text-xs sm:text-sm text-[#6c40d9]">
                  {formattedPrice}
                </p>
              </div>
            </div>

            {/* Direct Social Share Channels */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Send Directly To:
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                {/* 1. WhatsApp Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-2xl bg-emerald-600 px-3.5 py-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-500 transition active:scale-95"
                >
                  <MessageCircle className="h-4 w-4 fill-white shrink-0" />
                  <div className="text-left leading-tight truncate">
                    <p className="font-extrabold">WhatsApp</p>
                    <p className="text-[10px] text-emerald-100 font-normal">Chat or Status</p>
                  </div>
                </a>

                {/* 2. Telegram Button */}
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-2xl bg-sky-500 px-3.5 py-3 text-xs font-bold text-white shadow-sm hover:bg-sky-400 transition active:scale-95"
                >
                  <Send className="h-4 w-4 fill-white shrink-0" />
                  <div className="text-left leading-tight truncate">
                    <p className="font-extrabold">Telegram</p>
                    <p className="text-[10px] text-sky-100 font-normal">Channel or Chat</p>
                  </div>
                </a>

                {/* 3. Facebook Share */}
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-2xl bg-[#1877F2] px-3.5 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#166fe5] transition active:scale-95"
                >
                  <ExternalLink className="h-4 w-4 shrink-0" />
                  <div className="text-left leading-tight truncate">
                    <p className="font-extrabold">Facebook</p>
                    <p className="text-[10px] text-blue-100 font-normal">Feed or Group</p>
                  </div>
                </a>

                {/* 4. X / Twitter Share */}
                <a
                  href={xTwitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-2xl bg-slate-900 px-3.5 py-3 text-xs font-bold text-white shadow-sm hover:bg-slate-800 transition active:scale-95"
                >
                  <Sparkles className="h-4 w-4 text-[#fda173] shrink-0" />
                  <div className="text-left leading-tight truncate">
                    <p className="font-extrabold">X (Twitter)</p>
                    <p className="text-[10px] text-slate-300 font-normal">Post to Feed</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Actions: Download Image & Copy Link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-100">
              {/* Copy Product Link */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 px-4 py-2.5 text-xs font-bold text-slate-800 transition active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span className="text-emerald-700">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-slate-500" />
                    <span>Copy Direct Link</span>
                  </>
                )}
              </button>

              {/* Download Product Image */}
              <button
                type="button"
                onClick={handleDownloadImage}
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 px-4 py-2.5 text-xs font-bold text-slate-800 transition active:scale-95"
              >
                <Download className="h-4 w-4 text-slate-500" />
                <span>Save High-Res Photo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
