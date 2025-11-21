const fs = require('fs');
const path = require('path');


const xmlPath = path.join(__dirname, '../public/sitemap.xml');
const xmlContent = fs.readFileSync(xmlPath, 'utf-8');


const urlRegex = /<url>\s*<loc>(.*?)<\/loc>\s*<priority>(.*?)<\/priority>\s*<\/url>/gs;
const urls = [];
const uniqueUrls = new Set();

let match;
while ((match = urlRegex.exec(xmlContent)) !== null) {
  const url = match[1].replace('https://lux-store.eu', '');
  const priority = parseFloat(match[2]);
  

  const urlKey = `${url}|${priority}`;
  if (!uniqueUrls.has(urlKey)) {
    uniqueUrls.add(urlKey);
    urls.push({ url, priority });
  }
}

console.log(`Найдено ${urls.length} уникальных URL'ов (из ${xmlContent.match(/<url>/g)?.length || 0} всего)`);


const staticPages = urls.filter(u => !u.url.startsWith('/products/') && !u.url.startsWith('/store/'));
const storePages = urls.filter(u => u.url.startsWith('/store/'));
const productPages = urls.filter(u => u.url.startsWith('/products/'));

console.log(`Статические страницы: ${staticPages.length}`);
console.log(`Страницы магазина: ${storePages.length}`);
console.log(`Страницы товаров: ${productPages.length}`);


const staticEntries = staticPages.map(({ url, priority }) => {
  const urlPath = url || '/';
  const changeFreq = priority >= 0.9 ? 'daily' : priority >= 0.7 ? 'weekly' : priority >= 0.5 ? 'monthly' : 'yearly';
  
  return `    {
      url: \`\${baseUrl}${urlPath}\`,
      lastModified: new Date(),
      changeFrequency: '${changeFreq}',
      priority: ${priority},
    }`;
}).join(',\n');

const storeEntries = storePages.map(({ url, priority }) => {
  const changeFreq = 'daily';
  
  return `    {
      url: \`\${baseUrl}${url}\`,
      lastModified: new Date(),
      changeFrequency: '${changeFreq}',
      priority: ${priority},
    }`;
}).join(',\n');

const sitemapContent = `import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lux-store.eu';

  return [
${staticEntries},
${storeEntries}
  ];
}
`;


const sitemapPath = path.join(__dirname, '../app/sitemap.ts');
fs.writeFileSync(sitemapPath, sitemapContent, 'utf-8');
console.log(`✅ Создан app/sitemap.ts с ${staticPages.length + storePages.length} URL'ами`);



const productSlugs = [...new Set(productPages.map(p => {
  const slug = p.url.replace('/products/', '');
  return slug;
}))];

console.log(`Уникальных товаров: ${productSlugs.length}`);

const productSitemapContent = `import { MetadataRoute } from 'next';


async function getProducts() {
  try {
    const response = await fetch('https://api.lux-store.eu/products', {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      console.error('Failed to fetch products for sitemap');
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch products for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lux-store.eu';
  const products = await getProducts();


  const productUrls = products.map((product: any) => ({
    url: \`\${baseUrl}/products/\${product.slug}\`,
    lastModified: new Date(product.updated_at || product.created_at || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return productUrls;
}
`;

const productSitemapPath = path.join(__dirname, '../app/products/sitemap.ts');
fs.writeFileSync(productSitemapPath, productSitemapContent, 'utf-8');
console.log(`✅ Создан app/products/sitemap.ts (динамический, загружает из API)`);

console.log('\n✨ Конвертация завершена!');
console.log('\n📋 Структура:');
console.log('  - app/sitemap.ts - статические страницы + категории магазина');
console.log('  - app/products/sitemap.ts - все товары (динамически из API)');
console.log('\n🌐 URL\'ы будут доступны:');
console.log('  - https://lux-store.eu/sitemap.xml');
console.log('  - https://lux-store.eu/products/sitemap.xml');
