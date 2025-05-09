import React from 'react';
import Link from 'next/link';

// Define the expected structure of a spread object from the API
interface Spread {
  _id: string;
  name: string;
  slug: string; // For URL and fetching details
  description?: string;
  numberOfCards?: number;
  // Add other fields as needed based on your actual API response
}

// Define the expected structure of the API response for spreads
interface SpreadsApiResponse {
  success: boolean;
  data?: {
    spreads?: Spread[];
    count?: number;
  };
  message?: string;
  code?: number;
}

async function getSpreads(): Promise<Spread[]> {
  try {
    const apiUrl = 'http://localhost:5005/api/spreads'; // Assuming this is the endpoint
    console.log(`[getSpreads] Attempting to fetch from: ${apiUrl}`);

    // Removed { cache: 'no-store' } to allow static generation or default caching
    const res = await fetch(apiUrl); 
    console.log(`[getSpreads] Fetch response status: ${res.status}`);

    if (!res.ok) {
      console.error(`[getSpreads] API Error: Status ${res.status} ${res.statusText}`);
      const errorBody = await res.text();
      console.error(`[getSpreads] Error Body: ${errorBody}`);
      return []; // Return empty on non-ok response
    }

    const data: SpreadsApiResponse = await res.json();
    console.log('[getSpreads] Parsed JSON data:', JSON.stringify(data, null, 2));

    if (!data.success) {
      console.error('[getSpreads] API Error: Response indicates failure.', data);
      return [];
    }

    // Handle API returning data: [spread1, spread2] or data: { spreads: [...] }
    if (data.data) {
      if (Array.isArray(data.data)) { // Case: data is directly the array of spreads
        if (data.data.length === 0) {
          console.log('[getSpreads] API returned an empty array for data, assuming no spreads.');
          return [];
        }
        console.log(`[getSpreads] Successfully fetched ${data.data.length} spreads (data is array).`);
        return data.data as Spread[]; // Type assertion
      } else if (data.data.spreads && Array.isArray(data.data.spreads)) { // Case: data is an object with a spreads array
        if (data.data.spreads.length === 0) {
          console.log('[getSpreads] API returned data.spreads as an empty array.');
          return [];
        }
        console.log(`[getSpreads] Successfully fetched ${data.data.spreads.length} spreads (data.spreads is array).`);
        return data.data.spreads;
      }
    }
    
    console.error('[getSpreads] API Error: data.data is missing, not an array, or data.data.spreads is missing/not an array.', data);
    return [];
  } catch (error) {
    console.error('[getSpreads] Unexpected error in getSpreads:', error);
    return [];
  }
}

export default async function SpreadsPage() {
  const spreads = await getSpreads();

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">
        Các Kiểu Trải Bài Tarot
      </h1>
      {spreads.length === 0 ? (
        <p className="text-center text-gray-600">Không thể tải danh sách kiểu trải bài. Vui lòng thử lại sau.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spreads.map((spread) => (
            <Link key={spread._id} href={`/spreads/${spread._id}`} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 transition-colors">
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-purple-700">{spread.name}</h2>
              {spread.description && <p className="font-normal text-gray-700 mb-2">{spread.description}</p>}
              {spread.numberOfCards && <p className="text-sm text-gray-500">Số lá bài: {spread.numberOfCards}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
