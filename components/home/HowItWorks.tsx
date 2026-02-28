'use client';

const STEPS = [
    { n: 1, t: 'Describe Job', d: 'Tell us what you need. AI handles the details.', c: 'bg-yellow-400' },
    { n: 2, t: 'AI Match', d: 'Top-rated pros based on skills & reviews.', c: 'bg-pink-400' },
    { n: 3, t: 'Book Slot', d: 'Pick a time that works. Instant confirmation.', c: 'bg-emerald-400' },
    { n: 4, t: 'Pay Secure', d: 'Secure payments held until job completion.', c: 'bg-cyan-400' },
];

export default function HowItWorks() {
    return (
        <div className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-7xl font-[900] uppercase tracking-tighter text-black leading-none inline-block border-b-8 border-black pb-2">
                        How It Works
                    </h2>
                </div>

                <div className="grid md:grid-cols-4 gap-12">
                    {STEPS.map((step) => (
                        <div key={step.n} className="group relative">
                            <div className={`${step.c} border-[4px] border-black p-8 text-center h-full neo-shadow-large group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-all`}>
                                <div className="w-16 h-16 bg-white border-[4px] border-black flex items-center justify-center mx-auto mb-6 -mt-16 text-2xl font-black rotate-12 group-hover:rotate-0 transition-transform neo-shadow-small">
                                    {step.n}
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tighter mb-4 text-black">
                                    {step.t}
                                </h3>
                                <p className="text-xs font-bold leading-relaxed text-black/70 uppercase">
                                    {step.d}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
