import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import request from 'supertest';
import { db } from '../src/db/queries.js';
import mainRouter from '../src/routes/mainRouter.js';
import { appWith } from './helpers.js';

jest.mock('../src/db/queries.js', () => ({ db: { getActiveNews: jest.fn() } }));

const getActiveNews = jest.mocked(db.getActiveNews);
const app = appWith('/', mainRouter);

const story = {
  id: 7,
  headline: 'Glaciers retreat faster than forecast',
  description: 'A blue ice wall cracking into a grey sea under low clouds',
  image_url: 'https://api.jonathan-orlowski.dev/images/812.jpg',
};

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('POST /api/v1/news', () => {
  it('returns the active story under getActiveNews, the shape the web app reads', async () => {
    getActiveNews.mockResolvedValue(story);
    const res = await request(app).post('/api/v1/news');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ getActiveNews: story });
  });

  it('answers 500 when the database fails', async () => {
    getActiveNews.mockRejectedValue(new Error('Connection terminated'));
    const res = await request(app).post('/api/v1/news');
    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Connection terminated');
  });
});

describe('GraphQL /api/v1/graphql', () => {
  // The query the mobile app sends (mobile/graphql/queries.ts).
  const query = 'query GetActiveNews { activeNews { id headline description image_url } }';

  it("answers the mobile app's query", async () => {
    getActiveNews.mockResolvedValue(story);
    const res = await request(app).post('/api/v1/graphql').send({ query });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ data: { activeNews: { ...story, id: '7' } } });
  });

  it('returns null rather than an error when no story is active', async () => {
    getActiveNews.mockResolvedValue(null);
    const res = await request(app).post('/api/v1/graphql').send({ query });
    expect(res.body).toEqual({ data: { activeNews: null } });
  });

  it('rejects fields the schema does not have', async () => {
    const res = await request(app).post('/api/v1/graphql').send({ query: '{ activeNews { title } }' });
    // graphql-http keeps the status at 200 for clients that accept plain JSON, as the mobile app does.
    expect(res.body.errors[0].message).toMatch('Cannot query field "title"');
    expect(getActiveNews).not.toHaveBeenCalled();
  });
});
