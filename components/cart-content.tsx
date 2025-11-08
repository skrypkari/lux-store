"use client";

import { useCart } from "@/contexts/cart-context";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Package, Shield, Truck, Tag, Heart, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function CartContent() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

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

  if (cartItems.length === 0) {
    return (
      <div className="py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-10 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-black/20 to-black/5 blur-2xl" />
              <div className="relative rounded-full bg-gradient-to-br from-black/10 to-black/5 p-12 shadow-2xl">
                <ShoppingBag className="h-20 w-20 text-black/40" />
              </div>
            </div>
          </div>
          <h2 className="mb-4 font-satoshi text-4xl font-bold tracking-tight">
            Your cart is empty
          </h2>
          <p className="mb-10 font-general-sans text-xl text-black/60">
            Start adding some luxury items to your collection
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
      <div className="grid gap-12 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-8 lg:col-span-2">
          {/* Cart Header */}
          <div className="flex items-center justify-between rounded-xl border border-black/10 bg-gradient-to-r from-black/5 to-transparent p-4">
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
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl border-2 border-black/10 bg-gradient-to-br from-white to-black/5 p-6 shadow-lg transition-all duration-300 hover:border-black/20 hover:shadow-2xl"
              > 
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-xl border border-black/10 bg-gradient-to-br from-black/5 to-black/10 shadow-lg">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                      unoptimized
                    />
                    {!item.inStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <span className="font-satoshi text-sm font-bold text-white">
                          SOLD OUT
                        </span>
                      </div>
                    )}
                    {/* Premium Badge */}
                    <div className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 shadow-lg backdrop-blur-sm">
                      <span className="font-satoshi text-[10px] font-bold uppercase tracking-wide text-black">
                        Authentic
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-1 flex-col">
                    <div className="mb-3 flex items-start justify-between gap-4">
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
                        <h3 className="mb-2 font-satoshi text-xl font-bold leading-tight">
                          {item.name}
                        </h3>
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
                      <div className="flex items-center gap-2 h-9 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-sm">
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

                    <div className="mt-auto flex items-end justify-between gap-4">
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
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
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

                <Button
                  size="lg"
                  className="group relative w-full gap-2 bg-black py-6 text-base font-bold shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-black/90 active:scale-[0.98]"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>

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

      {/* Recently Viewed Section */}
      <div className="mt-16">
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
          {[
            {
              id: 101,
              name: "Santos de Cartier",
              brand: "Cartier",
              price: 7100,
              image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop",
            },
            {
              id: 102,
              name: "Lady Dior Bag",
              brand: "Dior",
              price: 5800,
              image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
            },
            {
              id: 103,
              name: "Aviator Sunglasses",
              brand: "Ray-Ban",
              price: 350,
              image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
            },
            {
              id: 104,
              name: "Diamond Necklace",
              brand: "Tiffany & Co.",
              price: 12500,
              image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
            },
          ].map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg transition-all duration-300 hover:border-black/20 hover:shadow-2xl">
                <div className="relative aspect-square overflow-hidden bg-black/5">
                  <Image
                    src={product.image}
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
                    {product.brand}
                  </p>
                  <h3 className="mb-2 font-satoshi font-bold leading-tight group-hover:underline">
                    {product.name}
                  </h3>
                  <p className="font-satoshi text-xl font-bold">
                    ${product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

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
