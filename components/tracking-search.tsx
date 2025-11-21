"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Package, Truck, CheckCircle2, Mail } from "lucide-react";

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
  const router = useRouter();
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setSearchResult(null);
    
    if (!orderId.trim()) {
      setError("Please enter your Order ID");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSearching(true);

    try {

      const response = await fetch(`http://localhost:5000/orders/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderId.trim().toUpperCase(),
          email: email.trim().toLowerCase(),
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to search");
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || "Order not found");
      }


      router.push(`/orders/${data.orderId}?token=${data.token}`);
    } catch (err: any) {
      console.error("Tracking error:", err);
      setError(err.message || "Order not found. Please check your Order ID and email address.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="space-y-12">
      
      <div className="mx-auto max-w-4xl">
        <div className="group relative">
          
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-black/20 via-black/10 to-black/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
          
          <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-gradient-to-br from-white to-black/5 shadow-2xl">
            
            <div className="relative overflow-hidden border-b border-black/10 bg-gradient-to-r from-black via-black/95 to-black px-4 py-6 sm:px-8 sm:py-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[size:32px_32px]" />
              <div className="relative flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h2 className="font-satoshi text-xl font-bold leading-tight text-white sm:text-3xl">Track Your Order</h2>
                  <p className="mt-1.5 font-general-sans text-xs text-white/60 sm:mt-2 sm:text-sm">
                    Enter your Order ID and email address from confirmation
                  </p>
                </div>
                <div className="hidden flex-shrink-0 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-4 md:block">
                  <Package className="h-6 w-6 text-white sm:h-8 sm:w-8" />
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-10">
              
              <div className="mb-4 space-y-3 sm:mb-6 sm:space-y-4">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center sm:left-4">
                    <Search className="h-4 w-4 text-black/40 sm:h-5 sm:w-5" />
                  </div>
                  <Input
                    placeholder="Order ID (e.g., LS171750225710)"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                    onKeyPress={handleKeyPress}
                    className="h-12 border-2 border-black/10 bg-white pl-10 pr-3 font-mono text-base font-bold tracking-wider shadow-inner transition-all focus:border-black focus:shadow-lg sm:h-16 sm:pl-12 sm:pr-4 sm:text-xl"
                  />
                </div>
                
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center sm:left-4">
                    <Mail className="h-4 w-4 text-black/40 sm:h-5 sm:w-5" />
                  </div>
                  <Input
                    type="email"
                    placeholder="Email address from your order"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="h-12 border-2 border-black/10 bg-white pl-10 pr-3 text-base shadow-inner transition-all focus:border-black focus:shadow-lg sm:h-16 sm:pl-12 sm:pr-4 sm:text-xl"
                  />
                </div>
                
                <Button
                  size="lg"
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="h-12 w-full gap-2 px-6 font-satoshi text-sm font-bold shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl sm:h-16 sm:gap-3 sm:text-base"
                >
                  {isSearching ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent sm:h-5 sm:w-5" />
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <Truck className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Track My Order</span>
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
            </div>
          </div>
        </div>
      </div>

      
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-white to-black/5 p-6 shadow-lg sm:rounded-3xl sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-black/5">
              <Package className="h-6 w-6 text-black/70" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 font-satoshi text-lg font-bold sm:text-xl">Where to find your Order ID?</h3>
              <p className="mb-3 font-general-sans text-sm leading-relaxed text-black/70 sm:text-base">
                Your Order ID (format: LS171750225710) was sent to your email when you placed the order. 
                Check your inbox for the order confirmation email.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black/40" />
                  <p className="font-general-sans text-xs text-black/60 sm:text-sm">
                    <strong>Order ID:</strong> Starts with "LS" followed by numbers
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black/40" />
                  <p className="font-general-sans text-xs text-black/60 sm:text-sm">
                    <strong>Email:</strong> Use the same email you used during checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
