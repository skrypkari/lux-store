"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink, Clock, Bitcoin } from "lucide-react";
import Image from "next/image";

function CryptoPaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentData, setPaymentData] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [status, setStatus] = useState<string>("pending");

  // Редирект на страницу успеха после подтверждения оплаты
  useEffect(() => {
    if (paymentData && paymentData.status === "completed") {
      const timeout = setTimeout(() => {
        if (paymentData.orderId && paymentData.accessToken) {
          router.push(`/checkout/success?orderId=${encodeURIComponent(paymentData.orderId)}&token=${encodeURIComponent(paymentData.accessToken)}`);
        } else {
          router.push("/checkout/success");
        }
      }, 2000); // 2 секунды задержка для UX
      return () => clearTimeout(timeout);
    }
  }, [paymentData, router]);

  // Функция для загрузки данных платежа
  const fetchPaymentData = () => {
    const txnId = searchParams.get("txn_id");
    if (!txnId) {
      router.push("/");
      return;
    }
    fetch(`https://www.api.lux-store.eu/plisio/invoice/${txnId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch payment data");
        return res.json();
      })
      .then((data) => {
        setPaymentData(data);
        setStatus(data.status);
        // Calculate time left
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

  // Первый fetch при монтировании
  useEffect(() => {
    fetchPaymentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, router]);

  // Polling для обновления статуса и подтверждений
  useEffect(() => {
    if (!paymentData) return;
    // Не опрашивать, если завершён
    if (["completed", "expired", "cancelled", "error"].includes(paymentData.status)) return;
    const interval = setInterval(() => {
      fetchPaymentData();
    }, 10000); // 10 секунд
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentData]);

  // Countdown timer
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-black p-4">
              <Bitcoin className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="mb-2 font-satoshi text-4xl font-bold text-black">Complete Payment</h1>
          <p className="font-general-sans text-lg text-black/60">
            Send exact amount to the address below
          </p>
        </div>

        {/* Timer */}
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
            <p className="font-satoshi text-lg font-bold text-black">Payment Expired</p>
            <p className="mt-2 font-general-sans text-sm text-black/60">
              Please create a new payment request
            </p>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* QR Code */}
          <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-xl">
            <h2 className="mb-4 text-center font-satoshi text-xl font-bold">Scan QR Code</h2>
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

          {/* Payment Details */}
          <div className="space-y-4">
            {/* Wallet Address */}
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
                onClick={() => copyToClipboard(paymentData.wallet_hash)}
              >
                {copied ? (
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

            {/* Amount */}
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl">
              <p className="mb-2 font-satoshi text-sm font-bold uppercase tracking-wide text-black/70">
                Amount to Send
              </p>
              <p className="mb-1 font-mono text-3xl font-bold text-black">
                {paymentData.invoice_total_sum} {paymentData.currency}
              </p>
              <div className="mt-4 space-y-1 border-t border-black/10 pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-black/60">Invoice Amount:</span>
                  <span className="font-semibold">{paymentData.invoice_sum} {paymentData.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">Service Fee:</span>
                  <span className="font-semibold">{paymentData.invoice_commission} {paymentData.currency}</span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xl">
              <p className="mb-2 font-satoshi text-sm font-bold uppercase tracking-wide text-black/70">
                Payment Status
              </p>
              <p className="text-2xl font-bold text-black">
                {status === "completed"
                  ? "✓ Confirmed"
                  : status === "processing"
                  ? "Processing..."
                  : "Awaiting Payment"}
              </p>
              {status === "processing" && paymentData.confirmations !== undefined && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-black/60">Confirmations:</span>
                    <span className="font-bold text-black">
                      {paymentData.confirmations} / {paymentData.expected_confirmations || 1}
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/10">
                    <div 
                      className="h-full bg-black transition-all duration-500"
                      style={{ 
                        width: `${Math.min(100, (paymentData.confirmations / (paymentData.expected_confirmations || 1)) * 100)}%` 
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-xl">
          <h3 className="mb-4 font-satoshi text-xl font-bold">Payment Instructions</h3>
          <div className="space-y-3 font-general-sans text-sm text-black/70">
            <div className="flex gap-3">
              <span className="font-bold text-black">1.</span>
              <p>Send <strong>exactly {paymentData.invoice_total_sum} {paymentData.currency}</strong> to the address above</p>
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
              <p>You will receive email confirmation once payment is processed</p>
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
