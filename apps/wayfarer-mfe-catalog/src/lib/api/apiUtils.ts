// src/utils/apiUtils.ts

export type FilterState = {
  searchTerm: string;
  selectedRegion: string;
  selectedTags: string[];
  minRating: number;
  budgetRange: "" | "budget" | "mid-range" | "luxury";
  bestTimeToVisit: string;
  duration: "" | "weekend" | "week" | "extended";
  showTrending: boolean;
  showFamilyFriendly: boolean;
  sortBy:
    | "rating"
    | "price"
    | "alphabetical"
    | "trending"
    | "recent"
    | "reviews";
  sortOrder: "asc" | "desc";
};

export type PaginationParams = {
  page: number;
  limit: number;
};

export type APIFilter = {
  field: string;
  value: string | number | boolean;
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "in";
};

export type APISort = {
  field: string;
  order: "asc" | "desc";
};

/**
 * Builds API query parameters from filter state and pagination
 */
export function buildAPIQuery(
  filters: FilterState,
  pagination: PaginationParams
): URLSearchParams {
  const params = new URLSearchParams();

  // Add pagination
  params.append("page", pagination.page.toString());
  params.append("limit", pagination.limit.toString());

  // Add search term
  if (filters.searchTerm) {
    params.append("search", filters.searchTerm);
  }

  // Build filters array
  const apiFilters: APIFilter[] = [];
  let filterIndex = 0;

  // Region filter
  if (filters.selectedRegion) {
    apiFilters.push({
      field: "region",
      value: filters.selectedRegion,
      operator: "eq",
    });
  }

  // Tags filter (multiple tags with OR logic)
  if (filters.selectedTags.length > 0) {
    apiFilters.push({
      field: "tags",
      value: filters.selectedTags.join(","),
      operator: "in",
    });
  }

  // Rating filter
  if (filters.minRating > 0) {
    apiFilters.push({
      field: "rating",
      value: filters.minRating,
      operator: "gte",
    });
  }

  // Budget range filter
  if (filters.budgetRange !== "") {
    let minBudget = 0;
    let maxBudget = 999999;

    switch (filters.budgetRange) {
      case "budget":
        maxBudget = 3000;
        break;
      case "mid-range":
        minBudget = 3000;
        maxBudget = 7000;
        break;
      case "luxury":
        minBudget = 7000;
        break;
    }

    if (minBudget > 0) {
      apiFilters.push({
        field: "averageDailyCost",
        value: minBudget,
        operator: "gte",
      });
    }

    if (maxBudget < 999999) {
      apiFilters.push({
        field: "averageDailyCost",
        value: maxBudget,
        operator: "lte",
      });
    }
  }

  // Best time to visit filter
  if (filters.bestTimeToVisit) {
    apiFilters.push({
      field: "bestTimeToVisit",
      value: filters.bestTimeToVisit,
      operator: "in",
    });
  }

  // Duration filter
  if (filters.duration !== "") {
    let minDays = 1;
    let maxDays = 365;

    switch (filters.duration) {
      case "weekend":
        maxDays = 3;
        break;
      case "week":
        minDays = 4;
        maxDays = 7;
        break;
      case "extended":
        minDays = 8;
        break;
    }

    // Filter by suggestedDuration.min and suggestedDuration.max
    if (minDays > 1) {
      apiFilters.push({
        field: "suggestedDuration.min",
        value: minDays,
        operator: "gte",
      });
    }

    if (maxDays < 365) {
      apiFilters.push({
        field: "suggestedDuration.max",
        value: maxDays,
        operator: "lte",
      });
    }
  }

  // Trending filter
  if (filters.showTrending) {
    apiFilters.push({
      field: "isTrending",
      value: true,
      operator: "eq",
    });
  }

  // Family friendly filter (based on familyFriendly rating >= 4)
  if (filters.showFamilyFriendly) {
    apiFilters.push({
      field: "reviewCategories.familyFriendly",
      value: 4,
      operator: "gte",
    });
  }

  // Add filters to params
  apiFilters.forEach((filter, index) => {
    params.append(`filters[${index}][field]`, filter.field);
    params.append(`filters[${index}][value]`, filter.value.toString());
    params.append(`filters[${index}][operator]`, filter.operator);
  });

  // Add sorting
  const sortField = getSortField(filters.sortBy);
  if (sortField) {
    params.append("sort[0][field]", sortField);
    params.append("sort[0][order]", filters.sortOrder);
  }

  return params;
}

/**
 * Maps frontend sort options to API field names
 */
function getSortField(sortBy: FilterState["sortBy"]): string {
  switch (sortBy) {
    case "rating":
      return "rating";
    case "price":
      return "averageDailyCost";
    case "alphabetical":
      return "title";
    case "trending":
      return "isTrending";
    case "recent":
      return "createdAt";
    case "reviews":
      return "totalRatings";
    default:
      return "rating";
  }
}

/**
 * Extract unique values from destination array for filter options
 */
export function extractFilterOptions(destinations: any[]) {
  const regions = new Set<string>();
  const tags = new Set<string>();

  destinations.forEach((dest) => {
    if (dest.region) regions.add(dest.region);
    if (dest.tags && Array.isArray(dest.tags)) {
      dest.tags.forEach((tag: string) => tags.add(tag));
    }
  });

  return {
    regions: Array.from(regions).sort(),
    tags: Array.from(tags).sort(),
  };
}

/**
 * Default filter state
 */
export const defaultFilterState: FilterState = {
  searchTerm: "",
  selectedRegion: "",
  selectedTags: [],
  minRating: 0,
  budgetRange: "",
  bestTimeToVisit: "",
  duration: "",
  showTrending: false,
  showFamilyFriendly: false,
  sortBy: "rating",
  sortOrder: "desc",
};
