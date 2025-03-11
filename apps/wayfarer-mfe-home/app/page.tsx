import HeroSection from "./components/HeroSection";
import RecentPosts from "./components/RecentPosts";
import TrendingTopics from "./components/TrendingTopics";

export default function Home() {
  return (
    <main>
      Home Page
      <HeroSection />
      <TrendingTopics />
      <RecentPosts />
    </main>
  );
}
