import type { NewsData } from '../types/interfaces';

export async function fetchNews(
  mode: 'static' | 'dynamic',
  staticUrl: string,
  webhookUrl: string
): Promise<NewsData> {
  const url = mode === 'static' ? staticUrl : webhookUrl;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  const newsItem = data.getActiveNews || data;
  return {
    headline: newsItem.headline,
    description: newsItem.description,
    imageUrl: newsItem.image_url || newsItem.imageUrl
  };
}