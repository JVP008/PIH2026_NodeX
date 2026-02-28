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

// eslint-disable-next-line @typescript-eslint/no-explicit-any

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
            showToast('Please select date and time', 'error');
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
        showToast('Booking confirmed!');
        setTimeout(() => router.push('/bookings'), 1500);
    };

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Filters */}
            <div className="md:w-64 shrink-0">
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                    <h3 className="font-bold text-lg mb-4">Filters</h3>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                        <select
                            value={filters.service}
                            onChange={(e) => handleFilterChange('service', e.target.value)}
                            className="w-full p-2 border rounded-lg"
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

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                        <select
                            value={filters.rating}
                            onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="0">Any Rating</option>
                            <option value="4.5">4.5+ Stars</option>
                            <option value="4">4+ Stars</option>
                            <option value="3.5">3.5+ Stars</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={filters.available}
                                    onChange={(e) => handleFilterChange('available', e.target.checked)}
                                    className="mr-2"
                                />
                                <span className="text-sm">Available Now</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={filters.verified}
                                    onChange={(e) => handleFilterChange('verified', e.target.checked)}
                                    className="mr-2"
                                />
                                <span className="text-sm">Verified Pro</span>
                            </label>
                        </div>
                    </div>

                    <button onClick={resetFilters} className="w-full text-blue-600 py-2 text-sm hover:underline">Reset Filters</button>
                </div>
            </div>

            {/* Contractor List */}
            <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Find Pros Near You</h2>
                    <span className="text-gray-500">{contractors.length} pro{contractors.length !== 1 ? 's' : ''} found</span>
                </div>
                <div className="grid gap-6">
                    {contractors.length > 0 ? contractors.map((c) => (
                        <ContractorCard key={c.id} contractor={c} onBook={handleBook} />
                    )) : (
                        <div className="text-center py-16 bg-white rounded-xl shadow-md">
                            <i className="fas fa-hard-hat text-5xl text-gray-300 mb-4"></i>
                            <h3 className="text-lg font-semibold text-gray-500 mb-2">No pros found</h3>
                            <p className="text-gray-400 text-sm">Try changing your filters, or check back later as new professionals join.</p>
                        </div>
                    )}
                </div>
            </div>

            <Modal
                isOpen={isScheduleModalOpen}
                onClose={() => setIsScheduleModalOpen(false)}
                title="Schedule Appointment"
            >
                <div className="flex items-center mb-6 pb-6 border-b">
                    <div className="text-4xl mr-4">{selectedContractor?.image}</div>
                    <div>
                        <h4 className="font-bold text-lg">{selectedContractor?.name}</h4>
                        <p className="text-gray-500">{selectedContractor?.service} • {selectedContractor?.price}</p>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Select Date</label>
                    <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Select Time Slot</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map((slot) => (
                            <button
                                key={slot}
                                onClick={() => setBookingTime(slot)}
                                className={`p-2 text-sm border rounded-lg ${bookingTime === slot ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-500 hover:bg-blue-50'}`}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={confirmBooking}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                    Confirm Booking
                </button>
            </Modal>
        </div>
    );
}
