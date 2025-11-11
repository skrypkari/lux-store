"use client";

import { use, useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Truck, ShieldCheck, RotateCcw, Check, X } from "lucide-react";
import ImageGallery from "@/components/product/image-gallery";
import QuantitySelector from "@/components/product/quantity-selector";
import ActionButtons from "@/components/product/action-buttons";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: PageProps) {
  const { id } = use(params);
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://luxstore-backend.vercel.app/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Product not found');
        }
        return res.json();
      })
      .then((data) => {
        setProductData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            {/* Animated Logo/Icon */}
            <div className="relative mb-8">
              <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
            
            {/* Loading Text */}
            <h2 className="text-2xl font-bold mb-2">Loading Product</h2>
            <p className="text-muted-foreground mb-8 text-center max-w-md">
              Please wait while we retrieve your luxury item details...
            </p>
            
            {/* Loading Progress Animation */}
            <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary via-primary/50 to-primary animate-[shimmer_1.5s_ease-in-out_infinite] bg-[length:200%_100%]"></div>
            </div>
            
            {/* Skeleton Loader Preview */}
            <div className="w-full max-w-5xl mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Skeleton */}
              <div className="space-y-4">
                <div className="aspect-[4/3] bg-muted rounded-2xl animate-pulse"></div>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>
              
              {/* Details Skeleton */}
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-1/4 animate-pulse"></div>
                <div className="h-8 bg-muted rounded w-3/4 animate-pulse"></div>
                <div className="h-6 bg-muted rounded w-1/2 animate-pulse"></div>
                <div className="h-12 bg-muted rounded w-1/3 animate-pulse mt-8"></div>
                <div className="space-y-2 mt-8">
                  <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-4/6 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        
        <style jsx>{`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}</style>
      </div>
    );
  }

  // Error state
  if (error || !productData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mb-30 mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => window.location.href = '/store/all'}>
            Back to Store
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Get images
  const images = productData.media?.map((m: any) => m.url_800 || m.url_400 || m.url_200) || [
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=90'
  ];

  // Calculate price with VAT
  const price = productData.base_price || 0;
  const priceVAT = (price * 0.2).toFixed(2);

  // Extract all attributes dynamically
  const productAttributes = productData.attributes?.reduce((acc: any, attr: any) => {
    acc[attr.attribute.name] = attr.value;
    return acc;
  }, {}) || {};

  // Get description from raw_json or description_html
  const fullDescription = productData.raw_json?.description || 
                         productData.description_html?.replace(/<[^>]*>/g, ' ').trim() || 
                         productData.subtitle || 
                         "Luxury item from prestigious collection. This item undergoes rigorous authentication by our team of certified experts.";

  // Get category from product data
  const category = productData.categories?.[0]?.category;
  const categoryName = category?.name || 'Products';
  const categorySlug = category?.slug_without_id || 'all';

  // Build specifications from attributes
  const specifications = [
    { label: "SKU", value: productData.sku || 'N/A' },
    { label: "Condition", value: productData.condition || (productData.is_sold_out ? "Sold Out" : "Available") },
    ...Object.entries(productAttributes).map(([key, value]) => ({
      label: key,
      value: value as string,
    })),
  ];

  // Format product data
  const product = {
    id: productData.id,
    name: productData.name,
    brand: productAttributes['Brand'] || 'Luxury Brand',
    price: price,
    priceVAT: parseFloat(priceVAT),
    sku: productData.sku || 'N/A',
    rating: 4.5 + Math.random() * 0.5,
    reviews: Math.floor(Math.random() * 200) + 50,
    inStock: !productData.is_sold_out,
    images: images,
    category: {
      name: categoryName,
      slug: categorySlug,
    },
    details: productAttributes,
    description: fullDescription,
    features: [
      "100% Authentic Guaranteed",
      "Comes with original dust bag",
      "Authentication certificate",
      "Secure packaging and shipping",
      "Premium quality materials",
      "Expert craftsmanship",
    ],
    specifications: specifications,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors">Home</a>
            <span>/</span>
            <a href="/store/all" className="hover:text-foreground transition-colors">Store</a>
            <span>/</span>
            <a href={`/store/${product.category.slug}`} className="hover:text-foreground transition-colors">
              {product.category.name}
            </a>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-[300px]">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* Limited Availability Banner */}
        {/* <div className="mb-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-center gap-2 text-sm">
            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Limited Availability</span>
            <span className="text-muted-foreground">— Only 2 pieces left in stock</span>
          </div>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            <ImageGallery 
              images={product.images}
              productName={product.name}
              inStock={product.inStock}
            />

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 p-6 bg-muted/30 rounded-lg border">
              <div className="text-center">
                <ShieldCheck className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-xs font-semibold">Authenticated</div>
                <div className="text-xs text-muted-foreground mt-1">By Experts</div>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-xs font-semibold">Free Shipping</div>
                <div className="text-xs text-muted-foreground mt-1">Worldwide</div>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-xs font-semibold">Easy Returns</div>
                <div className="text-xs text-muted-foreground mt-1">30 Days</div>
              </div>
            </div>

            {/* Why Buy From Us */}
            <div className="border rounded-lg p-6 bg-card">
              <h3 className="font-semibold mb-4 text-sm">Why Buy From Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Certified Authentic</span>
                    <p className="text-xs text-muted-foreground mt-0.5">Every item verified by industry experts</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">White Glove Service</span>
                    <p className="text-xs text-muted-foreground mt-0.5">Premium packaging and handling</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Secure Transaction</span>
                    <p className="text-xs text-muted-foreground mt-0.5">Bank-level encryption & buyer protection</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Concierge Support</span>
                    <p className="text-xs text-muted-foreground mt-0.5">Dedicated team available 24/7</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            <div>
              <span className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
                {product.brand}
              </span>
            </div>

            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* SKU & Quick Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">SKU:</span>
                <code className="bg-muted px-3 py-1 rounded font-mono font-semibold">
                  {product.sku}
                </code>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2 text-muted-foreground">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>1,247 views</span>
              </div>
            </div>

            <Separator />

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold tracking-tight">
                  €{product.price.toLocaleString()}
                </span>
                <Badge variant="secondary" className="text-xs">
                  Price Match Guarantee
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Price incl. VAT (20%) €{product.priceVAT.toLocaleString()}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <button className="text-primary hover:underline font-medium">
                  Request Payment Plan
                </button>
                <Separator orientation="vertical" className="h-4" />
                <button className="text-primary hover:underline font-medium">
                  Currency Converter
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm font-semibold text-green-700">In Stock</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-sm font-semibold text-red-700">Out of Stock</span>
                </>
              )}
            </div>

            <Separator />

            {/* Quantity */}
            <QuantitySelector inStock={product.inStock} />

            {/* Action Buttons */}
            <ActionButtons 
              inStock={product.inStock} 
              product={{
                id: parseInt(id),
                name: product.name,
                brand: product.brand,
                price: product.price,
                image: product.images[0] || "",
              }}
            />

            {/* Product Details */}
            <div className="border rounded-lg p-6 bg-card">
              <h3 className="font-semibold mb-4">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {Object.entries(product.details).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-muted-foreground">{key}:</span>
                    <span className="ml-2 font-medium">{value as string}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="border rounded-lg p-6 bg-card">
              <h3 className="font-semibold mb-4">What's Included</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Special Services */}
            <div className="grid grid-cols-2 gap-3">
              <button className="border rounded-lg p-4 text-left hover:border-primary transition-colors group">
                <svg className="w-5 h-5 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                <div className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">Gift Wrapping</div>
                <div className="text-xs text-muted-foreground">Complimentary luxury packaging</div>
              </button>
              <button className="border rounded-lg p-4 text-left hover:border-primary transition-colors group">
                <svg className="w-5 h-5 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">Personalization</div>
                <div className="text-xs text-muted-foreground">Add custom engraving</div>
              </button>
              <button className="border rounded-lg p-4 text-left hover:border-primary transition-colors group">
                <svg className="w-5 h-5 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">Reserve Now</div>
                <div className="text-xs text-muted-foreground">Schedule private viewing</div>
              </button>
              <button className="border rounded-lg p-4 text-left hover:border-primary transition-colors group">
                <svg className="w-5 h-5 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">Trade-In</div>
                <div className="text-xs text-muted-foreground">Exchange your luxury item</div>
              </button>
            </div>
          </div>
        </div>

        {/* Expert Analysis Banner */}
        <div className="mt-16 border-t border-b py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm font-medium mb-1">Authentic</div>
              <div className="text-xs text-muted-foreground">Verified by experts</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm font-medium mb-1">Support</div>
              <div className="text-xs text-muted-foreground">Always here to help</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2-5</div>
              <div className="text-sm font-medium mb-1">Business Days</div>
              <div className="text-xs text-muted-foreground">Express delivery</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">30</div>
              <div className="text-sm font-medium mb-1">Day Returns</div>
              <div className="text-xs text-muted-foreground">Hassle-free policy</div>
            </div>
          </div>
        </div>

        {/* Product Information Sections */}
        <div className="mt-16 space-y-8">
          {/* Description */}
          <div className="border rounded-lg p-8 bg-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Description</h2>
            </div>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: productData.description_html || product.description }}
            />
            <div className="pt-6 border-t">
              <h3 className="font-semibold mb-3 text-sm">Product Highlights</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Specifications */}
          <div className="border rounded-lg p-8 bg-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Specifications</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications.map((spec, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                  <span className="font-medium">{spec.label}</span>
                  <span className="text-muted-foreground">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Care Instructions */}
          <div className="border rounded-lg p-8 bg-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Care Instructions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-sm">Do's</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Store in provided dust bag when not in use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Clean with soft, dry cloth regularly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Keep away from direct sunlight and heat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Handle hardware with care to prevent scratches</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-sm">Don'ts</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Avoid contact with water and liquids</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Do not use chemical cleaners or abrasives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Avoid overloading to maintain shape</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Keep away from sharp objects and rough surfaces</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Shipping & Returns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 bg-card">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                Shipping Information
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                We offer worldwide express shipping with full insurance and tracking.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  Free shipping on orders over €500
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  Express delivery: 2-5 business days
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  Fully insured and tracked
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  Signature required upon delivery
                </li>
              </ul>
            </div>

            <div className="border rounded-lg p-6 bg-card">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-primary" />
                Returns & Exchanges
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                We want you to be completely satisfied with your purchase.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  30-day return policy
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  Items must be in original condition
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  Free return shipping
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  Full refund or exchange
                </li>
              </ul>
            </div>
          </div>

          {/* Authenticity Guarantee */}
          <div className="border rounded-lg p-8 bg-card text-center">
            <ShieldCheck className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-4">100% Authenticity Guaranteed</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Every item in our collection undergoes a rigorous authentication process by our team of certified experts. We guarantee that all products are 100% authentic or your money back.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">1</span>
                </div>
                <h4 className="font-semibold mb-2">Expert Inspection</h4>
                <p className="text-sm text-muted-foreground">
                  Verified by certified authenticators with 15+ years experience
                </p>
              </div>
              <div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">2</span>
                </div>
                <h4 className="font-semibold mb-2">Documentation</h4>
                <p className="text-sm text-muted-foreground">
                  Signed certificate of authenticity with detailed item report
                </p>
              </div>
              <div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">3</span>
                </div>
                <h4 className="font-semibold mb-2">Money-Back</h4>
                <p className="text-sm text-muted-foreground">
                  Full refund within 30 days if authenticity is disputed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Confidence Section */}
        <div className="mt-16 bg-muted/30 rounded-lg p-8 border">
          <h2 className="text-2xl font-bold mb-8 text-center">Trusted by Luxury Collectors Worldwide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-3xl font-bold mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
              <div className="text-xs text-muted-foreground mt-1">From 2,847 verified reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Items Sold</div>
              <div className="text-xs text-muted-foreground mt-1">To collectors in 89 countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">99.8%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              <div className="text-xs text-muted-foreground mt-1">Based on customer feedback</div>
            </div>
          </div>
        </div>

        {/* Contact Support CTA */}
        <div className="mt-16 border rounded-lg p-8 bg-card text-center">
          <h2 className="text-2xl font-bold mb-3">Have Questions?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our luxury specialists are available 24/7 to assist you with any questions about this item or to schedule a private viewing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="outline">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call: +1 (555) 123-4567
            </Button>
            <Button size="lg" variant="outline">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Live Chat
            </Button>
            <Button size="lg" variant="outline">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
