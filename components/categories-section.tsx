"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShoppingBag, Watch, Glasses, Gem, LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";


const categoryIcons: Record<string, LucideIcon> = {
  'Handbags': ShoppingBag,
  'Watches': Watch,
  'Jewelry': Gem,
  'Sunglasses': Glasses,
  'Bags': ShoppingBag,
  'Watch': Watch,
  'Jewellery': Gem,
};

interface Category {
  id: string;
  name: string;
  slug_without_id: string;
  children: Category[];
}

interface CategoryDisplay extends Category {
  description?: string;
  itemCount?: string;
  image: string;
  link: string;
  icon: LucideIcon;
  featured?: boolean;
}

export default function CategoriesSection() {
  const [categories, setCategories] = useState<CategoryDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.lux-store.eu/categories")
      .then((res) => res.json())
      .then((data: Category[]) => {
        console.log("Categories data:", data);
        if (Array.isArray(data)) {

          const displayCategories: CategoryDisplay[] = data.slice(0, 4).map((cat, index) => ({
            ...cat,
            description: `Explore ${cat.name.toLowerCase()}`,
            itemCount: `${cat.children?.length || 0}+ Brands`,
            image: getDefaultImage(cat.name),
            link: `/store/${cat.slug_without_id}`,
            icon: categoryIcons[cat.name] || ShoppingBag,
            featured: index < 2,
          }));
          setCategories(displayCategories);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);


  const getDefaultImage = (categoryName: string) => {
    const imageMap: Record<string, string> = {
      'Handbags': 'https://imagedelivery.net/5duV4wBvvS4Lww9u6RX_Yg/db0435ed-5e94-4b11-cccc-ef85b1fc1d00/public',
      'Bags': 'https://imagedelivery.net/5duV4wBvvS4Lww9u6RX_Yg/db0435ed-5e94-4b11-cccc-ef85b1fc1d00/public',
      'Watches': 'https://imagedelivery.net/5duV4wBvvS4Lww9u6RX_Yg/2157e9ee-a545-43df-7198-72d664a56a00/public',
      'Watch': 'https://imagedelivery.net/5duV4wBvvS4Lww9u6RX_Yg/2157e9ee-a545-43df-7198-72d664a56a00/public',
      'Jewelry': 'https://imagedelivery.net/5duV4wBvvS4Lww9u6RX_Yg/ffbc0414-75db-45e2-cb15-b14a2780b900/public',
      'Jewellery': 'https://imagedelivery.net/5duV4wBvvS4Lww9u6RX_Yg/ffbc0414-75db-45e2-cb15-b14a2780b900/public',
      'Sunglasses': 'https://imagedelivery.net/5duV4wBvvS4Lww9u6RX_Yg/a27418e9-1ea9-41dc-4910-2f30eb18ad00/public',
    };
    return imageMap[categoryName] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop';
  };
  return (
    <section className="relative py-32 bg-background overflow-hidden">
      
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)`,
          backgroundSize: '20px 20px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        <div className="text-center mb-20 space-y-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-foreground/30" />
            <Badge variant="outline" className="px-4 py-1.5 text-sm font-light tracking-widest">
              SHOP BY CATEGORY
            </Badge>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-foreground/30" />
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Explore Our
            <span className="block bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text text-transparent">
              Collections
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
            Curated selections from the world's most prestigious brands
          </p>
        </div>

        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {loading ? (
            <div className="col-span-2 text-center py-20">
              <p className="text-muted-foreground">Loading categories...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="col-span-2 text-center py-20">
              <p className="text-muted-foreground">No categories found</p>
            </div>
          ) : (
            categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={category.link}
                className="group relative"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className={`relative overflow-hidden rounded-2xl border-2 hover:border-foreground/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                  category.featured ? 'md:row-span-1' : ''
                }`}>
                  
                  <div className={`relative overflow-hidden h-[400px]`}>
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    
                    <div className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                      
                      <Badge className="w-fit mb-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                        {index === 0 ? '5 Brands' : '4 Brands'}
                      </Badge>

                      
                      <h3 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight transform group-hover:translate-x-2 transition-transform duration-300">
                        {category.name}
                      </h3>
                      
                      
                      <p className="text-white/90 font-light text-lg mb-6 transform group-hover:translate-x-2 transition-transform duration-300 delay-75">
                        {category.description}
                      </p>

                      
                      <div className="flex items-center gap-2 text-white font-medium group-hover:gap-4 transition-all duration-300">
                        <span>Explore Collection</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>

                    
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </div>
                </div>
              </Link>
            );
          })
          )}
        </div>
      </div>

      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
    </section>
  );
}
