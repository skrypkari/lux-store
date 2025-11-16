"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, CreditCard, Lock, ShoppingBag, Truck, Check, RotateCcw, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Countries list with phone codes, excluding OFAC sanctioned countries (sorted alphabetically)
const ALLOWED_COUNTRIES = [
  { code: "AR", name: "Argentina", phoneCode: "+54" },
  { code: "AU", name: "Australia", phoneCode: "+61" },
  { code: "AT", name: "Austria", phoneCode: "+43" },
  { code: "BH", name: "Bahrain", phoneCode: "+973" },
  { code: "BE", name: "Belgium", phoneCode: "+32" },
  { code: "BR", name: "Brazil", phoneCode: "+55" },
  { code: "BG", name: "Bulgaria", phoneCode: "+359" },
  { code: "CA", name: "Canada", phoneCode: "+1" },
  { code: "CL", name: "Chile", phoneCode: "+56" },
  { code: "CO", name: "Colombia", phoneCode: "+57" },
  { code: "HR", name: "Croatia", phoneCode: "+385" },
  { code: "CY", name: "Cyprus", phoneCode: "+357" },
  { code: "CZ", name: "Czech Republic", phoneCode: "+420" },
  { code: "DK", name: "Denmark", phoneCode: "+45" },
  { code: "EG", name: "Egypt", phoneCode: "+20" },
  { code: "EE", name: "Estonia", phoneCode: "+372" },
  { code: "FI", name: "Finland", phoneCode: "+358" },
  { code: "FR", name: "France", phoneCode: "+33" },
  { code: "DE", name: "Germany", phoneCode: "+49" },
  { code: "GR", name: "Greece", phoneCode: "+30" },
  { code: "HK", name: "Hong Kong", phoneCode: "+852" },
  { code: "HU", name: "Hungary", phoneCode: "+36" },
  { code: "IS", name: "Iceland", phoneCode: "+354" },
  { code: "IN", name: "India", phoneCode: "+91" },
  { code: "ID", name: "Indonesia", phoneCode: "+62" },
  { code: "IE", name: "Ireland", phoneCode: "+353" },
  { code: "IL", name: "Israel", phoneCode: "+972" },
  { code: "IT", name: "Italy", phoneCode: "+39" },
  { code: "JP", name: "Japan", phoneCode: "+81" },
  { code: "KR", name: "South Korea", phoneCode: "+82" },
  { code: "KW", name: "Kuwait", phoneCode: "+965" },
  { code: "LV", name: "Latvia", phoneCode: "+371" },
  { code: "LT", name: "Lithuania", phoneCode: "+370" },
  { code: "LU", name: "Luxembourg", phoneCode: "+352" },
  { code: "MY", name: "Malaysia", phoneCode: "+60" },
  { code: "MT", name: "Malta", phoneCode: "+356" },
  { code: "MX", name: "Mexico", phoneCode: "+52" },
  { code: "MA", name: "Morocco", phoneCode: "+212" },
  { code: "NL", name: "Netherlands", phoneCode: "+31" },
  { code: "NZ", name: "New Zealand", phoneCode: "+64" },
  { code: "NO", name: "Norway", phoneCode: "+47" },
  { code: "OM", name: "Oman", phoneCode: "+968" },
  { code: "PE", name: "Peru", phoneCode: "+51" },
  { code: "PH", name: "Philippines", phoneCode: "+63" },
  { code: "PL", name: "Poland", phoneCode: "+48" },
  { code: "PT", name: "Portugal", phoneCode: "+351" },
  { code: "QA", name: "Qatar", phoneCode: "+974" },
  { code: "RO", name: "Romania", phoneCode: "+40" },
  { code: "SA", name: "Saudi Arabia", phoneCode: "+966" },
  { code: "SG", name: "Singapore", phoneCode: "+65" },
  { code: "SK", name: "Slovakia", phoneCode: "+421" },
  { code: "SI", name: "Slovenia", phoneCode: "+386" },
  { code: "ZA", name: "South Africa", phoneCode: "+27" },
  { code: "ES", name: "Spain", phoneCode: "+34" },
  { code: "SE", name: "Sweden", phoneCode: "+46" },
  { code: "CH", name: "Switzerland", phoneCode: "+41" },
  { code: "TW", name: "Taiwan", phoneCode: "+886" },
  { code: "TH", name: "Thailand", phoneCode: "+66" },
  { code: "TR", name: "Turkey", phoneCode: "+90" },
  { code: "AE", name: "United Arab Emirates", phoneCode: "+971" },
  { code: "GB", name: "United Kingdom", phoneCode: "+44" },
  { code: "US", name: "United States", phoneCode: "+1" },
  { code: "UY", name: "Uruguay", phoneCode: "+598" },
  { code: "VN", name: "Vietnam", phoneCode: "+84" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [isProcessing, setIsProcessing] = useState(false);
  const [phoneCode, setPhoneCode] = useState("+1");

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

  // Fetch IP and Geo data on mount to pre-select country and phone code
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const countryCode = data.country_code;
        const country = ALLOWED_COUNTRIES.find((c) => c.code === countryCode);
        if (country) {
          setShippingData((prev) => ({ 
            ...prev, 
            country: country.name,
            phone: country.phoneCode + ' '
          }));
          setPhoneCode(country.phoneCode);
        }
      })
      .catch((err) => console.error("Failed to fetch geo data:", err));
  }, []);

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
    // Save shipping data to localStorage (phone already has + prefix)
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
                        placeholder="+1 234 567 8900"
                        value={shippingData.phone}
                        onChange={(e) => {
                          let value = e.target.value;
                          // Ensure phone always starts with +
                          if (!value.startsWith('+')) {
                            value = '+' + value.replace(/^\+*/, '');
                          }
                          setShippingData({ ...shippingData, phone: value });
                        }}
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
                    <span className="font-bold">€{(subtotal / 1.2).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</span>
                  </div>
                  <div className="flex justify-between font-general-sans text-base">
                    <span className="text-black/70">VAT (20%)</span>
                    <span className="font-bold">€{(subtotal - subtotal / 1.2).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</span>
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
                        €{total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
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
                <Separator />
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-black p-2">
                    <RotateCcw className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-satoshi text-sm font-bold">30-Day Returns</p>
                    <p className="font-general-sans text-xs text-black/60">Money back guarantee</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-black p-2">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-satoshi text-sm font-bold">PCI DSS Compliant</p>
                    <p className="font-general-sans text-xs text-black/60">Certified security</p>
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
