import { gql } from 'graphql-request';

export const GET_ACTIVE_NEWS = gql`
  query GetActiveNews {
    activeNews {
      id
      headline
      description
      image_url
    }
  }
`