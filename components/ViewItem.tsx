"use client";

import { useEffect } from "react";

type Item = {
  id: string;           
  name: string;
  brand?: string;
  category?: string;
  variant?: string;
  price: number;        
  currency: string;     
};

export default function ViewItemDL({ item }: { item: Item }) {
  useEffect(() => {
    if (!item?.id) return;

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ ecommerce: null }); 
    (window as any).dataLayer.push({
      event: "view_item",
      ecommerce: {
        currency: item.currency,
        value: item.price,
        items: [
          {
            item_id: item.id,
            item_name: item.name,
            item_brand: item.brand,
            item_category: item.category,
            item_variant: item.variant,
            price: item.price,
            quantity: 1,
          },
        ],
      },
    });
  }, [item.id]); 
  return null;
}