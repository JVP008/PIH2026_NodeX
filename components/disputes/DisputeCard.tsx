'use client';

import { Dispute } from '@/types';

export default function DisputeCard({ dispute }: { dispute: Dispute }) {
    return (
        <div className="border-[3px] border-black p-6 flex items-center justify-between bg-white neo-shadow-small hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
            <div className="space-y-1">
                <h4 className="font-black uppercase text-sm tracking-tight border-b-2 border-black/10 pb-1 flex items-center gap-2">
                    <span className="w-2 h-2 bg-black" />
                    {dispute.booking?.contractor?.service || 'SERVICE'} — {dispute.booking?.contractor?.name || 'CONTRACTOR'}
                </h4>
                <div className="flex gap-4 pt-1">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
                        DATE: {dispute.created_at ? new Date(dispute.created_at).toLocaleDateString() : 'UNKNOWN'}
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#FF6B6B]">
                        TYPE: {dispute.type}
                    </p>
                </div>
            </div>

            <div className={`px-4 py-2 border-[2px] border-black font-[900] text-[10px] uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FFD700] text-black italic -rotate-2`}>
                {dispute.status}
            </div>
        </div>
    );
}
