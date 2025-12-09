"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy, Check, ArrowLeft, Clock, Building2 } from "lucide-react";
import Link from "next/link";

function TurkeyIBANContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [copied, setCopied] = useState<string | null>(null);
  const [bankDetails, setBankDetails] = useState<{
    iban: string;
    receiver: string;
    processingTime: string;
    reference: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://id.lux-store.eu/tr.php")
      .then((res) => res.json())
      .then((data) => {
        setBankDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch bank details:", err);
        setLoading(false);
      });
  }, []);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center py-20">
            <p className="text-muted-foreground">Ödeme bilgileri yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!bankDetails || !bankDetails.iban) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-xl text-center">
            <h1 className="text-2xl font-bold mb-4">Ödeme Yöntemi Mevcut Değil</h1>
            <p className="text-muted-foreground mb-6">
              Türkiye IBAN transferi şu anda mevcut değil. Lütfen başka bir ödeme yöntemi seçin.
            </p>
            <Link href="/checkout">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Ödeme Sayfasına Dön
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const reference = bankDetails.reference || orderId || "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-12">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-8">
          <Link href="/orders" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Siparişlerime Dön
          </Link>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-xl">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">IBAN Transferi</h1>
            <p className="text-muted-foreground">
              Lütfen tam tutarı aşağıdaki banka hesabına aktarın
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-black/10 bg-gradient-to-br from-slate-50 to-slate-100/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  IBAN Numarası
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(bankDetails.iban, "iban")}
                  className="h-8"
                >
                  {copied === "iban" ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xl font-mono font-bold break-all">
                {bankDetails.iban}
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    Alıcı Adı
                  </p>
                  <p className="text-lg font-semibold">
                    {bankDetails.receiver}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(bankDetails.receiver, "receiver")}
                  className="h-8"
                >
                  {copied === "receiver" ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <Separator />

              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    Referans / Sipariş No
                  </p>
                  <p className="text-lg font-mono font-semibold">
                    {reference}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(reference, "reference")}
                  className="h-8"
                >
                  {copied === "reference" ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <Separator />

              <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">
                    İşlem Süresi
                  </p>
                  <p className="text-sm text-blue-700">
                    {bankDetails.processingTime}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-xl bg-amber-50 border border-amber-200">
            <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Önemli Talimatlar
            </h3>
            <ul className="space-y-2 text-sm text-amber-800">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>Lütfen transfer açıklamasına referans numarasını ekleyin</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>Sipariş onayınızda gösterilen tam tutarı transfer edin</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>Ödemenizi aldığımızda siparişiniz işleme alınacaktır</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>Ödeme doğrulandığında e-posta onayı alacaksınız</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 flex gap-4">
            <Link href="/orders" className="flex-1">
              <Button variant="outline" size="lg" className="w-full">
                Siparişlerimi Görüntüle
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button size="lg" className="w-full">
                Ana Sayfaya Dön
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TurkeyIBANPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center py-20">
            <p className="text-muted-foreground">Yükleniyor...</p>
          </div>
        </div>
      </div>
    }>
      <TurkeyIBANContent />
    </Suspense>
  );
}
