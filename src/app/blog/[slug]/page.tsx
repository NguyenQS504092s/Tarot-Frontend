import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostData, getAllPostSlugs, PostData } from '@/lib/posts'; 

interface BlogPostPageProps {
  params: Promise<{ slug: string }>; 
}

export default async function BlogPostPage({ params: paramsPromise }: BlogPostPageProps) { 
  const params = await paramsPromise; 
  const { slug } = params;
  const post: PostData | null = await getPostData(slug); // Use PostData type

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
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} /> {/* Changed post.content to post.contentHtml */}
      </article>
    </div>
  );
}

// Implement generateStaticParams for blog posts
export async function generateStaticParams() {
  const paths = getAllPostSlugs(); // Use the utility function
  return paths.map(p => ({ slug: p.params.slug })); // Ensure correct format
}

export const dynamicParams = false; // Only generate defined paths
