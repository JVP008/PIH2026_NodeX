"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import BookingCard from "@/components/bookings/BookingCard";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/ui/Toast";
import Modal from "@/components/ui/Modal";
import { Booking } from "@/types";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const { showToast } = useToast();

  const router = useRouter();

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("bookings")
      .select("*, contractor:contractors(name, image)")
      .order("date", { ascending: false });

    setBookings(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const isGuest =
        typeof window !== "undefined" &&
        localStorage.getItem("isGuest") === "true";
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user && !isGuest) {
        router.push("/login");
        return;
      }
      fetchBookings();
    };
    checkAuth();
  }, [router, fetchBookings]);

  const handlePay = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsPaymentModalOpen(true);
  };

  const processPayment = async () => {
    if (!selectedBooking) return;
    if (!cardNumber || !expiry || !cvv) {
      showToast("Fill card details!", "error");
      return;
    }

    await supabase
      .from("bookings")
      .update({ status: "upcoming" })
      .eq("id", selectedBooking.id);

    setIsPaymentModalOpen(false);
    showToast("Payment verified!");
    fetchBookings();
  };

  const filteredBookings =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="max-w-5xl mx-auto px-4 py-20 pb-40">
      <div className="mb-12 border-b-[8px] border-black pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-5xl md:text-7xl font-[900] uppercase tracking-tighter text-black leading-none">
            Your Orders
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] mt-3 opacity-40 italic">
            System activity logs
          </p>
        </div>
        <div className="hidden md:block">
          <span className="bg-black text-white px-4 py-2 text-xs font-black uppercase neo-shadow-small rotate-3">
            {bookings.length} Total
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-10">
        {["all", "upcoming", "completed", "pending"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-3 border-[3px] border-black text-xs font-black uppercase tracking-widest transition-all ${
              filter === f
                ? "bg-black text-white neo-shadow-small translate-y-1"
                : "bg-white text-black neo-shadow-small hover:bg-yellow-100 hover:-translate-y-1"
            }`}
          >
            {f === "pending" ? "Unpaid" : f}
          </button>
        ))}
      </div>

      <div className="grid gap-8">
        {loading ? (
          <div className="text-center py-20 font-black uppercase tracking-widest animate-pulse opacity-20">
            Accessing archives...
          </div>
        ) : filteredBookings.length > 0 ? (
          filteredBookings.map((b) => (
            <BookingCard
              key={b.id}
              booking={{ ...b, service: "Service Request" } as Booking}
              onPay={handlePay}
            />
          ))
        ) : (
          <div className="text-center py-24 bg-white border-[4px] border-black neo-shadow-large">
            <i className="fas fa-ghost text-6xl text-black mb-6"></i>
            <h3 className="text-3xl font-black uppercase tracking-tighter">
              Archive Is Empty
            </h3>
            <p className="text-[10px] font-black text-gray-400 mt-2 uppercase tracking-widest px-10">
              You haven&apos;t scheduled any missions yet.
            </p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title="Terminal Payment"
      >
        <div className="p-2">
          <div className="bg-[#4ECDC4] border-[3px] border-black p-6 mb-8 neo-shadow-small rotate-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60 italic">
                Service Charge
              </span>
              <span className="font-black text-xl">
                ₹{selectedBooking?.price || 0}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60 italic">
                Relay Fee (10%)
              </span>
              <span className="font-black text-sm">
                ₹{((selectedBooking?.price || 0) * 0.1).toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between items-center border-t-4 border-black border-dotted pt-4 mt-2">
              <span className="text-sm font-black uppercase tracking-tighter">
                Total Bill
              </span>
              <span className="text-3xl font-[900] underline decoration-4 decoration-black">
                ₹{((selectedBooking?.price || 0) * 1.1).toFixed(0)}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="-rotate-1">
              <label className="block text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                Card Terminal ID
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full p-4 border-[3px] border-black bg-white font-black uppercase text-sm focus:bg-yellow-50 outline-none neo-shadow-small"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 rotate-1">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                  Expiry
                </label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full p-4 border-[3px] border-black bg-white font-black uppercase text-sm focus:bg-yellow-50 outline-none neo-shadow-small"
                  placeholder="MM / YY"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                  Secret Key (CVV)
                </label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full p-4 border-[3px] border-black bg-white font-black uppercase text-sm focus:bg-yellow-50 outline-none neo-shadow-small"
                  placeholder="123"
                />
              </div>
            </div>
          </div>

          <button
            onClick={processPayment}
            className="w-full bg-black text-white py-6 border-[4px] border-black font-[900] text-xl uppercase tracking-widest neo-shadow hover:bg-[#FFD700] hover:text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-0 active:translate-y-0 active:shadow-none mt-10"
          >
            <i className="fas fa-lock mr-4"></i>AUTHENTICATE & PAY
          </button>
          <p className="text-center text-[8px] font-black uppercase tracking-[0.3em] mt-6 opacity-30">
            End-to-end encrypted node connection
          </p>
        </div>
      </Modal>
    </div>
  );
}
