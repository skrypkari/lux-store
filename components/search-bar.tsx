"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface SearchResult {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
}

// Mock data - в реальном проекте это будет API
const mockProducts: SearchResult[] = [
  {
    id: 1,
    name: "Birkin 30 Craie Togo Gold Hardware",
    brand: "Hermès",
    price: 14825,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=90",
    category: "Bags",
  },
  {
    id: 2,
    name: "Kelly 28 Black Box Leather",
    brand: "Hermès",
    price: 12500,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=90",
    category: "Bags",
  },
  {
    id: 3,
    name: "Classic Flap Medium",
    brand: "Chanel",
    price: 8900,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&q=90",
    category: "Bags",
  },
  {
    id: 4,
    name: "Panthère de Cartier Watch",
    brand: "Cartier",
    price: 22000,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=90",
    category: "Watches",
  },
  {
    id: 5,
    name: "Lady Dior Medium",
    brand: "Dior",
    price: 5200,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=90",
    category: "Bags",
  },
];

const recentSearches = ["Hermès Birkin", "Chanel Flap", "Cartier Watch"];
const trendingSearches = ["Birkin 25", "Kelly Bag", "Chanel Classic", "Cartier Love"];

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Search with debounce
  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      // Simulate API call
      const filtered = mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="flex"
        aria-label="Search"
        onClick={() => setIsOpen(true)}
      >
        <Search className="h-5 w-5" />
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in duration-200"
          style={{ top: "80px" }}
        />
      )}

      {/* Search Panel */}
      {isOpen && (
        <div
          ref={searchRef}
          className="fixed left-0 right-0 bg-background border-b shadow-2xl z-50 animate-in slide-in-from-top duration-300"
          style={{ top: "80px" }}
        >
          <div className="container mx-auto px-4 py-6">
            {/* Search Input */}
            <div className="relative max-w-3xl mx-auto mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                autoFocus
                placeholder="Search for luxury items, brands, or categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-14 pl-12 pr-12 text-lg border-2 focus-visible:ring-2 focus-visible:ring-primary"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={handleClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Results Container */}
            <div className="max-w-5xl mx-auto max-h-[calc(100vh-240px)] overflow-y-auto">
              {query.length === 0 ? (
                // No Query - Show Recent & Trending
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Recent Searches */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-semibold text-sm">Recent Searches</h3>
                    </div>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => setQuery(search)}
                          className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted transition-colors text-left group"
                        >
                          <span className="text-sm">{search}</span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trending Searches */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-sm">Trending Now</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => setQuery(search)}
                          className="px-4 py-2 rounded-full border hover:border-primary hover:bg-primary/5 transition-all text-sm"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : isSearching ? (
                // Loading State
                <div className="flex items-center justify-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    <p className="text-sm text-muted-foreground">Searching...</p>
                  </div>
                </div>
              ) : results.length > 0 ? (
                // Results
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-muted-foreground">
                      Found <span className="font-semibold text-foreground">{results.length}</span> results
                    </p>
                    <Link
                      href={`/search?q=${encodeURIComponent(query)}`}
                      className="text-sm font-medium text-primary hover:underline"
                      onClick={handleClose}
                    >
                      View all results
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.slice(0, 6).map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={handleClose}
                        className="group flex gap-4 p-4 rounded-lg border hover:border-primary hover:shadow-lg transition-all bg-card"
                      >
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Badge variant="secondary" className="text-xs mb-1">
                            {product.brand}
                          </Badge>
                          <h4 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-sm font-bold">
                            €{product.price.toLocaleString()}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                // No Results
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">No results found</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    We couldn't find any items matching "{query}". Try different keywords or browse our categories.
                  </p>
                  <Button variant="outline" className="mt-4" asChild>
                    <Link href="/store/all" onClick={handleClose}>
                      Browse All Products
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Quick Links */}
            {query.length === 0 && (
              <div className="max-w-5xl mx-auto mt-8 pt-6 border-t">
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="text-muted-foreground">Popular categories:</span>
                  <Link href="/store/bags" className="text-primary hover:underline" onClick={handleClose}>
                    Handbags
                  </Link>
                  <Link href="/store/watch" className="text-primary hover:underline" onClick={handleClose}>
                    Watches
                  </Link>
                  <Link href="/store/jewellery" className="text-primary hover:underline" onClick={handleClose}>
                    Jewellery
                  </Link>
                  <Link href="/store/sunglasses" className="text-primary hover:underline" onClick={handleClose}>
                    Sunglasses
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
