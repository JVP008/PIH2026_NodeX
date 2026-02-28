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

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredContractors.map((c: Contractor) => (
          <div
            key={c.id}
            className="bg-white border-4 border-black rounded-xl p-6 shadow-[8px_8px_0px_0px_#000] hover:translate-y-[-4px] transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{c.image || "👷"}</span>
              <div>
                <h3 className="font-black text-xl">{c.name}</h3>
                <p className="text-sm font-bold text-blue-600 uppercase tracking-tighter">
                  {c.service}
                </p>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-6 italic line-clamp-2 leading-relaxed">
              {c.description
                ? `"${c.description}"`
                : '"No description provided."'}
            </p>
            <div className="flex justify-between items-center bg-gray-50 border-2 border-black p-3 rounded-lg font-black text-[10px] mb-6 uppercase tracking-tight">
              <span>⭐ {c.rating}</span>
              <span className="text-green-600">✅ Verified</span>
              <span>📍 {c.location}</span>
            </div>
            <Link
              href={`/contractors/${c.id}`}
              className="block w-full text-center bg-black text-white py-3 rounded-lg font-black uppercase text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:bg-gray-800 transition-all"
            >
              View Profile
            </Link>
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
