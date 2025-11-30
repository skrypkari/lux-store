"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const handleClick = () => {
    window.open('https://api.whatsapp.com/send/?phone=15558047959', '_blank');
  };

  return (
    <button 
      onClick={handleClick}
      className="group cursor-pointer flex w-full items-center gap-4 rounded-xl border border-black/10 bg-black/5 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-[#25D366] hover:bg-[#25D366]"
    >
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#25D366] transition-colors group-hover:bg-white">
        <MessageCircle className="h-6 w-6 text-white transition-colors group-hover:text-[#25D366]" />
      </div>
      <div className="flex-1 text-left">
        <p className="font-satoshi text-xs font-bold text-black/50 transition-colors group-hover:text-white/70">
          WhatsApp
        </p>
        <p className="font-satoshi text-base font-bold transition-colors group-hover:text-white">
          Start Conversation
        </p>
      </div>
    </button>
  );
}

