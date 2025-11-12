"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductOption {
  optionId: string;
  optionText: string;
  required: boolean;
}

interface ProductChoice {
  choiceId: string;
  choiceName: string;
  modifierFormatted?: string;
}

interface ProductOptionsProps {
  options: ProductOption[];
  choices: Record<string, ProductChoice[]>;
  onOptionsChange: (options: Record<string, string>) => void;
}

export default function ProductOptions({ options, choices, onOptionsChange }: ProductOptionsProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const handleChange = (optionId: string, value: string) => {
    const newOptions = {
      ...selectedOptions,
      [optionId]: value
    };
    setSelectedOptions(newOptions);
    onOptionsChange(newOptions);
  };

  if (!options || options.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.optionId}>
          <label className="text-sm font-semibold mb-2 block">
            {option.optionText}
            {option.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <Select
            value={selectedOptions[option.optionId] || ""}
            onValueChange={(value) => handleChange(option.optionId, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Select ${option.optionText}`} />
            </SelectTrigger>
            <SelectContent>
              {(choices[option.optionId] || []).map((choice) => (
                <SelectItem key={choice.choiceId} value={choice.choiceId}>
                  {choice.choiceName}
                  {choice.modifierFormatted && (
                    <span className="text-muted-foreground ml-2">
                      {choice.modifierFormatted}
                    </span>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}
