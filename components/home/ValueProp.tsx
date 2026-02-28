"use client";

export default function ValueProp() {
  return (
    <div className="relative py-24 overflow-hidden bg-[#fafafa]">
      {/* Ambient Background Circles */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#fbcfe8] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#fef08a] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 -translate-x-1/3 translate-y-1/3 z-0"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col items-center">
        {/* Top Badge */}
        <div className="bg-[#FFD700] border-[3px] border-black rounded-full px-6 py-2 transform -rotate-2 neo-shadow-small mb-8 inline-block">
          <span className="font-black text-xs uppercase tracking-widest text-black">
            The Bharat Opportunity
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="text-4xl md:text-6xl font-black text-center text-black uppercase tracking-tighter leading-[1.1] mb-16 max-w-4xl mx-auto">
          Fixing India&apos;s <span className="text-[#f97316]">Broken</span>{" "}
          <span className="text-[#a855f7]">Services</span>
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full mb-16">
          {/* Stat 1 */}
          <div className="bg-white border-[3px] border-black rounded-lg p-6 neo-shadow hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_#000] transition-all relative">
            <div className="absolute -top-4 -right-4 w-10 h-10 bg-[#BAE6FD] border-2 border-black rounded-full flex items-center justify-center neo-shadow-small">
              <i className="fas fa-chart-pie text-black text-sm"></i>
            </div>
            <div className="text-3xl md:text-4xl font-black text-black mb-2 tracking-tight">
              ₹1.2L Cr
            </div>
            <div className="text-[10px] md:text-xs font-black uppercase text-gray-600 tracking-wider">
              Market Size
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-white border-[3px] border-black rounded-lg p-6 neo-shadow hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_#000] transition-all relative">
            <div className="absolute -top-4 -right-4 w-10 h-10 bg-[#FBCFE8] border-2 border-black rounded-full flex items-center justify-center neo-shadow-small">
              <i className="fas fa-users-slash text-black text-sm"></i>
            </div>
            <div className="text-3xl md:text-4xl font-black text-black mb-2 tracking-tight">
              90%
            </div>
            <div className="text-[10px] md:text-xs font-black uppercase text-gray-600 tracking-wider">
              Unorganized Sector
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white border-[3px] border-black rounded-lg p-6 neo-shadow hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_#000] transition-all relative">
            <div className="absolute -top-4 -right-4 w-10 h-10 bg-[#FEF08A] border-2 border-black rounded-full flex items-center justify-center neo-shadow-small">
              <i className="fas fa-map-marked-alt text-black text-sm"></i>
            </div>
            <div className="text-3xl md:text-4xl font-black text-black mb-2 tracking-tight">
              50+
            </div>
            <div className="text-[10px] md:text-xs font-black uppercase text-gray-600 tracking-wider">
              Cities Targeted
            </div>
          </div>

          {/* Stat 4 */}
          <div className="bg-white border-[3px] border-black rounded-lg p-6 neo-shadow hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_#000] transition-all relative">
            <div className="absolute -top-4 -right-4 w-10 h-10 bg-[#BBF7D0] border-2 border-black rounded-full flex items-center justify-center neo-shadow-small">
              <i className="fas fa-stopwatch text-black text-sm"></i>
            </div>
            <div className="text-3xl md:text-4xl font-black text-black mb-2 tracking-tight">
              &lt; 2 Hrs
            </div>
            <div className="text-[10px] md:text-xs font-black uppercase text-gray-600 tracking-wider">
              Average SLA
            </div>
          </div>
        </div>

        {/* Bottom Pill Badge */}
        <div className="bg-white border-[3px] border-black rounded-full px-6 py-3 neo-shadow-small inline-block">
          <span className="font-bold text-sm text-black flex items-center gap-3">
            <i className="fas fa-check-circle text-[#10b981]"></i>
            Trusted by 10,000+ homeowners across Mumbai & Pune
          </span>
        </div>
      </div>
    </div>
  );
}
