'use client';

/**
 * DisputeCard Component
 *
 * Displays a dispute with status, type, booking context, and submitted date.
 */
export default function DisputeCard({
  dispute,
}: {
  dispute: {
    id: string;
    type: string;
    status: string | null;
    description?: string | null;
    created_at?: string | null;
    name?: string | null;
    booking?: {
      service?: string | null;
      contractor?: { name?: string | null };
    } | null;
  };
}) {
  return (
    <div className="bg-white border-3 border-black rounded-xl shadow-[6px_6px_0px_0px_#000] p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔍</span>
          <h4 className="font-black text-lg">
            {dispute.booking?.service || 'Service'} - {dispute.booking?.contractor?.name || 'Contractor'}
          </h4>
          {dispute.name && <span className="text-gray-500 font-medium">by {dispute.name}</span>}
        </div>
        <span className="px-3 py-1 rounded font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] text-sm bg-yellow-200 text-black">
          {dispute.status || 'In Review'}
        </span>
      </div>
      <p className="text-black font-medium text-sm">{dispute.description}</p>
      <p className="text-gray-400 text-xs font-bold mt-2">
        {dispute.created_at ? new Date(dispute.created_at).toLocaleDateString('en-IN') : 'Unknown Date'}
      </p>
    </div>
  );
}
