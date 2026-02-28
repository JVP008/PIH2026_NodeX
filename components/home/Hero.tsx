'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Hero() {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const els = [headingRef.current, subRef.current, cardsRef.current];
        els.forEach((el, i) => {
            if (!el) return;
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = `opacity 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${i * 0.15}s, transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${i * 0.15}s`;
            requestAnimationFrame(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        });
    }, []);

    return (
        <div className="bg-[#FFD700] text-black pt-20 pb-20 border-b-[6px] border-black">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 ref={headingRef} className="text-6xl md:text-8xl font-[900] uppercase tracking-tighter mb-6 leading-[0.9]">
                    Connect. Work. <br />
                    <span className="bg-black text-[#FFD700] px-4 -rotate-1 inline-block">Get It Done.</span>
                </h1>

                <p ref={subRef} className="text-xl md:text-2xl font-bold bg-white border-2 border-black inline-block px-4 py-2 mt-4 max-w-2xl mx-auto neo-shadow">
                    Skilled pros looking for clients, or homeowners needing a trusted hand.
                </p>

                <div ref={cardsRef} className="flex flex-col md:flex-row gap-10 justify-center mt-16 px-4">
                    {/* For Professionals */}
                    <div className="group relative bg-[#4ECDC4] border-[4px] border-black p-8 text-center neo-shadow-large hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer">
                        <div className="bg-white border-2 border-black w-14 h-14 flex items-center justify-center mx-auto mb-4 -rotate-3 group-hover:rotate-0 transition-transform">
                            <i className="fas fa-briefcase text-2xl"></i>
                        </div>
                        <p className="text-sm font-black uppercase tracking-widest mb-4">I&apos;m a Professional</p>
                        <Link href="/post-job" className="bg-black text-white px-8 py-4 font-black uppercase tracking-tighter hover:bg-white hover:text-black border-2 border-black transition-colors inline-block neo-shadow active:translate-x-1 active:translate-y-1 active:shadow-none">
                            Post Your Services
                        </Link>
                    </div>

                    {/* For Homeowners */}
                    <div className="group relative bg-[#FF6B6B] border-[4px] border-black p-8 text-center neo-shadow-large hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer">
                        <div className="bg-white border-2 border-black w-14 h-14 flex items-center justify-center mx-auto mb-4 rotate-3 group-hover:rotate-0 transition-transform">
                            <i className="fas fa-home text-2xl"></i>
                        </div>
                        <p className="text-sm font-black uppercase tracking-widest mb-4">I need a Pro</p>
                        <Link href="/contractors" className="bg-black text-white px-8 py-4 font-black uppercase tracking-tighter hover:bg-white hover:text-black border-2 border-black transition-colors inline-block neo-shadow active:translate-x-1 active:translate-y-1 active:shadow-none">
                            Find Pros Near Me
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
