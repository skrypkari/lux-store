import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Shield, Globe, Award } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-400 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-amber-400 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div className="space-y-8 order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full">
              <Sparkles className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-900 tracking-wide">
                ABOUT US
              </span>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-tight">
                The Art of
                <br />
                <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                  Luxury
                </span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-yellow-500" />
            </div>

            {/* Description */}
            <div className="space-y-6 text-neutral-700 text-lg leading-relaxed">
              <p>
                <span className="font-semibold text-neutral-900">LUX STORE</span> is a premier online destination for authentic luxury brands, offering a curated selection of exquisite products from{" "}
                <span className="font-medium">Cartier, Rolex, Dior, Chanel, GUCCI</span> and{" "}
                <span className="font-medium">Hermès</span>. As an authorized dealer, we guarantee the authenticity and provenance of every item in our collection.
              </p>
              
              <p>
                At <span className="font-semibold text-neutral-900">LUX STORE</span>, we are committed to premium service, secure global delivery, and a seamless shopping experience for discerning clients who value both exclusivity and trust.
              </p>

              <p className="text-xl font-medium text-neutral-900 italic pt-4">
                Discover the art of luxury made personal — with LUX STORE.
              </p>
            </div>
          </div>
          <div className="relative order-2">
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-400/20 via-transparent to-amber-600/20 rounded-2xl" />
              <div className="absolute -inset-2 border border-amber-400/30 rounded-xl" />
              
              {/* Logo Container */}
              <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/aboutus.png"
                  alt="LUX STORE"
                  width={2000}
                  height={2000}
                  className="w-full h-auto"
                  priority
                />
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
              </div>

              {/* Decorative Corner Elements */}
              <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-amber-500/50" />
              <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-amber-500/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
    </section>
  );
}
