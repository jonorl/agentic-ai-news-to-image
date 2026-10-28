import express, { type Router } from 'express';

// Mounts one router the way app.ts does, without app.ts's side effects (Prisma connection, listen).
export const appWith = (path: string, router: Router) => {
  const app = express();
  app.use(express.json());
  app.use(path, router);
  return app;
};
