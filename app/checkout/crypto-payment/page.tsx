"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink, Clock, Bitcoin } from "lucide-react";
import Image from "next/image";

const CRYPTO_NAMES: { [key: string]: string } = {
  ETH: "ETH",
  ETH_BASE: "ETH (Base)",
  BTC: "BTC",
  LTC: "LTC",
  DASH: "DASH",
  TZEC: "ZEC",
  DOGE: "DOGE",
  BCH: "BCH",
  XMR: "XMR",
  USDT: "USDT (ERC-20)",
  USDC: "USDC (ERC-20)",
  USDC_BASE: "USDC (Base)",
  SHIB: "SHIB",
  APE: "APE",
  BTT_TRX: "BTT (TRC-20)",
  USDT_TRX: "USDT (TRC-20)",
  TRX: "TRX",
  BNB: "BNB",
  BUSD: "BUSD (BEP-20)",
  USDT_BSC: "USDT (BEP-20)",
  USDС_BSC: "USDC (BEP-20)",
  LB: "LB (BEP-20)",
  ETC: "ETC",
  TON: "TON",
  USDT_TON: "USDT (TON)",
  SOL: "SOL",
  USDT_SOL: "USDT (SPL)",
  USDC_SOL: "USDC (SPL)",
};

const NETWORK_NAMES: { [key: string]: string } = {
  ETH: "Ethereum",
  ETH_BASE: "Base Network",
  BTC: "Bitcoin",
  LTC: "Litecoin",
  DASH: "Dash",
  TZEC: "Zcash",
  DOGE: "Dogecoin",
  BCH: "Bitcoin Cash",
  XMR: "Monero",
  USDT: "Ethereum (ERC-20)",
  USDC: "Ethereum (ERC-20)",
  USDC_BASE: "Base Network",
  SHIB: "Ethereum (ERC-20)",
  APE: "Ethereum (ERC-20)",
  BTT_TRX: "Tron (TRC-20)",
  USDT_TRX: "Tron (TRC-20)",
  TRX: "Tron",
  BNB: "BSC",
  BUSD: "BSC (BEP-20)",
  USDT_BSC: "BSC (BEP-20)",
  USDС_BSC: "BSC (BEP-20)",
  LB: "BSC (BEP-20)",
  ETC: "Ethereum Classic",
  TON: "TON Network",
  USDT_TON: "TON Network",
  SOL: "Solana",
  USDT_SOL: "Solana (SPL)",
  USDC_SOL: "Solana (SPL)",
};

function CryptoPaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentData, setPaymentData] = useState<any>(null);
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [status, setStatus] = useState<string>("pending");

  const getCryptoName = (code: string) => {
    return CRYPTO_NAMES[code] || code;
  };

  const getNetworkName = (code: string) => {
    return NETWORK_NAMES[code] || code;
  };

  useEffect(() => {
    if (
      paymentData &&
      (paymentData.status === "completed" || paymentData.status === "paid")
    ) {
      const timeout = setTimeout(() => {
        if (paymentData.orderId && paymentData.accessToken) {
          router.push(
            `/orders/${paymentData.orderId}?token=${paymentData.accessToken}`
          );
        } else {
          router.push("/checkout/success");
        }
      }, 2000); // 2 секунды задержка для UX
      return () => clearTimeout(timeout);
    }
  }, [paymentData, router]);

  const fetchPaymentData = () => {
    const txnId = searchParams.get("txn_id");
    if (!txnId) {
      router.push("/");
      return;
    }
    fetch(`http://localhost:5000/plisio/invoice/${txnId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch payment data");
        return res.json();
      })
      .then((data) => {
        setPaymentData(data);
        setStatus(data.status);

        const expiryTime = data.expire_utc * 1000;
        const now = Date.now();
        const diff = Math.floor((expiryTime - now) / 1000);
        setTimeLeft(diff > 0 ? diff : 0);
      })
      .catch((error) => {
        console.error("Failed to fetch payment data:", error);
        router.push("/checkout/crypto-failed");
      });
  };

  useEffect(() => {
    fetchPaymentData();
  }, [searchParams, router]);

  useEffect(() => {
    if (!paymentData) return;

    if (
      ["completed", "paid", "expired", "cancelled", "error"].includes(
        paymentData.status
      )
    )
      return;
    const interval = setInterval(() => {
      fetchPaymentData();
    }, 10000); // 10 секунд
    return () => clearInterval(interval);
  }, [paymentData]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [field]: true });
    setTimeout(() => {
      setCopied({ ...copied, [field]: false });
    }, 2000);
  };

  if (!paymentData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-black"></div>
          <p className="font-general-sans text-black/60">Loading payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-black p-4">
              <Bitcoin className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="mb-2 font-satoshi text-4xl font-bold text-black">
            Complete Payment
          </h1>
          <p className="font-general-sans text-lg text-black/60">
            Send exact amount to the address below
          </p>
        </div>

        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-blue-500 p-2">
              <Bitcoin className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-satoshi text-sm font-bold text-blue-900">
                Network: {getNetworkName(paymentData.currency)}
              </p>
              <p className="font-general-sans text-xs text-blue-700">
                Make sure to send from the correct network
              </p>
            </div>
          </div>
        </div>

        {timeLeft > 0 ? (
          <div className="mb-6 rounded-xl border border-black/10 bg-white p-6 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <Clock className="h-5 w-5 text-black/70" />
              <p className="font-satoshi text-sm font-bold uppercase tracking-wide text-black/70">
                Time Remaining
              </p>
            </div>
            <p className="font-mono text-4xl font-bold text-black">
              {formatTime(timeLeft)}
            </p>
          </div>
        ) : (
          <div className="mb-6 rounded-xl border border-black/10 bg-white p-6 text-center">
            <p className="font-satoshi text-lg font-bold text-black">
              Payment Expired
            </p>
            <p className="mt-2 font-general-sans text-sm text-black/60">
              Please create a new payment request
            </p>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-xl">
            <h2 className="mb-4 text-center font-satoshi text-xl font-bold">
              Scan QR Code
            </h2>
            <div className="mb-4 flex justify-center">
              <div className="rounded-xl border-4 border-black/10 bg-white p-4">
                <Image
                  src={paymentData.qr_code}
                  alt="Payment QR Code"
                  width={256}
                  height={256}
                  className="h-64 w-64"
                />
              </div>
            </div>
            <p className="text-center font-general-sans text-sm text-black/60">
              Scan with your crypto wallet
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl">
              <p className="mb-2 font-satoshi text-sm font-bold uppercase tracking-wide text-black/70">
                Wallet Address
              </p>
              <div className="mb-3 break-all rounded-lg bg-black/5 p-3 font-mono text-sm font-bold">
                {paymentData.wallet_hash}
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full gap-2"
                onClick={() =>
                  copyToClipboard(paymentData.wallet_hash, "address")
                }
              >
                {copied.address ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Address
                  </>
                )}
              </Button>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl">
              <p className="mb-2 font-satoshi text-sm font-bold uppercase tracking-wide text-black/70">
                Amount to Send
              </p>
              <p className="mb-1 font-mono text-3xl font-bold text-black">
                {paymentData.invoice_total_sum}{" "}
                {getCryptoName(paymentData.currency)}
              </p>
              <Button
                size="sm"
                variant="outline"
                className="w-full gap-2 mt-3"
                onClick={() =>
                  copyToClipboard(paymentData.invoice_total_sum, "amount")
                }
              >
                {copied.amount ? (
                  <>
                    <Check className="h-4 w-4" />
                    Amount Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Amount
                  </>
                )}
              </Button>
              <div className="mt-4 space-y-1 border-t border-black/10 pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-black/60">Invoice Amount:</span>
                  <span className="font-semibold">
                    {paymentData.invoice_sum}{" "}
                    {getCryptoName(paymentData.currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">Service Fee:</span>
                  <span className="font-semibold">
                    {paymentData.invoice_commission}{" "}
                    {getCryptoName(paymentData.currency)}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl">
              <p className="mb-2 font-satoshi text-sm font-bold uppercase tracking-wide text-black/70">
                Payment Status
              </p>

              {status === "completed" || status === "paid" ? (
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-500 p-1">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    Payment Confirmed
                  </p>
                </div>
              ) : status === "pending" || status === "pending internal" ? (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <p className="text-xl font-bold text-blue-600">
                      Payment Detected!
                    </p>
                  </div>
                  <p className="text-sm text-black/60">
                    Waiting for confirmations...
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                    <p className="text-2xl font-bold text-black">
                      Awaiting Payment
                    </p>
                  </div>
                  <p className="text-sm text-black/60">
                    Send crypto to the address above
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-xl">
          <h3 className="mb-4 font-satoshi text-xl font-bold">
            Payment Instructions
          </h3>
          <div className="space-y-3 font-general-sans text-sm text-black/70">
            <div className="flex gap-3">
              <span className="font-bold text-black">1.</span>
              <p>
                Send{" "}
                <strong>
                  exactly {paymentData.invoice_total_sum}{" "}
                  {getCryptoName(paymentData.currency)}
                </strong>{" "}
                to the address above
              </p>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-black">2.</span>
              <p>Do not close this page until payment is confirmed</p>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-black">3.</span>
              <p>Payment confirmation may take a few minutes</p>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-black">4.</span>
              <p>
                You will receive email confirmation once payment is processed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CryptoPaymentPage() {
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
      <CryptoPaymentContent />
    </Suspense>
  );
}
