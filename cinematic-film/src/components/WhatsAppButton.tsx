"use client";

import { MessageCircle } from "lucide-react";
import { TRIP_CONFIG } from "@/data/tripConfig";

export default function WhatsAppButton() {
  return (
    <a
      href={TRIP_CONFIG.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with BharatVista on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl shadow-black/60 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
    >
      <MessageCircle className="w-5 h-5 fill-current text-white" />
      <span className="text-xs font-bold tracking-wide hidden sm:inline">
        WhatsApp Us
      </span>
      <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded font-mono hidden md:inline">
        {TRIP_CONFIG.phones.whatsapp}
      </span>
    </a>
  );
}

