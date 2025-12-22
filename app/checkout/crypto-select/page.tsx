"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Bitcoin, ArrowLeft, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export interface ApiResponse {
  data: {
    [currencyCode: string]: Currency;
  };
}

export interface Currency {
  symbol: string;
  name: string;
  status: boolean;
  networks: {
    [networkCode: string]: Network;
  };
}

export interface Network {
  network: string;
  name: string;
  keys: string[];
  required_confirmations: number;
  withdraw_fee: number;
  withdraw_min: number;
  deposit_min: number;
  static_fixed_fee: number;
}


function CryptoSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("");
  const [availableCryptos, setAvailableCryptos] = useState<Currency[]>([]);
  const selectedCurrency = availableCryptos.find(c => c.symbol === selectedSymbol);
  const [selectedNetworkKey, setSelectedNetworkKey] = useState<string>("");
  const selectedNetwork = selectedCurrency?.networks?.[selectedNetworkKey];


  useEffect(() => {
    const id = searchParams.get("orderId");
    if (!id) {
      router.push("/");
      return;
    }
    setOrderId(id);
  }, [searchParams, router]);

  useEffect(() => {
    async function fetchAvailableCryptos() {
      setLoading(true);
      try {
        const response = await fetch("https://api.oxapay.com/v1/common/currencies");
        if (!response.ok) {
          throw new Error("Failed to fetch cryptocurrencies");
        }
        const result: ApiResponse = await response.json();
        const cryptos = Object.values(result.data).filter(
          (currency) => currency.status === true
        );
        setAvailableCryptos(cryptos);
      } catch (error) {
        console.error("Error fetching cryptocurrencies:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAvailableCryptos();
  }, []);

  const onCurrencyChange = (value: string) => {
    setSelectedSymbol(value);
    setSelectedNetworkKey("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-12">
      <div className="container mx-auto max-w-5xl px-4">

        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>


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


        <div className={` ${loading ? "min-h-[200px]" : ""} w-full p-6 border border-black/10 bg-white shadow-lg rounded-2xl transition-all`}>
          {loading ? (
            <div className="flex justify-center items-center flex-col h-[200px]">
              <Loader2 className="h-6 w-6 animate-spin text-black/50" />
            </div>
          ) : (
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]">
              <div className="flex flex-col gap-6">

                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h2 className="font-satoshi text-xl font-semibold tracking-tight">Payment currency</h2>
                    <p className="mt-1 font-general-sans text-sm text-black/50">
                      Select coin and network to generate an invoice
                    </p>
                  </div>

                  {/* маленький бейдж справа */}
                  <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
                    Secure checkout
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                  <div className="space-y-2">
                    <label className="font-general-sans text-xs font-medium uppercase tracking-wide text-black/50">
                      Cryptocurrency
                    </label>

                    <Select value={selectedSymbol} onValueChange={onCurrencyChange}>
                      <SelectTrigger
                        className="
              !h-12 w-full rounded-xl border-black/10 bg-white px-4
              shadow-sm transition
              hover:border-black/20 hover:shadow-md
              focus:ring-0 focus-visible:ring-0
            "
                      >
                        <SelectValue placeholder="Select cryptocurrency" />
                      </SelectTrigger>

                      <SelectContent className="rounded-xl border-black/10 bg-white shadow-2xl">
                        <SelectGroup>
                          {availableCryptos.map((crypto) => (
                            <SelectItem
                              key={crypto.symbol}
                              value={crypto.symbol}
                              className="rounded-lg"
                            >
                              <div className="flex items-center justify-between gap-6">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.06] text-xs font-semibold">
                                    {crypto.symbol.slice(0, 2)}
                                  </div>
                                  <div className="leading-tight text-left">
                                    <div className="font-medium">{crypto.name}</div>
                                    <div className="text-xs text-black/50">{crypto.symbol}</div>
                                  </div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {selectedCurrency && (
                      <div className="text-xs text-black/45">
                        Available networks: {Object.keys(selectedCurrency.networks).length}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="font-general-sans text-xs font-medium uppercase tracking-wide text-black/50">
                      Network
                    </label>

                    <Select
                      value={selectedNetworkKey}
                      onValueChange={setSelectedNetworkKey}
                      disabled={!selectedCurrency}
                    >
                      <SelectTrigger
                        className="
              !h-12 w-full rounded-xl border-black/10 bg-white px-4
              shadow-sm transition
              hover:border-black/20 hover:shadow-md
              disabled:cursor-not-allowed disabled:opacity-50
              focus:ring-0 focus-visible:ring-0
            "
                      >
                        <SelectValue placeholder={selectedCurrency ? "Select network" : "Select cryptocurrency first"} />
                      </SelectTrigger>

                      <SelectContent className="rounded-xl border-black/10 bg-white shadow-2xl">
                        <SelectGroup>
                          {selectedCurrency &&
                            Object.entries(selectedCurrency.networks).map(([key, net]) => (
                              <SelectItem key={key} value={key} className="rounded-lg">
                                <div className="flex w-full items-center justify-between gap-6 text-left">
                                  <div className="leading-tight text-left">
                                    <div className="font-medium text-left">{net.name}</div>
                                    <div className="text-xs text-black/50 text-left">{net.network}</div>
                                  </div>

                                  <div className="text-right text-xs text-black/55 text-left">
                                    <div className="text-left">Fee: {net.withdraw_fee}</div>
                                    <div className="text-left">Conf: {net.required_confirmations}</div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>


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
