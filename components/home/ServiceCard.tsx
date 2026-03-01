'use client';

import { memo } from 'react';

interface ServiceCardProps {
  name: string;
  icon: string;
  color: string;
  onClick: (name: string) => void;
}

const ServiceCard = memo(({ name, icon, color, onClick }: ServiceCardProps) => {
  // Map color names to Tailwind background classes.
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100',
    yellow: 'bg-yellow-100',
    green: 'bg-green-100',
    cyan: 'bg-cyan-100',
    pink: 'bg-pink-100',
    emerald: 'bg-emerald-100',
    purple: 'bg-purple-100',
  };

  const backgroundClass = colorMap[color] || colorMap.blue;

  return (
    <div
      onClick={() => onClick(name)}
      className="bg-white p-5 border-3 border-black rounded-xl shadow-[6px_6px_0px_0px_#000] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_0px_#000] transition-all cursor-pointer text-center group h-full flex flex-col justify-center"
    >
      <div
        className={`w-20 h-20 ${backgroundClass} border-3 border-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_0px_#000] group-hover:scale-110 transition-transform`}
      >
        <i className={`fas ${icon} text-3xl text-black`}></i>
      </div>
      <h3 className="font-black text-base xl:text-lg uppercase tracking-wide">{name}</h3>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
