"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";
import { supabase } from "@/lib/supabaseClient";

const CATEGORIES = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "HVAC",
  "Painting",
  "Landscaping",
];

export default function PostJobPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    service: "Plumbing",
    location: "",
    price: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic Validation
    if (!formData.name || !formData.location || !formData.service) {
      showToast("Please fill in Name, Category, and Location", "error");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("contractors").insert([
        {
          name: formData.name,
          service: formData.service,
          location: formData.location,
          // Format the price string for the database
          price: formData.price
            ? `₹${formData.price}/hr`
            : "Contact for pricing",
          description: formData.description,
          rating: 5.0,
          reviews: 0,
          completed_jobs: 0,
          verified: false,
          available: true,
          response_time: "Usually within 1 hour",
        },
      ]);

      if (error) throw error;
      showToast("Your service profile has been posted successfully!");

      // Wait a bit so they can see the toast before redirecting
      setTimeout(() => router.push("/contractors"), 1500);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Form submit error:", msg);
      showToast(`Error: ${msg}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="text-black font-bold hover:underline mb-4 inline-block"
      >
        &larr; Back to Home
      </Link>
      <div className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_#000] p-8">
        {/* Header Section */}
        <div className="flex items-center mb-8 border-b-4 border-black pb-6">
          <div className="w-16 h-16 bg-yellow-300 border-3 border-black rounded-full flex items-center justify-center mr-4 shadow-[3px_3px_0px_0px_#000]">
            <i className="fas fa-briefcase text-black text-3xl"></i>
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase tracking-wide">
              Post a Job
            </h2>
            <p className="text-black font-medium">
              List your services and let customers contact you directly.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-6">
            <label className="block text-black font-black text-lg mb-2 uppercase">
              Your Name / Business Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 bg-white border-3 border-black rounded-lg focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold outline-none"
              placeholder="E.g., Ramesh Kumar"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-6">
            <label className="block text-black font-black text-lg mb-2 uppercase">
              Service Category *
            </label>
            <select
              value={formData.service}
              onChange={(e) =>
                setFormData({ ...formData, service: e.target.value })
              }
              className="w-full p-3 bg-white border-3 border-black rounded-lg focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold cursor-pointer outline-none"
              required
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Location Field */}
          <div className="mb-6">
            <label className="block text-black font-black text-lg mb-2 uppercase">
              City / Location *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full p-3 bg-white border-3 border-black rounded-lg focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold outline-none"
              placeholder="E.g., Mumbai, Andheri East"
              required
            />
          </div>

          {/* Hourly Rate with Input Sanitization */}
          <div className="mb-6">
            <label className="block text-black font-black text-lg mb-2 uppercase">
              Hourly Rate (₹)
            </label>
            <div className="flex items-center bg-white border-3 border-black rounded-lg focus-within:shadow-[4px_4px_0px_0px_#000] transition-all">
              <span className="pl-4 text-black font-bold text-lg">₹</span>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => {
                  // Strictly allow only numbers (no hyphens or decimals)
                  const val = e.target.value.replace(/[^0-9]/g, "");
                  setFormData({ ...formData, price: val });
                }}
                className="w-full p-3 pl-1 border-none focus:ring-0 font-bold outline-none"
                placeholder="500"
              />
              <span className="pr-4 text-black font-bold text-lg">/-</span>
            </div>
          </div>

          {/* Speciality Textbox */}
          <div className="mb-8">
            <label className="block text-black font-black text-lg mb-2 uppercase">
              Describe Your Speciality
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full p-3 bg-white border-3 border-black rounded-lg focus:shadow-[4px_4px_0px_0px_#000] transition-all font-medium outline-none"
              placeholder="E.g., 10 years experience in plumbing..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white border-3 border-black py-4 rounded-xl font-bold text-xl uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-y-[4px] disabled:opacity-50 transition-all"
          >
            {loading ? "Posting..." : "List My Services"}
          </button>
        </form>
      </div>
    </div>
  );
}
