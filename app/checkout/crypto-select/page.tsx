"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Bitcoin, ArrowLeft, Loader2, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


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

const cryptoLogos: Record<string, string> = {
  BTC: "/bitcoin.svg",
  ETH: "/ethereum.svg",
  USDT: "/tether.svg",
  USDC: "/usd-coin.svg",
  BNB: "/bnb.svg",
  DOGE: "/dogecoin.svg",
  POL: "/polygon.svg",
  LTC: "/litecoin.svg",
  SOL: "/solana.svg",
  TRX: "/tron.svg",
  SHIB: "/shiba-inu.svg",
  TON: "/ton.svg",
  XMR: "/monero.svg",
  DAI: "/dai.svg",
  BCH: "/bitcoin-cash.svg",
  NOT: "/notcoin.svg",
  DOGS: "/dogs.svg",
  XRP: "/ripple.svg",
};

interface CryptoOption {
  value: string; 
  cryptoSymbol: string; 
  cryptoName: string; 
  networkKey: string; 
  networkName: string; 
  network: Network;
  displayLabel: string; 
}

const formatFee = (fee: number): string => {
  if (fee === 0) return "0";
  if (fee < 0.00001) return fee.toFixed(8).replace(/\.?0+$/, "");
  if (fee < 0.01) return fee.toFixed(6).replace(/\.?0+$/, "");
  if (fee < 1) return fee.toFixed(4).replace(/\.?0+$/, "");
  return fee.toFixed(2).replace(/\.?0+$/, "");
};

function CryptoSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(true);
  const [availableCryptos, setAvailableCryptos] = useState<Currency[]>([]);
  const [cryptoOptions, setCryptoOptions] = useState<CryptoOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<CryptoOption | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();


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

        const options: CryptoOption[] = [];
        cryptos.forEach((crypto) => {
          Object.entries(crypto.networks).forEach(([networkKey, network]) => {
            options.push({
              value: `${crypto.symbol}-${networkKey}`,
              cryptoSymbol: crypto.symbol,
              cryptoName: crypto.name,
              networkKey: networkKey,
              networkName: network.name,
              network: network,
              displayLabel: `${crypto.symbol} (${network.name})`,
            });
          });
        });
        setCryptoOptions(options);
      } catch (error) {
        console.error("Error fetching cryptocurrencies:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAvailableCryptos();
  }, []);

  const handleSelectOption = (option: CryptoOption) => {
    setSelectedOption(option);
    setOpen(false);
  };

  const handleContinue = async () => {
    if (!selectedOption) {
      toast({
        title: "Please select a payment method",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`https://api.lux-store.eu/oxapay/create-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderId,
          cryptocurrency: selectedOption.cryptoSymbol,
          network: selectedOption.networkKey,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        toast({
          title: "Payment creation failed",
          description: result.message || "Please try again",
          variant: "destructive",
        });
        return;
      }

      // Build URL with all payment data
      const params = new URLSearchParams({
        orderId: orderId,
        trackId: result.data.track_id,
        address: result.data.address,
        amount: result.data.amount.toString(),
        currency: result.data.currency,
        network: result.data.network,
        expiredAt: result.data.expired_at.toString(),
      });

      router.push(`/checkout/crypto-payment?${params.toString()}`);
    } catch (error) {
      console.error('Payment creation error:', error);
      toast({
        title: "Payment creation failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

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
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2 className="font-satoshi text-xl font-semibold tracking-tight">Choose Payment Method</h2>
                  <p className="mt-1 font-general-sans text-sm text-black/50">
                    Select cryptocurrency and network
                  </p>
                </div>
                <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-black/60">
                  Secure checkout
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-general-sans text-xs font-medium uppercase tracking-wide text-black/50">
                  Payment Currency
                </label>

                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between h-14 rounded-xl border-black/10 bg-white px-4 shadow-sm hover:border-black/20 hover:bg-white hover:shadow-md"
                    >
                      {selectedOption ? (
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center">
                            <img 
                              src={cryptoLogos[selectedOption.cryptoSymbol] || "/bitcoin.svg"} 
                              alt={selectedOption.cryptoSymbol}
                              className="h-full w-full object-contain rounded-md"
                            />
                          </div>
                          <div className="text-left">
                            <div className="font-satoshi font-semibold text-sm">
                              {selectedOption.displayLabel}
                            </div>
                            <div className="font-general-sans text-xs text-black/50">
                              Fee: {formatFee(selectedOption.network.withdraw_fee)}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span className="font-general-sans text-black/40">Select cryptocurrency...</span>
                      )}
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                    <Command>
                      <CommandInput 
                        placeholder="Search cryptocurrency..." 
                        className="font-general-sans"
                      />
                      <CommandEmpty className="py-6 text-center text-sm font-general-sans text-black/50">
                        No cryptocurrency found.
                      </CommandEmpty>
                      <CommandGroup className="max-h-[300px] overflow-auto">
                        {cryptoOptions.map((option) => (
                          <CommandItem
                            key={option.value}
                            value={`${option.cryptoSymbol} ${option.cryptoName} ${option.networkName} ${option.network.network}`}
                            onSelect={() => handleSelectOption(option)}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center gap-3 w-full">
                              <div className="flex h-8 w-8 items-center justify-center shrink-0">
                                <img 
                                  src={cryptoLogos[option.cryptoSymbol] || "/bitcoin.svg"} 
                                  alt={option.cryptoSymbol}
                                  className="h-full w-full object-contain rounded-md"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-satoshi font-semibold text-sm leading-tight">
                                  {option.displayLabel}
                                </div>
                                <div className="font-general-sans text-xs text-black/50 leading-tight mt-0.5">
                                  {option.network.network}
                                </div>
                              </div>
                              <div className="text-xs text-black/50 font-general-sans">
                                Fee: {formatFee(option.network.withdraw_fee)}
                              </div>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <Button
                onClick={handleContinue}
                disabled={!selectedOption}
                className="w-full h-12 rounded-xl bg-black text-white hover:bg-black/90 font-satoshi font-semibold"
              >
                Continue to Payment
              </Button>
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
