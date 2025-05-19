import { DestinationDto } from '@wayfarer/types';
import { FaStar } from 'react-icons/fa';

interface DestinationHeaderProps {
  destination: DestinationDto;
}

export default function DestinationHeader({ destination }: DestinationHeaderProps) {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
            <FaStar size={16} className="mr-1" />
            <span className="font-medium">{destination.rating.toFixed(1)}</span>
            <span className="text-sm text-gray-600 ml-1">({destination.totalRatings} reviews)</span>
          </div>
          
          {destination.isTrending && (
            <span className="ml-3 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              Trending
            </span>
          )}
        </div>
        
        <button className="flex items-center text-gray-600 hover:text-red-500">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-6 w-6 ${destination.isFavorite ? 'text-red-500 fill-red-500' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
          <span className="ml-1">Save</span>
        </button>
      </div>
      
      {destination.tags && destination.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {destination.tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="prose max-w-none">
        <p className="text-lg text-gray-700 mb-4">
          {destination.description || destination.aiGeneratedSummary || ''}
        </p>
      </div>
    </section>
  );
}