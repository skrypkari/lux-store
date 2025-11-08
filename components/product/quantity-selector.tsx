"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";

interface QuantitySelectorProps {
  inStock: boolean;
}

export default function QuantitySelector({ inStock }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);

  // Calculate delivery estimate (2-5 business days from now)
  const today = new Date();
  const minDays = 2;
  const maxDays = 5;
  
  const getBusinessDate = (startDate: Date, daysToAdd: number) => {
    let currentDate = new Date(startDate);
    let daysAdded = 0;
    
    while (daysAdded < daysToAdd) {
      currentDate.setDate(currentDate.getDate() + 1);
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Skip weekends
        daysAdded++;
      }
    }
    
    return currentDate;
  };

  const minDate = getBusinessDate(today, minDays);
  const maxDate = getBusinessDate(today, maxDays);
  
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
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={!inStock}
            className="h-11 w-11"
          >
            -
          </Button>
          <span className="w-16 text-center font-semibold text-lg">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
            disabled={!inStock}
            className="h-11 w-11"
          >
            +
          </Button>
        </div>
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
            <span>Express shipping included</span>
          </div>
        </div>
      </div>
    </div>
  );
}
