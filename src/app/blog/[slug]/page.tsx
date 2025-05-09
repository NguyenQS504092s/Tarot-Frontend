import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// TODO: Define interface for a full Blog Post
interface BlogPost {
  slug: string;
  title: string;
  content: string; // HTML or Markdown content
  date?: string;
  author?: string;
  // Add other fields like tags, featuredImage, metadata for SEO
}

// TODO: Implement fetching a single blog post by slug
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // Placeholder data for now
  if (slug === 'bai-viet-mau-1') {
    return {
      slug: 'bai-viet-mau-1',
      title: 'Bài Viết Mẫu Số 1',
      content: '<p>Đây là nội dung đầy đủ của <strong>bài viết mẫu số 1</strong>. Bạn có thể viết nội dung HTML hoặc Markdown ở đây.</p><p>Thêm một đoạn văn nữa để bài viết dài hơn.</p>',
      date: '2025-05-09',
      author: 'Cline AI'
    };
  }
  if (slug === 'bai-viet-mau-2') {
    return {
      slug: 'bai-viet-mau-2',
      title: 'Bài Viết Mẫu Số 2',
      content: '<p>Nội dung chi tiết cho <em>bài viết mẫu số 2</em>.</p>',
      date: '2025-05-08',
      author: 'Cline AI'
    };
  }
  return null; // Post not found
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params: paramsPromise }: BlogPostPageProps) {
  const params = await paramsPromise;
  const { slug } = params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/blog" className="text-purple-600 hover:text-purple-800 mb-6 inline-block">
        &larr; Quay lại danh sách Blog
      </Link>
      <article className="prose prose-lg max-w-none bg-white p-6 md:p-8 rounded-lg shadow-md">
        <h1 className="text-purple-800">{post.title}</h1>
        {post.date && <p className="text-sm text-gray-500 italic">Đăng ngày: {post.date}{post.author && ` bởi ${post.author}`}</p>}
        <hr className="my-6" />
        {/* Assuming content is HTML. If Markdown, a parser would be needed. */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}

// TODO: Implement generateStaticParams for blog posts if they are pre-rendered
// export async function generateStaticParams() {
//   const posts = await getBlogPosts(); // Assuming getBlogPosts is defined elsewhere or here
//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }
// export const dynamicParams = false;
