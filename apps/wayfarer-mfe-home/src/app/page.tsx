import HeroSection from "@/components/HeroSection";
import HomePage from "@/components/HomePage";
import TrendingTopics from "@/components/TrendingTopics";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrendingTopics onTagClick={() => {}}/>
      <HomePage />
    </main>
  );
}
