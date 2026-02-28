import Link from 'next/link';

const POSITIONS = [
    { title: 'Senior React Engineer', type: 'Remote (India) • Full-time', color: 'bg-[#FFD700]' },
    { title: 'Onboarding Specialist', type: 'Nagpur / Hybrid • Full-time', color: 'bg-[#4ECDC4]' },
    { title: 'Success Manager', type: 'Mumbai • Full-time', color: 'bg-[#FF6B6B]' },
];

export default function CareersPage() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-24 my-20">
            <div className="mb-16 border-b-[8px] border-black pb-8">
                <h1 className="text-6xl md:text-8xl font-[900] uppercase tracking-tighter text-black leading-none italic">Join The Squad</h1>
                <p className="text-xs font-black uppercase tracking-[0.4em] mt-6 opacity-40">Help us architect the future of local services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
                {POSITIONS.map((pos) => (
                    <div key={pos.title} className="group relative bg-white border-[4px] border-black p-8 neo-shadow-large hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
                        <div className={`w-12 h-12 ${pos.color} border-[3px] border-black flex items-center justify-center mb-6 -rotate-6 group-hover:rotate-0 transition-all neo-shadow-small`}>
                            <i className="fas fa-bolt text-black"></i>
                        </div>
                        <h3 className="text-2xl font-[900] uppercase tracking-tight mb-2 underline decoration-4 decoration-black/10 group-hover:decoration-black/40 transition-all">{pos.title}</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-10">{pos.type}</p>

                        <Link
                            href="mailto:careers@houseconnect.in"
                            className="block w-full text-center bg-black text-white py-4 border-[3px] border-black font-black uppercase text-xs tracking-[0.2em] neo-shadow-small hover:bg-[#FFD700] hover:text-black hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all active:translate-y-0"
                        >
                            Submit Intel
                        </Link>
                    </div>
                ))}
            </div>

            <div className="mt-20 border-[4px] border-black p-10 bg-black text-[#FFD700] neo-shadow-large rotate-1">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 italic">Ghost Role?</h2>
                        <p className="text-[10px] uppercase font-black tracking-widest opacity-70">Don&apos;t see a match? Send your dossier to our HQ anyway.</p>
                    </div>
                    <a
                        href="mailto:careers@houseconnect.in"
                        className="px-10 py-5 bg-[#FFD700] text-black border-[4px] border-[#FFD700] font-black uppercase text-sm tracking-widest hover:bg-black hover:text-[#FFD700] transition-colors neo-shadow-small"
                    >
                        careers@houseconnect.in
                    </a>
                </div>
            </div>
        </div>
    );
}
