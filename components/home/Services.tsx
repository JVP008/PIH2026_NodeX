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
        { name: 'Cleaning', icon: 'fa-broom', color: 'green' },
        { name: 'HVAC', icon: 'fa-fan', color: 'cyan' },
        { name: 'Painting', icon: 'fa-paint-roller', color: 'pink' },
        { name: 'Landscaping', icon: 'fa-leaf', color: 'emerald' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-[900] uppercase tracking-tighter text-black leading-none inline-block border-b-8 border-black pb-2">
                    Our Services
                </h2>
                <p className="text-xs font-black uppercase tracking-[0.4em] mt-4 opacity-40 italic">Quality help for every home</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
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
    );
}
