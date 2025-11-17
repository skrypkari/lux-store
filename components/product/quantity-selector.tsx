"use client";

import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";

interface QuantitySelectorProps {
  inStock: boolean;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxAvailable?: number;
}

export default function QuantitySelector({ inStock, quantity, onQuantityChange, maxAvailable }: QuantitySelectorProps) {

  // Calculate delivery estimate (21-35 days from now)
  const today = new Date();
  const minDays = 21;
  const maxDays = 35;
  
  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const minDate = addDays(today, minDays);
  const maxDate = addDays(today, maxDays);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Quantity Selector */}
      <div>
        <label className="text-sm font-semibold mb-2 block">Quantity</label>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            disabled={!inStock}
            className="h-11 w-11"
          >
            -
          </Button>
          <span className="w-16 text-center font-semibold text-lg">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onQuantityChange(quantity + 1)}
            disabled={!inStock || (maxAvailable !== undefined && quantity >= maxAvailable)}
            className="h-11 w-11"
          >
            +
          </Button>
        </div>
        {maxAvailable !== undefined && maxAvailable < 10 && (
          <p className="text-xs text-muted-foreground mt-2">
            Maximum {maxAvailable} available
          </p>
        )}
      </div>

      {/* Delivery Estimate */}
      <div>
        <label className="text-sm font-semibold mb-2 block">Delivery Estimate</label>
        <div className="border rounded-lg p-3 bg-muted/30">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">
              {formatDate(minDate)} - {formatDate(maxDate)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>DHL Express shipping included</span>
          </div>
        </div>
      </div>
    </div>
  );
}
