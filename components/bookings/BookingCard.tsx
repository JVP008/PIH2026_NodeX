"use client";

import { Booking } from "@/types";

interface BookingCardProps {
  booking: Booking;
  onPay?: (booking: Booking) => void;
  onReview?: (booking: Booking) => void;
  onDispute?: (booking: Booking) => void;
}

export default function BookingCard({
  booking,
  onPay,
  onReview,
  onDispute,
}: BookingCardProps) {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "bg-[#4ECDC4] border-black text-black";
      case "completed":
        return "bg-[#10b981] border-black text-white";
      case "pending":
        return "bg-[#FFD700] border-black text-black";
      default:
        return "bg-gray-200 border-black text-black";
    }
  };

  return (
    <div className="bg-white border-[3px] border-black p-8 neo-shadow-small transition-transform hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="text-6xl drop-shadow-[4px_4px_0_rgba(0,0,0,1)] rotate-[-5deg] group-hover:rotate-0 transition-transform">
            {booking.contractor?.image || "👤"}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-[900] uppercase text-xl tracking-tighter leading-none">
                {booking.service || "Service Request"}
              </h3>
              <span
                className={`px-2 py-0.5 border-2 text-[8px] font-black uppercase tracking-widest ${getStatusStyles(booking.status)}`}
              >
                {booking.status}
              </span>
            </div>
            <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-2">
              {booking.contractor?.name || "Unknown Pro"}
            </p>
            <div className="flex items-center gap-4">
              <p className="text-[10px] font-black uppercase bg-black text-white px-2 py-1 rotate-1">
                <i className="far fa-calendar mr-2"></i>
                {booking.date}
              </p>
              <p className="text-[10px] font-black uppercase bg-yellow-300 border-2 border-black px-2 py-0.5 -rotate-1">
                <i className="far fa-clock mr-2"></i>
                {booking.time}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 w-full md:w-auto">
          <p className="font-[900] text-3xl uppercase tracking-tighter leading-none">
            ₹{booking.price}
          </p>
          <div className="flex gap-3 w-full justify-end">
            {booking.status === "upcoming" && (
              <>
                <button className="text-[10px] font-black uppercase border-b-2 border-black hover:text-amber-500 hover:border-amber-500 transition-colors">
                  Reschedule
                </button>
                <button className="text-[10px] font-black uppercase border-b-2 border-black hover:text-red-500 hover:border-red-500 transition-colors">
                  Cancel
                </button>
              </>
            )}
            {booking.status === "pending" && onPay && (
              <button
                onClick={() => onPay(booking)}
                className="bg-[#10b981] text-black border-[3px] border-black px-4 py-2 text-[10px] font-black uppercase tracking-widest neo-shadow-small hover:bg-black hover:text-white transition-all active:translate-y-1 active:shadow-none"
              >
                Pay Now
              </button>
            )}
            {booking.status === "completed" && (
              <>
                {onReview && (
                  <button
                    onClick={() => onReview(booking)}
                    className="text-[10px] font-black uppercase border-b-2 border-black hover:text-blue-500 hover:border-blue-500 transition-colors"
                  >
                    Leave Review
                  </button>
                )}
                {onDispute && (
                  <button
                    onClick={() => onDispute(booking)}
                    className="text-[10px] font-black uppercase border-b-2 border-black hover:text-gray-500 hover:border-gray-500 transition-colors text-gray-400"
                  >
                    Report
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
