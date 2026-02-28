/* --- FILE: app/contractors/[id]/page.tsx --- */
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ContractorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: contractor, error } = await supabase
    .from("contractors")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !contractor) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 pb-40">
      <Link
        href="/contractors"
        className="text-black font-black hover:underline mb-8 inline-block"
      >
        &larr; Back to Listings
      </Link>
      <div className="bg-white border-4 border-black rounded-xl shadow-[10px_10px_0px_0px_#000] overflow-hidden">
        {/* Header Banner */}
        <div className="bg-blue-300 h-40 border-b-4 border-black"></div>

        <div className="px-8 pb-10">
          {/* Floating Avatar & Name */}
          <div className="relative -mt-20 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col md:flex-row items-end gap-6">
              <div className="w-40 h-40 bg-white rounded-full p-2 border-4 border-black shadow-[6px_6px_0px_0px_#000]">
                <div className="w-full h-full bg-gray-100 rounded-full border-2 border-black flex items-center justify-center text-7xl">
                  {contractor.image || "👷"}
                </div>
              </div>
              <div className="mb-4">
                <h1 className="text-5xl font-black flex items-center gap-3">
                  {contractor.name}
                  {contractor.verified && (
                    <i className="fas fa-check-circle text-blue-500 text-2xl"></i>
                  )}
                </h1>
                <p className="text-xl font-bold text-gray-600 uppercase tracking-wide">
                  {contractor.service} • {contractor.location}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <span className="bg-green-200 text-black border-2 border-black px-4 py-2 rounded-lg font-black shadow-[3px_3px_0px_0px_#000]">
                {contractor.available ? "AVAILABLE NOW" : "NOT AVAILABLE"}
              </span>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-10">
              {/* Description Section */}
              <div>
                <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black inline-block">
                  Professional Bio
                </h2>
                <p className="text-xl font-medium leading-relaxed">
                  {contractor.description ||
                    `Verified ${contractor.service} expert with 10+ years of experience specialized in domestic repairs and installations.`}
                </p>
              </div>

              {/* Reliability Stats Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-pink-100 border-3 border-black p-6 rounded-xl text-center shadow-[6px_6px_0px_0px_#000] md:transform md:-rotate-2 transition-transform hover:rotate-0">
                  <div className="text-4xl font-black">
                    {contractor.completed_jobs}
                  </div>
                  <div className="text-xs font-bold uppercase">Jobs Done</div>
                </div>
                <div className="bg-yellow-100 border-3 border-black p-6 rounded-xl text-center shadow-[6px_6px_0px_0px_#000] md:transform md:rotate-1 transition-transform hover:rotate-0">
                  <div className="text-4xl font-black">{contractor.rating}</div>
                  <div className="text-xs font-bold uppercase">Rating</div>
                </div>
                <div className="bg-blue-100 border-3 border-black p-6 rounded-xl text-center shadow-[6px_6px_0px_0px_#000] md:transform md:-rotate-1 transition-transform hover:rotate-0">
                  <div className="text-4xl font-black">100%</div>
                  <div className="text-xs font-bold uppercase">
                    Verification
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Sidebar Card */}
            <div className="space-y-6">
              <div className="bg-white border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0px_0px_#000]">
                <h3 className="text-2xl font-black uppercase mb-6">
                  Pricing Detail
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between font-bold text-lg border-b-2 border-black border-dashed pb-2">
                    <span>Hourly Rate:</span>
                    <span className="text-blue-600 font-black">
                      {contractor.price}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Response Time:</span>
                    <span className="text-gray-600">Quick</span>
                  </div>
                </div>
                <button className="w-full bg-blue-500 text-white border-3 border-black py-4 rounded-xl font-black text-xl shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] transition-all uppercase">
                  Hire Now
                </button>
                <p className="text-center text-xs font-bold text-gray-400 mt-4 uppercase">
                  No Cancellation Fees
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
