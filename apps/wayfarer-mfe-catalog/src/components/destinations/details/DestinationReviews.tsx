import { DestinationDto } from '@wayfarer/types';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface DestinationReviewsProps {
  destination: DestinationDto;
}

export default function DestinationReviews({ destination }: DestinationReviewsProps) {
  const { rating, totalRatings, reviewSummary, reviewCategories } = destination;
  
  // Helper function to render stars based on rating
  const renderStars = (score: number) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar 
          key={`star-${i}`} 
          className="text-yellow-500 fill-yellow-500" 
          size={16} 
        />
      );
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt 
          key="half-star" 
          className="text-yellow-500 fill-yellow-500" 
          size={16} 
        />
      );
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaStar 
          key={`empty-star-${i}`} 
          className="text-gray-300" 
          size={16} 
        />
      );
    }
    
    return stars;
  };
  
  // Calculate the percentage for progress bars
  const calculatePercentage = (score: number | undefined) => {
    if (!score) return 0;
    return (score / 5) * 100;
  };
  
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Overall Rating */}
          <div className="md:w-1/3 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-gray-800 mb-2">{rating.toFixed(1)}</div>
            <div className="flex items-center mb-1">
              {renderStars(rating)}
            </div>
            <div className="text-sm text-gray-500">Based on {totalRatings} reviews</div>
          </div>
          
          {/* Review Categories */}
          {reviewCategories && (
            <div className="md:w-2/3">
              {reviewSummary && (
                <p className="text-gray-700 mb-4">{reviewSummary}</p>
              )}
              
              <div className="space-y-3">
                {reviewCategories.cleanliness !== undefined && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700">Cleanliness</span>
                      <span className="text-sm font-medium text-gray-700">{reviewCategories.cleanliness.toFixed(1)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${calculatePercentage(reviewCategories.cleanliness)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {reviewCategories.safety !== undefined && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700">Safety</span>
                      <span className="text-sm font-medium text-gray-700">{reviewCategories.safety.toFixed(1)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${calculatePercentage(reviewCategories.safety)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {reviewCategories.valueForMoney !== undefined && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700">Value for Money</span>
                      <span className="text-sm font-medium text-gray-700">{reviewCategories.valueForMoney.toFixed(1)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${calculatePercentage(reviewCategories.valueForMoney)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {reviewCategories.familyFriendly !== undefined && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700">Family Friendly</span>
                      <span className="text-sm font-medium text-gray-700">{reviewCategories.familyFriendly.toFixed(1)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-600 h-2 rounded-full" 
                        style={{ width: `${calculatePercentage(reviewCategories.familyFriendly)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {reviewCategories.localExperience !== undefined && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700">Local Experience</span>
                      <span className="text-sm font-medium text-gray-700">{reviewCategories.localExperience.toFixed(1)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full" 
                        style={{ width: `${calculatePercentage(reviewCategories.localExperience)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">
            Read All Reviews
          </button>
        </div>
      </div>
    </section>
  );
}
