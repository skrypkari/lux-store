"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Package,
  Truck,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Home,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Copy,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ORDER_STATUS_DESCRIPTIONS } from "@/lib/order-statuses";

interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  product_slug?: string;
  product_image?: string;
  brand?: string;
  price: number;
  quantity: number;
  options?: any;
}

interface OrderStatus {
  id: number;
  status: string;
  location?: string;
  notes?: string;
  is_current: boolean;
  is_completed: boolean;
  created_at: string;
}

interface Order {
  id: string;
  customer_email: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_phone?: string;
  shipping_country: string;
  shipping_state?: string;
  shipping_city: string;
  shipping_address_1: string;
  shipping_address_2?: string;
  shipping_postal_code: string;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  payment_method: string;
  payment_status: string;
  tracking_number?: string;
  tracking_url?: string;
  courier?: string;
  items: OrderItem[];
  statuses: OrderStatus[];
  created_at: string;
}

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (!token) {
      setError("Access denied. Please use the tracking page to view your order.");
      setLoading(false);
      return;
    }
    
    fetchOrder(token);
  }, []);

  const fetchOrder = async (token: string) => {
    try {
      const response = await fetch(`https://api.lux-store.eu/orders/by-token/${token}`);
      if (!response.ok) {
        throw new Error("Order not found or invalid access token");
      }
      const data = await response.json();
      
      // Verify that the order ID matches the URL parameter
      if (data.id !== orderId) {
        throw new Error("Order ID mismatch");
      }
      
      setOrder(data);
    } catch (err: any) {
      setError(err.message || "Failed to load order details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCurrentStatus = () => {
    return order?.statuses.find((s) => s.is_current);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-black/10 border-t-black" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-red-50 p-8">
              <Package className="h-16 w-16 text-red-500" />
            </div>
          </div>
          <h1 className="mb-4 font-satoshi text-3xl font-bold">
            Order Not Found
          </h1>
          <p className="mb-8 font-general-sans text-black/60">{error}</p>
          <Link href="/">
            <Button size="lg" className="gap-2">
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentStatus = getCurrentStatus();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-12">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Header */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4 gap-2">
                <ArrowLeft className="h-5 w-5" />
                Back to Home
              </Button>
            </Link>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="mb-2 font-satoshi text-4xl font-bold">
                  Order Details
                </h1>
                <p className="font-general-sans text-black/60">
                  Track your order and view details
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-6 py-3 shadow-sm">
                <div>
                  <p className="font-general-sans text-xs text-black/60">
                    Order ID
                  </p>
                  <p className="font-mono text-lg font-bold">{orderId}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyOrderId}
                  className="h-10 w-10"
                >
                  {copied ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-6 lg:col-span-2">
              {/* Current Status */}
              <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-black p-3">
                    <Truck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-satoshi text-xl font-bold">
                      Current Status
                    </h2>
                    <p className="font-general-sans text-sm text-black/60">
                      Last updated{" "}
                      {currentStatus && formatDate(currentStatus.created_at)}
                    </p>
                  </div>
                </div>

                {currentStatus && (
                  <div className="rounded-xl border border-black/10 bg-gradient-to-br from-black/5 to-transparent p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black">
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="mb-2 font-satoshi text-2xl font-bold">
                          {currentStatus.status}
                        </p>
                        <p className="mb-3 font-general-sans text-sm text-black/60">
                          {ORDER_STATUS_DESCRIPTIONS[currentStatus.status as keyof typeof ORDER_STATUS_DESCRIPTIONS] || 
                           'Your order is being processed.'}
                        </p>
                        {currentStatus.notes && (
                          <p className="font-general-sans text-xs text-black/50 italic">
                            Note: {currentStatus.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Tracking Information */}
              {order.tracking_number && (
                <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-emerald-600 p-3">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="font-satoshi text-xl font-bold">Tracking Information</h2>
                      <p className="font-general-sans text-sm text-black/60">
                        Track your package delivery
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-xl border border-black/10 bg-gradient-to-br from-emerald-50 to-white p-5">
                      <p className="mb-2 font-satoshi text-sm font-bold text-black/70">
                        Tracking ID
                      </p>
                      <p className="mb-4 font-mono text-2xl font-bold tracking-tight text-black">
                        {order.tracking_number}
                      </p>
                      {order.courier && (
                        <div className="mb-4 flex items-center gap-2 rounded-lg bg-white px-3 py-2">
                          <Truck className="h-4 w-4 text-emerald-600" />
                          <span className="font-general-sans text-sm font-semibold text-black">
                            Courier: {order.courier}
                          </span>
                        </div>
                      )}
                      {order.tracking_url ? (
                        <Link href={order.tracking_url} target="_blank" rel="noopener noreferrer">
                          <Button className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700">
                            <Package className="h-5 w-5" />
                            Click Here To Track Your Order
                          </Button>
                        </Link>
                      ) : (
                        <Link href={`/track?id=${order.tracking_number}`} target="_blank">
                          <Button className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700">
                            <Package className="h-5 w-5" />
                            Click Here To Track Your Order
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}

            {/* Order Timeline */}
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl">
                <h2 className="mb-6 font-satoshi text-xl font-bold">
                  Order Timeline
                </h2>
                <div className="space-y-4">
                  {order.statuses
                    .sort(
                      (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                    )
                    .map((status, index) => (
                      <div key={status.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${
                              status.is_current
                                ? "bg-black text-white"
                                : "bg-black/10 text-black/40"
                            }`}
                          >
                            {status.is_completed ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : (
                              <Clock className="h-5 w-5" />
                            )}
                          </div>
                          {index < order.statuses.length - 1 && (
                            <div className="mt-2 h-12 w-0.5 bg-black/20" />
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <p className="mb-1 font-satoshi text-lg font-bold">
                            {status.status}
                          </p>
                          <p className="mb-2 font-general-sans text-sm text-black/60">
                            {formatDate(status.created_at)}
                          </p>
                          <p className="mb-2 font-general-sans text-sm text-black/70">
                            {ORDER_STATUS_DESCRIPTIONS[status.status as keyof typeof ORDER_STATUS_DESCRIPTIONS] || 
                             'Order status updated.'}
                          </p>
                          {status.notes && (
                            <p className="font-general-sans text-xs text-black/50 italic">
                              Note: {status.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Order Items */}
              <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl">
                <h2 className="mb-6 font-satoshi text-xl font-bold">
                  Order Items
                </h2>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 rounded-xl border border-black/10 p-4"
                    >
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-black/10">
                        <Image
                          src={item.product_image || "/placeholder.png"}
                          alt={item.product_name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1">
                        <p className="mb-1 font-satoshi text-base font-bold line-clamp-1">
                          {item.product_name}
                        </p>
                        {item.brand && (
                          <p className="mb-2 font-general-sans text-sm text-black/60">
                            {item.brand}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <p className="font-general-sans text-sm text-black/60">
                            Quantity: {item.quantity}
                          </p>
                          <p className="font-satoshi text-lg font-bold">
                            €{item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:col-span-1">
              {/* Order Summary */}
              <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl">
                <h3 className="mb-4 font-satoshi text-lg font-bold">
                  Order Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between font-general-sans text-base">
                    <span className="text-black/70">Subtotal (excl. VAT)</span>
                    <span className="font-bold">
                      €{(order.subtotal / 1.2).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between font-general-sans text-base">
                    <span className="text-black/70">VAT (20%)</span>
                    <span className="font-bold">
                      €{(order.subtotal - order.subtotal / 1.2).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                    </span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between font-general-sans text-base">
                      <span className="text-black/70">Discount</span>
                      <span className="font-bold text-red-600">
                        -€{order.discount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between font-general-sans text-base">
                    <span className="text-black/70">Shipping</span>
                    <span className="font-bold text-green-600">
                      {order.shipping === 0 ? "FREE" : `€${order.shipping.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`}
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="rounded-xl bg-black/5 p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="font-satoshi text-lg font-bold">
                      Total
                    </span>
                    <div className="text-right">
                      <span className="font-satoshi text-3xl font-bold tracking-tight">
                        €{order.total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="flex items-center gap-2 font-general-sans text-sm text-black/60">
                    <Calendar className="h-4 w-4" />
                    Ordered on {formatDate(order.created_at)}
                  </p>
                </div>
              </div>

              {/* Customer Information */}
              <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl">
                <h3 className="mb-4 font-satoshi text-lg font-bold">
                  Customer Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 text-black/40" />
                    <div>
                      <p className="font-general-sans text-xs text-black/60">
                        Email
                      </p>
                      <p className="font-general-sans text-sm font-semibold">
                        {order.customer_email}
                      </p>
                    </div>
                  </div>
                  {order.customer_phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="mt-0.5 h-5 w-5 text-black/40" />
                      <div>
                        <p className="font-general-sans text-xs text-black/60">
                          Phone
                        </p>
                        <p className="font-general-sans text-sm font-semibold">
                          {order.customer_phone}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl">
                <h3 className="mb-4 font-satoshi text-lg font-bold">
                  Shipping Address
                </h3>
                <div className="flex items-start gap-3">
                  <Home className="mt-0.5 h-5 w-5 text-black/40" />
                  <div>
                    <p className="font-general-sans text-sm font-semibold">
                      {order.customer_first_name} {order.customer_last_name}
                    </p>
                    <p className="font-general-sans text-sm text-black/70">
                      {order.shipping_address_1}
                    </p>
                    {order.shipping_address_2 && (
                      <p className="font-general-sans text-sm text-black/70">
                        {order.shipping_address_2}
                      </p>
                    )}
                    <p className="font-general-sans text-sm text-black/70">
                      {order.shipping_city}
                      {order.shipping_state && `, ${order.shipping_state}`}
                    </p>
                    <p className="font-general-sans text-sm text-black/70">
                      {order.shipping_postal_code}
                    </p>
                    <p className="font-general-sans text-sm text-black/70">
                      {order.shipping_country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="rounded-2xl border border-black/10 bg-gradient-to-br from-[#FAFAFA] via-white to-[#F5F5F5] p-6">
                <h3 className="mb-2 font-satoshi text-sm font-bold">
                  Need Help?
                </h3>
                <p className="mb-4 font-general-sans text-sm text-black/60">
                  Contact our support team for any questions about your order.
                </p>
                <Link href="/contact">
                  <Button variant="outline" size="sm" className="w-full">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
