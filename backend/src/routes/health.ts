import { Router } from 'express';
import { db } from '../db/queries.js';

const healthRouter = Router();

// Polling can't hammer Postgres: the database answer is reused for a few seconds.
const CACHE_MS = 5000;
let lastCheck: { at: number; ok: boolean } | undefined;

const databaseOk = async () => {
  if (lastCheck && Date.now() - lastCheck.at < CACHE_MS) return lastCheck.ok;
  const ok = await db.ping().then(() => true, () => false);
  lastCheck = { at: Date.now(), ok };
  return ok;
};

// version is the commit the image was built from, so a deploy can tell the new container is the one answering.
healthRouter.get('/', async (_req, res) => {
  const ok = await databaseOk();
  res.status(ok ? 200 : 503).json({
    status: ok ? 'ok' : 'error',
    database: ok ? 'ok' : 'unreachable',
    version: process.env.GIT_SHA ?? 'dev',
  });
});

export const resetHealthCache = () => {
  lastCheck = undefined;
};

export default healthRouter;
