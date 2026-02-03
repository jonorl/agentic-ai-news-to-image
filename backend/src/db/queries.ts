import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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