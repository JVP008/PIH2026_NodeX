'use client';

const TESTIMONIALS = [
    {
        name: 'Priya Sharma',
        location: 'Mumbai',
        text: '"Finding a reliable plumber used to be a nightmare. Within an hour of posting my job, I had 3 quotes. The professional arrived on time and fixed the leak perfectly. Highly recommended!"',
        service: 'Plumbing',
        serviceColor: 'bg-[#BAE6FD]',
        avatar: '👩🏽'
    },
    {
        name: 'Rahul Desai',
        location: 'Pune',
        text: '"We needed our whole house painted before Diwali. The painters we found through HouseConnect were incredibly professional, clean, and fast. The pricing was completely transparent."',
        service: 'Painting',
        serviceColor: 'bg-[#FBCFE8]',
        avatar: '👨🏽'
    },
    {
        name: 'Anjali Gupta',
        location: 'Bengaluru',
        text: '"My AC broke down in the middle of May. HouseConnect found me an HVAC expert in 30 minutes who had it running again the same evening. Lifesaver!"',
        service: 'HVAC',
        serviceColor: 'bg-[#BBF7D0]',
        avatar: '👩🏻'
    }
];

export default function Testimonials() {
    return (
        <div className="relative pt-16 pb-24 overflow-hidden bg-[#fafafa]">
            <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col items-center">
                {/* Top Badge */}
                <div className="bg-[#FBCFE8] border-[3px] border-black rounded-full px-6 py-2 transform rotate-1 neo-shadow-small mb-8 inline-block">
                    <span className="font-black text-xs uppercase tracking-widest text-black">
                        Customer Stories
                    </span>
                </div>

                {/* Main Headline */}
                <h2 className="text-3xl md:text-5xl font-black text-center text-black uppercase tracking-tighter mb-16">
                    Real People, <span className="text-[#10b981]">Real Results</span>
                </h2>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {TESTIMONIALS.map((t, idx) => (
                        <div key={idx} className="bg-[#fefce8] border-[3px] border-black rounded-lg p-6 neo-shadow hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_#000] transition-all flex flex-col h-full relative">
                            {/* Avatar & Header */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center text-2xl neo-shadow-small">
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="font-black text-sm uppercase">{t.name}</div>
                                    <div className="text-xs font-bold text-gray-500">{t.location}</div>
                                </div>
                            </div>

                            {/* Stars */}
                            <div className="flex text-[#FFD700] text-sm mb-4 space-x-1 drop-shadow-[1px_1px_0_black]">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>

                            {/* Text content */}
                            <p className="font-medium text-sm leading-relaxed text-black mb-8 flex-grow italic">
                                {t.text}
                            </p>

                            {/* Bottom Service Badge */}
                            <div className="mt-auto self-start">
                                <span className={`${t.serviceColor} border-2 border-black rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-black`}>
                                    {t.service}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
