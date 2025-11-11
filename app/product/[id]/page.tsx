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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

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
                <div className="text-xs font-semibold">100% Authentic</div>
                <div className="text-xs text-muted-foreground mt-1">Product</div>
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
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            <div>
              <span className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
                {product.brand}
              </span>
            </div>

            {/* Title & Condition Badge */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {product.name}
              </h1>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-md">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold tracking-wide text-emerald-700">BRAND NEW</span>
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
                <span>{productData?.views ? productData.views.toLocaleString() : '0'} views</span>
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

            {/* Product Options */}
            {productData.raw_json.options && productData.raw_json.options.length > 0 && (
              <>
                <div className="space-y-4">
                  {productData.raw_json.options.map((option: any) => {
                    const choices = productData.raw_json.defaultOptionsOverrides?.pricesOverrides?.optionsChoicesWithModifiersAndTaxes?.find(
                      (opt: any) => opt.optionId === option.optionId
                    )?.choices || [];

                    return (
                      <div key={option.optionId}>
                        <label className="text-sm font-semibold mb-2 block">
                          {option.optionText}
                          {option.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <Select
                          value={selectedOptions[option.optionId] || ""}
                          onValueChange={(value) => {
                            setSelectedOptions(prev => ({
                              ...prev,
                              [option.optionId]: value
                            }));
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={`Select ${option.optionText}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {choices.map((choice: any) => (
                              <SelectItem key={choice.choiceId} value={choice.choiceId}>
                                {choice.choiceName}
                                {choice.modifierFormatted && (
                                  <span className="text-muted-foreground ml-2">
                                    {choice.modifierFormatted}
                                  </span>
                                )}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  })}
                </div>
                <Separator />
              </>
            )}

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
                options: selectedOptions,
              }}
              disabled={
                productData.options?.some((opt: any) => opt.required && !selectedOptions[opt.optionId])
              }
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
          </div>
        </div>
        {/* Product Information Sections */}
        <div className="mt-16 space-y-8 border-t pt-10">
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

          {/* Shipping & Returns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 bg-card">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                Shipping Information
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                We offer worldwide DHL express shipping with full insurance and tracking.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  Free shipping on all orders
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  Delivery time: 21 - 35 days
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
            <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
              Every item in our collection is original and sourced directly from official brand boutiques and authorized retailers.
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
              We guarantee the authenticity of all products — every piece is a genuine creation by the brand, delivered with its original packaging and documentation.
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              All items are brand new and never pre-owned, ensuring you receive an authentic product of certified origin.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">1</span>
                </div>
                <h4 className="font-semibold mb-2">Direct Brand Source</h4>
                <p className="text-sm text-muted-foreground">
                  All products come directly from official brand stores or authorized partners.
                </p>
              </div>
              <div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">2</span>
                </div>
                <h4 className="font-semibold mb-2">Original Packaging</h4>
                <p className="text-sm text-muted-foreground">
                  Each item includes the brand's original box, dust bag, and authenticity documents.
                </p>
              </div>
              <div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">3</span>
                </div>
                <h4 className="font-semibold mb-2">Guaranteed Authenticity</h4>
                <p className="text-sm text-muted-foreground">
                  We guarantee every item is 100% genuine — or your money back.
                </p>
              </div>
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
            <Button size="lg" variant="outline" asChild>
              <a href="tel:+445557771234">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call: +44-555-777-1234
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://wa.me/445557771234" target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://t.me/lux_store_eu" target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Telegram
              </a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
