import type { NewsData } from '../types/interfaces';

// newsUrl is the API's /api/v1/news; a live run goes through the API's /api/v1/workflow, which rate-limits it,
// rather than straight to n8n.
export async function fetchNews(
  mode: 'static' | 'dynamic',
  newsUrl: string
): Promise<NewsData> {
  const url = mode === 'static' ? newsUrl : new URL('workflow', newsUrl).href;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error ?? `HTTP error! status: ${response.status}`);
  const newsItem = data.getActiveNews || data;
  return {
    headline: newsItem.headline,
    description: newsItem.description,
    image_url: newsItem.image_url || newsItem.imageUrl
  };
}
