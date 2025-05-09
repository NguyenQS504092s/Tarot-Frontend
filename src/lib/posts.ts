
import fs from 'fs';
import path from 'path';
import * as matter from 'gray-matter'; // Changed import style
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), '_posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  author?: string;
  tags?: string[];
  contentHtml: string;
  [key: string]: any; // Allow other frontmatter fields
}

export function getSortedPostsData(): PostData[] {
  // Get file names under /_posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter.default(fileContents); // Call .default

    // Combine the data with the slug
    return {
      slug,
      ...(matterResult.data as { title: string; date: string; excerpt?: string; author?: string; tags?: string[] }),
      contentHtml: '', // Will be populated by getPostData if needed for list, or just use excerpt
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(slug: string): Promise<PostData | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter.default(fileContents); // Call .default

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the slug and contentHtml
    return {
      slug,
      contentHtml,
      ...(matterResult.data as { title: string; date: string; excerpt?: string; author?: string; tags?: string[] }),
    };
  } catch (err) {
    // If file not found, or other error
    console.error(`Error reading or parsing post ${slug}:`, err);
    return null;
  }
}
