import FeaturedDestinations from "@/components/FeaturedDestinations";
import HeroSection from "@/components/HeroSection";
import Newsletter from "@/components/Newsletter";
import RecentPosts from "@/components/RecentPosts";
import TestimonialsSection from "@/components/Testimonials";
import TrendingTopics from "@/components/TrendingTopics";
import TrendingTravelGuides from "@/components/TrendingTravelGuides";
import UpcomingEvents from "@/components/UpcomingEvents";
import { generateHomeJsonLD } from "@wayfarer/utils";
import {JsonLdWrapper} from "@wayfarer/utils";
debugger;
export default function Home() {
  return (
    <main>
      <JsonLdWrapper data={generateHomeJsonLD()} />

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
