"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  images: string[];
  productName: string;
  inStock: boolean;
}

export default function ImageGallery({ images, productName, inStock }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Handle edge case: no images
  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-2xl border bg-muted flex items-center justify-center">
        <span className="text-muted-foreground">No images available</span>
      </div>
    );
  }

  const hasMultipleImages = images.length > 1;
  const totalImages = images.length;

  // Determine grid columns based on number of images
  const getGridCols = () => {
    if (totalImages === 1) return "grid-cols-1";
    if (totalImages === 2) return "grid-cols-2";
    if (totalImages === 3) return "grid-cols-3";
    return "grid-cols-4"; // 4 or more
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + totalImages) % totalImages);
  };

  return (
    <>
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl border bg-muted group">
        <Image
          src={images[selectedImage]}
          alt={productName}
          fill
          className="object-cover"
          priority
        />
        {!inStock && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <span className="text-white text-lg font-semibold tracking-wide">SOLD OUT</span>
          </div>
        )}

        {/* Navigation Arrows (only show if multiple images) */}
        {hasMultipleImages && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail Gallery (only show if multiple images) */}
      {hasMultipleImages && (
        <div className={`grid ${getGridCols()} gap-4`}>
          {images.slice(0, 4).map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square overflow-hidden rounded-lg border transition-all ${
                selectedImage === index
                  ? "border-primary ring-2 ring-primary/20 shadow-lg"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Image
                src={image}
                alt={`${productName} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* More Images Indicator (if more than 4 images) */}
      {totalImages > 4 && (
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {images.slice(4).map((image, index) => (
              <button
                key={index + 4}
                onClick={() => setSelectedImage(index + 4)}
                className={`relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg border transition-all ${
                  selectedImage === index + 4
                    ? "border-primary ring-2 ring-primary/20 shadow-lg"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Image
                  src={image}
                  alt={`${productName} ${index + 5}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Image Navigation Info */}
      {hasMultipleImages && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Image {selectedImage + 1} of {totalImages}</span>
        </div>
      )}
    </>
  );
}
