import { useState, useEffect, useCallback } from 'react';
import { fetchNews } from '../../../shared/hooks/useNewsCore';
import { LOADING_MESSAGES } from '../../../shared/constants/messages';
import type { NewsData } from '../../../shared/types/interfaces';

export function useNews() {
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  // Starts true because the stored story is fetched on mount.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isStaticMode, setIsStaticMode] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);

  const STATIC_API_URL = import.meta.env.VITE_BACKEND;

  // State is only set in the promise callbacks, so the first load can start from an effect.
  const load = useCallback((mode: 'static' | 'dynamic') =>
    fetchNews(mode, STATIC_API_URL)
      .then(
        (data) => {
          setNewsData(data);
          setLastUpdated(new Date().toLocaleString());
          setIsStaticMode(mode === 'static');
        },
        (err) => setError(err instanceof Error ? err.message : 'Failed to fetch news'),
      )
      .finally(() => setLoading(false)),
  [STATIC_API_URL]);

  const handleFetch = (mode: 'static' | 'dynamic') => {
    setLoading(true);
    setError(null);
    setLoadingMessage(LOADING_MESSAGES[0]);
    return load(mode);
  };

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
    load('static');
  }, [load]);

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