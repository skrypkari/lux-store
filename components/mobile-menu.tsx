"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, Menu } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4 mt-8 px-4">
          {/* Navigation Links */}
          <nav className="flex flex-col space-y-2">
            <div className="space-y-1">
              <p className="font-semibold text-sm mb-2">STORE</p>
              <Button variant="ghost" asChild className="justify-start w-full pl-0">
                <Link href="/store/all">VIEW ALL</Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start w-full pl-0">
                <Link href="/store/bags">BAGS</Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start w-full pl-0">
                <Link href="/store/watch">WATCH</Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start w-full pl-0">
                <Link href="/store/sunglasses">SUNGLASSES</Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start w-full pl-0">
                <Link href="/store/jewellery">JEWELLERY</Link>
              </Button>
            </div>
            
            <div className="border-t pt-2 space-y-1">
              <p className="font-semibold text-sm mb-2">BRANDS</p>
              <Button variant="ghost" asChild className="justify-start w-full pl-0">
                <Link href="/brands/cartier">CARTIER</Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start w-full pl-0">
                <Link href="/brands/hermes">HERMÈS</Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start w-full pl-0">
                <Link href="/brands/dior">DIOR</Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start w-full pl-0">
                <Link href="/brands/chanel">CHANEL</Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start w-full pl-0">
                <Link href="/brands/gucci">GUCCI</Link>
              </Button>
            </div>

            <div className="border-t pt-2">
              <Button variant="ghost" asChild className="justify-start w-full pl-0">
                <Link href="/about">ABOUT US</Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start w-full pl-0">
                <Link href="/contact">CONTACT US</Link>
              </Button>
            </div>
          </nav>

          {/* Divider */}
          <div className="border-t pt-4">
            <Button
              variant="ghost"
              asChild
              className="justify-start w-full"
            >
              <Link href="/account">
                <User className="mr-2 h-4 w-4" />
                Account
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
