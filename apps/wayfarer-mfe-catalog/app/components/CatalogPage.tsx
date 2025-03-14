'use client';

import { useEffect, useState } from "react";
import FilterControls from "./FilterControls";
import ProductList from "./ProductList";
import { useSearchParams, useRouter } from 'next/navigation';

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      });

    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  useEffect(() => {
    let filtered = products;

    console.log(searchParams.toString());
    
    const category = searchParams.get('category');
    if (category) {
      filtered = filtered.filter((p: any) => p.category === category);
    }
    
    const minPrice = Number(searchParams.get('minPrice')) || 0;
    const maxPrice = Number(searchParams.get('maxPrice')) || 1000;
    filtered = filtered.filter((p: any)=> p.price >= minPrice && p.price <= maxPrice);
    
    const rating = Number(searchParams.get('rating')) || 0;
    if (rating > 0) {
      filtered = filtered.filter((p: any) => p.rating.rate >= rating);
    }
    
    const query = searchParams.get('search') || '';
    if (query) {
      filtered = filtered.filter((p: any) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    const sort = searchParams.get('sort');
    if (sort === 'price_asc') {
      filtered = [...filtered].sort((a: any, b: any) => a.price - b.price);
    } else if (sort === 'price_desc') {
      filtered = [...filtered].sort((a: any, b: any) => b.price - a.price);
    } else if (sort === 'rating_desc') {
      filtered = [...filtered].sort((a: any, b: any) => b.rating.rate - a.rating.rate);
    }

    setFilteredProducts(filtered);
  }, [searchParams, products]);

  const updateParams = (key: string, value: string | number ) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value.toString());
    } else {
      params.delete(key);
    }
    router.replace(`?${params.toString()}`);
  };

  return (
    <div>
      <FilterControls categories={categories} updateParams={updateParams} />
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default CatalogPage;
