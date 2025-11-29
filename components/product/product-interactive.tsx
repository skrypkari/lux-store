"use client";

import { useState } from "react";
import ProductOptions from "./product-options";
import ProductActions from "./product-actions";
import { Separator } from "@/components/ui/separator";

interface ProductInteractiveProps {
  productId: number;
  productName: string;
  productBrand: string;
  productPrice: number;
  productImage: string;
  productSku?: string;
  inStock: boolean;
  options?: any[];
  optionsChoices?: Record<string, any[]>;
}

export default function ProductInteractive({
  productId,
  productName,
  productBrand,
  productPrice,
  productImage,
  productSku,
  inStock,
  options,
  optionsChoices,
}: ProductInteractiveProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});


  const hasRequiredOptions = options && options.length > 0;
  const allRequiredSelected = !hasRequiredOptions || options.every(
    opt => !opt.required || selectedOptions[opt.optionId]
  );

  return (
    <>
      
      {hasRequiredOptions && (
        <>
          <ProductOptions
            options={options}
            choices={optionsChoices || {}}
            onOptionsChange={setSelectedOptions}
          />
          <Separator />
        </>
      )}

      
      <ProductActions
        inStock={inStock}
        product={{
          id: productId,
          name: productName,
          brand: productBrand,
          price: productPrice,
          image: productImage,
          sku: productSku,
          options: selectedOptions,
        }}
        disabled={!allRequiredSelected}
      />
    </>
  );
}
