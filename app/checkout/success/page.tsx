"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, Mail, Truck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState("");
  const { clearCart } = useCart();

  useEffect(() => {
    // Get order ID from URL params
    const id = searchParams.get("orderId");
    if (id) {
      setOrderId(id);
      
      // Clear the cart
      clearCart();
    } else {
      // If no order ID, redirect to home
      router.push("/");
    }
  }, [searchParams, router, clearCart]);

  if (!orderId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-green-500/20 blur-3xl" />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-green-500/20 bg-gradient-to-br from-green-50 to-green-100 shadow-2xl">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-4 font-satoshi text-5xl font-bold text-black">Payment Successful!</h1>
          <p className="mb-2 font-general-sans text-xl text-black/70">
            Thank you for your luxury purchase
          </p>
          <p className="mb-8 font-general-sans text-black/60">
            Your order has been confirmed and is being processed
          </p>

          {/* Order ID Card */}
          <div className="mb-10 rounded-2xl border border-black/10 bg-white p-8 shadow-xl">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Package className="h-6 w-6 text-black/60" />
              <p className="font-satoshi text-sm font-bold uppercase tracking-wide text-black/70">
                Order Confirmation
              </p>
            </div>
            <p className="mb-2 font-general-sans text-sm text-black/60">Your Order ID</p>
            <div className="mb-4 flex items-center justify-center gap-3">
              <code className="rounded-xl bg-black/5 px-6 py-3 font-mono text-2xl font-bold tracking-wide text-black">
                {orderId}
              </code>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(orderId);
                }}
                className="h-12 w-12"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </Button>
            </div>
            <Link href={`/orders/${orderId}`} className="inline-block">
              <Button variant="link" className="gap-2 font-semibold">
                View Order Details
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Divider */}
          <div className="mb-10 flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-black/20" />
            <div className="h-2 w-2 rounded-full bg-black/20" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-black/20" />
          </div>

          {/* What's Next Section */}
          <div className="mb-10 text-left">
            <h2 className="mb-6 text-center font-satoshi text-2xl font-bold">What Happens Next?</h2>
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-lg">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/10">
                  <CheckCircle2 className="h-6 w-6 text-black/60" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-satoshi text-lg font-bold">Payment Confirmed</h3>
                  <p className="font-general-sans text-sm text-black/70">
                    Your payment has been successfully processed and your order is confirmed.
                  </p>
                  <p className="mt-2 font-general-sans text-xs text-black/50">
                    ✓ Current Status
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-lg">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/10">
                  <Mail className="h-6 w-6 text-black/60" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-satoshi text-lg font-bold">Email Confirmation</h3>
                  <p className="font-general-sans text-sm text-black/70">
                    We'll send you an email confirmation with your order details and receipt within
                    the next few minutes.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-lg">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/10">
                  <Package className="h-6 w-6 text-black/60" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-satoshi text-lg font-bold">Order Processing</h3>
                  <p className="font-general-sans text-sm text-black/70">
                    Your order is being prepared for shipment. This typically takes 1-2 business
                    days.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-lg">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/10">
                  <Truck className="h-6 w-6 text-black/60" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-satoshi text-lg font-bold">Tracking Information</h3>
                  <p className="font-general-sans text-sm text-black/70">
                    Once your order ships, we'll email you the tracking number so you can follow
                    your package every step of the way.
                  </p>
                  <p className="mt-2 font-general-sans text-xs text-black/50">
                    Expected delivery: 20-35 days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
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

          {/* Support Section */}
          <div className="mt-10 rounded-2xl border border-black/10 bg-gradient-to-br from-[#FAFAFA] via-white to-[#F5F5F5] p-6">
            <p className="mb-3 font-satoshi text-sm font-bold">Need Assistance?</p>
            <p className="mb-4 font-general-sans text-sm text-black/60">
              Our customer support team is here to help with any questions about your order.
            </p>
            <Link href="/contact">
              <Button variant="outline" size="sm" className="gap-2 border-black/20 font-semibold">
                Contact Support
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Footer Note */}
          <p className="mt-8 font-general-sans text-xs text-black/40">
            A confirmation email has been sent to your registered email address
          </p>
        </div>
      </div>
    </div>
  );
}
