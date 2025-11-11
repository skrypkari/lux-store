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
                The world&apos;s most desired handbag. A symbol of timeless elegance, exceptional craftsmanship, and ultimate exclusivity.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Handcrafted Mastery</h3>
                  <p className="text-muted-foreground font-light">
                    Each Birkin is meticulously handmade by a single artisan, requiring up to 24 hours of dedicated craftsmanship.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Enduring Value</h3>
                  <p className="text-muted-foreground font-light">
                    An icon that transcends trends — the Birkin consistently appreciates in value, becoming a lasting investment in luxury.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Authentic Origin</h3>
                  <p className="text-muted-foreground font-light">
                    100% original and sourced exclusively from official Hermès boutiques, complete with original packaging and documentation.
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
                <div className="text-3xl font-bold">$12K +</div>
                <div className="text-sm text-muted-foreground">Starting Price</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold">25–40 hrs</div>
                <div className="text-sm text-muted-foreground">Crafting Time</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-base text-muted-foreground leading-relaxed border-l-2 border-foreground/20 pl-6 italic">
              "Named after actress and style muse Jane Birkin, this legendary creation embodies the Hermès spirit of artistry and refinement. Its meticulous construction and rarity have made it one of the most coveted pieces in the world of fashion."
            </p>
          </div>

          {/* Right Side - Product Card */}
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-foreground/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-foreground/5 rounded-full blur-3xl" />
            
            <Card className="relative overflow-hidden border-2 shadow-2xl bg-white backdrop-blur group py-0">
              {/* Premium Badge */}
              <div className="absolute top-6 right-6 z-20">
                <Badge className="bg-foreground text-background font-semibold shadow-xl">
                  BRAND NEW
                </Badge>
              </div>

              {/* Product Image */}
              <div className="relative h-[500px] overflow-hidden">
                <Image
                  src="https://imagedelivery.net/5duV4wBvvS4Lww9u6RX_Yg/7ca69595-da46-4fcd-1085-45c20e9dc100/public"
                  alt="Hermès Birkin 30 Black Togo Palladium Hardware"
                  className="transition-transform duration-700 group-hover:scale-105 h-[500px] w-auto mx-auto p-10"
                  priority
                  width={1080}
                  height={1080}
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
                  <h3 className="text-2xl font-bold mb-2">Hermès Birkin 30 Black Togo Palladium Hardware</h3>
                  <p className="text-muted-foreground">SKU: H056018CK89/04</p>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Price</div>
                    <div className="text-3xl font-bold">€14,610</div>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Condition</div>
                    <div className="text-lg font-semibold">Brand New</div>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  asChild
                  className="w-full py-6 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  <Link href="/product/768026209" className="flex items-center justify-center gap-2">
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
