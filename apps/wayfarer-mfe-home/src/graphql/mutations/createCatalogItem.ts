import { gql } from "@apollo/client";

export const CREATE_CATALOG_ITEM = gql`
  mutation CreateCatalogItem(
    $title: String!
    $description: String
    $price: Float!
  ) {
    createCatalogItem(title: $title, description: $description, price: $price) {
      id
      title
      description
      price
    }
  }
`;
