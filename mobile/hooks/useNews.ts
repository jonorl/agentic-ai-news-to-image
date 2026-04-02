import { useState, useEffect } from 'react';
import { fetchNews } from '../../shared/hooks/useNewsCore';
import { LOADING_MESSAGES } from '../../shared/constants/messages';
import type { NewsData } from '../../shared/types/interfaces';

export function useNews() {
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isStaticMode, setIsStaticMode] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);

  // mobile/hooks/useNews.ts

  // Use a safe check to prevent Hermes from crashing on import.meta
  const STATIC_API_URL = process.env?.EXPO_PUBLIC_VITE_BACKEND

  const WEBHOOK_URL = process.env?.EXPO_PUBLIC_VITE_WEBHOOK

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
    handleFetch('static');
  }, []);

  const handleFetch = async (mode: 'static' | 'dynamic') => {
    setLoading(true);
    setError(null);
    setLoadingMessage(LOADING_MESSAGES[0]);
    try {
      const data = await fetchNews(mode, STATIC_API_URL, WEBHOOK_URL);
      setNewsData(data);
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
    fetchStatic: () => handleFetch('static'),
    fetchDynamic: () => handleFetch('dynamic')
  };
}