import cors, { type CorsOptions } from 'cors';

const allowedOrigins = [
  'https://agentic-ai-news-to-image.pages.dev',
  'https://jonathan-orlowski.dev'
];

// Read per request rather than at import, so tests can switch NODE_ENV.
const isDevelopment = () => process.env.NODE_ENV === 'development';

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // No Origin means a server-side caller (the deploy smoke test, n8n, the mobile app), which CORS doesn't apply to.
    if (isDevelopment() || !origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  optionsSuccessStatus: 200
};

export const corsMiddleware = () => cors(corsOptions);
