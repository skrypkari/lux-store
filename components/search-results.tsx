"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal, Grid3x3, Grid2x2, ChevronDown, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

// Mock products database
const allProducts: Product[] = [
  {
    id: 1,
    name: "Birkin 30 Craie Togo Gold Hardware",
    brand: "Hermès",
    price: 14825,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=90",
    category: "Bags",
    rating: 5.0,
    reviews: 127,
    inStock: true,
  },
  {
    id: 2,
    name: "Kelly 28 Black Box Leather",
    brand: "Hermès",
    price: 12500,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=90",
    category: "Bags",
    rating: 4.9,
    reviews: 89,
    inStock: true,
  },
  {
    id: 3,
    name: "Classic Flap Medium",
    brand: "Chanel",
    price: 8900,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=90",
    category: "Bags",
    rating: 4.8,
    reviews: 156,
    inStock: true,
  },
  {
    id: 4,
    name: "Panthère de Cartier Watch",
    brand: "Cartier",
    price: 22000,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=90",
    category: "Watches",
    rating: 5.0,
    reviews: 94,
    inStock: true,
  },
  {
    id: 5,
    name: "Lady Dior Medium",
    brand: "Dior",
    price: 5200,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=90",
    category: "Bags",
    rating: 4.7,
    reviews: 203,
    inStock: false,
  },
  {
    id: 6,
    name: "Santos de Cartier Large",
    brand: "Cartier",
    price: 7450,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=90",
    category: "Watches",
    rating: 4.9,
    reviews: 67,
    inStock: true,
  },
  {
    id: 7,
    name: "Tank Must Watch",
    brand: "Cartier",
    price: 3200,
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=90",
    category: "Watches",
    rating: 4.6,
    reviews: 112,
    inStock: true,
  },
  {
    id: 8,
    name: "Ballon Bleu 36mm",
    brand: "Cartier",
    price: 8950,
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&q=90",
    category: "Watches",
    rating: 4.9,
    reviews: 145,
    inStock: true,
  },
];

interface SearchResultsProps {
  initialQuery: string;
}

export default function SearchResults({ initialQuery }: SearchResultsProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [viewMode, setViewMode] = useState<"grid-3" | "grid-2">("grid-3");
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  // Get unique brands and categories
  const brands = Array.from(new Set(allProducts.map((p) => p.brand))).sort();
  const categories = Array.from(new Set(allProducts.map((p) => p.category))).sort();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let results = allProducts.filter((product) => {
      // Search query filter
      const matchesQuery =
        product.name.toLowerCase().includes(initialQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(initialQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(initialQuery.toLowerCase());

      // Brand filter
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);

      // Price filter
      let matchesPrice = true;
      if (priceRange === "under-5000") matchesPrice = product.price < 5000;
      else if (priceRange === "5000-10000") matchesPrice = product.price >= 5000 && product.price <= 10000;
      else if (priceRange === "10000-20000") matchesPrice = product.price >= 10000 && product.price <= 20000;
      else if (priceRange === "over-20000") matchesPrice = product.price > 20000;

      // Stock filter
      const matchesStock = !showInStockOnly || product.inStock;

      return matchesQuery && matchesBrand && matchesCategory && matchesPrice && matchesStock;
    });

    // Sort results
    if (sortBy === "price-asc") {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      results.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      results.sort((a, b) => b.id - a.id);
    }

    return results;
  }, [initialQuery, selectedBrands, selectedCategories, priceRange, sortBy, showInStockOnly]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange("all");
    setShowInStockOnly(false);
  };

  const activeFiltersCount = selectedBrands.length + selectedCategories.length + (priceRange !== "all" ? 1 : 0) + (showInStockOnly ? 1 : 0);

  // Filters component (reusable for desktop and mobile)
  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Active Filters Count */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{activeFiltersCount} filters active</Badge>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}

      {/* Availability */}
      <div>
        <h3 className="font-semibold mb-3">Availability</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={showInStockOnly}
            onCheckedChange={(checked) => setShowInStockOnly(checked as boolean)}
          />
          <Label htmlFor="in-stock" className="text-sm cursor-pointer">
            In Stock Only
          </Label>
        </div>
      </div>

      <Separator />

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label htmlFor={`cat-${category}`} className="text-sm cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-3">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-2">
          {[
            { value: "all", label: "All Prices" },
            { value: "under-5000", label: "Under €5,000" },
            { value: "5000-10000", label: "€5,000 - €10,000" },
            { value: "10000-20000", label: "€10,000 - €20,000" },
            { value: "over-20000", label: "Over €20,000" },
          ].map((range) => (
            <div key={range.value} className="flex items-center space-x-2">
              <Checkbox
                id={range.value}
                checked={priceRange === range.value}
                onCheckedChange={() => setPriceRange(range.value)}
              />
              <Label htmlFor={range.value} className="text-sm cursor-pointer">
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Desktop Filters Sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Filters</h2>
          </div>
          <FiltersContent />
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:col-span-3">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b">
          <div className="flex items-center gap-4">
            {/* Mobile Filters */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Results Count */}
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Most Relevant</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="hidden md:flex gap-1 border rounded-lg p-1">
              <Button
                variant={viewMode === "grid-3" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("grid-3")}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid-2" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("grid-2")}
              >
                <Grid2x2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-6 ${viewMode === "grid-3" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group border rounded-lg overflow-hidden bg-card hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white text-sm font-semibold tracking-wide">SOLD OUT</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <Badge variant="secondary" className="text-xs mb-2">
                    {product.brand}
                  </Badge>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold">
                      €{product.price.toLocaleString()}
                    </p>
                    <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      View Details
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // No Results
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
              <SlidersHorizontal className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              We couldn't find any products matching your search and filters. Try adjusting your filters or search terms.
            </p>
            <Button onClick={clearFilters} size="lg">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
