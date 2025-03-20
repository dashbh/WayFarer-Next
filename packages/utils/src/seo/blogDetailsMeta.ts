import { Metadata } from "next";

export const generateBlogMetadata = (blog: any, blogId: string): Metadata => ({
  title: blog.title,
  description: blog.excerpt,
  keywords: blog.tags.join(", "),
  openGraph: {
    title: blog.title,
    description: blog.excerpt,
    url:`${process.env.NEXT_PUBLIC_HOME_URL}/blog/${blogId}`,
    type: "article",
    images: [{ url: blog.image, alt: blog.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: blog.title,
    description: blog.excerpt,
    images: [blog.image],
  },
});
