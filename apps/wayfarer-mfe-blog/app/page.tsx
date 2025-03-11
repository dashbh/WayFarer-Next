import HeroSection from "./components/HeroSection";
import RecentPosts from "./components/RecentPosts";
import TrendingTopics from "./components/TrendingTopics";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <TrendingTopics />
      <RecentPosts />
    </div>
  );
}
