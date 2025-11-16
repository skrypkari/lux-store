"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Category {
  id: string; // BigInt приходит как строка
  name: string;
  slug_without_id: string;
  children: Category[];
}

export default function StoreDropdown() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => {
        console.log("Received data:", data);
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("Data is not an array:", data);
          setCategories([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]);
        setLoading(false);
      });
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="font-medium">
          STORE
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[250px] p-2">
        <Link href="/store/all" className="block">
          <DropdownMenuItem className="cursor-pointer font-medium">
            VIEW ALL
          </DropdownMenuItem>
        </Link>
        
        {loading ? (
          <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
        ) : !Array.isArray(categories) || categories.length === 0 ? (
          <DropdownMenuItem disabled>No categories found</DropdownMenuItem>
        ) : (
          categories.map((category) => (
            <DropdownMenu key={category.id}>
              <DropdownMenuTrigger asChild>
                <DropdownMenuItem 
                  className="cursor-pointer justify-between"
                  onSelect={(e) => e.preventDefault()}
                >
                  <span>{category.name.toUpperCase()}</span>
                  {category.children.length > 0 && (
                    <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                  )}
                </DropdownMenuItem>
              </DropdownMenuTrigger>
              {category.children.length > 0 && (
                <DropdownMenuContent side="right" sideOffset={0} alignOffset={-8} align="start" className="w-[200px] p-2">
                  <Link 
                    href={`/store/${category.slug_without_id}`} 
                    className="block"
                  >
                    <DropdownMenuItem className="cursor-pointer font-medium">
                      View All
                    </DropdownMenuItem>
                  </Link>
                  {category.children.map((subcategory) => {
                    // Проверяем, есть ли у этого бренда модели (для Hermès в категории Bags)
                    const isHermes = subcategory.name.toLowerCase().includes('herm') && 
                                     category.slug_without_id === 'bags';
                    
                    if (isHermes) {
                      // Hermès с вложенным меню моделей
                      return (
                        <DropdownMenu key={subcategory.id}>
                          <DropdownMenuTrigger asChild>
                            <DropdownMenuItem 
                              className="cursor-pointer justify-between"
                              onSelect={(e) => e.preventDefault()}
                            >
                              <span>{subcategory.name.toUpperCase()}</span>
                              <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                            </DropdownMenuItem>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="right" sideOffset={0} alignOffset={-8} align="start" className="w-[200px] p-2">
                            <Link 
                              href={`/store/${category.slug_without_id}?brand=${subcategory.slug_without_id}`} 
                              className="block"
                            >
                              <DropdownMenuItem className="cursor-pointer font-medium">
                                View All
                              </DropdownMenuItem>
                            </Link>
                            <Link 
                              href="/store/hermes-birkin" 
                              className="block"
                            >
                              <DropdownMenuItem className="cursor-pointer">
                                HERMÈS BIRKIN
                              </DropdownMenuItem>
                            </Link>
                            <Link 
                              href="/store/hermes-kelly" 
                              className="block"
                            >
                              <DropdownMenuItem className="cursor-pointer">
                                HERMÈS KELLY
                              </DropdownMenuItem>
                            </Link>
                            <Link 
                              href="/store/hermes-constance" 
                              className="block"
                            >
                              <DropdownMenuItem className="cursor-pointer">
                                HERMÈS CONSTANCE
                              </DropdownMenuItem>
                            </Link>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      );
                    }
                    
                    // Обычный бренд без моделей
                    return (
                      <Link 
                        key={subcategory.id}
                        href={`/store/${category.slug_without_id}?brand=${subcategory.slug_without_id}`} 
                        className="block"
                      >
                        <DropdownMenuItem className="cursor-pointer">
                          {subcategory.name.toUpperCase()}
                        </DropdownMenuItem>
                      </Link>
                    );
                  })}
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
