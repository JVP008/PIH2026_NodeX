'use client';

interface ServiceCardProps {
    name: string;
    icon: string;
    color: string;
    onClick: (name: string) => void;
}

export default function ServiceCard({ name, icon, color, onClick }: ServiceCardProps) {
    const colorMap: Record<string, { bg: string, text: string }> = {
        blue: { bg: 'bg-[#3b82f6]', text: 'text-white' },
        yellow: { bg: 'bg-[#FFD700]', text: 'text-black' },
        green: { bg: 'bg-[#10b981]', text: 'text-white' },
        cyan: { bg: 'bg-[#4ECDC4]', text: 'text-black' },
        pink: { bg: 'bg-[#FF6B6B]', text: 'text-black' },
        emerald: { bg: 'bg-[#059669]', text: 'text-white' },
    };

    const styles = colorMap[color] || colorMap.blue;

    return (
        <div
            onClick={() => onClick(name)}
            className="group relative bg-white border-[3px] border-black p-6 neo-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer text-center"
        >
            <div className={`w-16 h-16 ${styles.bg} border-2 border-black flex items-center justify-center mx-auto mb-4 -rotate-3 group-hover:rotate-0 transition-transform neo-shadow-small`}>
                <i className={`fas ${icon} text-2xl ${styles.text}`}></i>
            </div>
            <h3 className="font-black uppercase tracking-tighter text-sm">{name}</h3>
        </div>
    );
}
