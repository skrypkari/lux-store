"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard, Bitcoin, ArrowRight, Shield } from "lucide-react";

export default function PaymentMethodPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    // Verify we have checkout data
    const shippingData = localStorage.getItem("checkoutShipping");
    const cartData = localStorage.getItem("checkoutCart");

    if (!shippingData || !cartData) {
      router.push("/checkout");
      return;
    }

    // Generate or get order ID
    const cart = JSON.parse(cartData);
    // Order ID will be created on backend, for now just check cart exists
  }, [router]);

  const handleCardPayment = () => {
    localStorage.setItem("checkoutPaymentMethod", "Credit Card");
    router.push("/checkout/payment");
  };

  const handleCryptoPayment = async () => {
    // First create the order, then redirect to crypto selection
    try {
      const shippingData = JSON.parse(localStorage.getItem("checkoutShipping") || "{}");
      const cartData = JSON.parse(localStorage.getItem("checkoutCart") || "{}");
      const geoData = JSON.parse(localStorage.getItem("geoData") || "{}");

      const orderData = {
        customerEmail: shippingData.email,
        customerFirstName: shippingData.firstName,
        customerLastName: shippingData.lastName,
        customerPhone: shippingData.phone,
        shippingCountry: shippingData.country,
        shippingState: shippingData.state,
        shippingCity: shippingData.city,
        shippingAddress1: shippingData.address1,
        shippingAddress2: shippingData.address2,
        shippingPostalCode: shippingData.postalCode,
        subtotal: cartData.subtotal,
        discount: 0,
        shipping: 0,
        total: cartData.total,
        paymentMethod: "Cryptocurrency",
        ipAddress: geoData.ip,
        geoCountry: geoData.country,
        geoCity: geoData.city,
        geoRegion: geoData.region,
        items: cartData.items.map((item: any) => ({
          productId: item.id,
          productName: item.name,
          productSlug: item.slug,
          productImage: item.image,
          brand: item.brand,
          price: item.price,
          quantity: item.quantity,
          options: item.options,
        })),
      };

      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const result = await response.json();
      const orderId = result.id;

      // Redirect to crypto selection
      router.push(`/checkout/crypto-select?orderId=${orderId}`);
    } catch (error) {
      console.error("Failed to create order:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process order. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-20">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-black p-4 shadow-2xl">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="mb-3 font-satoshi text-5xl font-bold">Choose Payment Method</h1>
          <p className="font-general-sans text-lg text-black/60">
            Select your preferred way to pay securely
          </p>
        </div>

        {/* Payment Methods */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card Payment */}
          <button
            onClick={handleCardPayment}
            className="group relative overflow-hidden rounded-3xl border-2 border-black/10 bg-white p-8 text-left shadow-xl transition-all duration-300 hover:border-black hover:shadow-2xl hover:scale-[1.02]"
          >
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-black to-black/80 shadow-lg">
              <CreditCard className="h-8 w-8 text-white" />
            </div>

            <h2 className="mb-3 font-satoshi text-2xl font-bold">Credit / Debit Card</h2>
            <p className="mb-6 font-general-sans text-black/60">
              Pay securely with Visa, Mastercard, or American Express
            </p>

            <div className="flex items-center gap-4">
              <img src="/visal.png" alt="Visa" className="h-8" />
              <img src="/mcl.png" alt="Mastercard" className="h-8" />
              <img src="/amex.png" alt="Amex" className="h-8" />
            </div>

            <div className="mt-6 flex items-center gap-2 font-general-sans text-sm font-semibold text-black">
              Continue with Card
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
          </button>

          {/* Crypto Payment */}
          <button
            onClick={handleCryptoPayment}
            className="group relative overflow-hidden rounded-3xl border-2 border-black/10 bg-gradient-to-br from-orange-500 to-yellow-500 p-8 text-left shadow-xl transition-all duration-300 hover:border-orange-600 hover:shadow-2xl hover:scale-[1.02]"
          >
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm">
              <Bitcoin className="h-8 w-8 text-white" />
            </div>

            <h2 className="mb-3 font-satoshi text-2xl font-bold text-white">Cryptocurrency</h2>
            <p className="mb-6 font-general-sans text-white/90">
              Pay with Bitcoin, Ethereum, USDT and 10+ more cryptocurrencies
            </p>

            <div className="mb-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/20 px-3 py-1 font-mono text-xs font-bold text-white backdrop-blur-sm">
                BTC
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 font-mono text-xs font-bold text-white backdrop-blur-sm">
                ETH
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 font-mono text-xs font-bold text-white backdrop-blur-sm">
                USDT
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 font-mono text-xs font-bold text-white backdrop-blur-sm">
                +10
              </span>
            </div>

            <div className="flex items-center gap-2 font-general-sans text-sm font-semibold text-white">
              Continue with Crypto
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
          </button>
        </div>

        {/* Security Info */}
        <div className="mt-10 rounded-2xl border border-black/10 bg-white p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <Shield className="h-6 w-6 flex-shrink-0 text-emerald-600" />
            <div>
              <h3 className="mb-2 font-satoshi text-lg font-bold">Secure Payment</h3>
              <p className="font-general-sans text-sm leading-relaxed text-black/70">
                All transactions are encrypted with 256-bit SSL security. Your payment information is never stored on our servers. Card payments are processed securely, and cryptocurrency payments are handled via Plisio gateway.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
