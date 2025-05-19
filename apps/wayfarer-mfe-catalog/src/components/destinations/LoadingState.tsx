export default function LoadingState() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          {/* Image placeholder */}
          <div className="h-48 w-full bg-gray-300"></div>
          
          <div className="p-4">
            {/* Title placeholder */}
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            
            {/* Location placeholder */}
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
            
            {/* Rating placeholder */}
            <div className="flex mb-3">
              {[...Array(5)].map((_, starIndex) => (
                <div key={starIndex} className="h-5 w-5 rounded-full bg-gray-200 mr-1"></div>
              ))}
            </div>
            
            {/* Description placeholder */}
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            
            {/* Info lines placeholders */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            
            {/* Tags placeholder */}
            <div className="flex flex-wrap gap-1 mb-4">
              <div className="h-5 w-16 bg-gray-200 rounded"></div>
              <div className="h-5 w-16 bg-gray-200 rounded"></div>
              <div className="h-5 w-16 bg-gray-200 rounded"></div>
            </div>
            
            {/* Button placeholder */}
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
