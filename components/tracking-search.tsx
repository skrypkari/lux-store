"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Package, Truck, CheckCircle2, MapPin, Clock, Phone, Mail, Box, Plane, Home } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Mock tracking data
const trackingData: Record<string, any> = {
  "LUX2024001234": {
    orderNumber: "LUX2024001234",
    status: "delivered",
    estimatedDelivery: "November 5, 2025",
    actualDelivery: "November 5, 2025, 2:30 PM",
    courier: "DHL Express",
    items: [
      {
        name: "Santos de Cartier Watch",
        brand: "Cartier",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200&h=200&fit=crop",
        quantity: 1,
        price: 7100
      }
    ],
    timeline: [
      {
        status: "Order Placed",
        date: "November 1, 2025, 10:30 AM",
        location: "Birmingham, UK",
        completed: true
      },
      {
        status: "Payment Confirmed",
        date: "November 1, 2025, 10:35 AM",
        location: "Birmingham, UK",
        completed: true
      },
      {
        status: "Processing",
        date: "November 2, 2025, 9:00 AM",
        location: "Langkawi, Malaysia",
        completed: true
      },
      {
        status: "Shipped",
        date: "November 3, 2025, 4:20 PM",
        location: "Kuala Lumpur, Malaysia",
        completed: true
      },
      {
        status: "In Transit",
        date: "November 4, 2025, 11:00 AM",
        location: "London, UK",
        completed: true
      },
      {
        status: "Out for Delivery",
        date: "November 5, 2025, 8:00 AM",
        location: "Birmingham, UK",
        completed: true
      },
      {
        status: "Delivered",
        date: "November 5, 2025, 2:30 PM",
        location: "6 Brindley Place, Birmingham",
        completed: true
      }
    ]
  },
  "LUX2024005678": {
    orderNumber: "LUX2024005678",
    status: "in_transit",
    estimatedDelivery: "November 10, 2025",
    courier: "FedEx International",
    items: [
      {
        name: "Lady Dior Bag",
        brand: "Dior",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop",
        quantity: 1,
        price: 5800
      },
      {
        name: "Aviator Sunglasses",
        brand: "Ray-Ban",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&h=200&fit=crop",
        quantity: 1,
        price: 350
      }
    ],
    timeline: [
      {
        status: "Order Placed",
        date: "November 6, 2025, 3:15 PM",
        location: "Birmingham, UK",
        completed: true
      },
      {
        status: "Payment Confirmed",
        date: "November 6, 2025, 3:20 PM",
        location: "Birmingham, UK",
        completed: true
      },
      {
        status: "Processing",
        date: "November 7, 2025, 10:00 AM",
        location: "Langkawi, Malaysia",
        completed: true
      },
      {
        status: "Shipped",
        date: "November 8, 2025, 2:45 PM",
        location: "Kuala Lumpur, Malaysia",
        completed: true
      },
      {
        status: "In Transit",
        date: "November 9, 2025, 6:00 AM",
        location: "Dubai, UAE",
        completed: true,
        current: true
      },
      {
        status: "Out for Delivery",
        date: "Expected: November 10, 2025",
        location: "Birmingham, UK",
        completed: false
      },
      {
        status: "Delivered",
        date: "Expected: November 10, 2025",
        location: "Your Address",
        completed: false
      }
    ]
  },
  "LUX2024009012": {
    orderNumber: "LUX2024009012",
    status: "processing",
    estimatedDelivery: "November 12, 2025",
    courier: "UPS Worldwide Express",
    items: [
      {
        name: "Rolex Submariner",
        brand: "Rolex",
        image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=200&h=200&fit=crop",
        quantity: 1,
        price: 12500
      }
    ],
    timeline: [
      {
        status: "Order Placed",
        date: "November 8, 2025, 11:45 AM",
        location: "Birmingham, UK",
        completed: true
      },
      {
        status: "Payment Confirmed",
        date: "November 8, 2025, 11:50 AM",
        location: "Birmingham, UK",
        completed: true
      },
      {
        status: "Processing",
        date: "November 8, 2025, 2:00 PM",
        location: "Langkawi, Malaysia",
        completed: true,
        current: true
      },
      {
        status: "Shipped",
        date: "Expected: November 9, 2025",
        location: "Langkawi, Malaysia",
        completed: false
      },
      {
        status: "In Transit",
        date: "Expected: November 10, 2025",
        location: "International",
        completed: false
      },
      {
        status: "Out for Delivery",
        date: "Expected: November 12, 2025",
        location: "Birmingham, UK",
        completed: false
      },
      {
        status: "Delivered",
        date: "Expected: November 12, 2025",
        location: "Your Address",
        completed: false
      }
    ]
  }
};

