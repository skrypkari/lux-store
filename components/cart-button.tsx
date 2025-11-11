"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

export default function CartButton() {
  const { cartCount } = useCart();

  return (
    <Link href="/cart">
      <button className="flex items-center gap-1.5 px-3 py-1.5 border border-black rounded-full hover:bg-white/40 cursor-pointer transition-colors relative text-sm">
        <ShoppingCart className="h-4 w-4" />
        <span className="font-medium hidden md:flex">Cart</span>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-medium">
            {cartCount}
          </span>
        )}
      </button>
    </Link>
  );
}
