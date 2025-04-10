import { gql } from '@apollo/client';

export const GET_USERS = gql(/* GraphQL */`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`);
