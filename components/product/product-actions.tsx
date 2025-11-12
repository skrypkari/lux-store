"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { ShoppingBag, Heart, Share2 } from "lucide-react";
import QuantitySelector from "./quantity-selector";

interface ProductActionsProps {
  inStock: boolean;
  product: {
    id: number;
    name: string;
    brand: string;
    price: number;
    image: string;
    options?: Record<string, string>;
  };
  disabled?: boolean;
}

export default function ProductActions({ inStock, product, disabled }: ProductActionsProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({ ...product, inStock });
  };

  const handleBuyNow = () => {
    addToCart({ ...product, inStock });
    window.location.href = "/cart";
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this ${product.brand} product!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-4">
      {/* Quantity */}
      <QuantitySelector 
        inStock={inStock} 
        quantity={quantity}
        onQuantityChange={setQuantity}
      />

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          size="lg"
          className="w-full text-base font-semibold"
          disabled={!inStock || disabled}
          onClick={handleAddToCart}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>

        {inStock && (
          <Button
            size="lg"
            variant="outline"
            className="w-full text-base font-semibold"
            disabled={disabled}
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="lg" disabled={!inStock}>
            <Heart className="mr-2 h-5 w-5" />
            Save
          </Button>
          <Button variant="outline" size="lg" onClick={handleShare}>
            <Share2 className="mr-2 h-5 w-5" />
            Share
          </Button>
        </div>
      </div>

      {disabled && (
        <p className="text-sm text-destructive">
          Please select all required options before adding to cart.
        </p>
      )}
    </div>
  );
}
