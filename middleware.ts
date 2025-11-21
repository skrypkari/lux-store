import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const slug = url.pathname.split('/products/')[1];

  if (slug && /[A-Z]/.test(slug)) {
    let newSlug = slug.toLowerCase().replace(/-p(\d+)$/, '-$1');
    return NextResponse.redirect(new URL(`/products/${newSlug}`, request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/products/:slug*'],
};
