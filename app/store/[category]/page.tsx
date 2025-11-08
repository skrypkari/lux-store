"use client";

import { use, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal, Grid3x3, LayoutGrid, X, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    brand?: string;
  }>;
}

export default function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = use(params);
  const { brand } = use(searchParams);
  const [priceRange, setPriceRange] = useState([0, 100000]);

  const categoryName = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const brandName = brand
    ? brand
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : null;

  const brands = [
    { name: "Hermès", count: 45 },
    { name: "Rolex", count: 38 },
    { name: "Cartier", count: 52 },
    { name: "Chanel", count: 41 },
    { name: "Louis Vuitton", count: 67 },
    { name: "Patek Philippe", count: 29 },
    { name: "Audemars Piguet", count: 24 },
    { name: "Van Cleef & Arpels", count: 33 },
  ];

  const categories = [
    { name: "Handbags", count: 89 },
    { name: "Watches", count: 112 },
    { name: "Jewelry", count: 76 },
    { name: "Sunglasses", count: 43 },
  ];

  const colors = [
    "Black",
    "White",
    "Red",
    "Blue",
    "Gold",
    "Silver",
    "Brown",
    "Pink",
    "Green",
    "Purple",
    "Orange",
    "Beige",
  ];

  const metals = [
    { name: "Yellow Gold", count: 34 },
    { name: "White Gold", count: 28 },
    { name: "Rose Gold", count: 31 },
    { name: "Platinum", count: 19 },
    { name: "Stainless Steel", count: 45 },
  ];

  const models = [
    { name: "Birkin", count: 12 },
    { name: "Kelly", count: 9 },
    { name: "Submariner", count: 8 },
    { name: "Datejust", count: 15 },
    { name: "Nautilus", count: 7 },
    { name: "Royal Oak", count: 6 },
  ];

  const products = [
    {
      id: 1,
      name: "Hermès Birkin 30",
      brand: "Hermès",
      price: 185000,
      originalPrice: 195000,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=90",
      rating: 5.0,
      reviews: 127,
      sku: "H076099CK89",
      inStock: true,
      description: "Togo leather in classic black with gold hardware"
    },
    {
      id: 2,
      name: "Rolex Submariner Date",
      brand: "Rolex",
      price: 42500,
      image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=90",
      rating: 4.9,
      reviews: 89,
      sku: "R124060BL33",
      inStock: true,
      description: "41mm Oystersteel case with black ceramic bezel"
    },
    {
      id: 3,
      name: "Cartier Love Bracelet",
      brand: "Cartier",
      price: 7800,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=90",
      rating: 4.8,
      reviews: 234,
      sku: "C089234XL67",
      inStock: true,
      description: "18K yellow gold with signature screw motif"
    },
    {
      id: 4,
      name: "Chanel Classic Flap",
      brand: "Chanel",
      price: 38500,
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=90",
      rating: 5.0,
      reviews: 156,
      sku: "CH345678QU12",
      inStock: true,
      description: "Medium size in quilted caviar leather"
    },
    {
      id: 5,
      name: "Patek Philippe Nautilus",
      brand: "Patek Philippe",
      price: 125000,
      originalPrice: 135000,
      image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=90",
      rating: 5.0,
      reviews: 67,
      sku: "PP567123RF40",
      inStock: false,
      description: "40mm stainless steel with blue dial"
    },
    {
      id: 6,
      name: "Van Cleef Alhambra Necklace",
      brand: "Van Cleef & Arpels",
      price: 15500,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=90",
      rating: 4.9,
      reviews: 98,
      sku: "VC234789GD20",
      inStock: true,
      description: "18K yellow gold with 20 motifs"
    },
  ];

  const FiltersContent = () => (
    <div className="space-y-6 px-4 lg:px-0 pb-20 lg:pb-0">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Filters</h2>
        <Button variant="ghost" size="sm" className="h-8 text-xs">
          <X className="h-3.5 w-3.5 mr-1.5" />
          Clear All
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["price", "brand", "category", "color"]}
        className="w-full"
      >
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={100000}
                step={1000}
                className="w-full"
              />
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    $
                  </span>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                    className="w-full pl-7 pr-3 py-2 text-sm border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Min"
                  />
                </div>
                <span className="text-muted-foreground">—</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    $
                  </span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-full pl-7 pr-3 py-2 text-sm border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Max"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>${priceRange[0].toLocaleString()}</span>
                <span>${priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger className="text-sm font-medium">
            Brand
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {brands.map((brand) => (
                <div
                  key={brand.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox id={`brand-${brand.name}`} />
                    <Label
                      htmlFor={`brand-${brand.name}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {brand.name}
                    </Label>
                  </div>
                  <Badge variant="secondary" className="text-xs font-normal">
                    {brand.count}
                  </Badge>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category">
          <AccordionTrigger className="text-sm font-medium">
            Category
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox id={`cat-${cat.name}`} />
                    <Label
                      htmlFor={`cat-${cat.name}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {cat.name}
                    </Label>
                  </div>
                  <Badge variant="secondary" className="text-xs font-normal">
                    {cat.count}
                  </Badge>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger className="text-sm font-medium">
            Color
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2 pt-2">
              {colors.map((color) => (
                <Button
                  key={color}
                  variant="outline"
                  size="sm"
                  className="justify-start text-sm font-normal"
                >
                  {color}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="for">
          <AccordionTrigger className="text-sm font-medium">
            For
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-2">
              <Button variant="outline" size="sm" className="font-normal">
                Women
              </Button>
              <Button variant="outline" size="sm" className="font-normal">
                Men
              </Button>
              <Button variant="outline" size="sm" className="font-normal">
                Unisex
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Collection */}
        <AccordionItem value="collection">
          <AccordionTrigger className="text-sm font-medium">
            Collection
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between font-normal"
              >
                New Arrivals
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between font-normal"
              >
                Best Sellers
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between font-normal"
              >
                Limited Edition
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Size */}
        <AccordionItem value="size">
          <AccordionTrigger className="text-sm font-medium">
            Size
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-2 pt-2">
              {["Small", "Medium", "Large", "25mm", "30mm", "35mm", "40mm", "45mm"].map(
                (size) => (
                  <Button
                    key={size}
                    variant="outline"
                    size="sm"
                    className="font-normal text-xs"
                  >
                    {size}
                  </Button>
                )
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Metal Type */}
        <AccordionItem value="metal">
          <AccordionTrigger className="text-sm font-medium">
            Metal Type
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {metals.map((metal) => (
                <div
                  key={metal.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox id={`metal-${metal.name}`} />
                    <Label
                      htmlFor={`metal-${metal.name}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {metal.name}
                    </Label>
                  </div>
                  <Badge variant="secondary" className="text-xs font-normal">
                    {metal.count}
                  </Badge>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Model */}
        <AccordionItem value="model">
          <AccordionTrigger className="text-sm font-medium">
            Model
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {models.map((model) => (
                <div
                  key={model.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox id={`model-${model.name}`} />
                    <Label
                      htmlFor={`model-${model.name}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {model.name}
                    </Label>
                  </div>
                  <Badge variant="secondary" className="text-xs font-normal">
                    {model.count}
                  </Badge>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Movement */}
        <AccordionItem value="movement">
          <AccordionTrigger className="text-sm font-medium">
            Movement
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start font-normal"
              >
                Automatic
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start font-normal"
              >
                Manual
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start font-normal"
              >
                Quartz
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Diamonds */}
        <AccordionItem value="diamonds">
          <AccordionTrigger className="text-sm font-medium">
            Diamonds
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start font-normal"
              >
                With Diamonds
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start font-normal"
              >
                Without Diamonds
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Apply Button */}
      <Button className="w-full" size="lg">
        Apply Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Premium Page Header */}
      <div className="border-b bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <span>Home</span>
              <span>/</span>
              <span>Store</span>
              <span>/</span>
              <span className="text-foreground font-medium">{categoryName}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {categoryName}
            </h1>
            {brandName && (
              <p className="text-lg text-muted-foreground">
                Showing all <span className="font-semibold text-foreground">{brandName}</span> products
              </p>
            )}
            <p className="text-muted-foreground mt-2">
              Discover our curated collection of authentic luxury items
            </p>
          </div>
        </div>
      </div>

      <main className="container min-h-[calc(100vh-515px)] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Main Filters */}
              <div className="border rounded-lg p-6 bg-card shadow-sm">
                <FiltersContent />
              </div>

              {/* Premium Info Card */}
              <div className="border rounded-lg p-6 bg-card shadow-sm">
                <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Authenticity Guarantee
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every item is carefully authenticated by our expert team. Shop with confidence knowing you're getting 100% genuine luxury products.
                </p>
              </div>

              {/* Support Card */}
              <div className="border rounded-lg p-6 bg-card shadow-sm">
                <h3 className="font-semibold text-sm mb-4">Need Help?</h3>
                <div className="space-y-3 text-xs">
                  <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Support
                  </a>
                  <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    FAQ
                  </a>
                  <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b">
              <div className="flex items-center gap-4 flex-1">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden" size="sm">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Refine your search with filters
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <FiltersContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <div>
                  <p className="text-sm font-semibold">
                    {brandName ? `${brandName} ` : ""}
                    {categoryName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    <span className="font-medium">{products.length}</span> products available
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="hidden sm:flex items-center gap-1 border rounded-md p-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 bg-muted"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>

                <Select defaultValue="featured">
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="bestsellers">Best Sellers</SelectItem>
                    <SelectItem value="a-z">Name: A-Z</SelectItem>
                    <SelectItem value="z-a">Name: Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-muted/30 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-background flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold">Authenticated</div>
                  <div className="text-xs text-muted-foreground">100% Genuine</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-background flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold">Secure Payment</div>
                  <div className="text-xs text-muted-foreground">SSL Encrypted</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-background flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold">Easy Returns</div>
                  <div className="text-xs text-muted-foreground">30 Day Policy</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-background flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold">Free Shipping</div>
                  <div className="text-xs text-muted-foreground">Orders $500+</div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-card border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Stock Status */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white text-sm font-semibold tracking-wide">SOLD OUT</span>
                      </div>
                    )}

                    {/* Discount Label */}
                    {product.originalPrice && (
                      <div className="absolute top-0 right-0 bg-foreground text-background px-3 py-1.5 text-xs font-bold tracking-wider">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    {/* Brand & Rating */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                        {product.brand}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${
                                i < Math.floor(product.rating)
                                  ? "fill-amber-400 text-amber-400"
                                  : "fill-muted text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-medium text-muted-foreground ml-1">
                          ({product.reviews})
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-base leading-tight mb-2 min-h-[2.5rem] line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
                      {product.description}
                    </p>

                    {/* SKU */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs text-muted-foreground font-medium">SKU:</span>
                      <code className="text-xs bg-muted/50 px-2 py-1 rounded font-mono">
                        {product.sku}
                      </code>
                    </div>

                    <Separator className="mb-4" />

                    {/* Price & Actions */}
                    <div className="flex items-end justify-between gap-3">
                      <div className="flex flex-col">
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through mb-0.5">
                            ${product.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-2xl font-bold tracking-tight">
                          ${product.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="font-semibold"
                          onClick={() => window.location.href = `/product/${product.id}`}
                        >
                          Details
                        </Button>
                        <Button 
                          size="icon" 
                          className="h-8 w-8 shadow-md"
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Premium Border Effect */}
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-300 pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Bottom Info Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 border rounded-lg bg-card">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Authenticity Verified</h3>
                <p className="text-sm text-muted-foreground">
                  Each item undergoes rigorous authentication by certified experts
                </p>
              </div>

              <div className="text-center p-6 border rounded-lg bg-card">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Fast & Secure Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Express shipping with full insurance and tracking included
                </p>
              </div>

              <div className="text-center p-6 border rounded-lg bg-card">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Concierge Service</h3>
                <p className="text-sm text-muted-foreground">
                  Dedicated luxury advisors available 24/7 for assistance
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
