"use client";

import { useState, useEffect, useCallback } from "react";
import { DestinationDto } from "@wayfarer/types";
import DestinationCard from "@/components/destinations/DestinationCard";
import SearchFilters from "@/components/destinations/SearchFilters";
import Pagination from "@/components/destinations/Pagination";
import LoadingState from "@/components/destinations/LoadingState";
import { 
  buildAPIQuery, 
  extractFilterOptions, 
  defaultFilterState,
  type FilterState 
} from "@/lib/api/apiUtils";

const API_URL = `${process.env.NEXT_PUBLIC_WAYFARER_API_URL}/api/catalog`;
const itemsPerPage = 8;

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<DestinationDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  // Filter state
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);
  const [regions, setRegions] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  
  // Debounced search to avoid too many API calls
  const [searchDebounceTimer, setSearchDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // Fetch destinations from API with server-side pagination/filtering
  const fetchDestinations = useCallback(async (filtersToApply: FilterState, page: number = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const queryParams = buildAPIQuery(filtersToApply, {
        page,
        limit: itemsPerPage
      });
      
      console.log('API Query:', queryParams.toString()); // Debug log
      
      const response = await fetch(
        `${API_URL}/destinations?${queryParams.toString()}`
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      setDestinations(data.items || []);
      setTotalItems(data.total || 0);
      setTotalPages(Math.ceil((data.total || 0) / itemsPerPage));
      
      // Update filter options if provided by API
      if (data.regions) setRegions(data.regions);
      if (data.tags) setTags(data.tags);
      
      // If no filter options from API, extract from current data
      if (!data.regions || !data.tags) {
        const options = extractFilterOptions(data.items || []);
        if (!data.regions) setRegions(options.regions);
        if (!data.tags) setTags(options.tags);
      }
      
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setDestinations([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchDestinations(filters, 1);
    setCurrentPage(1);
  }, []);

  // Handle search term changes with debouncing
  useEffect(() => {
    // Clear existing timer
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer);
    }

    // Set new timer for search
    const timer = setTimeout(() => {
      if (filters.searchTerm !== undefined) {
        fetchDestinations(filters, 1);
        setCurrentPage(1);
      }
    }, 500); // 500ms debounce

    setSearchDebounceTimer(timer);

    // Cleanup
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [filters.searchTerm, fetchDestinations]);

  // Handle filter changes (immediate for non-search filters)
  const handleApplyFilters = useCallback((newFilters: FilterState) => {
    // If only search term changed, let the debounce handle it
    const filtersWithoutSearch = { ...newFilters, searchTerm: '' };
    const currentFiltersWithoutSearch = { ...filters, searchTerm: '' };
    
    if (JSON.stringify(filtersWithoutSearch) !== JSON.stringify(currentFiltersWithoutSearch)) {
      // Non-search filters changed, fetch immediately
      fetchDestinations(newFilters, 1);
      setCurrentPage(1);
      setFilters(newFilters);
    }
  }, [filters, fetchDestinations]);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchDestinations(filters, pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate display range for results
  const getResultsRange = () => {
    if (totalItems === 0) return { start: 0, end: 0 };
    
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);
    
    return { start, end };
  };

  const { start, end } = getResultsRange();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Explore Amazing Destinations
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover your next adventure from our curated collection of
            breathtaking places around the world.
          </p>
        </div>

        <SearchFilters
          filters={filters}
          regions={regions}
          tags={tags}
          onApplyFilters={handleApplyFilters}
        />

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-red-600 text-lg font-medium mb-2">
              {error}
            </div>
            <button
              onClick={() => fetchDestinations(filters, currentPage)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.09M12 3a9 9 0 100 18 9 9 0 000-18z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-gray-900 mb-2">
              No destinations found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your filters or search term to find more destinations.
            </p>
            <button
              onClick={() => {
                setFilters(defaultFilterState);
                fetchDestinations(defaultFilterState, 1);
                setCurrentPage(1);
              }}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            {/* Results info */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-500">
                Showing {start.toLocaleString()}-{end.toLocaleString()} of{" "}
                {totalItems.toLocaleString()} destinations
              </p>
              <div className="text-sm text-gray-500">
                Sorted by{" "}
                <span className="font-medium">
                  {filters.sortBy === 'alphabetical' ? 'Name' : 
                   filters.sortBy === 'price' ? 'Price' :
                   filters.sortBy === 'recent' ? 'Recently Added' :
                   filters.sortBy === 'reviews' ? 'Total Reviews' :
                   filters.sortBy.charAt(0).toUpperCase() + filters.sortBy.slice(1)}
                </span>
                {" "}
                ({filters.sortOrder === 'desc' ? 
                  (filters.sortBy === 'alphabetical' ? 'Z-A' : 'High to Low') : 
                  (filters.sortBy === 'alphabetical' ? 'A-Z' : 'Low to High')
                })
              </div>
            </div>

            {/* Destinations grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {destinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}