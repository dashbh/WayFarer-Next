import Image from "next/image";
import { FeaturedPost } from "@/types/blog";

interface HeroSectionProps {
  featuredPost: FeaturedPost;
}

const HeroSection = ({ featuredPost }: HeroSectionProps) => {
  return (
    <div className="w-full bg-gray-100 py-6 px-6 rounded-lg">
      <div className="flex flex-col gap-5 text-center mx-auto">
        {/* Featured Image */}
        <div className="relative w-full h-64 mx-auto">
          <Image
            src={featuredPost.image}
            alt={featuredPost.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold">{featuredPost.title}</h1>
          <p className="text-gray-600 text-md">{featuredPost.description}</p>
          <div className="flex justify-center">
            <a
              href={`/blog/post/${featuredPost.id}`}
              className="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition"
            >
              Read More
            </a>
          </div>
        </div>

        {/* Author and Date */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <span>By {featuredPost.author}</span>
          <span>•</span>
          <span>{featuredPost.date}</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
