'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';
import { supabase } from '@/lib/supabaseClient';
import Modal from '@/components/ui/Modal';
import { Contractor } from '@/types';

// Moved outside to avoid recreation
const TIME_SLOTS = ['Morning (9AM–12PM)', 'Afternoon (12PM–5PM)', 'Evening (5PM–8PM)'];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractor: Contractor | null;
  onSuccess: (contractorId: number) => void;
}

/**
 * BookingModal Component
 *
 * This modal handles the scheduling details (date and time)
 * and submits the booking request to the backend.
 */
export default function BookingModal({
  isOpen,
  onClose,
  contractor,
  onSuccess,
}: BookingModalProps) {
  const { showToast } = useToast();
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const confirmBooking = async () => {
    // Require both date and time before sending booking request
    if (!bookingDate || !bookingTime || !contractor) {
      showToast('Please select date and time', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const contractorId = Number.parseInt(contractor.id, 10);
      if (!Number.isInteger(contractorId) || contractorId <= 0) {
        throw new Error('Invalid contractor selected.');
      }

      // Read signed-in user so booking can be linked to that account
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const user = userData.user;

      const bookingResponse = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractor_id: contractorId,
          date: bookingDate,
          time: bookingTime,
          status: 'upcoming',
          price: Number.parseInt((contractor.price || '0').replace(/[^0-9]/g, ''), 10) || 500,
          user_id: user?.id || null,
        }),
      });

      const bookingResult = await bookingResponse.json();
      if (!bookingResponse.ok) {
        throw new Error(bookingResult.error || 'Failed to create booking');
      }

      showToast(`Booking confirmed! Redirecting to your bookings...`);

      // Notify parent of success, wait a small delay, then redirect
      onSuccess(contractorId);

      setTimeout(() => {
        onClose();
        setBookingDate('');
        setBookingTime('');
        setIsSubmitting(false);
        window.location.href = '/bookings';
      }, 1000);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to book pro. Please try again.';
      showToast(errorMsg, 'error');
      setIsSubmitting(false);
    }
  };

  // Prevent rendering internals if contractor is null but modal happened to be open
  if (!contractor) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule Appointment">
      <div className="flex items-center mb-6 pb-6 border-b-2 border-dashed border-gray-300">
        <div className="text-5xl mr-4 filter drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
          {contractor.image || '👷‍♂️'}
        </div>
        <div>
          <h4 className="font-black text-xl">{contractor.name}</h4>
          <p className="text-black font-medium">
            {contractor.service} • {contractor.price}
          </p>
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
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              onClick={() => setBookingTime(slot)}
              className={`p-3 text-sm border-2 border-black rounded-lg font-bold transition-all ${
                bookingTime === slot
                  ? 'bg-blue-400 text-black shadow-[2px_2px_0px_0px_#000]'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={confirmBooking}
        disabled={isSubmitting}
        className="w-full bg-green-400 text-black border-3 border-black py-4 rounded-lg font-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] hover:bg-green-500 active:translate-y-[2px] active:shadow-none transition-all text-xl uppercase disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
      >
        {isSubmitting ? (
          <>
            <i className="fas fa-spinner fa-spin"></i> Processing...
          </>
        ) : (
          'Confirm Booking'
        )}
      </button>
    </Modal>
  );
}
