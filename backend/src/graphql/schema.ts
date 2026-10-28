import { buildSchema } from 'graphql';

// Mirrors what db.getActiveNews selects, which is what the mobile app's GetActiveNews query asks for.
export const schema = buildSchema(`
  type NewsItem {
    id: ID!
    headline: String!
    description: String!
    image_url: String!
  }

  type Query {
    activeNews: NewsItem
  }
`);
