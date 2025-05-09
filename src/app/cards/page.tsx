import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import next/image

// Define the expected structure of a card object from the API
interface TarotCard {
  _id: string;
  name: string;
  number?: number; // Major Arcana might not have a number in the same way
  arcana: 'Major Arcana' | 'Minor Arcana';
  suit?: 'Wands' | 'Cups' | 'Swords' | 'Pentacles';
  imageUrl?: string; // Assuming there's an image URL
  keywords?: string[];
  meanings?: {
    light: string[];
    shadow: string[];
  };
  // Add other fields as needed based on your actual API response
}

// Define the expected structure of the API response
interface ApiData { // New interface for the nested "data" object
  cards?: TarotCard[];
  count?: number; // If count is also nested
}

interface ApiResponse {
  success: boolean;
  data?: ApiData; // "data" object containing cards and possibly count
  message?: string;
  code?: number; // Based on actual API response
  // Add pagination fields if your API supports them and they are top-level
}

async function getCards(): Promise<TarotCard[]> {
  try {
    // Revert back to localhost, maybe it works now?
    const apiUrl = 'http://localhost:5005/api/cards';
    console.log(`[getCards] Attempting to fetch from: ${apiUrl}`);

    let res;
    try {
      // Removed { cache: 'no-store' } to allow static generation or default caching
      res = await fetch(apiUrl); 
      console.log(`[getCards] Fetch response status: ${res.status}`);
    } catch (fetchError) {
      console.error('[getCards] Fetch call itself failed:', fetchError);
      return []; // Return empty on fetch call error
    }

    if (!res.ok) {
      console.error(`[getCards] API Error: Status ${res.status} ${res.statusText}`);
      try {
        const errorBody = await res.text();
        console.error(`[getCards] Error Body: ${errorBody}`);
      } catch (textError) {
        console.error('[getCards] Could not get error body text:', textError);
      }
      return []; // Return empty on non-ok response
    }

    let data: ApiResponse;
    try {
      data = await res.json();
      console.log('[getCards] Parsed JSON data:', JSON.stringify(data, null, 2)); // Log parsed data
    } catch (jsonError) {
      console.error('[getCards] Failed to parse JSON response:', jsonError);
      return []; // Return empty on JSON parse error
    }

    if (!data.success) {
      console.error('[getCards] API Error: Response indicates failure (data.success is false).', data);
      return []; // Return empty if API reports failure
    }

    if (!data.data || !Array.isArray(data.data.cards)) { // Check if data.data and data.data.cards exist and is an array
        console.error('[getCards] API Error: data.data.cards is missing or not an array.', data);
        return []; // Return empty if cards array is missing
    }

    console.log(`[getCards] Successfully fetched ${data.data.cards.length} cards.`);
    return data.data.cards; // Return the cards array from data.data.cards
  } catch (error) { // Catch any other unexpected errors
    console.error('[getCards] Unexpected error in getCards:', error);
    return [];
  }
}

export default async function CardsPage() {
  const cards = await getCards();

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">
        Khám phá 78 Lá Bài Tarot
      </h1>
      {cards.length === 0 ? (
        <p className="text-center text-gray-600">Không thể tải danh sách lá bài. Vui lòng thử lại sau.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {cards.map((card) => (
            <Link key={card._id} href={`/cards/${card._id}`} className="border rounded-lg p-2 hover:shadow-lg transition-shadow bg-white flex flex-col items-center text-center">
              <div className="w-full h-48 relative mb-2 rounded overflow-hidden bg-gray-200 flex items-center justify-center"> {/* Increased height for better aspect ratio */}
                {card.imageUrl ? (
                   <Image 
                     src={card.imageUrl} 
                     alt={card.name} 
                     width={200} // Placeholder width
                     height={350} // Placeholder height
                     className="object-contain w-full h-full" 
                   />
                 ) : (
                   <span className="text-gray-500">(No Image)</span>
                 )}
              </div>
              <h2 className="text-sm font-semibold text-purple-700 mt-1">{card.name}</h2>
              <p className="text-xs text-gray-500">{card.arcana}</p>
              {card.suit && <p className="text-xs text-gray-500">{card.suit}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
