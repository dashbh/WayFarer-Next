import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  generateBlogMetadata,
  generateBlogPostJsonLD,
  JsonLdWrapper,
} from "@wayfarer/utils";
import { Suspense } from "react";

const API_URL = "https://dev.to/api/articles";

interface BlogPageProps {
  params: Promise<{ id: string }>;
}

interface BlogPost {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  readable_publish_date: string;
  url: string;
  body_html: string;
}


// Fetch blog details (SSR)
const fetchBlogDetails = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Blog Post not found");
  }

  return res;
};

// Fetch mock recent posts (Streaming)
const fetchRecentPosts = async () => {
  const res = await fetch(`${API_URL}?per_page=3`);
  return res.json();
};

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { id } = await params;
  const res = await fetchBlogDetails(id);
  if (!res.ok) return {};
  const post = await res.json();
  return generateBlogMetadata(post, id);
}

export default async function BlogDetails({ params }: BlogPageProps) {
  const { id } = await params;
  const res = await fetchBlogDetails(id);
  if (!res.ok) return notFound();
  const post: BlogPost = await res.json();

  return (
    <>
      <JsonLdWrapper data={generateBlogPostJsonLD(post)} />

      <div className="flex gap-8 p-8">
        <article className="w-3/4">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full rounded mb-4"
          />
          <div
            dangerouslySetInnerHTML={{ __html: post.body_html }}
            className="prose"
          />
        </article>
        <aside className="w-1/4 border-l pl-4">
          <h2 className="text-xl font-semibold mb-3">Recent Posts</h2>
          <ul>
            <Suspense fallback={<p>Loading reviews...</p>}>
              <RecentPostsWrapper />
            </Suspense>
          </ul>
        </aside>
      </div>
    </>
  );
}

// Streaming Recent Posts
const RecentPostsWrapper = async () => {
  const recentPosts = await fetchRecentPosts();
  return (
    <ul>
      {recentPosts.map((recent: any) => (
        <li key={recent.id} className="mb-2">
          <a
            href={`/blog/${recent.id}`}
            className="text-blue-600 hover:underline"
          >
            {recent.title}
          </a>
        </li>
      ))}
    </ul>
  );
};
