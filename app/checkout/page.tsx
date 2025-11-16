"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, CreditCard, Lock, ShoppingBag, Truck, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Countries list excluding OFAC sanctioned countries
const ALLOWED_COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "NL", name: "Netherlands" },
  { code: "BE", name: "Belgium" },
  { code: "CH", name: "Switzerland" },
  { code: "AT", name: "Austria" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" },
  { code: "FI", name: "Finland" },
  { code: "IE", name: "Ireland" },
  { code: "PT", name: "Portugal" },
  { code: "GR", name: "Greece" },
  { code: "PL", name: "Poland" },
  { code: "CZ", name: "Czech Republic" },
  { code: "HU", name: "Hungary" },
  { code: "RO", name: "Romania" },
  { code: "BG", name: "Bulgaria" },
  { code: "HR", name: "Croatia" },
  { code: "SI", name: "Slovenia" },
  { code: "SK", name: "Slovakia" },
  { code: "EE", name: "Estonia" },
  { code: "LV", name: "Latvia" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MT", name: "Malta" },
  { code: "CY", name: "Cyprus" },
  { code: "IS", name: "Iceland" },
  { code: "NZ", name: "New Zealand" },
  { code: "SG", name: "Singapore" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "HK", name: "Hong Kong" },
  { code: "TW", name: "Taiwan" },
  { code: "MY", name: "Malaysia" },
  { code: "TH", name: "Thailand" },
  { code: "PH", name: "Philippines" },
  { code: "ID", name: "Indonesia" },
  { code: "VN", name: "Vietnam" },
  { code: "IN", name: "India" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "QA", name: "Qatar" },
  { code: "KW", name: "Kuwait" },
  { code: "OM", name: "Oman" },
  { code: "BH", name: "Bahrain" },
  { code: "IL", name: "Israel" },
  { code: "TR", name: "Turkey" },
  { code: "ZA", name: "South Africa" },
  { code: "EG", name: "Egypt" },
  { code: "MA", name: "Morocco" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "AR", name: "Argentina" },
  { code: "CL", name: "Chile" },
  { code: "CO", name: "Colombia" },
  { code: "PE", name: "Peru" },
  { code: "UY", name: "Uruguay" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [isProcessing, setIsProcessing] = useState(false);

  // Shipping form data
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  // Payment data
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const subtotal = cartTotal;
  const shipping = 0; // Free shipping
  const total = subtotal;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-20">
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-black/5 p-8">
              <ShoppingBag className="h-16 w-16 text-black/40" />
            </div>
          </div>
          <h1 className="mb-4 font-satoshi text-3xl font-bold">Your cart is empty</h1>
          <p className="mb-8 font-general-sans text-black/60">
            Add items to your cart before proceeding to checkout
          </p>
          <Link href="/store/all">
            <Button size="lg" className="gap-2">
              Continue Shopping
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save shipping data to localStorage
    localStorage.setItem("checkoutShipping", JSON.stringify(shippingData));
    localStorage.setItem("checkoutCart", JSON.stringify({
      items: cartItems,
      subtotal,
      total,
    }));
    setCurrentStep(2);
  };

  const handlePaymentSubmit = async () => {
    if (paymentMethod === "credit_card") {
      // Save payment method
      localStorage.setItem("checkoutPaymentMethod", paymentMethod);
      // Redirect to credit card payment page
      router.push("/checkout/payment");
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-12 flex items-center justify-center">
      {/* Step 1 */}
      <div className="flex items-center">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full transition-all ${
            currentStep >= 1
              ? "bg-black text-white shadow-lg"
              : "border-2 border-black/20 bg-white text-black/40"
          }`}
        >
          {currentStep > 1 ? <Check className="h-6 w-6" /> : <Truck className="h-6 w-6" />}
        </div>
        <div className="ml-3 hidden sm:block">
          <p className="font-satoshi text-sm font-bold">Shipping</p>
          <p className="font-general-sans text-xs text-black/50">Delivery address</p>
        </div>
      </div>

      {/* Line */}
      <div
        className={`mx-4 h-0.5 w-16 transition-all sm:w-24 ${
          currentStep >= 2 ? "bg-black" : "bg-black/20"
        }`}
      />

      {/* Step 2 */}
      <div className="flex items-center">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full transition-all ${
            currentStep >= 2
              ? "bg-black text-white shadow-lg"
              : "border-2 border-black/20 bg-white text-black/40"
          }`}
        >
          {currentStep > 2 ? <Check className="h-6 w-6" /> : <CreditCard className="h-6 w-6" />}
        </div>
        <div className="ml-3 hidden sm:block">
          <p className="font-satoshi text-sm font-bold">Payment</p>
          <p className="font-general-sans text-xs text-black/50">Payment method</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-12">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-satoshi text-4xl font-bold">Secure Checkout</h1>
          <p className="font-general-sans text-black/60">Complete your luxury purchase</p>
        </div>

        {renderStepIndicator()}

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-full bg-black p-3">
                    <Truck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-satoshi text-2xl font-bold">Shipping Information</h2>
                    <p className="font-general-sans text-sm text-black/60">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="font-satoshi font-semibold">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        required
                        value={shippingData.firstName}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, firstName: e.target.value })
                        }
                        className="h-12 border-black/20 font-general-sans"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="font-satoshi font-semibold">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        required
                        value={shippingData.lastName}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, lastName: e.target.value })
                        }
                        className="h-12 border-black/20 font-general-sans"
                      />
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-satoshi font-semibold">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={shippingData.email}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, email: e.target.value })
                        }
                        className="h-12 border-black/20 font-general-sans"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-satoshi font-semibold">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={shippingData.phone}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, phone: e.target.value })
                        }
                        className="h-12 border-black/20 font-general-sans"
                      />
                    </div>
                  </div>

                  {/* Address Fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address1" className="font-satoshi font-semibold">
                        Address Line 1 *
                      </Label>
                      <Input
                        id="address1"
                        required
                        value={shippingData.address1}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, address1: e.target.value })
                        }
                        className="h-12 border-black/20 font-general-sans"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address2" className="font-satoshi font-semibold">
                        Address Line 2
                      </Label>
                      <Input
                        id="address2"
                        value={shippingData.address2}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, address2: e.target.value })
                        }
                        className="h-12 border-black/20 font-general-sans"
                      />
                    </div>
                  </div>

                  {/* City, State, Postal Code */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="font-satoshi font-semibold">
                        City *
                      </Label>
                      <Input
                        id="city"
                        required
                        value={shippingData.city}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, city: e.target.value })
                        }
                        className="h-12 border-black/20 font-general-sans"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="font-satoshi font-semibold">
                        State/Province
                      </Label>
                      <Input
                        id="state"
                        value={shippingData.state}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, state: e.target.value })
                        }
                        className="h-12 border-black/20 font-general-sans"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="font-satoshi font-semibold">
                        Postal Code *
                      </Label>
                      <Input
                        id="postalCode"
                        required
                        value={shippingData.postalCode}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, postalCode: e.target.value })
                        }
                        className="h-12 border-black/20 font-general-sans"
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <Label htmlFor="country" className="font-satoshi font-semibold">
                      Country *
                    </Label>
                    <Select
                      value={shippingData.country}
                      onValueChange={(value) =>
                        setShippingData({ ...shippingData, country: value })
                      }
                      required
                    >
                      <SelectTrigger className="!h-12 w-full border-black/20 font-general-sans">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {ALLOWED_COUNTRIES.map((country) => (
                          <SelectItem key={country.code} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 pt-4">
                    <Link href="/cart" className="flex-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="w-full gap-2 border-2"
                      >
                        <ArrowLeft className="h-5 w-5" />
                        Back to Cart
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      size="lg"
                      className="flex-1 gap-2 bg-black hover:bg-black/90"
                    >
                      Continue to Payment
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-full bg-black p-3">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-satoshi text-2xl font-bold">Payment Method</h2>
                    <p className="font-general-sans text-sm text-black/60">
                      Select your preferred payment option
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Credit Card Option */}
                  <div
                    className={`cursor-pointer rounded-xl border-2 p-6 transition-all ${
                      paymentMethod === "credit_card"
                        ? "border-black bg-black/5"
                        : "border-black/20 hover:border-black/40"
                    }`}
                    onClick={() => setPaymentMethod("credit_card")}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                          paymentMethod === "credit_card"
                            ? "border-black bg-black"
                            : "border-black/40"
                        }`}
                      >
                        {paymentMethod === "credit_card" && (
                          <div className="h-3 w-3 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-satoshi font-bold">Credit / Debit Card</p>
                        <p className="font-general-sans text-sm text-black/60">
                          Visa, Mastercard, Amex
                        </p>
                      </div>
                      <CreditCard className="h-8 w-8 text-black/40" />
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 flex items-center gap-2 rounded-xl border border-black/10 bg-gradient-to-r from-black/5 to-transparent p-4">
                  <Lock className="h-5 w-5 text-black/60" />
                  <p className="font-general-sans text-sm text-black/70">
                    <span className="font-bold">Secure 256-bit encryption</span> — Your payment
                    information is fully protected
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-8 flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="flex-1 gap-2 border-2"
                    onClick={() => setCurrentStep(1)}
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Back
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 gap-2 bg-black hover:bg-black/90"
                    onClick={handlePaymentSubmit}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Continue to Payment"}
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl">
                <h3 className="mb-6 font-satoshi text-xl font-bold">Order Summary</h3>

                {/* Items */}
                <div className="mb-6 max-h-64 space-y-4 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-black/10">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-satoshi text-sm font-bold leading-tight line-clamp-1">
                          {item.name}
                        </p>
                        <p className="font-general-sans text-xs text-black/60">{item.brand}</p>
                        <p className="font-satoshi text-sm font-bold">
                          €{item.price.toLocaleString()} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Totals */}
                <div className="space-y-3">
                  <div className="flex justify-between font-general-sans text-base">
                    <span className="text-black/70">Subtotal (excl. VAT)</span>
                    <span className="font-bold">€{(subtotal / 1.2).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-general-sans text-base">
                    <span className="text-black/70">VAT (20%)</span>
                    <span className="font-bold">€{(subtotal - subtotal / 1.2).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-general-sans text-base">
                    <span className="text-black/70">Shipping</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="rounded-xl bg-black/5 p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="font-satoshi text-lg font-bold">Total</span>
                    <div className="text-right">
                      <span className="font-satoshi text-3xl font-bold tracking-tight">
                        €{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3 rounded-2xl border border-black/10 bg-white p-6 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-black p-2">
                    <Truck className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-satoshi text-sm font-bold">Free Express Shipping</p>
                    <p className="font-general-sans text-xs text-black/60">20-35 days delivery</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-black p-2">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-satoshi text-sm font-bold">Secure Payment</p>
                    <p className="font-general-sans text-xs text-black/60">256-bit encryption</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
