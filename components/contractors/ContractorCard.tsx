'use client';

import { useState } from 'react';
import { Contractor } from '@/types';

interface ContractorCardProps {
    contractor: Contractor;
    onBook: (contractor: Contractor) => void;
}

export default function ContractorCard({ contractor, onBook }: ContractorCardProps) {
    const [showProfile, setShowProfile] = useState(false);

    const avatar = contractor.image
        ? <span className="text-5xl drop-shadow-[2px_2px_0_black]">{contractor.image}</span>
        : (
            <div className="w-14 h-14 border-2 border-black bg-white flex items-center justify-center text-black font-black text-xl neo-shadow">
                {contractor.name?.slice(0, 2).toUpperCase()}
            </div>
        );

    return (
        <>
            <div className="bg-white border-[3px] border-black p-6 neo-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all">
                <div className="flex items-start gap-4">
                    <div className="shrink-0">{avatar}</div>
                    <div className="flex-1">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-black text-xl uppercase tracking-tighter flex items-center gap-2">
                                    {contractor.name}
                                    {contractor.verified && (
                                        <span className="bg-[#4ECDC4] border-2 border-black text-black text-[10px] font-black uppercase px-2 py-0.5 inline-flex items-center">
                                            <i className="fas fa-check-circle mr-1"></i>Verified
                                        </span>
                                    )}
                                </h3>
                                <p className="text-black font-bold text-xs uppercase tracking-widest mt-1 opacity-70">
                                    {contractor.service} • {contractor.location}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center text-black justify-end bg-[#FFD700] border-2 border-black px-2 py-0.5 neo-shadow-small rotate-2 group-hover:rotate-0 transition-transform">
                                    <i className="fas fa-star mr-1 text-xs"></i>
                                    <span className="font-black text-sm">{contractor.rating ?? 'NEW'}</span>
                                    <span className="text-[10px] font-black ml-1">({contractor.reviews ?? 0})</span>
                                </div>
                                <p className="text-[10px] font-black uppercase mt-1">{contractor.completed_jobs ?? 0} jobs done</p>
                            </div>
                        </div>
                        <p className="text-black font-medium mt-3 text-sm line-clamp-2 border-l-4 border-black pl-3 py-1 bg-gray-50 uppercase tracking-tight italic">
                            &quot;{contractor.description || 'No description provided.'}&quot;
                        </p>
                        <div className="flex items-center justify-between mt-5">
                            <div className="flex items-center gap-4">
                                <span className="text-black font-black text-lg bg-[#FFD700] px-2 border-2 border-black">{contractor.price ?? 'TBD'}</span>
                                <span className={`flex items-center text-[10px] font-black uppercase ${contractor.available ? 'text-green-700' : 'text-gray-500'}`}>
                                    <span className={`w-3 h-3 border-2 border-black ${contractor.available ? 'bg-green-400' : 'bg-gray-400'} mr-2`}></span>
                                    {contractor.available ? 'Ready' : 'Busy'}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowProfile(true)}
                                    className="px-4 py-2 border-2 border-black bg-white font-black uppercase text-[10px] tracking-widest hover:bg-gray-100 transition-colors active:translate-y-0.5 active:shadow-none"
                                >
                                    Details
                                </button>
                                <button
                                    onClick={() => onBook(contractor)}
                                    disabled={!contractor.available}
                                    className={`px-4 py-2 border-2 border-black bg-black text-white font-black uppercase text-[10px] tracking-widest neo-shadow-small hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${!contractor.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    Book Pro
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Modal */}
            {showProfile && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowProfile(false)}>
                    <div className="bg-[#FFD700] border-[6px] border-black p-8 max-w-md w-full relative neo-shadow-large animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setShowProfile(false)} className="absolute -top-6 -right-6 bg-white border-[4px] border-black w-12 h-12 flex items-center justify-center hover:bg-red-400 transition-colors">
                            <i className="fas fa-times text-2xl"></i>
                        </button>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="shrink-0 scale-125">{avatar}</div>
                            <div>
                                <h2 className="text-3xl font-[900] uppercase tracking-tighter leading-none">{contractor.name}</h2>
                                <p className="text-sm font-black uppercase tracking-widest opacity-80 mt-1">{contractor.service}</p>
                                {contractor.verified && (
                                    <span className="bg-[#4ECDC4] border-2 border-black text-black text-[10px] font-black uppercase px-2 py-1 inline-flex items-center mt-2">
                                        <i className="fas fa-check-circle mr-1"></i>Verified Pro
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {[
                                { icon: 'fa-map-marker-alt', text: contractor.location, color: 'bg-white' },
                                { icon: 'fa-star', text: `${contractor.rating ?? 'NEW'} (${contractor.reviews ?? 0})`, color: 'bg-white' },
                                { icon: 'fa-briefcase', text: `${contractor.completed_jobs ?? 0} Done`, color: 'bg-white' },
                                { icon: 'fa-tag', text: contractor.price ?? 'TBD', color: 'bg-white' },
                            ].map((item, i) => (
                                <div key={i} className={`${item.color} border-2 border-black p-3 flex items-center gap-3 neo-shadow-small`}>
                                    <i className={`fas ${item.icon} text-black`}></i>
                                    <span className="text-[10px] font-black uppercase">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        {contractor.description && (
                            <div className="bg-white border-2 border-black p-4 mb-8 rotate-1">
                                <h4 className="font-black uppercase text-xs tracking-widest mb-2 border-b-2 border-black pb-1">About</h4>
                                <p className="text-xs font-bold leading-relaxed">{contractor.description}</p>
                            </div>
                        )}

                        <button
                            onClick={() => { setShowProfile(false); onBook(contractor); }}
                            disabled={!contractor.available}
                            className={`w-full py-4 border-[4px] border-black font-[900] text-xl uppercase tracking-tighter transition-all ${contractor.available
                                    ? 'bg-black text-white neo-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]'
                                    : 'bg-gray-400 text-black cursor-not-allowed opacity-50'
                                }`}
                        >
                            {contractor.available ? 'Book This Pro' : 'Unavailable'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
