"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    brand: "Cartier",
    subtitle: "Cartier, the jeweller of kings and the king of jewellers.",
    videoUrl: "https://customer-gg9877p8mtv4csop.cloudflarestream.com/b0dc3959dd4da18006a104a452e8c7b5/iframe?loop=true&autoplay=true&muted=true&poster=https%3A%2F%2Fcustomer-gg9877p8mtv4csop.cloudflarestream.com%2Fb0dc3959dd4da18006a104a452e8c7b5%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false",
  },
  {
    id: 2,
    brand: "Rolex",
    subtitle: "A Crown for Every Achievement.",
    videoUrl: "https://customer-gg9877p8mtv4csop.cloudflarestream.com/424e4aef0fab4f684e2b8113772137dd/iframe?loop=true&autoplay=true&muted=true&poster=https%3A%2F%2Fcustomer-gg9877p8mtv4csop.cloudflarestream.com%2F424e4aef0fab4f684e2b8113772137dd%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false",
  },
  {
    id: 3,
    brand: "Hermès",
    subtitle: "Hermès, the spirit of craftsmanship.",
    videoUrl: "https://customer-gg9877p8mtv4csop.cloudflarestream.com/16944a6e01c99951bdedd28afcb0c4b1/iframe?loop=true&autoplay=true&muted=true&poster=https%3A%2F%2Fcustomer-gg9877p8mtv4csop.cloudflarestream.com%2F16944a6e01c99951bdedd28afcb0c4b1%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false",
  },
  {
    id: 4,
    brand: "Dior",
    subtitle: "Dior, J'adore.",
    videoUrl: "https://customer-gg9877p8mtv4csop.cloudflarestream.com/7d144db8acad2064e38063f899816507/iframe?loop=true&autoplay=true&muted=true&poster=https%3A%2F%2Fcustomer-gg9877p8mtv4csop.cloudflarestream.com%2F7d144db8acad2064e38063f899816507%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false",
  },
  {
    id: 5,
    brand: "GUCCI",
    subtitle: "Gucci. The Future is Fluid.",
    videoUrl: "https://customer-gg9877p8mtv4csop.cloudflarestream.com/ce15ed6b1091b365e60737e06257372a/iframe?loop=true&autoplay=true&muted=true&poster=https%3A%2F%2Fcustomer-gg9877p8mtv4csop.cloudflarestream.com%2Fce15ed6b1091b365e60737e06257372a%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false",
  },
  {
    id: 6,
    brand: "Chanel",
    subtitle: "Coco Chanel — A name that means fashion.",
    videoUrl: "https://customer-gg9877p8mtv4csop.cloudflarestream.com/834ed242ff182576ac5ec43a3a0077e2/iframe?loop=true&autoplay=true&muted=true&poster=https%3A%2F%2Fcustomer-gg9877p8mtv4csop.cloudflarestream.com%2F834ed242ff182576ac5ec43a3a0077e2%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Автопереключение каждые 15 секунд (длительность видео)
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 15000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[calc(100vh-80px)] overflow-hidden">
      {/* Video Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000",
            current === index ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <iframe
            src={slide.videoUrl}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full min-h-full h-[56.25vw] border-none"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60 z-20" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center z-30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl text-center mx-auto space-y-8">
            <h1
              key={`brand-${current}`}
              className="text-5xl md:text-7xl font-bold text-white tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000"
              style={{
                textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                letterSpacing: "0.02em",
              }}
            >
              {slides[current].brand}
            </h1>

            <div className="flex items-center justify-center gap-4 animate-in fade-in duration-1000 delay-300">
              <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-white/60" />
              <div className="h-1 w-1 rounded-full bg-white/80" />
              <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-white/60" />
            </div>

            <p
              key={`subtitle-${current}`}
              className="text-xl md:text-2xl text-white/95 font-light max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500"
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.4)",
              }}
            >
              {slides[current].subtitle}
            </p>

            <div className="pt-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
              <Button
                size="lg"
                asChild
                className="bg-white text-black hover:bg-white/90 font-semibold px-10 py-7 text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 rounded-full"
              >
                <a href="/store/all">Explore Collection</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-40">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              "transition-all duration-500 rounded-full",
              current === index
                ? "w-12 h-2 bg-white shadow-lg shadow-white/50"
                : "w-2 h-2 bg-white/40 hover:bg-white/60 hover:scale-125"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Elegant Corner Accent */}
      <div className="absolute top-20 right-8 md:right-16 w-32 h-32 border-t-2 border-r-2 border-white/20 opacity-40 z-40" />
      <div className="absolute bottom-16 left-8 md:left-16 w-32 h-32 border-b-2 border-l-2 border-white/20 opacity-40 z-40" />

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent shadow-[0_0_20px_rgba(255,255,255,0.3)] z-40" />
    </section>
  );
}
