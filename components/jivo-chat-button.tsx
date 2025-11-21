"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function JivoChatButton() {
  const [isJivoReady, setIsJivoReady] = useState(false);

  useEffect(() => {

    const checkJivo = () => {
      if (typeof window !== 'undefined' && (window as any).jivo_api) {
        setIsJivoReady(true);
        console.log('✅ Jivo API loaded');
      }
    };


    checkJivo();


    const interval = setInterval(checkJivo, 500);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (!isJivoReady) {
        console.log('⚠️ Jivo API not loaded after 5 seconds');
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isJivoReady]);

  const handleClick = () => {
    console.log('🖱️ Button clicked');
    
    if (typeof window !== 'undefined') {
      const jivo = (window as any).jivo_api;
      
      console.log('Jivo API available:', !!jivo);
      
      if (jivo) {
        console.log('📞 Opening Jivo chat...');
        try {
          jivo.open();
          console.log('✅ Jivo opened');
        } catch (error) {
          console.error('❌ Error opening Jivo:', error);
        }
      } else {
        console.log('⚠️ Jivo API not available yet. Available methods:', Object.keys(window));
      }
    }
  };

  return (
    <button 
      onClick={handleClick}
      className="group cursor-pointer flex w-full items-center gap-4 rounded-xl border border-black/10 bg-black/5 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-black hover:bg-black"
    >
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-black transition-colors group-hover:bg-white">
        <MessageCircle className="h-6 w-6 text-white transition-colors group-hover:text-black" />
      </div>
      <div className="flex-1 text-left">
        <p className="font-satoshi text-xs font-bold text-black/50 transition-colors group-hover:text-white/70">
          Live Chat {!isJivoReady && <span className="text-xs">(loading...)</span>}
        </p>
        <p className="font-satoshi text-base font-bold transition-colors group-hover:text-white">
          Start Conversation
        </p>
      </div>
    </button>
  );
}
