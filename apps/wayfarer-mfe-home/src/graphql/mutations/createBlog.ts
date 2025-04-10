import { gql } from "@apollo/client";

export const CREATE_BLOG = gql`
  mutation CreateBlog($title: String!, $content: String!, $authorId: ID!) {
    createBlog(title: $title, content: $content, authorId: $authorId) {
      id
      title
      published_at
      author {
        id
        name
        email
      }
    }
  }
`;
