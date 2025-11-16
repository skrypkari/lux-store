"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Bitcoin, ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";

const CRYPTOCURRENCIES = [
  { id: "BTC", name: "Bitcoin", icon: "₿", stablecoin: false },
  { id: "ETH", name: "Ethereum", icon: "Ξ", stablecoin: false },
  { id: "USDT", name: "Tether ERC-20", icon: "₮", stablecoin: true },
  { id: "USDC", name: "USD Coin", icon: "$", stablecoin: true },
  { id: "LTC", name: "Litecoin", icon: "Ł", stablecoin: false },
  { id: "DOGE", name: "Dogecoin", icon: "Ð", stablecoin: false },
  { id: "TRX", name: "Tron", icon: "T", stablecoin: false },
  { id: "USDT_TRX", name: "Tether TRC-20", icon: "₮", stablecoin: true },
  { id: "BNB", name: "BNB Chain", icon: "B", stablecoin: false },
  { id: "USDT_BSC", name: "Tether BEP-20", icon: "₮", stablecoin: true },
  { id: "TON", name: "Toncoin", icon: "T", stablecoin: false },
  { id: "SOL", name: "Solana", icon: "◎", stablecoin: false },
];

function CryptoSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState("");

  useEffect(() => {
    const id = searchParams.get("orderId");
    if (!id) {
      router.push("/");
      return;
    }
    setOrderId(id);
  }, [searchParams, router]);

  const handleCryptoSelect = async (cryptoId: string) => {
    setSelectedCrypto(cryptoId);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/plisio/create-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          cryptocurrency: cryptoId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to payment page with txn_id
        router.push(`/checkout/crypto-payment?txn_id=${data.data.txn_id}`);
      } else {
        toast({
          variant: "destructive",
          title: "Payment Error",
          description: data.message || "Payment gateway temporarily unavailable. Please try again later.",
        });
        setLoading(false);
        setSelectedCrypto("");
      }
    } catch (error) {
      console.error("Failed to create invoice:", error);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Payment gateway temporarily unavailable. Please try again later.",
      });
      setLoading(false);
      setSelectedCrypto("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-12">
      <div className="container mx-auto max-w-5xl px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 p-4 shadow-2xl">
              <Bitcoin className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="mb-3 font-satoshi text-4xl font-bold">Select Cryptocurrency</h1>
          <p className="font-general-sans text-lg text-black/60">
            Choose your preferred cryptocurrency for payment
          </p>
          <p className="mt-2 font-general-sans text-sm text-black/40">
            Order ID: {orderId}
          </p>
        </div>

        {/* Crypto Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CRYPTOCURRENCIES.map((crypto) => (
            <button
              key={crypto.id}
              onClick={() => handleCryptoSelect(crypto.id)}
              disabled={loading}
              className={`group relative overflow-hidden rounded-2xl border-2 p-6 text-left transition-all duration-300 ${
                selectedCrypto === crypto.id
                  ? "border-black bg-black shadow-2xl"
                  : "border-black/10 bg-white hover:border-black/30 hover:shadow-lg"
              } ${loading && selectedCrypto !== crypto.id ? "opacity-50" : ""}`}
            >
              {/* Stablecoin Badge */}
              {crypto.stablecoin && (
                <div className="absolute right-3 top-3 rounded-full bg-green-100 px-2 py-1">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-green-700">
                    Stable
                  </span>
                </div>
              )}

              {/* Icon */}
              <div
                className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl text-3xl font-bold transition-all ${
                  selectedCrypto === crypto.id
                    ? "bg-white/20 text-white"
                    : "bg-black/5 text-black group-hover:bg-black/10"
                }`}
              >
                {crypto.icon}
              </div>

              {/* Name */}
              <h3
                className={`mb-1 font-satoshi text-xl font-bold ${
                  selectedCrypto === crypto.id ? "text-white" : "text-black"
                }`}
              >
                {crypto.name}
              </h3>

              {/* Code */}
              <p
                className={`font-mono text-sm font-semibold ${
                  selectedCrypto === crypto.id ? "text-white/70" : "text-black/60"
                }`}
              >
                {crypto.id}
              </p>

              {/* Loading Spinner */}
              {loading && selectedCrypto === crypto.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-10 rounded-2xl border border-black/10 bg-gradient-to-br from-[#FAFAFA] via-white to-[#F5F5F5] p-6">
          <h3 className="mb-3 font-satoshi text-lg font-bold">Payment Information</h3>
          <div className="space-y-2 font-general-sans text-sm text-black/70">
            <p>✓ Secure crypto payment via Plisio gateway</p>
            <p>✓ Payment expires in 30 minutes after invoice creation</p>
            <p>✓ Your order will be confirmed once payment is received</p>
            <p>✓ Transaction fees are included in the final amount</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CryptoSelectionPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-black"></div>
            <p className="font-general-sans text-black/60">Loading...</p>
          </div>
        </div>
      }
    >
      <CryptoSelectionContent />
    </Suspense>
  );
}
