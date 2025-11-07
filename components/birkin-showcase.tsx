import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Sparkles, Award, TrendingUp, Shield } from "lucide-react";

export default function BirkinShowcase() {
  return (
    <section className="relative py-32 bg-background overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-muted/40 via-background to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10">
              <Award className="w-4 h-4 text-foreground" />
              <span className="text-sm font-medium tracking-wider">ICONIC COLLECTION</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                Hermès
                <span className="block bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
                  Birkin Bag
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                The world's most coveted handbag. A timeless symbol of luxury and exclusivity.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Handcrafted Excellence</h3>
                  <p className="text-muted-foreground font-light">
                    Each bag takes 18-24 hours to craft by a single artisan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Investment Piece</h3>
                  <p className="text-muted-foreground font-light">
                    Proven to appreciate in value, outperforming gold and stocks
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Authenticated & Certified</h3>
                  <p className="text-muted-foreground font-light">
                    100% genuine with complete authentication documentation
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="space-y-1">
                <div className="text-3xl font-bold">1984</div>
                <div className="text-sm text-muted-foreground">First Created</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold">$12K+</div>
                <div className="text-sm text-muted-foreground">Starting Price</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold">2-6yr</div>
                <div className="text-sm text-muted-foreground">Waitlist Time</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-base text-muted-foreground leading-relaxed border-l-2 border-foreground/20 pl-6 italic">
              "Named after actress and singer Jane Birkin, this iconic bag has become synonymous with 
              ultimate luxury. Its exclusive nature and meticulous craftsmanship make it one of the most 
              sought-after accessories in the world."
            </p>
          </div>

          {/* Right Side - Product Card */}
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-foreground/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-foreground/5 rounded-full blur-3xl" />
            
            <Card className="relative overflow-hidden border-2 shadow-2xl bg-card/50 backdrop-blur group py-0">
              {/* Premium Badge */}
              <div className="absolute top-6 right-6 z-20">
                <Badge className="bg-foreground text-background font-semibold shadow-xl">
                  EXCLUSIVE
                </Badge>
              </div>

              {/* Product Image */}
              <div className="relative h-[500px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2070&auto=format&fit=crop"
                  alt="Hermès Birkin Bag"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Product Info */}
              <div className="p-8 space-y-6 bg-gradient-to-t from-background to-background/95">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="font-light">
                      HERMÈS
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <Sparkles className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <Sparkles className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <Sparkles className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <Sparkles className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Birkin 30</h3>
                  <p className="text-muted-foreground">Togo Leather • Gold Hardware</p>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Price</div>
                    <div className="text-3xl font-bold">$15,750</div>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Condition</div>
                    <div className="text-lg font-semibold">Excellent</div>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  asChild
                  className="w-full py-6 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  <Link href="/products/birkin-30" className="flex items-center justify-center gap-2">
                    Shop Now
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  </Link>
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Free worldwide shipping • Authenticity guaranteed
                </p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 left-0 w-24 h-24 opacity-10">
                <div className="absolute top-4 left-4 w-16 h-px bg-foreground -rotate-45" />
                <div className="absolute top-4 left-4 h-16 w-px bg-foreground -rotate-45" />
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
    </section>
  );
}
