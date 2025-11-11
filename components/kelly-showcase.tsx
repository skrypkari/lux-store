import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Sparkles, Crown, History, Gem } from "lucide-react";

export default function KellyShowcase() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-background to-muted/20 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-muted/40 via-background to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Product Card */}
          <div className="relative order-2 lg:order-1">
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-72 h-72 bg-foreground/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-foreground/5 rounded-full blur-3xl" />
            
            <Card className="relative overflow-hidden border-2 shadow-2xl bg-white backdrop-blur group py-0">
              {/* Royal Badge */}
              <div className="absolute top-6 left-6 z-20">
                <Badge className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white font-semibold shadow-xl border-0">
                  <Crown className="w-3 h-3 mr-1" />
                  BRAND NEW
                </Badge>
              </div>

              {/* Product Image */}
              <div className="relative h-[500px] overflow-hidden">
                <Image
                  src="https://imagedelivery.net/5duV4wBvvS4Lww9u6RX_Yg/525f1367-55f3-4aea-b81d-f7b165770500/public"
                  alt="Hermès Kelly Sellier 20 Etoupe Epsom Gold Hardware"
                  className="object-cover transition-transform duration-700 h-[500px] w-auto mx-auto p-10 group-hover:scale-105"
                  priority
                  width={1080}
                  height={1080}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Limited Badge */}
                <div className="absolute bottom-6 left-6 z-20">
                  <Badge variant="outline" className="bg-white/90 text-black backdrop-blur-sm border-0 shadow-lg">
                    <Gem className="w-3 h-3 mr-1" />
                    Limited Availability
                  </Badge>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-8 space-y-6 bg-gradient-to-t from-background to-background/95">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="font-light">
                      HERMÈS
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Hermès Kelly Sellier 20 Etoupe Epsom Gold Hardware</h3>
                  <p className="text-muted-foreground">SKU: H073120CK18</p>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Price</div>
                    <div className="text-3xl font-bold">€14,861</div>
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
                  <Link href="/products/768064173" className="flex items-center justify-center gap-2">
                    Shop Now
                    <Crown className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
                  </Link>
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Express delivery available • Certificate of authenticity included
                </p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10">
                <div className="absolute bottom-4 right-4 w-16 h-px bg-foreground rotate-45" />
                <div className="absolute bottom-4 right-4 h-16 w-px bg-foreground rotate-45" />
              </div>
            </Card>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8 order-1 lg:order-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20">
              <Crown className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium tracking-wider">PRINCESS GRACE LEGACY</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                Hermès
                <span className="block bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                  Kelly Bag
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                A timeless emblem of grace and sophistication — the Kelly Bag defines elegance through perfect craftsmanship and refined heritage.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500/10 to-amber-500/10 flex items-center justify-center">
                  <History className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Iconic Design</h3>
                  <p className="text-muted-foreground font-light">
                    Originally created in the 1930s, the Kelly became a symbol of style after being embraced by Princess Grace of Monaco.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500/10 to-amber-500/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Artisan Craftsmanship</h3>
                  <p className="text-muted-foreground font-light">
                    Each Kelly is handmade by a single Hermès artisan, requiring up to 20 hours of precision and mastery.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500/10 to-amber-500/10 flex items-center justify-center">
                  <Gem className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Authentic Luxury</h3>
                  <p className="text-muted-foreground font-light">
                    Every piece is 100% original, sourced directly from Hermès boutiques, complete with signature packaging and authenticity documentation.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="space-y-1">
                <div className="text-3xl font-bold">1935</div>
                <div className="text-sm text-muted-foreground">First Created</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold">$10K +</div>
                <div className="text-sm text-muted-foreground">Starting Price</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold">20 hrs</div>
                <div className="text-sm text-muted-foreground">Crafting Time</div>
              </div>
            </div>

            {/* Description */}
            <div className="relative pl-6 py-4">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500 via-amber-500 to-yellow-600 rounded-full" />
              <p className="text-base text-muted-foreground leading-relaxed italic">
                "The Kelly bag represents the pinnacle of Hermès craftsmanship — a perfect balance of structure, elegance, and timeless allure. Its story, steeped in heritage, continues to inspire generations of collectors and connoisseurs."
              </p>
            </div>

            {/* Additional Info */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Badge variant="outline" className="text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                Handstitched
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Crown className="w-3 h-3 mr-1" />
                Celebrity Favorite
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Gem className="w-3 h-3 mr-1" />
                Investment Quality
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
    </section>
  );
}
