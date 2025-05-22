import { defaultFilterState, FilterState } from "@/lib/api/apiUtils";
import { useState, useRef, useEffect } from "react";
import {
  FaSearch,
  FaTimes,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import ActiveFilters from "./ActiveFilters";

type SearchFiltersProps = {
  filters: FilterState;
  regions: string[];
  tags: string[];
  onApplyFilters: (filters: FilterState) => void;
};

export default function SearchFilters({
  filters: activeFilters,
  regions,
  tags,
  onApplyFilters,
}: SearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [draftFilters, setDraftFilters] =
    useState<FilterState>(defaultFilterState);
  const [isBestTimeOpen, setIsBestTimeOpen] = useState(false);
  const tagsContainerRef = useRef<HTMLDivElement>(null);
  const timeContainerRef = useRef<HTMLDivElement>(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tagsContainerRef.current &&
        !tagsContainerRef.current.contains(event.target as Node)
      ) {
        setIsTagsOpen(false);
      }
      if (
        timeContainerRef.current &&
        !timeContainerRef.current.contains(event.target as Node)
      ) {
        setIsBestTimeOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update individual filter
  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...activeFilters, [key]: value };
    setDraftFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onApplyFilters(draftFilters);
  }

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    const currentTags = draftFilters.selectedTags;
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];
    updateFilter("selectedTags", newTags);
  };

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters: FilterState = { ...defaultFilterState };
    setDraftFilters(clearedFilters);
    onApplyFilters(clearedFilters);
  };

  // Count active filters
  const getActiveFiltersCount = () => {
    let count = 0;
    if (draftFilters.searchTerm) count++;
    if (draftFilters.selectedRegion) count++;
    if (draftFilters.selectedTags.length > 0) count++;
    if (draftFilters.minRating > 0) count++;
    if (draftFilters.budgetRange !== "") count++;
    if (draftFilters.bestTimeToVisit) count++;
    if (draftFilters.duration !== "") count++;
    if (draftFilters.showTrending) count++;
    if (draftFilters.showFamilyFriendly) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
      {/* Header with Search and Filter Toggle */}
      <div className="p-4">
        <div className="flex gap-4 items-center">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search destinations..."
              value={draftFilters.searchTerm}
              onChange={(e) => updateFilter("searchTerm", e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            {draftFilters.searchTerm && (
              <button
                onClick={() => updateFilter("searchTerm", "")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border"
          >
            <FaFilter className="h-4 w-4" />
            <span className="text-sm font-medium">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
            {isExpanded ? (
              <FaChevronUp className="h-4 w-4" />
            ) : (
              <FaChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Expandable Filters Section */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Region
              </label>
              <select
                value={draftFilters.selectedRegion}
                onChange={(e) => updateFilter("selectedRegion", e.target.value)}
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">All Regions</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Rating
              </label>
              <div className="relative">
                <select
                  value={draftFilters.minRating}
                  onChange={(e) =>
                    updateFilter("minRating", Number(e.target.value))
                  }
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value={0}>Any Rating</option>
                  <option value={3}>3+ Stars</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                </select>
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget Range
              </label>
              <select
                value={draftFilters.budgetRange}
                onChange={(e) => updateFilter("budgetRange", e.target.value)}
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">All Budgets</option>
                <option value="budget">Budget (Under ₹3,000/day)</option>
                <option value="mid-range">Mid-range (₹3,000-₹7,000/day)</option>
                <option value="luxury">Luxury (Above ₹7,000/day)</option>
              </select>
            </div>

            {/* Tags Filter */}
            <div className="relative" ref={tagsContainerRef}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <button
                onClick={() => setIsTagsOpen(!isTagsOpen)}
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-left"
              >
                {draftFilters.selectedTags.length > 0
                  ? `${draftFilters.selectedTags.length} tags selected`
                  : "Select tags"}
              </button>

              {isTagsOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-auto border">
                  {tags.map((tag) => (
                    <label
                      key={tag}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={draftFilters.selectedTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">{tag}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Best Time to Visit */}
            <div className="relative" ref={timeContainerRef}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Best Time to Visit
              </label>
              <button
                onClick={() => setIsBestTimeOpen(!isBestTimeOpen)}
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-left"
              >
                {draftFilters.bestTimeToVisit || "Any month"}
              </button>

              {isBestTimeOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-auto border">
                  <div
                    onClick={() => {
                      updateFilter("bestTimeToVisit", "");
                      setIsBestTimeOpen(false);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    Any month
                  </div>
                  {months.map((month) => (
                    <div
                      key={month}
                      onClick={() => {
                        updateFilter("bestTimeToVisit", month);
                        setIsBestTimeOpen(false);
                      }}
                      className={`p-2 hover:bg-gray-100 cursor-pointer text-sm ${
                        draftFilters.bestTimeToVisit === month
                          ? "bg-blue-100 text-blue-800"
                          : ""
                      }`}
                    >
                      {month}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Duration Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trip Duration
              </label>
              <select
                value={draftFilters.duration}
                onChange={(e) => updateFilter("duration", e.target.value)}
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">Any Duration</option>
                <option value="weekend">Weekend (1-3 days)</option>
                <option value="week">Week (4-7 days)</option>
                <option value="extended">Extended (8+ days)</option>
              </select>
            </div>
          </div>

          {/* Checkboxes Row */}
          <div className="flex flex-wrap gap-4 mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={draftFilters.showTrending}
                onChange={(e) => updateFilter("showTrending", e.target.checked)}
                className="mr-2 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">Trending destinations only</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={draftFilters.showFamilyFriendly}
                onChange={(e) =>
                  updateFilter("showFamilyFriendly", e.target.checked)
                }
                className="mr-2 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">Family-friendly (4+ rating)</span>
            </label>
          </div>

          {/* Sorting Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort by
              </label>
              <select
                value={draftFilters.sortBy}
                onChange={(e) => updateFilter("sortBy", e.target.value)}
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="rating">Rating</option>
                <option value="price">Price</option>
                <option value="alphabetical">Name (A-Z)</option>
                <option value="trending">Trending</option>
                <option value="recent">Recently Added</option>
                <option value="reviews">Total Reviews</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order
              </label>
              <select
                value={draftFilters.sortOrder}
                onChange={(e) => updateFilter("sortOrder", e.target.value)}
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="desc">
                  {draftFilters.sortBy === "alphabetical"
                    ? "Z to A"
                    : draftFilters.sortBy === "price"
                      ? "High to Low"
                      : "High to Low"}
                </option>
                <option value="asc">
                  {draftFilters.sortBy === "alphabetical"
                    ? "A to Z"
                    : draftFilters.sortBy === "price"
                      ? "Low to High"
                      : "Low to High"}
                </option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <button
              onClick={clearFilters}
              className="text-sm text-red-600 cursor-pointer hover:text-red-800 font-medium"
            >
              Clear all filters
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Apply Filters
            </button>
          </div>

          {/* Active Filters Display */}
          <ActiveFilters
            activeFilters={draftFilters}
            activeFiltersCount={activeFiltersCount}
            updateFilter={updateFilter}
          />
        </div>
      )}
    </div>
  );
}
