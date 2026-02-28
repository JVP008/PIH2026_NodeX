"use client";

import { Dispute } from "@/types";

export default function DisputeCard({ dispute }: { dispute: Dispute }) {
  const getStatusStyle = (status: string | null) => {
    switch (status?.toLowerCase()) {
      case "resolved":
        return "bg-green-200";
      case "rejected":
        return "bg-red-200";
      case "in review":
      default:
        return "bg-yellow-200";
    }
  };

  return (
    <div className="bg-white border-3 border-black rounded-xl shadow-[6px_6px_0px_0px_#000] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#000] transition-all">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-black text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-widest rounded leading-none">
            Case #{dispute.id.slice(0, 8)}
          </span>
          <h4 className="font-black text-lg uppercase tracking-tight">
            {dispute.type.replace(/([A-Z])/g, " $1")}
          </h4>
        </div>
        <p className="text-black font-medium text-sm leading-relaxed mb-2">
          {dispute.description}
        </p>
        <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-wide">
          <span>
            <i className="far fa-calendar-alt mr-1"></i>{" "}
            {dispute.created_at
              ? new Date(dispute.created_at).toLocaleDateString("en-IN")
              : "Unknown Date"}
          </span>
          {dispute.name && (
            <span>
              <i className="far fa-user mr-1"></i> {dispute.name}
            </span>
          )}
        </div>
      </div>
      <div className="shrink-0">
        <span
          className={`px-4 py-1.5 rounded-lg font-black border-2 border-black shadow-[3px_3px_0px_0px_#000] text-xs uppercase tracking-widest ${getStatusStyle(dispute.status)}`}
        >
          {dispute.status || "In Review"}
        </span>
      </div>
    </div>
  );
}
