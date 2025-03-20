export const generateBlogListJsonLD = (blogs: any[]) => ({
    "@context": "https://schema.org",
    "@type": "Blog",
    "blogPost": blogs.map((blog) => ({
      "@type": "BlogPosting",
      "headline": blog.title,
      "url": `${process.env.NEXT_PUBLIC_HOME_URL}/blog/${blog.slug}`,
      "datePublished": blog.publishedAt,
      "author": {
        "@type": "Person",
        "name": blog.author
      }
    }))
  });
  