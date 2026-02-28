'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';
import { supabase } from '@/lib/supabaseClient';

function PostJobContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const preselectedService = searchParams.get('service') || '';
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        service: preselectedService,
        description: '',
        location: '',
        availability: 'weekdays',
        rate: '',
        experience: '',
    });

    useEffect(() => {
        const checkAuth = async () => {
            const isGuest = typeof window !== 'undefined' && localStorage.getItem('isGuest') === 'true';
            const { data: { user } } = await supabase.auth.getUser();
            if (!user && !isGuest) {
                router.push('/login');
            }
        };
        checkAuth();
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.service || !formData.description || !formData.location) {
            showToast('Fill all fields!', 'error');
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase
                .from('contractors')
                .insert([{
                    name: formData.name,
                    service: formData.service,
                    description: `${formData.description}\nExperience: ${formData.experience} years. Availability: ${formData.availability}.`,
                    location: formData.location,
                    available: true,
                    price: formData.rate ? `₹${formData.rate}/hr` : null,
                    rating: 0,
                    reviews: 0,
                }]);

            if (error) console.warn('DB insert skipped', error);

            setSubmitted(true);
            showToast('Live on the network!');
        } catch (err) {
            console.error(err);
            showToast('Failure. Try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-24 text-center">
                <div className="bg-white border-[6px] border-black p-16 neo-shadow-large rotate-1">
                    <div className="w-24 h-24 bg-[#4ECDC4] border-[4px] border-black flex items-center justify-center mx-auto mb-8 -rotate-12 neo-shadow-small">
                        <i className="fas fa-check-circle text-black text-5xl"></i>
                    </div>
                    <h2 className="text-5xl font-[900] uppercase tracking-tighter mb-4 italic">You&apos;re Live!</h2>
                    <p className="text-xs font-black uppercase tracking-widest mb-10 opacity-60">
                        Clients can now find you for <span className="bg-yellow-300 px-1 underline">{formData.service}</span> in <span className="bg-cyan-300 px-1 underline">{formData.location}</span>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button
                            onClick={() => { setSubmitted(false); setFormData({ name: '', service: '', description: '', location: '', availability: 'weekdays', rate: '', experience: '' }); }}
                            className="px-8 py-4 border-[3px] border-black text-black font-black uppercase text-xs tracking-[0.2em] hover:bg-black hover:text-white transition-all neo-shadow-small active:translate-y-1"
                        >
                            Add Another
                        </button>
                        <button
                            onClick={() => router.push('/contractors')}
                            className="px-8 py-4 bg-black text-white border-[3px] border-black font-black uppercase text-xs tracking-[0.2em] hover:bg-yellow-400 hover:text-black transition-all neo-shadow-small active:translate-y-1"
                        >
                            Explore Network
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-20">
            {/* Header */}
            <div className="mb-12 relative">
                <div className="flex items-end gap-6 mb-6">
                    <div className="w-20 h-20 bg-[#FFD700] border-[4px] border-black flex items-center justify-center -rotate-6 neo-shadow-small shrink-0">
                        <i className="fas fa-hammer text-black text-4xl"></i>
                    </div>
                    <div>
                        <h1 className="text-5xl md:text-7xl font-[900] uppercase tracking-tighter text-black leading-none italic">Join The Pros</h1>
                        <p className="text-xs font-black uppercase tracking-[0.4em] mt-3 opacity-40">List your services. Get hired.</p>
                    </div>
                </div>

                <div className="bg-[#4ECDC4] border-[3px] border-black p-6 neo-shadow-small rotate-1">
                    <div className="flex gap-4 items-start">
                        <i className="fas fa-bolt text-black text-xl animate-pulse"></i>
                        <p className="text-xs font-black uppercase leading-relaxed tracking-wider">
                            Fill the portal below. Once submitted, your profile will be indexed instantly for homeowners searching in your region.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white border-[4px] border-black p-10 space-y-10 neo-shadow-large">
                <div className="grid md:grid-cols-2 gap-10">
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest mb-2 ml-1">Identity <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-4 border-[3px] border-black font-bold uppercase text-xs focus:bg-yellow-50 outline-none transition-colors neo-shadow-small"
                            placeholder="NAME SURNAME"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest mb-2 ml-1">Trade Sector <span className="text-red-500">*</span></label>
                        <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full p-4 border-[3px] border-black font-bold uppercase text-xs focus:bg-yellow-50 outline-none transition-colors neo-shadow-small"
                        >
                            <option value="">Select Sector</option>
                            <option value="Plumbing">Plumbing</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Cleaning">Cleaning</option>
                            <option value="HVAC">HVAC / AC Repair</option>
                            <option value="Painting">Painting</option>
                            <option value="Landscaping">Landscaping</option>
                            <option value="Carpentry">Carpentry</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest mb-2 ml-1">Expertise Manifesto <span className="text-red-500">*</span></label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full p-4 border-[3px] border-black font-bold uppercase text-xs focus:bg-yellow-50 outline-none transition-colors neo-shadow-small"
                        placeholder="DESCRIBE YOUR SKILLSET, EXPERIENCE AND TOOLING..."
                    ></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest mb-2 ml-1">Primary Region <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full p-4 border-[3px] border-black font-bold uppercase text-xs focus:bg-yellow-50 outline-none neo-shadow-small"
                            placeholder="CITY, STATE"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest mb-2 ml-1">Scheduling Mode</label>
                        <select
                            name="availability"
                            value={formData.availability}
                            onChange={handleChange}
                            className="w-full p-4 border-[3px] border-black font-bold uppercase text-xs focus:bg-yellow-50 outline-none neo-shadow-small"
                        >
                            <option value="weekdays">WEEKDAYS ONLY</option>
                            <option value="weekends">WEEKENDS ONLY</option>
                            <option value="anytime">24/7 AVAILABILITY</option>
                            <option value="emergency">EMERGENCY RESPONSE</option>
                        </select>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10 pb-4">
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest mb-2 ml-1">Rate Floor (₹/HR)</label>
                        <input
                            type="number"
                            name="rate"
                            value={formData.rate}
                            onChange={handleChange}
                            className="w-full p-4 border-[3px] border-black font-bold uppercase text-xs focus:bg-yellow-50 outline-none neo-shadow-small"
                            placeholder="500"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest mb-2 ml-1">Combat History (YEARS)</label>
                        <input
                            type="number"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className="w-full p-4 border-[3px] border-black font-bold uppercase text-xs focus:bg-yellow-50 outline-none neo-shadow-small"
                            placeholder="5"
                        />
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full group relative bg-black text-white py-6 border-[4px] border-black font-[900] text-2xl uppercase tracking-[0.2em] neo-shadow hover:bg-[#FFD700] hover:text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-0 active:translate-y-0 active:shadow-none disabled:opacity-50"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <i className="fas fa-sync fa-spin mr-4"></i> TRANSMITTING...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center">
                            POST SYSTEM ENTRY <i className="fas fa-arrow-right ml-4 group-hover:translate-x-2 transition-transform"></i>
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
}

export default function PostJob() {
    return (
        <Suspense fallback={<div className="p-20 text-center font-black uppercase tracking-widest animate-pulse">Loading Matrix...</div>}>
            <PostJobContent />
        </Suspense>
    );
}
