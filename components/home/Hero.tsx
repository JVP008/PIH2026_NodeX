'use client';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative py-20 px-4 bg-[#fdfbf8] overflow-hidden border-b-8 border-yellow-300">
            {/* Animated Blobs */}
            <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
                <div className="absolute top-10 left-10 w-80 h-80 bg-yellow-200 rounded-full filter blur-3xl animate-blob" />
                <div className="absolute top-20 right-10 w-80 h-80 bg-pink-200 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
            </div>
            <div className="relative max-w-7xl mx-auto text-center z-10">
                <div className="inline-block transform -rotate-2 mb-6 bg-yellow-300 border-4 border-black shadow-[4px_4px_0px_0px_#000] px-6 py-2">
                    <span className="text-sm font-black uppercase">Verified Pros · 50+ Cities</span>
                </div>
                <h1 className="text-6xl font-black mb-6 uppercase tracking-tight text-black drop-shadow-[2px_2px_0px_white]">
                    Find Trusted Pros in Minutes
                </h1>
                <p className="text-2xl font-bold mb-8 max-w-2xl mx-auto">
                    Tell us what needs fixing and we connect you with the best local workers in your city.
                </p>
                <div className="flex gap-6 justify-center">
                    <Link href="/post-job" className="bg-yellow-300 border-3 border-black px-8 py-4 rounded-lg font-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px]">
                        POST A JOB
                    </Link>
                    <Link href="/contractors" className="bg-white border-3 border-black px-8 py-4 rounded-lg font-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px]">
                        BROWSE PROS
                    </Link>
                </div>
            </div>
        </section>
    );
}
