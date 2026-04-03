import { db } from '../../db/queries.js';

export const newsResolvers = {
  activeNews: async () => {
    return await db.getActiveNews();
  },
};