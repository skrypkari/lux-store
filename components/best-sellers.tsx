"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrendingUp, ShoppingCart, Eye } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useState } from "react";

interface BestSellerProduct {
  id: string;
  name: string;
  brand: string;
  slug?: string;
  sku?: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge: string;
  badgeColor: string;
  currency: string;
}

const staticProducts: BestSellerProduct[] = [

  {
    id: '768026209',
    name: "Hermès Kelly Sellier 20 Black Epsom Gold Hardware",
    brand: "HERMÈS",
    slug: "hermes-kelly-sellier-20-black-epsom-gold-hardware",
    sku: "H076099CK89",
    price: 15722,
    originalPrice: undefined,
    image: "/5056804387.jpg",
    badge: "Best Seller",
    badgeColor: "gold",
    currency: "EUR",
  },
  {
    id: '768064173',
    name: "Hermès Kelly Sellier 20 Gold Epsom Palladium Hardware",
    brand: "HERMÈS",
    slug: "hermes-kelly-sellier-20-gold-epsom-palladium-hardware",
    sku: "H076099CK37/02",
    price: 14861,
    originalPrice: undefined,
    image: "/5056805261.jpg",
    badge: "Trending",
    badgeColor: "red",
    currency: "EUR",
  },
  {
    id: '768122045',
    name: "Hermès Kelly Sellier 25 Black Shiny Alligator Gold Hardware",
    brand: "HERMÈS",
    slug: "hermes-kelly-sellier-25-black-shiny-alligator-gold-hardware",
    sku: "H078792CK89",
    price: 33304,
    originalPrice: undefined,
    image: "/5056865097.jpg",
    badge: "Limited",
    badgeColor: "purple",
    currency: "EUR",
  },
  {
    id: '768122046',
    name: "Hermès \"Quelle Idolle\" Kelly Doll Orange and Rose Sakura Swift Gold Hardware",
    brand: "HERMÈS",
    slug: "hermes-quelle-idolle-kelly-doll-orange-and-rose-sakura-swift-gold-hardware",
    sku: "H079267CKAA",
    price: 32014,
    originalPrice: undefined,
    image: "/5056865167.jpg",
    badge: "Exclusive",
    badgeColor: "cyan",
    currency: "EUR",
  },
  {
    id: '768016913',
    name: "Hermès Birkin 25 Black Togo Rose Gold Hardware",
    brand: "HERMÈS",
    slug: "hermes-birkin-25-black-togo-rose-gold-hardware",
    sku: "H056011CK89/03",
    price: 13966,
    originalPrice: undefined,
    image: "/5056635635.jpg",
    badge: "Popular",
    badgeColor: "orange",
    currency: "EUR",
  },
  {
    id: '768016992',
    name: "Hermès Birkin 25 Gold Togo Palladium Hardware",
    brand: "HERMÈS",
    slug: "hermes-birkin-25-gold-togo-palladium-hardware",
    sku: "H056018CK37/01",
    price: 13106,
    originalPrice: undefined,
    image: "/5056771376.jpg",
    badge: "Iconic",
    badgeColor: "blue",
    currency: "EUR",
  },
  {
    id: '768026113',
    name: "Hermès Birkin 30 Craie Togo Gold Hardware",
    brand: "HERMÈS",
    slug: "hermes-birkin-30-craie-togo-gold-hardware",
    sku: "H056018CK10",
    price: 14825,
    originalPrice: undefined,
    image: "/5056666107.jpg",
    badge: "New",
    badgeColor: "green",
    currency: "EUR",
  },
  {
    id: '768026143',
    name: "Hermès Birkin 25 Braise Shiny Porosus Crocodile Gold Hardware",
    brand: "HERMÈS",
    slug: "hermes-birkin-25-braise-shiny-porosus-crocodile-gold-hardware",
    sku: "H075031CC85",
    price: 40706,
    originalPrice: undefined,
    image: "/5056701415.jpg",
    badge: "Investment",
    badgeColor: "amber",
    currency: "EUR",
  },

  {
    id: '764748979',
    name: "Classic 11.12 Handbag",
    brand: "CHANEL",
    slug: "classic-11-12-handbag",
    sku: "A01112Y0129594305",
    price: 8240,
    originalPrice: undefined,
    image: "/5026820434.jpg",
    badge: "Luxury",
    badgeColor: "gold",
    currency: "EUR",
  },
  {
    id: '759615190',
    name: "Herbag Zip 31 hobnailed bag",
    brand: "HERMÈS",
    slug: "herbag-zip-31-hobnailed-bag",
    sku: "H085131CKAA",
    price: 4520,
    originalPrice: undefined,
    image: "/4981729074.jpg",
    badge: "Hot",
    badgeColor: "red",
    currency: "EUR",
  },
  {
    id: '761602752',
    name: "Dioriviera Medium Dior Book Tote",
    brand: "DIOR",
    slug: "dioriviera-medium-dior-book-tote",
    sku: "M1296ZEYD_M086",
    price: 2400,
    originalPrice: undefined,
    image: "/4998903248.jpg",
    badge: "Rare",
    badgeColor: "purple",
    currency: "EUR",
  },
  {
    id: '752024392',
    name: "Juste un Clou bracelet, classic model, diamonds",
    brand: "CARTIER",
    slug: "juste-un-clou-bracelet-classic-model-diamonds-752024392",
    sku: "N6709817",
    price: 42000,
    originalPrice: undefined,
    image: "/4928281961.jpg",
    badge: "Elite",
    badgeColor: "cyan",
    currency: "EUR",
  },
  {
    id: '751171684',
    name: "LOVE bracelet, small model, 10 diamonds",
    brand: "CARTIER",
    slug: "love-bracelet-small-model-10-diamonds-751171684",
    sku: "B6079617",
    price: 8240,
    originalPrice: undefined,
    image: "/4924189663.jpg",
    badge: "Classic",
    badgeColor: "orange",
    currency: "EUR",
  },
  {
    id: '751171572',
    name: "Clash de Cartier bracelet, flexible, medium model",
    brand: "CARTIER",
    slug: "clash-de-cartier-bracelet-flexible-medium-model",
    sku: "N6718717",
    price: 7920,
    originalPrice: undefined,
    image: "/4924112974.jpg",
    badge: "Chic",
    badgeColor: "blue",
    currency: "EUR",
  },
  {
    id: '752641562',
    name: "Juste un Clou torque necklace, small model, diamonds",
    brand: "CARTIER",
    slug: "juste-un-clou-torque-necklace-small-model-diamonds-752641562",
    sku: "N7424422",
    price: 14720,
    originalPrice: undefined,
    image: "/4932701558.jpg",
    badge: "Premium",
    badgeColor: "green",
    currency: "EUR",
  },
  {
    id: '766639252',
    name: "Fil de Camélia Earrings",
    brand: "CHANEL",
    slug: "fil-de-camelia-earrings",
    sku: "J2672",
    price: 14800,
    originalPrice: undefined,
    image: "/5045657976.jpg",
    badge: "Elegant",
    badgeColor: "amber",
    currency: "EUR",
  },
  {
    id: '754043337',
    name: "C de Cartier Precious Glasses",
    brand: "CARTIER",
    slug: "c-de-cartier-precious-glasses",
    sku: "EYP00030",
    price: 11280,
    originalPrice: undefined,
    image: "/4942445605.jpg",
    badge: "Refined",
    badgeColor: "gold",
    currency: "EUR",
  },
  {
    id: '754043437',
    name: "Panthère de Cartier sunglasses",
    brand: "CARTIER",
    slug: "panthere-de-cartier-sunglasses-754043437",
    sku: "ESW00687",
    price: 960,
    originalPrice: undefined,
    image: "/4942468176.jpg",
    badge: "Style",
    badgeColor: "red",
    currency: "EUR",
  },
  {
    id: '761192655',
    name: "Medium Lady Dior Bag",
    brand: "DIOR",
    slug: "medium-lady-dior-bag-761192655",
    sku: "M0565ONGE_M59U",
    price: 4720,
    originalPrice: undefined,
    image: "/4994560813.jpg",
    badge: "Signature",
    badgeColor: "purple",
    currency: "EUR",
  },
  {
    id: '762051373',
    name: "30 Montaigne Bag",
    brand: "DIOR",
    slug: "30-montaigne-bag-762051373",
    sku: "M9203UMOS_M941",
    price: 2680,
    originalPrice: undefined,
    image: "/5002527518.jpg",
    badge: "Modern",
    badgeColor: "cyan",
    currency: "EUR",
  },
  {
    id: '756394817',
    name: "GMT-Master II",
    brand: "ROLEX",
    slug: "gmt-master-ii-756394817",
    sku: "126718GRNR/01",
    price: 35680,
    originalPrice: undefined,
    image: "/4959597583.jpg",
    badge: "Prestige",
    badgeColor: "green",
    currency: "EUR",
  },
  {
    id: '757459485',
    name: "Yacht-Master 42",
    brand: "ROLEX",
    slug: "yacht-master-42-757459485",
    sku: "226658",
    price: 26800,
    originalPrice: undefined,
    image: "/4965840593.jpg",
    badge: "Sport",
    badgeColor: "blue",
    currency: "EUR",
  },
  {
    id: '755920973',
    name: "Lady-Datejust",
    brand: "ROLEX",
    slug: "lady-datejust-755920973",
    sku: "279381RBR/01",
    price: 15000,
    originalPrice: undefined,
    image: "/4957572239.jpg",
    badge: "Timeless",
    badgeColor: "orange",
    currency: "EUR",
  },
  {
    id: '756544656',
    name: "Submariner Date",
    brand: "ROLEX",
    slug: "submariner-date-756544656",
    sku: "126613LN",
    price: 14080,
    originalPrice: undefined,
    image: "/4960337522.jpg",
    badge: "Iconic",
    badgeColor: "blue",
    currency: "EUR",
  },
  {
    id: '791181355',
    name: "GUCCI 25H watch",
    brand: "GUCCI",
    slug: "gucci-25h-watch-791181355",
    sku: "673301I16F01108",
    price: 8960,
    originalPrice: undefined,
    image: "/5296080061.jpg",
    badge: "Diamond",
    badgeColor: "purple",
    currency: "EUR",
  },
  {
    id: '791085849',
    name: "Dionysus medium shoulder bag",
    brand: "GUCCI",
    slug: "dionysus-medium-shoulder-bag",
    sku: "49962392TJN8660",
    price: 2160,
    originalPrice: undefined,
    image: "/5293673508.jpg",
    badge: "Trendy",
    badgeColor: "cyan",
    currency: "EUR",
  },
  {
    id: '790971882',
    name: "Gucci Horsebit 1955 crystals small shoulder bag",
    brand: "GUCCI",
    slug: "gucci-horsebit-1955-crystals-small-shoulder-bag",
    sku: "67580121HRG2687",
    price: 2640,
    originalPrice: undefined,
    image: "/5291991111.jpg",
    badge: "Crystal",
    badgeColor: "amber",
    currency: "EUR",
  },
  {
    id: '790950714',
    name: "GG Marmont large shoulder bag",
    brand: "GUCCI",
    slug: "gg-marmont-large-shoulder-bag-790950714",
    sku: "850659AAFS11000",
    price: 2320,
    originalPrice: undefined,
    image: "/5291572082.jpg",
    badge: "Classic",
    badgeColor: "gold",
    currency: "EUR",
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

  const products = staticProducts;
  const { addToCart } = useCart();
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const handleAddToCart = (product: BestSellerProduct) => {
    setAddingToCart(product.id);
    addToCart({
      id: parseInt(product.id),
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      sku: product.sku,
      inStock: true,
    });
    
    setTimeout(() => {
      setAddingToCart(null);
    }, 1000);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4">
        
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group"
            >
              <div className="relative overflow-hidden bg-white border border-neutral-200/60 hover:border-neutral-300 transition-all duration-500 hover:shadow-xl">
                <div className="absolute inset-0 opacity-[0.1]">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                  }} />
                </div>
                
                <Link href={`/products/${product.slug}`}>
                  <div className="relative w-full aspect-square overflow-hidden bg-[#f4f4f4]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </Link>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-semibold tracking-[0.3em] text-neutral-400 uppercase">
                      {product.brand}
                    </p>
                    <p className="text-[9px] font-mono text-neutral-400">
                      SKU: {product.sku}
                    </p>
                  </div>

                  <Link href={`/products/${product.slug}`}>
                    <h3 className="text-base font-medium text-neutral-900 hover:text-neutral-600 transition-colors min-h-[44px] leading-snug line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-baseline gap-2 pt-3 pb-2">
                    <span className="text-lg font-semibold text-neutral-900">
                      €{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-neutral-400 line-through">
                        €{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Link href={`/products/${product.slug}`} className="flex-1 relative z-10">
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
                            Add to Cart
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
            </div>
          ))}
        </div>

        
        <div className="text-center mt-16">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-neutral-900 hover:bg-neutral-900 hover:text-white px-8 group"
            asChild
          >
            <Link href="/store/all">
              View All Products
              <TrendingUp className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
