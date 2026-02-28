'use client';

const stats = [
    { icon: '🏠', number: '₹1.2L Cr', label: 'Market Size in India', color: 'bg-indigo-300' },
    { icon: '😟', number: '90%', label: 'Services Are Unorganized', color: 'bg-rose-300' },
    { icon: '🌆', number: '50+ Cities', label: 'Cities Covered', color: 'bg-emerald-300' },
    { icon: '⚡', number: '<2 Hours', label: 'Average Response Time', color: 'bg-amber-300' },
];

export default function ImpactBanner() {
    return (
        <section className="relative py-20 px-4 bg-[#fdfbf8] overflow-hidden border-y-8 border-yellow-300">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-10 right-10 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto z-10">
                <div className="text-center mb-12">
                    <div className="inline-block transform -rotate-2 mb-6">
                        <span className="bg-yellow-300 text-black px-6 py-2 text-xl font-black uppercase tracking-wider border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            The Bharat Opportunity
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-black mb-6 leading-none">
                        Fixing India&apos;s <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600">
                            Broken Services
                        </span>
                    </h2>
                    <p className="font-bold text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        The home services sector is massive, chaotic, and completely unorganized. We&apos;re bringing transparency, speed, and trust — one verified booking at a time.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4">
                    {stats.map((s, i) => (
                        <div
                            key={i}
                            className={`group relative bg-white border-4 border-black rounded-2xl p-6 text-center shadow-[8px_8px_0px_0px_#000000] hover:-translate-y-2 hover:translate-x-2 hover:shadow-none transition-all duration-300 cursor-default`}
                        >
                            <div className={`absolute -top-6 -right-6 w-16 h-16 ${s.color} border-4 border-black rounded-full flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_#000] rotate-12 group-hover:rotate-0 transition-transform duration-300 z-10`}>
                                {s.icon}
                            </div>
                            <div className="pt-4">
                                <div className="text-4xl md:text-5xl font-black text-black mb-2 tracking-tighter">
                                    {s.number}
                                </div>
                                <div className="text-base font-bold text-gray-500 uppercase tracking-wide">
                                    {s.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="inline-block bg-white border-2 border-black text-black shadow-[4px_4px_0px_0px_#000] px-8 py-3 rounded-full text-sm font-bold tracking-wide">
                        Trusted by 10,000+ homeowners across Mumbai, Delhi, Bengaluru, Chennai, & Hyderabad.
                    </p>
                </div>
            </div>
        </section>
    );
}

