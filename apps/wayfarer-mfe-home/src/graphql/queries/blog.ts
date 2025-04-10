import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
  query GetBlogs {
    blogs {
      id
      title
      content
      published_at
      author {
        id
        name
        email
      }
    }
  }
`;
