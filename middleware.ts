import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const slug = url.pathname.split('/products/')[1];

  if (url.pathname === '/products' && url.searchParams.has('attribute_Brand')) {
    const brand = url.searchParams.get('attribute_Brand');
    if (brand) {
      return NextResponse.redirect(`https://lux-store.eu/store/all?brand=${encodeURIComponent(brand)}`, 301);
    }
  }

  // Redirect brand URLs to store with brand filter
  const brandRedirects: { [key: string]: string } = {
    'hermes': 'Hermès',
    'hermès': 'Hermès',
    'gucci': 'Gucci',
    'chanel': 'Chanel',
    'dior': 'Dior',
    'rolex': 'Rolex',
    'cartier': 'Cartier',
    'catrier': 'Cartier',
  };

  if (slug && brandRedirects[slug.toLowerCase()]) {
    const brandName = brandRedirects[slug.toLowerCase()];
    return NextResponse.redirect(`https://lux-store.eu/store/all?brand=${encodeURIComponent(brandName)}`, 301);
  }

  if (slug && /[A-Z]/.test(slug)) {
    let newSlug = slug.toLowerCase().replace(/-p(\d+)$/, '-$1');
    return NextResponse.redirect(`https://lux-store.eu/products/${newSlug}`, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/products/:slug*', '/products'],
};
