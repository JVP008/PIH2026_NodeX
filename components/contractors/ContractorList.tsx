'use client';

import { Suspense, useState, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';
import { supabase } from '@/lib/supabaseClient';
import ContractorCard from './ContractorCard';
import BookingModal from './BookingModal';

import { Contractor } from '@/types';

const services = [
  'All',
  'Plumbing',
  'Electrical',
  'Cleaning',
  'HVAC',
  'Painting',
  'Landscaping',
  'Tailor',
];

function SkeletonCard() {
  // Placeholder card shown while real contractor data is still loading.
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

/**
 * ContractorListContent Component
 *
 * This is the main engine for finding professionals. It takes a list of contractors and:
 * 1. Lets the user search them by name or city.
 * 2. Lets the user filter them by service category (Plumbing, Cleaning, etc.).
 * 3. Sorts them by highest rating or most jobs completed.
 * 4. Handles the pop-up modal when a user wants to book an appointment.
 */
function ContractorListContent({ initialContractors }: { initialContractors: Contractor[] }) {
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const serviceParam = searchParams.get('service');
  const [activeFilter, setActiveFilter] = useState(
    serviceParam
      ? services.find((s) => s.toLowerCase() === serviceParam.toLowerCase()) || 'All'
      : 'All'
  );
  const [contractors, setContractors] = useState<Contractor[]>(initialContractors);
  const [loading, setLoading] = useState(initialContractors.length === 0);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('rating');

  const [searchQuery, setSearchQuery] = useState('');

  // These values control the booking popup
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const fetchContractors = useCallback(async () => {
    // Reload contractors from database.
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
  }, [showToast]);

  useEffect(() => {
    // Keep component state in sync with server-side prop changes (caused by router.refresh())
    if (initialContractors.length > 0) {
      setContractors(initialContractors);
      setLoading(false);
      setError(null);
    } else {
      // Only fetch from browser if server did not provide initial data at all.
      fetchContractors();
    }
  }, [initialContractors, fetchContractors]);

  const handleFilter = useCallback((service: string) => {
    setActiveFilter(service);
  }, []);

  const filtered = useMemo(
    // Build the visible list using active category, search text, and sort option.
    () =>
      contractors
        .filter(
          (c) => activeFilter === 'All' || c.service?.toLowerCase() === activeFilter.toLowerCase()
        )
        .filter((c) => {
          if (!searchQuery) return true;
          const q = searchQuery.toLowerCase();
          return (
            (c.name || '').toLowerCase().includes(q) || (c.location || '').toLowerCase().includes(q)
          );
        })
        .sort((a, b) => {
          if (sortBy === 'rating') return (Number(b.rating) || 0) - (Number(a.rating) || 0);
          if (sortBy === 'reviews') return (Number(b.reviews) || 0) - (Number(a.reviews) || 0);
          if (sortBy === 'jobs')
            return (Number(b.completed_jobs) || 0) - (Number(a.completed_jobs) || 0);
          return 0;
        }),
    [contractors, activeFilter, searchQuery, sortBy]
  );

  const handleBook = (contractor: Contractor) => {
    // Open booking modal for the chosen contractor.
    setSelectedContractor(contractor);
    setIsScheduleModalOpen(true);
  };

  const handleBookingSuccess = useCallback((contractorId: number) => {
    // Update list state immediately so the badge/button reflect latest availability.
    setContractors((prev) =>
      prev.map((contractor) =>
        Number(contractor.id) === contractorId ? { ...contractor, available: false } : contractor
      )
    );
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-black uppercase tracking-tight mb-6 text-center">
        Find Your Pro
      </h2>

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
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-gray-400 hover:text-black"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {services.map((service) => (
          <button
            key={service}
            onClick={() => handleFilter(service)}
            className={`px-4 py-2 border-2 border-black rounded-lg font-bold transition-all shadow-[2px_2px_0px_0px_#000] ${activeFilter === service ? 'bg-yellow-300 text-black translate-y-[-1px] shadow-[3px_3px_0px_0px_#000]' : 'bg-white text-black hover:bg-gray-50'}`}
          >
            {service}
          </button>
        ))}
      </div>

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

      {error && (
        <div className="bg-red-100 border-3 border-black rounded-xl p-6 text-center mb-6 shadow-[4px_4px_0px_0px_#000]">
          <i className="fas fa-exclamation-triangle text-3xl text-red-500 mb-2"></i>
          <p className="text-black font-bold text-lg">{error}</p>
          <button
            onClick={fetchContractors}
            className="mt-3 px-4 py-2 bg-white border-2 border-black rounded-lg font-bold shadow-[2px_2px_0px_0px_#000] hover:translate-y-[-1px] transition-all"
          >
            Try Again
          </button>
        </div>
      )}

      {loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!loading && !error && (
        <>
          <p className="text-center text-black font-bold mb-4">
            {filtered.length} professionals found
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((contractor) => (
              <ContractorCard
                key={contractor.id}
                contractor={contractor}
                onBook={() => handleBook(contractor)}
              />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-2xl font-black text-gray-400 mb-2">No pros found</p>
              <p className="text-gray-500 font-medium">
                Try a different category or check back later
              </p>
            </div>
          )}
        </>
      )}

      <BookingModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        contractor={selectedContractor}
        onSuccess={handleBookingSuccess}
      />
    </div>
  );
}

export default function ContractorList({
  initialContractors,
}: {
  initialContractors: Contractor[];
}) {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-4xl font-black uppercase tracking-tight mb-6 text-center">
            Find Your Pro
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      }
    >
      <ContractorListContent initialContractors={initialContractors} />
    </Suspense>
  );
}
