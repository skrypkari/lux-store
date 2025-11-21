import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Sparkles, Crown, Star } from "lucide-react";

const brands = [
  {
    id: 1,
    name: "HERMÈS",
    description: "The spirit of craftsmanship",
    established: "1837",
    category: "1 Category",
    image: "/hermes_logo.png",
    link: "/store/all?brand=HERMÈS",
  },
  {
    id: 2,
    name: "CARTIER",
    description: "The jeweller of kings and the king of jewellers",
    established: "1847",
    category: "4 Categories",
    image: "/cartier_logo.png",
    link: "/store/all?brand=CARTIER",
  },
  {
    id: 3,
    name: "ROLEX",
    description: "A Crown for Every Achievement",
    established: "1905",
    category: "1 Category",
    image: "/rolex_logo.png",
    link: "/store/all?brand=ROLEX",
  },
  {
    id: 4,
    name: "CHANEL",
    description: "A name that means fashion",
    established: "1910",
    category: "4 Categories",
    image: "/chanel_logo.png",
    link: "/store/all?brand=CHANEL",
  },
  {
    id: 5,
    name: "GUCCI",
    description: "The Future is Fluid",
    established: "1921",
    category: "4 Categories",
    image: "/gucci_logo.png",
    link: "/store/all?brand=GUCCI",
  },
  {
    id: 6,
    name: "DIOR",
    description: "J'adore",
    established: "1946",
    category: "3 Categories",
    image: "/dior_logo.png",
    link: "/store/all?brand=DIOR",
  },
];

export default function BrandsSection() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-foreground rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        <div className="text-center mb-20 space-y-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-foreground/30" />
            <Badge variant="outline" className="px-4 py-1.5 text-sm font-light tracking-widest">
              FEATURED BRANDS
            </Badge>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-foreground/30" />
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text">
            Luxury Brands
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Discover the world's most prestigious fashion houses and their timeless collections
          </p>

          
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">6</div>
              <div className="text-sm text-muted-foreground tracking-wider">ICONIC BRANDS</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">150+</div>
              <div className="text-sm text-muted-foreground tracking-wider">YEARS OF HERITAGE</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-sm text-muted-foreground tracking-wider">AUTHENTIC</div>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 mb-16">
          {brands.map((brand, index) => (
            <Link 
              key={brand.id} 
              href={brand.link} 
              className="group"
              style={{ 
                animationDelay: `${index * 100}ms`,
              }}
            >
              <Card className="relative overflow-hidden border-2 hover:border-foreground/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-card/50 backdrop-blur p-0">
                <CardContent className="p-0">
                  <div className="relative h-64 lg:h-96 overflow-hidden">
                    
                    <div className="absolute top-4 right-4 z-20">
                      <Badge className="bg-white/90 text-black backdrop-blur-sm border-0 shadow-lg font-semibold">
                        Since {brand.established}
                      </Badge>
                    </div>

                    
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                          {brand.category}
                        </Badge>
                      </div>

                      
                      <h3 className="text-3xl md:text-4xl font-bold mb-2 tracking-wide transform group-hover:translate-x-2 transition-transform duration-300">
                        {brand.name}
                      </h3>
                      
                      
                      <p className="text-white/90 font-light text-lg mb-4 transform group-hover:translate-x-2 transition-transform duration-300 delay-75">
                        {brand.description}
                      </p>

                      
                      <div className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        <span>Explore Collection</span>
                        <Sparkles className="w-4 h-4" />
                      </div>
                    </div>

                    
                    <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
                      <div className="absolute top-4 right-4 w-16 h-px bg-white rotate-45" />
                      <div className="absolute top-4 right-4 h-16 w-px bg-white rotate-45" />
                    </div>

                    
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
            <Star className="w-5 h-5 fill-current" />
            <span className="text-sm tracking-widest uppercase">Curated Selection</span>
            <Star className="w-5 h-5 fill-current" />
          </div>

          <Button
            size="lg"
            asChild
            className="px-12 py-7 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-foreground text-background group"
          >
            <Link href="/store/all" className="flex items-center gap-2">
              View All Brands
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </Link>
          </Button>

          <p className="text-sm text-muted-foreground mt-4">
            Explore our complete collection of luxury brands
          </p>
        </div>
      </div>

      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
    </section>
  );
}
