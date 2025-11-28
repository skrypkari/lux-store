import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
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
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-EFT733S3K6"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EFT733S3K6');
              
              (function() {
                const urlParams = new URLSearchParams(window.location.search);
                const gclid = urlParams.get('gclid');
                if (gclid) {
                  try {
                    localStorage.setItem('gclid', gclid);
                  } catch (e) {
                    console.error('Failed to save gclid:', e);
                  }
                }

                const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
                utmParams.forEach(param => {
                  const value = urlParams.get(param);
                  if (value) {
                    try {
                      localStorage.setItem(param, value);
                    } catch (e) {
                      console.error('Failed to save ' + param + ':', e);
                    }
                  }
                });
              })();
            `
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '4410966249224179');
              fbq('track', 'PageView');
            `
          }}
        />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=4410966249224179&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <script src="//code.jivosite.com/widget/6iCt2ayMiM" async></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject = t;
                var ttq = w[t] = w[t] || [];
                ttq.methods = ["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
                ttq.setAndDefer = function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
                for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
                ttq.instance = function(t){
                  for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
                  return e;
                };
                ttq.load = function(e,n){
                  var r = "https://analytics.tiktok.com/i18n/pixel/events.js", o = n && n.partner;
                  ttq._i = ttq._i || {};
                  ttq._i[e] = [];
                  ttq._i[e]._u = r;
                  ttq._t = ttq._t || {};
                  ttq._t[e] = +new Date;
                  ttq._o = ttq._o || {};
                  ttq._o[e] = n || {};
                  n = document.createElement("script");
                  n.type = "text/javascript";
                  n.async = !0;
                  n.src = r + "?sdkid=" + e + "&lib=" + t;
                  e = document.getElementsByTagName("script")[0];
                  e.parentNode.insertBefore(n, e);
                };
                ttq.load('D4JVP43C77UBCCH9EEA0');
                ttq.page();
              }(window, document, 'ttq');
            `,
          }}
        />
      </head>
      <body
        className={`${generalSans.variable} ${satoshi.variable} antialiased`}
      >
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
