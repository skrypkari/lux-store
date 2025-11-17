"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SlidersHorizontal, X, Sparkles } from "lucide-react";

interface FiltersProps {
  className?: string;
}

export function Filters({ className }: FiltersProps) {
  const [priceRange, setPriceRange] = useState([0]);

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-600" />
          <h2 className="text-base font-bold tracking-wider">REFINE</h2>
        </div>
        <Button variant="ghost" size="sm" className="h-9 text-xs hover:bg-neutral-100">
          <X className="h-4 w-4 mr-1" />
          Reset All
        </Button>
      </div>
      
      <Accordion type="multiple" defaultValue={["price", "brand", "category"]} className="space-y-0">
        {/* Price Filter */}
        <AccordionItem value="price" className="border-0">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
            <span className="flex items-center gap-2">
              💰 Price Range
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="space-y-6 pt-2 px-1">
              <div className="relative">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100000}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-neutral-500 mt-2">
                  <span>$0</span>
                  <span className="font-medium text-neutral-900">${priceRange[0].toLocaleString()}</span>
                  <span>$100K+</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">$</span>
                  <input
                    type="text"
                    placeholder="Min"
                    className="w-full pl-7 pr-4 py-2.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="w-8 h-px bg-neutral-300" />
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">$</span>
                  <input
                    type="text"
                    placeholder="Max"
                    className="w-full pl-7 pr-4 py-2.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator className="my-1" />

        {/* Brand Filter */}
        <AccordionItem value="brand" className="border-0">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
            <span className="flex items-center gap-2">
              ✨ Brand
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="space-y-4 pt-2">
              {['Hermès', 'Cartier', 'Rolex', 'Chanel', 'Gucci', 'Dior'].map((brand) => (
                <div key={brand} className="flex items-center space-x-3 group">
                  <Checkbox id={`brand-${brand}`} className="data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600" />
                  <Label
                    htmlFor={`brand-${brand}`}
                    className="text-sm font-normal cursor-pointer group-hover:text-amber-700 transition-colors flex-1"
                  >
                    {brand}
                  </Label>
                  <Badge variant="secondary" className="text-xs">
                    {Math.floor(Math.random() * 50) + 10}
                  </Badge>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator className="my-1" />

        {/* Category Filter */}
        <AccordionItem value="category" className="border-0">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
            <span className="flex items-center gap-2">
              📦 Category
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="space-y-4 pt-2">
              {['Bags', 'Watches', 'Jewelry', 'Sunglasses', 'Accessories'].map((cat) => (
                <div key={cat} className="flex items-center space-x-3 group">
                  <Checkbox id={`cat-${cat}`} className="data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600" />
                  <Label
                    htmlFor={`cat-${cat}`}
                    className="text-sm font-normal cursor-pointer group-hover:text-amber-700 transition-colors flex-1"
                  >
                    {cat}
                  </Label>
                  <Badge variant="secondary" className="text-xs">
                    {Math.floor(Math.random() * 100) + 20}
                  </Badge>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator className="my-1" />

        {/* Color Filter */}
        <AccordionItem value="color" className="border-0">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
            <span className="flex items-center gap-2">
              🎨 Color
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="grid grid-cols-2 gap-2 pt-2">
              {[
                'Black', 'White', 'Red', 'Blue', 'Gold', 'Silver',
                'Brown', 'Pink', 'Green', 'Purple', 'Orange', 'Beige'
              ].map((color) => (
                <Button
                  key={color}
                  variant="outline"
                  size="sm"
                  className="justify-start hover:bg-amber-50 hover:border-amber-600 hover:text-amber-900 transition-all"
                >
                  {color}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator className="my-1" />

        {/* Selection For */}
        <AccordionItem value="selection" className="border-0">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
            <span className="flex items-center gap-2">
              👤 For
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="flex gap-2 pt-2">
              {['Men', 'Women', 'Unisex'].map((selection) => (
                <Button
                  key={selection}
                  variant="outline"
                  className="flex-1 hover:bg-neutral-900 hover:text-white transition-all"
                >
                  {selection}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator className="my-1" />

        {/* Collection */}
        <AccordionItem value="collection" className="border-0">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
            <span className="flex items-center gap-2">
              ⭐ Collection
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="grid grid-cols-1 gap-2 pt-2">
              {[
                { name: 'New Arrivals', badge: 'NEW', variant: 'default' as const },
                { name: 'Best Sellers', badge: 'HOT', variant: 'destructive' as const },
                { name: 'Limited Edition', badge: 'RARE', variant: 'secondary' as const },
                { name: 'Classic', badge: null, variant: 'outline' as const }
              ].map((collection) => (
                <Button
                  key={collection.name}
                  variant="outline"
                  className="justify-between hover:bg-amber-50 hover:border-amber-600 transition-all"
                >
                  <span>{collection.name}</span>
                  {collection.badge && (
                    <Badge variant={collection.badge === 'NEW' ? 'default' : collection.badge === 'HOT' ? 'destructive' : 'secondary'} className="ml-2">
                      {collection.badge}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator className="my-1" />

        {/* Size */}
        <AccordionItem value="size" className="border-0">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
            <span className="flex items-center gap-2">
              📏 Size
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="grid grid-cols-2 gap-2 pt-2">
              {['36mm', '40mm', '44mm', '48mm'].map((size) => (
                <Button
                  key={size}
                  variant="outline"
                  size="sm"
                  className="hover:bg-neutral-900 hover:text-white transition-all"
                >
                  {size}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator className="my-1" />

        {/* Metal */}
        <AccordionItem value="metal" className="border-0">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
            <span className="flex items-center gap-2">
              🏆 Metal
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="space-y-3 pt-2">
              {['Yellow Gold', 'White Gold', 'Rose Gold', 'Platinum', 'Stainless Steel', 'Two-Tone'].map((metal) => (
                <div key={metal} className="flex items-center space-x-3 group">
                  <Checkbox id={`metal-${metal}`} className="data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600" />
                  <Label
                    htmlFor={`metal-${metal}`}
                    className="text-sm font-normal cursor-pointer group-hover:text-amber-700 transition-colors"
                  >
                    {metal}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator className="my-1" />

        {/* Model */}
        <AccordionItem value="model" className="border-0">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
            <span className="flex items-center gap-2">
              ⌚ Model
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="space-y-3 pt-2">
              {['Submariner', 'Datejust', 'Day-Date', 'GMT-Master II', 'Daytona', 'Explorer'].map((model) => (
                <div key={model} className="flex items-center space-x-3 group">
                  <Checkbox id={`model-${model}`} className="data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600" />
                  <Label
                    htmlFor={`model-${model}`}
                    className="text-sm font-normal cursor-pointer group-hover:text-amber-700 transition-colors"
                  >
                    {model}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator className="my-1" />

        {/* Movement */}
        <AccordionItem value="movement" className="border-0">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
            <span className="flex items-center gap-2">
              ⚙️ Movement
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="space-y-2 pt-2">
              {['Automatic', 'Manual', 'Quartz'].map((movement) => (
                <Button
                  key={movement}
                  variant="outline"
                  className="w-full justify-start hover:bg-neutral-900 hover:text-white transition-all"
                >
                  {movement}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator className="my-1" />

        {/* Diamonds */}
        <AccordionItem value="diamonds" className="border-0">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
            <span className="flex items-center gap-2">
              💎 Diamonds
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1 hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-all"
              >
                With
              </Button>
              <Button
                variant="outline"
                className="flex-1 hover:bg-neutral-900 hover:text-white transition-all"
              >
                Without
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Apply Button */}
      <div className="mt-8 pt-6 border-t border-neutral-200">
        <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold shadow-lg">
          <Sparkles className="h-4 w-4 mr-2" />
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
