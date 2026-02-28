"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";
import { supabase } from "@/lib/supabaseClient";
import DisputeCard from "@/components/disputes/DisputeCard";
import { Dispute } from "@/types";

export default function DisputesPage() {
  const { showToast } = useToast();
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    bookingId: "",
    type: "Poor Quality Work",
    description: "",
  });

  const fetchDisputes = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("disputes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setDisputes(data || []);
    } catch (err) {
      console.error("Fetch disputes error:", err);
      showToast("Failed to load history", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]); // showToast is stable, but good practice to include if it were to change

  useEffect(() => {
    fetchDisputes();
  }, [fetchDisputes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.type || !form.description) {
      showToast("Fill mandatory fields!", "error");
      return;
    }

    setSubmitting(true);
    try {
      const user = (await supabase.auth.getUser()).data.user;

      const { error } = await supabase.from("disputes").insert([
        {
          name: form.name,
          email: form.email || user?.email || null,
          booking_id: form.bookingId || null,
          type: form.type,
          description: form.description,
          user_id: user?.id || null,
        },
      ]);

      if (error) throw error;
      showToast("Dispute filed! Resolution in 24h.");
      setForm({
        name: "",
        email: "",
        bookingId: "",
        type: "Poor Quality Work",
        description: "",
      });
      fetchDisputes();
    } catch (err) {
      console.error("Submit dispute error:", err);
      showToast("Submission failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 pb-40">
      <Link
        href="/"
        className="text-[10px] font-black uppercase tracking-widest hover:underline decoration-2 mb-8 inline-block"
      >
        &larr; Return to HQ
      </Link>

      <div className="mb-12 border-b-[8px] border-black pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-5xl md:text-7xl font-[900] uppercase tracking-tighter text-black leading-none">
            Issue Portal
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] mt-3 opacity-40 italic">
            Dispute resolution protocol
          </p>
        </div>
        <div className="hidden md:block">
          <div className="w-16 h-16 bg-red-400 border-[3px] border-black flex items-center justify-center rotate-6 neo-shadow-small">
            <i className="fas fa-exclamation-triangle text-black text-2xl animate-pulse"></i>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_350px] gap-12 items-start">
        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border-[4px] border-black p-8 neo-shadow-large"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                Requester Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 bg-white border-[3px] border-black font-bold uppercase text-xs focus:bg-yellow-50 outline-none neo-shadow-small"
                placeholder="YOUR FULL NAME"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                Contact Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 bg-white border-[3px] border-black font-bold uppercase text-xs focus:bg-yellow-50 outline-none neo-shadow-small"
                placeholder="REACH@EMAIL.COM"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                Target Booking ID
              </label>
              <input
                type="text"
                value={form.bookingId}
                onChange={(e) =>
                  setForm({ ...form, bookingId: e.target.value })
                }
                className="w-full p-3 bg-white border-[3px] border-black font-bold uppercase text-xs focus:bg-yellow-50 outline-none neo-shadow-small"
                placeholder="UID-887-XXXX"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                Violation Type <span className="text-red-500">*</span>
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full p-3 bg-white border-[3px] border-black font-bold uppercase text-xs focus:bg-yellow-50 outline-none neo-shadow-small"
              >
                <option value="Poor Quality Work">POOR QUALITY WORK</option>
                <option value="Contractor No-Show">CONTRACTOR NO-SHOW</option>
                <option value="Refund Request">REFUND REQUEST</option>
                <option value="Payment Issue">PAYMENT DIScrepancy</option>
                <option value="Other">MISCELLANEOUS ISSUE</option>
              </select>
            </div>
          </div>

          <div className="mb-10">
            <label className="block text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
              Situation Briefing <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={6}
              className="w-full p-4 bg-white border-[3px] border-black font-medium text-xs focus:bg-yellow-50 outline-none neo-shadow-small"
              placeholder="PLEASE DESCRIBE THE INCIDENT IN DETAIL..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-black text-white py-6 border-[3px] border-black font-[900] text-xl uppercase tracking-widest neo-shadow hover:bg-red-500 transition-all active:shadow-none active:translate-y-1 disabled:opacity-50"
          >
            {submitting ? "TRANSMITTING..." : "INITIATE DISPUTE"}
          </button>
          <p className="text-center text-[8px] font-black uppercase tracking-[0.3em] mt-6 opacity-30 italic">
            Resolution expected within 24 standard cycles
          </p>
        </form>

        {/* Sidebar / History */}
        <div>
          <div className="bg-[#FFD700] border-[4px] border-black p-6 mb-10 -rotate-2 neo-shadow-small">
            <h3 className="font-[900] uppercase text-xl mb-2 italic tracking-tighter">
              Archive Stats
            </h3>
            <p className="text-[10px] font-black uppercase opacity-60 leading-tight">
              Total cases recorded: {disputes.length}
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="font-[900] uppercase text-xs tracking-[0.3em] border-b-4 border-black inline-block mb-4">
              Transmission History
            </h3>

            {loading ? (
              <div className="space-y-4 animate-pulse">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-32 bg-gray-200 border-[3px] border-gray-300 rounded-xl"
                  ></div>
                ))}
              </div>
            ) : disputes.length > 0 ? (
              disputes.map((dispute) => (
                <DisputeCard key={dispute.id} dispute={dispute} />
              ))
            ) : (
              <div className="text-center py-12 border-[3px] border-black border-dashed opacity-30 italic">
                <p className="text-[10px] font-black uppercase tracking-widest">
                  No active cases
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
