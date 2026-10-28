import express, { type Application, type Request, type Response, type NextFunction } from 'express';
import mainRouter from './routes/mainRouter.js';
import healthRouter from './routes/health.js';
import workflowRouter from './routes/workflow.js';
import { corsMiddleware } from './middleware/cors.js';

const app: Application = express();
app.disable('x-powered-by');
// Caddy is the proxy Express talks to; behind Cloudflare the visitor's address comes from CF-Connecting-IP (see rateLimit.ts).
app.set('trust proxy', 1);

app.use(corsMiddleware());
app.use(express.json());

app.use('/health', healthRouter);
app.use('/api/v1/workflow', workflowRouter);
app.use("/", mainRouter);

// The stack stays in the logs; sending it would show visitors the server's file layout.
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT_AGENTIC_AI || 3001;

app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}`)
);
