import express, { type Application } from 'express';
import cors from 'cors';
import mainRouter from './routes/mainRouter.js';
import './db/queries.js'; 

const app: Application = express();

const corsOptions = {
  origin: [
    'https://agentic-ai-news-to-image.pages.dev', 
    'https://jonathan-orlowski.dev',
  ],
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/", mainRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}`)
);