import { gql } from '@apollo/client';

export const GET_CATALOG = gql`
  query GetCatalog {
    catalog {
      id
      title
      description
      price
    }
  }
`;
