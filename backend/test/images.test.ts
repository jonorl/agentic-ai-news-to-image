import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { mkdtemp, writeFile, utimes, readdir, rm, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import request from 'supertest';
import { imagesRouter } from '../src/routes/images.js';
import { cleanupImages, WEEK_MS } from '../src/scripts/cleanupImages.js';
import { appWith } from './helpers.js';

let dir: string;
const now = Date.parse('2026-11-02T04:00:00Z');
const daysAgo = (days: number) => new Date(now - days * 24 * 60 * 60 * 1000);

const addImage = async (name: string, age: Date) => {
  await writeFile(path.join(dir, name), 'jpeg');
  await utimes(path.join(dir, name), age, age);
};

beforeEach(async () => {
  dir = await mkdtemp(path.join(tmpdir(), 'agentic-images-'));
});

afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

describe('GET /images', () => {
  it('serves an image with a year-long immutable cache', async () => {
    await addImage('812.jpg', daysAgo(0));
    const res = await request(appWith('/images', imagesRouter(dir))).get('/images/812.jpg');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toBe('image/jpeg');
    expect(res.headers['cache-control']).toBe('public, max-age=31536000, immutable');
  });

  it('answers 404 for a missing image and for anything outside the folder', async () => {
    const app = appWith('/images', imagesRouter(dir));
    expect((await request(app).get('/images/nope.jpg')).status).toBe(404);
    expect((await request(app).get('/images/..%2Fpackage.json')).status).not.toBe(200);
  });
});

describe('cleanupImages', () => {
  it('deletes images older than a week that no story uses', async () => {
    await addImage('old.jpg', daysAgo(8));
    await addImage('new.jpg', daysAgo(2));
    expect(await cleanupImages(dir, [], now)).toEqual(['old.jpg']);
    expect(await readdir(dir)).toEqual(['new.jpg']);
  });

  it("keeps an old image a stored story still shows, such as the active one after a week of failed runs", async () => {
    await addImage('700.jpg', daysAgo(10));
    await addImage('701.jpg', daysAgo(10));
    const deleted = await cleanupImages(dir, ['https://api.jonathan-orlowski.dev/images/700.jpg'], now);
    expect(deleted).toEqual(['701.jpg']);
    expect(await readdir(dir)).toEqual(['700.jpg']);
  });

  it('ignores Cloudinary URLs from before the move and leaves folders alone', async () => {
    await mkdir(path.join(dir, 'sub'));
    await addImage('old.jpg', daysAgo(30));
    const deleted = await cleanupImages(dir, ['https://res.cloudinary.com/demo/image/upload/v1/agentic-ai/abc.png'], now);
    expect(deleted).toEqual(['old.jpg']);
    expect(await readdir(dir)).toEqual(['sub']);
  });

  it('keeps an image exactly a week old', async () => {
    await addImage('edge.jpg', new Date(now - WEEK_MS + 1000));
    expect(await cleanupImages(dir, [], now)).toEqual([]);
  });
});
