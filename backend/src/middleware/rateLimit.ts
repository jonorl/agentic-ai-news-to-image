import type { Request } from 'express';
import { rateLimit, ipKeyGenerator } from 'express-rate-limit';

// Requests pass through Cloudflare and then Caddy, so req.ip is a Cloudflare edge server shared by many visitors.
// Cloudflare puts the visitor's own address in CF-Connecting-IP; req.ip only applies to requests that skip Cloudflare.
const visitorIp = (req: Request) => {
  const header = req.headers['cf-connecting-ip'];
  return (Array.isArray(header) ? header[0] : header) ?? req.ip ?? '';
};

const tooMany = (error: string) => ({ error });

// A run calls NewsAPI, Gemini (or Groq) and Flux on free tiers, so each visitor gets a few runs to try it out.
export const workflowVisitorLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 3,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  keyGenerator: (req) => ipKeyGenerator(visitorIp(req)),
  message: tooMany('You have run the workflow 3 times this hour. Try again later, or use Fetch Static.'),
});

// The per-visitor limit trusts CF-Connecting-IP, which a script calling the server directly could change on every
// request; this cap holds whatever the address, so the day's API quotas can't be spent by one person.
export const workflowDailyLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  keyGenerator: () => 'all-visitors',
  message: tooMany('The workflow has reached its daily limit. Try again tomorrow, or use Fetch Static.'),
});
