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
        ? <span className="text-5xl">{contractor.image}</span>
        : (
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                {contractor.name?.slice(0, 2).toUpperCase()}
            </div>
        );

    return (
        <>
            <div className="bg-white rounded-xl shadow-md p-6 card-hover transition">
                <div className="flex items-start gap-4">
                    <div className="shrink-0">{avatar}</div>
                    <div className="flex-1">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    {contractor.name}
                                    {contractor.verified && (
                                        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full flex items-center">
                                            <i className="fas fa-check-circle mr-1"></i>Verified
                                        </span>
                                    )}
                                </h3>
                                <p className="text-gray-500 text-sm">{contractor.service} • {contractor.location}</p>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center text-yellow-500 justify-end">
                                    <i className="fas fa-star mr-1"></i>
                                    <span className="font-bold text-gray-800">{contractor.rating ?? 'New'}</span>
                                    <span className="text-gray-400 text-sm ml-1">({contractor.reviews ?? 0})</span>
                                </div>
                                <p className="text-sm text-gray-500">{contractor.completed_jobs ?? 0} jobs done</p>
                            </div>
                        </div>
                        <p className="text-gray-600 mt-2 text-sm line-clamp-2">{contractor.description || 'No description provided.'}</p>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-4">
                                <span className="text-blue-600 font-semibold">{contractor.price ?? 'Rate on request'}</span>
                                <span className={`flex items-center text-sm ${contractor.available ? 'text-green-600' : 'text-gray-400'}`}>
                                    <span className={`w-2 h-2 rounded-full ${contractor.available ? 'bg-green-500 pulse-dot' : 'bg-gray-400'} mr-2`}></span>
                                    {contractor.available ? 'Available' : 'Busy'}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowProfile(true)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
                                >
                                    View Profile
                                </button>
                                <button
                                    onClick={() => onBook(contractor)}
                                    disabled={!contractor.available}
                                    className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm ${!contractor.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Modal */}
            {showProfile && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowProfile(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="shrink-0">{avatar}</div>
                                <div>
                                    <h2 className="text-xl font-bold">{contractor.name}</h2>
                                    <p className="text-gray-500 text-sm">{contractor.service}</p>
                                    {contractor.verified && (
                                        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full inline-flex items-center mt-1">
                                            <i className="fas fa-check-circle mr-1"></i>Verified Pro
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button onClick={() => setShowProfile(false)} className="text-gray-400 hover:text-gray-600 text-xl">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <div className="space-y-3 text-sm mb-6">
                            <div className="flex items-center gap-2 text-gray-600">
                                <i className="fas fa-map-marker-alt text-blue-500 w-4"></i>
                                <span>{contractor.location ?? 'Location not set'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <i className="fas fa-star text-yellow-500 w-4"></i>
                                <span>{contractor.rating ?? 'New'} rating • {contractor.reviews ?? 0} reviews</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <i className="fas fa-briefcase text-blue-500 w-4"></i>
                                <span>{contractor.completed_jobs ?? 0} jobs completed</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <i className="fas fa-clock text-green-500 w-4"></i>
                                <span>{contractor.available ? 'Available for new work' : 'Currently busy'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <i className="fas fa-tag text-blue-500 w-4"></i>
                                <span>{contractor.price ?? 'Rate on request'}</span>
                            </div>
                        </div>

                        {contractor.description && (
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-700 mb-1">About</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{contractor.description}</p>
                            </div>
                        )}

                        <button
                            onClick={() => { setShowProfile(false); onBook(contractor); }}
                            disabled={!contractor.available}
                            className={`w-full py-3 rounded-xl font-semibold text-white transition ${contractor.available ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
                        >
                            {contractor.available ? 'Book This Pro' : 'Currently Unavailable'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