const statusConfig = {
  delivered: {
    label: "Delivered",
    color: "text-black",
    bg: "bg-black",
    icon: CheckCircle2
  },
  in_transit: {
    label: "In Transit",
    color: "text-black",
    bg: "bg-black",
    icon: Truck
  },
  processing: {
    label: "Processing",
    color: "text-black",
    bg: "bg-black",
    icon: Package
  }
};

export default function TrackingSearch() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setSearchResult(null);
    
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number");
      return;
    }

    setIsSearching(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = trackingData[trackingNumber.toUpperCase()];
    
    if (result) {
      setSearchResult(result);
    } else {
      setError("Tracking number not found. Please check and try again.");
    }

    setIsSearching(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const StatusIcon = searchResult ? statusConfig[searchResult.status as keyof typeof statusConfig].icon : Package;

  return (
    <div className="space-y-12">
      {/* Search Box - Redesigned */}
      <div className="mx-auto max-w-4xl">
        <div className="group relative">
          {/* Glow Effect */}
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-black/20 via-black/10 to-black/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
          
          <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-gradient-to-br from-white to-black/5 shadow-2xl">
            {/* Header with Pattern */}
            <div className="relative overflow-hidden border-b border-black/10 bg-gradient-to-r from-black via-black/95 to-black px-4 py-6 sm:px-8 sm:py-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[size:32px_32px]" />
              <div className="relative flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h2 className="font-satoshi text-xl font-bold leading-tight text-white sm:text-3xl">Track Your Package</h2>
                  <p className="mt-1.5 font-general-sans text-xs text-white/60 sm:mt-2 sm:text-sm">
                    Enter your tracking code
                  </p>
                </div>
                <div className="hidden flex-shrink-0 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-4 md:block">
                  <Package className="h-6 w-6 text-white sm:h-8 sm:w-8" />
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-10">
              {/* Search Input - Premium Design */}
              <div className="mb-4 flex flex-col gap-2.5 sm:mb-6 sm:gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center sm:left-4">
                    <Search className="h-4 w-4 text-black/40 sm:h-5 sm:w-5" />
                  </div>
                  <Input
                    placeholder="LUX2024001234"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                    onKeyPress={handleKeyPress}
                    className="h-12 border-2 border-black/10 bg-white pl-10 pr-3 font-satoshi text-base font-bold uppercase tracking-wider shadow-inner transition-all focus:border-black focus:shadow-lg sm:h-16 sm:pl-12 sm:pr-4 sm:text-xl"
                  />
                </div>
                <Button
                  size="lg"
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="h-12 gap-2 px-6 font-satoshi text-sm font-bold shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl sm:h-16 sm:gap-3 sm:px-10 sm:text-base"
                >
                  {isSearching ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent sm:h-5 sm:w-5" />
                      <span className="hidden sm:inline">Tracking...</span>
                      <span className="sm:hidden">...</span>
                    </>
                  ) : (
                    <>
                      <Truck className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="hidden sm:inline">Track Now</span>
                      <span className="sm:hidden">Track</span>
                    </>
                  )}
                </Button>
              </div>

              {error && (
                <div className="mb-6 overflow-hidden rounded-2xl border-2 border-red-100 bg-gradient-to-br from-red-50 to-white p-5 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                      <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="font-general-sans text-sm font-semibold text-red-800">
                      {error}
                    </p>
                  </div>
                </div>
              )}

              {/* Quick Examples - Enhanced */}
              <div className="rounded-xl border border-black/10 bg-gradient-to-br from-black/5 to-transparent p-4 sm:rounded-2xl sm:p-6">
                <div className="mb-3 flex items-center gap-2 sm:mb-4">
                  <div className="h-1.5 w-1.5 rounded-full bg-black/40" />
                  <p className="font-satoshi text-xs font-bold uppercase tracking-wider text-black/70 sm:text-sm">
                    Demo Tracking Numbers
                  </p>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  {Object.keys(trackingData).map((num) => {
                    const data = trackingData[num];
                    const status = statusConfig[data.status as keyof typeof statusConfig];
                    return (
                      <button
                        key={num}
                        onClick={() => {
                          setTrackingNumber(num);
                          setError("");
                        }}
                        className="group relative overflow-hidden rounded-lg border border-black/10 bg-white p-3 text-left shadow-md transition-all hover:border-black hover:shadow-xl sm:rounded-xl sm:p-4"
                      >
                        <div className="mb-1.5 flex items-center justify-between sm:mb-2">
                          <status.icon className="h-4 w-4 text-black/60 transition-transform group-hover:scale-110 sm:h-5 sm:w-5" />
                          <span className="rounded-full bg-black/5 px-1.5 py-0.5 font-general-sans text-[9px] font-bold uppercase tracking-wide text-black/50 sm:px-2 sm:text-[10px]">
                            {status.label}
                          </span>
                        </div>
                        <p className="mb-0.5 font-satoshi text-[10px] font-bold uppercase tracking-wider text-black sm:mb-1 sm:text-xs">
                          {num}
                        </p>
                        <p className="font-general-sans text-[9px] text-black/50 sm:text-[10px]">
                          {data.items.length} item{data.items.length > 1 ? 's' : ''}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {searchResult && (
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Status Overview - Dramatic Design */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-black/10 shadow-2xl">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-black/98 to-black/95">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.05),transparent_50%)]" />
            </div>

            <div className="relative p-4 sm:p-6 md:p-12">
              <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
                {/* Left Side - Status Icon */}
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:flex-1">
                  <div className="relative">
                    <div className="absolute -inset-2 animate-pulse rounded-full bg-white/20 blur-xl" />
                    <div className="relative rounded-xl bg-white p-4 shadow-2xl sm:rounded-2xl sm:p-6">
                      <StatusIcon className="h-10 w-10 text-black sm:h-14 sm:w-14" />
                    </div>
                  </div>
                  
                  <div className="text-center sm:text-left">
                    <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 backdrop-blur-xl sm:mb-3 sm:gap-2 sm:px-4 sm:py-2">
                      <div className="h-1 w-1 animate-pulse rounded-full bg-white sm:h-1.5 sm:w-1.5" />
                      <span className="font-general-sans text-[10px] font-bold uppercase tracking-[0.15em] text-white/90 sm:text-xs">
                        {searchResult.orderNumber}
                      </span>
                    </div>
                    
                    <h2 className="mb-2 font-satoshi text-3xl font-bold leading-tight text-white sm:mb-3 sm:text-5xl md:text-6xl">
                      {statusConfig[searchResult.status as keyof typeof statusConfig].label}
                    </h2>
                    
                    <div className="space-y-1.5 sm:space-y-2">
                      <p className="font-general-sans text-sm text-white/80 sm:text-lg">
                        {searchResult.status === "delivered" 
                          ? `Delivered ${searchResult.actualDelivery}`
                          : `Expected: ${searchResult.estimatedDelivery}`
                        }
                      </p>
                      <div className="flex items-center justify-center gap-2 sm:justify-start">
                        <div className="rounded-full bg-white/10 px-2.5 py-1 sm:px-3">
                          <p className="font-general-sans text-[10px] font-semibold text-white/70 sm:text-xs">
                            {searchResult.courier}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Quick Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:w-80">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:rounded-2xl sm:p-4">
                    <p className="mb-0.5 font-general-sans text-[10px] font-medium uppercase tracking-wider text-white/60 sm:mb-1 sm:text-xs">
                      Items
                    </p>
                    <p className="font-satoshi text-2xl font-bold text-white sm:text-3xl">
                      {searchResult.items.length}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:rounded-2xl sm:p-4">
                    <p className="mb-0.5 font-general-sans text-[10px] font-medium uppercase tracking-wider text-white/60 sm:mb-1 sm:text-xs">
                      Total
                    </p>
                    <p className="font-satoshi text-2xl font-bold text-white sm:text-3xl">
                      ${searchResult.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Timeline - Redesigned */}
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-2xl">
                {/* Header */}
                <div className="relative overflow-hidden border-b border-black/10 bg-gradient-to-r from-black to-black/95 px-8 py-6">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] bg-[length:200%_100%] animate-[shimmer_3s_infinite]" />
                  <div className="relative flex items-center justify-between">
                    <h3 className="font-satoshi text-2xl font-bold text-white">Journey Timeline</h3>
                    <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-sm">
                      <span className="font-general-sans text-xs font-bold text-white/80">
                        {searchResult.timeline.filter((e: any) => e.completed).length}/{searchResult.timeline.length} Complete
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                  <div className="space-y-6 sm:space-y-8">
                    {searchResult.timeline.map((event: any, index: number) => (
                      <div key={index} className="relative flex gap-3 sm:gap-5">
                        {/* Timeline Line */}
                        {index < searchResult.timeline.length - 1 && (
                          <div className={`absolute left-4 top-11 h-[calc(100%+0.5rem)] w-0.5 rounded-full sm:left-6 sm:top-14 sm:w-1 ${
                            event.completed 
                              ? "bg-gradient-to-b from-black via-black/70 to-black/40" 
                              : "bg-black/5"
                          }`} />
                        )}

                        {/* Icon Circle */}
                        <div className="relative z-10 flex-shrink-0">
                          <div className={`flex h-9 w-9 items-center justify-center rounded-xl border-2 transition-all duration-300 sm:h-12 sm:w-12 sm:rounded-2xl ${
                            event.completed
                              ? "border-black bg-black shadow-xl"
                              : "border-black/10 bg-white shadow-md"
                          } ${event.current ? "scale-110 ring-2 ring-black/10 ring-offset-1 sm:ring-4 sm:ring-offset-2" : ""}`}>
                            {event.completed ? (
                              <CheckCircle2 className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                            ) : (
                              <div className="h-2 w-2 rounded-full bg-black/20 sm:h-3 sm:w-3" />
                            )}
                          </div>
                          
                          {/* Pulse Effect for Current */}
                          {event.current && (
                            <div className="absolute inset-0 -z-10 animate-ping rounded-xl bg-black/20 sm:rounded-2xl" />
                          )}
                        </div>

                        {/* Content Card */}
                        <div className={`flex-1 pb-3 transition-all duration-300 sm:pb-4 ${
                          event.current 
                            ? "rounded-xl border-2 border-black/20 bg-gradient-to-br from-black/5 to-transparent p-3 shadow-lg sm:rounded-2xl sm:p-5" 
                            : event.completed
                            ? "opacity-100"
                            : "opacity-50"
                        }`}>
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="mb-1.5 flex flex-wrap items-center gap-1.5 sm:mb-2 sm:gap-2">
                                <h4 className={`font-satoshi text-base font-bold leading-tight sm:text-xl ${
                                  event.completed ? "text-black" : "text-black/40"
                                }`}>
                                  {event.status}
                                </h4>
                                {event.current && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-black px-2 py-0.5 shadow-lg sm:gap-1.5 sm:px-3 sm:py-1">
                                    <div className="h-1 w-1 animate-pulse rounded-full bg-white sm:h-1.5 sm:w-1.5" />
                                    <span className="font-general-sans text-[9px] font-bold uppercase tracking-wider text-white sm:text-[10px]">
                                      Now
                                    </span>
                                  </span>
                                )}
                              </div>
                              
                              <div className="mb-1.5 flex items-center gap-1.5 sm:mb-2 sm:gap-2">
                                <Clock className={`h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4 ${
                                  event.completed ? "text-black/60" : "text-black/30"
                                }`} />
                                <p className={`font-general-sans text-xs font-medium sm:text-sm ${
                                  event.completed ? "text-black/70" : "text-black/40"
                                }`}>
                                  {event.date}
                                </p>
                              </div>
                              
                              <div className="flex items-start gap-1.5 sm:gap-2">
                                <MapPin className={`mt-0.5 h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4 ${
                                  event.completed ? "text-black/60" : "text-black/30"
                                }`} />
                                <p className={`font-general-sans text-xs font-medium leading-snug sm:text-sm ${
                                  event.completed ? "text-black/60" : "text-black/30"
                                }`}>
                                  {event.location}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details Sidebar */}
            <div className="space-y-6 lg:col-span-1">
              {/* Items - Enhanced */}
              <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-2xl">
                <div className="relative overflow-hidden border-b border-black/10 bg-gradient-to-br from-black to-black/95 px-6 py-5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[size:24px_24px]" />
                  <div className="relative flex items-center justify-between">
                    <h3 className="font-satoshi text-xl font-bold text-white">Your Items</h3>
                    <div className="rounded-full bg-white/10 p-2 backdrop-blur-sm">
                      <Box className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 space-y-3 sm:p-6 sm:space-y-4">
                  {searchResult.items.map((item: any, index: number) => (
                    <div 
                      key={index} 
                      className="group relative overflow-hidden rounded-xl border border-black/10 bg-gradient-to-br from-white to-black/5 p-3 shadow-md transition-all duration-300 hover:shadow-xl sm:rounded-2xl sm:p-4"
                    >
                      <div className="flex gap-3 sm:gap-4">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-black/10 bg-white shadow-lg sm:h-20 sm:w-20 sm:rounded-xl">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="mb-1.5 inline-block rounded-full bg-black/5 px-2 py-0.5 sm:mb-2 sm:px-2.5">
                            <p className="font-general-sans text-[9px] font-bold uppercase tracking-wider text-black/60 sm:text-[10px]">
                              {item.brand}
                            </p>
                          </div>
                          <h4 className="mb-1.5 font-satoshi text-sm font-bold leading-tight sm:mb-2 sm:text-base">
                            {item.name}
                          </h4>
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-general-sans text-[10px] font-medium text-black/50 sm:text-xs">
                              Qty: {item.quantity}
                            </p>
                            <p className="font-satoshi text-base font-bold sm:text-lg">
                              ${item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Support - Enhanced */}
              <div className="overflow-hidden rounded-xl border border-black/10 shadow-2xl sm:rounded-[2rem]">
                <div className="relative overflow-hidden bg-gradient-to-br from-black via-black/98 to-black/95 p-4 sm:p-6">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1),transparent_50%)]" />
                  
                  <div className="relative space-y-4 sm:space-y-5">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm sm:h-10 sm:w-10 sm:rounded-xl">
                        <svg className="h-4 w-4 text-white sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <h3 className="font-satoshi text-lg font-bold text-white sm:text-xl">Support</h3>
                    </div>
                    
                    <p className="font-general-sans text-xs leading-relaxed text-white/70 sm:text-sm">
                      Questions about delivery? We're here to help.
                    </p>
                    
                    <div className="space-y-2.5 sm:space-y-3">
                      <a
                        href="tel:+445557771234"
                        className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 sm:gap-4 sm:rounded-2xl sm:p-4"
                      >
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-white/20 sm:h-11 sm:w-11 sm:rounded-xl">
                          <Phone className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="mb-0.5 font-general-sans text-[9px] font-semibold uppercase tracking-wider text-white/60 sm:text-[10px]">
                            Call Direct
                          </p>
                          <p className="font-satoshi text-xs font-bold text-white sm:text-sm">
                            +44-555-777-1234
                          </p>
                        </div>
                        <svg className="h-3.5 w-3.5 flex-shrink-0 text-white/60 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                      
                      <a
                        href="mailto:info@lux-store.eu"
                        className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 sm:gap-4 sm:rounded-2xl sm:p-4"
                      >
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-white/20 sm:h-11 sm:w-11 sm:rounded-xl">
                          <Mail className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="mb-0.5 font-general-sans text-[9px] font-semibold uppercase tracking-wider text-white/60 sm:text-[10px]">
                            Email Us
                          </p>
                          <p className="font-satoshi text-xs font-bold text-white sm:text-sm">
                            info@lux-store.eu
                          </p>
                        </div>
                        <svg className="h-3.5 w-3.5 flex-shrink-0 text-white/60 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
