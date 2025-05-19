// src/components/destinations/SearchFilters.tsx
import { useState, useRef, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

type SearchFiltersProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  countries: string[];
  tags: string[];
};

export default function SearchFilters({
  searchTerm,
  setSearchTerm,
  selectedCountry,
  setSelectedCountry,
  selectedTag,
  setSelectedTag,
  countries,
  tags,
}: SearchFiltersProps) {
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const tagsContainerRef = useRef<HTMLDivElement>(null);

  // Close tags dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tagsContainerRef.current &&
        !tagsContainerRef.current.contains(event.target as Node)
      ) {
        setIsTagsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCountry("");
    setSelectedTag("");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Search Input */}
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Country Filter */}
        <div>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Tags Filter with dropdown */}
        <div className="relative" ref={tagsContainerRef}>
          <button
            onClick={() => setIsTagsOpen(!isTagsOpen)}
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-left"
          >
            {selectedTag || "Select a tag"}
          </button>

          {isTagsOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-auto p-2">
              <div
                onClick={() => {
                  setSelectedTag("");
                  setIsTagsOpen(false);
                }}
                className="p-2 hover:bg-gray-100 rounded cursor-pointer text-sm"
              >
                All Tags
              </div>
              {tags.map((tag) => (
                <div
                  key={tag}
                  onClick={() => {
                    setSelectedTag(tag);
                    setIsTagsOpen(false);
                  }}
                  className={`p-2 hover:bg-gray-100 rounded cursor-pointer text-sm ${
                    selectedTag === tag ? "bg-blue-100 text-blue-800" : ""
                  }`}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Active filters and clear button */}
      {(searchTerm || selectedCountry || selectedTag) && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-500">Active filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Search: {searchTerm}
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-1 text-blue-500"
                >
                  <FaTimes className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedCountry && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Country: {selectedCountry}
                <button
                  onClick={() => setSelectedCountry("")}
                  className="ml-1 text-green-500"
                >
                  <FaTimes className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedTag && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Tag: {selectedTag}
                <button
                  onClick={() => setSelectedTag("")}
                  className="ml-1 text-purple-500"
                >
                  <FaTimes className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
