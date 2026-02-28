'use client';

import { useRouter } from 'next/navigation';
import ServiceCard from './ServiceCard';

export default function Services() {
    const router = useRouter();

    const handleServiceClick = (service: string) => {
        router.push(`/post-job?service=${service}`);
    };

    const services = [
        { name: 'Plumbing', icon: 'fa-wrench', color: 'blue' },
        { name: 'Electrical', icon: 'fa-bolt', color: 'yellow' },
        { name: 'Cleaning', icon: 'fa-broom', color: 'light' },
        { name: 'HVAC', icon: 'fa-fan', color: 'cyan' },
        { name: 'Painting', icon: 'fa-paint-roller', color: 'pink' },
        { name: 'Landscaping', icon: 'fa-leaf', color: 'emerald' },
    ];

    return (
        <div className="relative pt-16 pb-24 overflow-hidden bg-[#fafafa]">
            {/* The continuous yellow line behind the service cards */}
            <div className="absolute top-[65%] left-0 w-full h-[6px] bg-[#FFD700] -translate-y-1/2 z-0 hidden lg:block"></div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-[900] uppercase tracking-tighter text-black">
                        Our Services
                    </h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8 justify-center">
                    {services.map((s) => (
                        <ServiceCard
                            key={s.name}
                            name={s.name}
                            icon={s.icon}
                            color={s.color}
                            onClick={handleServiceClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
