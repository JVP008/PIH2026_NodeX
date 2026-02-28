'use client';

import { Suspense, useState, useCallback, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';
import { supabase } from '@/lib/supabaseClient';
import Modal from '@/components/ui/Modal';
import ContractorCard from './ContractorCard';

import { Contractor } from '@/types';

const services = ['All', 'Plumbing', 'Electrical', 'Cleaning', 'HVAC', 'Painting', 'Landscaping'];

function SkeletonCard() {
    return (
        <div className="bg-white border-3 border-black rounded-xl p-6 animate-pulse shadow-[4px_4px_0px_0px_#ccc]">
            <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-200 border-2 border-gray-300 rounded-full mr-4"></div>
                <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="flex gap-2">
                <div className="h-9 bg-gray-200 rounded flex-1"></div>
                <div className="h-9 bg-gray-200 rounded flex-1"></div>
            </div>
        </div>
    );
}

function ContractorListContent({ initialContractors }: { initialContractors: Contractor[] }) {
    const searchParams = useSearchParams();
    const { showToast } = useToast();

    const serviceParam = searchParams.get('service');
    const [activeFilter, setActiveFilter] = useState(
        serviceParam ? services.find(s => s.toLowerCase() === serviceParam.toLowerCase()) || 'All' : 'All'
    );
    const [contractors, setContractors] = useState<Contractor[]>(initialContractors);
    const [loading, setLoading] = useState(initialContractors.length === 0);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState('rating');

    const [searchQuery, setSearchQuery] = useState('');

    // Schedule Modal
    const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    useEffect(() => {
        if (initialContractors.length === 0) {
            fetchContractors();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialContractors.length]);

    const fetchContractors = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error: fetchError } = await supabase.from('contractors').select('*');
            if (fetchError) throw fetchError;
            setContractors(data || []);
        } catch {
            setError('Failed to load contractors. Please try again.');
            showToast('Error loading contractors', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = useCallback((service: string) => {
        setActiveFilter(service);
    }, []);

    const filtered = useMemo(
        () =>
            contractors
                .filter(c => activeFilter === 'All' || c.service === activeFilter)
                .filter(c => {
                    if (!searchQuery) return true;
                    const q = searchQuery.toLowerCase();
                    return (c.name || '').toLowerCase().includes(q) || (c.location || '').toLowerCase().includes(q);
                })
                .sort((a, b) => {
                    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
                    if (sortBy === 'reviews') return (b.reviews || 0) - (a.reviews || 0);
                    if (sortBy === 'jobs') return (b.completed_jobs || 0) - (a.completed_jobs || 0);
                    return 0;
                }),
        [contractors, activeFilter, searchQuery, sortBy]
    );

    const handleBook = (contractor: Contractor) => {
        setSelectedContractor(contractor);
        setIsScheduleModalOpen(true);
    };

    const confirmBooking = async () => {
        if (!bookingDate || !bookingTime || !selectedContractor) {
            showToast('Please select date and time', 'error');
            return;
        }

        const user = (await supabase.auth.getUser()).data.user;

        const { error: bookingError } = await supabase
            .from('bookings')
            .insert([{
                contractor_id: parseInt(selectedContractor.id) || null,
                date: bookingDate,
                time: bookingTime,
                status: 'upcoming',
                price: parseInt((selectedContractor.price || '0').replace(/[^0-9]/g, '')) || 500,
                user_id: user?.id || null
            }]);

        if (bookingError) {
            console.error('Booking insert issue:', bookingError.message);
            showToast('Failed to book pro. Please try again.', 'error');
            return;
        }

        setIsScheduleModalOpen(false);
        setBookingDate('');
        setBookingTime('');
        showToast(`Booking confirmed! ${selectedContractor.name} will contact you shortly.`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-4xl font-black uppercase tracking-tight mb-6 text-center">Find Your Pro</h2>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-6">
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name or city (e.g. Ravi, Mumbai...)"
                        className="w-full pl-11 pr-4 py-3 border-3 border-black rounded-xl font-bold bg-white shadow-[4px_4px_0px_0px_#000] focus:outline-none focus:shadow-[6px_6px_0px_0px_#000] transition-all placeholder:font-medium placeholder:text-gray-400"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-gray-400 hover:text-black">✕</button>
                    )}
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
                {services.map(service => (
                    <button
                        key={service}
                        onClick={() => handleFilter(service)}
                        className={`px-4 py-2 border-2 border-black rounded-lg font-bold transition-all shadow-[2px_2px_0px_0px_#000] ${activeFilter === service ? 'bg-yellow-300 text-black translate-y-[-1px] shadow-[3px_3px_0px_0px_#000]' : 'bg-white text-black hover:bg-gray-50'}`}
                    >
                        {service}
                    </button>
                ))}
            </div>

            {/* Sort */}
            <div className="flex justify-end mb-6">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border-2 border-black rounded-lg font-bold bg-white shadow-[2px_2px_0px_0px_#000]"
                >
                    <option value="rating">Sort by Rating</option>
                    <option value="reviews">Sort by Reviews</option>
                    <option value="jobs">Sort by Completed Jobs</option>
                </select>
            </div>

            {/* Error State */}
            {error && (
                <div className="bg-red-100 border-3 border-black rounded-xl p-6 text-center mb-6 shadow-[4px_4px_0px_0px_#000]">
                    <i className="fas fa-exclamation-triangle text-3xl text-red-500 mb-2"></i>
                    <p className="text-black font-bold text-lg">{error}</p>
                    <button onClick={fetchContractors} className="mt-3 px-4 py-2 bg-white border-2 border-black rounded-lg font-bold shadow-[2px_2px_0px_0px_#000] hover:translate-y-[-1px] transition-all">
                        Try Again
                    </button>
                </div>
            )}

            {/* Loading Skeleton */}
            {loading && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
            )}

            {/* Contractor Grid */}
            {!loading && !error && (
                <>
                    <p className="text-center text-black font-bold mb-4">{filtered.length} professionals found</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map(contractor => (
                            <ContractorCard key={contractor.id} contractor={contractor} onBook={() => handleBook(contractor)} />
                        ))}
                    </div>
                    {filtered.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-2xl font-black text-gray-400 mb-2">No pros found</p>
                            <p className="text-gray-500 font-medium">Try a different category or check back later</p>
                        </div>
                    )}
                </>
            )}

            {/* Booking Modal */}
            <Modal
                isOpen={isScheduleModalOpen}
                onClose={() => setIsScheduleModalOpen(false)}
                title="Schedule Appointment"
            >
                <div className="flex items-center mb-6 pb-6 border-b-2 border-dashed border-gray-300">
                    <div className="text-5xl mr-4 filter drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">{selectedContractor?.image}</div>
                    <div>
                        <h4 className="font-black text-xl">{selectedContractor?.name}</h4>
                        <p className="text-black font-medium">{selectedContractor?.service} • {selectedContractor?.price}</p>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-black font-black mb-2 uppercase">Select Date</label>
                    <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-3 bg-white border-3 border-black rounded-lg focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-black font-black mb-2 uppercase">Select Time Slot</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['Morning (9AM–12PM)', 'Afternoon (12PM–5PM)', 'Evening (5PM–8PM)'].map((slot) => (
                            <button
                                key={slot}
                                onClick={() => setBookingTime(slot)}
                                className={`p-3 text-sm border-2 border-black rounded-lg font-bold transition-all ${bookingTime === slot ? 'bg-blue-400 text-black shadow-[2px_2px_0px_0px_#000]' : 'bg-white hover:bg-gray-50'}`}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={confirmBooking}
                    className="w-full bg-green-400 text-black border-3 border-black py-4 rounded-lg font-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] hover:bg-green-500 transition-all text-xl uppercase"
                >
                    Confirm Booking
                </button>
            </Modal>
        </div>
    );
}

export default function ContractorList({ initialContractors }: { initialContractors: Contractor[] }) {
    return (
        <Suspense fallback={
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h2 className="text-4xl font-black uppercase tracking-tight mb-6 text-center">Find Your Pro</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
            </div>
        }>
            <ContractorListContent initialContractors={initialContractors} />
        </Suspense>
    );
}
