"use client";

import { useQuery } from "@apollo/client";
import { GetBlogsDocument, GetCartDocument, GetCatalogDocument, GetUsersDocument } from "@/__generated__/graphql";

export default function HomePage() {
  return <>
  <UserList />

  <hr/> &nbsp;&nbsp;&nbsp;
  <CatalogList />

  <hr/> &nbsp;&nbsp;&nbsp;
  <CartList />

  <hr/> &nbsp;&nbsp;&nbsp;
  <BlogList />
  </>;
}

function UserList() {
  const { data, loading, error } = useQuery(GetUsersDocument);

  if (loading) return <p>Loading Users...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {data?.users?.map((user: any) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

function CatalogList() {
  const { data, loading, error } = useQuery(GetCatalogDocument);

  if (loading) return <p>Loading Catalog...</p>;
  if (error) return <p>Error loading Catalog</p>;

  return (
    <div>
      <h2>Catalog</h2>
      <ul>
        {data?.catalog?.map((item: any) => (
          <li key={item.id}>
            {item.title} ({item.price})
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CartList() {
  const { data, loading, error } = useQuery(GetCartDocument);

  if (loading) return <p>Loading Cart...</p>;
  if (error) return <p>Error loading Cart</p>;

  return (
    <div>
      <h2>Cart Items</h2>
      <ul>
        {data?.cart?.map((item) => (
          <li key={item.id} className="mb-4 border p-4 rounded-md shadow">
            <p><strong>Product:</strong> {item.product.title}</p>
            <p><strong>Price:</strong> ${item.product.price}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Added by:</strong> {item.user.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BlogList() {
  const { data, loading, error } = useQuery(GetBlogsDocument);

  if (loading) return <p>Loading Blog List...</p>;
  if (error) return <p>Error loading Blog List</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {data?.blogs?.map((item: any) => (
          <li key={item.id}>
            {item.title}
            <p>{item.published_at}</p>
            <p>{item.content}</p>
            <p>{item.author.name}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}