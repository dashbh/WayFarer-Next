"use client";

import { VscClearAll } from "react-icons/vsc";
import { useUpdateParams } from "./UpdateParamsProvider";
import { FilterControlsProps } from "../../type";
import { useEffect, useState } from "react";

const filterOptions = {
  category: [],
  ratings: [
    { value: "", label: "All Stars" },
    { value: "5", label: "5 Stars" },
    { value: "4+", label: "4+ Stars" },
    { value: "3+", label: "3+ Stars" },
  ],
  sort: [
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "rating_desc", label: "Rating: High to Low" },
  ],
};

const FilterControls = ({ categories }: FilterControlsProps) => {
  const { updateParams, resetFilters, searchParams } = useUpdateParams();

  const [currentFilters, setCurrentFilters] = useState<any>({});
  const [searchText, setSearchText] = useState("");
  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("maxPrice")) || 1000,
  ]);

  // **Sync selected value from searchParams**
  useEffect(() => {
    const filters = Object.fromEntries(searchParams.entries());
    setCurrentFilters({ ...filters });
    setSearchText(searchParams.get("search") || "");

    setPriceRange([Number(searchParams.get("maxPrice")) || 1000]);
  }, [searchParams]);

  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category.toUpperCase(),
  }));

  return (
    <div className="flex flex-col gap-4 border border-gray-300 rounded-md p-4">
      {/* Price Filter */}
      <div>
        <label className="block font-bold mb-2">Price</label>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={priceRange[0]}
          onChange={(e) => {
            const value = Number(e.target.value);
            setPriceRange([value]);
            updateParams("maxPrice", value.toString());
          }}
          className="w-full"
        />
      </div>

      {/* Search Filter */}
      <div>
        <label className="block font-bold mb-2">Search</label>
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            updateParams("search", e.target.value);
          }}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>

      <div>
        {/* Category Filter */}
        <div className="w-48 my-2">
          <label className="block font-bold mb-2">Category</label>
          <select
            value={currentFilters.category || ""}
            onChange={(e) => updateParams("category", e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">All Categories</option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div className="w-48 my-2">
          <label className="block font-bold mb-2">Rating</label>
          <select
            value={currentFilters.ratings || ""}
            onChange={(e) => updateParams("ratings", e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            {filterOptions.ratings.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div className="w-48 my-2">
          <label className="block font-bold mb-2">Sort By</label>
          <select
            value={currentFilters.sort || ""}
            onChange={(e) => updateParams("sort", e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            {filterOptions.sort.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="w-48 my-2 mt-4">
          <button
            aria-label="Clear Filters"
            onClick={resetFilters}
            className="bg-teal-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-teal-600 transition"
          >
            Clear Filters
            <VscClearAll />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
