'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';
import { supabase } from '@/lib/supabaseClient';
import Modal from '@/components/ui/Modal';
import BookingCard from '@/components/bookings/BookingCard';
import ReviewModal from '@/components/bookings/ReviewModal';

import { Booking } from '@/types';
import { Database } from '@/types/db';

type BookingStatus = Booking['status'];

type BookingRecord = Database['public']['Tables']['bookings']['Row'] & {
  contractor?: {
    name: string | null;
    image: string | null;
    service: string | null;
  } | null;
};

const ALLOWED_BOOKING_STATUSES: BookingStatus[] = ['upcoming', 'completed', 'cancelled', 'pending'];

const toBookingStatus = (status: string | null): BookingStatus => {
  if (status && ALLOWED_BOOKING_STATUSES.includes(status as BookingStatus)) {
    return status as BookingStatus;
  }
  return 'pending';
};

const normalizeBooking = (record: BookingRecord): Booking => ({
  ...record,
  status: toBookingStatus(record.status),
  contractor: record.contractor
    ? {
        name: record.contractor.name ?? 'Contractor',
        image: record.contractor.image,
        service: record.contractor.service,
      }
    : undefined,
  service: record.contractor?.service ?? undefined,
});

export default function BookingsPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const refreshContractorAvailability = useCallback(async (contractorId: string | null) => {
    if (!contractorId) return;

    // Contractor is available only if there are no upcoming/pending bookings for them.
    const { data: activeBookings, error: activeBookingsError } = await supabase
      .from('bookings')
      .select('id')
      .eq('contractor_id', contractorId)
      .in('status', ['upcoming', 'pending'])
      .limit(1);

    if (activeBookingsError) {
      throw activeBookingsError;
    }

    const shouldBeAvailable = !activeBookings || activeBookings.length === 0;

    const { error: availabilityUpdateError } = await supabase
      .from('contractors')
      .update({ available: shouldBeAvailable })
      .eq('id', contractorId);

    if (availabilityUpdateError) {
      throw availabilityUpdateError;
    }
  }, []);

  // Get the latest booking list from the database so the page stays up to date.
  const fetchBookings = useCallback(async () => {
    // Show loading placeholders while data is being requested.
    setLoading(true);
    try {
      // Always fetch all bookings for this demo so everyone can see the results of their actions.
      const { data, error } = await supabase
        .from('bookings')
        .select('*, contractor:contractors(name, image, service)')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const normalizedBookings = (data ?? []).map((record) => normalizeBooking(record));
      setBookings(normalizedBookings);
    } catch {
      // If anything fails, tell the user in plain language.
      showToast('Failed to load bookings. Please check your connection.', 'error');
    } finally {
      // Always stop loading, whether success or failure.
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    // Load bookings once when the page opens.
    fetchBookings();
  }, [fetchBookings]);

  const handleCancel = async (id: string) => {
    // Mark a booking as cancelled instead of deleting it, so records stay traceable.
    const { error } = await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', id);

    if (error) {
      showToast('Failed to cancel booking', 'error');
      return;
    }

    const cancelledBooking = bookings.find((booking) => booking.id === id);

    try {
      await refreshContractorAvailability(cancelledBooking?.contractor_id ?? null);
    } catch {
      // Keep user flow smooth even if availability refresh fails.
    }

    showToast('Booking cancelled successfully');
    fetchBookings();
  };

  const handlePay = (booking: Booking) => {
    // Save the booking user picked, then open the payment confirmation dialog.
    setSelectedBooking(booking);
    setPayModalOpen(true);
  };

  const handleReview = (booking: Booking) => {
    setSelectedBooking(booking);
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = async (rating: number, comment: string) => {
    if (!selectedBooking) return;

    try {
      const user = (await supabase.auth.getUser()).data.user;
      const { error } = await supabase.from('reviews').insert([
        {
          user_id: user?.id,
          contractor_id: selectedBooking.contractor_id,
          booking_id: selectedBooking.id,
          rating,
          comment,
        },
      ]);

      if (error) throw error;
      showToast('Thank you for your review!');
      fetchBookings();
    } catch (err) {
      showToast('Failed to submit review', 'error');
      throw err;
    }
  };

  const confirmPayment = async () => {
    // Nothing to process if no booking is selected.
    if (!selectedBooking) return;

    // Demo payment flow: switch booking status to completed.
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'completed' })
      .eq('id', selectedBooking.id);

    if (error) {
      showToast('Payment failed', 'error');
      return;
    }

    try {
      // 1. Refresh availability based on current upcoming/pending slots.
      await refreshContractorAvailability(selectedBooking.contractor_id);

      // 2. Increment completed job count without requiring custom DB RPC.
      if (selectedBooking.contractor_id) {
        const { data: contractorData, error: contractorFetchError } = await supabase
          .from('contractors')
          .select('completed_jobs')
          .eq('id', selectedBooking.contractor_id)
          .single();

        if (contractorFetchError) {
          throw contractorFetchError;
        }

        const currentCompletedJobs = Number(contractorData?.completed_jobs || 0);

        const { error: contractorUpdateError } = await supabase
          .from('contractors')
          .update({ completed_jobs: currentCompletedJobs + 1 })
          .eq('id', selectedBooking.contractor_id);

        if (contractorUpdateError) {
          throw contractorUpdateError;
        }
      }
    } catch {
      // Keep payment success flow uninterrupted even if secondary updates fail.
    }

    setPayModalOpen(false);
    showToast('Payment successful! (Demo)');
    // Reload bookings so the new status appears immediately.
    fetchBookings();
  };

  // Only show rows that match the selected tab (all/upcoming/completed/etc.).
  const filtered = bookings.filter((b) => filter === 'all' || b.status === filter);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="text-black font-bold hover:underline decoration-2 decoration-black underline-offset-2 mb-4 inline-block"
      >
        &larr; Back to Home
      </Link>
      <h1 className="text-4xl font-black uppercase tracking-tight mb-6">My Bookings</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'upcoming', 'completed', 'pending', 'cancelled'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 border-2 border-black rounded-lg font-bold capitalize transition-all shadow-[2px_2px_0px_0px_#000] ${filter === f ? 'bg-yellow-300 translate-y-[-1px] shadow-[3px_3px_0px_0px_#000]' : 'bg-white hover:bg-gray-50'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white border-3 border-black rounded-xl p-6 animate-pulse shadow-[4px_4px_0px_0px_#ccc]"
            >
              <div className="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      )}

      {!loading && (
        <div className="space-y-4">
          {filtered.length > 0 ? (
            filtered.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onPay={() => handlePay(booking)}
                onCancel={handleCancel}
                onReport={() => router.push('/disputes')}
                onReview={() => handleReview(booking)}
              />
            ))
          ) : (
            <div className="text-center py-16 bg-white border-3 border-black rounded-xl shadow-[4px_4px_0px_0px_#000]">
              <p className="text-2xl font-black text-gray-300 mb-2">
                No bookings {filter !== 'all' ? `with status "${filter}"` : 'yet'}
              </p>
              <Link href="/contractors" className="text-blue-600 font-bold hover:underline">
                Browse Pros →
              </Link>
            </div>
          )}
        </div>
      )}

      <Modal
        isOpen={payModalOpen}
        onClose={() => setPayModalOpen(false)}
        title="Pay Securely (Demo)"
      >
        <div className="text-center">
          <p className="text-lg font-medium text-black mb-4">
            Confirm payment of{' '}
            <span className="font-black text-2xl">₹{selectedBooking?.price || 0}</span> to{' '}
            <span className="font-black">{selectedBooking?.contractor?.name}</span>
          </p>
          <div className="bg-green-50 border-2 border-black rounded-lg p-4 mb-6 shadow-[2px_2px_0px_0px_#000]">
            <p className="text-sm font-bold text-gray-600">🔒 Secured by RazorPay (Demo Mode)</p>
          </div>
          <button
            onClick={confirmPayment}
            className="w-full bg-green-400 text-black border-3 border-black py-4 rounded-lg font-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] hover:bg-green-500 transition-all text-xl uppercase"
          >
            Pay ₹{selectedBooking?.price || 0}
          </button>
        </div>
      </Modal>

      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
        contractorName={selectedBooking?.contractor?.name || 'Contractor'}
      />
    </div>
  );
}
