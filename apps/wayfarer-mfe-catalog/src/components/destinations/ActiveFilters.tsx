import { FilterState } from "@/lib/api/apiUtils";
import { FaTimes, FaStar } from "react-icons/fa";


type ActiveFiltersProps = {
  activeFilters: FilterState;
  activeFiltersCount: number,
  updateFilter: (key: keyof FilterState, value: any) => void;
};

export default function ActiveFilters({
  activeFilters,
  activeFiltersCount,
  updateFilter,
}: ActiveFiltersProps) {

  const removeFilter = (key: keyof FilterState, value: any) => {
    updateFilter(key, value);
  }

  return (
    <>
    {activeFiltersCount > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                {activeFilters.searchTerm && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Search: {activeFilters.searchTerm}
                    <button
                      onClick={() => removeFilter('searchTerm', "")}
                      className="ml-1 text-blue-500"
                    >
                      <FaTimes className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {activeFilters.selectedRegion && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Region: {activeFilters.selectedRegion}
                    <button
                      onClick={() => removeFilter('selectedRegion', "")}
                      className="ml-1 text-green-500"
                    >
                      <FaTimes className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {activeFilters.bestTimeToVisit && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Best Time to Visit: {activeFilters.bestTimeToVisit}
                    <button
                      onClick={() => removeFilter('bestTimeToVisit', "")}
                      className="ml-1 text-green-500"
                    >
                      <FaTimes className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {activeFilters.budgetRange && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Budget: {activeFilters.budgetRange}
                    <button
                      onClick={() => removeFilter('budgetRange', "")}
                      className="ml-1 text-blue-500"
                    >
                      <FaTimes className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {activeFilters.duration && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Duration: {activeFilters.duration}
                    <button
                      onClick={() => removeFilter('budgetRange', "")}
                      className="ml-1 text-blue-500"
                    >
                      <FaTimes className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {activeFilters.showFamilyFriendly && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Family Friendly
                    <button
                      onClick={() => removeFilter('showFamilyFriendly', "")}
                      className="ml-1 text-blue-500"
                    >
                      <FaTimes className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {activeFilters.showTrending && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Trending
                    <button
                      onClick={() => removeFilter('showTrending', "")}
                      className="ml-1 text-red-500"
                    >
                      <FaTimes className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {activeFilters.selectedTags.map((tag) => (
                  <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {tag}
                    <button
                      onClick={() => removeFilter("selectedTags", '')}
                      className="ml-1 text-purple-500"
                    >
                      <FaTimes className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {activeFilters.minRating > 0 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Rating: {activeFilters.minRating}+ <FaStar className="ml-1 h-3 w-3" />
                    <button
                      onClick={() => removeFilter('minRating', 0)}
                      className="ml-1 text-yellow-600"
                    >
                      <FaTimes className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
          </>
  );
}