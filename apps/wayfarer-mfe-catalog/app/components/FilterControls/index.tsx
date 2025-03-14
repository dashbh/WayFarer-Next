"use client";

import { Input, HStack, VStack, Box, Text } from "@chakra-ui/react";
import { WayFarerSelect, WayFarerSlider } from "@wayfarer/ui";

import { FilterControlsProps } from "../../type";

const filterOptions = {
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

const FilterControls = ({ categories, updateParams }: FilterControlsProps) => {
  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category.toUpperCase(),
  }));

  return (
    <VStack align="stretch" gap={4}>
      {/* Price Filter */}
      <WayFarerSlider
        defaultValue={[10, 100]}
        onChange={(value) => {
          updateParams("minPrice", value.min);
          updateParams("maxPrice", value.max);
        }}
      />

      {/* Search Filter */}
      <Input
        placeholder="Search products..."
        onChange={(e) => updateParams("search", e.target.value)}
      />

      <HStack gap={4} height={100}>
        {/* Catagory Filter */}

        <Box>
          <Text fontWeight="bold" mb={2}>
            Category
          </Text>
          <WayFarerSelect
            options={categoryOptions}
            id="filter-category"
            onChange={(event: any) => updateParams("category", event?.value)}
          />
        </Box>

        {/* Rating Filter */}
        <Box>
          <Text fontWeight="bold" mb={2}>
            Rating
          </Text>
          <WayFarerSelect
            options={filterOptions.ratings}
            id="filter-cratings"
            onChange={(event: any) => updateParams("ratings", event?.value)}
          />
        </Box>

        {/* Sort Filter */}
        <Box>
          <Text fontWeight="bold" mb={2}>
            Sort By
          </Text>
          <WayFarerSelect
            id="filter-sortby"
            options={filterOptions.sort}
            onChange={(event: any) => updateParams("sort", event?.value)}
          />
        </Box>
      </HStack>
    </VStack>
  );
};

export default FilterControls;
