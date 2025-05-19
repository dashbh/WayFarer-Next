'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { DestinationDto } from '@wayfarer/types';
import { getSimilarDestinations } from '@/lib/api/destinations';

interface DestinationSimilarProps {
  similarDestinations: string[];
}

export default function DestinationSimilar({ similarDestinations }: DestinationSimilarProps) {
  const [destinations, setDestinations] = useState<DestinationDto[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSimilarDestinations = async () => {
      try {
        const data = await getSimilarDestinations(similarDestinations);
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching similar destinations:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSimilarDestinations();
  }, [similarDestinations]);
  
  if (loading) {
    return (
      <section className="mb-8 bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Similar Destinations</h2>
        </div>
        <div className="p-4 h-64 flex items-center justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  if (destinations.length === 0) {
    return null;
  }
  
  return (
    <section className="mb-8 bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Similar Destinations</h2>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {destinations.map((destination) => (
            <Link 
              key={destination.id}
              href={`/destinations/${destination.id}`}
              className="block group"
            >
              <div className="flex items-center space-x-3 p-2 rounded-lg group-hover:bg-gray-50">
                <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    // src={destination.imageUrl}
                    src={`https://picsum.photos/500?random=${destination.title}`}
                    alt={destination.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600">
                    {destination.title}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">
                    {destination.city && `${destination.city}, `}
                    {destination.country}
                  </p>
                  <div className="flex items-center mt-1">
                    <FaStar size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-medium text-gray-700 ml-1">
                      {destination.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({destination.totalRatings})
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Link 
            href="/destinations"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Explore More Destinations
          </Link>
        </div>
      </div>
    </section>
  );
}