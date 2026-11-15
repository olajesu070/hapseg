import { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us — Hapseg Varieties Store",
  description: "Get in touch with Hapseg Store. Physical branches in Ado Ekiti, direct phone numbers, and WhatsApp support.",
};

export default function ContactUsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 max-w-xl">
          <span className="inline-block rounded-full bg-slate-800 text-slate-300 px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-3">
            Get In Touch
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            We’re Just a Message Away!
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
            Have a question about an order, wholesale inquiry, or specific product availability? Reach out directly via our physical stores or instant WhatsApp.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Physical Store Locations */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-emerald-600" />
            <span>Our Physical Branches</span>
          </h2>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Location 1 (Main Branch)
            </span>
            <h3 className="font-bold text-slate-900 text-sm">Okesha Market Branch</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Blue Two Storey Building, Opposite Subeb School, Okesha Market, Ado Ekiti, Ekiti State.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Location 2
            </span>
            <h3 className="font-bold text-slate-900 text-sm">Okeise Street Branch</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Possibility Complex, Opposite Fajuyi Lane, Okeise Street, Ado Ekiti, Ekiti State.
            </p>
          </div>

          {/* Operating Hours */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Clock className="h-4 w-4 text-emerald-600" />
              <span>Opening Hours</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 space-y-1">
              <p className="flex justify-between">
                <span>Monday – Friday:</span>
                <span className="font-semibold text-slate-900">09:00am – 06:00pm</span>
              </p>
              <p className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-semibold text-slate-900">09:00am – 05:00pm</span>
              </p>
              <p className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-semibold text-slate-400">Closed</span>
              </p>
            </div>
          </div>
        </div>

        {/* Contact Numbers & Channels */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
            <Phone className="h-5 w-5 text-emerald-600" />
            <span>Direct Channels</span>
          </h2>

          {/* Direct WhatsApp Callout */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white shadow-lg space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-base">Instant WhatsApp Chat</h3>
                <p className="text-xs text-emerald-100">Quickest response for questions & orders</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-emerald-50">
              Speak directly with our store attendants regarding item availability, dimensions, or custom deliveries.
            </p>
            <a
              href="https://wa.me/2347030797836?text=Hello%20Hapseg%20Store%2C%20I%20have%20an%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-white text-emerald-800 text-xs sm:text-sm font-bold shadow-md transition hover:bg-emerald-50 active:scale-95"
            >
              <span>Chat with us on WhatsApp</span>
              <Send className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Direct Phone Lines */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Customer Support Lines</h3>
            <div className="space-y-2 text-xs sm:text-sm font-semibold">
              <a
                href="tel:+2348161241045"
                className="flex items-center gap-2.5 text-slate-700 hover:text-emerald-700 transition"
              >
                <Phone className="h-4 w-4 text-emerald-600" />
                <span>+234 816 124 1045</span>
              </a>
              <a
                href="tel:+2347079828222"
                className="flex items-center gap-2.5 text-slate-700 hover:text-emerald-700 transition"
              >
                <Phone className="h-4 w-4 text-emerald-600" />
                <span>+234 707 982 8222</span>
              </a>
            </div>
          </div>

          {/* Official Email */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Email Inquiries</h3>
            <div className="space-y-2 text-xs sm:text-sm font-semibold">
              <a
                href="mailto:info@hapsegstore.com"
                className="flex items-center gap-2.5 text-slate-700 hover:text-emerald-700 transition"
              >
                <Mail className="h-4 w-4 text-emerald-600" />
                <span>info@hapsegstore.com</span>
              </a>
              <a
                href="mailto:hapsegie@gmail.com"
                className="flex items-center gap-2.5 text-slate-700 hover:text-emerald-700 transition"
              >
                <Mail className="h-4 w-4 text-emerald-600" />
                <span>hapsegie@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
