'use client';

const testimonials = [
    {
        name: 'Priya Sharma',
        city: 'Mumbai',
        service: 'Plumbing',
        review: 'Got a plumber in under 2 hours for a burst pipe emergency. The contractor was verified and fixed it perfectly. HouseConnect saved my day!',
        rating: 5,
        avatar: '👩',
    },
    {
        name: 'Rahul Menon',
        city: 'Bengaluru',
        service: 'Electrical',
        review: 'Found a certified electrician for my new flat wiring. Price was transparent from the start — no hidden charges. Will use again.',
        rating: 5,
        avatar: '👨',
    },
    {
        name: 'Anita Gupta',
        city: 'Delhi NCR',
        service: 'Cleaning',
        review: 'The deep cleaning team for my 3BHK was exceptional. They used eco-friendly products and were done in 4 hours. ₹2200 well spent.',
        rating: 4,
        avatar: '👩‍💼',
    },
    {
        name: 'Karthik Iyer',
        city: 'Chennai',
        service: 'HVAC',
        review: 'AC was making noise for months. Booked the HVAC guy on Sunday evening, he came Monday morning. Fixed the compressor issue. 10/10!',
        rating: 5,
        avatar: '🧑',
    },
];

export default function Testimonials() {
    return (
        <section className="py-16 px-4 bg-yellow-50 border-y-4 border-black">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <span className="bg-pink-300 border-2 border-black text-black font-black px-4 py-1 rounded-full text-sm shadow-[2px_2px_0px_0px_#000] inline-block mb-3">
                        ⭐ Customer Stories
                    </span>
                    <h2 className="text-4xl font-black uppercase tracking-tight">
                        Real People, Real Results
                    </h2>
                    <p className="text-black font-medium text-lg mt-2">
                        Thousands of homeowners across India trust HouseConnect Pro
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="bg-white border-3 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-3px] hover:shadow-[6px_6px_0px_0px_#000] transition-all"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-4xl">{t.avatar}</span>
                                <div>
                                    <p className="font-black text-sm">{t.name}</p>
                                    <p className="text-gray-500 text-xs font-bold">📍 {t.city}</p>
                                </div>
                            </div>

                            <div className="flex gap-0.5 mb-3">
                                {[...Array(5)].map((_, j) => (
                                    <span key={j} className={j < t.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                                ))}
                            </div>

                            <p className="text-black font-medium text-sm leading-relaxed mb-4">
                                &ldquo;{t.review}&rdquo;
                            </p>

                            <span className="bg-blue-100 border-2 border-black text-black font-bold text-xs px-2 py-1 rounded-lg shadow-[1px_1px_0px_0px_#000]">
                                {t.service}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
