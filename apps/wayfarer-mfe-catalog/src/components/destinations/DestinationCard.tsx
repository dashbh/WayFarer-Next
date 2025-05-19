import Image from "next/image";
import Link from "next/link";

import { DestinationDto } from "@wayfarer/types";
import {
  FaStar, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaDollarSign, 
  FaTags 
} from "react-icons/fa";

type DestinationCardProps = {
  destination: DestinationDto;
};

export default function DestinationCard({ destination }: DestinationCardProps) {
  // Format budget range for display
  const formatBudget = (min: number, max: number, currency: string) => {
    return `${currency} ${min}-${max}`;
  };

  // Calculate rating stars
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} className="h-5 w-5 text-yellow-400 inline-block" fill="currentColor" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative inline-block h-5 w-5">
          <FaStar className="h-5 w-5 text-gray-300 absolute" fill="currentColor" />
          <div className="h-5 w-2.5 overflow-hidden absolute">
            <FaStar className="h-5 w-5 text-yellow-400" fill="currentColor" />
          </div>
        </div>
      );
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaStar key={`empty-${i}`} className="h-5 w-5 text-gray-300 inline-block" fill="currentColor" />
      );
    }
    
    return stars;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
        //   src={destination.imageUrl || "/placeholder-destination.jpg"}
          src={`https://picsum.photos/500?random=${destination.title}`}
          alt={destination.title}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {destination.isTrending && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
            Trending
          </span>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{destination.title}</h3>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-900 mr-1">{destination.rating.toFixed(1)}</span>
            <FaStar className="h-5 w-5 text-yellow-400" fill="currentColor" />
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <FaMapMarkerAlt className="h-4 w-4 mr-1" />
          <span className="text-sm">
            {[destination.city, destination.region, destination.country].filter(Boolean).join(", ")}
          </span>
        </div>
        
        <div className="mb-3">
          <div className="flex mb-1">{renderRatingStars(destination.rating)}</div>
          <span className="text-xs text-gray-500">({destination.totalRatings} reviews)</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {destination.description || destination.aiGeneratedSummary || "No description available."}
        </p>
        
        <div className="space-y-2 mb-4">
          {destination.bestTimeToVisit && destination.bestTimeToVisit.length > 0 && (
            <div className="flex items-center text-sm text-gray-600">
              <FaCalendarAlt className="h-4 w-4 mr-2" />
              <span>Best time: {destination.bestTimeToVisit.join(", ")}</span>
            </div>
          )}
          
          {destination.suggestedBudget?.budget && (
            <div className="flex items-center text-sm text-gray-600">
              <FaDollarSign className="h-4 w-4 mr-2" />
              <span>
                Budget: {formatBudget(
                  destination.suggestedBudget.budget.min,
                  destination.suggestedBudget.budget.max,
                  destination.suggestedBudget.budget.currency
                )}
              </span>
            </div>
          )}
          
          {destination.suggestedDuration && (
            <div className="flex items-center text-sm text-gray-600">
              <FaTags className="h-4 w-4 mr-2" />
              <span>
                Stay: {destination.suggestedDuration.min}-{destination.suggestedDuration.max} days
              </span>
            </div>
          )}
        </div>
        
        {destination.tags && destination.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {destination.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
              >
                <FaTags className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
            {destination.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                +{destination.tags.length - 3} more
              </span>
            )}
          </div>
        )}
        
        <Link href={`/destinations/${destination.id}`}>
          <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
