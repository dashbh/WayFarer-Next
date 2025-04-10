import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation AddToCart($userId: ID!, $productId: ID!, $quantity: Int!) {
    addToCart(userId: $userId, productId: $productId, quantity: $quantity) {
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
