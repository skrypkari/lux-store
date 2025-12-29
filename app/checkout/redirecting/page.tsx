"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

function RedirectingContent() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("url");

  useEffect(() => {
    if (!redirectUrl) {
      window.location.href = "/";
      return;
    }

    const redirectTimer = setTimeout(() => {
      window.location.href = decodeURIComponent(redirectUrl);
    }, 3000);

    return () => {
      clearTimeout(redirectTimer);
    };
  }, [redirectUrl]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-black" />
    </div>
  );
}

export default function RedirectingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-black" /></div>}>
      <RedirectingContent />
    </Suspense>
  );
}
