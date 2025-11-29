"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  sku?: string;
  base_price: number;
  currency: string;
  slug_without_id?: string;
  slug_with_id?: string;
  main_image?: string;
}

interface RelatedProductsProps {
  currentProductId: string;
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRandomProducts() {
      try {
        const response = await fetch('https://api.lux-store.eu/products/random?limit=8');
        if (response.ok) {
          const data = await response.json();
          // Filter out the current product
          const filtered = data.filter((p: Product) => p.id !== currentProductId);
          setProducts(filtered.slice(0, 8));
        }
      } catch (error) {
        console.error('Failed to fetch random products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRandomProducts();
  }, [currentProductId]);

  const handleAddToCart = (product: Product) => {
    setAddingToCart(product.id);
    addToCart({
      id: parseInt(product.id),
      name: product.name,
      brand: 'Luxury Brand',
      price: product.base_price,
      image: product.main_image || '',
      sku: product.sku,
      inStock: true,
    });
    
    setTimeout(() => {
      setAddingToCart(null);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="border rounded-lg p-8 bg-card">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-muted rounded-lg mb-4" />
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="border rounded-lg p-8 bg-card">
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const slug = product.slug_without_id || product.slug_with_id || '';
          const imageUrl = product.main_image || '/placeholder.jpg';
          
          return (
            <div
              key={product.id}
              className="group border border-neutral-200/60 hover:border-neutral-300 transition-all duration-500 hover:shadow-xl bg-white"
            >
              <Link href={`/products/${slug}`}>
                <div className="relative w-full aspect-square overflow-hidden bg-[#f4f4f4]">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Link>

              <div className="p-4 space-y-2">
                {product.sku && (
                  <p className="text-[9px] font-mono text-neutral-400">
                    SKU: {product.sku}
                  </p>
                )}

                <Link href={`/products/${slug}`}>
                  <h3 className="text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors min-h-[40px] leading-snug line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-baseline gap-2 pt-2">
                  <span className="text-lg font-semibold text-neutral-900">
                    €{product.base_price?.toLocaleString() || '0'}
                  </span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Link href={`/products/${slug}`} className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 text-xs font-medium tracking-wide group/btn"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1.5 transition-transform group-hover/btn:scale-110" />
                      Details
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    className="flex-1 bg-neutral-900 text-white hover:bg-neutral-800 transition-all duration-300 text-xs font-medium tracking-wide relative overflow-hidden group/cart"
                    onClick={() => handleAddToCart(product)}
                    disabled={addingToCart === product.id}
                  >
                    <span className="flex items-center justify-center">
                      {addingToCart === product.id ? (
                        <>
                          <span className="animate-bounce">✓</span>
                          <span className="ml-1">Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5 mr-1.5 transition-transform group-hover/cart:scale-110" />
                          Add
                        </>
                      )}
                    </span>
                    
                    {addingToCart === product.id && (
                      <span className="absolute inset-0 bg-white/20 animate-ping rounded" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

