import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/contexts/cart-context";

const generalSans = localFont({
  src: "../public/fonts/GeneralSans-Variable.ttf",
  variable: "--font-general-sans",
  weight: "100 200 300 400 500 600 700 800 900",
});

const satoshi = localFont({
  src: "../public/fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "LUX STORE - Authorized store of premium brands. Chanel, Dior, Cartier, Rolex, Hermes.",
  description: "LUX STORE — your official online destination for luxury brands. Authentic accessories and jewelry from Cartier, Dior, Rolex, Chanel, GUCCI and Hermès. Guaranteed authenticity, premium service, fast delivery.",
  icons: {
    icon: [
      {
        url: "/favicon-180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicon-192.png",
      },
    ],
  },
  openGraph: {
    title: "LUX STORE - Authorized store of premium brands. Chanel, Dior, Cartier, Rolex, Hermes.",
    description: "LUX STORE — your official online destination for luxury brands. Authentic accessories and jewelry from Cartier, Dior, Rolex, Chanel, GUCCI and Hermès. Guaranteed authenticity, premium service, fast delivery.",
    images: [
      {
        url: "https://imagedelivery.net/5duV4wBvvS4Lww9u6RX_Yg/b9a02796-9f1d-49f9-68f1-fb419997fc00/public",
        secureUrl: "https://imagedelivery.net/5duV4wBvvS4Lww9u6RX_Yg/b9a02796-9f1d-49f9-68f1-fb419997fc00/public",
        width: 1200,
        height: 630,
        alt: "LUX STORE - Premium luxury brands",
      },
    ],
    type: "website",
    siteName: "LUX STORE",
    locale: "en_US",
    url: "https://lux-store.eu",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUX STORE - Authorized store of premium brands. Chanel, Dior, Cartier, Rolex, Hermes.",
    description: "LUX STORE — your official online destination for luxury brands. Authentic accessories and jewelry from Cartier, Dior, Rolex, Chanel, GUCCI and Hermès. Guaranteed authenticity, premium service, fast delivery.",
    images: ["https://imagedelivery.net/5duV4wBvvS4Lww9u6RX_Yg/b9a02796-9f1d-49f9-68f1-fb419997fc00/public"],
  },
  alternates: {
    canonical: "https://lux-store.eu",
    languages: {
      "x-default": "https://lux-store.eu/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${generalSans.variable} ${satoshi.variable} antialiased`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
