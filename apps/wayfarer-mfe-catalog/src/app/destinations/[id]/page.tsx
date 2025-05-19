import { notFound } from "next/navigation";
import { Suspense } from "react";

import DestinationHeader from "@/components/destinations/details/DestinationHeader";
import DestinationGallery from "@/components/destinations/details/DestinationGallery";
import DestinationInfo from "@/components/destinations/details/DestinationInfo";
import DestinationMap from "@/components/destinations/details/DestinationMap";
import DestinationReviews from "@/components/destinations/details/DestinationReviews";
import DestinationAttractions from "@/components/destinations/details/DestinationAttractions";
import DestinationActivities from "@/components/destinations/details/DestinationActivities";
import DestinationPracticalInfo from "@/components/destinations/details/DestinationPracticalInfo";
import DestinationSimilar from "@/components/destinations/details/DestinationSimilar";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { getDestinationById } from "@/lib/api/destinations";

interface DestinationPageProps {
  params: {
    id: string;
  };
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { id } = await params;
  const destination = await getDestinationById(id);

  if (!destination) {
    notFound();
  }

  return (
    <main className="bg-white">
      {/* Hero section with main image */}
      <div className="relative h-96 w-full overflow-hidden">
      <img
        src={`https://picsum.photos/1000/400?random=${destination.title}`}
        alt={destination.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {destination.title}
          </h1>
          <p className="text-xl text-white">
            {destination.city && `${destination.city}, `}
            {destination.region && `${destination.region}, `}
            {destination.country}
          </p>
        </div>
      </div>
    </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content column */}
          <div className="lg:w-2/3">
            <Suspense fallback={<LoadingSpinner />}>
              <DestinationHeader destination={destination} />
            </Suspense>

            {destination.galleryImages &&
              destination.galleryImages.length > 0 && (
                <Suspense fallback={<LoadingSpinner />}>
                  <DestinationGallery images={destination.galleryImages} />
                </Suspense>
              )}

            <Suspense fallback={<LoadingSpinner />}>
              <DestinationInfo destination={destination} />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <DestinationMap
                latitude={destination.latitude}
                longitude={destination.longitude}
                title={destination.title}
              />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <DestinationReviews destination={destination} />
            </Suspense>

            {destination.landmarks && destination.landmarks.length > 0 && (
              <Suspense fallback={<LoadingSpinner />}>
                <DestinationAttractions landmarks={destination.landmarks} />
              </Suspense>
            )}

            {destination.activities && destination.activities.length > 0 && (
              <Suspense fallback={<LoadingSpinner />}>
                <DestinationActivities activities={destination.activities} />
              </Suspense>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <Suspense fallback={<LoadingSpinner />}>
              <DestinationPracticalInfo destination={destination} />
            </Suspense>

            {destination.similarDestinations &&
              destination.similarDestinations.length > 0 && (
                <Suspense fallback={<LoadingSpinner />}>
                  <DestinationSimilar
                    similarDestinations={destination.similarDestinations}
                  />
                </Suspense>
              )}
          </div>
        </div>
      </div>
    </main>
  );
}
