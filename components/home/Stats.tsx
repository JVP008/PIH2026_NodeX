const STATIC_STATS = [
    { value: '50+', label: 'Verified Pros', color: 'bg-blue-400', delay: 'fade-up-delay-1' },
    { value: '98%', label: 'Satisfaction', color: 'bg-green-400', delay: 'fade-up-delay-2' },
    { value: '1,200+', label: 'Jobs Posted', color: 'bg-purple-400', delay: 'fade-up-delay-3' },
    { value: '4.8', label: 'Avg Rating', color: 'bg-orange-400', delay: 'fade-up-delay-4' },
];

export default function Stats() {
    return (
        <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {STATIC_STATS.map(({ value, label, color, delay }) => (
                    <div
                        key={label}
                        className={`${color} border-[4px] border-black p-6 text-center neo-shadow-large ${delay} hover:-translate-y-1 hover:-translate-x-1 transition-transform cursor-default group`}
                    >
                        <div className="text-4xl md:text-5xl font-black text-black leading-tight drop-shadow-[2px_2px_0_white]">
                            {value}
                        </div>
                        <div className="text-xs uppercase font-black text-black mt-2 tracking-widest bg-white border-2 border-black px-2 py-1 rotate-1 group-hover:rotate-0 transition-transform inline-block">
                            {label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
