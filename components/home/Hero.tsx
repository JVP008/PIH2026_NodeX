'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Hero() {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Stagger entrance animations
        const els = [headingRef.current, subRef.current, cardsRef.current];
        els.forEach((el, i) => {
            if (!el) return;
            el.style.opacity = '0';
            el.style.transform = 'translateY(28px)';
            el.style.transition = `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`;
            requestAnimationFrame(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        });
    }, []);

    return (
        <div className="gradient-bg text-white py-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 ref={headingRef} className="text-5xl font-bold mb-6">
                    Connect. Work. Get It Done.
                </h1>
                <p ref={subRef} className="text-xl text-blue-100 mb-4 max-w-2xl mx-auto">
                    Whether you&apos;re a skilled professional looking for clients, or a homeowner who needs a trusted hand — we&apos;ve got you covered.
                </p>

                <div ref={cardsRef} className="flex flex-col md:flex-row gap-6 justify-center mt-10">
                    {/* For Professionals */}
                    <div className="flex flex-col items-center bg-white/10 border border-white/30 rounded-2xl px-8 py-6 min-w-[220px] hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer">
                        <i className="fas fa-briefcase text-3xl mb-3 text-blue-200"></i>
                        <p className="text-sm text-blue-200 mb-3 font-medium uppercase tracking-wider">I&apos;m a Professional</p>
                        <Link href="/post-job" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition text-sm">
                            Post Your Services
                        </Link>
                    </div>

                    {/* For Homeowners */}
                    <div className="flex flex-col items-center bg-white/10 border border-white/30 rounded-2xl px-8 py-6 min-w-[220px] hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer">
                        <i className="fas fa-home text-3xl mb-3 text-blue-200"></i>
                        <p className="text-sm text-blue-200 mb-3 font-medium uppercase tracking-wider">I need a Pro</p>
                        <Link href="/contractors" className="border-2 border-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition text-sm">
                            Find Pros Near Me
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
