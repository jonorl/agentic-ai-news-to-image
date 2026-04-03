import { PrismaClient } from '../generated/prisma/client.js'; 
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const db = {
  getActiveNews: async () => {
    return await prisma.daily_news_art.findFirst({
      where: {
        is_active: true,
      },
      select: {
        headline: true,
        description: true,
        image_url: true,
      },
    });
  }
};