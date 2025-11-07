"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="LUX STORE"
              width={30}
              height={0}
              sizes="100vw"
              className="h-[30px] w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-medium">
                  STORE
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[250px] p-2">
                <Link href="/store/all" className="block">
                  <DropdownMenuItem className="cursor-pointer font-medium">
                    VIEW ALL
                  </DropdownMenuItem>
                </Link>
                
                {/* BAGS with submenu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem 
                      className="cursor-pointer justify-between"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <span>BAGS</span>
                      <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" sideOffset={0} alignOffset={-8} align="start" className="w-[200px] p-2">
                    <Link href="/brands/cartier" className="block">
                      <DropdownMenuItem className="cursor-pointer">CARTIER</DropdownMenuItem>
                    </Link>
                    <Link href="/brands/hermes" className="block">
                      <DropdownMenuItem className="cursor-pointer">HERMÈS</DropdownMenuItem>
                    </Link>
                    <Link href="/brands/dior" className="block">
                      <DropdownMenuItem className="cursor-pointer">DIOR</DropdownMenuItem>
                    </Link>
                    <Link href="/brands/chanel" className="block">
                      <DropdownMenuItem className="cursor-pointer">CHANEL</DropdownMenuItem>
                    </Link>
                    <Link href="/brands/gucci" className="block">
                      <DropdownMenuItem className="cursor-pointer">GUCCI</DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* WATCH with submenu */}
                <DropdownMenu >
                  <DropdownMenuTrigger  asChild>
                    <DropdownMenuItem 
                      className="cursor-pointer justify-between"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <span>WATCH</span>
                      <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" className="w-[200px] p-2">
                    <Link href="/brands/cartier" className="block">
                      <DropdownMenuItem className="cursor-pointer">CARTIER</DropdownMenuItem>
                    </Link>
                    <Link href="/brands/hermes" className="block">
                      <DropdownMenuItem className="cursor-pointer">HERMÈS</DropdownMenuItem>
                    </Link>
                    <Link href="/brands/dior" className="block">
                      <DropdownMenuItem className="cursor-pointer">DIOR</DropdownMenuItem>
                    </Link>
                    <Link href="/brands/chanel" className="block">
                      <DropdownMenuItem className="cursor-pointer">CHANEL</DropdownMenuItem>
                    </Link>
                    <Link href="/brands/gucci" className="block">
                      <DropdownMenuItem className="cursor-pointer">GUCCI</DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* SUNGLASSES with submenu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem 
                      className="cursor-pointer justify-between"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <span>SUNGLASSES</span>
                      <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" className="w-[200px] p-2">
                    <Link href="/brands/cartier" className="block">
                      <DropdownMenuItem className="cursor-pointer">CARTIER</DropdownMenuItem>
                    </Link>
                    <Link href="/brands/hermes" className="block">
                      <DropdownMenuItem className="cursor-pointer">HERMÈS</DropdownMenuItem>
                    </Link>
                    <Link href="/brands/dior" className="block">
                      <DropdownMenuItem className="cursor-pointer">DIOR</DropdownMenuItem>
                    </Link>
                    <Link href="/brands/chanel" className="block">
                      <DropdownMenuItem className="cursor-pointer">CHANEL</DropdownMenuItem>
                    </Link>
                    <Link href="/brands/gucci" className="block">
                      <DropdownMenuItem className="cursor-pointer">GUCCI</DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* JEWELLERY with submenu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem 
                      className="cursor-pointer justify-between"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <span>JEWELLERY</span>
                      <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" className="w-[200px] p-2">
                    <Link href="/brands/cartier" className="block">
                      <DropdownMenuItem className="cursor-pointer">CARTIER</DropdownMenuItem>
                    </Link>
                    <Link href="/brands/hermes" className="block">
                      <DropdownMenuItem className="cursor-pointer">HERMÈS</DropdownMenuItem>
                    </Link>
                    <Link href="/brands/dior" className="block">
                      <DropdownMenuItem className="cursor-pointer">DIOR</DropdownMenuItem>
                    </Link>
                    <Link href="/brands/chanel" className="block">
                      <DropdownMenuItem className="cursor-pointer">CHANEL</DropdownMenuItem>
                    </Link>
                    <Link href="/brands/gucci" className="block">
                      <DropdownMenuItem className="cursor-pointer">GUCCI</DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" asChild className="font-medium">
              <Link href="/about">ABOUT US</Link>
            </Button>
            <Button variant="ghost" asChild className="font-medium">
              <Link href="/contact">CONTACT US</Link>
            </Button>
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden md:flex"
            >
              <Link href="/account" aria-label="Account">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart" aria-label="Shopping cart">
                <ShoppingBag className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  0
                </Badge>
              </Link>
            </Button>

            {/* Mobile Menu */}
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
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search..." className="pl-8" />
                  </div>

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
          </div>
        </div>
      </div>
    </header>
  );
}
