import { PointOfInterest } from '@wayfarer/types';
import { FaClock, FaDollarSign, FaMap } from 'react-icons/fa';

interface DestinationAttractionsProps {
  landmarks: PointOfInterest[];
}

export default function DestinationAttractions({ landmarks }: DestinationAttractionsProps) {
  // Format currency
  const formatCurrency = (priceRange?: { min: number; max: number; currency: string }) => {
    if (!priceRange) return 'Free';
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: priceRange.currency,
      maximumFractionDigits: 0,
    });
    
    if (priceRange.min === 0 && priceRange.max === 0) return 'Free';
    if (priceRange.min === priceRange.max) return formatter.format(priceRange.min);
    return `${formatter.format(priceRange.min)} - ${formatter.format(priceRange.max)}`;
  };
  
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Top Attractions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {landmarks.map((landmark) => (
          <div 
            key={landmark.id} 
            className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col"
          >
            {landmark.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img 
                  // src={landmark.imageUrl} 
                  src={`https://picsum.photos/500?random=${landmark.name}`}
                  alt={landmark.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-4 flex-1">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{landmark.name}</h3>
              
              {landmark.description && (
                <p className="text-gray-600 mb-4 line-clamp-2">{landmark.description}</p>
              )}
              
              <div className="space-y-2 mt-auto">
                {landmark.distanceFromDestination !== undefined && (
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMap size={16} className="mr-2" />
                    <span>{landmark.distanceFromDestination} km from center</span>
                  </div>
                )}
                
                {landmark.visitDuration !== undefined && (
                  <div className="flex items-center text-sm text-gray-600">
                    <FaClock size={16} className="mr-2" />
                    <span>
                      {landmark.visitDuration < 1 
                        ? `${Math.round(landmark.visitDuration * 60)} minutes` 
                        : `${landmark.visitDuration} ${landmark.visitDuration === 1 ? 'hour' : 'hours'}`}
                    </span>
                  </div>
                )}
                
                {landmark.entryFee && (
                  <div className="flex items-center text-sm text-gray-600">
                    <FaDollarSign size={16} className="mr-2" />
                    <span>Entry fee: {formatCurrency(landmark.entryFee)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {landmarks.length > 4 && (
        <div className="mt-6 flex justify-center">
          <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium">
            View All Attractions
          </button>
        </div>
      )}
    </section>
  );
}
