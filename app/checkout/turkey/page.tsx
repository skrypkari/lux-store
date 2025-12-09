"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy, Check, ArrowLeft, Clock, Building2, Upload, AlertCircle } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const router = useRouter();

  const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = document.createElement("img");
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1920;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = height * (MAX_WIDTH / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = width * (MAX_HEIGHT / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                reject(new Error("Compression failed"));
              }
            },
            "image/jpeg",
            0.85
          );
        };
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      setError("Lütfen JPEG, JPG, PNG veya PDF dosyası yükleyin");
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("Dosya boyutu 10MB'dan küçük olmalıdır");
      return;
    }

    setError("");
    setUploading(true);

    try {
      let fileToUpload = file;

      if (file.type.startsWith("image/")) {
        try {
          fileToUpload = await compressImage(file);
        } catch (err) {
          console.error("Compression error:", err);
          setError("Görüntü sıkıştırılamadı");
          setUploading(false);
          return;
        }
      }

      setSelectedFile(fileToUpload);
      await uploadFile(fileToUpload);
    } catch (err) {
      setError("Dosya işlenemedi");
      setUploading(false);
    }
  };

  const uploadFile = async (file: File) => {
    if (!orderId) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `https://api.lux-store.eu/turkey/upload-proof/${orderId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      setUploadSuccess(true);
      setTimeout(() => {
        router.push(`/orders/pending?order_number=${orderId}`);
      }, 1500);
    } catch (err) {
      setError("Ödeme kanıtı yüklenemedi. Lütfen tekrar deneyin.");
      setSelectedFile(null);
    } finally {
      setUploading(false);
    }
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

  if (uploadSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">
                  Ödeme Kanıtı Yüklendi!
                </h2>
                <p className="text-gray-600">
                  Sipariş durumu sayfasına yönlendiriliyorsunuz...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showUpload) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA] py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => setShowUpload(false)}
              className="inline-flex items-center text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Banka Bilgilerine Dön
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ödeme Kanıtı Yükle</CardTitle>
              <CardDescription>
                Transferi tamamladıktan sonra, lütfen ödeme onayının ekran görüntüsünü veya PDF'sini yükleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,application/pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {selectedFile ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                      <p className="font-medium">
                        {selectedFile.name} yükleniyor...
                      </p>
                      <p className="text-sm text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          variant="outline"
                        >
                          Dosya Seç
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">
                        Kabul edilen formatlar: JPEG, JPG, PNG, PDF (Maksimum 10MB)
                      </p>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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

          <div className="mt-8">
            <Button 
              size="lg" 
              className="w-full"
              onClick={() => setShowUpload(true)}
            >
              Ödeme Kanıtı Yükle
            </Button>
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
