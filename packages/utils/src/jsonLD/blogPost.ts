export const generateBlogPostJsonLD = (blog: any) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: blog.title,
  url: `${process.env.NEXT_PUBLIC_HOME_URL}/blog/${blog.slug}`,
  datePublished: blog.publishedAt,
  author: {
    "@type": "Person",
    name: blog.author,
  },
  articleBody: blog.content.substring(0, 500), // Truncate for readability
});
