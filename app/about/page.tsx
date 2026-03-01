import React from 'react';

// Static page explaining why HouseConnect exists and what trust promises we make.
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-pink-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        <div className="w-16 h-16 bg-yellow-300 border-3 border-black rounded-lg flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_#000]">
          <i className="fas fa-users text-2xl text-black"></i>
        </div>
        <h1 className="text-5xl font-black uppercase tracking-tight mb-8 text-black">About Us</h1>

        <div className="space-y-6 text-xl font-medium text-black leading-relaxed">
          <p>
            We started HouseConnect because finding a good plumber or electrician in India should
            not feel like a gamble. We are just a group of people who got tired of sketchy repairs
            and inflated prices. So we built this platform to fix that problem for everyone.
          </p>
          <p>
            We check every professional&apos;s ID and background before they can take a job here. We
            also collect real reviews from real people. If something goes wrong, we step in to help
            fix it. That is our promise to you.
          </p>
          <div className="bg-blue-100 p-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_#000] mt-8">
            <h3 className="font-black uppercase text-2xl mb-2">Our Mission</h3>
            <p>
              To make home maintenance completely stress-free for every Indian household. No
              haggling. No showing up late. Just good honest work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
