"use client";

import {
  Input,
  HStack,
  VStack,
  Box,
  Text,
  Spacer,
} from "@chakra-ui/react";
import {
  WayFarerSelect,
  WayFarerSlider,
  Button,
} from "@wayfarer/ui";
import { VscClearAll } from "react-icons/vsc";
import { useUpdateParams } from "./UpdateParamsProvider";
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

const FilterControls = ({ categories }: FilterControlsProps) => {
  const { updateParams, resetFilters } = useUpdateParams();

  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category.toUpperCase(),
  }));

  return (
    <VStack align="stretch" gap={4}>
      {/* Price Filter */}
      <WayFarerSlider
        defaultValue={[0, 1000]}
        label="Price"
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

      <HStack gap={4} my={10} align="end">
        {/* Catagory Filter */}

        <Box width={200}>
          <Text fontWeight="bold" mb={2}>
            Category
          </Text>
          <WayFarerSelect
            options={categoryOptions}
            id="filter-category"
            onChange={(event: any) => updateParams("category", event?.value || "")}
          />
        </Box>

        {/* Rating Filter */}
        <Box width={200}>
          <Text fontWeight="bold" mb={2}>
            Rating
          </Text>
          <WayFarerSelect
            options={filterOptions.ratings}
            id="filter-cratings"
            onChange={(event: any) => updateParams("ratings", event?.value || "")}
          />
        </Box>

        {/* Sort Filter */}
        <Box width={200}>
          <Text fontWeight="bold" mb={2}>
            Sort By
          </Text>
          <WayFarerSelect
            id="filter-sortby"
            options={filterOptions.sort}
            onChange={(event: any) => updateParams("sort", event?.value || "")}
          />
        </Box>

        <Spacer />

        <Box>
          <Button
            aria-label="Search database"
            variant="solid"
            // size={"md"}
            onClick={resetFilters}
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
