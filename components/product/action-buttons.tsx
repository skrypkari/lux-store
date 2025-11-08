"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Share2, Check, Copy, Twitter, Facebook, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/contexts/cart-context";

interface ActionButtonsProps {
  inStock: boolean;
  product?: {
    id: number;
    name: string;
    brand: string;
    price: number;
    image: string;
  };
}

export default function ActionButtons({ inStock, product }: ActionButtonsProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAddToCart = async () => {
    if (!inStock) return;
    
    setIsAdding(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Add to cart with product details or default
    if (product) {
      addToCart({
        ...product,
        inStock,
      });
    } else {
      addToCart({
        id: 1,
        name: "Classic Flap Bag",
        brand: "Chanel",
        price: 8500,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
        inStock: true,
      });
    }
    
    setIsAdding(false);
    setIsAdded(true);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      }).catch(() => {
        // If native share fails, show our dialog
        setShowShareDialog(true);
      });
    } else {
      setShowShareDialog(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareToSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      email: `mailto:?subject=${title}&body=Check out this luxury item: ${url}`,
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  return (
    <>
      <div className="space-y-3">
        <Button
          size="lg"
          className="w-full text-base font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          disabled={!inStock || isAdding || isAdded}
          onClick={handleAddToCart}
        >
          {isAdding ? (
            <>
              <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Adding...
            </>
          ) : isAdded ? (
            <>
              <Check className="mr-2 h-5 w-5 animate-in zoom-in duration-300" />
              Added to Cart!
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          onClick={handleShare}
        >
          <Share2 className="mr-2 h-5 w-5" />
          Share
        </Button>
      </div>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share this product</DialogTitle>
            <DialogDescription>
              Share this luxury item with your friends and family
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Social Share Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-blue-50 hover:border-blue-500 transition-all"
                onClick={() => shareToSocial("twitter")}
              >
                <Twitter className="h-5 w-5 text-blue-400" />
                <span className="text-xs">Twitter</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-blue-50 hover:border-blue-600 transition-all"
                onClick={() => shareToSocial("facebook")}
              >
                <Facebook className="h-5 w-5 text-blue-600" />
                <span className="text-xs">Facebook</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-gray-50 hover:border-gray-600 transition-all"
                onClick={() => shareToSocial("email")}
              >
                <Mail className="h-5 w-5 text-gray-600" />
                <span className="text-xs">Email</span>
              </Button>
            </div>

            {/* Copy Link */}
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded-lg border bg-muted px-3 py-2 text-sm truncate">
                {window.location.href}
              </div>
              <Button
                size="sm"
                variant={copied ? "default" : "outline"}
                className="flex-shrink-0 transition-all"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1 animate-in zoom-in duration-300" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
