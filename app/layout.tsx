import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "Lux Store",
  description: "Premium luxury shopping experience",
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
        {children}
      </body>
    </html>
  );
}
