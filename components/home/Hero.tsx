"use client";

import { memo } from "react";
import Link from "next/link";

const Hero = memo(() => {
  return (
    <section className="relative py-20 px-4 bg-[#fdfbf8] overflow-hidden border-b-8 border-yellow-300">
      {/* Background creative elements - same as ImpactBanner */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40 pointer-events-none">
        <div className="absolute top-10 left-10 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-20 right-10 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
        <div className="inline-block transform -rotate-2 mb-6 text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-yellow-300">
          <span className="px-6 py-2 text-sm font-black uppercase tracking-wider block">
            Verified Pros · 50+ Cities
          </span>
        </div>
        <h1 className="text-6xl font-black mb-6 tracking-tight text-black drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">
          Find Trusted Pros in Minutes
        </h1>

        <p className="text-2xl text-black font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
          Tell us what needs fixing at home and we connect you with trusted,
          verified local professionals in your city.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link
            href="/post-job"
            className="bg-yellow-300 text-black border-3 border-black px-8 py-4 rounded-lg font-bold shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] hover:bg-yellow-400 transition-all text-xl flex items-center justify-center animate-wiggle"
          >
            <i className="fas fa-briefcase mr-3"></i>POST A JOB
          </Link>
          <Link
            href="/contractors"
            className="bg-white text-black border-3 border-black px-8 py-4 rounded-lg font-bold shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] hover:bg-gray-50 transition-all text-xl flex items-center justify-center animate-wiggle"
          >
            <i className="fas fa-search mr-3"></i>BROWSE PROS
          </Link>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
