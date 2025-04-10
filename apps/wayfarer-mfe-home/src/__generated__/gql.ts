/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation AddToCart($userId: ID!, $productId: ID!, $quantity: Int!) {\n    addToCart(userId: $userId, productId: $productId, quantity: $quantity) {\n      id\n      quantity\n      user {\n        id\n        name\n      }\n      product {\n        id\n        title\n        price\n      }\n    }\n  }\n": typeof types.AddToCartDocument,
    "\n  mutation CreateBlog($title: String!, $content: String!, $authorId: ID!) {\n    createBlog(title: $title, content: $content, authorId: $authorId) {\n      id\n      title\n      published_at\n      author {\n        id\n        name\n        email\n      }\n    }\n  }\n": typeof types.CreateBlogDocument,
    "\n  mutation CreateCatalogItem(\n    $title: String!\n    $description: String\n    $price: Float!\n  ) {\n    createCatalogItem(title: $title, description: $description, price: $price) {\n      id\n      title\n      description\n      price\n    }\n  }\n": typeof types.CreateCatalogItemDocument,
    "\n  query GetBlogs {\n    blogs {\n      id\n      title\n      content\n      published_at\n      author {\n        id\n        name\n        email\n      }\n    }\n  }\n": typeof types.GetBlogsDocument,
    "\n  query GetCart {\n    cart {\n      id\n      quantity\n      user {\n        id\n        name\n      }\n      product {\n        id\n        title\n        price\n      }\n    }\n  }\n": typeof types.GetCartDocument,
    "\n  query GetCatalog {\n    catalog {\n      id\n      title\n      description\n      price\n    }\n  }\n": typeof types.GetCatalogDocument,
    "\n  query GetUsers {\n    users {\n      id\n      name\n      email\n    }\n  }\n": typeof types.GetUsersDocument,
};
const documents: Documents = {
    "\n  mutation AddToCart($userId: ID!, $productId: ID!, $quantity: Int!) {\n    addToCart(userId: $userId, productId: $productId, quantity: $quantity) {\n      id\n      quantity\n      user {\n        id\n        name\n      }\n      product {\n        id\n        title\n        price\n      }\n    }\n  }\n": types.AddToCartDocument,
    "\n  mutation CreateBlog($title: String!, $content: String!, $authorId: ID!) {\n    createBlog(title: $title, content: $content, authorId: $authorId) {\n      id\n      title\n      published_at\n      author {\n        id\n        name\n        email\n      }\n    }\n  }\n": types.CreateBlogDocument,
    "\n  mutation CreateCatalogItem(\n    $title: String!\n    $description: String\n    $price: Float!\n  ) {\n    createCatalogItem(title: $title, description: $description, price: $price) {\n      id\n      title\n      description\n      price\n    }\n  }\n": types.CreateCatalogItemDocument,
    "\n  query GetBlogs {\n    blogs {\n      id\n      title\n      content\n      published_at\n      author {\n        id\n        name\n        email\n      }\n    }\n  }\n": types.GetBlogsDocument,
    "\n  query GetCart {\n    cart {\n      id\n      quantity\n      user {\n        id\n        name\n      }\n      product {\n        id\n        title\n        price\n      }\n    }\n  }\n": types.GetCartDocument,
    "\n  query GetCatalog {\n    catalog {\n      id\n      title\n      description\n      price\n    }\n  }\n": types.GetCatalogDocument,
    "\n  query GetUsers {\n    users {\n      id\n      name\n      email\n    }\n  }\n": types.GetUsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddToCart($userId: ID!, $productId: ID!, $quantity: Int!) {\n    addToCart(userId: $userId, productId: $productId, quantity: $quantity) {\n      id\n      quantity\n      user {\n        id\n        name\n      }\n      product {\n        id\n        title\n        price\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddToCart($userId: ID!, $productId: ID!, $quantity: Int!) {\n    addToCart(userId: $userId, productId: $productId, quantity: $quantity) {\n      id\n      quantity\n      user {\n        id\n        name\n      }\n      product {\n        id\n        title\n        price\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBlog($title: String!, $content: String!, $authorId: ID!) {\n    createBlog(title: $title, content: $content, authorId: $authorId) {\n      id\n      title\n      published_at\n      author {\n        id\n        name\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBlog($title: String!, $content: String!, $authorId: ID!) {\n    createBlog(title: $title, content: $content, authorId: $authorId) {\n      id\n      title\n      published_at\n      author {\n        id\n        name\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCatalogItem(\n    $title: String!\n    $description: String\n    $price: Float!\n  ) {\n    createCatalogItem(title: $title, description: $description, price: $price) {\n      id\n      title\n      description\n      price\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCatalogItem(\n    $title: String!\n    $description: String\n    $price: Float!\n  ) {\n    createCatalogItem(title: $title, description: $description, price: $price) {\n      id\n      title\n      description\n      price\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBlogs {\n    blogs {\n      id\n      title\n      content\n      published_at\n      author {\n        id\n        name\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBlogs {\n    blogs {\n      id\n      title\n      content\n      published_at\n      author {\n        id\n        name\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCart {\n    cart {\n      id\n      quantity\n      user {\n        id\n        name\n      }\n      product {\n        id\n        title\n        price\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCart {\n    cart {\n      id\n      quantity\n      user {\n        id\n        name\n      }\n      product {\n        id\n        title\n        price\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCatalog {\n    catalog {\n      id\n      title\n      description\n      price\n    }\n  }\n"): (typeof documents)["\n  query GetCatalog {\n    catalog {\n      id\n      title\n      description\n      price\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsers {\n    users {\n      id\n      name\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetUsers {\n    users {\n      id\n      name\n      email\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;