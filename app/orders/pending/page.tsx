"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle, Clock, ArrowRight, AlertCircle, Lock } from "lucide-react";
import Link from "next/link";

type PaymentStatus = "pending" | "paid" | "overpaid" | "underpaid" | "expired" | "error";

interface OrderStatusResponse {
  id: number;
  order_number: string;
  payment_status: string;
  gateway_payment_id: string | null;
  total: number;
}

export default function PendingPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const gatewayPaymentId = searchParams.get("gateway_payment_id");

  const [status, setStatus] = useState<PaymentStatus>("pending");
  const [orderData, setOrderData] = useState<OrderStatusResponse | null>(null);
  const [checkCount, setCheckCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setError("Order ID not found");
      return;
    }

    // Function to check payment status
    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/orders/${orderId}/cointopay-status`);
        
        if (!response.ok) {
          throw new Error("Failed to check payment status");
        }

        const data: OrderStatusResponse = await response.json();
        setOrderData(data);

        // Map payment_status to our status type
        if (data.payment_status === "paid") {
          setStatus("paid");
          // Redirect to success page after 2 seconds
          setTimeout(() => {
            router.push(`/orders/success?order_number=${data.order_number}`);
          }, 2000);
        } else if (data.payment_status === "pending") {
          setStatus("pending");
        } else if (data.payment_status === "expired") {
          setStatus("expired");
        } else if (data.payment_status === "underpaid") {
          setStatus("underpaid");
        } else if (data.payment_status === "overpaid") {
          setStatus("overpaid");
        }

        setCheckCount((prev) => prev + 1);
      } catch (err) {
        console.error("Error checking payment status:", err);
        setError("Failed to check payment status");
        setStatus("error");
      }
    };

    // Check immediately
    checkPaymentStatus();

    // Then check every 10 minutes (600000 ms)
    // Frontend читает из БД, CRON обновляет статус каждые 10 минут
    const interval = setInterval(checkPaymentStatus, 600000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [orderId, router]);

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="relative overflow-hidden rounded-3xl border border-red-200 bg-white p-8 shadow-2xl sm:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent" />
            
            <div className="relative z-10 text-center">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-red-400 opacity-20" />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600 shadow-xl">
                    <XCircle className="h-14 w-14 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              <h1 className="mb-3 font-satoshi text-4xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                  Unable to Process
                </span>
              </h1>
              <p className="mb-8 font-general-sans text-lg text-black/60">
                {error}
              </p>

              <div className="mb-8 rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-6">
                <h3 className="mb-3 font-satoshi text-lg font-bold">Need Assistance?</h3>
                <p className="font-general-sans text-sm text-black/70">
                  Our support team is available 24/7 to help resolve any issues. Please don't hesitate to reach out.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/contact">
                  <Button size="lg" className="gap-2 bg-gradient-to-r from-red-600 to-rose-600 px-8 font-satoshi font-semibold hover:from-red-700 hover:to-rose-700">
                    Contact Support
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/store/all">
                  <Button variant="outline" size="lg" className="gap-2 border-2 font-satoshi font-semibold">
                    Continue Shopping
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render paid state
  if (status === "paid") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-white p-8 shadow-2xl sm:p-12">
            {/* Success animation background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent" />
            
            <div className="relative z-10 text-center">
              {/* Animated checkmark */}
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-20" />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-xl">
                    <CheckCircle2 className="h-14 w-14 animate-bounce text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Success message */}
              <h1 className="mb-3 font-satoshi text-4xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Payment Confirmed
                </span>
              </h1>
              <p className="mb-8 font-general-sans text-lg text-black/60">
                Your luxury order has been successfully processed
              </p>

              {/* Order details card */}
              {orderData && (
                <div className="mb-8 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-8">
                  <div className="mb-4 inline-flex rounded-full bg-emerald-100 px-4 py-1.5">
                    <p className="font-satoshi text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Order Confirmed
                    </p>
                  </div>
                  <p className="mb-2 font-satoshi text-5xl font-bold tracking-tight">
                    {orderData.order_number}
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-2 text-black/50">
                    <div className="h-px w-12 bg-black/20" />
                    <p className="font-general-sans text-sm uppercase tracking-wider">Total Paid</p>
                    <div className="h-px w-12 bg-black/20" />
                  </div>
                  <p className="mt-3 font-satoshi text-3xl font-bold">
                    €{orderData.total.toLocaleString()}
                  </p>
                </div>
              )}

              {/* Redirecting message */}
              <div className="flex items-center justify-center gap-3 text-emerald-600">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p className="font-satoshi text-sm font-semibold">
                  Redirecting to your order details...
                </p>
              </div>
            </div>
          </div>

          {/* What's next section */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white/80 p-6 backdrop-blur-sm">
              <div className="mb-3 inline-flex rounded-full bg-black/5 p-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
              <p className="font-satoshi text-sm font-bold">Confirmation Email</p>
              <p className="mt-1 font-general-sans text-xs text-black/60">
                Sent to your inbox
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white/80 p-6 backdrop-blur-sm">
              <div className="mb-3 inline-flex rounded-full bg-black/5 p-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
              <p className="font-satoshi text-sm font-bold">Order Processing</p>
              <p className="mt-1 font-general-sans text-xs text-black/60">
                Preparing shipment
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white/80 p-6 backdrop-blur-sm">
              <div className="mb-3 inline-flex rounded-full bg-black/5 p-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
              <p className="font-satoshi text-sm font-bold">Track & Trace</p>
              <p className="mt-1 font-general-sans text-xs text-black/60">
                Updates coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render expired state
  if (status === "expired") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="relative overflow-hidden rounded-3xl border border-orange-200 bg-white p-8 shadow-2xl sm:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent" />
            
            <div className="relative z-10 text-center">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-orange-400 opacity-20" />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-amber-600 shadow-xl">
                    <Clock className="h-14 w-14 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              <h1 className="mb-3 font-satoshi text-4xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Payment Window Expired
                </span>
              </h1>
              <p className="mb-8 font-general-sans text-lg text-black/60">
                The payment session has timed out. No worries, you can restart the process.
              </p>

              {orderData && (
                <div className="mb-8 rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-8">
                  <p className="mb-2 font-satoshi text-sm uppercase tracking-wider text-orange-600">
                    Order Reference
                  </p>
                  <p className="font-satoshi text-3xl font-bold tracking-tight">
                    {orderData.order_number}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/checkout">
                  <Button size="lg" className="gap-2 bg-gradient-to-r from-orange-600 to-amber-600 px-8 font-satoshi font-semibold hover:from-orange-700 hover:to-amber-700">
                    Create New Payment
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="gap-2 border-2 font-satoshi font-semibold">
                    Contact Support
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render underpaid/overpaid state
  if (status === "underpaid" || status === "overpaid") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="relative overflow-hidden rounded-3xl border border-yellow-200 bg-white p-8 shadow-2xl sm:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-transparent" />
            
            <div className="relative z-10 text-center">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-yellow-400 opacity-20" />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-xl">
                    <AlertCircle className="h-14 w-14 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              <h1 className="mb-3 font-satoshi text-4xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                  {status === "underpaid" ? "Payment Adjustment Required" : "Overpayment Received"}
                </span>
              </h1>
              <p className="mb-8 font-general-sans text-lg text-black/60">
                {status === "underpaid"
                  ? "The received amount is less than the order total. Our team will assist you."
                  : "You've paid more than required. We'll process a refund for the difference."}
              </p>

              {orderData && (
                <div className="mb-8 rounded-2xl border border-yellow-100 bg-gradient-to-br from-yellow-50 to-white p-8">
                  <p className="mb-2 font-satoshi text-sm uppercase tracking-wider text-yellow-600">
                    Order Reference
                  </p>
                  <p className="mb-4 font-satoshi text-3xl font-bold tracking-tight">
                    {orderData.order_number}
                  </p>
                  <div className="inline-flex rounded-full bg-yellow-100 px-4 py-2">
                    <p className="font-satoshi text-xs font-bold uppercase tracking-wider text-yellow-700">
                      {status === "underpaid" ? "Amount Mismatch" : "Refund Pending"}
                    </p>
                  </div>
                </div>
              )}

              <div className="mb-8 rounded-2xl border border-yellow-100 bg-yellow-50/50 p-6">
                <h3 className="mb-3 font-satoshi text-lg font-bold">What Happens Next?</h3>
                <div className="space-y-2 text-left font-general-sans text-sm text-black/70">
                  <p>• Our payment team has been automatically notified</p>
                  <p>• You'll receive an email within 24 hours with next steps</p>
                  <p>• {status === "underpaid" ? "You may need to complete the remaining payment" : "The excess amount will be refunded to your account"}</p>
                  <p>• Your order will be processed once resolved</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/contact">
                  <Button size="lg" className="gap-2 bg-gradient-to-r from-yellow-600 to-amber-600 px-8 font-satoshi font-semibold hover:from-yellow-700 hover:to-amber-700">
                    Contact Support Team
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/track">
                  <Button variant="outline" size="lg" className="gap-2 border-2 font-satoshi font-semibold">
                    Track Order Status
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render pending state (default)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white p-8 shadow-2xl sm:p-12">
          {/* Premium background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.03)_0%,transparent_50%)]" />
          <div className="absolute right-0 top-0 h-96 w-96 bg-gradient-to-br from-blue-50 to-transparent opacity-30 blur-3xl" />
          
          <div className="relative z-10">
            {/* Animated loader */}
            <div className="mb-12 flex justify-center">
              <div className="relative">
                {/* Pulsing rings */}
                <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-20" style={{ animationDuration: '2s' }} />
                <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-10" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
                
                {/* Main loader circle */}
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl">
                  <Loader2 className="h-16 w-16 animate-spin text-white" strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="mb-8 text-center">
              <h1 className="mb-3 font-satoshi text-4xl font-bold tracking-tight sm:text-5xl">
                Payment Processing
              </h1>
              <p className="mx-auto max-w-2xl font-general-sans text-lg text-black/60">
                Your secure bank transfer is being processed
              </p>
            </div>

            {/* Order details - Premium card */}
            {orderData && (
              <div className="mb-10 overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-slate-50 to-white shadow-xl">
                <div className="border-b border-black/5 bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-general-sans text-xs uppercase tracking-wider text-white/60">
                        Order Reference
                      </p>
                      <p className="mt-1 font-satoshi text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        {orderData.order_number}
                      </p>
                    </div>
                    <div className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                      <p className="font-satoshi text-xs font-bold uppercase tracking-wider text-white">
                        Pending
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="mb-2 font-general-sans text-xs uppercase tracking-wider text-black/50">
                        Order Total
                      </p>
                      <p className="font-satoshi text-4xl font-bold tracking-tight">
                        €{orderData.total.toLocaleString()}
                      </p>
                    </div>
                    {gatewayPaymentId && (
                      <div>
                        <p className="mb-2 font-general-sans text-xs uppercase tracking-wider text-black/50">
                          Transaction ID
                        </p>
                        <p className="font-mono text-sm text-black/70">
                          {gatewayPaymentId}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Status indicator */}
              <div className="mb-10 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-20" />
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
                      <Clock className="h-6 w-6 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-satoshi text-sm font-bold">Monitoring Transfer Status</p>
                  <p className="mt-0.5 font-general-sans text-xs text-black/60">
                    Checking status every 10 minutes • {checkCount} {checkCount === 1 ? "check" : "checks"} completed
                  </p>
                </div>
              </div>
            </div>            {/* Grid of info cards */}
            <div className="mb-10 grid gap-4 sm:grid-cols-3">
              <div className="group rounded-xl border border-black/10 bg-white/50 p-6 backdrop-blur-sm transition-all hover:border-black/20 hover:shadow-lg">
                <div className="mb-3 inline-flex rounded-full bg-black/5 p-3 transition-colors group-hover:bg-black/10">
                  <Lock className="h-5 w-5 text-black/70" />
                </div>
                <p className="mb-1 font-satoshi text-sm font-bold">Secure Transfer</p>
                <p className="font-general-sans text-xs text-black/60">
                  256-bit encryption
                </p>
              </div>
              
              <div className="group rounded-xl border border-black/10 bg-white/50 p-6 backdrop-blur-sm transition-all hover:border-black/20 hover:shadow-lg">
                <div className="mb-3 inline-flex rounded-full bg-black/5 p-3 transition-colors group-hover:bg-black/10">
                  <CheckCircle2 className="h-5 w-5 text-black/70" />
                </div>
                <p className="mb-1 font-satoshi text-sm font-bold">Processing Time</p>
                <p className="font-general-sans text-xs text-black/60">
                  1-3 business days
                </p>
              </div>
              
              <div className="group rounded-xl border border-black/10 bg-white/50 p-6 backdrop-blur-sm transition-all hover:border-black/20 hover:shadow-lg">
                <div className="mb-3 inline-flex rounded-full bg-black/5 p-3 transition-colors group-hover:bg-black/10">
                  <AlertCircle className="h-5 w-5 text-black/70" />
                </div>
                <p className="mb-1 font-satoshi text-sm font-bold">Keep This Open</p>
                <p className="font-general-sans text-xs text-black/60">
                  Don't close the window
                </p>
              </div>
            </div>

            {/* Help section */}
              <div className="rounded-2xl border border-black/10 bg-gradient-to-br from-slate-50 to-white p-8">
              <h3 className="mb-6 flex items-center gap-2 font-satoshi text-lg font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                  <AlertCircle className="h-4 w-4" />
                </div>
                What's Happening?
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black/5 font-satoshi text-xs font-bold">
                    1
                  </div>
                  <p className="font-general-sans text-sm text-black/70">
                    Your bank transfer has been initiated through Open Banking or SEPA
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black/5 font-satoshi text-xs font-bold">
                    2
                  </div>
                  <p className="font-general-sans text-sm text-black/70">
                    The transfer is being processed by your bank (1-3 business days)
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black/5 font-satoshi text-xs font-bold">
                    3
                  </div>
                  <p className="font-general-sans text-sm text-black/70">
                    We're automatically monitoring for the incoming payment
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black/5 font-satoshi text-xs font-bold">
                    4
                  </div>
                  <p className="font-general-sans text-sm text-black/70">
                    You'll receive a confirmation email once the payment is received
                  </p>
                </div>
              </div>
            </div>            {/* Action buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/track">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full gap-2 border-2 border-black/20 font-satoshi font-semibold hover:bg-black hover:text-white sm:w-auto"
                >
                  Track Order Status
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full gap-2 border-2 border-black/20 font-satoshi font-semibold hover:bg-black hover:text-white sm:w-auto"
                >
                  Contact Support
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 text-center">
          <p className="mb-4 font-general-sans text-xs uppercase tracking-wider text-black/40">
            Your Transaction is Protected By
          </p>
          <div className="flex items-center justify-center gap-8 opacity-40 grayscale">
            <div className="font-satoshi text-xl font-bold">SEPA</div>
            <div className="h-6 w-px bg-black/20" />
            <div className="font-satoshi text-xl font-bold">SSL</div>
            <div className="h-6 w-px bg-black/20" />
            <div className="font-satoshi text-xl font-bold">PCI DSS</div>
          </div>
        </div>
      </div>
    </div>
  );
}
