import Image from "next/image";
import Link from "next/link";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartButton from "@/components/cart-button";
import MobileMenu from "@/components/mobile-menu";
import StoreDropdown from "@/components/store-dropdown";
import SearchBar from "@/components/search-bar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        
        <div className="flex h-20 items-center justify-between">
          
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="LUX STORE"
              width={30}
              height={0}
              sizes="100vw"
              className="h-[20px] md:h-[30px] w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <StoreDropdown />

            <Button variant="ghost" asChild className="font-medium">
              <Link href="/about">ABOUT US</Link>
            </Button>
            <Button variant="ghost" asChild className="font-medium">
              <Link href="/contact">CONTACT US</Link>
            </Button>
          </nav>

          <div className="flex items-center gap-2">
            
            <Link href="/track">
              <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5  border border-black rounded-full hover:bg-white/40 cursor-pointer transition-colors text-sm">
                <Truck className="h-4 w-4" />
                <span className="font-medium">Track</span>
              </button>
            </Link>

            
            <SearchBar />

            
            <CartButton />

            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
