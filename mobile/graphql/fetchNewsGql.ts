import { request } from 'graphql-request';
import { GET_ACTIVE_NEWS } from './queries';
import type { NewsData } from '../../shared/types/interfaces';

interface ActiveNewsResponse {
  activeNews: {
    headline: string;
    description: string;
    image_url: string;
  };
}

export async function fetchNewsGql(graphqlUrl: string): Promise<NewsData> {
  const data = await request<ActiveNewsResponse>(graphqlUrl, GET_ACTIVE_NEWS);
  const newsItem = data.activeNews;
  return {
    headline: newsItem.headline,
    description: newsItem.description,
    image_url: newsItem.image_url
  };
}