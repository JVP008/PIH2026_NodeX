'use client';

interface ServiceCardProps {
    name: string;
    icon: string;
    color: string;
    onClick: (name: string) => void;
}

export default function ServiceCard({ name, icon, color, onClick }: ServiceCardProps) {
    const colorMap: Record<string, { bg: string, text: string }> = {
        blue: { bg: 'bg-[#BAE6FD]', text: 'text-black' },
        yellow: { bg: 'bg-[#FEF08A]', text: 'text-black' },
        light: { bg: 'bg-[#f1f5f9]', text: 'text-black' },
        cyan: { bg: 'bg-[#BAE6FD]', text: 'text-black' },
        pink: { bg: 'bg-[#FBCFE8]', text: 'text-black' },
        emerald: { bg: 'bg-[#BBF7D0]', text: 'text-black' },
    };

    const styles = colorMap[color] || colorMap.blue;

    return (
        <div
            onClick={() => onClick(name)}
            className="group relative bg-white border-[3px] border-black rounded-lg aspect-square flex flex-col items-center justify-center neo-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer text-center p-4"
        >
            <div className={`w-14 h-14 rounded-full ${styles.bg} border-[2px] border-black flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <i className={`fas ${icon} text-lg ${styles.text}`}></i>
            </div>
            <h3 className="font-black uppercase tracking-tight text-xs md:text-sm">{name}</h3>
        </div>
    );
}
