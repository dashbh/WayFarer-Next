import Link from "next/link";
import { Topic } from "@/types/blog";

interface TrendingTopicsProps {
  topics: Topic[];
}

const TrendingTopics: React.FC<TrendingTopicsProps> = ({ topics }) => {
  return (
    <div className="w-full py-6 px-5">
      <div className="flex flex-wrap gap-3">
        {topics.map((topic) => (
          <div key={topic.slug}>
            <Link href={`/tag/${topic.slug}`} passHref>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-md cursor-pointer hover:bg-blue-500 hover:text-white">
                #{topic.name}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;
