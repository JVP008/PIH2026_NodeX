'use client';

import { memo } from 'react';
import Link from 'next/link';
import { Contractor } from '@/types';

interface ContractorCardProps {
  contractor: Contractor;
  onBook: (contractor: Contractor) => void;
}

/**
 * ContractorCard Component
 *
 * This component displays the details of a single professional (like their name, rating, and price)
 * inside a styled box. It also provides a "View Profile" link and a "Book Now" button.
 */
const ContractorCard = memo(({ contractor, onBook }: ContractorCardProps) => {
  const hasDescription = contractor.description && contractor.description.toLowerCase() !== 'none';

  return (
    <div className="bg-white border-3 border-black rounded-xl shadow-[6px_6px_0px_0px_#000] p-6 hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#000] transition-all flex flex-col h-full">
      {/* Top Row: Avatar and Basic Info */}
      <div className="flex items-start gap-4 mb-4">
        <div className="text-5xl shrink-0 filter drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)] bg-gray-50 border-2 border-black rounded-full w-20 h-20 flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
          {contractor.image ||
            (contractor.service === 'Plumbing'
              ? '👨‍🔧'
              : contractor.service === 'Electrical'
                ? '⚡'
                : contractor.service === 'Cleaning'
                  ? '🧹'
                  : contractor.service === 'Painting'
                    ? '👨‍🎨'
                    : contractor.service === 'HVAC'
                      ? '❄️'
                      : contractor.service === 'Landscaping'
                        ? '🌳'
                        : '👷‍♂️')}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="font-black text-xl flex flex-wrap items-center gap-2">
                <Link
                  href={`/contractors/${contractor.id}`}
                  className="hover:text-blue-600 transition underline decoration-2 decoration-black underline-offset-2 break-words max-w-full"
                >
                  {contractor.name}
                </Link>
                {contractor.verified && (
                  <span className="bg-blue-200 text-black border-2 border-black text-xs px-2 py-1 rounded font-bold flex items-center shadow-[2px_2px_0px_0px_#000] shrink-0 whitespace-nowrap">
                    <i className="fas fa-check-circle mr-1"></i>Verified
                  </span>
                )}
              </h3>
              <p className="text-black font-medium text-sm mt-1 truncate">
                {contractor.service} • {contractor.location}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="flex items-center text-yellow-500 justify-end drop-shadow-[1px_1px_0px_#000]">
                <i className="fas fa-star mr-1 text-lg"></i>
                <span className="font-black text-black text-lg">{contractor.rating}</span>
                <span className="text-gray-600 text-sm ml-1 font-bold">({contractor.reviews})</span>
              </div>
              <p className="text-sm text-black font-bold whitespace-nowrap mt-1">
                {contractor.completed_jobs} jobs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Description: Spans full width */}
      <p className="text-gray-800 font-medium leading-relaxed break-words line-clamp-3 flex-1 mb-6">
        {hasDescription ? (
          contractor.description
        ) : (
          <span className="text-gray-400 italic font-medium">No description provided.</span>
        )}
      </p>

      {/* Footer / Buttons: Spans full width */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto pt-4 border-t-2 border-dashed border-gray-200">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-black font-black text-lg bg-yellow-200 px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] whitespace-nowrap">
            {contractor.price}
          </span>
          <span
            className={`flex items-center font-bold border-2 border-black px-3 py-1 rounded shadow-[2px_2px_0px_0px_#000] whitespace-nowrap ${contractor.available ? 'bg-green-200 text-black' : 'bg-gray-200 text-gray-600'}`}
          >
            <span
              className={`w-3 h-3 rounded-full border-2 border-black ${contractor.available ? 'bg-green-500' : 'bg-gray-400'} mr-2 shrink-0`}
            ></span>
            {contractor.available ? 'Available' : 'Busy'}
          </span>
        </div>

        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <Link
            href={`/contractors/${contractor.id}`}
            className="flex-1 sm:flex-none px-4 py-2 bg-white border-2 border-black text-black font-bold rounded-lg shadow-[3px_3px_0px_0px_#000] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#000] hover:bg-gray-50 transition-all text-center whitespace-nowrap"
          >
            View Profile
          </Link>
          <button
            onClick={() => onBook(contractor)}
            disabled={!contractor.available}
            className={`flex-1 sm:flex-none px-4 py-2 bg-blue-400 border-2 border-black text-black font-bold rounded-lg shadow-[3px_3px_0px_0px_#000] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#000] hover:bg-blue-500 transition-all text-center whitespace-nowrap ${!contractor.available ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
});

ContractorCard.displayName = 'ContractorCard';

export default ContractorCard;
