"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Building2,
  Shield,
  Lock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

function OpenBankingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order");

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setError("Order ID is missing");
      return;
    }

    handlePayment();
  }, [orderId]);

  const handlePayment = async () => {
    if (!orderId) {
      setError("Order ID is required");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.lux-store.eu/orders/${orderId}/ampay-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create payment");
      }

      const data = await response.json();

      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        throw new Error("No redirect URL received");
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      setError(err.message || "Failed to process payment");
      setIsProcessing(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black px-4 py-16">
        <div className="container mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-3xl border border-red-900/20 bg-gradient-to-br from-red-950/40 via-zinc-900/90 to-black shadow-2xl backdrop-blur-sm">
            <div className="p-12 text-center">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-red-500/20 blur-xl"></div>
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-red-500/30 bg-gradient-to-br from-red-950/80 to-red-900/60 shadow-lg">
                    <Shield
                      className="h-10 w-10 text-red-400"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </div>

              <h2 className="mb-4 font-editorial text-4xl font-light tracking-tight text-white">
                Payment Processing Error
              </h2>

              <div className="mb-8 space-y-3">
                <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
                <p className="font-satoshi text-lg font-light text-red-200/90">
                  {error}
                </p>
              </div>

              <Button
                onClick={() => router.push(`/orders/pending?order=${orderId}`)}
                className="group relative overflow-hidden border border-white/10 bg-white/5 px-8 py-6 font-satoshi text-base font-medium text-white shadow-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl"
              >
                <span className="relative z-10">Return to Order Details</span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black px-4 py-16">
      <div className="container mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/90 via-black/95 to-zinc-900/90 shadow-2xl backdrop-blur-sm">
          <div className="relative p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.02),transparent_50%)]"></div>

            <div className="relative text-center">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-white/10 blur-xl"></div>

                  <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-white/20 to-transparent blur-md"></div>

                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-zinc-800/80 to-zinc-900/90 shadow-2xl backdrop-blur-sm">
                    <Building2
                      className="h-12 w-12 text-white"
                      strokeWidth={1.5}
                    />
                    <Sparkles className="absolute -right-1 -top-1 h-5 w-5 animate-pulse text-white/80" />
                  </div>
                </div>
              </div>

              <h2 className="mb-3 font-editorial text-5xl font-light tracking-tight text-white">
                Open Banking Payment
              </h2>

              <p className="mb-8 font-satoshi text-sm font-light uppercase tracking-[0.2em] text-white/50">
                Secure Bank Transfer
              </p>

              <div className="mb-10 space-y-4">
                <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

                <div className="flex items-center justify-center gap-3">
                  <Loader2
                    className="h-5 w-5 animate-spin text-white/70"
                    strokeWidth={2}
                  />
                  <p className="font-satoshi text-lg font-light text-white/90">
                    Redirecting to secure payment gateway
                  </p>
                </div>

                <p className="font-general-sans text-sm font-light text-white/50">
                  Please wait while we prepare your transaction
                </p>
              </div>

              <div className="mb-10 rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm">
                <div className="mb-6 flex items-center justify-center gap-2 text-white/90">
                  <Lock className="h-5 w-5" strokeWidth={1.5} />
                  <span className="font-satoshi text-sm font-medium uppercase tracking-wider">
                    Protected Transaction
                  </span>
                </div>

                <div className="grid gap-5 text-left md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className="h-4 w-4 flex-shrink-0 text-emerald-400"
                        strokeWidth={2}
                      />
                      <p className="font-satoshi text-sm font-medium text-white/90">
                        Bank Security
                      </p>
                    </div>
                    <p className="font-general-sans text-xs leading-relaxed text-white/50">
                      Military-grade encryption protects your data
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className="h-4 w-4 flex-shrink-0 text-emerald-400"
                        strokeWidth={2}
                      />
                      <p className="font-satoshi text-sm font-medium text-white/90">
                        Direct Transfer
                      </p>
                    </div>
                    <p className="font-general-sans text-xs leading-relaxed text-white/50">
                      Connect directly to your financial institution
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className="h-4 w-4 flex-shrink-0 text-emerald-400"
                        strokeWidth={2}
                      />
                      <p className="font-satoshi text-sm font-medium text-white/90">
                        Instant Status
                      </p>
                    </div>
                    <p className="font-general-sans text-xs leading-relaxed text-white/50">
                      Real-time confirmation upon completion
                    </p>
                  </div>
                </div>
              </div>

              {orderId && (
                <div className="space-y-2">
                  <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                  <p className="font-general-sans text-xs font-light uppercase tracking-wider text-white/30">
                    Transaction Reference
                  </p>
                  <p className="font-mono text-sm font-medium text-white/70">
                    {orderId}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="mt-8 text-center font-general-sans text-xs text-white/20">
          You will be securely redirected to complete your payment
        </p>
      </div>
    </div>
  );
}

export default function OpenBankingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black">
          <Loader2 className="h-8 w-8 animate-spin text-white/50" />
        </div>
      }
    >
      <OpenBankingContent />
    </Suspense>
  );
}
