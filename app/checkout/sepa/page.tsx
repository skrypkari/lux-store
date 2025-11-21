"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy, Check, Upload, FileText, AlertCircle } from "lucide-react";
import Image from "next/image";

interface SepaBankDetails {
  iban: string;
  bic_swift: string;
  accountName: string;
  bankName: string;
  bankAddress: string;
}

interface OrderInfo {
  id: string;
  total: number;
}

async function compressImage(file: File): Promise<File> {
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
          0.85 // Quality
        );
      };
    };
    reader.onerror = (error) => reject(error);
  });
}

function SepaPaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [bankDetails, setBankDetails] = useState<SepaBankDetails | null>(null);
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBankDetails();
    if (orderId) {
      fetchOrderInfo();
    }
  }, [orderId]);

  const fetchBankDetails = async () => {
    try {
      const response = await fetch("https://api.lux-store.eu/sepa/details");
      const data = await response.json();
      setBankDetails(data);
    } catch (err) {
      setError("Failed to load bank details");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderInfo = async () => {
    try {
      const response = await fetch(
        `https://api.lux-store.eu/orders/${orderId}/cointopay-status`
      );
      const data = await response.json();
      setOrderInfo({
        id: data.id,
        total: data.total,
      });
    } catch (err) {
      console.error("Error fetching order info:", err);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [field]: true });
    setTimeout(() => {
      setCopied({ ...copied, [field]: false });
    }, 2000);
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
      setError("Please upload a JPEG, JPG, PNG, or PDF file");
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
          setError("Failed to compress image");
          setUploading(false);
          return;
        }
      }

      setSelectedFile(fileToUpload);

      await uploadFile(fileToUpload);
    } catch (err) {
      setError("Failed to process file");
      setUploading(false);
    }
  };

  const uploadFile = async (file: File) => {
    if (!orderId) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `https://api.lux-store.eu/sepa/upload-proof/${orderId}`,
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
      }, 2000);
    } catch (err) {
      setError("Failed to upload payment proof. Please try again.");
      setSelectedFile(null);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading bank details...</p>
      </div>
    );
  }

  if (!bankDetails) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-red-500">Failed to load bank details</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="font-editorial text-4xl mb-8">SEPA Instant Transfer</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Bank Transfer Details</CardTitle>
          <CardDescription>
            Please transfer the exact order amount to the following bank account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {orderInfo && (
            <div className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Transfer Amount</p>
              <p className="text-4xl font-bold text-amber-900">
                €{orderInfo.total.toFixed(2)}{" "}
                <span className="text-2xl">EUR</span>
              </p>
            </div>
          )}

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">IBAN</p>
              <p className="font-mono font-bold">{bankDetails.iban}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(bankDetails.iban, "iban")}
            >
              {copied.iban ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">BIC/SWIFT</p>
              <p className="font-mono font-bold">{bankDetails.bic_swift}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(bankDetails.bic_swift, "bic")}
            >
              {copied.bic ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Account Name</p>
            <p className="font-bold">{bankDetails.accountName}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Bank Name</p>
            <p className="font-bold">{bankDetails.bankName}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Bank Address</p>
            <p>{bankDetails.bankAddress}</p>
          </div>

          <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-amber-900 mb-1">
                  Important: Payment Reference
                </p>
                <p className="font-mono font-bold text-lg mb-2">{orderId}</p>
                <p className="text-sm text-amber-800">
                  Please use this order ID as your payment reference. Do NOT
                  change or modify it.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => orderId && copyToClipboard(orderId, "reference")}
              >
                {copied.reference ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upload Payment Proof</CardTitle>
          <CardDescription>
            After completing the transfer, please upload a screenshot or PDF of
            your payment confirmation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileSelect}
                className="hidden"
              />

              {!selectedFile ? (
                <div>
                  <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="mb-2">Click to upload payment proof</p>
                  <p className="text-sm text-gray-500">
                    JPEG, JPG, PNG, or PDF (max 10MB)
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Select File
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                  <p className="font-medium">
                    Uploading {selectedFile.name}...
                  </p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {uploadSuccess && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 text-sm">
                  ✓ Payment proof uploaded successfully! Redirecting...
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SepaPaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Loading...</p>
        </div>
      }
    >
      <SepaPaymentContent />
    </Suspense>
  );
}
