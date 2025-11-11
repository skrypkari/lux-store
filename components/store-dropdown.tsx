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

  useEffect(() => {
    fetch("https://luxstore-backend.vercel.app/categories")
      .then((res) => res.json())
      .then((data) => {
        console.log("Received data:", data);
        // Убедимся, что data это массив
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
                  {category.children.map((subcategory) => (
                    <Link 
                      key={subcategory.id}
                      href={`/store/${category.slug_without_id}/${subcategory.slug_without_id}`} 
                      className="block"
                    >
                      <DropdownMenuItem className="cursor-pointer">
                        {subcategory.name.toUpperCase()}
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
