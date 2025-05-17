import Image from "next/image";
import { ClientRatings } from "./ClientRatings";

interface Guide {
  id: number;
  title: string;
}

const fetchTrendingTravelGuides = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=4",
    {
      next: { revalidate: 86400 }, // Regenerates every 24 hours
    }
  );
  const json = await res.json();

  return json;
};

export default async function TrendingTravelGuides() {
  const guides: Guide[] = await fetchTrendingTravelGuides();

  return (
    <div className="py-10 px-5 text-center">
      <h2 className="text-2xl font-bold mb-8">Trending Travel Guides 🧳</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-stretch">
        {guides.map((guide, idx) => (
          <a
            key={guide.id}
            href="#"
            className="w-full bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden border border-gray-100"
            style={{ height: 320 }}
          >
            <Image
              src={`https://picsum.photos/seed/guide${guide.id}/400/200`}
              alt={guide.title}
              width={400}
              height={200}
              className="w-full h-40 object-cover"
              style={{ height: 200 }}
            />

            <div className="flex-1 flex flex-col justify-between p-4 overflow-hidden">
              <h3 className="text-lg font-semibold mb-1 text-gray-800 line-clamp-2">
                {guide.title}
              </h3>
              <ClientRatings />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}