"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Star, Heart, Eye, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  subtitle?: string;
  sku?: string;
  base_price?: number;
  currency: string;
  main_image?: string;
  slug_without_id?: string;
}

interface BestSellerProduct extends Product {
  brand: string;
  rating: number;
  reviews: number;
  badge: string;
  badgeColor: string;
  image: string;
  price: number;
  originalPrice?: number;
}

const defaultProducts = [
  {
    id: 1,
    name: "Hermès Birkin 30",
    brand: "HERMÈS",
    sku: "H076099CK89",
    price: 15750,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2035&auto=format&fit=crop",
    rating: 5.0,
    reviews: 127,
    badge: "Best Seller",
    badgeColor: "gold",
  },
  {
    id: 2,
    name: "Rolex Submariner",
    brand: "ROLEX",
    sku: "R124060BL33",
    price: 12500,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop",
    rating: 5.0,
    reviews: 203,
    badge: "Iconic",
    badgeColor: "blue",
  },
  {
    id: 3,
    name: "Cartier Love Bracelet",
    brand: "CARTIER",
    sku: "C850875YG17",
    price: 7850,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    reviews: 156,
    badge: "Trending",
    badgeColor: "red",
  },
  {
    id: 4,
    name: "Chanel Classic Flap",
    brand: "CHANEL",
    sku: "CH1112BK25",
    price: 9800,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=2071&auto=format&fit=crop",
    rating: 5.0,
    reviews: 189,
    badge: "Limited",
    badgeColor: "purple",
  },
  {
    id: 5,
    name: "Gucci Marmont Bag",
    brand: "GUCCI",
    sku: "G443497BK00",
    price: 2850,
    originalPrice: 3200,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop",
    rating: 4.8,
    reviews: 94,
    badge: "Sale",
    badgeColor: "green",
  },
  {
    id: 6,
    name: "Tiffany Diamond Ring",
    brand: "TIFFANY & CO.",
    sku: "T612345PT95",
    price: 18900,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop",
    rating: 5.0,
    reviews: 78,
    badge: "Exclusive",
    badgeColor: "cyan",
  },
  {
    id: 7,
    name: "Louis Vuitton Neverfull",
    brand: "LOUIS VUITTON",
    sku: "LV401042GMMM",
    price: 2100,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    reviews: 312,
    badge: "Popular",
    badgeColor: "orange",
  },
  {
    id: 8,
    name: "Patek Philippe Nautilus",
    brand: "PATEK PHILIPPE",
    sku: "PP5711BL01",
    price: 89500,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=2064&auto=format&fit=crop",
    rating: 5.0,
    reviews: 45,
    badge: "Investment",
    badgeColor: "amber",
  },
];

const badgeStyles: Record<string, string> = {
  gold: "bg-gradient-to-r from-amber-400 to-yellow-600 text-white",
  blue: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
  red: "bg-gradient-to-r from-red-500 to-pink-600 text-white",
  purple: "bg-gradient-to-r from-purple-500 to-violet-600 text-white",
  green: "bg-gradient-to-r from-emerald-500 to-green-600 text-white",
  cyan: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white",
  orange: "bg-gradient-to-r from-orange-500 to-red-500 text-white",
  amber: "bg-gradient-to-r from-amber-600 to-orange-600 text-white",
};

export default function BestSellers() {
  const [products, setProducts] = useState<BestSellerProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/products/random?limit=8")
      .then((res) => res.json())
      .then((data: Product[]) => {
        console.log("Products data:", data);
        if (Array.isArray(data)) {
          // Преобразуем данные из API в формат для отображения
          const displayProducts: BestSellerProduct[] = data.map((product, index) => ({
            ...product,
            brand: extractBrand(product.name),
            rating: 4.8 + Math.random() * 0.2,
            reviews: Math.floor(Math.random() * 200) + 50,
            badge: getBadge(index),
            badgeColor: getBadgeColor(index),
            image: product.main_image || getDefaultImage(),
            price: product.base_price || 0,
            originalPrice: undefined,
          }));
          setProducts(displayProducts);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // Функции для генерации данных
  const extractBrand = (name: string) => {
    const brands = ['HERMÈS', 'CARTIER', 'ROLEX', 'CHANEL', 'GUCCI', 'LOUIS VUITTON'];
    for (const brand of brands) {
      if (name.toUpperCase().includes(brand)) {
        return brand;
      }
    }
    return name.split(' ')[0].toUpperCase();
  };

  const getBadge = (index: number) => {
    const badges = ['Best Seller', 'Trending', 'Limited', 'Popular', 'Iconic', 'Exclusive', 'New', 'Sale'];
    return badges[index % badges.length];
  };

  const getBadgeColor = (index: number) => {
    const colors = ['gold', 'red', 'purple', 'orange', 'blue', 'cyan', 'green', 'amber'];
    return colors[index % colors.length];
  };

  const getDefaultImage = () => {
    return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop';
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-neutral-300" />
            <TrendingUp className="h-5 w-5 text-amber-600" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-neutral-300" />
          </div>
          <h2 className="text-5xl font-bold tracking-tight">
            Best Sellers
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Discover our most coveted pieces, handpicked by connoisseurs worldwide
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-20">
              <p className="text-neutral-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-neutral-600">No products found</p>
            </div>
          ) : (
            products.map((product) => (
            <div
              key={product.id}
              className="group"
            >
              <div className="relative overflow-hidden bg-white border border-neutral-200/60 hover:border-neutral-300 transition-all duration-500 hover:shadow-xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.1]">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                  }} />
                </div>
                
                {/* Image Container */}
                <Link href={`/products/${product.id}`}>
                  <div className="relative h-[420px] overflow-hidden bg-neutral-50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </Link>

                {/* Content */}
                <div className="p-4 space-y-2">
                  {/* Brand & SKU */}
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-semibold tracking-[0.3em] text-neutral-400 uppercase">
                      {product.brand}
                    </p>
                    <p className="text-[9px] font-mono text-neutral-400">
                      SKU: {product.sku}
                    </p>
                  </div>

                  {/* Product Name */}
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-base font-medium text-neutral-900 hover:text-neutral-600 transition-colors min-h-[44px] leading-snug">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating)
                            ? "fill-neutral-900 text-neutral-900"
                            : "fill-neutral-200 text-neutral-200"
                        }`}
                      />
                    ))}
                    <span className="text-[11px] text-neutral-400 ml-1">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 pt-1 pb-2">
                    <span className="text-lg font-semibold text-neutral-900">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-neutral-400 line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 text-xs font-medium tracking-wide"
                      asChild
                    >
                      <Link href={`/products/${product.id}`}>
                        Details
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-neutral-900 text-white hover:bg-neutral-800 transition-all duration-300 text-xs font-medium tracking-wide"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add to cart logic
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-neutral-900 hover:bg-neutral-900 hover:text-white px-8 group"
            asChild
          >
            <Link href="/products">
              View All Products
              <TrendingUp className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
