import { describe, it, expect, afterEach } from '@jest/globals';
import express from 'express';
import request from 'supertest';
import { corsMiddleware } from '../src/middleware/cors.js';

const appWithCors = () => {
  const app = express();
  app.use(corsMiddleware());
  app.post('/api/v1/news', (_req, res) => res.json({ ok: true }));
  return app;
};

const allowOrigin = async (origin: string) =>
  (await request(appWithCors()).post('/api/v1/news').set('Origin', origin)).headers['access-control-allow-origin'];

afterEach(() => {
  process.env.NODE_ENV = 'test';
});

describe('corsMiddleware', () => {
  it.each(['https://agentic-ai-news-to-image.pages.dev', 'https://jonathan-orlowski.dev'])('allows %s', async (origin) => {
    expect(await allowOrigin(origin)).toBe(origin);
  });

  it.each([
    'https://evil.example',
    'http://jonathan-orlowski.dev',
    'https://jonathan-orlowski.dev.evil.example',
    'http://localhost:5173',
  ])('refuses %s', async (origin) => {
    expect(await allowOrigin(origin)).toBeUndefined();
  });

  it('allows localhost only when NODE_ENV is development', async () => {
    process.env.NODE_ENV = 'development';
    expect(await allowOrigin('http://localhost:5173')).toBe('http://localhost:5173');
  });

  it('still serves server-side callers that send no Origin', async () => {
    const res = await request(appWithCors()).post('/api/v1/news');
    expect(res.status).toBe(200);
  });
});
