"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    title: "Timeless Elegance",
    subtitle: "Discover our exclusive collection of luxury timepieces",
    buttonText: "Explore Watches",
    buttonLink: "/store/watch",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop",
    alt: "Luxury watches collection",
  },
  {
    id: 2,
    title: "Iconic Handbags",
    subtitle:
      "Elevate your style with designer bags from the world's finest brands",
    buttonText: "Shop Bags",
    buttonLink: "/store/bags",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2070&auto=format&fit=crop",
    alt: "Designer handbags",
  },
  {
    id: 3,
    title: "Exquisite Jewellery",
    subtitle: "Adorn yourself with rare and precious gemstones",
    buttonText: "View Collection",
    buttonLink: "/store/jewellery",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop",
    alt: "Luxury jewellery",
  },
];

export default function HeroSlider() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="relative w-full h-[calc(100vh-80px)] -mt-20 pt-20 overflow-hidden">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full h-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="h-[calc(100vh-80px)]">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="h-full">
              <div className="relative w-full h-full select-none">
                <div className="absolute inset-0 scale-105 transition-transform duration-[7000ms] ease-out">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    quality={95}
                    sizes="100vw"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="container mx-auto px-4">
                    <div className="max-w-4xl text-center mx-auto space-y-8">
                      <h1
                        className="text-5xl md:text-7xl font-bold text-white tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000"
                        style={{
                          textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {slide.title}
                      </h1>

                      <div className="flex items-center justify-center gap-4 animate-in fade-in duration-1000 delay-300">
                        <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-white/60" />
                        <div className="h-1 w-1 rounded-full bg-white/80" />
                        <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-white/60" />
                      </div>

                      <p
                        className="text-xl md:text-2xl text-white/95 font-light max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500"
                        style={{
                          textShadow: "0 2px 10px rgba(0,0,0,0.4)",
                        }}
                      >
                        {slide.subtitle}
                      </p>

                      <div className="pt-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
                        <Button
                          size="lg"
                          asChild
                          className="bg-white text-black hover:bg-white/90 font-semibold px-10 py-7 text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 rounded-full"
                        >
                          <a href={slide.buttonLink}>{slide.buttonText}</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Elegant Corner Accent */}
                <div className="absolute top-20 right-8 md:right-16 w-32 h-32 border-t-2 border-r-2 border-white/20 opacity-40" />
                <div className="absolute bottom-8 left-8 md:left-16 w-32 h-32 border-b-2 border-l-2 border-white/20 opacity-40" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-6 md:left-12 h-14 w-14 bg-white/5 backdrop-blur-md border-white/30 text-white hover:bg-white/15 hover:border-white/50 hover:scale-110 transition-all duration-300 z-10 hidden md:flex shadow-xl" />
        <CarouselNext className="right-6 md:right-12 h-14 w-14 bg-white/5 backdrop-blur-md border-white/30 text-white hover:bg-white/15 hover:border-white/50 hover:scale-110 transition-all duration-300 z-10 hidden md:flex shadow-xl" />
      </Carousel>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
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

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
    </section>
  );
}
