"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

function ProcessingContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order_number");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!orderNumber || !token) {
      window.location.href = "/";
      return;
    }

    const redirectTimer = setTimeout(() => {
      window.location.href = `/orders/${orderNumber}?token=${token}`;
    }, 3000);

    return () => {
      clearTimeout(redirectTimer);
    };
  }, [orderNumber, token]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-black" />
    </div>
  );
}

export default function ProcessingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-black" /></div>}>
      <ProcessingContent />
    </Suspense>
  );
}
