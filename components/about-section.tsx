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
          <div className="relative order-2 space-y-8">
            {/* Premium Logo Container with Elegant Frame */}
            <div className="relative group">
              {/* Outer Decorative Frame */}
              <div className="absolute -inset-6 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Main Logo Container */}
              <div className="relative bg-gradient-to-br from-neutral-900 via-black to-neutral-900 rounded-2xl shadow-2xl border border-amber-500/20">
                {/* Inner Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl" />
                
                {/* Logo */}
                <div className="relative">
                  <Image
                    src="/aboutus.png"
                    alt="LUX STORE"
                    width={280}
                    height={280}
                    className="w-54 mx-auto relative z-10"
                    priority
                  />
                  {/* Subtle Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                
                {/* Corner Accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-500/40" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-500/40" />
              </div>
            </div>

            {/* Premium Shipping Card */}
            <div className="relative group">
              {/* Gradient Border Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-2xl opacity-75 group-hover:opacity-100 blur-sm transition-all duration-500" />
              
              <div className="relative bg-white rounded-2xl p-8 shadow-xl">
                {/* Decorative Top Line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2 tracking-tight">
                      Shipping
                    </h3>
                    <div className="h-0.5 w-16 bg-gradient-to-r from-amber-500 to-transparent" />
                  </div>
                </div>
                
                <div className="space-y-3 text-neutral-600 leading-relaxed text-base">
                  <p>
                    We offer complimentary worldwide delivery via DHL Express, ensuring a secure and fully insured service to your door.
                  </p>
                  <p>
                    Each item is carefully packaged and shipped with tracking information provided upon dispatch.
                  </p>
                  <p>
                    All customs duties, taxes, and import fees are included in the product price.
                  </p>
                </div>
                
                {/* Subtle Bottom Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent rounded-b-2xl" />
              </div>
            </div>

            {/* Premium Returns & Exchanges Card */}
            <div className="relative group">
              {/* Subtle Border Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-neutral-200/50 backdrop-blur-sm">
                {/* Decorative Top Line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-neutral-300/50 to-transparent" />
                
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center shadow-md border border-neutral-200">
                    <Shield className="w-6 h-6 text-neutral-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2 tracking-tight">
                      Returns & Exchanges
                    </h3>
                    <div className="h-0.5 w-16 bg-gradient-to-r from-neutral-400 to-transparent" />
                  </div>
                </div>
                
                <div className="space-y-3 text-neutral-600 leading-relaxed text-base">
                  <p>
                    We accept returns and exchanges worldwide within 30 days from the date of delivery.
                  </p>
                  <p>
                    Once your return is received and inspected, a refund will be issued to your original payment method.
                  </p>
                  <p>
                    Return shipping is available through DHL Express with full insurance and tracking for your convenience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
    </section>
  );
}
