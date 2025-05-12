import HeroSection from "@/components/HeroSection";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import TrendingTravelGuides from "@/components/TrendingTravelGuides";
import TrendingTopics from "@/components/TrendingTopics";
import UpcomingEvents from "@/components/UpcomingEvents";
import RecentPosts from "@/components/RecentPosts";
import TestimonialsSection from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import { generateHomeJsonLD } from "@wayfarer/utils";
import {JsonLdWrapper} from "@wayfarer/utils";

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
