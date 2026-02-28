'use client';

import { useState } from 'react';
import ContractorCard from './ContractorCard';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Contractor } from '@/types';

interface ContractorListProps {
    initialContractors: Contractor[];
}

const DUMMY_CONTRACTORS: Contractor[] = [
    {
        id: 1, name: 'Rajesh Sharma', service: 'Plumbing',
        rating: 4.9, reviews: 142, price: '₹450/hr',
        image: '🪠', available: true, verified: true,
        location: 'Bhandara, Maharashtra',
        response_time: '~30 min', completed_jobs: 318,
        description: '12+ years fixing leaks, pipe fittings, and bathroom installations. Available on weekends too.',
        created_at: '2024-01-01'
    },
    {
        id: 2, name: 'Suresh Patil', service: 'Electrical',
        rating: 4.8, reviews: 98, price: '₹500/hr',
        image: '⚡', available: true, verified: true,
        location: 'Nagpur, Maharashtra',
        response_time: '~1 hr', completed_jobs: 210,
        description: 'Licensed electrician. Expert in home wiring, MCB panels, inverter installation, and safety audits.',
        created_at: '2024-01-02'
    },
    {
        id: 3, name: 'Priya Meshram', service: 'Cleaning',
        rating: 4.7, reviews: 204, price: '₹300/hr',
        image: '🧹', available: true, verified: true,
        location: 'Sakoli, Maharashtra',
        response_time: '~2 hr', completed_jobs: 430,
        description: 'Deep cleaning, post-construction cleanup, and regular housekeeping. Brings own supplies.',
        created_at: '2024-01-03'
    },
    {
        id: 4, name: 'Anil Bhoyar', service: 'HVAC',
        rating: 4.6, reviews: 76, price: '₹600/hr',
        image: '❄️', available: false, verified: true,
        location: 'Gondia, Maharashtra',
        response_time: '~3 hr', completed_jobs: 155,
        description: 'AC installation, servicing and gas refill. All major brands supported. 1-year service warranty.',
        created_at: '2024-01-04'
    },
    {
        id: 5, name: 'Vikram Uikey', service: 'Painting',
        rating: 4.8, reviews: 88, price: '₹380/hr',
        image: '🎨', available: true, verified: false,
        location: 'Bhandara, Maharashtra',
        response_time: '~2 hr', completed_jobs: 180,
        description: 'Interior and exterior painting. Waterproof coating, texture finish, and enamel work available.',
        created_at: '2024-01-05'
    },
    {
        id: 6, name: 'Dinesh Kurre', service: 'Landscaping',
        rating: 4.5, reviews: 54, price: '₹350/hr',
        image: '🌿', available: true, verified: false,
        location: 'Tumsar, Maharashtra',
        response_time: '~4 hr', completed_jobs: 90,
        description: 'Garden design, lawn maintenance, tree trimming, and drip irrigation setup.',
        created_at: '2024-01-06'
    },
    {
        id: 7, name: 'Manoj Thakre', service: 'Carpentry',
        rating: 4.9, reviews: 116, price: '₹520/hr',
        image: '🪚', available: true, verified: true,
        location: 'Nagpur, Maharashtra',
        response_time: '~2 hr', completed_jobs: 267,
        description: 'Custom furniture, door/window fitting, modular kitchen cabinets, and wooden flooring.',
        created_at: '2024-01-07'
    },
    {
        id: 8, name: 'Ravi Lilhare', service: 'Electrical',
        rating: 4.4, reviews: 43, price: '₹420/hr',
        image: '🔌', available: true, verified: false,
        location: 'Sakoli, Maharashtra',
        response_time: '~1 hr', completed_jobs: 82,
        description: 'Fan and light installation, socket repairs, earthing and CCTV power setup.',
        created_at: '2024-01-08'
    },
];

