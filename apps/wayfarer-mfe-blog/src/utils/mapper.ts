import { Post } from "@/types/blog";

export const mapResponseToPost = (post: any): Post => ({
    id: post?.id || 0,
    title: post?.title || "Untitled",
    description: post?.description || "No description available.",
    image:
    post?.cover_image ||
      "https://source.unsplash.com/1200x600/?technology,blog",
    link: post?.url || "#",
    author: post?.user?.name || "Unknown",
    date: post?.published_at
      ? new Date(post.published_at).toDateString()
      : "Unknown date",
  });