"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { ShoppingBag } from "lucide-react";
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
  const { addToCart, cartItems, getMaxQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);


  const cartItem = cartItems.find((i) => {
    if (i.id !== product.id) return false;
    const iOptionsStr = JSON.stringify(i.options || {});
    const itemOptionsStr = JSON.stringify(product.options || {});
    return iOptionsStr === itemOptionsStr;
  });

  const currentQuantityInCart = cartItem?.quantity || 0;
  const maxQuantity = getMaxQuantity(product.price);
  const remainingSpace = maxQuantity - currentQuantityInCart;
  const isMaxReached = remainingSpace <= 0;

  const handleAddToCart = () => {
    const remainingSpace = maxQuantity - currentQuantityInCart;
    if (remainingSpace <= 0) return;
    

    const quantityToAdd = Math.min(quantity, remainingSpace);
    addToCart({ ...product, inStock }, quantityToAdd);
  };

  const handleBuyNow = () => {
    const remainingSpace = maxQuantity - currentQuantityInCart;
    if (remainingSpace <= 0) return;
    
    const quantityToAdd = Math.min(quantity, remainingSpace);
    addToCart({ ...product, inStock }, quantityToAdd);
    window.location.href = "/cart";
  };

  return (
    <div className="space-y-4">
      
      <QuantitySelector 
        inStock={inStock} 
        quantity={quantity}
        onQuantityChange={setQuantity}
        maxAvailable={remainingSpace > 0 ? remainingSpace : 0}
      />

      
      {currentQuantityInCart > 0 && (
        <div className="rounded-lg border border-black/20 bg-black/5 p-3 text-sm">
          <p className="font-medium text-black">
            {currentQuantityInCart} of {maxQuantity} in cart
          </p>
          {isMaxReached && (
            <p className="mt-1 text-xs text-black/70">
              Maximum quantity reached for this price range
            </p>
          )}
        </div>
      )}

      
      <div className="space-y-3">
        <Button
          size="lg"
          className="w-full text-base font-semibold"
          disabled={!inStock || disabled || isMaxReached}
          onClick={handleAddToCart}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          {!inStock ? "Out of Stock" : isMaxReached ? "Max Quantity Reached" : "Add to Cart"}
        </Button>

        {inStock && !isMaxReached && (
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
      </div>

      {disabled && (
        <p className="text-sm text-destructive">
          Please select all required options before adding to cart.
        </p>
      )}
    </div>
  );
}
