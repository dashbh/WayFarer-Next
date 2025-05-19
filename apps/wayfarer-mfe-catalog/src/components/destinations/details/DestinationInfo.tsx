import { DestinationDto } from "@wayfarer/types";
import { FaClock, FaCalendar, FaDollarSign, FaRegBell } from "react-icons/fa";

interface DestinationInfoProps {
  destination: DestinationDto;
}

export default function DestinationInfo({ destination }: DestinationInfoProps) {
  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Essential Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* When to Visit */}
        {destination.bestTimeToVisit &&
          destination.bestTimeToVisit.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <FaCalendar className="text-blue-600 mt-1 mr-3" size={20} />
                <div>
                  <h3 className="font-medium text-blue-800">
                    Best Time to Visit
                  </h3>
                  <p className="text-blue-800">
                    {destination.bestTimeToVisit.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          )}

        {/* Suggested Duration */}
        {destination.suggestedDuration && (
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-start">
              <FaClock className="text-indigo-600 mt-1 mr-3" size={20} />
              <div>
                <h3 className="font-medium text-indigo-800">
                  Recommended Stay
                </h3>
                <p className="text-indigo-800">
                  {destination.suggestedDuration.min ===
                  destination.suggestedDuration.max
                    ? `${destination.suggestedDuration.min} days`
                    : `${destination.suggestedDuration.min}-${destination.suggestedDuration.max} days`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Budget */}
        {destination.suggestedBudget && (
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-start">
              <FaDollarSign className="text-green-600 mt-1 mr-3" size={20} />
              <div>
                <h3 className="font-medium text-green-800">Budget Per Day</h3>
                <ul className="text-green-800 space-y-1">
                  <li>
                    <span className="font-medium">Budget:</span>{" "}
                    {formatCurrency(
                      destination.suggestedBudget.budget.min,
                      destination.suggestedBudget.budget.currency
                    )}{" "}
                    -{" "}
                    {formatCurrency(
                      destination.suggestedBudget.budget.max,
                      destination.suggestedBudget.budget.currency
                    )}
                  </li>
                  <li>
                    <span className="font-medium">Mid-Range:</span>{" "}
                    {formatCurrency(
                      destination.suggestedBudget.midRange.min,
                      destination.suggestedBudget.midRange.currency
                    )}{" "}
                    -{" "}
                    {formatCurrency(
                      destination.suggestedBudget.midRange.max,
                      destination.suggestedBudget.midRange.currency
                    )}
                  </li>
                  <li>
                    <span className="font-medium">Luxury:</span>{" "}
                    {formatCurrency(
                      destination.suggestedBudget.luxury.min,
                      destination.suggestedBudget.luxury.currency
                    )}{" "}
                    -{" "}
                    {formatCurrency(
                      destination.suggestedBudget.luxury.max,
                      destination.suggestedBudget.luxury.currency
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Travel Tips */}
        {destination.travelTips && destination.travelTips.length > 0 && (
          <div className="bg-amber-50 p-4 rounded-lg">
            <div className="flex items-start">
              <FaRegBell className="text-amber-600 mt-1 mr-3" size={20} />
              <div>
                <h3 className="font-medium text-amber-800">Travel Tips</h3>
                <ul className="text-amber-800 list-disc list-inside space-y-1">
                  {destination.travelTips
                    .slice(0, 3)
                    .map((tip: string, index: number) => (
                      <li key={index}>{tip}</li>
                    ))}
                  {destination.travelTips.length > 3 && (
                    <li className="list-none">
                      <button className="text-amber-700 font-medium hover:underline">
                        +{destination.travelTips.length - 3} more tips
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Popular Attractions */}
      {destination.popularAttractions &&
        destination.popularAttractions.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium text-gray-800 mb-2">
              Popular Attractions
            </h3>
            <div className="flex flex-wrap gap-2">
              {destination.popularAttractions.map(
                (attraction: any, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {attraction}
                  </span>
                )
              )}
            </div>
          </div>
        )}

      {/* Recommended Itinerary */}
      {destination.recommendedItinerary &&
        destination.recommendedItinerary.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium text-gray-800 mb-3">
              Recommended Itinerary
            </h3>
            <div className="space-y-4">
              {destination.recommendedItinerary.map((day: any) => (
                <div key={day.day} className="border-l-2 border-blue-500 pl-4">
                  <h4 className="font-medium text-blue-700">Day {day.day}</h4>
                  <ul className="mt-1 space-y-1">
                    {day.activities.map((activity: any, index: string) => (
                      <li key={index} className="text-gray-700">
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
    </section>
  );
}
