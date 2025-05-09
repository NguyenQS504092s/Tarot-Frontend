import React from 'react';
import Link from 'next/link';
import { getSortedPostsData, PostData } from '@/lib/posts'; // Import PostData type

export default async function BlogIndexPage() {
  const posts: PostData[] = getSortedPostsData(); // Use the utility function

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center">Blog Tarot</h1>
      {posts.length === 0 ? (
        <p className="text-center text-gray-600">Chưa có bài viết nào.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold text-purple-700 mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              {post.date && <p className="text-sm text-gray-500 mb-3">Đăng ngày: {post.date}</p>}
              {post.excerpt && <p className="text-gray-700 mb-4">{post.excerpt}</p>}
              <Link href={`/blog/${post.slug}`} className="text-purple-600 hover:text-purple-800 font-semibold">
                Đọc thêm &rarr;
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
