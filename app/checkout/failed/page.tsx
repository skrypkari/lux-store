"use client";

import { Button } from "@/components/ui/button";
import { XCircle, ArrowRight, RotateCcw, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentFailedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-red-500/20 blur-2xl" />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-red-500/20 bg-gradient-to-br from-red-50 to-red-100 shadow-2xl">
                <XCircle className="h-16 w-16 text-red-600" />
              </div>
            </div>
          </div>

          <h1 className="mb-4 font-satoshi text-4xl font-bold text-black">
            Payment Failed
          </h1>
          <p className="mb-2 font-general-sans text-xl text-black/70">
            We couldn't process your payment
          </p>
          <p className="mb-8 font-general-sans text-black/60">
            There was an issue with your card. Please check your details and try
            again.
          </p>

          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-black/20" />
            <div className="h-2 w-2 rounded-full bg-black/20" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-black/20" />
          </div>

          <div className="mb-10 rounded-2xl border border-red-500/20 bg-red-50 p-6">
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
              <p className="font-satoshi text-sm font-bold uppercase tracking-wide text-red-900">
                Transaction Error
              </p>
              <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
            </div>
            <p className="font-general-sans text-sm leading-relaxed text-red-800">
              Your card was declined. This could be due to insufficient funds,
              incorrect card details, or your bank's security measures. Please
              verify your information or try a different payment method.
            </p>
          </div>

          <div className="mb-10 text-left">
            <h2 className="mb-4 text-center font-satoshi text-lg font-bold">
              Common Reasons for Declined Payments
            </h2>
            <div className="space-y-3 rounded-2xl border border-black/10 bg-white p-6 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black/40" />
                <p className="font-general-sans text-sm text-black/70">
                  <span className="font-bold text-black">
                    Incorrect card details
                  </span>{" "}
                  — Verify your card number, expiry date, and CVV
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black/40" />
                <p className="font-general-sans text-sm text-black/70">
                  <span className="font-bold text-black">
                    Insufficient funds
                  </span>{" "}
                  — Check your account balance
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black/40" />
                <p className="font-general-sans text-sm text-black/70">
                  <span className="font-bold text-black">
                    Card restrictions
                  </span>{" "}
                  — Contact your bank for international or online purchase
                  authorization
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black/40" />
                <p className="font-general-sans text-sm text-black/70">
                  <span className="font-bold text-black">Expired card</span> —
                  Make sure your card is still valid
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8 space-y-4">
            <Button
              size="lg"
              className="group w-full gap-2 bg-black py-6 text-base font-bold shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-black/90 active:scale-[0.98]"
              onClick={() => router.push("/checkout/payment")}
            >
              <RotateCcw className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
              Try Again
            </Button>

            <Link href="/store/all">
              <Button
                size="lg"
                variant="ghost"
                className="w-full gap-2 py-6 text-base font-medium text-black/60 transition-all duration-300 hover:bg-black/5 hover:text-black"
              >
                <Home className="h-5 w-5" />
                Return to Store
              </Button>
            </Link>
          </div>

          <div className="rounded-2xl border border-black/10 bg-gradient-to-br from-[#FAFAFA] via-white to-[#F5F5F5] p-6">
            <p className="mb-3 font-satoshi text-sm font-bold">Need Help?</p>
            <p className="mb-4 font-general-sans text-sm text-black/60">
              If you continue to experience issues, please contact your bank or
              reach out to our customer support team.
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
            No charges were made to your account. Your cart items are still
            saved.
          </p>
        </div>
      </div>
    </div>
  );
}
