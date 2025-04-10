import { gql } from "@apollo/client";

export const GET_CART = gql`
  query GetCart {
    cart {
      id
      quantity
      user {
        id
        name
      }
      product {
        id
        title
        price
      }
    }
  }
`;
