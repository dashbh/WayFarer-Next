'use client';

import { SelectContent, SelectItem, SelectLabel, SelectRoot, createListCollection } from '@wayfarer/ui';
import React, { useState, useEffect } from 'react';

interface Category {
  label: string;
  value: string;
}

const CategoryFilter = ({
  setCategory,
}: {
  setCategory: (category: string) => void;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        const formattedCategories = data.map((category: string) => ({
          label: category,
          value: category,
        }));
        setCategories(formattedCategories);
      });
  }, []);

  return (
    <SelectRoot
      collection={createListCollection({ items: categories })}
      onChange={(e) => setCategory((e.target as HTMLSelectElement).value)}
    >
      <SelectLabel>Select Category</SelectLabel>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem item={category.value} key={category.value}>
            {category.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

export default CategoryFilter;