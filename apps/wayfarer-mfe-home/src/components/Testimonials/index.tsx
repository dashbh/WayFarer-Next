"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  body: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments?_limit=3")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="py-10 px-5 text-center">
      <h2 className="text-2xl font-bold mb-6">What Our Travelers Say ✈️</h2>

      {loading ? (
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 items-center">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="w-full max-w-2xl p-4 border border-gray-300 rounded-md shadow-md text-left"
            >
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-bold">{testimonial.name}</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-6">
                "{testimonial.body}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
