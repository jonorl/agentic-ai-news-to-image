import { Router, type Request, type Response } from 'express';
import { db } from '../db/queries.js'
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from '../graphql/schema.js';
import { newsResolvers } from '../graphql/resolvers/newsResolvers.js';

const mainRouter = Router();

// GraphQL
mainRouter.use(
  '/api/v1/graphql',
  createHandler({ schema, rootValue: newsResolvers })
);

// REST
mainRouter.post('/api/v1/news', async (req: Request, res: Response) => {
  try {
    const getActiveNews = await db.getActiveNews();
    res.json({ getActiveNews });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

export default mainRouter;