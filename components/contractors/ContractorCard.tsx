'use client';
import { Contractor } from '@/types';

export default function ContractorCard({ contractor, onBook }: { contractor: Contractor, onBook: (contractor: Contractor) => void }) {
    return (
        <div className="bg-white border-3 border-black rounded-xl shadow-[6px_6px_0px_0px_#000] p-6 flex flex-col h-full">
            <div className="flex items-start gap-4">
                <div className="text-5xl border-2 border-black rounded-full w-20 h-20 flex items-center justify-center bg-gray-50 shadow-[2px_2px_0px_0px_#000]">
                    {contractor.image || '👷'}
                </div>
                <div>
                    <h3 className="font-black text-xl uppercase underline decoration-2">{contractor.name}</h3>
                    <p className="font-bold text-sm text-gray-600 px-1">{contractor.service} • {contractor.location}</p>
                    <div className="flex items-center text-yellow-500 mt-1">
                        <i className="fas fa-star mr-1"></i>
                        <span className="font-black text-black">{contractor.rating} ({contractor.reviews})</span>
                    </div>
                </div>
            </div>
            <p className="mt-4 font-medium line-clamp-3 flex-1">{contractor.description}</p>
            <div className="mt-6 flex items-center justify-between border-t-2 border-black pt-4">
                <span className="font-black text-lg bg-yellow-200 px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000]">
                    {contractor.price}
                </span>
                <button onClick={() => onBook(contractor)} className="bg-blue-400 border-3 border-black px-4 py-2 font-black shadow-[3px_3px_0px_0px_#000] hover:translate-y-[-2px]">
                    BOOK NOW
                </button>
            </div>
        </div>
    );
}
