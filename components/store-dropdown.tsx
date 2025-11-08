"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function StoreDropdown() {
  return (
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
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
  );
}
