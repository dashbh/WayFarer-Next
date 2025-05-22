"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DestinationDto } from "@wayfarer/types";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_WAYFARER_API_URL}/api/catalog`;

export default function FeaturedDestinations() {
  const [destinations, setDestinations] = useState<DestinationDto[]>([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/destinations?page=1&limit=3&sort%5B0%5D%5Bfield%5D=updatedAt&sort%5B0%5D%5Border%5D=desc`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setDestinations(data.items);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div className="py-10 px-5 text-center">
      <h2 className="text-2xl font-bold mb-6">Featured Destinations 🌍</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading || error
          ? [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-[376px] bg-gray-200 animate-pulse rounded-md"
              ></div>
            ))
          : destinations.slice(0, 3).map((dest) => (
              <a href={`/destinations/${dest.id}`} className="block hover:shadow-lg" key={dest.id}>
                <div
                  // key={dest.id}
                  className="p-4 border border-gray-300 rounded-md shadow-md"
                >
                  <Image
                    src={`https://picsum.photos/600?random=${dest.id}`}
                    alt={dest.title}
                    width={500}
                    height={500}
                    loading="lazy"
                    className="mt-8 rounded-md mx-auto mb-3 h-auto object-cover"
                  />
                  <p className="mt-8 font-bold">{dest.title}</p>
                  <p className="mt-4 text-sm text-gray-600 line-clamp-4">
                    {dest.description ||
                      dest.aiGeneratedSummary ||
                      "No description available."}
                  </p>
                </div>
              </a>
            ))}
      </div>
    </div>
  );
}
