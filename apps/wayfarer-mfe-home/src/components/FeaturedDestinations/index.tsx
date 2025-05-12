"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Destination {
  id: number;
  title: string;
  body: string;
}

export default function FeaturedDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=3")
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="py-10 px-5 text-center">
      <h2 className="text-2xl font-bold mb-6">Featured Destinations 🌍</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading
          ? [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-[376px] bg-gray-200 animate-pulse rounded-md"
              ></div>
            ))
          : destinations.map((dest) => (
              <div
                key={dest.id}
                className="p-4 border border-gray-300 rounded-md shadow-md">
                <Image
                  src={`https://picsum.photos/600?random=${dest.id}`}
                  alt={dest.title}
                  width={500}
                  height={500}
                  loading="lazy"
                  className="mt-8 rounded-md mx-auto mb-3 h-auto object-cover"
                />
                <p className="mt-8 font-bold">{dest.title}</p>
                <p className="mt-4 text-sm text-gray-600 line-clamp-4">{dest.body}</p>
              </div>
            ))}
      </div>
    </div>
  );
}
