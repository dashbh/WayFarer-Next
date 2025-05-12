interface Guide {
  id: number;
  title: string;
}

const fetchTrendingTravelGuides = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", {
    next: { revalidate: 86400 }, // Regenerates every 24 hours
  });
  const json = await res.json();

  return json;
};

export default async function TrendingTravelGuides() {
  const guides: Guide[] = await fetchTrendingTravelGuides();

  return (
    <div className="py-10 px-5 text-center">
      <h2 className="text-2xl font-bold mb-6">Trending Travel Guides 🧳</h2>

      <div className="flex flex-col gap-4 items-center">
        {guides.map((guide) => (
          <a
            key={guide.id}
            href="#"
            className="text-blue-500 font-bold hover:underline"
          >
            {guide.title}
          </a>
        ))}
      </div>
    </div>
  );
}
