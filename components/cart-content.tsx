"use client";

import { useCart } from "@/contexts/cart-context";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Package, Shield, Truck, Tag, Heart, Clock, Lock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface RelatedProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
  media: Array<{ url: string }>;
  categories: Array<{
    category: {
      name: string;
    };
  }>;
}

export default function CartContent() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);

  const subtotal = cartTotal;
  const vat = subtotal * 0.2; // 20% VAT
  const shipping = cartItems.length > 0 ? 0 : 0; // Free shipping
  const total = subtotal + vat + shipping - discount;

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "LUXURY10") {
      setDiscount(subtotal * 0.1);
      setPromoApplied(true);
    } else if (promoCode.toUpperCase() === "VIP20") {
      setDiscount(subtotal * 0.2);
      setPromoApplied(true);
    }
  };

  // Fetch related products based on cart items
  useEffect(() => {
    if (cartItems.length === 0) {
      setRelatedProducts([]);
      return;
    }

    // Get unique cart item IDs to exclude from recommendations
    const cartItemIds = cartItems.map(item => item.id);

    // Fetch products from the API - get more products to have better selection after filtering
    fetch('https://luxstore-backend.vercel.app/1&limit=20')
      .then(res => res.json())
      .then(data => {
        // Filter out items that are already in cart
        const filtered = data.products
          .filter((product: RelatedProduct) => !cartItemIds.includes(product.id))
          .slice(0, 4); // Take only 4 products for display
        setRelatedProducts(filtered);
      })
      .catch(err => {
        console.error('Failed to fetch related products:', err);
        setRelatedProducts([]);
      });
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className="relative overflow-hidden py-24">
        {/* Subtle Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-10 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-black/20 to-black/5 blur-2xl" />
              <div className="relative rounded-full bg-gradient-to-br from-white via-[#FAFAFA] to-[#F5F5F5] p-12 shadow-2xl ring-1 ring-black/5">
                <ShoppingBag className="h-20 w-20 text-black/40" />
              </div>
            </div>
          </div>
          
          <div className="mb-2 flex justify-center">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-black/20 to-transparent" />
          </div>
          
          <h2 className="mb-4 font-satoshi text-4xl font-bold tracking-tight">
            Your cart is empty
          </h2>
          <p className="mb-3 font-general-sans text-xl leading-relaxed text-black/60">
            Begin curating your luxury collection
          </p>
          <p className="mb-10 font-general-sans text-sm text-black/40">
            Every piece is authenticated and delivered with exceptional care
          </p>
          
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-black/10 bg-white p-6 shadow-lg">
              <div className="mb-3 flex justify-center">
                <div className="rounded-full bg-black p-3">
                  <Truck className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="mb-2 font-satoshi font-bold">Complimentary Shipping</h3>
              <p className="font-general-sans text-sm text-black/60">Express delivery worldwide</p>
            </div>
            <div className="rounded-xl border border-black/10 bg-white p-6 shadow-lg">
              <div className="mb-3 flex justify-center">
                <div className="rounded-full bg-black p-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="mb-2 font-satoshi font-bold">Authenticated</h3>
              <p className="font-general-sans text-sm text-black/60">Certified genuine items</p>
            </div>
            <div className="rounded-xl border border-black/10 bg-white p-6 shadow-lg">
              <div className="mb-3 flex justify-center">
                <div className="rounded-full bg-black p-3">
                  <Package className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="mb-2 font-satoshi font-bold">Gift Services</h3>
              <p className="font-general-sans text-sm text-black/60">Luxury presentation</p>
            </div>
          </div>
          
          <Link href="/store/all">
            <Button size="lg" className="gap-2 px-8 py-6 text-base shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-black/20">
              Explore Luxury Collection
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        {/* Cart Items */}
        <div className="space-y-6 lg:col-span-2 lg:space-y-8">
          {/* Cart Header */}
          <div className="overflow-hidden rounded-xl border border-black/10 bg-gradient-to-r from-black/5 to-transparent">
            <div className="flex items-center justify-between p-3 sm:p-4">
              <div>
                <h3 className="font-satoshi text-lg font-bold">Shopping Cart</h3>
                <p className="font-general-sans text-sm text-black/60">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
                </p>
              </div>
              <Button
                variant="ghost"
                className="font-general-sans text-sm font-medium text-black/60 hover:text-red-600"
                onClick={() => {
                  if (confirm("Are you sure you want to clear your cart?")) {
                    cartItems.forEach(item => removeFromCart(item.id));
                  }
                }}
              >
                Clear All
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="border-t border-black/10 bg-white px-3 py-4 sm:px-4">
              <div className="flex items-center justify-between">
                {/* Step 1 - Cart (Active) */}
                <div className="flex flex-1 items-center">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white shadow-lg">
                      <ShoppingBag className="h-4 w-4" />
                    </div>
                    <div className="hidden sm:block">
                      <p className="font-satoshi text-xs font-bold">Cart</p>
                      <p className="font-general-sans text-[10px] text-black/50">Review items</p>
                    </div>
                  </div>
                  <div className="mx-2 h-0.5 flex-1 bg-black/20" />
                </div>

                {/* Step 2 - Shipping */}
                <div className="flex flex-1 items-center">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black/20 bg-white text-black/40">
                      <Truck className="h-4 w-4" />
                    </div>
                    <div className="hidden sm:block">
                      <p className="font-satoshi text-xs font-bold text-black/40">Shipping</p>
                      <p className="font-general-sans text-[10px] text-black/30">Address</p>
                    </div>
                  </div>
                  <div className="mx-2 h-0.5 flex-1 bg-black/20" />
                </div>

                {/* Step 3 - Payment */}
                <div className="flex flex-1 items-center">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black/20 bg-white text-black/40">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div className="hidden sm:block">
                      <p className="font-satoshi text-xs font-bold text-black/40">Payment</p>
                      <p className="font-general-sans text-[10px] text-black/30">Secure</p>
                    </div>
                  </div>
                  <div className="mx-2 h-0.5 flex-1 bg-black/20" />
                </div>

                {/* Step 4 - Confirmation */}
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black/20 bg-white text-black/40">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="hidden sm:block">
                    <p className="font-satoshi text-xs font-bold text-black/40">Done</p>
                    <p className="font-general-sans text-[10px] text-black/30">Confirm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-4 shadow-lg transition-all duration-300 hover:border-black/20 hover:shadow-2xl md:p-6"
              >
                {/* Desktop Layout */}
                <div className="hidden md:block">
                  {/* Delivery Badge - Desktop */}

                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="relative h-36 w-36 flex-shrink-0 overflow-hidden rounded-xl border border-black/10 bg-gradient-to-br from-black/5 to-black/10 shadow-lg">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                        unoptimized
                      />
                      {!item.inStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                          <span className="font-satoshi text-sm font-bold text-white">
                            SOLD OUT
                          </span>
                        </div>
                      )}
                      <div className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 shadow-lg backdrop-blur-sm">
                        <span className="font-satoshi text-[10px] font-bold uppercase tracking-wide text-black">
                          Authentic
                        </span>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-1 flex-col">
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <p className="font-general-sans text-xs font-bold uppercase tracking-wider text-black/50">
                              {item.brand}
                            </p>
                            <div className="h-1 w-1 rounded-full bg-black/20" />
                            <span className="font-general-sans text-xs text-black/40">
                              {item.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                          </div>
                          <h3 className="mb-3 font-satoshi text-xl font-bold leading-tight">
                            {item.name}
                          </h3>
                          {item.options && Object.keys(item.options).length > 0 && (
                            <div className="mb-2 flex flex-wrap gap-2">
                              {Object.entries(item.options).map(([key, value]) => (
                                <span
                                  key={key}
                                  className="rounded-full border border-black/20 bg-white px-3 py-1 font-general-sans text-xs font-medium text-black"
                                >
                                  {key}: {value}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2">
                            <span className="flex items-center gap-1.5 rounded-full border border-black/10 bg-black/5 px-3 py-1 font-general-sans text-xs font-medium text-black/70">
                              <Truck className="h-3 w-3" />
                              Express Shipping
                            </span>
                            <span className="flex items-center gap-1.5 rounded-full border border-black/10 bg-black/5 px-3 py-1 font-general-sans text-xs font-medium text-black/70">
                              <Package className="h-3 w-3" />
                              Gift Options
                            </span>
                            <span className="flex items-center gap-1.5 rounded-full border border-black/10 bg-black/5 px-3 py-1 font-general-sans text-xs font-medium text-black/70">
                              <Shield className="h-3 w-3" />
                              Insured
                            </span>
                          </div>
                        </div>
                        <div className="h-9 mr-2 flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
                            <Clock className="h-3 w-3 text-black/60" />
                            <span className="font-general-sans text-xs font-medium text-black/80">
                            Arrives Nov 10-12
                            </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-full border border-black/10 transition-all hover:scale-110 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-auto flex items-end justify-between">
                        {/* Quantity Selector */}
                        <div className="flex items-center gap-3">
                          <span className="font-general-sans text-sm font-medium text-black/60">
                            Qty:
                          </span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-10 w-10 rounded-xl border-black/20 transition-all hover:scale-110 hover:border-black hover:bg-black hover:text-white"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={!item.inStock}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <div className="flex h-10 w-14 items-center justify-center rounded-xl border-2 border-black/20 bg-black/5 font-satoshi text-lg font-bold">
                              {item.quantity}
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-10 w-10 rounded-xl border-black/20 transition-all hover:scale-110 hover:border-black hover:bg-black hover:text-white"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={!item.inStock}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-satoshi text-3xl font-bold tracking-tight">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                          {item.quantity > 1 && (
                            <p className="font-general-sans text-sm text-black/50">
                              ${item.price.toLocaleString()} × {item.quantity}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden">
                  <div className="mb-4 flex items-start gap-3">
                    {/* Mobile Image */}
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-black/10 bg-gradient-to-br from-black/5 to-black/10 shadow">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {!item.inStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                          <span className="font-satoshi text-[10px] font-bold text-white">
                            SOLD OUT
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Mobile Details */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 flex items-center gap-1.5">
                        <p className="font-general-sans text-[10px] font-bold uppercase tracking-wider text-black/50">
                          {item.brand}
                        </p>
                        <span className="font-general-sans text-[10px] text-black/40">
                          • {item.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                      <h3 className="mb-2 font-satoshi text-base font-bold leading-tight">
                        {item.name}
                      </h3>
                      {item.options && Object.keys(item.options).length > 0 && (
                        <div className="mb-1 flex flex-wrap gap-1">
                          {Object.entries(item.options).map(([key, value]) => (
                            <span
                              key={key}
                              className="rounded-full border border-black/20 bg-white px-2 py-0.5 font-general-sans text-[10px] font-medium text-black"
                            >
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="font-satoshi text-xl font-bold">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                      {item.quantity > 1 && (
                        <p className="font-general-sans text-xs text-black/50">
                          ${item.price.toLocaleString()} × {item.quantity}
                        </p>
                      )}
                    </div>

                    {/* Mobile Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 flex-shrink-0 rounded-full border border-black/10 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  {/* Mobile Delivery Info */}
                  <div className="mb-3 flex items-center gap-2 rounded-lg border border-black/10 bg-black/5 px-3 py-2">
                    <Clock className="h-3.5 w-3.5 text-black/60" />
                    <span className="font-general-sans text-xs font-medium text-black/70">
                      Arrives Nov 10-12
                    </span>
                  </div>

                  {/* Mobile Quantity Controls */}
                  <div className="flex items-center justify-between gap-4 rounded-lg border border-black/10 bg-black/5 p-3">
                    <span className="font-general-sans text-sm font-medium text-black/60">
                      Quantity
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg border-black/20 bg-white hover:border-black hover:bg-black hover:text-white"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={!item.inStock}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </Button>
                      <div className="flex h-8 w-12 items-center justify-center rounded-lg border-2 border-black/20 bg-white font-satoshi text-base font-bold">
                        {item.quantity}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg border-black/20 bg-white hover:border-black hover:bg-black hover:text-white"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={!item.inStock}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Luxury Promise Section - Desktop Only */}
          <div className="relative mt-12 hidden overflow-hidden md:block">
            {/* Elegant Background with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAFA] via-white to-[#F5F5F5]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            {/* Decorative Top Border with Fade */}
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
            
            <div className="relative px-4 py-16 sm:px-6 md:py-20">
              <div className="mx-auto max-w-4xl text-center">
                {/* Elegant Quote/Slogan */}
                <div className="mb-12">
                  <div className="mb-4 flex justify-center">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent via-black/30 to-transparent" />
                  </div>
                  <p className="font-satoshi text-2xl font-light leading-relaxed tracking-wide text-black/90 sm:text-3xl md:text-4xl">
                    Because you deserve the finest
                  </p>
                  <p className="mt-3 font-general-sans text-base leading-relaxed text-black/60 sm:text-lg">
                    Every piece authenticated, insured, and delivered with exceptional care
                  </p>
                  <div className="mt-4 flex justify-center">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent via-black/30 to-transparent" />
                  </div>
                </div>

                {/* Premium Services Grid */}
                <div className="grid gap-6 sm:grid-cols-3 md:gap-8">
                  {/* Authenticity */}
                  <div className="group">
                    <div className="mb-4 flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-black/5 blur-xl transition-all duration-500 group-hover:bg-black/10" />
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-black/10 bg-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-black/20 group-hover:shadow-xl">
                          <Shield className="h-7 w-7 text-black transition-transform duration-300 group-hover:scale-110" />
                        </div>
                      </div>
                    </div>
                    <h3 className="mb-2 font-satoshi text-lg font-bold tracking-tight">
                      Guaranteed Authentic
                    </h3>
                    <p className="font-general-sans text-sm leading-relaxed text-black/60">
                      Certificate of authenticity with every luxury item
                    </p>
                  </div>

                  {/* Insured Delivery */}
                  <div className="group">
                    <div className="mb-4 flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-black/5 blur-xl transition-all duration-500 group-hover:bg-black/10" />
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-black/10 bg-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-black/20 group-hover:shadow-xl">
                          <Package className="h-7 w-7 text-black transition-transform duration-300 group-hover:scale-110" />
                        </div>
                      </div>
                    </div>
                    <h3 className="mb-2 font-satoshi text-lg font-bold tracking-tight">
                      Fully Insured
                    </h3>
                    <p className="font-general-sans text-sm leading-relaxed text-black/60">
                      Comprehensive protection from our door to yours
                    </p>
                  </div>

                  {/* White Glove Service */}
                  <div className="group">
                    <div className="mb-4 flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-black/5 blur-xl transition-all duration-500 group-hover:bg-black/10" />
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-black/10 bg-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-black/20 group-hover:shadow-xl">
                          <svg className="h-7 w-7 text-black transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h3 className="mb-2 font-satoshi text-lg font-bold tracking-tight">
                      White Glove Care
                    </h3>
                    <p className="font-general-sans text-sm leading-relaxed text-black/60">
                      Premium packaging and personal concierge service
                    </p>
                  </div>
                </div>

                {/* Subtle CTA or Trust Statement */}
                <div className="mt-12">
                  <p className="font-general-sans text-xs uppercase tracking-[0.2em] text-black/40">
                    Trusted by luxury collectors worldwide since 2020
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Bottom Border with Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* Summary Card */}
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl">
              <div className="border-b border-black/10 bg-black px-6 py-5">
                <h2 className="font-satoshi text-2xl font-bold text-white">Order Summary</h2>
                <p className="mt-1 font-general-sans text-sm text-white/70">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                </p>
              </div>
              
              <div className="space-y-5 p-6">
                <div className="space-y-3">
                  <div className="flex justify-between font-general-sans text-base">
                    <span className="text-black/70">Subtotal</span>
                    <span className="font-bold text-black">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-general-sans text-base">
                    <span className="text-black/70">VAT (20%)</span>
                    <span className="font-bold text-black">${vat.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-general-sans text-base">
                    <span className="text-black/70">Shipping</span>
                    <div className="text-right">
                      <span className="font-bold text-black">Complimentary</span>
                      <p className="text-xs text-black/50">Express Delivery</p>
                    </div>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between font-general-sans text-base">
                      <span className="text-black/70">Promo Discount</span>
                      <span className="font-bold text-black">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
                
                {/* Promo Code */}
                <div className="rounded-xl border border-black/10 bg-black/5 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Tag className="h-4 w-4 text-black/60" />
                    <span className="font-satoshi font-bold text-black">Promotional Code</span>
                  </div>
                  {!promoApplied ? (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        className="flex-1 border-black/20 bg-white uppercase"
                      />
                      <Button
                        variant="outline"
                        onClick={applyPromoCode}
                        className="border-black bg-black font-semibold text-white hover:bg-black/90"
                      >
                        Apply
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between rounded-lg border border-black/20 bg-white p-3">
                      <span className="font-general-sans text-sm font-medium text-black">
                        Code applied: {promoCode}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setPromoApplied(false);
                          setDiscount(0);
                          setPromoCode("");
                        }}
                        className="h-6 text-xs text-black/60 hover:text-black"
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                  <p className="mt-2 font-general-sans text-xs text-black/60">
                    Try: <span className="font-semibold">LUXURY10</span> or <span className="font-semibold">VIP20</span>
                  </p>
                </div>
                
                <Separator className="my-4" />
                
                <div className="rounded-xl bg-black/5 p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="font-satoshi text-lg font-bold">Total Amount</span>
                    <div className="text-right">
                      <span className="font-satoshi text-3xl font-bold tracking-tight">
                        ${total.toFixed(2)}
                      </span>
                      <p className="font-general-sans text-xs text-black/50">Including VAT</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="group relative w-full gap-2 bg-black py-6 text-base font-bold shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-black/90 active:scale-[0.98]"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>

                  {/* Security Microcopy */}
                  <div className="flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-gradient-to-r from-black/5 to-transparent px-4 py-3">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-black/10">
                      <Lock className="h-3.5 w-3.5 text-black/70" />
                    </div>
                    <p className="font-general-sans text-xs leading-relaxed text-black/70">
                      <span className="font-bold text-black">Secure 256-bit encryption</span> — your details are protected
                    </p>
                  </div>
                </div>

                <Link href="/store/all">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-2 py-6 font-semibold transition-all duration-300 hover:scale-[1.02] hover:border-black hover:bg-black/5 active:scale-[0.98]"
                  >
                    Continue Shopping
                  </Button>
                </Link>
                
                <div className="rounded-xl border border-black/10 bg-white mt-4 p-4">
                  <p className="mb-2 font-satoshi text-sm font-bold">Accepted Payment Methods</p>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-12 items-center justify-center rounded border border-black/10 bg-white font-general-sans text-xs font-bold">
                      VISA
                    </div>
                    <div className="flex h-8 w-12 items-center justify-center rounded border border-black/10 bg-white font-general-sans text-xs font-bold">
                      MC
                    </div>
                    <div className="flex h-8 w-12 items-center justify-center rounded border border-black/10 bg-white font-general-sans text-xs font-bold">
                      AMEX
                    </div>
                    <div className="flex h-8 w-12 items-center justify-center rounded border border-black/10 bg-white font-general-sans text-xs font-bold">
                      PayPal
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4 overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-lg">
              <h3 className="mb-4 font-satoshi text-lg font-bold">Service Excellence</h3>
              
              <div className="group flex items-start gap-4 border-b border-black/5 pb-4 last:border-0 last:pb-0">
                <div className="rounded-lg bg-black p-2.5 transition-transform duration-300 group-hover:scale-110">
                  <Truck className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-satoshi font-bold">Complimentary Shipping</h3>
                  <p className="font-general-sans text-sm text-black/60">
                    Express worldwide delivery on all orders
                  </p>
                  <p className="mt-1 font-general-sans text-xs text-black/40">
                    2-3 business days
                  </p>
                </div>
              </div>
              
              <div className="group flex items-start gap-4 border-b border-black/5 pb-4 last:border-0 last:pb-0">
                <div className="rounded-lg bg-black p-2.5 transition-transform duration-300 group-hover:scale-110">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-satoshi font-bold">Authenticity Guarantee</h3>
                  <p className="font-general-sans text-sm text-black/60">
                    Certified authentic with documentation
                  </p>
                  <p className="mt-1 font-general-sans text-xs text-black/40">
                    Certificate included
                  </p>
                </div>
              </div>
              
              <div className="group flex items-start gap-4">
                <div className="rounded-lg bg-black p-2.5 transition-transform duration-300 group-hover:scale-110">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-satoshi font-bold">Premium Presentation</h3>
                  <p className="font-general-sans text-sm text-black/60">
                    Signature gift boxes and cards available
                  </p>
                  <p className="mt-1 font-general-sans text-xs text-black/40">
                    Complimentary gift wrapping
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 lg:mt-20">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-satoshi text-2xl font-bold">You May Also Like</h2>
              <p className="font-general-sans text-sm text-black/60">
                Handpicked recommendations for you
              </p>
            </div>
            <Link href="/store/all">
              <Button variant="ghost" className="gap-2 font-semibold">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((product) => {
              const imageUrl = product.media?.[0]?.url 
                ? `https://d2j6dbq0eux0bg.cloudfront.net/${product.media[0].url}`
                : "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop";
              const brandName = product.categories?.[0]?.category?.name || product.brand;

              return (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <div className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg transition-all duration-300 hover:border-black/20 hover:shadow-2xl">
                    <div className="relative aspect-square overflow-hidden bg-black/5">
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <p className="mb-1 font-general-sans text-xs font-medium uppercase tracking-wider text-black/50">
                        {brandName}
                      </p>
                      <h3 className="mb-2 font-satoshi font-bold leading-tight group-hover:underline line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="font-satoshi text-xl font-bold">
                        €{product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Trust Badges */}
      <div className="mt-12 rounded-2xl border-2 border-black/10 bg-gradient-to-r from-black/5 via-white to-black/5 p-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-3 flex justify-center">
              <div className="rounded-full bg-black p-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="mb-2 font-satoshi text-lg font-bold">2-3 Days Delivery</h3>
            <p className="font-general-sans text-sm text-black/60">
              Express worldwide shipping on all orders
            </p>
          </div>
          <div className="text-center">
            <div className="mb-3 flex justify-center">
              <div className="rounded-full bg-black p-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="mb-2 font-satoshi text-lg font-bold">Secure Payment</h3>
            <p className="font-general-sans text-sm text-black/60">
              256-bit SSL encryption & PCI DSS certified
            </p>
          </div>
          <div className="text-center">
            <div className="mb-3 flex justify-center">
              <div className="rounded-full bg-black p-4">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="mb-2 font-satoshi text-lg font-bold">Easy Returns</h3>
            <p className="font-general-sans text-sm text-black/60">
              30-day hassle-free return policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
