'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Hero() {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;
        const els = Array.from(contentRef.current.children) as HTMLElement[];
        els.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.6s ease ${i * 0.15}s, transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${i * 0.15}s`;
            requestAnimationFrame(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        });
    }, []);

    return (
        <div className="relative pt-24 pb-32 overflow-hidden bg-[#fafafa]">
            {/* Ambient Blurred Backgrounds */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[70%] bg-yellow-100 rounded-full blur-[100px] opacity-70 pointer-events-none"></div>
            <div className="absolute top-[10%] right-[-10%] w-[40%] h-[60%] bg-pink-100 rounded-full blur-[100px] opacity-70 pointer-events-none"></div>

            <div className="relative max-w-5xl mx-auto px-4 text-center z-10" ref={contentRef}>
                {/* Badge */}
                <div className="inline-block transform -rotate-2 mb-8 mt-4 hover:rotate-0 transition-transform">
                    <span className="bg-[#FFD700] text-black text-[10px] md:text-sm font-black uppercase tracking-[0.2em] px-4 py-2 border-2 border-black neo-shadow-small">
                        Verified Pros • 50+ Cities
                    </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-black mb-6 leading-[1.1]">
                    Find Trusted Pros in Minutes
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl font-medium text-black/80 max-w-2xl mx-auto mb-12">
                    Tell us what needs fixing at home and we connect you with
                    <br className="hidden md:block" />
                    trusted, verified local professionals in your city.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link
                        href="/post-job"
                        className="flex items-center gap-3 bg-[#FFD700] text-black px-8 py-4 font-black text-sm uppercase tracking-widest border-[3px] border-black neo-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                    >
                        <i className="fas fa-lock"></i>
                        Post A Job
                    </Link>

                    <Link
                        href="/contractors"
                        className="flex items-center gap-3 bg-white text-black px-8 py-4 font-black text-sm uppercase tracking-widest border-[3px] border-black neo-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                    >
                        <i className="fas fa-search"></i>
                        Browse Pros
                    </Link>
                </div>
            </div>
        </div>
    );
}
