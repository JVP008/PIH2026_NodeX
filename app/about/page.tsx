export default function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto px-10 py-24 my-20 bg-white border-[6px] border-black neo-shadow-large rotate-[-1deg]">
            <h1 className="text-6xl md:text-8xl font-[900] uppercase tracking-tighter text-black leading-none mb-12 drop-shadow-[6px_6px_0_rgba(255,215,0,1)] rotate-1">
                The Pro Mission
            </h1>

            <div className="space-y-12 text-black font-bold uppercase tracking-tight">
                <p className="text-2xl md:text-4xl leading-tight border-b-[8px] border-black pb-8 italic">
                    Finding reliable, skilled local professionals should not be a struggle. We built this engine to solve it.
                </p>

                <div className="grid md:grid-cols-2 gap-12 text-sm leading-relaxed tracking-wider">
                    <p className="bg-yellow-100 p-6 border-[3px] border-black neo-shadow-small rotate-1">
                        Our platform bridges the gap between hardworking contractors and homeowners who need quality work done right. Whether it&apos;s fixing a tricky plumbing leak, undertaking a fresh paint job, or a complete electrical overhaul, we verify and seamlessly connect you with the best independent professionals.
                    </p>
                    <p className="bg-cyan-100 p-6 border-[3px] border-black neo-shadow-small -rotate-1">
                        Instead of relying on unverified word-of-mouth or browsing endless online directories, we bring the best talent directly to your screen. Ratings, transparent pricing, and instant availability statuses are baked directly into our system logic.
                    </p>
                </div>

                <div className="mt-20">
                    <h2 className="text-4xl font-[900] uppercase tracking-tighter mb-6 underline decoration-8 decoration-[#FFD700]">The Manifesto</h2>
                    <div className="bg-black text-white p-12 border-[4px] border-black neo-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[15px_15px_0px_0px_#4ECDC4] transition-all">
                        <p className="text-xl md:text-2xl font-black uppercase leading-tight tracking-[0.05em]">
                            Empower local tradespeople to grow their independent businesses while giving homeowners absolute peace of mind, pricing transparency, and top-tier service standards.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
