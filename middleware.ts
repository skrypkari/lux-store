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

  const specificRedirects = [
    '754043337', '754043437', '762051373', '768016913', '768122046',
    'animal-jewelry-watch-p753770421', 'aviator-frame-sunglasses-792438756',
    'ballerine-wedding-ring-width-2-1-mm', 'c-de-cartier-wedding-ring-width-3-mm',
    'c-de-cartier-wedding-ring-width-4-mm', 'chanel-boy*friend-skeleton-watch',
    'chanel-oval-sunglasses-766321984', 'chanel-pilot-sunglasses-766321990',
    'chanel-pilot-sunglasses-766349844', 'chanel-rectangle-sunglasses-766349780',
    'chanel-square-sunglasses-766321230',
    'chanel-square-sunglasses-766379262', 'coco-crush-ring-mini-p766639021',
    'collier-coco-crush-p766547530', 'collier-dattelage-bag-p760234693',
    'east-west-bag-c-de-cartier-p750643740', 'etoile-filante-earrings-p766722827',
    'extrait-de-camelia-single-earring-p766579645',
    'geometrie-&-contrastes-bracelet-turquoise-paved', 'gg-emblem-maxi-tote-bag-p790971832',
    'gg-emblem-small-shoulder-bag-790979795', 'gucci-jackie-1961-medium-bag-p791109608',
    'hermes-birkin-30-capucine-togo-gold-hardware-p768064130',
    'juste-un-clou-hoop-earrings-small-model-752766913', 'large-dior-caro-bag-p762150576',
    'large-dior-toujours-bag-p761359171', 'love-ring-small-model-8-diamonds',
    'nano-model-chain-bag-panthere-graphique-de-cartier-p750930550',
    'navigator-frame-sunglasses', 'neo-medor-clutch-p760899280',
    'panthere-de-cartier-stud-earrings-p752822290', 'panthere-jewelry-watch-p753770500',
    'panthere-jewelry-watch-p753809332', 'petit-cd-earrings-p762151712',
    'rectangular-frame-sunglasses-792419199', 'rectangular-frame-sunglasses-792445253',
    'soleil-de-chanel-transformable-necklace-p766722751', 'trinity-ring-small-model-p752405466',
    'trinity-ring-small-model-semi-paved',
    'vendome-louis-cartier-wedding-ring-width-3-5-mm'
  ];

  if (slug && specificRedirects.includes(slug.toLowerCase())) {
    return NextResponse.redirect('https://lux-store.eu/store/all', 301);
  }

  const brandRedirects: { [key: string]: string } = {
    'hermes': 'Hermès',
    'hermès': 'Hermès',
    'gucci': 'Gucci',
    'chanel': 'Chanel',
    'dior': 'Dior',
    'rolex': 'Rolex',
    'cartier': 'Cartier',
    'catrier': 'Cartier'
  };

  if (slug && slug.toLowerCase() === 'chanel-shopping-bag'){
    return NextResponse.redirect('https://lux-store.eu/store/bags?brand=Chanel', 301);
  }

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
