"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check, Upload, FileText, AlertCircle } from "lucide-react";

interface FpBankDetails {
  accountNumber: string;
  sortCode: string;
  accountName: string;
  bankName: string;
  bankAddress: string;
}

interface OrderInfo {
  id: string;
  total: number;
}

// Client-side image compression
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

        // Max dimensions
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

export default function FpPaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [bankDetails, setBankDetails] = useState<FpBankDetails | null>(null);
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [gbpAmount, setGbpAmount] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
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

  useEffect(() => {
    if (orderInfo) {
      convertToGBP(orderInfo.total);
    }
  }, [orderInfo]);

  const fetchBankDetails = async () => {
    try {
      const response = await fetch("https://api.lux-store.eu/fp/details");
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
      const response = await fetch(`https://api.lux-store.eu/orders/${orderId}/cointopay-status`);
      const data = await response.json();
      setOrderInfo({
        id: data.id,
        total: data.total,
      });
    } catch (err) {
      console.error("Error fetching order info:", err);
    }
  };

  const convertToGBP = async (eurAmount: number) => {
    try {
      // Using exchangerate-api.com free API
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
      const data = await response.json();
      const rate = data.rates.GBP;
      setExchangeRate(rate);
      setGbpAmount(eurAmount * rate);
    } catch (err) {
      console.error("Error converting to GBP:", err);
      // Fallback rate if API fails
      const fallbackRate = 0.83;
      setExchangeRate(fallbackRate);
      setGbpAmount(eurAmount * fallbackRate);
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

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPEG, JPG, PNG, or PDF file");
      return;
    }

    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File size must be less than 10MB");
      return;
    }

    setError("");

    // Compress if it's an image
    if (file.type.startsWith("image/")) {
      try {
        const compressed = await compressImage(file);
        setSelectedFile(compressed);
      } catch (err) {
        console.error("Compression error:", err);
        setSelectedFile(file);
      }
    } else {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !orderId) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(`https://api.lux-store.eu/fp/upload-proof/${orderId}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      setUploadSuccess(true);
      setTimeout(() => {
        router.push(`/orders/pending?order_number=${orderId}`);
      }, 1500);
    } catch (err) {
      setError("Failed to upload payment proof. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (loading || !bankDetails) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading bank details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (uploadSuccess) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Payment Proof Uploaded!</h2>
              <p className="text-gray-600">Redirecting to order status page...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="font-editorial text-4xl mb-8">Faster Payments</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Bank Transfer Details - United Kingdom</CardTitle>
          <CardDescription>
            Please transfer the exact order amount in GBP to the following bank account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Transfer Amount in GBP */}
          {orderInfo && gbpAmount !== null && (
            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Transfer Amount</p>
              <p className="text-4xl font-bold text-green-900">
                £{gbpAmount.toFixed(2)} <span className="text-2xl">GBP</span>
              </p>
              {exchangeRate && (
                <p className="text-sm text-gray-600 mt-2">
                  Original: €{orderInfo.total.toFixed(2)} EUR (Rate: 1 EUR = £{exchangeRate.toFixed(4)} GBP)
                </p>
              )}
            </div>
          )}

          {/* Account Name */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Account Name</p>
            <p className="font-bold">{bankDetails.accountName}</p>
          </div>

          {/* Sort Code */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Sort Code</p>
              <p className="font-mono font-bold">{bankDetails.sortCode}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(bankDetails.sortCode, "sortCode")}
            >
              {copied.sortCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          {/* Account Number */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Account Number</p>
              <p className="font-mono font-bold">{bankDetails.accountNumber}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(bankDetails.accountNumber, "account")}
            >
              {copied.account ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          {/* Bank Name */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Bank Name</p>
            <p className="font-bold">{bankDetails.bankName}</p>
          </div>

          {/* Bank Address */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Bank Address</p>
            <p>{bankDetails.bankAddress}</p>
          </div>

          {/* Reference */}
          <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-amber-900 mb-1">Important: Payment Reference</p>
                <p className="font-mono font-bold text-lg mb-2">{orderId}</p>
                <p className="text-sm text-amber-800">
                  Please use this order ID as your payment reference. Do NOT change or modify it.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => orderId && copyToClipboard(orderId, "reference")}
              >
                {copied.reference ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Payment Proof */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Payment Proof</CardTitle>
          <CardDescription>
            After completing the transfer, please upload a screenshot or PDF of the payment confirmation
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
                <div className="space-y-4">
                  <FileText className="h-12 w-12 text-green-500 mx-auto" />
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                    >
                      Choose Different File
                    </Button>
                    <Button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="bg-black text-white hover:bg-gray-800"
                    >
                      {uploading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Proof
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                    >
                      Select File
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Accepted formats: JPEG, JPG, PNG, PDF (Max 10MB)
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
  );
}
