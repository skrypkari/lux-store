"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Lock, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function PaymentPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  // Fetch order data on mount
  useEffect(() => {
    if (!orderId) {
      router.push("/checkout");
      return;
    }

    // Fetch order by ID
    fetch(`https://api.lux-store.eu/orders/${orderId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Order not found");
        return res.json();
      })
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch order:", err);
        setError("Order not found");
        setLoading(false);
      });
  }, [orderId, router]);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(" ").slice(0, 19); // 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  // Detect card type based on card number
  const getCardType = (cardNumber: string): string => {
    const cleaned = cardNumber.replace(/\s/g, "");
    
    // Visa: starts with 4
    if (/^4/.test(cleaned)) {
      return "visa";
    }
    
    // Mastercard: starts with 51-55 or 2221-2720
    if (/^5[1-5]/.test(cleaned) || /^2(22[1-9]|2[3-9][0-9]|[3-6][0-9]{2}|7[0-1][0-9]|720)/.test(cleaned)) {
      return "mastercard";
    }
    
    // Amex: starts with 34 or 37
    if (/^3[47]/.test(cleaned)) {
      return "amex";
    }
    
    return "generic";
  };

  // Luhn Algorithm for card validation (Visa, Mastercard, Amex, etc.)
  const validateCardNumber = (cardNumber: string): boolean => {
    const cleaned = cardNumber.replace(/\s/g, "");
    
    // Check if it contains only digits
    if (!/^\d+$/.test(cleaned)) {
      return false;
    }

    // Check length (13-19 digits for most cards)
    if (cleaned.length < 13 || cleaned.length > 19) {
      return false;
    }

    // Luhn Algorithm
    let sum = 0;
    let isEven = false;

    // Loop through values starting from the rightmost digit
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned.charAt(i), 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  // Validate cardholder name
  const validateCardholderName = (name: string): boolean => {
    // Must contain at least 2 characters and only letters and spaces
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      return false;
    }
    // Allow letters, spaces, hyphens, and apostrophes
    return /^[a-zA-Z\s\-']+$/.test(trimmed);
  };

  // Validate expiry date
  const validateExpiryDate = (expiryDate: string): boolean => {
    if (expiryDate.length !== 5) {
      return false;
    }

    const [month, year] = expiryDate.split("/");
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt("20" + year, 10);

    // Check valid month
    if (monthNum < 1 || monthNum > 12) {
      return false;
    }

    // Check if card is expired
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (yearNum < currentYear) {
      return false;
    }

    if (yearNum === currentYear && monthNum < currentMonth) {
      return false;
    }

    return true;
  };

  // Validate CVV
  const validateCVV = (cvv: string): boolean => {
    // CVV should be 3 or 4 digits
    return /^\d{3,4}$/.test(cvv);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate all fields
    if (!validateCardNumber(cardData.cardNumber)) {
      setError("Invalid card number. Please check and try again.");
      return;
    }

    if (!validateCardholderName(cardData.cardName)) {
      setError("Invalid cardholder name. Must contain at least 2 letters.");
      return;
    }

    if (!validateExpiryDate(cardData.expiryDate)) {
      setError("Invalid or expired date. Please check expiry date.");
      return;
    }

    if (!validateCVV(cardData.cvv)) {
      setError("Invalid CVV. Must be 3 or 4 digits.");
      return;
    }

    setIsProcessing(true);

    // Check if card is the success card (4242 4242 4242 4242)
    const cleanCardNumber = cardData.cardNumber.replace(/\s/g, "");
    const isSuccessCard = cleanCardNumber === "4242424242424242";

    // Process payment for existing order
    try {
      // If success card, update order status to Payment Confirmed
      if (isSuccessCard) {
        await fetch(`https://api.lux-store.eu/orders/${order.id}/status`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Payment Confirmed",
            location: order.shipping_city + ", " + order.shipping_country,
          }),
        });
      }

      // Simulate processing delay of 3-5 seconds
      const delay = 3000 + Math.random() * 2000;

      setTimeout(() => {
        setIsProcessing(false);
        
        if (isSuccessCard) {
          // Success! Clear cart and redirect to success page
          localStorage.removeItem("checkoutShipping");
          localStorage.removeItem("checkoutCart");
          router.push(`/checkout/success?orderId=${order.id}&token=${order.access_token}`);
        } else {
          // Payment failed
          router.push("/checkout/failed");
        }
      }, delay);
    } catch (error) {
      console.error("Failed to process payment:", error);
      setIsProcessing(false);
      setError("Failed to process payment. Please try again.");
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-12">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-black" />
              <p className="font-general-sans text-black/60">Loading payment details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-12">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-600" />
            <h1 className="mb-4 font-satoshi text-3xl font-bold">Order Not Found</h1>
            <p className="mb-8 font-general-sans text-black/60">{error || "Unable to load order details"}</p>
            <Button onClick={() => router.push("/checkout")}>Return to Checkout</Button>
          </div>
        </div>
      </div>
    );
  }

  // If payment method is plisio (crypto), user should be on crypto-select page
  if (order.payment_method === "plisio") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-12">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="text-center">
            <p className="mb-4 font-general-sans text-black/60">Redirecting to cryptocurrency selection...</p>
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-black" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-12">
      <div className="container mx-auto max-w-2xl px-4">
        {/* Card Payment Form - Show when payment method is creditcard */}
        {order.payment_method === "creditcard" && (
          <>
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-black p-4 shadow-2xl">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="mb-2 font-satoshi text-4xl font-bold">Payment Details</h1>
              <p className="font-general-sans text-black/60">
                Order #{order.id} - €{order.total.toFixed(2)}
              </p>
            </div>

        {/* Security Badge */}
        <div className="mb-8 flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-50 px-6 py-4">
          <Lock className="h-5 w-5 text-emerald-600" />
          <p className="font-general-sans text-sm text-emerald-900">
            <span className="font-bold">Your payment is secure</span> — 256-bit SSL encryption
            protects your data
          </p>
        </div>

        {/* Payment Form */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-2xl sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Card Number */}
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="font-satoshi font-semibold">
                Card Number *
              </Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  type="text"
                  required
                  placeholder="1234 5678 9012 3456"
                  value={cardData.cardNumber}
                  onChange={(e) =>
                    setCardData({
                      ...cardData,
                      cardNumber: formatCardNumber(e.target.value),
                    })
                  }
                  maxLength={19}
                  className={`h-14 border-black/20 pr-16 font-general-sans text-lg tracking-wide ${
                    cardData.cardNumber.replace(/\s/g, "").length >= 13 &&
                    !validateCardNumber(cardData.cardNumber)
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
                {(() => {
                  const cardType = getCardType(cardData.cardNumber);
                  if (cardType === "visa") {
                    return (
                      <Image
                        src="/visal.png"
                        alt="Visa"
                        width={40}
                        height={25}
                        className="absolute right-3 top-1/2 -translate-y-1/2 object-contain"
                      />
                    );
                  } else if (cardType === "mastercard") {
                    return (
                      <Image
                        src="/mcl.png"
                        alt="Mastercard"
                        width={40}
                        height={25}
                        className="absolute right-3 top-1/2 -translate-y-1/2 object-contain"
                      />
                    );
                  } else if (cardType === "amex") {
                    return (
                      <Image
                        src="/amex.png"
                        alt="Amex"
                        width={40}
                        height={25}
                        className="absolute right-3 top-1/2 -translate-y-1/2 object-contain"
                      />
                    );
                  } else {
                    return (
                      <CreditCard className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 text-black/40" />
                    );
                  }
                })()}
              </div>
              {cardData.cardNumber.replace(/\s/g, "").length >= 13 &&
                !validateCardNumber(cardData.cardNumber) && (
                  <p className="font-general-sans text-xs text-red-600">
                    Invalid card number
                  </p>
                )}
            </div>

            {/* Cardholder Name */}
            <div className="space-y-2">
              <Label htmlFor="cardName" className="font-satoshi font-semibold">
                Cardholder Name *
              </Label>
              <Input
                id="cardName"
                type="text"
                required
                placeholder="John Doe"
                value={cardData.cardName}
                onChange={(e) =>
                  setCardData({
                    ...cardData,
                    cardName: e.target.value.toUpperCase(),
                  })
                }
                className={`h-14 border-black/20 font-general-sans text-lg uppercase ${
                  cardData.cardName.length >= 2 && !validateCardholderName(cardData.cardName)
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
              {cardData.cardName.length >= 2 && !validateCardholderName(cardData.cardName) && (
                <p className="font-general-sans text-xs text-red-600">
                  Name must contain only letters
                </p>
              )}
            </div>

            {/* Expiry and CVV */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="expiryDate" className="font-satoshi font-semibold">
                  Expiry Date *
                </Label>
                <Input
                  id="expiryDate"
                  type="text"
                  required
                  placeholder="MM/YY"
                  value={cardData.expiryDate}
                  onChange={(e) =>
                    setCardData({
                      ...cardData,
                      expiryDate: formatExpiryDate(e.target.value),
                    })
                  }
                  maxLength={5}
                  className={`h-14 border-black/20 font-general-sans text-lg ${
                    cardData.expiryDate.length === 5 && !validateExpiryDate(cardData.expiryDate)
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
                {cardData.expiryDate.length === 5 && !validateExpiryDate(cardData.expiryDate) && (
                  <p className="font-general-sans text-xs text-red-600">
                    Invalid or expired date
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv" className="font-satoshi font-semibold">
                  CVV *
                </Label>
                <Input
                  id="cvv"
                  type="text"
                  required
                  placeholder="123"
                  value={cardData.cvv}
                  onChange={(e) =>
                    setCardData({
                      ...cardData,
                      cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                    })
                  }
                  maxLength={4}
                  className={`h-14 border-black/20 font-general-sans text-lg ${
                    cardData.cvv.length >= 3 && !validateCVV(cardData.cvv)
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
                {cardData.cvv.length >= 3 && !validateCVV(cardData.cvv) && (
                  <p className="font-general-sans text-xs text-red-600">
                    CVV must be 3-4 digits
                  </p>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-50 px-4 py-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="font-general-sans text-sm text-red-900">{error}</p>
              </div>
            )}


            {/* Terms */}
            <div className="rounded-xl border border-black/10 bg-gradient-to-r from-black/5 to-transparent p-4">
              <p className="font-general-sans text-xs text-black/60">
                By completing this purchase, you agree to our{" "}
                <Link href="/terms" className="font-bold text-black underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="font-bold text-black underline">
                  Privacy Policy
                </Link>
                . Your payment information is encrypted and secure.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Link href="/checkout" className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full gap-2 border-2"
                  disabled={isProcessing}
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back
                </Button>
              </Link>
              <Button
                type="submit"
                size="lg"
                className="flex-1 gap-2 bg-black hover:bg-black/90"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    Pay Securely
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Security Features */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="text-center">
            <div className="mb-2 flex justify-center">
              <div className="rounded-full bg-black/5 p-3">
                <Lock className="h-5 w-5 text-black/60" />
              </div>
            </div>
            <p className="font-satoshi text-sm font-bold">SSL Secured</p>
            <p className="font-general-sans text-xs text-black/60">256-bit encryption</p>
          </div>
          <div className="text-center">
            <div className="mb-2 flex justify-center">
              <div className="rounded-full bg-black/5 p-3">
                <svg
                  className="h-5 w-5 text-black/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
            </div>
            <p className="font-satoshi text-sm font-bold">PCI Compliant</p>
            <p className="font-general-sans text-xs text-black/60">Industry standard</p>
          </div>
          <div className="text-center">
            <div className="mb-2 flex justify-center">
              <div className="rounded-full bg-black/5 p-3">
                <svg
                  className="h-5 w-5 text-black/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
            <p className="font-satoshi text-sm font-bold">Data Protected</p>
            <p className="font-general-sans text-xs text-black/60">Never stored</p>
          </div>
        </div>

        {/* Payment Security Badge */}
        <div className="mt-8 flex justify-center">
          <Image
            src="/mpc_logo_2.png"
            alt="Payment Security"
            width={600}
            height={150}
            className="h-auto max-w-[300px] w-full object-contain"
          />
        </div>
          </>
        )}
      </div>
    </div>
  );
}

// Suspense wrapper required for useSearchParams()
export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-12">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="flex min-h-[400px] items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-black" />
          </div>
        </div>
      </div>
    }>
      <PaymentPageContent />
    </Suspense>
  );
}
