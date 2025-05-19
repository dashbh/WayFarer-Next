import { DestinationDto } from '@wayfarer/types';
import {
  FaClock,
  FaGlobe,
  FaLandmark,
  FaLanguage,
  FaDollarSign,
  FaPlane,
  FaFileAlt,
  FaShieldAlt
} from 'react-icons/fa';

interface DestinationPracticalInfoProps {
  destination: DestinationDto;
}

export default function DestinationPracticalInfo({ destination }: DestinationPracticalInfoProps) {
  return (
    <section className="mb-8 bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 bg-blue-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Practical Information</h2>
      </div>
      
      <div className="p-4 space-y-4">
        {destination.timezone && (
          <div className="flex">
            <FaClock className="text-blue-600 mr-3 mt-0.5" size={20} />
            <div>
              <h3 className="font-medium text-gray-800">Time Zone</h3>
              <p className="text-gray-600">{destination.timezone}</p>
            </div>
          </div>
        )}
        
        {destination.languages && destination.languages.length > 0 && (
          <div className="flex">
            <FaLanguage className="text-blue-600 mr-3 mt-0.5" size={20} />
            <div>
              <h3 className="font-medium text-gray-800">Languages</h3>
              <p className="text-gray-600">{destination.languages.join(', ')}</p>
            </div>
          </div>
        )}
        
        {destination.currency && (
          <div className="flex">
            <FaDollarSign className="text-blue-600 mr-3 mt-0.5" size={20} />
            <div>
              <h3 className="font-medium text-gray-800">Currency</h3>
              <p className="text-gray-600">{destination.currency}</p>
            </div>
          </div>
        )}
        
        {destination.nearestAirport && (
          <div className="flex">
            <FaPlane className="text-blue-600 mr-3 mt-0.5" size={20} />
            <div>
              <h3 className="font-medium text-gray-800">Nearest Airport</h3>
              <p className="text-gray-600">{destination.nearestAirport}</p>
            </div>
          </div>
        )}
        
        {destination.visaRequirements && (
          <div className="flex">
            <FaFileAlt className="text-blue-600 mr-3 mt-0.5" size={20} />
            <div>
              <h3 className="font-medium text-gray-800">Visa Requirements</h3>
              <p className="text-gray-600">{destination.visaRequirements}</p>
            </div>
          </div>
        )}
        
        {destination.healthAndSafety && (
          <div className="flex">
            <FaShieldAlt className="text-blue-600 mr-3 mt-0.5" size={20} />
            <div>
              <h3 className="font-medium text-gray-800">Health & Safety</h3>
              <p className="text-gray-600">{destination.healthAndSafety}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
