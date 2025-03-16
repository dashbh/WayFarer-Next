"use client";

import { useState } from "react";
import TrendingTopics from "@/components/TrendingTopics";
import RecentPosts from "@/components/RecentPosts";
import HeroSection from "@/components/HeroSection";

const HomePage = () => {
  const [selectedTag, setSelectedTag] = useState<string>("");

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  const clearFilter = () => {
    setSelectedTag("");
  };

  return (
    <div>
      <HeroSection />
      <TrendingTopics onTagClick={handleTagClick} />
      <RecentPosts selectedTag={selectedTag} clearFilter={clearFilter} />
    </div>
  );
};

export default HomePage;
