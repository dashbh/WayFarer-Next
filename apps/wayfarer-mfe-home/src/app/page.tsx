import FeaturedDestinations from "@/components/FeaturedDestinations";
import HeroSection from "@/components/HeroSection";
import Newsletter from "@/components/Newsletter";
import RecentPosts from "@/components/RecentPosts";
import TestimonialsSection from "@/components/Testimonials";
import TrendingTopics from "@/components/TrendingTopics";
import TrendingTravelGuides from "@/components/TrendingTravelGuides";
import UpcomingEvents from "@/components/UpcomingEvents";

export default function Home() {
  return (
    <main>
      <HeroSection />
      

      <FeaturedDestinations />
      <TrendingTravelGuides />
      <UpcomingEvents />

      <TrendingTopics />
      <RecentPosts />

      <TestimonialsSection />
      <Newsletter />
    </main>
  );
}
