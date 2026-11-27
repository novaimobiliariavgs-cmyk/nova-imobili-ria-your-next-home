import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/data/properties";

export function WhatsAppFloat() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-dark fixed bottom-5 right-4 md:bottom-6 md:right-6 z-50 flex h-14 items-center gap-2 rounded-full pl-4 pr-5 text-white font-semibold transition-transform duration-200 hover:scale-105 active:scale-95"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-gold-light" />
      WhatsApp
    </a>
  );
}
