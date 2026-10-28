import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import type { Router } from 'express';
import request from 'supertest';
import { appWith } from './helpers.js';

const mockFetch = jest.fn<typeof fetch>();

// The limiters count in module state, so each test loads a fresh copy of the router.
const freshApp = () => {
  let router: Router | undefined;
  jest.isolateModules(() => {
    router = require('../src/routes/workflow.js').default;
  });
  return appWith('/api/v1/workflow', router!);
};

const run = (app: ReturnType<typeof freshApp>, ip = '203.0.113.7') =>
  request(app).post('/api/v1/workflow').set('CF-Connecting-IP', ip);

const story = { headline: 'Fresh headline', description: 'Fresh scene', imageUrl: 'https://res.cloudinary.com/demo/new.png' };
const n8nReply = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });

beforeEach(() => {
  process.env.N8N_WEBHOOK_URL = 'https://n8n.test/webhook/abc';
  process.env.N8N_WEBHOOK_TOKEN = 'secret-token';
  globalThis.fetch = mockFetch;
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  delete process.env.N8N_WEBHOOK_URL;
  delete process.env.N8N_WEBHOOK_TOKEN;
});

describe('POST /api/v1/workflow', () => {
  it("runs the n8n workflow with the token and returns its story", async () => {
    mockFetch.mockResolvedValue(n8nReply(story));
    const res = await run(freshApp());
    expect(res.status).toBe(200);
    expect(res.body).toEqual(story);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://n8n.test/webhook/abc',
      expect.objectContaining({ method: 'POST', headers: { 'X-Workflow-Token': 'secret-token' } }),
    );
  });

  it('allows each visitor 3 runs an hour', async () => {
    mockFetch.mockImplementation(async () => n8nReply(story));
    const app = freshApp();
    for (let i = 0; i < 3; i++) expect((await run(app)).status).toBe(200);

    const blocked = await run(app);
    expect(blocked.status).toBe(429);
    expect(blocked.body.error).toMatch('3 times this hour');
    expect(mockFetch).toHaveBeenCalledTimes(3);

    expect((await run(app, '198.51.100.9')).status).toBe(200);
  });

  it('stops everyone after 20 runs a day, whatever address they claim', async () => {
    mockFetch.mockImplementation(async () => n8nReply(story));
    const app = freshApp();
    for (let i = 0; i < 20; i++) expect((await run(app, `192.0.2.${i}`)).status).toBe(200);

    const blocked = await run(app, '192.0.2.200');
    expect(blocked.status).toBe(429);
    expect(blocked.body.error).toMatch('daily limit');
  });

  it('answers 502 without passing on n8n\'s error', async () => {
    mockFetch.mockResolvedValue(n8nReply({ message: 'Workflow could not be started' }, 500));
    const res = await run(freshApp());
    expect(res.status).toBe(502);
    expect(res.body).toEqual({ error: 'The workflow failed. Try again later.' });
  });

  it('answers 502 when n8n cannot be reached', async () => {
    mockFetch.mockRejectedValue(new TypeError('fetch failed'));
    expect((await run(freshApp())).status).toBe(502);
  });

  it('answers 503 and calls nothing when the webhook is not configured', async () => {
    delete process.env.N8N_WEBHOOK_TOKEN;
    const res = await run(freshApp());
    expect(res.status).toBe(503);
    expect(mockFetch).not.toHaveBeenCalled();
  });
});
