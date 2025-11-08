"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";

export default function CartButton() {
  const { cartCount } = useCart();

  return (
    <Button variant="ghost" size="icon" asChild className="relative group">
      <Link href="/cart" aria-label="Shopping cart">
        <ShoppingBag className="h-5 w-5 transition-transform group-hover:scale-110" />
        {cartCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-in zoom-in duration-300">
            {cartCount}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
