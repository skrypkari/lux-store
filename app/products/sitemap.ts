import { MetadataRoute } from 'next';

// Функция для получения всех товаров
async function getProducts() {
  try {
    const response = await fetch('http://localhost:5000/products', {
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

  // Создаем URL для каждого товара
  const productUrls = products.map((product: any) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product.updated_at || product.created_at || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return productUrls;
}
