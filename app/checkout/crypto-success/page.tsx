"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import Link from "next/link";

function CryptoSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const id = searchParams.get("orderId");
    if (id) {
      setOrderId(id);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-green-500/20 blur-3xl" />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-green-500/20 bg-gradient-to-br from-green-50 to-green-100 shadow-2xl">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              </div>
            </div>
          </div>

          <h1 className="mb-4 font-satoshi text-5xl font-bold text-black">
            Payment Received!
          </h1>
          <p className="mb-2 font-general-sans text-xl text-black/70">
            Your cryptocurrency payment is being processed
          </p>
          <p className="mb-8 font-general-sans text-black/60">
            We're confirming your transaction on the blockchain
          </p>

          {orderId && (
            <div className="mb-10 rounded-2xl border border-black/10 bg-white p-8 shadow-xl">
              <div className="mb-4 flex items-center justify-center gap-2">
                <Package className="h-6 w-6 text-black/60" />
                <p className="font-satoshi text-sm font-bold uppercase tracking-wide text-black/70">
                  Order ID
                </p>
              </div>
              <code className="block rounded-xl bg-black/5 px-6 py-3 font-mono text-lg font-bold tracking-wide text-black">
                {orderId}
              </code>
            </div>
          )}

          <div className="mb-10 flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-black/20" />
            <div className="h-2 w-2 rounded-full bg-black/20" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-black/20" />
          </div>

          <div className="mb-10 text-left">
            <h2 className="mb-6 text-center font-satoshi text-2xl font-bold">
              What Happens Next?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-lg">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/10">
                  <CheckCircle2 className="h-6 w-6 text-black/60" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-satoshi text-lg font-bold">
                    Payment Received
                  </h3>
                  <p className="font-general-sans text-sm text-black/70">
                    Your cryptocurrency payment has been detected and is being
                    confirmed on the blockchain.
                  </p>
                  <p className="mt-2 font-general-sans text-xs text-black/50">
                    ✓ Current Status
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-lg">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/10">
                  <svg
                    className="h-6 w-6 text-black/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-satoshi text-lg font-bold">
                    Blockchain Confirmation
                  </h3>
                  <p className="font-general-sans text-sm text-black/70">
                    Waiting for network confirmations. This typically takes a
                    few minutes depending on the cryptocurrency.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-lg">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/10">
                  <Package className="h-6 w-6 text-black/60" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-satoshi text-lg font-bold">
                    Order Processing
                  </h3>
                  <p className="font-general-sans text-sm text-black/70">
                    Once confirmed, your order will be prepared for shipment
                    within 1-2 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <Link href="/store/all">
              <Button
                size="lg"
                className="gap-2 bg-black px-10 py-6 text-base font-bold shadow-xl hover:bg-black/90"
              >
                Continue Shopping
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="border-2 px-10 py-6 text-base font-semibold"
              >
                Return to Home
              </Button>
            </Link>
          </div>

          <div className="mt-10 rounded-2xl border border-black/10 bg-gradient-to-br from-[#FAFAFA] via-white to-[#F5F5F5] p-6">
            <p className="mb-3 font-satoshi text-sm font-bold">
              Need Assistance?
            </p>
            <p className="mb-4 font-general-sans text-sm text-black/60">
              If you have any questions about your payment or order, our support
              team is here to help.
            </p>
            <Link href="/contact">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-black/20 font-semibold"
              >
                Contact Support
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <p className="mt-8 font-general-sans text-xs text-black/40">
            A confirmation email will be sent once your payment is fully
            confirmed
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CryptoSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-black"></div>
            <p className="font-general-sans text-black/60">Loading...</p>
          </div>
        </div>
      }
    >
      <CryptoSuccessContent />
    </Suspense>
  );
}
