import { Router, type Request, type Response } from 'express';
import { db } from '../db/queries.js'

const mainRouter = Router();

mainRouter.post('/api/v1/news', async (req: Request, res: Response) => {
  try {
    const getActiveNews = await db.getActiveNews();
    res.json({ getActiveNews });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

export default mainRouter;