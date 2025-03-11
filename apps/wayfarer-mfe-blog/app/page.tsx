import HeroSection from "./components/HeroSection";
import RecentPosts from "./components/RecentPosts";
import TrendingTopics from "./components/TrendingTopics";
import { FeaturedPost, Post, Topic } from "./types/blog";
import { mapResponseToPost } from "./utils/mapper";

interface BlogPageProps {
  featuredPost: FeaturedPost;
  trendingTopics: Topic[];
  recentPosts: Post[];
}

const fetchFeaturedPost = async () => {
  // Fetch Featured Post
  const featuredRes = await fetch(
    "https://dev.to/api/articles?per_page=1&top=1",
    {
      next: { revalidate: 86400 }, // Regenerates every 24 hours
    }
  );
  const featuredData = await featuredRes.json();

  return mapResponseToPost(featuredData[0]);
};

const fetchTrendingTopics = async () => {
  const topicsData = await fetch("https://dev.to/api/tags", {
    next: { revalidate: 86400 }, // Regenerates every 24 hours
  });
  const topics = await topicsData.json();

  return topics
    .slice(0, 10)
    .map((topic: any) => ({ name: topic.name, slug: topic.name }));
};

const fetchRecentPosts = async () => {
  // Fetch Recent Posts
  const recentRes = await fetch("https://dev.to/api/articles?per_page=5", {
    next: { revalidate: 86400 }, // Regenerates every 24 hours
  });
  const recentData = await recentRes.json();

  const recentPosts: Post[] = recentData.map((post: any) =>
    mapResponseToPost(post)
  );

  return recentPosts;
};

const BlogPage: React.FC<BlogPageProps> = async () => {
  const featuredPost = await fetchFeaturedPost();
  const trendingTopics = await fetchTrendingTopics();
  const recentPosts = await fetchRecentPosts();
  return (
    <>
      <HeroSection featuredPost={featuredPost} />
      <TrendingTopics topics={trendingTopics} />
      <RecentPosts posts={recentPosts} />
    </>
  );
};

export default BlogPage;
