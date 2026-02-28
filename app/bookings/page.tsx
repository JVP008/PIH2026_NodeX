'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';
import { supabase } from '@/lib/supabaseClient';
import Modal from '@/components/ui/Modal';

interface BookingRow {
    id: string;
    date: string;
    time: string;
    status: string | null;
    price: number | null;
    notes: string | null;
    contractor: { name: string; image: string } | null;
}

export default function BookingsPage() {
    const { showToast } = useToast();
    const [bookings, setBookings] = useState<BookingRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [payModalOpen, setPayModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<BookingRow | null>(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('bookings')
                .select('*, contractor:contractors(name, image)')
                .order('date', { ascending: false });

            if (error) throw error;
            setBookings(data || []);
        } catch {
            showToast('Failed to load bookings', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id: string) => {
        const { error } = await supabase
            .from('bookings')
            .update({ status: 'cancelled' })
            .eq('id', id);

        if (error) {
            showToast('Failed to cancel booking', 'error');
            return;
        }
        showToast('Booking cancelled successfully');
        fetchBookings();
    };

    const handlePay = (booking: BookingRow) => {
        setSelectedBooking(booking);
        setPayModalOpen(true);
    };

    const confirmPayment = async () => {
        if (!selectedBooking) return;
        const { error } = await supabase
            .from('bookings')
            .update({ status: 'completed' })
            .eq('id', selectedBooking.id);

        if (error) {
            showToast('Payment failed', 'error');
            return;
        }

        setPayModalOpen(false);
        showToast('Payment successful! (Demo)');
        fetchBookings();
    };

    const filtered = bookings.filter(b => filter === 'all' || b.status === filter);

    const statusColor: Record<string, string> = {
        upcoming: 'bg-blue-200',
        completed: 'bg-green-200',
        pending: 'bg-yellow-200',
        cancelled: 'bg-red-200',
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <Link href="/" className="text-black font-bold hover:underline decoration-2 decoration-black underline-offset-2 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl font-black uppercase tracking-tight mb-6">My Bookings</h1>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
                {['all', 'upcoming', 'completed', 'pending', 'cancelled'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 border-2 border-black rounded-lg font-bold capitalize transition-all shadow-[2px_2px_0px_0px_#000] ${filter === f ? 'bg-yellow-300 translate-y-[-1px] shadow-[3px_3px_0px_0px_#000]' : 'bg-white hover:bg-gray-50'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Loading */}
            {loading && (
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white border-3 border-black rounded-xl p-6 animate-pulse shadow-[4px_4px_0px_0px_#ccc]">
                            <div className="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        </div>
                    ))}
                </div>
            )}

            {/* Bookings List */}
            {!loading && (
                <div className="space-y-4">
                    {filtered.length > 0 ? filtered.map((booking) => (
                        <div key={booking.id} className="bg-white border-3 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#000] transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{booking.contractor?.image || '🔧'}</span>
                                    <div>
                                        <h3 className="font-black text-lg">{booking.contractor?.name || 'Unknown Contractor'}</h3>
                                        <p className="text-black font-medium">
                                            {new Date(booking.date).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} • {booking.time}
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 border-2 border-black rounded-lg font-bold text-sm capitalize ${statusColor[booking.status || 'pending'] || 'bg-gray-200'} shadow-[2px_2px_0px_0px_#000]`}>
                                    {booking.status || 'pending'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between border-t-2 border-dashed border-gray-300 pt-4">
                                <span className="font-black text-xl">₹{booking.price || 0}</span>
                                <div className="flex gap-2">
                                    {booking.status === 'upcoming' && (
                                        <>
                                            <button onClick={() => handlePay(booking)} className="px-4 py-2 bg-green-300 border-2 border-black rounded-lg font-bold shadow-[2px_2px_0px_0px_#000] hover:translate-y-[-1px] transition-all">
                                                Pay ₹{booking.price}
                                            </button>
                                            <button onClick={() => handleCancel(booking.id)} className="px-4 py-2 bg-red-300 border-2 border-black rounded-lg font-bold shadow-[2px_2px_0px_0px_#000] hover:translate-y-[-1px] transition-all">
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                    {booking.status === 'completed' && (
                                        <Link href="/disputes" className="px-4 py-2 bg-orange-300 border-2 border-black rounded-lg font-bold shadow-[2px_2px_0px_0px_#000] hover:translate-y-[-1px] transition-all">
                                            Report Issue
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-16 bg-white border-3 border-black rounded-xl shadow-[4px_4px_0px_0px_#000]">
                            <p className="text-2xl font-black text-gray-300 mb-2">No bookings {filter !== 'all' ? `with status "${filter}"` : 'yet'}</p>
                            <Link href="/contractors" className="text-blue-600 font-bold hover:underline">Browse Pros →</Link>
                        </div>
                    )}
                </div>
            )}

            {/* Payment Modal */}
            <Modal isOpen={payModalOpen} onClose={() => setPayModalOpen(false)} title="Pay Securely (Demo)">
                <div className="text-center">
                    <p className="text-lg font-medium text-black mb-4">
                        Confirm payment of <span className="font-black text-2xl">₹{selectedBooking?.price || 0}</span> to{' '}
                        <span className="font-black">{selectedBooking?.contractor?.name}</span>
                    </p>
                    <div className="bg-green-50 border-2 border-black rounded-lg p-4 mb-6 shadow-[2px_2px_0px_0px_#000]">
                        <p className="text-sm font-bold text-gray-600">🔒 Secured by RazorPay (Demo Mode)</p>
                    </div>
                    <button onClick={confirmPayment} className="w-full bg-green-400 text-black border-3 border-black py-4 rounded-lg font-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] hover:bg-green-500 transition-all text-xl uppercase">
                        Pay ₹{selectedBooking?.price || 0}
                    </button>
                </div>
            </Modal>
        </div>
    );
}
