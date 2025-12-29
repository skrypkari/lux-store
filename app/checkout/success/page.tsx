"use client";

declare global {
  interface Window {
    dataLayer?: any[];
    __purchaseFired?: boolean;
  }
}

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, Mail, Truck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";

function SuccessPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [orderData, setOrderData] = useState<any>(null);
  const { clearCart } = useCart();

  useEffect(() => {
    const id = searchParams.get("orderId");
    const token = searchParams.get("token");

    if (id && token) {
      setOrderId(id);
      setAccessToken(token);

      fetch(`https://api.lux-store.eu/orders/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setOrderData(data);
        })
        .catch((error) => {
          console.error("Failed to fetch order details:", error);
        });

      clearCart();
    } else {
      router.push("/");
    }
  }, [searchParams, router, clearCart]);

  useEffect(() => {
    if (typeof window !== "undefined" && orderData && orderId && !window.__purchaseFired) {
      window.__purchaseFired = true;
      
      try {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'purchase',
          ecommerce: {
            transaction_id: orderId,
            value: orderData.total || 0,
            currency: 'EUR',
            shipping: orderData.shipping || 0,
            tax: 0,
            coupon: orderData.promo_code || undefined,
            items: (orderData.items || []).map((item: any) => ({
              item_id: item.sku || String(item.product_id),
              item_name: item.product_name,
              item_brand: item.brand || undefined,
              item_category: undefined,
              price: Number(item.price),
              quantity: Number(item.quantity)
            }))
          }
        });
        console.log("Purchase event sent to GTM");
      } catch (error) {
        console.error("Failed to send purchase event:", error);
      }
    }
  }, [orderData, orderId]);

  if (!orderId || !accessToken) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-green-500/20 blur-3xl" />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-green-500/20 bg-gradient-to-br from-green-50 to-green-100 shadow-2xl">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              </div>
            </div>
          </div>

          <h1 className="mb-8 font-satoshi text-5xl font-bold text-black">
            Payment Success
          </h1>

          <div className="mb-10 rounded-2xl border border-black/10 bg-white p-10 shadow-xl">
            <p className="font-general-sans text-lg leading-relaxed text-black/80">
              Thank you for your purchase with <span className="font-semibold">LUX STORE</span>.
            </p>
            <p className="mt-6 font-general-sans text-lg leading-relaxed text-black/80">
              Your payment has been successfully received, and your order is now being carefully prepared with the utmost attention. Our team is overseeing every detail to ensure a seamless and refined delivery experience.
            </p>
            <p className="mt-6 font-general-sans text-lg leading-relaxed text-black/80">
              You will receive a confirmation email shortly with all relevant order details. Should you require any assistance at any stage, our Concierge Service remains at your full disposal.
            </p>
            <p className="mt-6 font-general-sans text-lg leading-relaxed text-black/80">
              We sincerely appreciate your trust and look forward to delivering an exceptional experience.
            </p>
          </div>

          <Button
            size="lg"
            className="gap-2 bg-black px-10 py-6 text-base font-bold shadow-xl hover:bg-black/90"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/orders/${orderId}?token=${accessToken}`;
            }}
          >
            View Your Order
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="font-general-sans text-black/60">Loading...</p>
          </div>
        </div>
      }
    >
      <SuccessPageContent />
    </Suspense>
  );
}
