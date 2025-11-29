"use client";

import { use, useState, useEffect, useRef, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useCart } from "@/contexts/cart-context";
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
import {
  SlidersHorizontal,
  Grid3x3,
  LayoutGrid,
  X,
  Star,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    brand?: string;
  }>;
}

interface Product {
  id: string;
  name: string;
  slug_without_id: string;
  subtitle?: string;
  sku?: string;
  base_price?: number;
  currency: string;
  is_sold_out: boolean;
  description_html?: string;
  media?: Array<{ url_800?: string; url_original?: string }>;
  attributes?: Array<{
    attribute_id: string;
    value: string;
    attribute: {
      id: string;
      name: string;
      type: string;
    };
  }>;

  brand?: string;
  price?: number;
  originalPrice?: number;
  image?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  description?: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  take: number;
  hasMore: boolean;
}

interface AttributeValue {
  id: string;
  name: string;
  type: string;
  values: string[];
}

function CategoryPageContent({ params, searchParams }: PageProps) {
  const { category } = use(params);
  const { brand } = use(searchParams);
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const { addToCart } = useCart();
  const [priceRange, setPriceRange] = useState([0, 400000]);
  const tempPriceRef = useRef([0, 400000]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [attributes, setAttributes] = useState<AttributeValue[]>([]);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [appliedFilters, setAppliedFilters] = useState<
    Record<string, string[]>
  >({});
  const [priceResetTrigger, setPriceResetTrigger] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [sortBy, setSortBy] = useState("featured");
  const [addingToCart, setAddingToCart] = useState<Record<string, boolean>>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const pageSize = 12;

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






  const getCategoryInfo = () => {
    const lowerCategory = category.toLowerCase();
    const normalizedBrand = brandName?.toLowerCase().replace(/è|e/g, 'e');
    

    if (lowerCategory === "hermes-kelly" || lowerCategory === "hermès-kelly") {
      return { type: "bags", brand: "Hermès", model: "Kelly" };
    }
    if (lowerCategory === "hermes-birkin" || lowerCategory === "hermès-birkin") {
      return { type: "bags", brand: "Hermès", model: "Birkin" };
    }
    if (lowerCategory === "hermes-constance" || lowerCategory === "hermès-constance") {
      return { type: "bags", brand: "Hermès", model: "Constance" };
    }
    

    if (lowerCategory === "jewellery" || lowerCategory === "jewelry") {

      let displayBrand = brandName;
      if (normalizedBrand === "hermes") {
        displayBrand = "Hermès";
      }
      

      const jewelryCategories = ["earrings", "rings", "bracelets", "necklaces"];
      if (brandName && jewelryCategories.includes(brandName.toLowerCase())) {
        return {
          type: brandName.toLowerCase(),
          brand: null,
          model: null
        };
      }
      
      return { 
        type: "jewelry", 
        brand: displayBrand || null, 
        model: null 
      };
    }
    

    if (lowerCategory === "bags" || lowerCategory === "watches" || lowerCategory === "sunglasses") {

      let displayBrand = brandName;
      if (normalizedBrand === "hermes") {
        displayBrand = "Hermès";
      }
      
      return { 
        type: lowerCategory, 
        brand: displayBrand || null, 
        model: null 
      };
    }
    
    return { type: category, brand: brandName || null, model: null };
  };

  const categoryInfo = getCategoryInfo();


  useEffect(() => {
    if (isInitialized) return;

    const filters: Record<string, string[]> = {};
    

    urlSearchParams.forEach((value, key) => {
      if (key === 'sortBy' || key === 'page' || key === 'minPrice' || key === 'maxPrice' || key === 'brand') {
        return; // Пропускаем служебные параметры
      }
      
      if (!filters[key]) {
        filters[key] = [];
      }
      filters[key].push(value);
    });


    const urlSortBy = urlSearchParams.get('sortBy');
    if (urlSortBy) {
      setSortBy(urlSortBy);
    }


    const urlPage = urlSearchParams.get('page');
    if (urlPage) {
      setPage(parseInt(urlPage));
    }


    const urlMinPrice = urlSearchParams.get('minPrice');
    const urlMaxPrice = urlSearchParams.get('maxPrice');
    if (urlMinPrice || urlMaxPrice) {
      const min = urlMinPrice ? parseInt(urlMinPrice) : 0;
      const max = urlMaxPrice ? parseInt(urlMaxPrice) : 400000;
      setPriceRange([min, max]);
      tempPriceRef.current = [min, max];
    }


    if (Object.keys(filters).length > 0) {
      setSelectedFilters(filters);
      setAppliedFilters(filters);
    }

    setIsInitialized(true);
  }, []);


  const updateURL = (
    newFilters: Record<string, string[]>,
    newSortBy: string,
    newPage: number,
    newPriceRange: number[]
  ) => {
    const params = new URLSearchParams();


    if (brand) {
      params.set('brand', brand);
    }


    if (newSortBy && newSortBy !== 'featured') {
      params.set('sortBy', newSortBy);
    }


    if (newPage > 0) {
      params.set('page', newPage.toString());
    }


    if (newPriceRange[0] > 0 || newPriceRange[1] < 400000) {
      params.set('minPrice', newPriceRange[0].toString());
      params.set('maxPrice', newPriceRange[1].toString());
    }


    Object.entries(newFilters).forEach(([key, values]) => {
      values.forEach((value) => {
        params.append(key, value);
      });
    });


    const newURL = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    router.push(newURL, { scroll: false });
  };


  const toggleFilter = (attributeName: string, value: string) => {

    const currentValues = selectedFilters[attributeName] || [];
    const isSelected = currentValues.includes(value);

    let newFilters;
    if (isSelected) {

      const newValues = currentValues.filter((v) => v !== value);
      if (newValues.length === 0) {
        const { [attributeName]: _, ...rest } = selectedFilters;
        newFilters = rest;
      } else {
        newFilters = { ...selectedFilters, [attributeName]: newValues };
      }
    } else {

      newFilters = {
        ...selectedFilters,
        [attributeName]: [...currentValues, value],
      };
    }


    setSelectedFilters(newFilters);


    startTransition(() => {
      setAppliedFilters(newFilters);
      setPage(0);
      updateURL(newFilters, sortBy, 0, priceRange);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };


  const clearAllFilters = () => {
    setSelectedFilters({});
    setAppliedFilters({});
    tempPriceRef.current = [0, 400000];
    setPriceRange([0, 400000]);
    setPriceResetTrigger((prev) => prev + 1); // Триггер для сброса PriceSlider
    setPage(0);
    updateURL({}, sortBy, 0, [0, 400000]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  useEffect(() => {
    setLoading(true);

    if (page > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    const skip = page * pageSize;


    const queryParams = new URLSearchParams();
    queryParams.append("skip", skip.toString());
    queryParams.append("take", pageSize.toString());


    if (sortBy) {
      queryParams.append("sortBy", sortBy);
    }


    if (priceRange[0] > 0 || priceRange[1] < 400000) {
      queryParams.append("minPrice", priceRange[0].toString());
      queryParams.append("maxPrice", priceRange[1].toString());
    }


    if (brand) {
      queryParams.append("Brand", brand);
    }


    Object.entries(appliedFilters).forEach(([attributeName, values]) => {
      values.forEach((value) => {
        queryParams.append(attributeName, value);
      });
    });


    const baseUrl =
      category === "all"
        ? `https://api.lux-store.eu/products`
        : `https://api.lux-store.eu/products/category/${category}`;

    const url = `${baseUrl}?${queryParams.toString()}`;

    console.log("Fetching products with URL:", url);
    console.log("Sort by:", sortBy);

    fetch(url)
      .then((res) => res.json())
      .then((data: ProductsResponse) => {
        console.log("Products response:", data);
        console.log("Number of products:", data.products?.length);
        setProducts(data.products || []);
        setTotal(data.total || 0);
        setHasMore(data.hasMore || false);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
        setTotal(0);
        setLoading(false);
      });
  }, [category, page, priceRange, appliedFilters, brand, sortBy]);


  useEffect(() => {
    setLoadingFilters(true);


    const queryParams = new URLSearchParams();


    if (category && category !== "all") {
      queryParams.append("categorySlug", category);
    } else {
      queryParams.append("categorySlug", "all");
    }


    if (priceRange[0] > 0 || priceRange[1] < 400000) {
      queryParams.append("minPrice", priceRange[0].toString());
      queryParams.append("maxPrice", priceRange[1].toString());
    }


    if (brand) {
      queryParams.append("Brand", brand);
    }


    Object.entries(appliedFilters).forEach(([attributeName, values]) => {
      values.forEach((value) => {
        queryParams.append(attributeName, value);
      });
    });

    const url = `https://api.lux-store.eu/attributes/available/filtered?${queryParams.toString()}`;

    fetch(url)
      .then((res) => res.json())
      .then((data: AttributeValue[]) => {
        console.log("Available attributes:", data);
        setAttributes(data || []);
        setLoadingFilters(false);
      })
      .catch((error) => {
        console.error("Error fetching attributes:", error);
        setAttributes([]);
        setLoadingFilters(false);
      });
  }, [category, appliedFilters, priceRange, brand]);


  const displayProducts = products.map((product) => ({
    ...product,
    brand: getBrandFromProduct(product),
    price: product.base_price || 0,
    image:
      product.media?.[0]?.url_original ||
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    rating: 4.5 + Math.random() * 0.5,
    reviews: Math.floor(Math.random() * 200) + 50,
    inStock: !product.is_sold_out,
    description: getCollectionFromProduct(product),
  }));


  function getBrandFromProduct(product: Product): string {

    const brandAttribute = product.attributes?.find(
      (attr) =>
        attr.attribute.name === "Brand" || attr.attribute.type === "BRAND"
    );

    if (brandAttribute) {
      return brandAttribute.value;
    }


    const brands = [
      "HERMÈS",
      "CARTIER",
      "ROLEX",
      "CHANEL",
      "GUCCI",
      "DIOR",
    ];
    for (const brand of brands) {
      if (product.name.toUpperCase().includes(brand)) {
        return brand;
      }
    }


    return product.name.split(" ")[0].toUpperCase();
  }


  function getCollectionFromProduct(product: Product): string {

    const collectionAttribute = product.attributes?.find(
      (attr) => attr.attribute.name === "Collection"
    );

    if (collectionAttribute) {
      return collectionAttribute.value;
    }

    return "Luxury Collection";
  }


  const handleAddToCart = (product: typeof displayProducts[0]) => {
    setAddingToCart(prev => ({ ...prev, [product.id]: true }));
    
    addToCart({
      id: parseInt(product.id),
      name: product.name,
      brand: product.brand || "Luxury Brand",
      price: product.price || 0,
      image: product.image || "",
      sku: product.sku,
      inStock: product.inStock || false
    });

    setTimeout(() => {
      setAddingToCart(prev => ({ ...prev, [product.id]: false }));
    }, 1000);
  };

  const PriceSlider = () => {

    const [localPrice, setLocalPrice] = useState(() => tempPriceRef.current);
    const [isInitialized, setIsInitialized] = useState(false);


    useEffect(() => {
      setLocalPrice(tempPriceRef.current);
      setIsInitialized(true);
    }, [priceResetTrigger]);


    useEffect(() => {

      if (!isInitialized) {
        setIsInitialized(true);
        return;
      }

      const timer = setTimeout(() => {
        setPriceRange(localPrice);
        setPage(0);
        updateURL(appliedFilters, sortBy, 0, localPrice);
      }, 300); // Задержка 300мс после последнего изменения

      return () => clearTimeout(timer);
    }, [localPrice]);

    return (
      <AccordionItem value="price">
        <AccordionTrigger className="text-sm font-medium">
          Price Range
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 pt-2">
            <Slider
              value={localPrice}
              onValueChange={(value) => {
                setLocalPrice(value);
                tempPriceRef.current = value;
              }}
              max={400000}
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
                  value={localPrice[0]}
                  onChange={(e) => {
                    const newValue = [Number(e.target.value), localPrice[1]];
                    setLocalPrice(newValue);
                    tempPriceRef.current = newValue;
                  }}
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
                  value={localPrice[1]}
                  onChange={(e) => {
                    const newValue = [localPrice[0], Number(e.target.value)];
                    setLocalPrice(newValue);
                    tempPriceRef.current = newValue;
                  }}
                  className="w-full pl-7 pr-3 py-2 text-sm border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Max"
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>${localPrice[0].toLocaleString()}</span>
              <span>${localPrice[1].toLocaleString()}</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  const FiltersContent = () => {
    if (loadingFilters) {
      return (
        <div className="space-y-6 px-4 lg:px-0 pb-20 lg:pb-0">
          <p className="text-sm text-muted-foreground">Loading filters...</p>
        </div>
      );
    }

    return (
      <div className="space-y-6 px-4 lg:px-0 pb-20 lg:pb-0">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs"
            onClick={clearAllFilters}
          >
            <X className="h-3.5 w-3.5 mr-1.5" />
            Clear All
          </Button>
        </div>

        <Accordion
          type="multiple"
          defaultValue={[
            "price",
            ...(Array.isArray(attributes) ? attributes.slice(0, 3).map((attr) => attr.name.toLowerCase()) : []),
          ]}
          className="w-full"
        >
          <PriceSlider />

          {Array.isArray(attributes) && attributes.map((attribute) => (
            <AccordionItem
              key={attribute.id}
              value={attribute.name.toLowerCase()}
            >
              <AccordionTrigger className="text-sm font-medium">
                <div className="flex">
                  {attribute.name}
                  {selectedFilters[attribute.name]?.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedFilters[attribute.name].length}
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2 max-h-64 overflow-y-auto">
                  {attribute.values.map((value) => {
                    const isChecked =
                      selectedFilters[attribute.name]?.includes(value) || false;
                    return (
                      <div
                        key={value}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`${attribute.name}-${value}`}
                            checked={isChecked}
                            onCheckedChange={() =>
                              toggleFilter(attribute.name, value)
                            }
                          />
                          <Label
                            htmlFor={`${attribute.name}-${value}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {value}
                          </Label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      
      <div className="border-b bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <span>Home</span>
              <span>/</span>
              <span>Store</span>
              <span>/</span>
              <span className="text-foreground font-medium">
                {categoryName}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {categoryName}
            </h1>
            {brandName && (
              <p className="text-lg text-muted-foreground">
                Showing all{" "}
                <span className="font-semibold text-foreground">
                  {brandName}
                </span>{" "}
                products
              </p>
            )}
            {!brandName && (
              <p className="text-muted-foreground mt-2">
                Discover our curated collection of authentic luxury items
              </p>
            )}
          </div>
        </div>
      </div>

      <main className="container min-h-[calc(100vh-515px)] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              
              <div className="border rounded-lg p-6 bg-card shadow-sm">
                <FiltersContent />
              </div>

              
              <div className="border rounded-lg p-6 bg-card shadow-sm">
                <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Authenticity Guarantee
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We guarantee the authenticity of all products — every piece is
                  a genuine creation by the brand, delivered with its original
                  packaging and documentation.{" "}
                </p>
              </div>

              
              <div className="border rounded-lg p-6 bg-card shadow-sm">
                <h3 className="font-semibold text-sm mb-4">Need Help?</h3>
                <div className="space-y-3 text-xs">
                  <a
                    href="mailto:info@lux-store.eu"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    info@lux-store.eu
                  </a>
                  <a
                    href="tel:+447700184435"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    +44-7700-18-44-35
                  </a>
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        const jivo = (window as any).jivo_api;
                        if (jivo) {
                          try {
                            jivo.open();
                            console.log('✅ Jivo chat opened');
                          } catch (error) {
                            console.error('❌ Error opening Jivo:', error);
                          }
                        } else {
                          console.log('⚠️ Jivo API not available yet');
                        }
                      }
                    }}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-full text-left"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Online Chat
                  </button>
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
                  <SheetContent
                    side="left"
                    className="w-[300px] sm:w-[350px] overflow-y-auto"
                  >
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
                    {loading ? (
                      "Loading..."
                    ) : (
                      <>
                        <span className="font-medium">{total}</span> products
                        available
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Select
                  value={sortBy}
                  onValueChange={(value) => {
                    setSortBy(value);
                    setPage(0);
                    updateURL(appliedFilters, value, 0, priceRange);
                  }}
                >
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="bestsellers">Best Sellers</SelectItem>
                    <SelectItem value="a-z">Name: A-Z</SelectItem>
                    <SelectItem value="z-a">Name: Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-muted/30 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-background flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold">Authenticated</div>
                  <div className="text-xs text-muted-foreground">
                    100% Genuine
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-background flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold">Secure Payment</div>
                  <div className="text-xs text-muted-foreground">
                    SSL Encrypted
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-background flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold">Easy Returns</div>
                  <div className="text-xs text-muted-foreground">
                    30 Day Policy
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-background flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold">Free Shipping</div>
                  <div className="text-xs text-muted-foreground">
                    DHL Express
                  </div>
                </div>
              </div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-20">
                  <p className="text-muted-foreground">Loading products...</p>
                </div>
              ) : displayProducts.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <p className="text-muted-foreground">
                    No products found in this category
                  </p>
                </div>
              ) : (
                displayProducts.map((product) => {
                  console.log("Product:", product);
                  return (
                    <div
                      key={product.id}
                      className="group relative flex flex-col bg-card border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                    >
                      
                      <div
                        className="relative aspect-square overflow-hidden bg-muted cursor-pointer"
                        onClick={() =>
                          (window.location.href = `/products/${product.slug_without_id}`)
                        }
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                            <span className="text-white text-sm font-semibold tracking-wide">
                              SOLD OUT
                            </span>
                          </div>
                        )}

                        
                        {product.originalPrice && (
                          <div className="absolute top-0 right-0 bg-foreground text-background px-3 py-1.5 text-xs font-bold tracking-wider">
                            -
                            {Math.round(
                              ((product.originalPrice - product.price) /
                                product.originalPrice) *
                                100
                            )}
                            % OFF
                          </div>
                        )}
                      </div>

                      
                      <div className="flex flex-col flex-1 p-5">
                        
                        <div className="mb-3">
                          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                            {product.brand}
                          </span>
                        </div>

                        
                        <h3 className="font-bold text-base leading-tight mb-2 min-h-[2.5rem] line-clamp-2">
                          {product.name}
                        </h3>

                        
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
                          {product.description}
                        </p>

                        
                        <div className="flex items-center mb-4">
                          <code className="text-xs bg-muted/50 px-2 py-1 rounded font-mono">
                            {product.sku}
                          </code>
                        </div>

                        <Separator className="mb-4" />

                        
                        <div className="flex items-end justify-between gap-3">
                          <div className="flex flex-col">
                            {product.originalPrice && (
                              <span className="text-xs text-muted-foreground line-through mb-0.5">
                                €{product.originalPrice.toLocaleString()}
                              </span>
                            )}
                            <span className="text-2xl font-bold tracking-tight">
                              €{product.price.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="font-semibold"
                              onClick={() =>
                                (window.location.href = `/products/${product.slug_without_id}`)
                              }
                            >
                              Details
                            </Button>
                            <Button
                              size="icon"
                              className="relative h-8 w-8 shadow-md transition-all duration-300 hover:scale-110"
                              disabled={!product.inStock}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                              }}
                            >
                              {addingToCart[product.id] ? (
                                <span className="text-xs font-bold animate-bounce">✓</span>
                              ) : (
                                <ShoppingCart className="h-4 w-4" />
                              )}
                              
                              
                              {addingToCart[product.id] && (
                                <span className="absolute inset-0 rounded-md bg-white animate-ping opacity-75" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>

                      
                      <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-300 pointer-events-none" />
                    </div>
                  );
                })
              )}
            </div>

            
            {!loading && total > pageSize && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  onClick={() => {
                    const newPage = Math.max(0, page - 1);
                    setPage(newPage);
                    updateURL(appliedFilters, sortBy, newPage, priceRange);
                  }}
                  disabled={page === 0}
                >
                  Previous
                </Button>
                <div className="text-sm text-muted-foreground">
                  Page {page + 1} of {Math.ceil(total / pageSize)}
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    const newPage = page + 1;
                    setPage(newPage);
                    updateURL(appliedFilters, sortBy, newPage, priceRange);
                  }}
                  disabled={!hasMore}
                >
                  Next
                </Button>
              </div>
            )}

            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 border rounded-lg bg-card">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">100% Authenticity</h3>
                <p className="text-sm text-muted-foreground">
                  Every item in our collection is original and sourced directly from official brand boutiques and authorized retailers.
                </p>
              </div>

              <div className="text-center p-6 border rounded-lg bg-card">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Fast & Secure Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  DHL Express shipping with full insurance and tracking included
                </p>
              </div>

              <div className="text-center p-6 border rounded-lg bg-card">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Concierge Service</h3>
                <p className="text-sm text-muted-foreground">
                  Dedicated luxury advisors available 24/7 for assistance
                </p>
              </div>
            </div>

            
            
            
            
            {categoryInfo.type === "bags" && categoryInfo.brand === "Hermès" && categoryInfo.model === "Kelly" ? (
              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Hermès Kelly Bags</h2>
                  
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy a Hermès Kelly bag</span> — the ultimate symbol of elegance and refined Parisian style.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Handcrafted by Hermès artisans, the Kelly embodies precision, grace, and timeless allure. Its iconic trapezoid silhouette, signature clasp, and meticulous stitching make it a masterpiece recognized around the world.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Discover authentic Hermès Kelly bags in a variety of sizes, leathers, and colors — each piece a rare blend of heritage and modern sophistication.
                  </p>
                  
                  <p className="text-foreground/90 leading-relaxed">
                    Choose yours and <span className="font-semibold">buy an Hermès Kelly bag</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            ) : categoryInfo.type === "bags" && categoryInfo.brand === "Hermès" && categoryInfo.model === "Birkin" ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Hermès Birkin Bags</h2>
                  
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy a Hermès Birkin bag</span> — the ultimate icon of luxury, craftsmanship, and timeless allure.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Handcrafted in France by Hermès artisans, each Birkin represents perfection in every stitch, made from the finest leathers and rare materials. From classic neutral tones to limited-edition colors, the Birkin bag is a masterpiece that transcends fashion and becomes a legacy.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Discover authentic Hermès Birkin bags — symbols of elegance, prestige, and individuality.
                  </p>
                  
                  <p className="text-foreground/90 leading-relaxed">
                    Choose yours and <span className="font-semibold">buy an Hermès Birkin bag</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            ) : categoryInfo.type === "bags" && categoryInfo.brand === "Hermès" && categoryInfo.model === "Constance" ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Hermès Constance Bags</h2>
                  
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy a Hermès Constance bag</span> — the embodiment of discreet elegance and timeless Parisian chic.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Handcrafted by Hermès artisans, the Constance is celebrated for its sleek silhouette, iconic "H" clasp, and effortless sophistication. Each bag reflects the Maison's devotion to craftsmanship, precision, and refined simplicity.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Discover authentic Hermès Constance bags in classic and modern hues — crafted from the world's finest leathers.
                  </p>
                  
                  <p className="text-foreground/90 leading-relaxed">
                    Choose yours and <span className="font-semibold">buy an Hermès Constance bag</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            ) : categoryInfo.type === "bags" && categoryInfo.brand === "Cartier" ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Cartier Bags</h2>
                  
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy Cartier bags</span> and embrace timeless elegance and refined taste. Each Cartier bag reflects the Maison's legendary craftsmanship — a perfect fusion of artistry and luxury.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Graceful lines, noble shapes, and exquisite details define every creation — from the iconic <span className="font-medium text-foreground">Panthère de Cartier</span> to the sophisticated <span className="font-medium text-foreground">Double C de Cartier</span>.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Discover authentic women's and men's Cartier bags — symbols of distinction and modern grace.
                  </p>
                  
                  <p className="text-foreground/90 leading-relaxed">
                    Choose yours and <span className="font-semibold">buy a Cartier bag</span> with an authenticity guarantee and worldwide delivery.
                  </p>
                </div>
              </div>
            ) : categoryInfo.type === "bags" && categoryInfo.brand === "Hermès" ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Hermès Bags</h2>
                  
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy Hermès bags</span> and experience the essence of true French luxury. Each Hermès creation is handcrafted by skilled artisans, reflecting generations of craftsmanship and timeless elegance.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    From the legendary <span className="font-medium text-foreground">Birkin</span> and <span className="font-medium text-foreground">Kelly</span> to the refined <span className="font-medium text-foreground">Constance</span>, every Hermès bag embodies perfection in form, rare materials, and impeccable quality.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Discover authentic women's and men's Hermès bags — icons of status, taste, and enduring sophistication.
                  </p>
                  
                  <p className="text-foreground/90 leading-relaxed">
                    Choose yours and <span className="font-semibold">buy an Hermès bag</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            ) : categoryInfo.type === "bags" && categoryInfo.brand === "Dior" ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Dior Bags</h2>
                  
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy Dior bags</span> and enter the world of Parisian elegance and haute couture craftsmanship.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Each Dior bag embodies femininity, grace, and the artistic vision of the House of Dior — where luxury meets timeless design. From the iconic <span className="font-medium text-foreground">Lady Dior</span> and <span className="font-medium text-foreground">Saddle Bag</span> to the modern <span className="font-medium text-foreground">Book Tote</span> and <span className="font-medium text-foreground">Caro</span>, every creation reflects exceptional attention to detail and refined sophistication.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Discover authentic Dior handbags crafted from the finest materials, blending heritage with contemporary allure.
                  </p>
                  
                  <p className="text-foreground/90 leading-relaxed">
                    Choose yours and <span className="font-semibold">buy a Dior bag</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            ) : categoryInfo.type === "bags" && categoryInfo.brand === "Chanel" ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Chanel Bags</h2>
                  
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy Chanel bags</span> and embrace the essence of timeless Parisian elegance.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Each Chanel creation — from the legendary <span className="font-medium text-foreground">Classic Flap</span> and <span className="font-medium text-foreground">2.55</span> to the modern <span className="font-medium text-foreground">Boy</span> and <span className="font-medium text-foreground">19 Bag</span> — embodies the spirit of Coco Chanel: sophistication, freedom, and impeccable taste.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Handcrafted from the finest leathers with signature quilted patterns, chain straps, and the iconic interlocking CC, every bag is a masterpiece of style. Discover authentic Chanel handbags — symbols of grace, confidence, and enduring allure.
                  </p>
                  
                  <p className="text-foreground/90 leading-relaxed">
                    Choose yours and <span className="font-semibold">buy a Chanel bag</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            ) : categoryInfo.type === "bags" && categoryInfo.brand === "Gucci" ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Gucci Bags</h2>
                  
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy Gucci bags</span> and step into the world of Italian elegance, where every detail reflects timeless style and refined taste.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Gucci collections blend Florentine craftsmanship with modern design — from the iconic <span className="font-medium text-foreground">GG monogram</span> and <span className="font-medium text-foreground">Web stripes</span> to bold contemporary silhouettes.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Discover authentic women's and men's Gucci bags: classic <span className="font-medium text-foreground">Jackie</span> and <span className="font-medium text-foreground">Dionysus</span>, or the trend-setting <span className="font-medium text-foreground">GG Marmont</span> and <span className="font-medium text-foreground">Gucci Giglio</span>.
                  </p>
                  
                  <p className="text-foreground/90 leading-relaxed">
                    Choose yours and <span className="font-semibold">buy a Gucci bag</span> with an authenticity guarantee and worldwide delivery.
                  </p>
                </div>
              </div>
            ) : categoryInfo.type === "bags" && !categoryInfo.brand ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">About Luxury Designer Bags Collection</h2>
                  
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy luxury designer bags</span> and discover the timeless elegance of the world's most iconic fashion houses — <span className="font-medium">Hermès, Cartier, Dior, Chanel, and Gucci</span>.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Each masterpiece reflects heritage, craftsmanship, and refined taste: from the legendary <span className="font-medium text-foreground">Birkin</span> and <span className="font-medium text-foreground">Kelly</span> to the elegant <span className="font-medium text-foreground">Lady Dior</span>, <span className="font-medium text-foreground">Chanel Classic Flap</span>, and <span className="font-medium text-foreground">Gucci Marmont</span>.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Every bag is a symbol of sophistication, created with the finest materials and meticulous attention to detail.
                  </p>
                  
                  <p className="text-foreground/90 leading-relaxed">
                    Explore our curated collection of authentic luxury handbags and <span className="font-semibold">buy designer bags</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            
            ) : categoryInfo.type === "watches" && categoryInfo.brand === "Cartier" ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Cartier Watches</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy Cartier watches</span> and experience the perfect harmony of timeless elegance and fine craftsmanship.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Each Cartier timepiece reflects the Maison's legacy of precision, artistry, and Parisian sophistication. From the iconic <span className="font-medium text-foreground">Tank</span> and <span className="font-medium text-foreground">Santos de Cartier</span> to the refined <span className="font-medium text-foreground">Ballon Bleu</span> and <span className="font-medium text-foreground">Pasha</span>, every watch embodies luxury in its purest form.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Discover authentic Cartier watches for men and women — created with passion, innovation, and attention to every detail.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Choose yours and <span className="font-semibold">buy a Cartier watch</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            
            ) : categoryInfo.type === "watches" && categoryInfo.brand === "Rolex" ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Rolex Watches</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy Rolex watches</span> and experience the unmatched prestige of Swiss craftsmanship.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Every Rolex timepiece is a symbol of precision, innovation, and timeless excellence — created for those who value perfection and achievement. From the legendary <span className="font-medium text-foreground">Submariner</span> and <span className="font-medium text-foreground">Day-Date</span> to the elegant <span className="font-medium text-foreground">Datejust</span> and <span className="font-medium text-foreground">GMT-Master II</span>, each watch combines technical mastery with iconic design.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Discover authentic Rolex watches for men and women — crafted to endure generations.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Choose yours and <span className="font-semibold">buy a Rolex watch</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            
            ) : categoryInfo.type === "watches" && categoryInfo.brand === "Chanel" ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Chanel Watches</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy Chanel watches</span> and embrace the perfect balance of timeless elegance and modern allure.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Each Chanel timepiece reflects the spirit of Mademoiselle Chanel — refined, bold, and effortlessly chic. From the iconic <span className="font-medium text-foreground">J12</span> and <span className="font-medium text-foreground">Première</span> to the sophisticated <span className="font-medium text-foreground">Boy·Friend</span> and <span className="font-medium text-foreground">Code Coco</span>, every watch unites Swiss precision with Parisian style.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Discover authentic Chanel watches for women and men — crafted with exceptional craftsmanship and artistic design.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Choose yours and <span className="font-semibold">buy a Chanel watch</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            
            ) : categoryInfo.type === "watches" && categoryInfo.brand === "Gucci" ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Gucci Watches</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy Gucci watches</span> and explore the bold fusion of Italian creativity and Swiss precision.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Each timepiece embodies the House's unmistakable style — expressive, luxurious, and contemporary. From the elegant <span className="font-medium text-foreground">G-Timeless</span> and <span className="font-medium text-foreground">Grip</span> to the avant-garde <span className="font-medium text-foreground">Gucci 25H collection</span>, every Gucci watch reflects individuality and artistic craftsmanship.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Discover authentic Gucci watches for men and women — designed for those who value fashion and excellence in every detail.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Choose yours and <span className="font-semibold">buy a Gucci watch</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            
            ) : categoryInfo.type === "watches" && !categoryInfo.brand ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Luxury Watches</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy luxury watches</span> and discover timeless craftsmanship from the world's most iconic brands — <span className="font-medium">Cartier, Rolex, Chanel, and Gucci</span>.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Each timepiece tells a story of precision, elegance, and innovation, uniting Swiss excellence with artistic design. From the refined sophistication of Cartier and the prestige of Rolex to the Parisian allure of Chanel and the bold creativity of Gucci — every watch is a masterpiece of style and heritage.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Explore our curated collection of authentic luxury watches and <span className="font-semibold">buy designer timepieces</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            
            ) : categoryInfo.type === "sunglasses" && categoryInfo.brand === "Cartier" ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Cartier Sunglasses</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy Cartier sunglasses</span> and experience the perfect blend of luxury, craftsmanship, and timeless elegance.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Each pair embodies the Maison's iconic design philosophy — where fine jewelry artistry meets modern eyewear sophistication. From classic aviators to bold contemporary silhouettes, Cartier sunglasses reflect confidence, refinement, and unmistakable prestige.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Discover authentic Cartier sunglasses for men and women — crafted from premium materials with signature details in gold and platinum finishes.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Choose yours and <span className="font-semibold">buy Cartier sunglasses</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            
            ) : categoryInfo.type === "sunglasses" && categoryInfo.brand === "Dior" ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Dior Sunglasses</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy Dior sunglasses</span> and step into the world of Parisian elegance and haute couture sophistication.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Each pair embodies the House of Dior's signature balance of femininity, innovation, and timeless design. From the iconic <span className="font-medium text-foreground">DiorSoLight</span> and <span className="font-medium text-foreground">DiorStellaire</span> to the bold <span className="font-medium text-foreground">CD Diamond</span> and <span className="font-medium text-foreground">DiorBlackSuit</span>, every model reflects modern glamour and meticulous craftsmanship.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Discover authentic Dior sunglasses for men and women — designed to express individuality with effortless style.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Choose yours and <span className="font-semibold">buy Dior sunglasses</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            
            ) : categoryInfo.type === "sunglasses" && categoryInfo.brand === "Chanel" ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Chanel Sunglasses</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy Chanel sunglasses</span> and discover the essence of Parisian chic and timeless sophistication.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Each pair reflects the spirit of Coco Chanel — elegant, bold, and effortlessly modern. From classic oversized frames to the iconic <span className="font-medium text-foreground">Butterfly</span>, <span className="font-medium text-foreground">Square</span>, and <span className="font-medium text-foreground">Round</span> designs, every creation combines luxury craftsmanship with distinctive style.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Discover authentic Chanel sunglasses for women and men — handcrafted with precision and adorned with the signature CC emblem.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Choose yours and <span className="font-semibold">buy Chanel sunglasses</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            
            ) : categoryInfo.type === "sunglasses" && categoryInfo.brand === "Gucci" ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Gucci Sunglasses</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy Gucci sunglasses</span> and explore the world of bold Italian style and contemporary luxury.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Each pair reflects the House's unique blend of creativity, elegance, and expressive design. From classic aviators and oversized frames to avant-garde statement pieces, Gucci sunglasses redefine modern fashion with unmistakable charm.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Discover authentic Gucci sunglasses for men and women — crafted in Italy with signature details, premium materials, and flawless craftsmanship.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Choose yours and <span className="font-semibold">buy Gucci sunglasses</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            
            ) : categoryInfo.type === "sunglasses" && !categoryInfo.brand ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Luxury Sunglasses</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy luxury sunglasses</span> and discover timeless elegance from the world's most iconic fashion houses — <span className="font-medium">Dior, Chanel, Cartier, and Gucci</span>.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Each pair embodies sophistication, craftsmanship, and modern glamour, blending haute couture design with exceptional comfort. From Dior's refined silhouettes and Chanel's Parisian chic to Cartier's jewelry-inspired details and Gucci's bold Italian flair — every creation is a statement of individuality and taste.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Explore our collection of authentic designer sunglasses and <span className="font-semibold">buy luxury eyewear</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            
            ) : categoryInfo.type === "jewelry" && !categoryInfo.brand ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Designer Jewelry</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy designer jewelry</span> and discover the timeless elegance of <span className="font-medium">Dior, Chanel, Cartier, and Gucci</span> — the world's most iconic luxury maisons.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Each piece reflects exceptional craftsmanship and unique identity: Dior's poetic femininity, Chanel's Parisian sophistication, Cartier's jewelry perfection, and Gucci's daring creativity. From rings and bracelets to necklaces and earrings, every creation combines artistry, emotion, and impeccable detail.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Explore our exclusive collection of authentic luxury jewelry and <span className="font-semibold">buy designer pieces</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            
            ) : categoryInfo.type === "bracelets" && !categoryInfo.brand ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Designer Bracelets</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy designer bracelets</span> and embrace the timeless beauty of <span className="font-medium">Dior, Chanel, Cartier, and Gucci</span>.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Each piece reflects the unique DNA of its Maison — from Cartier's jewelry artistry and Dior's feminine grace to Chanel's Parisian sophistication and Gucci's bold creativity. Discover exquisite gold, silver, and enamel bracelets, adorned with signature emblems and crafted with exceptional attention to detail.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Every bracelet is a symbol of luxury and individuality — created to elevate any look with effortless elegance.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Choose yours and <span className="font-semibold">buy luxury bracelets</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            
            ) : categoryInfo.type === "rings" && !categoryInfo.brand ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Designer Rings</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy designer rings</span> and discover the artistry of <span className="font-medium">Dior, Chanel, Cartier, and Gucci</span> — the world's most celebrated luxury maisons.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Each creation tells a story of elegance and craftsmanship: Cartier's timeless sophistication, Dior's romantic flair, Chanel's iconic minimalism, and Gucci's bold modern edge. From delicate gold bands and signature motifs to statement cocktail rings, every piece reflects perfection in design and detail.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Explore our curated collection of authentic luxury rings and <span className="font-semibold">buy designer jewelry</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            
            ) : categoryInfo.type === "necklaces" && !categoryInfo.brand ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Designer Necklaces</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy designer necklaces</span> and pendants from <span className="font-medium">Dior, Chanel, Cartier, and Gucci</span> — where timeless beauty meets exceptional craftsmanship.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Each piece captures the essence of its Maison: Dior's romantic femininity, Chanel's Parisian elegance, Cartier's jewelry excellence, and Gucci's bold contemporary style. From delicate chains and diamond pendants to statement gold necklaces, every creation is designed to illuminate individuality and grace.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Discover our collection of authentic luxury jewelry and <span className="font-semibold">buy necklaces and pendants</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            
            ) : categoryInfo.type === "earrings" && !categoryInfo.brand ? (

              <div className="mt-16 max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Designer Earrings</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    <span className="font-semibold">Buy designer earrings</span> from <span className="font-medium">Dior, Chanel, Cartier, and Gucci</span> — where timeless elegance meets contemporary artistry.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Each pair reflects the spirit of its Maison: Dior's romantic refinement, Chanel's effortless chic, Cartier's jewelry mastery, and Gucci's bold modern design. From elegant studs and signature hoops to statement drop earrings, every creation showcases exquisite craftsmanship and unmistakable style.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Discover authentic luxury earrings and <span className="font-semibold">buy designer jewelry</span> with guaranteed authenticity and worldwide delivery.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


export default function CategoryPage({ params, searchParams }: PageProps) {
  return <CategoryPageContent params={params} searchParams={searchParams} />;
}
