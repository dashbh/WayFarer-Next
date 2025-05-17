interface TrendingTopicsProps {}

const fetchTrendingTopics = async () => {
  const topicsData = await fetch("https://dev.to/api/tags", {
    next: { revalidate: 86400 }, // Regenerates every 24 hours
  });
  const topics = await topicsData.json();

  return topics
    .slice(0, 10)
    .map((topic: any) => ({ name: topic.name, slug: topic.name }));
};

export default async function TrendingTopics({}: TrendingTopicsProps) {
  const trendingTopics = await fetchTrendingTopics();

  return (
    <div className="w-full my-20 py-5 px-5 bg-gray-50 shadow-md">
      <div className="flex flex-col gap-4 text-center">
        <h2 className="text-3xl font-bold my-3">
          Trending Topics
        </h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {trendingTopics.map((tag: any) => (
            <div
              key={tag.name}
              className="px-3 py-1 bg-teal-100 text-sm font-medium rounded-md cursor-pointer hover:bg-blue-500 hover:text-white transition"
            >
              {tag?.name.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
