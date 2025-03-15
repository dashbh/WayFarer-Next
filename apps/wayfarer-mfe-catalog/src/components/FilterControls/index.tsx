"use client";

import { Input, HStack, VStack, Box, Text, Spacer } from "@chakra-ui/react";
import { WayFarerSelect, WayFarerSlider, Button } from "@wayfarer/ui";
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
    <VStack align="stretch" gap={4}>
      {/* Price Filter */}
      <WayFarerSlider
        label="Price"
        step={10}
        value={priceRange}
        onValueChange={(e: any) => {
          setPriceRange(e.value);
          updateParams("maxPrice", e.value[0].toString());
        }}
      />

      {/* Search Filter */}
      <Input
        placeholder="Search products..."
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          updateParams("search", e.target.value);
        }}
      />

      <HStack gap={4} my={10} align="end">
        {/* Catagory Filter */}

        <Box width={200}>
          <Text fontWeight="bold" mb={2}>
            Category
          </Text>
          <WayFarerSelect
            value={
              categoryOptions.find(
                (opt) => opt.value === currentFilters.category
              ) || null
            }
            options={categoryOptions}
            id="filter-category"
            onChange={(event: any) =>
              updateParams("category", event?.value || "")
            }
          />
        </Box>

        {/* Rating Filter */}
        <Box width={200}>
          <Text fontWeight="bold" mb={2}>
            Rating
          </Text>
          <WayFarerSelect
            value={
              filterOptions.ratings.find(
                (opt) => opt.value === currentFilters.ratings
              ) || null
            }
            options={filterOptions.ratings}
            id="filter-cratings"
            onChange={(event: any) =>
              updateParams("ratings", event?.value || "")
            }
          />
        </Box>

        {/* Sort Filter */}
        <Box width={200}>
          <Text fontWeight="bold" mb={2}>
            Sort By
          </Text>
          <WayFarerSelect
            id="filter-sortby"
            value={
              filterOptions.sort.find(
                (opt) => opt.value === currentFilters.sort
              ) || null
            }
            options={filterOptions.sort}
            onChange={(event: any) => updateParams("sort", event?.value || "")}
          />
        </Box>

        <Spacer />

        <Box>
          <Button
            aria-label="Search database"
            variant="solid"
            onClick={() => {
              resetFilters();
            }}
            colorPalette="teal"
          >
            Clear Filters
            <VscClearAll />
          </Button>
        </Box>
      </HStack>
    </VStack>
  );
};

export default FilterControls;
