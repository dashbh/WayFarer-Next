// app/api/graphql/route.ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { pool } from '@/lib/db'; // this is your raw pg client helper
import { NextRequest } from 'next/server';

// Step 1: Define GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type CatalogItem {
    id: ID!
    title: String!
    description: String
    price: Float!
  }

  type CartItem {
    id: ID!
    user: User!
    product: CatalogItem!
    quantity: Int!
  }

  type Blog {
    id: ID!
    title: String!
    content: String!
    author: User!
    published_at: String!
  }

  type Query {
    users: [User!]!
    catalog: [CatalogItem!]!
    cart: [CartItem!]!
    blogs: [Blog!]!
  }

  type Mutation {
    addToCart(userId: ID!, productId: ID!, quantity: Int!): CartItem!
    createCatalogItem(title: String!, description: String, price: Float!): CatalogItem!
    createBlog(title: String!, content: String!, authorId: ID!): Blog!
  }
`;


type User = {
  id: number;
  name: string;
  email: string;
};

// Step 2: Define resolvers
const resolvers = {
  Query: {
    users: async () => {
      const result = await pool.query('SELECT * FROM users');
      return result.rows;
    },
    catalog: async () => {
      const result = await pool.query('SELECT * FROM catalog');
      return result.rows;
    },
    cart: async () => {
      const result = await pool.query(`
        SELECT cart.id, cart.user_id, cart.product_id, cart.quantity, users.*, catalog.*
        FROM cart
        JOIN users ON cart.user_id = users.id
        JOIN catalog ON cart.product_id = catalog.id
      `);
      return result.rows.map((row: any) => ({
        id: row.id,
        quantity: row.quantity,
        user: {
          id: row.user_id,
          name: row.name,
          email: row.email,
        },
        product: {
          id: row.product_id,
          title: row.title,
          description: row.description,
          price: row.price,
        },
      }));
    },
    blogs: async () => {
      const result = await pool.query(`
        SELECT blog.*, users.*
        FROM blog
        JOIN users ON blog.author_id = users.id
      `);
      return result.rows.map((row: any) => ({
        id: row.id,
        title: row.title,
        content: row.content,
        published_at: row.published_at,
        author: {
          id: row.author_id,
          name: row.name,
          email: row.email,
        },
      }));
    },
  },

  Mutation: {
    addToCart: async (_: any, { userId, productId, quantity }: any) => {
      const result = await pool.query(
        'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [userId, productId, quantity]
      );
      const cart = result.rows[0];
      const user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
      const product = await pool.query('SELECT * FROM catalog WHERE id = $1', [productId]);

      return {
        ...cart,
        user: user.rows[0],
        product: product.rows[0],
      };
    },

    createCatalogItem: async (_: any, { title, description, price }: any) => {
      const result = await pool.query(
        'INSERT INTO catalog (title, description, price) VALUES ($1, $2, $3) RETURNING *',
        [title, description, price]
      );
      return result.rows[0];
    },

    createBlog: async (_: any, { title, content, authorId }: any) => {
      const result = await pool.query(
        'INSERT INTO blogs (title, content, author_id, published_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
        [title, content, authorId]
      );
      const blog = result.rows[0];
      const author = await pool.query('SELECT * FROM users WHERE id = $1', [authorId]);
      return {
        ...blog,
        author: author.rows[0],
      };
    },
  },
};


// Step 3: Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

// req has the type NextRequest
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => ({ req }),
});

// required to open apollo server
export async function GET(request: Request): Promise<Response> {
  return handler(request);
}

// where queries will be sent
export async function POST(request: Request): Promise<Response> {
  return handler(request);
}