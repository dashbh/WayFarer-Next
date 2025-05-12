"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Post {
  id: number;
  cover_image: string;
  title: string;
  description: string;
  user: {
    name: string;
  };
  published_at: string;
  url: string;
}

const RecentPosts = ({
  selectedTag,
  clearFilter,
}: {
  selectedTag?: string;
  clearFilter?: () => void;
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      setLoading(true);
      try {
        const url = selectedTag
          ? `https://dev.to/api/articles?tag=${selectedTag}&per_page=3`
          : "https://dev.to/api/articles?per_page=3&latest=1";

        const response = await fetch(url);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, [selectedTag]);

  return (
    <div className="w-full py-10 px-5 bg-white">
      <h2 className="text-3xl font-bold text-green-400 text-center mb-6">
        {selectedTag ? `Posts About #${selectedTag}` : "Recent Posts"}
      </h2>

      {selectedTag && (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-red-600 transition"
          onClick={clearFilter}
        >
          Clear Filter
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-64 bg-gray-200 animate-pulse rounded-md"
              ></div>
            ))
          : posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-100 p-4 rounded-md flex flex-col">
                <Image
                  src={
                    post.cover_image ||
                    "https://placehold.co/500x300?text=No+Image"
                  }
                  alt={post.title}
                  className="rounded-md mb-4 w-full h-auto object-cover"
                  width={500}
                  height={300}
                />
                <div className="flex flex-col gap-3 flex-1">
                  <h3 className="text-lg font-bold">{post.title}</h3>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <span>By {post.user.name}</span>
                    <span>•</span>
                    <span>{new Date(post.published_at).toDateString()}</span>
                  </div>
                  <div className="mt-auto">
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-500 hover:underline"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default RecentPosts;