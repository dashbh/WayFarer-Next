import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
};

export default function Pagination({ currentPage, totalPages, handlePageChange }: PaginationProps) {
  // Don't render pagination if only one page
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    // Logic for showing limited page numbers with ellipsis
    if (totalPages <= maxPagesToShow) {
      // If total pages is less than max pages to show, render all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Calculate range around current page
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if at edges
      if (currentPage <= 2) {
        endPage = 3;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
      }

      // Add ellipsis before middle pages if needed
      if (startPage > 2) {
        pageNumbers.push("ellipsis-start");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis after middle pages if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("ellipsis-end");
      }

      // Always include last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center space-x-1 mt-12">
      {/* Previous button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-md focus:outline-none ${
          currentPage === 1
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        aria-label="Previous page"
      >
        <FaChevronLeft className="h-5 w-5" />
      </button>

      {/* Page numbers */}
      {renderPageNumbers().map((pageNumber, index) => {
        if (pageNumber === "ellipsis-start" || pageNumber === "ellipsis-end") {
          return (
            <span key={`${pageNumber}-${index}`} className="px-3 py-1 text-gray-500">
              ...
            </span>
          );
        }

        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber as number)}
            className={`px-3 py-1 rounded-md focus:outline-none ${
              currentPage === pageNumber
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md focus:outline-none ${
          currentPage === totalPages
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        aria-label="Next page"
      >
        <FaChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
