import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function Footer() {
  const quickLinks = [
    { name: "Terms of Use", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Settings", href: "/cookies" },
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
  ];

  const customerService = [
    { name: "Orders & Payment", href: "/orders" },
    { name: "Delivery Information", href: "/delivery" },
    { name: "Returns & Exchanges", href: "/returns" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact Us", href: "/contact" },
  ];

  const paymentMethods = [
    "Visa",
    "Mastercard",
    "Amex",
    "PayPal",
    "Apple Pay",
    "Google Pay",
    "Klarna",
    "Bank Transfer",
  ];

  return (
    <footer className="bg-neutral-950 text-neutral-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1 - Logo & Description */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-white.png"
                alt="LUX STORE"
                width={0}
                height={50}
                sizes="100vw"
                className="h-[40px] w-auto"
              />
            </Link>
            
            <p className="text-sm text-neutral-400 leading-relaxed">
              Luxury goods boutique specializing in authentic designer accessories, timepieces, and jewelry from the world's most prestigious maisons.
            </p>

            <div className="space-y-2 text-xs text-neutral-500">
              <p>Authenticity guaranteed • Insured worldwide shipping • Discreet packaging</p>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-white tracking-[0.2em] uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Customer Service */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-white tracking-[0.2em] uppercase">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {customerService.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Concierge & Authentication */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-white tracking-[0.2em] uppercase">
              Concierge & Authentication
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Personalized concierge service for private viewings, appraisal requests and assisted purchases. Our authentication team issues detailed condition reports and provenance documentation on request.
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-800" />

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-sm text-neutral-500">
            All rights reserved © {new Date().getFullYear()} | LUX STORE | LUX ACE LTD
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-neutral-500">Secure payment:</span>
            <div className="flex flex-wrap items-center gap-2">
              {paymentMethods.map((method) => (
                <Badge
                  key={method}
                  variant="outline"
                  className="border-neutral-700 bg-neutral-900/50 text-neutral-400 hover:border-neutral-600 hover:text-neutral-300 text-xs px-3 py-1"
                >
                  {method}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
    </footer>
  );
}
