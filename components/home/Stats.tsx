const STATIC_STATS = [
  {
    value: "1540+",
    label: "VERIFIED PROS",
    color: "bg-[#FCE7F3]",
    rotate: "-rotate-2",
  },
  {
    value: "98%",
    label: "SATISFACTION",
    color: "bg-[#D1FAE5]",
    rotate: "rotate-1",
  },
  {
    value: "8930+",
    label: "JOBS POSTED",
    color: "bg-[#DBEAFE]",
    rotate: "-rotate-1",
  },
  {
    value: "4.8",
    label: "AVG RATING",
    color: "bg-[#FEF08A]",
    rotate: "rotate-2",
  },
];

export default function Stats() {
  return (
    <div className="relative max-w-6xl mx-auto px-4 -mt-16 z-20 pb-20">
      {/* The continuous yellow line behind the stats box */}
      <div className="absolute top-1/2 left-0 w-full h-[4px] bg-[#FFD700] -translate-y-[20px] -z-10 hidden md:block"></div>

      <div className="bg-white border-[5px] border-black rounded-2xl p-6 flex flex-col md:flex-row gap-6 shadow-[12px_12px_0px_#000]">
        {STATIC_STATS.map(({ value, label, color, rotate }) => (
          <div
            key={label}
            className={`${color} ${rotate} flex-1 border-[3px] border-black rounded-lg py-8 px-4 text-center hover:scale-105 transition-transform cursor-default relative overflow-hidden`}
          >
            <div className="text-4xl md:text-5xl font-black text-black tracking-tight mb-2">
              {value}
            </div>
            <div className="text-xs md:text-sm font-black text-black uppercase tracking-widest opacity-90">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
