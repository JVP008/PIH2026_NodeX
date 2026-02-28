'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/Toast';
import DisputeCard from '@/components/disputes/DisputeCard';
import { Dispute, Booking } from '@/types';

export default function DisputesPage() {
    const [disputes, setDisputes] = useState<Dispute[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [disputeType, setDisputeType] = useState('');
    const [formData, setFormData] = useState({
        bookingId: '',
        description: '',
        resolution: 'refund'
    });
    const { showToast } = useToast();

    const fetchData = useCallback(async () => {
        const { data: disputesData } = await supabase
            .from('disputes')
            .select('*, booking:bookings(contractor:contractors(name, service))');
        setDisputes(disputesData || []);

        const { data: bookingsData } = await supabase
            .from('bookings')
            .select('*, contractor:contractors(name, service)')
            .in('status', ['completed', 'upcoming']);
        setBookings(bookingsData || []);
    }, []);

    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const isGuest = typeof window !== 'undefined' && localStorage.getItem('isGuest') === 'true';
            const { data: { user } } = await supabase.auth.getUser();
            if (!user && !isGuest) {
                router.push('/login');
                return;
            }
            fetchData();
        };
        checkAuth();
    }, [fetchData, router]);

    const handleShowForm = (type: string) => {
        setDisputeType(type);
        setShowForm(true);
    };

    const handleSubmit = async () => {
        if (!formData.bookingId || !formData.description) {
            showToast('Fill all fields!', 'error');
            return;
        }

        const { error } = await supabase
            .from('disputes')
            .insert([{
                booking_id: formData.bookingId,
                type: disputeType,
                description: formData.description,
                status: 'In Review',
                user_id: (await supabase.auth.getUser()).data.user?.id
            }]);

        if (error) console.warn('Dispute failed', error);

        setShowForm(false);
        setFormData({ bookingId: '', description: '', resolution: 'refund' });
        showToast('System log updated.');
        fetchData();
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-20 pb-40">
            <div className="bg-white border-[4px] border-black p-10 neo-shadow-large">
                <div className="mb-12 border-b-[6px] border-black pb-4 flex items-end justify-between">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-[900] uppercase tracking-tighter text-black leading-none">Dispute Terminal</h2>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] mt-3 opacity-40 italic">Resolution hub</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {[
                        { id: 'refund', t: 'Payment Issue', d: 'Billing & Refunds', i: 'fa-money-bill-wave', c: 'bg-yellow-400' },
                        { id: 'quality', t: 'Service Quality', d: 'Workmanship issues', i: 'fa-tools', c: 'bg-[#4ECDC4]' },
                        { id: 'noshow', t: 'System Failure', d: 'Contractor No-Show', i: 'fa-user-times', c: 'bg-[#FF6B6B]' },
                    ].map((cat) => (
                        <div
                            key={cat.id}
                            className={`${cat.c} border-[3px] border-black p-8 text-center cursor-pointer neo-shadow-small hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 active:shadow-none group flex flex-col items-center justify-center`}
                            onClick={() => handleShowForm(cat.id)}
                        >
                            <i className={`fas ${cat.i} text-4xl text-black mb-4 group-hover:rotate-12 transition-transform`}></i>
                            <h3 className="font-black uppercase text-sm tracking-widest">{cat.t}</h3>
                            <p className="text-[10px] font-bold uppercase opacity-60 mt-2">{cat.d}</p>
                        </div>
                    ))}
                </div>

                {showForm && (
                    <div className="border-[4px] border-black p-10 mb-16 bg-yellow-50 neo-shadow animate-in slide-in-from-bottom-4 duration-300">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-10 h-10 bg-black text-white border-2 border-black flex items-center justify-center -rotate-6">
                                <i className="fas fa-file-invoice text-lg"></i>
                            </div>
                            <h3 className="font-black uppercase text-2xl tracking-tighter">Submit Report</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 ml-1">Target Booking</label>
                                <select
                                    value={formData.bookingId}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, bookingId: e.target.value })}
                                    className="w-full p-4 border-[3px] border-black bg-white font-black uppercase text-xs focus:bg-yellow-100 outline-none neo-shadow-small"
                                >
                                    <option value="">SELECT LOG ENTRY</option>
                                    {bookings.map((b: Booking) => (
                                        <option key={b.id} value={b.id}>
                                            {b.contractor?.service || 'SERVICE'} - {b.contractor?.name} ({b.date})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mb-10">
                            <label className="block text-[10px] font-black uppercase tracking-widest mb-2 ml-1">Incident Briefing</label>
                            <textarea
                                value={formData.description}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                className="w-full p-4 border-[3px] border-black bg-white font-black uppercase text-xs focus:bg-yellow-100 outline-none neo-shadow-small"
                                placeholder="PROVIDE ABSOLUTE CLARITY ON THE CASE..."
                            ></textarea>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-black text-white py-5 border-[4px] border-black font-[900] text-xl uppercase tracking-widest neo-shadow hover:bg-[#FF6B6B] hover:text-black transition-all active:translate-y-1 active:shadow-none"
                        >
                            TRANSMIT REPORT TO HQ
                        </button>
                    </div>
                )}

                {/* Active Disputes */}
                <div>
                    <h3 className="text-3xl font-[900] uppercase tracking-tighter mb-8 italic underline decoration-8 decoration-[#FFD700]">Open Terminals</h3>
                    <div className="grid gap-8">
                        {disputes.length > 0 ? disputes.map((d: Dispute) => (
                            <DisputeCard key={d.id} dispute={d} />
                        )) : (
                            <div className="text-center py-20 border-[3px] border-black border-dashed opacity-30">
                                <p className="text-xs font-black uppercase tracking-[0.4em]">All system nodes healthy. No active disputes.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
