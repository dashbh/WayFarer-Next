import { Activity } from '@wayfarer/types';
import { FaClock, FaDollarSign, FaUsers } from 'react-icons/fa';

interface DestinationActivitiesProps {
  activities: Activity[];
}

export default function DestinationActivities({ activities }: DestinationActivitiesProps) {
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
  
  // Get category color class
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Adventure': 'bg-red-100 text-red-800',
      'Cultural': 'bg-purple-100 text-purple-800',
      'Nature': 'bg-green-100 text-green-800',
      'Food': 'bg-yellow-100 text-yellow-800',
      'Relaxation': 'bg-blue-100 text-blue-800',
      'Historical': 'bg-amber-100 text-amber-800',
      'Shopping': 'bg-pink-100 text-pink-800',
      'Nightlife': 'bg-indigo-100 text-indigo-800',
    };
    
    return colors[category] || 'bg-gray-100 text-gray-800';
  };
  
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Popular Activities</h2>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col md:flex-row"
          >
            {activity.imageUrl && (
              <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                <img 
                  // src={activity.imageUrl} 
                  src={`https://picsum.photos/500?random=${activity.name}`}
                  alt={activity.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-4 md:w-2/3">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg text-gray-800">{activity.name}</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs ${getCategoryColor(activity.category)}`}>
                  {activity.category}
                </span>
              </div>
              
              {activity.description && (
                <p className="text-gray-600 mb-4">{activity.description}</p>
              )}
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
                {activity.durationHours !== undefined && (
                  <div className="flex items-center text-sm text-gray-600">
                    <FaClock size={16} className="mr-2" />
                    <span>
                      {activity.durationHours < 1 
                        ? `${Math.round(activity.durationHours * 60)} minutes` 
                        : `${activity.durationHours} ${activity.durationHours === 1 ? 'hour' : 'hours'}`}
                    </span>
                  </div>
                )}
                
                {activity.priceRange && (
                  <div className="flex items-center text-sm text-gray-600">
                    <FaDollarSign size={16} className="mr-2" />
                    <span>{formatCurrency(activity.priceRange)}</span>
                  </div>
                )}
                
                {activity.recommendedFor && activity.recommendedFor.length > 0 && (
                  <div className="flex items-center text-sm text-gray-600">
                    <FaUsers size={16} className="mr-2" />
                    <span>{activity.recommendedFor.slice(0, 2).join(', ')}{activity.recommendedFor.length > 2 ? '...' : ''}</span>
                  </div>
                )}
              </div>
              
              {activity.availability?.seasonalAvailability && (
                <div className="mt-3 text-sm text-gray-600">
                  <span className="font-medium">Available: </span>
                  {activity.availability.seasonalAvailability.join(', ')}
                </div>
              )}
              
              <div className="mt-4 flex justify-between items-center">
                {activity.bookingUrl && (
                  <a 
                    href={activity.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm"
                  >
                    Book Now
                  </a>
                )}
                
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {activities.length > 3 && (
        <div className="mt-6 flex justify-center">
          <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium">
            View All Activities
          </button>
        </div>
      )}
    </section>
  );
}
