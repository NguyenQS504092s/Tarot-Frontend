import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation'; // Import notFound

// Re-use the TarotCard interface (consider moving to a shared types file later)
interface TarotCard {
  _id: string;
  name: string;
  number?: number;
  type: 'Major Arcana' | 'Minor Arcana'; // Changed from arcana
  suit?: 'Gậy' | 'Cốc' | 'Kiếm' | 'Tiền' | null; // Changed to Vietnamese, allow null
  imageUrl?: string;
  keywords?: string[];
  uprightMeaning?: string; // Added
  reversedMeaning?: string; // Added
  description?: string; 
  // meanings object is no longer used directly from API for display
}

// Define the expected structure for the nested "data" object for a single card
interface SingleCardApiData {
  card?: TarotCard;
}

// Define the expected structure of the single card API response
interface SingleCardApiResponse {
  success: boolean;
  data?: SingleCardApiData; // Card is nested under "data"
  message?: string;
  code?: number; // Based on actual API response
}

async function getCardDetails(id: string): Promise<TarotCard | null> {
  try {
    // IMPORTANT: Use your actual backend API URL
    // Removed { cache: 'no-store' } to allow static generation
    const res = await fetch(`http://localhost:5005/api/cards/${id}`); 

    if (!res.ok) {
      if (res.status === 404) {
        return null; // Card not found
      }
      // Log other errors
      console.error(`API Error: ${res.status} ${res.statusText}`);
      const errorBody = await res.text();
      console.error(`Error Body: ${errorBody}`);
      throw new Error(`Failed to fetch card details: ${res.status}`);
    }

    const data: SingleCardApiResponse = await res.json();
    console.log(`[getCardDetails] Parsed JSON for card ${id}:`, JSON.stringify(data, null, 2));


    if (!data.success) {
       console.error(`[getCardDetails] API Error for card ${id}: Response indicates failure.`, data);
      // If API returns success:false for not found, handle it here too
      if (res.status === 404 || data.message?.includes('Không tìm thấy')) {
         return null;
      }
      throw new Error(data.message || `API returned success: false for card ${id}`);
    }

    // Check for nested data and card
    if (!data.data || !data.data.card) {
        console.error(`[getCardDetails] API Error for card ${id}: data.data.card is missing.`, data);
        return null; // Or throw new Error if this case should not happen with success:true
    }
    console.log(`[getCardDetails] Successfully fetched card ${id}.`);
    return data.data.card;
  } catch (error) {
    console.error(`Error fetching card ${id}:`, error);
    // Returning null will trigger the notFound() later
    return null;
  }
}

// Define props type for the page component
interface CardDetailPageProps {
  params: Promise<{ id: string }>; // params is a Promise
}

export default async function CardDetailPage({ params: paramsPromise }: CardDetailPageProps) { // Rename to avoid conflict
  const params = await paramsPromise; // Await the promise to get the actual params
  const { id } = params;
  const card = await getCardDetails(id);

  // If card is not found, render the 404 page
  if (!card) {
    notFound(); // Restore notFound() call
  }

  // Since we call notFound() above, TypeScript should know 'card' is not null here.
  // If errors persist, it's likely the TS server issue. We proceed assuming card is valid.

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/cards" className="text-purple-600 hover:text-purple-800 mb-4 inline-block">
        &larr; Quay lại danh sách
      </Link>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-purple-800 mb-4">{card.name}</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 flex justify-center">
            {/* Placeholder for image */}
            <div className="w-48 h-72 bg-gray-200 rounded flex items-center justify-center text-gray-500 border">
               {card.imageUrl ? (
                 <img src={card.imageUrl} alt={card.name} className="max-h-full max-w-full object-contain" />
               ) : (
                 <span>(No Image)</span>
               )}
            </div>
          </div>
          <div className="md:w-2/3">
            <p className="text-lg text-gray-600 mb-2">{card.type}{card.suit ? ` - ${card.suit}` : ''}</p> {/* Changed arcana to type */}
            
            {card.description && (
              <div className="mb-4">
                <h3 className="font-semibold text-purple-700 mt-4">Mô tả chung:</h3>
                {/* Split description into paragraphs if it contains newlines */}
                {card.description.split('\n').map((paragraph, index) => (
                  <p key={`desc-${index}`} className="text-gray-700 mb-2">{paragraph}</p>
                ))}
              </div>
            )}

            {card.uprightMeaning && (
              <div className="mb-4">
                <h3 className="font-semibold text-green-700">Ý nghĩa xuôi:</h3>
                <p className="text-gray-700">{card.uprightMeaning}</p>
              </div>
            )}

            {card.reversedMeaning && (
              <div className="mb-4">
                <h3 className="font-semibold text-red-700">Ý nghĩa ngược:</h3>
                <p className="text-gray-700">{card.reversedMeaning}</p>
              </div>
            )}

            {card.keywords && card.keywords.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-blue-700">Từ khóa:</h3>
                <p className="text-gray-700">{card.keywords.join(', ')}</p>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}

// Define the expected structure of the API response for ALL cards (for generateStaticParams)
interface AllCardsApiData {
  cards?: TarotCard[]; // Assuming cards are nested under 'data' then 'cards'
  count?: number;
}

interface AllCardsApiResponse {
  success: boolean;
  data?: AllCardsApiData | TarotCard[]; // API might return data: {cards: []} or data: []
  message?: string;
  code?: number;
}

// Generate static paths for all cards
export async function generateStaticParams() {
  console.log('[generateStaticParams] Fetching all card IDs for static generation...');
  const res = await fetch('http://localhost:5005/api/cards', { cache: 'no-store' }); // Use no-store for build to get latest
  if (!res.ok) {
    console.error('[generateStaticParams] Failed to fetch all cards for static generation.');
    return [];
  }

  const responseData: AllCardsApiResponse = await res.json();
  let cardsToGenerate: TarotCard[] = [];

  if (responseData.success && responseData.data) {
    if (Array.isArray(responseData.data)) { // Case: data is directly the array of cards
      cardsToGenerate = responseData.data;
    } else if (responseData.data.cards && Array.isArray(responseData.data.cards)) { // Case: data is an object with a cards array
      cardsToGenerate = responseData.data.cards;
    }
  }
  
  if (cardsToGenerate.length === 0) {
    console.warn('[generateStaticParams] No cards found to generate static paths.');
  } else {
    console.log(`[generateStaticParams] Found ${cardsToGenerate.length} cards to generate.`);
  }

  return cardsToGenerate.map((card) => ({
    id: card._id,
  }));
}

export const dynamicParams = false; // Only generate defined paths
