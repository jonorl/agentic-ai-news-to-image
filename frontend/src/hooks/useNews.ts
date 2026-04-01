import { useState, useEffect } from 'react';
import { LOADING_MESSAGES } from '../constants/messages';
import type { NewsData } from '../types/interfaces';

export function useNews() {
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  const [isStaticMode, setIsStaticMode] = useState(true);

  const STATIC_API_URL = import.meta.env.VITE_BACKEND;
  const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK;

  // Handle message rotation
  useEffect(() => {
    if (!loading) return;
    let messageIndex = 0;
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
      setLoadingMessage(LOADING_MESSAGES[messageIndex]);
    }, 2500);
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    fetchNews('static');
  }, []);

  const fetchNews = async (mode: 'static' | 'dynamic') => {
    setLoading(true);
    setError(null);
    setLoadingMessage(LOADING_MESSAGES[0]);

    console.log("Attempting fetch. Mode:", mode);
    console.log("Target URL:", mode === 'static' ? STATIC_API_URL : WEBHOOK_URL);

    const url = mode === 'static' ? STATIC_API_URL : WEBHOOK_URL;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const newsItem = data.getActiveNews || data;

      setNewsData({
        headline: newsItem.headline,
        description: newsItem.description,
        imageUrl: newsItem.image_url || newsItem.imageUrl
      });

      setLastUpdated(new Date().toLocaleString());
      setIsStaticMode(mode === 'static');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  return {
    newsData,
    loading,
    error,
    lastUpdated,
    loadingMessage,
    isStaticMode,
    fetchStatic: () => fetchNews('static'),
    fetchDynamic: () => fetchNews('dynamic')
  };
}