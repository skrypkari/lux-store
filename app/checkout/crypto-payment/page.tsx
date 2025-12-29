"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Copy, Check, Clock, Bitcoin } from "lucide-react";
import Image from "next/image";

interface PaymentData {
  track_id: string;
  orderId: string;
  token?: string;
  address: string;
  amount: number;
  currency: string;
  network: string;
  status: string;
  expired_at: number;
  qr_code: string;
  txs?: Array<{
    address?: string;
    amount?: number;
    currency?: string;
    network?: string;
  }>;
}

function CryptoPaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [status, setStatus] = useState<string>("pending");

  useEffect(() => {
    if (paymentData && (paymentData.status === "paid" || paymentData.status === "manual_accept")) {
      const timeout = setTimeout(() => {
        if (paymentData.orderId && paymentData.token) {
          router.push(`/checkout/success?orderId=${paymentData.orderId}&token=${paymentData.token}`);
        } else if (paymentData.orderId) {
          router.push(`/checkout/success?orderId=${paymentData.orderId}`);
        } else {
          router.push("/checkout/crypto-success");
        }
      }, 2000); 
      return () => clearTimeout(timeout);
    }
  }, [paymentData, router]);

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    const token = searchParams.get("token");
    const trackId = searchParams.get("trackId");
    const address = searchParams.get("address");
    const amount = searchParams.get("amount");
    const currency = searchParams.get("currency");
    const network = searchParams.get("network");
    const expiredAt = searchParams.get("expiredAt");    
    if (!orderId || !trackId || !address) {
      router.push("/");
      return;
    }

    setPaymentData({
      track_id: trackId,
      orderId: orderId,
      token: token || undefined,
      address: address,
      amount: parseFloat(amount || '0'),
      currency: currency || '',
      network: network || '',
      status: 'waiting',
      expired_at: parseInt(expiredAt || '0'),
      qr_code: `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(address)}&size=256x256`,
    });
    setStatus('waiting');
    
    const expiryTime = parseInt(expiredAt || '0') * 1000;
    const now = Date.now();
    const diff = Math.floor((expiryTime - now) / 1000);
    setTimeLeft(diff > 0 ? diff : 0);

    fetch(`https://api.lux-store.eu/oxapay/payment/${trackId}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success && result.data) {
          setPaymentData(prev => prev ? ({
            ...prev,
            ...result.data,
            address: address, 
            qr_code: prev.qr_code, 
          }) : null);
          setStatus(result.data.status);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch OxaPay payment:", error);
      });
  }, [searchParams, router]);

  useEffect(() => {
    if (!paymentData) return;

    if (
      ["paid", "manual_accept", "refunded", "expired"].includes(
        paymentData.status?.toLowerCase() || ""
      )
    )
      return;

    const interval = setInterval(() => {
      const trackId = searchParams.get("trackId");
      if (!trackId) return;

      fetch(`https://api.lux-store.eu/oxapay/payment/${trackId}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.success && result.data) {
            setPaymentData(prev => prev ? ({
              ...prev,
              ...result.data,
              orderId: prev.orderId,
              token: prev.token,
              address: prev.address,
              amount: prev.amount,
              currency: prev.currency,
              network: prev.network,
              qr_code: prev.qr_code,
            }) : null);
            setStatus(result.data.status);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch OxaPay payment:", error);
        });
    }, 10000);
    
    return () => clearInterval(interval);
  }, [paymentData, searchParams]);

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
                Network: {paymentData.network}
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
                {paymentData.address}
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full gap-2"
                onClick={() => copyToClipboard(paymentData.address, "address")}
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
                {paymentData.amount}{" "}
                {paymentData.currency?.toUpperCase()}
              </p>
              <Button
                size="sm"
                variant="outline"
                className="w-full gap-2 mt-3"
                onClick={() => copyToClipboard(paymentData.amount.toString(), "amount")}
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
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl">
              <p className="mb-2 font-satoshi text-sm font-bold uppercase tracking-wide text-black/70">
                Payment Status
              </p>

              {status === "paid" || status === "manual_accept" ? (
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-500 p-1">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    Payment Confirmed
                  </p>
                </div>
              ) : status === "paying" ? (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <p className="text-xl font-bold text-blue-600">
                      Payment Detected!
                    </p>
                  </div>
                  <p className="text-sm text-black/60">
                    Processing payment...
                  </p>
                </div>
              ) : status === "underpaid" ? (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-full bg-orange-500 p-1">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-xl font-bold text-orange-600">
                      Underpaid
                    </p>
                  </div>
                  <p className="text-sm text-black/60">
                    Partial payment received. Please send the remaining amount.
                  </p>
                </div>
              ) : status === "refunding" ? (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                    <p className="text-xl font-bold text-purple-600">
                      Refunding
                    </p>
                  </div>
                  <p className="text-sm text-black/60">
                    Refund in progress...
                  </p>
                </div>
              ) : status === "refunded" ? (
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-purple-500 p-1">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-purple-600">
                    Refunded
                  </p>
                </div>
              ) : status === "expired" ? (
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-red-500 p-1">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-red-600">
                    Payment Expired
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
                  exactly {paymentData.amount}{" "}
                  {paymentData.currency?.toUpperCase()}
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
