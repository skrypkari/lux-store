import Header from "@/components/header";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Truck, ShieldCheck, RotateCcw, Check, X } from "lucide-react";
import ImageGallery from "@/components/product/image-gallery";
import ProductInteractive from "@/components/product/product-interactive";
import RelatedProducts from "@/components/product/related-products";
import ChatButton from "@/components/chat-button";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getProductBySlug(slug: string) {
  const res = await fetch(`https://api.lux-store.eu/products/slug/${slug}`, {
    cache: 'no-store', // Always fetch fresh data
  });
  
  if (!res.ok) {
    throw new Error('Product not found');
  }
  const productData = await res.json();
  console.log(productData);
  return productData;
}

async function getBannerSettings() {
  try {
    const res = await fetch('https://api.lux-store.eu/banner-settings', {
      cache: 'no-store',
    });
    if (!res.ok) return { url: '', isEnabled: false };
    return await res.json();
  } catch {
    return { url: '', isEnabled: false };
  }
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const productData = await getProductBySlug(slug);
    const price = productData.base_price || 0;
    console.log('Product Price:', price);
    const brand = productData.attributes?.find((attr: any) => attr.attribute.name === 'Brand')?.value || 'Luxury Brand';
    
    const titleWithBrand = productData.seo?.title 
      ? `${brand} ${productData.seo.title}`
      : `${brand} ${productData.name}`;
    
    return {
      title: titleWithBrand,
      description: productData.seo?.description || productData.subtitle,
      openGraph: {
        title: productData.seo?.og_title ? `${brand} ${productData.seo.og_title}` : titleWithBrand,
        description: productData.seo?.og_description || productData.subtitle,
        images: [
          {
            url: productData.media?.[0]?.url_original || productData.seo?.og_image,
            width: 1200,
            height: 630,
            alt: productData.name,
          }
        ],
        type: 'website',
        siteName: 'LUX STORE',
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title: productData.seo?.twitter_title ? `${brand} ${productData.seo.twitter_title}` : titleWithBrand,
        description: productData.seo?.twitter_description || productData.subtitle,
        images: [productData.media?.[0]?.url_original || productData.seo?.twitter_image],
      },
      alternates: {
        canonical: productData.seo?.canonical_url || `https://lux-store.eu/products/${productData.slug_without_id}`,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  
  let productData;
  let bannerSettings;
  try {
    [productData, bannerSettings] = await Promise.all([
      getProductBySlug(slug),
      getBannerSettings(),
    ]);
  } catch (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mb-30 mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <a href="/store/all">Back to Store</a>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }


  const images = productData.media?.map((m: any) => m.url_original) || [
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=90'
  ];


  const price = productData.base_price || 0;
  const priceVAT = (price * 0.2).toFixed(2);


  const productAttributes = productData.attributes?.reduce((acc: any, attr: any) => {
    acc[attr.attribute.name] = attr.value;
    return acc;
  }, {}) || {};


  const fullDescription = productData.raw_json?.description || 
                         productData.description_html?.replace(/<[^>]*>/g, ' ').trim() || 
                         productData.subtitle || 
                         "Luxury item from prestigious collection. This item undergoes rigorous authentication by our team of certified experts.";


  const category = productData.categories?.[0]?.category;
  const categoryName = category?.name || 'Products';
  const categorySlug = category?.slug_without_id || 'all';


  const specifications = [
    { label: "SKU", value: productData.sku || 'N/A' },
    { label: "Condition", value: productData.condition || (productData.is_sold_out ? "Sold Out" : "Available") },
    ...Object.entries(productAttributes).map(([key, value]) => ({
      label: key,
      value: value as string,
    })),
  ];


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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "image": product.images,
            "description": product.description,
            "brand": {
              "@type": "Brand",
              "name": product.brand
            },
            "offers": {
              "@type": "Offer",
              "url": `https://lux-store.eu/products/${productData.slug_without_id}`,
              "priceCurrency": "EUR",
              "price": product.price,
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition",
              "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                  "@type": "MonetaryAmount",
                  "value": "0",
                  "currency": "EUR"
                },
                "shippingDestination": {
                  "@type": "DefinedRegion",
                  "addressCountry": ["US", "GB", "DE", "FR", "IT", "ES", "CA", "AU", "NL", "BE", "AT", "CH", "SE", "NO", "DK", "FI", "PL", "CZ", "PT", "IE", "GR", "JP", "KR", "SG", "HK", "AE", "SA"]
                },
                "deliveryTime": {
                  "@type": "ShippingDeliveryTime",
                  "handlingTime": {
                    "@type": "QuantitativeValue",
                    "minValue": 1,
                    "maxValue": 3,
                    "unitCode": "DAY"
                  },
                  "transitTime": {
                    "@type": "QuantitativeValue",
                    "minValue": 21,
                    "maxValue": 35,
                    "unitCode": "DAY"
                  }
                }
              },
              "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "applicableCountry": ["US", "GB", "DE", "FR", "IT", "ES", "CA", "AU", "NL", "BE", "AT", "CH", "SE", "NO", "DK", "FI", "PL", "CZ", "PT", "IE", "GR", "JP", "KR", "SG", "HK", "AE", "SA"],
                "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                "merchantReturnDays": 30,
                "returnMethod": "https://schema.org/ReturnByMail",
                "returnFees": "https://schema.org/FreeReturn"
              }
            }
          })
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://lux-store.eu"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Store",
                "item": "https://lux-store.eu/store/all"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": product.category.name,
                "item": `https://lux-store.eu/store/${product.category.slug}`
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": product.name
              }
            ]
          })
        }}
      />
      

      <div className="min-h-screen bg-background">
        <Header />

        
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
          
          <div className="space-y-4">
            <ImageGallery 
              images={product.images}
              productName={product.name}
              inStock={product.inStock}
            />

            
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

          
          <div className="space-y-6">
            
            <div>
              <span className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
                {product.brand}
              </span>
            </div>

            
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {product.name}
              </h1>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-md">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold tracking-wide text-emerald-700">BRAND NEW</span>
              </div>
            </div>

            
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

            
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span itemProp="price" id="price" className="text-4xl font-bold tracking-tight">
                  €{product.price.toLocaleString()}
                </span>
                <Badge variant="secondary" className="text-xs">
                  Price Match Guarantee
                </Badge>
              </div>
              <p className="text-sm text-green-700 mb-2">
                VAT <span className="font-semibold">included</span>
              </p>
            </div>

            
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

            
            <ProductInteractive
              productId={productData.id}
              productName={product.name}
              productBrand={product.brand}
              productPrice={product.price}
              productImage={product.images[0] || ""}
              productSku={product.sku}
              inStock={product.inStock}
              options={productData.raw_json?.options}
              optionsChoices={
                productData.raw_json?.defaultOptionsOverrides?.pricesOverrides?.optionsChoicesWithModifiersAndTaxes?.reduce(
                  (acc: Record<string, any[]>, opt: any) => {
                    acc[opt.optionId] = opt.choices || [];
                    return acc;
                  },
                  {}
                )
              }
            />

            
            {bannerSettings?.isEnabled && bannerSettings?.url && (
              <div className="mb-6 overflow-hidden rounded-lg">
                <img
                  src={bannerSettings.url}
                  alt="Luxury Collection"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            
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
        
        <div className="mt-16 space-y-8 border-t pt-10">          
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
              dangerouslySetInnerHTML={{ __html: productData.raw_json.description || productData.description_html }}
            />
            
          </div>

          
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

          <RelatedProducts currentProductId={productData.id} />
          
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

        
        <div className="mt-16 border rounded-lg p-8 bg-card text-center">
          <h2 className="text-2xl font-bold mb-3">Have Questions?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our luxury specialists are available 24/7 to assist you with any questions about this item or to schedule a private viewing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="outline" asChild>
              <a href="tel:+447700184435">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +44-7700-18-44-35
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="mailto:info@lux-store.eu">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
              </a>
            </Button>
            <ChatButton />
          </div>
        </div>
      </main>

        <Footer />
      </div>
    </>
  );
}
