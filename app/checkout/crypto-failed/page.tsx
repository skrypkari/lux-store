"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { XCircle, AlertTriangle, RefreshCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";

function CryptoFailedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [txnId, setTxnId] = useState("");

  useEffect(() => {
    const id = searchParams.get("txn_id");
    if (id) {
      setTxnId(id);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="text-center">
          {/* Failed Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-red-500/20 blur-3xl" />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-red-500/20 bg-gradient-to-br from-red-50 to-red-100 shadow-2xl">
                <XCircle className="h-16 w-16 text-red-600" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-4 font-satoshi text-5xl font-bold text-black">Payment Not Completed</h1>
          <p className="mb-2 font-general-sans text-xl text-black/70">
            Your cryptocurrency payment was not successful
          </p>
          <p className="mb-8 font-general-sans text-black/60">
            The payment process was interrupted or expired
          </p>

          {/* Transaction ID Card */}
          {txnId && (
            <div className="mb-10 rounded-2xl border border-red-500/20 bg-red-50/50 p-8 shadow-xl">
              <div className="mb-4 flex items-center justify-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-600/80" />
                <p className="font-satoshi text-sm font-bold uppercase tracking-wide text-red-600/80">
                  Transaction ID
                </p>
              </div>
              <code className="block rounded-xl bg-red-100/50 px-6 py-3 font-mono text-lg font-bold tracking-wide text-red-700">
                {txnId}
              </code>
            </div>
          )}

          {/* Divider */}
          <div className="mb-10 flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-black/20" />
            <div className="h-2 w-2 rounded-full bg-black/20" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-black/20" />
          </div>

          {/* Reasons Section */}
          <div className="mb-10 text-left">
            <h2 className="mb-6 text-center font-satoshi text-2xl font-bold">Common Reasons</h2>
            <div className="space-y-4">
              {/* Reason 1 */}
              <div className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-lg">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/5">
                  <svg className="h-6 w-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-satoshi text-lg font-bold">Payment Timeout</h3>
                  <p className="font-general-sans text-sm text-black/70">
                    The 30-minute payment window expired before the transaction was completed.
                  </p>
                </div>
              </div>

              {/* Reason 2 */}
              <div className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-lg">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/5">
                  <svg className="h-6 w-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-satoshi text-lg font-bold">Insufficient Funds</h3>
                  <p className="font-general-sans text-sm text-black/70">
                    Your wallet may not have had sufficient balance to complete the payment.
                  </p>
                </div>
              </div>

              {/* Reason 3 */}
              <div className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-lg">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/5">
                  <svg className="h-6 w-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-satoshi text-lg font-bold">Transaction Cancelled</h3>
                  <p className="font-general-sans text-sm text-black/70">
                    The payment was manually cancelled or rejected by your wallet provider.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-6">
            <Link href="/cart">
              <Button
                size="lg"
                className="gap-2 bg-black px-10 py-6 text-base font-bold shadow-xl hover:bg-black/90"
              >
                <RefreshCcw className="h-5 w-5" />
                Try Again
              </Button>
            </Link>

            <Link href="/checkout/payment-method">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-2 px-10 py-6 text-base font-semibold"
              >
                <ArrowLeft className="h-5 w-5" />
                Choose Different Payment Method
              </Button>
            </Link>

            <Link href="/store/all">
              <Button
                size="lg"
                variant="ghost"
                className="px-10 py-6 text-base font-semibold"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Support Section */}
          <div className="mt-10 rounded-2xl border border-black/10 bg-gradient-to-br from-[#FAFAFA] via-white to-[#F5F5F5] p-6">
            <p className="mb-3 font-satoshi text-sm font-bold">Need Help?</p>
            <p className="mb-4 font-general-sans text-sm text-black/60">
              If you believe this is an error or need assistance with your payment, our support team is ready to help.
            </p>
            <Link href="/contact">
              <Button variant="outline" size="sm" className="gap-2 border-black/20 font-semibold">
                Contact Support
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Button>
            </Link>
          </div>

          {/* Footer Note */}
          <p className="mt-8 font-general-sans text-xs text-black/40">
            No funds have been charged to your wallet
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CryptoFailedPage() {
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
      <CryptoFailedContent />
    </Suspense>
  );
}
