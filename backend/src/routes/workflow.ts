import { Router } from 'express';
import { workflowVisitorLimiter, workflowDailyLimiter } from '../middleware/rateLimit.js';

const workflowRouter = Router();

// A run takes 30 to 60 seconds; Cloudflare gives up on the request at 100.
const TIMEOUT_MS = 95_000;

// The n8n webhook only accepts calls carrying this token, so the limits here can't be skipped by calling it directly.
workflowRouter.post('/', workflowVisitorLimiter, workflowDailyLimiter, async (_req, res) => {
  const url = process.env.N8N_WEBHOOK_URL;
  const token = process.env.N8N_WEBHOOK_TOKEN;
  if (!url || !token) {
    res.status(503).json({ error: 'The live workflow is not configured.' });
    return;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'X-Workflow-Token': token },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) {
      console.error(`n8n webhook answered ${response.status}`);
      res.status(502).json({ error: 'The workflow failed. Try again later.' });
      return;
    }
    res.json(await response.json());
  } catch (error) {
    console.error('n8n webhook call failed:', error);
    res.status(502).json({ error: 'The workflow failed. Try again later.' });
  }
});

export default workflowRouter;
