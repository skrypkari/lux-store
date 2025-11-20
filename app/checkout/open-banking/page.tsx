"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Building2, Shield, Lock, CheckCircle2 } from "lucide-react";

export default function OpenBankingPage() {
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

    // Automatically initiate payment when page loads
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
      // Create AmPay payment
      const response = await fetch(`https://api.lux-store.eu/orders/${orderId}/ampay-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create payment');
      }

      const data = await response.json();

      if (data.redirect_url) {
        // Redirect to AmPay payment page
        window.location.href = data.redirect_url;
      } else {
        throw new Error('No redirect URL received');
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Failed to process payment');
      setIsProcessing(false);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <Card className="border-red-200 bg-red-50 p-8">
          <div className="text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-red-900">Payment Error</h2>
            <p className="mb-6 text-red-700">{error}</p>
            <Button
              onClick={() => router.push(`/orders/pending?order=${orderId}`)}
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              Return to Order
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white p-8">
        <div className="text-center">
          {/* Loading Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-blue-400/50"></div>
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <Building2 className="h-10 w-10 text-white" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="mb-3 font-editorial text-3xl font-light text-black">
            Open Banking Payment
          </h2>

          {/* Status Message */}
          <div className="mb-8 space-y-2">
            <p className="font-satoshi text-lg font-medium text-blue-900">
              Redirecting to secure payment...
            </p>
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              <p className="font-general-sans text-sm text-blue-700">
                Please wait while we prepare your payment
              </p>
            </div>
          </div>

          {/* Security Features */}
          <div className="mb-6 rounded-xl border border-blue-100 bg-white/50 p-6">
            <div className="mb-4 flex items-center justify-center gap-2 text-blue-900">
              <Lock className="h-5 w-5" />
              <span className="font-satoshi text-sm font-semibold">
                Secure Payment Processing
              </span>
            </div>
            
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <div>
                  <p className="font-general-sans text-sm font-medium text-black">
                    Bank-Level Security
                  </p>
                  <p className="font-general-sans text-xs text-black/60">
                    Your payment is protected by advanced encryption
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <div>
                  <p className="font-general-sans text-sm font-medium text-black">
                    Direct Bank Transfer
                  </p>
                  <p className="font-general-sans text-xs text-black/60">
                    Pay directly from your bank account
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <div>
                  <p className="font-general-sans text-sm font-medium text-black">
                    Instant Confirmation
                  </p>
                  <p className="font-general-sans text-xs text-black/60">
                    Your order will be confirmed immediately
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Info */}
          {orderId && (
            <p className="font-general-sans text-xs text-black/50">
              Order ID: <span className="font-mono font-medium">{orderId}</span>
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
