import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/contexts/cart-context";
import { Toaster } from "@/components/ui/toaster";

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
  title:
    "LUX STORE - Authorized store of premium brands. Chanel, Dior, Cartier, Rolex, Hermes.",
  description:
    "LUX STORE — your official online destination for luxury brands. Authentic accessories and jewelry from Cartier, Dior, Rolex, Chanel, GUCCI and Hermès. Guaranteed authenticity, premium service, fast delivery.",
  icons: {
    icon: [
      {
        url: "/favicon-180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    apple: [{ url: "/favicon-192.png" }],
  },
  openGraph: {
    title:
      "LUX STORE - Authorized store of premium brands. Chanel, Dior, Cartier, Rolex, Hermes.",
    description:
      "LUX STORE — your official online destination for luxury brands. Authentic accessories and jewelry from Cartier, Dior, Rolex, Chanel, GUCCI and Hermès.",
    images: [
      {
        url: "https://imagedelivery.net/5duV4wBvvS4Lww9u6RX_Yg/b9a02796-9f1d-49f9-68f1-fb419997fc00/public",
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
    title:
      "LUX STORE - Authorized store of premium brands. Chanel, Dior, Cartier, Rolex, Hermes.",
    description:
      "LUX STORE — your official online destination for luxury brands.",
    images: [
      "https://imagedelivery.net/5duV4wBvvS4Lww9u6RX_Yg/b9a02796-9f1d-49f9-68f1-fb419997fc00/public",
    ],
  },
  alternates: {
    canonical: "https://lux-store.eu",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P32ZR83Q');
            `,
          }}
        />

        <script
          src="//code.tidio.co/lupn32ula20iti6m3umtgqkfljzbcaxe.js"
          async
        />
      </head>

      <body
        className={`${generalSans.variable} ${satoshi.variable} antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P32ZR83Q"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