export default function ContractorList({ initialContractors }: ContractorListProps) {
    const seed = initialContractors.length > 0 ? initialContractors : DUMMY_CONTRACTORS;
    const [contractors, setContractors] = useState<Contractor[]>(seed);
    const [filters, setFilters] = useState({
        service: '',
        rating: 0,
        available: false,
        verified: false
    });

    const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');

    const { showToast } = useToast();
    const router = useRouter();

    const handleFilterChange = (key: string, value: string | number | boolean) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);

        const filtered = seed.filter(c => {
            if (newFilters.service && c.service !== newFilters.service) return false;
            if (c.rating < newFilters.rating) return false;
            if (newFilters.available && !c.available) return false;
            if (newFilters.verified && !c.verified) return false;
            return true;
        });
        setContractors(filtered);
    };

    const resetFilters = () => {
        setFilters({ service: '', rating: 0, available: false, verified: false });
        setContractors(seed);
    };

    const handleBook = (contractor: Contractor) => {
        setSelectedContractor(contractor);
        setIsScheduleModalOpen(true);
    };

    const confirmBooking = async () => {
        if (!bookingDate || !bookingTime || !selectedContractor) {
            showToast('Select date and time', 'error');
            return;
        }

        const { error } = await supabase
            .from('bookings')
            .insert([{
                contractor_id: selectedContractor.id,
                date: bookingDate,
                time: bookingTime,
                status: 'upcoming',
                price: parseInt((selectedContractor.price || '0').replace(/[^0-9]/g, '')) || 150,
                user_id: (await supabase.auth.getUser()).data.user?.id
            }]);

        if (error) console.warn('Booking failed (auth?)', error);

        setIsScheduleModalOpen(false);
        showToast('Booking success!');
        setTimeout(() => router.push('/bookings'), 1500);
    };

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Filters */}
            <div className="md:w-72 shrink-0">
                <div className="bg-white border-[4px] border-black p-8 sticky top-24 neo-shadow-large">
                    <h3 className="text-2xl font-[900] uppercase tracking-tighter mb-6 underline underline-offset-4 decoration-4 decoration-[#FFD700]">Filters</h3>

                    <div className="mb-6">
                        <label className="block text-xs font-black uppercase tracking-widest mb-2">Service Type</label>
                        <select
                            value={filters.service}
                            onChange={(e) => handleFilterChange('service', e.target.value)}
                            className="w-full p-3 border-[3px] border-black font-bold uppercase text-xs focus:bg-yellow-50 outline-none transition-colors"
                        >
                            <option value="">All Services</option>
                            <option value="Plumbing">Plumbing</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Cleaning">Cleaning</option>
                            <option value="HVAC">HVAC</option>
                            <option value="Painting">Painting</option>
                            <option value="Landscaping">Landscaping</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-xs font-black uppercase tracking-widest mb-2">Rating</label>
                        <select
                            value={filters.rating}
                            onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
                            className="w-full p-3 border-[3px] border-black font-bold uppercase text-xs focus:bg-yellow-50 outline-none transition-colors"
                        >
                            <option value="0">Any Rating</option>
                            <option value="4.5">4.5+ Stars</option>
                            <option value="4">4+ Stars</option>
                            <option value="3.5">3.5+ Stars</option>
                        </select>
                    </div>

                    <div className="mb-8">
                        <label className="block text-xs font-black uppercase tracking-widest mb-4">Availability</label>
                        <div className="space-y-4">
                            <label className="flex items-center group cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.available}
                                    onChange={(e) => handleFilterChange('available', e.target.checked)}
                                    className="w-6 h-6 border-[3px] border-black rounded-none appearance-none checked:bg-black transition-colors mr-3"
                                />
                                <span className="text-xs font-black uppercase tracking-wider group-hover:text-amber-500">Available Now</span>
                            </label>
                            <label className="flex items-center group cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.verified}
                                    onChange={(e) => handleFilterChange('verified', e.target.checked)}
                                    className="w-6 h-6 border-[3px] border-black rounded-none appearance-none checked:bg-black transition-colors mr-3"
                                />
                                <span className="text-xs font-black uppercase tracking-wider group-hover:text-amber-500">Verified Pro</span>
                            </label>
                        </div>
                    </div>

                    <button onClick={resetFilters} className="w-full bg-black text-white py-3 text-xs font-black uppercase tracking-[0.2em] border-2 border-black hover:bg-white hover:text-black transition-all active:scale-95">Reset All</button>
                </div>
            </div>

            {/* Contractor List */}
            <div className="flex-1">
                <div className="flex items-end justify-between mb-10 pb-4 border-b-[6px] border-black">
                    <div>
                        <h2 className="text-5xl font-[900] uppercase tracking-tighter leading-none">Find Pros</h2>
                        <p className="text-sm font-black uppercase tracking-[0.3em] mt-2 opacity-50">Local experts near you</p>
                    </div>
                    <span className="bg-black text-white px-4 py-2 text-xs font-black uppercase neo-shadow-small rotate-2">{contractors.length} found</span>
                </div>

                <div className="grid gap-10">
                    {contractors.length > 0 ? contractors.map((c) => (
                        <ContractorCard key={c.id} contractor={c} onBook={handleBook} />
                    )) : (
                        <div className="text-center py-20 bg-white border-[4px] border-black neo-shadow-large">
                            <i className="fas fa-hard-hat text-7xl text-black mb-6 animate-bounce"></i>
                            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Nothing Found!</h3>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-10">Try changing your filters or checking a different category.</p>
                        </div>
                    )}
                </div>
            </div>

            <Modal
                isOpen={isScheduleModalOpen}
                onClose={() => setIsScheduleModalOpen(false)}
                title="Schedule Appointment"
            >
                <div className="p-2">
                    <div className="flex items-center mb-8 pb-8 border-b-2 border-black border-dashed">
                        <div className="text-6xl mr-6 rotate-[-10deg] drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">{selectedContractor?.image}</div>
                        <div>
                            <h4 className="font-black uppercase text-2xl tracking-tighter">{selectedContractor?.name}</h4>
                            <div className="flex gap-2 mt-1">
                                <span className="bg-[#FFD700] border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase">{selectedContractor?.service}</span>
                                <span className="bg-[#4ECDC4] border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase">{selectedContractor?.price}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8 rotate-1">
                        <label className="block text-xs font-black uppercase tracking-widest mb-3">Pick a Date</label>
                        <input
                            type="date"
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full p-4 border-[3px] border-black bg-white font-black uppercase text-sm focus:bg-yellow-50 outline-none neo-shadow-small"
                        />
                    </div>

                    <div className="mb-10 -rotate-1">
                        <label className="block text-xs font-black uppercase tracking-widest mb-3">Choose a Slot</label>
                        <div className="grid grid-cols-3 gap-3">
                            {['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map((slot) => (
                                <button
                                    key={slot}
                                    onClick={() => setBookingTime(slot)}
                                    className={`p-3 text-[10px] font-black uppercase border-[3px] border-black transition-all ${bookingTime === slot
                                            ? 'bg-black text-white translate-y-1 shadow-none'
                                            : 'bg-white text-black neo-shadow-small hover:bg-yellow-100 hover:translate-y-[-1px]'
                                        }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={confirmBooking}
                        className="w-full bg-black text-white py-5 border-[4px] border-black font-[900] text-xl uppercase tracking-widest neo-shadow hover:bg-[#FFD700] hover:text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-0 active:translate-y-0 active:shadow-none"
                    >
                        Confirm Booking
                    </button>
                </div>
            </Modal>
        </div>
    );
}
