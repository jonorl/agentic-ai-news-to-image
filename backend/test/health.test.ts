import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import request from 'supertest';
import { db } from '../src/db/queries.js';
import healthRouter, { resetHealthCache } from '../src/routes/health.js';
import { appWith } from './helpers.js';

jest.mock('../src/db/queries.js', () => ({ db: { ping: jest.fn() } }));

const ping = jest.mocked(db.ping);
const app = appWith('/health', healthRouter);

beforeEach(() => {
  resetHealthCache();
  process.env.GIT_SHA = 'abc1234';
});

afterEach(() => {
  jest.useRealTimers();
  delete process.env.GIT_SHA;
});

describe('GET /health', () => {
  it("reports ok and the build's commit when the database answers", async () => {
    ping.mockResolvedValue([{ '?column?': 1 }] as never);
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok', database: 'ok', version: 'abc1234' });
  });

  it('answers 503 when the database is unreachable', async () => {
    ping.mockRejectedValue(new Error("Can't reach database server"));
    const res = await request(app).get('/health');
    expect(res.status).toBe(503);
    expect(res.body).toEqual({ status: 'error', database: 'unreachable', version: 'abc1234' });
  });

  it('says dev when the image was built without a commit', async () => {
    delete process.env.GIT_SHA;
    ping.mockResolvedValue([] as never);
    expect((await request(app).get('/health')).body.version).toBe('dev');
  });

  it('checks the database at most once every 5 seconds', async () => {
    jest.useFakeTimers({ doNotFake: ['nextTick', 'setImmediate'] });
    ping.mockResolvedValue([] as never);

    await request(app).get('/health');
    await request(app).get('/health');
    expect(ping).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(5000);
    await request(app).get('/health');
    expect(ping).toHaveBeenCalledTimes(2);
  });

  it('notices recovery once the cached failure expires', async () => {
    jest.useFakeTimers({ doNotFake: ['nextTick', 'setImmediate'] });
    ping.mockRejectedValueOnce(new Error('down')).mockResolvedValue([] as never);

    expect((await request(app).get('/health')).status).toBe(503);
    jest.advanceTimersByTime(5000);
    expect((await request(app).get('/health')).status).toBe(200);
  });
});
