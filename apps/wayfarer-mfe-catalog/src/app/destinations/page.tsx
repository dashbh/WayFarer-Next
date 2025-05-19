"use client";

import { useState, useEffect } from "react";
import { DestinationDto } from "@wayfarer/types";
import DestinationCard from "@/components/destinations/DestinationCard";
import SearchFilters from "@/components/destinations/SearchFilters";
import Pagination from "@/components/destinations/Pagination";
import LoadingState from "@/components/destinations/LoadingState";

const API_URL = `${process.env.NEXT_PUBLIC_WAYFARER_API_URL}/api/catalog`;

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<DestinationDto[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<
    DestinationDto[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const itemsPerPage = 9;

  useEffect(() => {
    const fetchDestinations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/destinations`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setDestinations(data.destinations);
        setFilteredDestinations(data.destinations);
        setTotalPages(Math.ceil(data.destinations.length / itemsPerPage));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Apply filters when search terms or filters change
  useEffect(() => {
    let results = [...destinations];

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      results = results.filter(
        (dest) =>
          dest.title.toLowerCase().includes(search) ||
          dest.description?.toLowerCase().includes(search) ||
          dest.country.toLowerCase().includes(search)
      );
    }

    if (selectedCountry) {
      results = results.filter((dest) => dest.country === selectedCountry);
    }

    if (selectedTag) {
      results = results.filter((dest) => dest.tags?.includes(selectedTag));
    }

    setFilteredDestinations(results);
    setTotalPages(Math.ceil(results.length / itemsPerPage));
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCountry, selectedTag, destinations]);

  // Get all unique countries from the destinations
  const countries = [
    ...new Set(destinations.map((dest) => dest.country)),
  ].sort();

  // Get all unique tags from the destinations
  const allTags = destinations.flatMap((dest) => dest.tags || []);
  const tags = [...new Set(allTags)].sort();

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDestinations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-red-600 sm:text-4xl">
              Error Loading Destinations
            </h1>
            <p className="mt-3 text-xl text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          countries={countries}
          tags={tags}
        />

        {isLoading ? (
          <LoadingState />
        ) : (
          <>
            {filteredDestinations.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-medium text-gray-900">
                  No destinations found
                </h3>
                <p className="mt-2 text-gray-500">
                  Try adjusting your filters or search term
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-6">
                  Showing {indexOfFirstItem + 1}-
                  {Math.min(indexOfLastItem, filteredDestinations.length)} of{" "}
                  {filteredDestinations.length} destinations
                </p>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {currentItems.map((destination) => (
                    <DestinationCard
                      key={destination.id}
                      destination={destination}
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
