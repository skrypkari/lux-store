"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ChatButton() {
  const [isJivoReady, setIsJivoReady] = useState(false);

  useEffect(() => {
    // Проверяем загрузку Jivo API
    const checkJivo = () => {
      if (typeof window !== 'undefined' && (window as any).jivo_api) {
        setIsJivoReady(true);
        console.log('✅ Jivo API loaded');
      }
    };

    // Проверяем сразу
    checkJivo();

    // Проверяем периодически в течение 5 секунд
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
    console.log('🖱️ Opening Jivo chat...');
    
    if (typeof window !== 'undefined') {
      const jivo = (window as any).jivo_api;
      
      if (jivo) {
        try {
          jivo.open();
          console.log('✅ Jivo chat opened');
        } catch (error) {
          console.error('❌ Error opening Jivo:', error);
        }
      } else {
        console.log('⚠️ Jivo API not available yet');
      }
    }
  };

  return (
    <Button size="lg" variant="outline" onClick={handleClick}>
      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      Online Chat
    </Button>
  );
}
