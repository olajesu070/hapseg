import { MessageCircle } from "lucide-react";

interface WhatsAppOrderButtonProps {
  phoneNumber: string;
  productName: string;
  itemNo?: string | null;
  className?: string;
}

export function WhatsAppOrderButton({
  phoneNumber,
  productName,
  itemNo,
  className = "",
}: WhatsAppOrderButtonProps) {
  // Edge case fix: strictly sanitize phone number, fallback if too short
  const rawDigits = (phoneNumber || "").replace(/[^0-9]/g, "");
  const fallbackPhone = (process.env.DEFAULT_FALLBACK_PHONE || "2347030797836").replace(/[^0-9]/g, "");
  const cleanPhone = rawDigits.length >= 10 ? rawDigits : fallbackPhone;

  // Sanitize title to prevent URL encoding corruption
  const safeName = (productName || "Product").trim().slice(0, 100);
  const itemTag = itemNo ? ` (Item: #${itemNo.trim().slice(0, 30)})` : "";
  const message = `Hello! I would like to order: ${safeName}${itemTag}. Is it available?`;
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-600/30 transition-all duration-200 active:scale-[0.98] hover:bg-emerald-500 hover:shadow-emerald-600/40 ${className}`}
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:scale-110">
        <MessageCircle className="h-4 w-4 fill-white text-emerald-600" />
      </div>
      <span>Order via WhatsApp</span>
    </a>
  );
}
