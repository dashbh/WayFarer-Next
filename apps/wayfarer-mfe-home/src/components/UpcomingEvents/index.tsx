"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Event {
  id: number;
  name: string;
  body: string;
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments?_limit=4")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="py-10 px-5 text-center">
      <h2 className="text-2xl font-bold mb-6">Upcoming Travel Events 📅</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-stretch">
        {loading
          ? [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-full h-36 bg-gray-200 animate-pulse rounded-md"
              ></div>
            ))
          : events.map((event) => (
              <div
                key={event.id}
                className="w-full p-4 border border-gray-300 rounded-md shadow-md flex"
              >
                <div className="w-1/3">
                  <Image
                    src={`https://picsum.photos/400?random=${event.id}`}
                    alt={event.name}
                    width={150}
                    height={150}
                    loading="lazy"
                    className="rounded-md h-auto object-cover"
                  />
                </div>
                <div className="w-2/3 pl-4 flex flex-col text-left justify-center">
                  <p className="font-bold text-md">{event.name}</p>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {event.body}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
