'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';
import { supabase } from '@/lib/supabaseClient';

const CATEGORIES = ['Plumbing', 'Electrical', 'Cleaning', 'HVAC', 'Painting', 'Landscaping'];

export default function PostJobPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    service: 'Plumbing',
    location: '',
    price: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Stop submission early if required fields are missing.
    if (!formData.name || !formData.location || !formData.service) {
      showToast('Please fill in all required fields (Name, Category, Location)', 'error');
      return;
    }

    // Lock the submit button while the profile is being saved.
    setLoading(true);

    try {
      // Create a new contractor profile record in Supabase.
      const { error } = await supabase.from('contractors').insert([
        {
          name: formData.name,
          service: formData.service,
          location: formData.location,
          price: formData.price ? `₹${formData.price}/hr` : 'Contact for pricing',
          description: formData.description,
          rating: 5.0,
          reviews: 0,
          completed_jobs: 0,
          verified: false,
          available: true,
          response_time: 'Usually within 1 hour',
        },
      ]);

      if (error) throw error;

      showToast('Your service profile has been posted successfully!');
      // Short delay lets users see success feedback before redirect.
      setTimeout(() => router.push('/contractors'), 1500);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      showToast(`Error: ${msg}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDescription = async () => {
    // AI needs at least service + location to write a useful description.
    if (!formData.service || !formData.location) {
      showToast('Please enter both Service Category and Location first to generate a description.', 'error');
      return;
    }

    setIsGeneratingDesc(true);
    try {
      // Ask our backend route to generate text using Gemini.
      const res = await fetch('/api/gemini/generate-desc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.name,
          service: formData.service,
          location: formData.location,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate description');

      // Fill the textarea with AI-generated content.
      setFormData((prev) => ({ ...prev, description: data.description }));
      showToast('✨ Magic description generated successfully!');
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      showToast(`AI Error: ${msg}`, 'error');
    } finally {
      setIsGeneratingDesc(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="text-black font-bold hover:underline decoration-2 decoration-black underline-offset-2 mb-4 inline-block"
      >
        &larr; Back to Home
      </Link>

      <div className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_#000] p-8">
        <div className="flex items-center mb-8 border-b-4 border-black pb-6">
          <div className="w-16 h-16 bg-yellow-300 border-3 border-black rounded-full flex items-center justify-center mr-4 shadow-[3px_3px_0px_0px_#000]">
            <i className="fas fa-briefcase text-black text-3xl"></i>
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase tracking-wide">Post a Job</h2>
            <p className="text-black font-medium">
              List your services and let customers contact you directly.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-black font-black text-lg mb-2 uppercase">
              Your Name / Business Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 bg-white border-3 border-black rounded-lg focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold"
              placeholder="E.g., Ramesh Kumar or Star Plumbing Pvt Ltd"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-black font-black text-lg mb-2 uppercase">
              Service Category *
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full p-3 bg-white border-3 border-black rounded-lg focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold appearance-none cursor-pointer"
              required
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-black font-black text-lg mb-2 uppercase">
              City / Location *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-3 bg-white border-3 border-black rounded-lg focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold"
              placeholder="E.g., Mumbai, Andheri East"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-black font-black text-lg mb-2 uppercase">
              Hourly Rate (₹){' '}
              <span className="text-gray-400 font-medium text-base normal-case">(optional)</span>
            </label>
            <div className="flex w-full items-center bg-white border-3 border-black rounded-lg focus-within:shadow-[4px_4px_0px_0px_#000] focus-within:-translate-y-[2px] transition-transform">
              <span className="pl-4 pr-1 text-black font-bold text-lg">₹</span>
              <input
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  setFormData({ ...formData, price: val });
                }}
                className="w-full p-3 pl-1 bg-transparent border-none focus:ring-0 font-bold outline-none"
                placeholder="E.g., 500"
              />
              <span className="pr-4 pl-1 text-black font-bold text-lg">/-</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="text-black font-black text-lg uppercase">
                Describe Your Speciality{' '}
                <span className="text-gray-400 font-medium text-base normal-case">(optional)</span>
              </label>
              <button
                type="button"
                onClick={handleGenerateDescription}
                disabled={isGeneratingDesc}
                className="text-sm px-3 py-1 bg-purple-200 text-purple-900 border-2 border-black rounded-lg font-bold shadow-[2px_2px_0px_0px_#000] hover:-translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#000] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-1 disabled:opacity-50"
              >
                <i className={`fas fa-magic ${isGeneratingDesc ? 'animate-pulse' : ''}`}></i>
                {isGeneratingDesc ? 'Writing...' : 'Auto-write'}
              </button>
            </div>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full p-3 bg-white border-3 border-black rounded-lg focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-all font-medium"
              placeholder="E.g., I have 10 years of experience in fixing leaking pipes and plumbing installation. Fast and clean worker."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white border-3 border-black py-4 rounded-xl font-bold text-xl uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Posting...' : 'List My Services'}
          </button>
        </form>
      </div>
    </div>
  );
}
