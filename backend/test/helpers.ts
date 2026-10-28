import express, { type RequestHandler } from 'express';

// Mounts one router the way app.ts does, without app.ts's side effects (Prisma connection, listen).
export const appWith = (path: string, router: RequestHandler) => {
  const app = express();
  app.use(express.json());
  app.use(path, router);
  return app;
};
