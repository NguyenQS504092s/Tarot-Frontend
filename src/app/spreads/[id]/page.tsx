import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Define the expected structure of a spread object (can be reused or imported)
interface Spread {
  _id: string;
  name: string;
  // slug: string; // No longer using slug from API for this page
  description?: string;
  longDescription?: string; // For more detailed explanation
  numberOfCards?: number;
  layout?: { position: number; meaning: string }[]; // Example of how positions might be defined
  // Add other fields as needed
}

// Define the expected structure of the single spread API response
interface SingleSpreadApiData {
  spread?: Spread;
}
interface SingleSpreadApiResponse {
  success: boolean;
  data?: SingleSpreadApiData;
  message?: string;
  code?: number;
}

async function getSpreadDetails(id: string): Promise<Spread | null> { // Changed slug to id
  try {
    // API endpoint uses ID
    const apiUrl = `http://localhost:5005/api/spreads/${id}`; // Changed slug to id
    console.log(`[getSpreadDetails] Attempting to fetch from: ${apiUrl}`);

    // Removed { cache: 'no-store' } to allow static generation
    const res = await fetch(apiUrl); 
    console.log(`[getSpreadDetails] Fetch response status: ${res.status}`);

    if (!res.ok) {
      if (res.status === 404) return null;
      console.error(`[getSpreadDetails] API Error: Status ${res.status} ${res.statusText}`);
      const errorBody = await res.text();
      console.error(`[getSpreadDetails] Error Body: ${errorBody}`);
      return null;
    }

    const data: SingleSpreadApiResponse = await res.json();
    console.log(`[getSpreadDetails] Parsed JSON for spread ${id}:`, JSON.stringify(data, null, 2)); // Changed slug to id

    if (!data.success) {
      console.error(`[getSpreadDetails] API Error for spread ${id}: Response indicates failure.`, data); // Changed slug to id
      return null;
    }
    if (!data.data || !data.data.spread) {
      console.error(`[getSpreadDetails] API Error for spread ${id}: data.data.spread is missing.`, data); // Changed slug to id
      return null;
    }
    console.log(`[getSpreadDetails] Successfully fetched spread ${id}.`); // Changed slug to id
    return data.data.spread;
  } catch (error) {
    console.error(`[getSpreadDetails] Unexpected error fetching spread ${id}:`, error); // Changed slug to id
    return null;
  }
}

interface SpreadDetailPageProps {
  params: Promise<{ id: string }>; // params is a Promise, changed slug to id
}

export default async function SpreadDetailPage({ params: paramsPromise }: SpreadDetailPageProps) { // Rename to avoid conflict
  const params = await paramsPromise; // Await the promise
  const { id } = params; // Changed slug to id
  const spread = await getSpreadDetails(id); // Changed slug to id

  if (!spread) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/spreads" className="text-purple-600 hover:text-purple-800 mb-6 inline-block">
        &larr; Quay lại danh sách kiểu trải bài
      </Link>

      <article className="bg-white p-6 md:p-8 rounded-lg shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">{spread.name}</h1>
        {spread.description && <p className="text-lg text-gray-700 mb-4 italic">{spread.description}</p>}
        {spread.numberOfCards && <p className="text-md text-gray-600 mb-6">Số lá bài cần thiết: {spread.numberOfCards}</p>}

        {spread.longDescription && (
          <div className="prose prose-lg max-w-none mb-6">
            <h2 className="text-2xl font-semibold text-purple-700 mb-3">Mô tả chi tiết:</h2>
            {/* Render HTML if longDescription contains it, or split by newlines */}
            {spread.longDescription.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-3">{paragraph}</p>
            ))}
          </div>
        )}

        {spread.layout && spread.layout.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-purple-700 mb-3">Ý nghĩa các vị trí:</h2>
            <ul className="list-disc pl-5 space-y-2">
              {spread.layout.map((pos) => (
                <li key={pos.position} className="text-gray-700">
                  <span className="font-semibold">Vị trí {pos.position}:</span> {pos.meaning}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* TODO: Add section for users to perform this spread (interactive) later */}
      </article>
    </div>
  );
}

// Optional: Generate static paths if you know all spread slugs beforehand
// Define the expected structure of the API response for ALL spreads (for generateStaticParams)
interface AllSpreadsApiData {
  spreads?: Spread[];
  count?: number;
}
interface AllSpreadsApiResponse {
  success: boolean;
  data?: AllSpreadsApiData | Spread[]; 
  message?: string;
  code?: number;
}

export async function generateStaticParams() {
  console.log('[generateStaticParams-Spreads] Fetching all spread IDs for static generation...');
  // Removed { cache: 'no-store' } for generateStaticParams fetch as well, 
  // as this data is used to build static pages, it should be consistent with page data fetching.
  const res = await fetch('http://localhost:5005/api/spreads'); 
  if (!res.ok) {
    console.error('[generateStaticParams-Spreads] Failed to fetch all spreads for static generation.');
    return [];
  }

  const responseData: AllSpreadsApiResponse = await res.json();
  let spreadsToGenerate: Spread[] = [];

  if (responseData.success && responseData.data) {
    if (Array.isArray(responseData.data)) {
      spreadsToGenerate = responseData.data;
    } else if (responseData.data.spreads && Array.isArray(responseData.data.spreads)) {
      spreadsToGenerate = responseData.data.spreads;
    }
  }
  
  if (spreadsToGenerate.length === 0) {
    console.warn('[generateStaticParams-Spreads] No spreads found to generate static paths.');
  } else {
    console.log(`[generateStaticParams-Spreads] Found ${spreadsToGenerate.length} spreads to generate.`);
  }

  return spreadsToGenerate.map((spread) => ({
    id: spread._id, // Use id instead of slug
  }));
}

export const dynamicParams = false; // Only generate defined paths
