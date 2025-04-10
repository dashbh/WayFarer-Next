"use client";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
    CreateCatalogItemDocument,
} from "@/__generated__/graphql";

export default function CreateCatalogItemForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const [createCatalogItem, { data, loading, error }] =
    useMutation(CreateCatalogItemDocument);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createCatalogItem({
      variables: {
        title,
        description,
        price: parseFloat(String(price)),
      },
    });

    setTitle("");
    setDescription("");
    setPrice(0);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add Catalog Item</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Item"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-2">Error: {error.message}</p>}
      {data && (
        <p className="text-green-600 mt-2">
          Item created: {data.createCatalogItem.title}
        </p>
      )}
    </div>
  );
}
