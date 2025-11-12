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
  // Display properties
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

export default function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = use(params);
  const { brand } = use(searchParams);
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const { addToCart } = useCart();
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const tempPriceRef = useRef([0, 100000]);
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

  // Инициализация фильтров из URL при первой загрузке
  useEffect(() => {
    if (isInitialized) return;

    const filters: Record<string, string[]> = {};
    
    // Читаем все параметры из URL
    urlSearchParams.forEach((value, key) => {
      if (key === 'sortBy' || key === 'page' || key === 'minPrice' || key === 'maxPrice' || key === 'brand') {
        return; // Пропускаем служебные параметры
      }
      
      if (!filters[key]) {
        filters[key] = [];
      }
      filters[key].push(value);
    });

    // Восстанавливаем сортировку
    const urlSortBy = urlSearchParams.get('sortBy');
    if (urlSortBy) {
      setSortBy(urlSortBy);
    }

    // Восстанавливаем страницу
    const urlPage = urlSearchParams.get('page');
    if (urlPage) {
      setPage(parseInt(urlPage));
    }

    // Восстанавливаем ценовой диапазон
    const urlMinPrice = urlSearchParams.get('minPrice');
    const urlMaxPrice = urlSearchParams.get('maxPrice');
    if (urlMinPrice || urlMaxPrice) {
      const min = urlMinPrice ? parseInt(urlMinPrice) : 0;
      const max = urlMaxPrice ? parseInt(urlMaxPrice) : 100000;
      setPriceRange([min, max]);
      tempPriceRef.current = [min, max];
    }

    // Применяем фильтры
    if (Object.keys(filters).length > 0) {
      setSelectedFilters(filters);
      setAppliedFilters(filters);
    }

    setIsInitialized(true);
  }, [urlSearchParams, isInitialized]);

  // Функция для обновления URL
  const updateURL = (
    newFilters: Record<string, string[]>,
    newSortBy: string,
    newPage: number,
    newPriceRange: number[]
  ) => {
    const params = new URLSearchParams();

    // Добавляем brand если есть
    if (brand) {
      params.set('brand', brand);
    }

    // Добавляем сортировку
    if (newSortBy && newSortBy !== 'featured') {
      params.set('sortBy', newSortBy);
    }

    // Добавляем страницу если не первая
    if (newPage > 0) {
      params.set('page', newPage.toString());
    }

    // Добавляем ценовой диапазон если изменен
    if (newPriceRange[0] > 0 || newPriceRange[1] < 100000) {
      params.set('minPrice', newPriceRange[0].toString());
      params.set('maxPrice', newPriceRange[1].toString());
    }

    // Добавляем фильтры
    Object.entries(newFilters).forEach(([key, values]) => {
      values.forEach((value) => {
        params.append(key, value);
      });
    });

    // Обновляем URL без перезагрузки страницы
    const newURL = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    router.push(newURL, { scroll: false });
  };

  // Функция для переключения фильтра
  const toggleFilter = (attributeName: string, value: string) => {
    // Синхронно обновляем UI
    const currentValues = selectedFilters[attributeName] || [];
    const isSelected = currentValues.includes(value);

    let newFilters;
    if (isSelected) {
      // Убираем значение
      const newValues = currentValues.filter((v) => v !== value);
      if (newValues.length === 0) {
        const { [attributeName]: _, ...rest } = selectedFilters;
        newFilters = rest;
      } else {
        newFilters = { ...selectedFilters, [attributeName]: newValues };
      }
    } else {
      // Добавляем значение
      newFilters = {
        ...selectedFilters,
        [attributeName]: [...currentValues, value],
      };
    }

    // Обновляем состояние сразу (синхронно)
    setSelectedFilters(newFilters);

    // Применяем фильтры в фоне
    startTransition(() => {
      setAppliedFilters(newFilters);
      setPage(0);
      updateURL(newFilters, sortBy, 0, priceRange);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  // Функция для очистки всех фильтров
  const clearAllFilters = () => {
    setSelectedFilters({});
    setAppliedFilters({});
    tempPriceRef.current = [0, 100000];
    setPriceRange([0, 100000]);
    setPriceResetTrigger((prev) => prev + 1); // Триггер для сброса PriceSlider
    setPage(0);
    updateURL({}, sortBy, 0, [0, 100000]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Загрузка товаров
  useEffect(() => {
    setLoading(true);
    // Плавная прокрутка наверх при смене страницы
    if (page > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    const skip = page * pageSize;

    // Строим query параметры для фильтров
    const queryParams = new URLSearchParams();
    queryParams.append("skip", skip.toString());
    queryParams.append("take", pageSize.toString());

    // Добавляем сортировку
    if (sortBy) {
      queryParams.append("sortBy", sortBy);
    }

    // Добавляем ценовой диапазон
    if (priceRange[0] > 0 || priceRange[1] < 100000) {
      queryParams.append("minPrice", priceRange[0].toString());
      queryParams.append("maxPrice", priceRange[1].toString());
    }

    // Добавляем brand из URL если есть
    if (brand) {
      queryParams.append("Brand", brand);
    }

    // Добавляем атрибуты (используем appliedFilters вместо selectedFilters)
    Object.entries(appliedFilters).forEach(([attributeName, values]) => {
      values.forEach((value) => {
        queryParams.append(attributeName, value);
      });
    });

    // If category is "all", fetch all products, otherwise fetch by category
    const baseUrl =
      category === "all"
        ? `https://luxstore-backend.vercel.app/products`
        : `https://luxstore-backend.vercel.app/products/category/${category}`;

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

  // Загрузка атрибутов (фильтров) - адаптивных на основе примененных фильтров
  useEffect(() => {
    setLoadingFilters(true);

    // Строим query параметры для получения доступных фильтров
    const queryParams = new URLSearchParams();

    // Добавляем категорию
    if (category && category !== "all") {
      queryParams.append("categorySlug", category);
    } else {
      queryParams.append("categorySlug", "all");
    }

    // Добавляем ценовой диапазон
    if (priceRange[0] > 0 || priceRange[1] < 100000) {
      queryParams.append("minPrice", priceRange[0].toString());
      queryParams.append("maxPrice", priceRange[1].toString());
    }

    // Добавляем brand из URL если есть
    if (brand) {
      queryParams.append("Brand", brand);
    }

    // Добавляем примененные фильтры
    Object.entries(appliedFilters).forEach(([attributeName, values]) => {
      values.forEach((value) => {
        queryParams.append(attributeName, value);
      });
    });

    const url = `https://luxstore-backend.vercel.app/attributes/available/filtered?${queryParams.toString()}`;

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

  // Преобразование данных из API в формат для отображения
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

  // Функция для извлечения бренда из атрибутов или названия
  function getBrandFromProduct(product: Product): string {
    // Сначала пытаемся найти бренд в атрибутах
    const brandAttribute = product.attributes?.find(
      (attr) =>
        attr.attribute.name === "Brand" || attr.attribute.type === "BRAND"
    );

    if (brandAttribute) {
      return brandAttribute.value;
    }

    // Если не найден в атрибутах, пытаемся извлечь из названия
    const brands = [
      "HERMÈS",
      "CARTIER",
      "ROLEX",
      "CHANEL",
      "GUCCI",
      "LOUIS VUITTON",
      "PATEK PHILIPPE",
      "DIOR",
    ];
    for (const brand of brands) {
      if (product.name.toUpperCase().includes(brand)) {
        return brand;
      }
    }

    // В крайнем случае берем первое слово из названия
    return product.name.split(" ")[0].toUpperCase();
  }

  // Функция для извлечения коллекции из атрибутов
  function getCollectionFromProduct(product: Product): string {
    // Ищем атрибут Collection
    const collectionAttribute = product.attributes?.find(
      (attr) => attr.attribute.name === "Collection"
    );

    if (collectionAttribute) {
      return collectionAttribute.value;
    }

    return "Luxury Collection";
  }

  // Функция для добавления в корзину
  const handleAddToCart = (product: typeof displayProducts[0]) => {
    setAddingToCart(prev => ({ ...prev, [product.id]: true }));
    
    addToCart({
      id: parseInt(product.id),
      name: product.name,
      brand: product.brand || "Luxury Brand",
      price: product.price || 0,
      image: product.image || "",
      inStock: product.inStock || false
    });

    setTimeout(() => {
      setAddingToCart(prev => ({ ...prev, [product.id]: false }));
    }, 1000);
  };

  const PriceSlider = () => {
    // Локальное состояние для плавного движения слайдера
    const [localPrice, setLocalPrice] = useState(() => tempPriceRef.current);
    const [isInitialized, setIsInitialized] = useState(false);

    // Синхронизируем локальное состояние при сбросе фильтров
    useEffect(() => {
      setLocalPrice(tempPriceRef.current);
      setIsInitialized(true);
    }, [priceResetTrigger]);

    // Применяем ценовой фильтр автоматически с задержкой
    useEffect(() => {
      // Не применяем на первом рендере
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

      {/* Premium Page Header */}
      <div className="border-b bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl">
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

              {/* Support Card */}
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
                      // Здесь можно подключить чат виджет (Intercom, Tawk.to, etc.)
                      console.log('Opening chat...');
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

            {/* Trust Badges */}
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

            {/* Products Grid */}
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
                      {/* Image Container */}
                      <div
                        className="relative aspect-square overflow-hidden bg-muted cursor-pointer"
                        onClick={() =>
                          (window.location.href = `/product/${product.id}`)
                        }
                      >
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
                            <span className="text-white text-sm font-semibold tracking-wide">
                              SOLD OUT
                            </span>
                          </div>
                        )}

                        {/* Discount Label */}
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

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-5">
                        {/* Brand */}
                        <div className="mb-3">
                          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                            {product.brand}
                          </span>
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
                          <span className="text-xs text-muted-foreground font-medium">
                            SKU:
                          </span>
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
                                (window.location.href = `/product/${product.id}`)
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
                              
                              {/* Ripple effect */}
                              {addingToCart[product.id] && (
                                <span className="absolute inset-0 rounded-md bg-white animate-ping opacity-75" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Premium Border Effect */}
                      <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-300 pointer-events-none" />
                    </div>
                  );
                })
              )}
            </div>

            {/* Pagination */}
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

            {/* Bottom Info Section */}
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
