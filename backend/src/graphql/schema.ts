import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type NewsItem {
    id: ID!
    title: String!
    body: String!
    createdAt: String
  }

  type Query {
    activeNews: [NewsItem!]!
  }
`);