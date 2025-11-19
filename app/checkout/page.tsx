"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, ArrowRight, CreditCard, Lock, ShoppingBag, Truck, Check, RotateCcw, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// SEPA Countries - for Open Banking and SEPA payment methods
const SEPA_COUNTRIES = [
  "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
  "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary",
  "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands",
  "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden",
  "Iceland", "Liechtenstein", "Norway", "Switzerland", "Monaco", "San Marino",
  "Andorra", "Vatican City", "Holy See"
];

// Countries list with phone codes, excluding OFAC sanctioned countries (sorted alphabetically)
const ALLOWED_COUNTRIES = [
  { code: "AD", name: "Andorra", phoneCode: "+376" },
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
  { code: "LI", name: "Liechtenstein", phoneCode: "+423" },
  { code: "LT", name: "Lithuania", phoneCode: "+370" },
  { code: "LU", name: "Luxembourg", phoneCode: "+352" },
  { code: "MY", name: "Malaysia", phoneCode: "+60" },
  { code: "MT", name: "Malta", phoneCode: "+356" },
  { code: "MC", name: "Monaco", phoneCode: "+377" },
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
  { code: "SM", name: "San Marino", phoneCode: "+378" },
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
  { code: "VA", name: "Vatican City", phoneCode: "+379" },
  { code: "VN", name: "Vietnam", phoneCode: "+84" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart, promoCode, promoDiscount, clearPromo } = useCart();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1); // 1: Shipping, 2: Payment
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

  // Helper functions to check payment method availability based on country
  const isSepaCountry = () => SEPA_COUNTRIES.includes(shippingData.country);
  const isUSA = () => shippingData.country === "United States";
  const isUK = () => shippingData.country === "United Kingdom";

  const subtotal = cartTotal;
  const shipping = 0; // Free shipping
  const total = subtotal - promoDiscount;

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
    try {
      setIsProcessing(true);
      const shippingData = JSON.parse(localStorage.getItem("checkoutShipping") || "{}");
      const cartData = JSON.parse(localStorage.getItem("checkoutCart") || "{}");

      // Fetch geo data for IP tracking
      let geoData = { ip: "", country: "", city: "", region: "" };
      try {
        const geoRes = await fetch("https://ipapi.co/json/");
        const geoJson = await geoRes.json();
        geoData = {
          ip: geoJson.ip,
          country: geoJson.country_name,
          city: geoJson.city,
          region: geoJson.region,
        };
      } catch (err) {
        console.error("Failed to fetch geo data:", err);
      }

      // Determine payment method gateway
      let gateway = "creditcard";
      if (paymentMethod === "cryptocurrency") {
        gateway = "plisio";
      } else if (paymentMethod === "open_banking") {
        gateway = "Open Banking";
      } else if (paymentMethod === "sepa") {
        gateway = "SEPA Instant Transfer";
      } else if (paymentMethod === "ach_wire") {
        gateway = "ACH or Wire";
      } else if (paymentMethod === "faster_payments") {
        gateway = "Faster Payments";
      }

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
        discount: promoDiscount,
        promoCode: promoCode || null,
        shipping: 0,
        total: cartData.total,
        paymentMethod: gateway,
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
          sku: item.sku,
          price: item.price,
          quantity: item.quantity,
          options: item.options,
        })),
      };

      const response = await fetch("https://api.lux-store.eu/orders", {
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

      // Clear cart and promo code after successful order creation
      clearCart();
      clearPromo();

      // Redirect based on payment method
      if (paymentMethod === "credit_card") {
        // Redirect to payment page with orderId
        router.push(`/checkout/payment?id=${orderId}`);
      } else if (paymentMethod === "cryptocurrency") {
        // Redirect to crypto selection to choose currency
        router.push(`/checkout/crypto-select?orderId=${orderId}`);
      } else if (paymentMethod === "open_banking") {
        // Create CoinToPay payment and redirect to payment URL
        const paymentResponse = await fetch(`https://api.lux-store.eu/orders/${orderId}/cointopay-payment`, {
          method: "POST",
        });

        if (!paymentResponse.ok) {
          throw new Error("Failed to create CoinToPay payment");
        }

        const paymentData = await paymentResponse.json();
        
        // Redirect to CoinToPay payment page with alternative=false parameter
        const paymentUrl = paymentData.paymentUrl + '&alternative=false';
        window.location.href = paymentUrl;
      } else if (paymentMethod === "sepa") {
        // Redirect to SEPA payment page
        router.push(`/checkout/sepa?order_id=${orderId}`);
      } else if (paymentMethod === "ach_wire") {
        // Redirect to ACH payment page
        router.push(`/checkout/ach?order_id=${orderId}`);
      } else if (paymentMethod === "faster_payments") {
        // Redirect to FP payment page
        router.push(`/checkout/fp?order_id=${orderId}`);
      }
    } catch (error) {
      console.error("Failed to create order:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process order. Please try again.",
      });
      setIsProcessing(false);
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

                  {/* Cryptocurrency Option */}
                  <div
                    className={`cursor-pointer rounded-xl border-2 p-6 transition-all ${
                      paymentMethod === "cryptocurrency"
                        ? "border-black bg-black/5"
                        : "border-black/20 hover:border-black/40"
                    }`}
                    onClick={() => setPaymentMethod("cryptocurrency")}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                          paymentMethod === "cryptocurrency"
                            ? "border-black bg-black"
                            : "border-black/40"
                        }`}
                      >
                        {paymentMethod === "cryptocurrency" && (
                          <div className="h-3 w-3 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-satoshi font-bold">Cryptocurrency</p>
                        <p className="font-general-sans text-sm text-black/60">
                          Bitcoin, Ethereum, USDT and more
                        </p>
                      </div>
                      <svg className="h-8 w-8 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Open Banking Option - Only for SEPA countries */}
                  {isSepaCountry() && (
                    <div
                      className={`cursor-pointer rounded-xl border-2 p-6 transition-all ${
                        paymentMethod === "open_banking"
                          ? "border-black bg-black/5"
                          : "border-black/20 hover:border-black/40"
                      }`}
                      onClick={() => setPaymentMethod("open_banking")}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                            paymentMethod === "open_banking"
                              ? "border-black bg-black"
                              : "border-black/40"
                          }`}
                        >
                          {paymentMethod === "open_banking" && (
                            <div className="h-3 w-3 rounded-full bg-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-satoshi font-bold">Open Banking or SEPA</p>
                          <p className="font-general-sans text-sm text-black/60">
                            Pay directly from your bank account
                          </p>
                        </div>
                        <svg className="h-8 w-8 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* SEPA Instant Transfer Option - Only for SEPA countries */}
                  {isSepaCountry() && (
                    <div
                      className={`cursor-pointer rounded-xl border-2 p-6 transition-all ${
                        paymentMethod === "sepa"
                          ? "border-black bg-black/5"
                          : "border-black/20 hover:border-black/40"
                      }`}
                      onClick={() => setPaymentMethod("sepa")}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                            paymentMethod === "sepa"
                              ? "border-black bg-black"
                              : "border-black/40"
                          }`}
                        >
                          {paymentMethod === "sepa" && (
                            <div className="h-3 w-3 rounded-full bg-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-satoshi font-bold">SEPA Instant Transfer</p>
                          <p className="font-general-sans text-sm text-black/60">
                            Direct bank transfer - EU banks
                          </p>
                        </div>
                        <svg className="h-8 w-8 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* ACH or Wire Transfer Option - Only for USA */}
                  {isUSA() && (
                    <div
                      className={`cursor-pointer rounded-xl border-2 p-6 transition-all ${
                        paymentMethod === "ach_wire"
                          ? "border-black bg-black/5"
                          : "border-black/20 hover:border-black/40"
                      }`}
                      onClick={() => setPaymentMethod("ach_wire")}
                    >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                          paymentMethod === "ach_wire"
                            ? "border-black bg-black"
                            : "border-black/40"
                        }`}
                      >
                        {paymentMethod === "ach_wire" && (
                          <div className="h-3 w-3 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-satoshi font-bold">ACH or Wire Transfer</p>
                        <p className="font-general-sans text-sm text-black/60">
                          Direct bank transfer - US banks (USD)
                        </p>
                      </div>
                      <svg className="h-8 w-8 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    </div>
                  )}

                  {/* Faster Payments Option - Only for UK */}
                  {isUK() && (
                    <div
                      className={`cursor-pointer rounded-xl border-2 p-6 transition-all ${
                        paymentMethod === "faster_payments"
                          ? "border-black bg-black/5"
                          : "border-black/20 hover:border-black/40"
                      }`}
                      onClick={() => setPaymentMethod("faster_payments")}
                    >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                          paymentMethod === "faster_payments"
                            ? "border-black bg-black"
                            : "border-black/40"
                        }`}
                      >
                        {paymentMethod === "faster_payments" && (
                          <div className="h-3 w-3 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-satoshi font-bold">Faster Payments</p>
                        <p className="font-general-sans text-sm text-black/60">
                          Direct bank transfer - UK banks (GBP)
                        </p>
                      </div>
                      <svg className="h-8 w-8 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    </div>
                  )}
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
                  {promoDiscount > 0 && (
                    <div className="flex justify-between font-general-sans text-base">
                      <span className="text-black/70">
                        Promo Discount
                        {promoCode && <span className="ml-1 text-xs">({promoCode})</span>}
                      </span>
                      <span className="font-bold text-green-600">-€{promoDiscount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</span>
                    </div>
                  )}
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
