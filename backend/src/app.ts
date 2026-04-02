import express, { type Application, type Request, type Response, type NextFunction } from 'express';
import cors, { type CorsOptions } from 'cors';
import mainRouter from './routes/mainRouter.js';
import './db/queries.js';

const app: Application = express();
const isDevelopment = process.env.NODE_ENV ? process.env.NODE_ENV === 'development' : false;

const allowedOrigins = [
  'https://agentic-ai-news-to-image.pages.dev',
  'https://jonathan-orlowski.dev'
];

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (isDevelopment || !origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(cors(corsOptions));
app.use(express.json());

app.use("/", mainRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message, stack: err.stack });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}`)
);