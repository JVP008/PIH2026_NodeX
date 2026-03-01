/**
 * BookingCard Component
 *
 * This component displays the details of a single booking made by the user.
 * It shows who the professional is, when the booking is scheduled, and what the current status is.
 * It also provides action buttons depending on whether the booking is upcoming or completed.
 */
export default function BookingCard({
  booking,
  onPay,
  onCancel,
  onReport,
  onReview,
}: {
  booking: {
    id: string;
    date: string;
    time: string;
    status: string | null;
    price: number | null;
    contractor: {
      name?: string | null;
      image?: string | null;
      service?: string | null;
    } | null;
  };
  onPay?: (booking: { id: string; price: number | null }) => void;
  onCancel?: (id: string) => void;
  onReport?: (booking: { id: string }) => void;
  onReview?: (booking: { id: string; contractor: { name: string } | null }) => void;
}) {
  const statusColors: Record<string, string> = {
    upcoming: 'bg-blue-200',
    completed: 'bg-green-200',
    pending: 'bg-yellow-200',
    cancelled: 'bg-red-200',
  };

  return (
    <div className="bg-white border-3 border-black rounded-xl p-5 shadow-[4px_4px_0px_0px_#000]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{booking.contractor?.image || '🔧'}</span>
          <div>
            <h3 className="font-black text-lg">{booking.contractor?.name || 'Contractor'}</h3>
            <p className="text-black font-medium text-sm">
              {new Date(booking.date).toLocaleDateString('en-IN')} • {booking.time}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 border-2 border-black rounded-lg font-bold text-xs capitalize ${statusColors[booking.status || 'pending']} shadow-[2px_2px_0px_0px_#000]`}
        >
          {booking.status || 'pending'}
        </span>
      </div>
      <div className="flex items-center justify-between border-t-2 border-dashed border-gray-300 pt-3">
        <span className="font-black text-lg">₹{booking.price || 0}</span>
        <div className="flex gap-2">
          {booking.status === 'upcoming' && (
            <>
              <button
                onClick={() => onPay?.({ id: booking.id, price: booking.price })}
                className="px-3 py-1 bg-green-300 border-2 border-black rounded-lg font-bold text-sm shadow-[2px_2px_0px_0px_#000]"
              >
                Pay ₹{booking.price}
              </button>
              <button
                onClick={() => onCancel?.(booking.id)}
                className="px-3 py-1 bg-red-300 border-2 border-black rounded-lg font-bold text-sm shadow-[2px_2px_0px_0px_#000]"
              >
                Cancel
              </button>
            </>
          )}
          {booking.status === 'completed' && (
            <>
              <button
                onClick={() =>
                  onReview?.({
                    id: booking.id,
                    contractor: { name: booking.contractor?.name || 'Contractor' },
                  })
                }
                className="px-3 py-1 bg-yellow-300 border-2 border-black rounded-lg font-bold text-sm shadow-[2px_2px_0px_0px_#000]"
              >
                Rate & Review
              </button>
              <button
                onClick={() => onReport?.({ id: booking.id })}
                className="px-3 py-1 bg-orange-300 border-2 border-black rounded-lg font-bold text-sm shadow-[2px_2px_0px_0px_#000]"
              >
                Report
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
