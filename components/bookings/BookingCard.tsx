import Link from 'next/link';
import { Contractor } from '@/types';

export default function BookingCard({ booking }: {
    booking: {
        id: string;
        date: string;
        time: string;
        status: string | null;
        price: number | null;
        contractor: Contractor | null;
    }
}) {
    const statusColors: Record<string, string> = {
        upcoming: 'bg-blue-200',
        completed: 'bg-green-200',
        pending: 'bg-yellow-200',
        cancelled: 'bg-red-200'
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
                <span className={`px-3 py-1 border-2 border-black rounded-lg font-bold text-xs capitalize ${statusColors[booking.status || 'pending']} shadow-[2px_2px_0px_0px_#000]`}>
                    {booking.status || 'pending'}
                </span>
            </div>
            <div className="flex items-center justify-between border-t-2 border-dashed border-gray-300 pt-3">
                <span className="font-black text-lg">₹{booking.price || 0}</span>
                <div className="flex gap-2">
                    {booking.status === 'upcoming' && (
                        <button className="px-3 py-1 bg-green-300 border-2 border-black rounded-lg font-bold text-sm shadow-[2px_2px_0px_0px_#000]">
                            Pay ₹{booking.price}
                        </button>
                    )}
                    {booking.status === 'completed' && (
                        <Link href="/disputes" className="px-3 py-1 bg-orange-300 border-2 border-black rounded-lg font-bold text-sm shadow-[2px_2px_0px_0px_#000]">
                            Report
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
