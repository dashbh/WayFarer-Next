import { Post } from "@/types/blog";
import Image from "next/image";

interface RecentPostsProps {
  posts: Post[];
}

const RecentPosts = ({ posts }: RecentPostsProps) => {
  return (
    <div className="w-full py-10 px-5">
      <h2 className="text-2xl font-bold text-center mb-6">Recent Posts</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-100 p-4 rounded-md shadow-md">
            <Image
              src={
                post.image ||
                "https://source.unsplash.com/500x300/?technology,blog"
              }
              alt={post.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>By {post.author}</span>
                <span className="mx-2">•</span>
                <span>{new Date(post.date).toDateString()}</span>
              </div>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
