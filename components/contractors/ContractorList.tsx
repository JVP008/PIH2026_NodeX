"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Contractor } from "@/types";

export default function ContractorList({
  initialContractors,
}: {
  initialContractors: Contractor[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    "Plumbing",
    "Electrical",
    "Cleaning",
    "HVAC",
    "Painting",
    "Landscaping",
  ];

  const filteredContractors = useMemo(() => {
    return initialContractors.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.service.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === "All" || c.service === filter;
      return matchesSearch && matchesFilter;
    });
  }, [initialContractors, searchTerm, filter]);

  return (
    <div className="space-y-10">
      {/* Search and Filters Section */}
      <div className="bg-white border-4 border-black p-8 rounded-xl shadow-[8px_8px_0px_0px_#000] space-y-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a name or service..."
            className="w-full p-4 pl-12 bg-gray-50 border-3 border-black rounded-lg font-bold text-lg focus:shadow-[4px_4px_0px_0px_#000] outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-40"></i>
        </div>
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 border-2 border-black rounded-full font-black text-sm transition-all shadow-[3px_3px_0px_0px_#000] ${filter === cat ? "bg-yellow-300 translate-y-[-2px] shadow-[5px_5px_0px_0px_#000]" : "bg-white hover:bg-gray-100"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <h2 className="text-xl font-black mb-4">
        {filteredContractors.length} professionals found
      </h2>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredContractors.map((c: Contractor) => (
          <div
            key={c.id}
            className="bg-white border-[3px] border-black rounded-lg p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col"
          >
            {/* Top Section */}
            <div className="flex justify-between items-start gap-4 mb-4">
              <div className="flex gap-4">
                {/* Avatar */}
                <div className="w-[80px] h-[80px] rounded-full border-[3px] border-black flex flex-shrink-0 items-center justify-center bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-5xl overflow-hidden">
                  {c.image || "👷"}
                </div>
                {/* Details */}
                <div>
                  <h3 className="text-2xl font-black leading-tight max-w-[150px]">
                    {c.name.split(" ").map((n, i) => (
                      <span key={i} className="block">
                        {n}
                      </span>
                    ))}
                  </h3>
                  {c.verified && (
                    <div className="inline-flex items-center gap-1 border-2 border-black rounded-md px-1.5 py-0.5 text-[10px] font-bold bg-[#e3f2fd] mt-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <i className="fas fa-check-circle text-black"></i>{" "}
                      Verified
                    </div>
                  )}
                  <div className="text-xs font-bold text-gray-700 mt-2 truncate max-w-[150px]">
                    {c.service} • {c.location}
                  </div>
                </div>
              </div>
              {/* Rating */}
              <div className="text-right flex-shrink-0">
                <div className="flex items-center justify-end gap-1 font-black text-lg">
                  <span className="text-yellow-400">⭐</span> {c.rating}{" "}
                  <span className="text-sm font-bold text-gray-500">
                    ({c.reviews})
                  </span>
                </div>
                <div className="text-xs font-bold text-gray-700 mt-1">
                  {c.completed_jobs} jobs
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm font-medium text-gray-800 line-clamp-3 leading-relaxed mb-5">
              {c.description ? c.description : "No description provided."}
            </p>

            {/* Price & Available */}
            <div className="flex flex-wrap gap-3 mb-5">
              <div className="border-[3px] border-black bg-[#fff59d] px-3 py-1 font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-md">
                {c.price || "Contact for Quote"}
              </div>
              {c.available && (
                <div className="flex items-center gap-2 border-[3px] border-black bg-[#a5d6a7] px-3 py-1 font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-md">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full border border-black"></div>
                  Available
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 mt-auto items-start">
              <Link
                href={`/contractors/${c.id}`}
                className="block min-w-[140px] text-center border-[3px] border-black bg-white px-4 py-2 font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-md hover:bg-gray-50 transition-all hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                View Profile
              </Link>
              <Link
                href={`/book/${c.id}`}
                className="block min-w-[140px] text-center border-[3px] border-black bg-[#64b5f6] px-4 py-2 font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-md hover:bg-[#42a5f5] transition-all hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}

        {filteredContractors.length === 0 && (
          <div className="col-span-full text-center py-20 border-4 border-black border-dashed rounded-xl opacity-30">
            <p className="text-2xl font-black uppercase">
              No professionals found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
