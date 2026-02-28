'use client';

const STEPS = [
    { n: 1, t: 'Describe Job', d: 'Tell us what you need. AI handles the details.', c: 'bg-[#BAE6FD]' },
    { n: 2, t: 'AI Match', d: 'Top-rated pros based on skills & reviews.', c: 'bg-[#FEF08A]' },
    { n: 3, t: 'Book Slot', d: 'Pick a time that works. Instant confirmation.', c: 'bg-[#FBCFE8]' },
    { n: 4, t: 'Pay Secure', d: 'Secure payments held until job completion.', c: 'bg-[#BBF7D0]' },
];

export default function HowItWorks() {
    return (
        <div className="relative pt-16 pb-24 overflow-hidden bg-white">
            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16 relative">
                    {/* Horizontal yellow line behind the heading */}
                    <div className="absolute top-1/2 left-0 w-full h-[6px] bg-[#FFD700] -translate-y-1/2 -z-10 hidden md:block"></div>
                    <h2 className="text-2xl md:text-3xl font-[900] uppercase tracking-tighter text-black bg-white inline-block px-4">
                        How It Works
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 relative text-center">
                    {STEPS.map((step) => (
                        <div key={step.n} className="flex flex-col items-center">
                            <div className={`w-12 h-12 rounded-full ${step.c} border-[2px] border-black flex items-center justify-center mb-6 text-xl font-black text-black neo-shadow-small`}>
                                {step.n}
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-tight mb-3 text-black">
                                {step.t}
                            </h3>
                            <p className="text-sm font-medium leading-relaxed text-gray-700">
                                {step.d}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
