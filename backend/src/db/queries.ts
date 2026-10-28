import { PrismaClient } from '../generated/prisma/client.js'; 
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.AGENTIC_AI_DB_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const db = {
  getActiveNews: async () => {
    return await prisma.daily_news_art.findFirst({
      where: {
        is_active: true,
      },
      select: {
        id: true,
        headline: true,
        description: true,
        image_url: true,
      },
    });
  },

  ping: () => prisma.$queryRaw`SELECT 1`,

  getImageUrls: async () =>
    (await prisma.daily_news_art.findMany({ select: { image_url: true } })).map((row) => row.image_url),

  disconnect: async () => {
    await prisma.$disconnect();
    await pool.end();
  },
};
