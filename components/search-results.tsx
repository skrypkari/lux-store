"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal, Grid3x3, Grid2x2, ChevronDown, Star, Loader2 } from "lucide-react";
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
  sku: string;
  slug_without_id: string;
  base_price: number;
  condition: string;
  media: Array<{ url_original: string }>;
  categories: Array<{
    category: {
      id: number;
      name: string;
      slug: string;
    };
  }>;
  attributes: Array<{
    attribute: { name: string };
    value: string;
  }>;
}

interface SearchResultsProps {
  initialQuery: string;
}

export default function SearchResults({ initialQuery }: SearchResultsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [viewMode, setViewMode] = useState<"grid-3" | "grid-2">("grid-3");
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<Array<{ id: number; name: string; slug: string }>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const productsPerPage = 24;

  // Fetch products based on search query
  useEffect(() => {
    setLoading(true);
    setCurrentPage(1); // Reset to first page on filter change
    
    // Build query parameters
    const params = new URLSearchParams();
    params.append('page', '1');
    params.append('limit', '1000'); // Get all products
    
    // Add search query
    if (initialQuery) {
      params.append('search', initialQuery);
    }
    
    // Add price range filter
    if (priceRange !== "all") {
      if (priceRange === "under-5000") {
        params.append('maxPrice', '5000');
      } else if (priceRange === "5000-10000") {
        params.append('minPrice', '5000');
        params.append('maxPrice', '10000');
      } else if (priceRange === "10000-20000") {
        params.append('minPrice', '10000');
        params.append('maxPrice', '20000');
      } else if (priceRange === "over-20000") {
        params.append('minPrice', '20000');
      }
    }

    fetch(`https://luxstore-backend.vercel.app/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        let filteredProducts = data.products || [];
        
        // Extract unique brands
        const uniqueBrands = new Set<string>();
        filteredProducts.forEach((product: Product) => {
          const brandAttr = product.attributes?.find(attr => attr.attribute.name === "Brand");
          if (brandAttr) uniqueBrands.add(brandAttr.value);
        });
        setBrands(Array.from(uniqueBrands).sort());
        
        // Extract unique categories
        const uniqueCategories = new Map<number, { id: number; name: string; slug: string }>();
        filteredProducts.forEach((product: Product) => {
          product.categories?.forEach((cat) => {
            if (!uniqueCategories.has(cat.category.id)) {
              uniqueCategories.set(cat.category.id, cat.category);
            }
          });
        });
        setCategories(Array.from(uniqueCategories.values()).sort((a, b) => a.name.localeCompare(b.name)));
        
        setProducts(filteredProducts);
        setTotalProducts(filteredProducts.length);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, [initialQuery, priceRange]);

  // Client-side filtering
  const filteredProducts = products.filter((product) => {
    // Brand filter
    if (selectedBrands.length > 0) {
      const brandAttr = product.attributes?.find(attr => attr.attribute.name === "Brand");
      if (!brandAttr || !selectedBrands.includes(brandAttr.value)) {
        return false;
      }
    }

    // Category filter
    if (selectedCategories.length > 0) {
      const hasMatchingCategory = product.categories?.some(
        (cat) => selectedCategories.includes(cat.category.slug)
      );
      if (!hasMatchingCategory) return false;
    }

    return true;
  });

  // Client-side sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.base_price - b.base_price;
    } else if (sortBy === "price-desc") {
      return b.base_price - a.base_price;
    } else if (sortBy === "newest") {
      return b.id - a.id;
    }
    return 0;
  });

  // Pagination
  const totalFilteredProducts = sortedProducts.length;
  const totalPagesCount = Math.ceil(totalFilteredProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrands, selectedCategories, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (categorySlug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categorySlug) ? prev.filter((c) => c !== categorySlug) : [...prev, categorySlug]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange("all");
    setShowInStockOnly(false);
  };

  const activeFiltersCount = selectedBrands.length + selectedCategories.length + (priceRange !== "all" ? 1 : 0);

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

      <Separator />

      <div className="px-2">
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
              <span className="font-semibold text-foreground">{totalFilteredProducts}</span> products
              {totalPagesCount > 1 && (
                <span className="ml-2">
                  (Page {currentPage} of {totalPagesCount})
                </span>
              )}
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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : sortedProducts.length > 0 ? (
          <>
            <div className={`grid gap-6 ${viewMode === "grid-3" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
              {paginatedProducts.map((product) => {
              const imageUrl = product.media?.[0]?.url_original;
              const brandAttr = product.attributes?.find(attr => attr.attribute.name === "Brand");
              const brandName = brandAttr?.value || product.categories?.[0]?.category?.name || "Luxury";
              const inStock = product.condition !== "Sold Out";

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug_without_id}`}
                  className="group border rounded-lg overflow-hidden bg-card hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                    {!inStock && (
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white text-sm font-semibold tracking-wide">SOLD OUT</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <Badge variant="secondary" className="text-xs mb-2">
                      {brandName}
                    </Badge>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    {/* Condition Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {product.condition}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        SKU: {product.sku}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold">
                        €{product.base_price.toLocaleString()}
                      </p>
                      <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Link>
              );
              })}
            </div>

            {/* Pagination */}
            {totalPagesCount > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                <div className="flex gap-1">
                  {Array.from({ length: totalPagesCount }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPagesCount ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="min-w-[40px]"
                        >
                          {page}
                        </Button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="px-2">...</span>;
                    }
                    return null;
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPagesCount, prev + 1))}
                  disabled={currentPage === totalPagesCount}
                >
                  Next
                </Button>
              </div>
            )}
          </>
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
