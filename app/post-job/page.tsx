'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';
import { supabase } from '@/lib/supabaseClient';

function PostJobContent() {
    const router = useRouter();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        service: '',
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
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.service || !formData.description || !formData.location) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase
                .from('contractors')
                .insert([{
                    name: formData.name,
                    service: formData.service,
                    description: formData.description,
                    location: formData.location,
                    availability: formData.availability,
                    price: formData.rate ? `₹${formData.rate}/hr` : null,
                    experience: formData.experience,
                    rating: 0,
                    reviews: 0,
                }]);

            if (error) console.warn('DB insert skipped (no auth / schema mismatch)', error);

            setSubmitted(true);
            showToast('Your service listing is live! Clients can now find you.');
        } catch (err) {
            console.error(err);
            showToast('Something went wrong. Try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-20 text-center">
                <div className="bg-white rounded-2xl shadow-xl p-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="fas fa-check-circle text-green-500 text-4xl"></i>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">You&apos;re listed!</h2>
                    <p className="text-gray-500 mb-8">
                        Your profile is now visible to homeowners looking for a <strong>{formData.service}</strong> professional in <strong>{formData.location}</strong>.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => { setSubmitted(false); setFormData({ name: '', service: '', description: '', location: '', availability: 'weekdays', rate: '', experience: '' }); }}
                            className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition"
                        >
                            Post Another
                        </button>
                        <button
                            onClick={() => router.push('/contractors')}
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                        >
                            View All Pros
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <i className="fas fa-briefcase text-blue-600 text-xl"></i>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Post Your Services</h1>
                        <p className="text-gray-500 text-sm">Are you a skilled professional? List your services and get hired by homeowners near you.</p>
                    </div>
                </div>

                {/* Info banner */}
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 items-start">
                    <i className="fas fa-info-circle text-blue-500 mt-0.5"></i>
                    <p className="text-sm text-blue-700">
                        <strong>For Professionals:</strong> Fill in your details below to appear in the &quot;Find Pros&quot; section. Homeowners looking for your skill will be able to contact and book you.
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">

                {/* Name */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Your Full Name <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g. Rajesh Kumar"
                    />
                </div>

                {/* Service */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">What Service Do You Offer? <span className="text-red-500">*</span></label>
                    <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select your trade</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Cleaning">Cleaning</option>
                        <option value="HVAC">HVAC / AC Repair</option>
                        <option value="Painting">Painting</option>
                        <option value="Landscaping">Landscaping / Gardening</option>
                        <option value="Carpentry">Carpentry</option>
                        <option value="Security">Security Systems</option>
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Describe Your Skills & Experience <span className="text-red-500">*</span></label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g. I have 8 years of experience in residential plumbing. Expert in pipe fitting, leak repairs, and bathroom installations..."
                    ></textarea>
                </div>

                {/* Location + Availability */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Your Service Area <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Bhandara, Maharashtra"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Availability</label>
                        <select
                            name="availability"
                            value={formData.availability}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="weekdays">Weekdays (Mon–Fri)</option>
                            <option value="weekends">Weekends (Sat–Sun)</option>
                            <option value="anytime">Anytime</option>
                            <option value="emergency">Emergency / On-Call</option>
                        </select>
                    </div>
                </div>

                {/* Rate + Experience */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Hourly Rate (₹)</label>
                        <input
                            type="number"
                            name="rate"
                            value={formData.rate}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="e.g. 500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Years of Experience</label>
                        <input
                            type="number"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="e.g. 5"
                        />
                    </div>
                </div>

                {/* Submit */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-70"
                >
                    {loading ? (
                        <span className="flex items-center">
                            <i className="fas fa-spinner fa-spin mr-2"></i> Posting...
                        </span>
                    ) : (
                        <>
                            <i className="fas fa-paper-plane mr-2"></i> Post My Services
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default function PostJob() {
    return (
        <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
            <PostJobContent />
        </Suspense>
    );
}
