'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';
import { supabase } from '@/lib/supabaseClient';
import DisputeCard from '@/components/disputes/DisputeCard';

interface Dispute {
  id: string;
  name: string | null;
  email: string | null;
  type: string;
  description: string;
  status: string | null;
  created_at: string;
}

/**
 * DisputesPage Component
 *
 * This page allows users to report issues with a booking (like a no-show or poor quality work).
 * It features a form to submit a new dispute and a list showing recently submitted disputes.
 */
export default function DisputesPage() {
  const { showToast } = useToast();
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    bookingId: '',
    type: 'quality',
    description: '',
  });

  useEffect(() => {
    fetchDisputes();
  }, []);

  // This function retrieves the 10 most recent disputes from the database.
  const fetchDisputes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('disputes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      if (error) throw error;
      setDisputes(data || []);
    } catch {
      showToast('Failed to load disputes', 'error');
    } finally {
      setLoading(false);
    }
  };

  // This function runs when the user clicks "Submit Dispute".
  // It validates the form, saves the dispute to the database, and clears the form upon success.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.type || !form.description) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from('disputes').insert([
        {
          name: form.name,
          email: form.email || null,
          booking_id: form.bookingId || null,
          type: form.type,
          description: form.description,
        },
      ]);

      if (error) throw error;
      showToast('Dispute submitted! Our team will review it within 24 hours.');
      setForm({ name: '', email: '', bookingId: '', type: 'quality', description: '' });
      fetchDisputes();
    } catch {
      showToast('Failed to submit dispute', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="text-black font-bold hover:underline decoration-2 decoration-black underline-offset-2 mb-4 inline-block"
      >
        &larr; Back to Home
      </Link>
      <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Report an Issue</h1>
      <p className="text-black font-medium text-lg mb-8">
        Have a problem with a booking? Let us know and we&apos;ll resolve it within 24 hours.
      </p>

      {/* Dispute Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_#000] p-8 mb-12"
      >
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-black font-black mb-2 uppercase">Your Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 bg-white border-3 border-black rounded-lg focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-black font-black mb-2 uppercase">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 bg-white border-3 border-black rounded-lg focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-black font-black mb-2 uppercase">
              Booking ID (Optional)
            </label>
            <input
              type="text"
              value={form.bookingId}
              onChange={(e) => setForm({ ...form, bookingId: e.target.value })}
              className="w-full p-3 bg-white border-3 border-black rounded-lg focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold"
              placeholder="Your booking ID"
            />
          </div>
          <div>
            <label className="block text-black font-black mb-2 uppercase">Issue Type *</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full p-3 bg-white border-3 border-black rounded-lg focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold"
            >
              <option value="quality">Poor Quality Work</option>
              <option value="noshow">Contractor No-Show</option>
              <option value="refund">Refund Request</option>
              <option value="payment">Payment Issue</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-black font-black mb-2 uppercase">
            Describe Your Issue *
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={5}
            className="w-full p-3 bg-white border-3 border-black rounded-lg focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-all font-medium"
            placeholder="Please describe the issue in detail..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-red-400 text-black border-3 border-black py-4 rounded-lg font-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] hover:bg-red-500 transition-all text-xl uppercase disabled:opacity-70"
        >
          {submitting ? (
            <span>
              <i className="fas fa-spinner fa-spin mr-2"></i> Submitting...
            </span>
          ) : (
            <>
              <i className="fas fa-flag mr-2"></i> Submit Dispute
            </>
          )}
        </button>
      </form>

      {/* Recent Disputes */}
      <h2 className="text-2xl font-black uppercase tracking-tight mb-4">Recent Disputes</h2>
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white border-3 border-black rounded-xl p-4 animate-pulse shadow-[3px_3px_0px_0px_#ccc]"
            >
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : disputes.length > 0 ? (
        <div className="space-y-3">
          {disputes.map((dispute) => (
            <DisputeCard key={dispute.id} dispute={dispute} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 font-bold text-center py-8">No disputes filed yet</p>
      )}
    </div>
  );
}
