const STATIC_STATS = [
    { value: '1540+', label: 'VERIFIED PROS', color: 'bg-[#FBCFE8]' },
    { value: '98%', label: 'SATISFACTION', color: 'bg-[#BBF7D0]' },
    { value: '8930+', label: 'JOBS POSTED', color: 'bg-[#BAE6FD]' },
    { value: '4.8', label: 'AVG RATING', color: 'bg-[#FEF08A]' },
];

export default function Stats() {
    return (
        <div className="relative max-w-5xl mx-auto px-4 -mt-16 z-20">
            {/* The continuous yellow line behind the stats box */}
            <div className="absolute top-1/2 left-0 w-full h-[3px] bg-[#FFD700] -translate-y-1/2 -z-10 hidden md:block"></div>

            <div className="bg-white border-[4px] border-black rounded-lg p-3 custom-shadow flex flex-col md:flex-row gap-3 shadow-[8px_8px_0px_#000]">
                {STATIC_STATS.map(({ value, label, color }) => (
                    <div
                        key={label}
                        className={`${color} flex-1 border-[3px] border-black rounded-md py-6 px-4 text-center hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#000] transition-all cursor-default relative overflow-hidden`}
                    >
                        <div className="text-3xl md:text-4xl font-black text-black tracking-tight mb-1">
                            {value}
                        </div>
                        <div className="text-[10px] md:text-xs font-black text-black uppercase tracking-widest opacity-80">
                            {label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
