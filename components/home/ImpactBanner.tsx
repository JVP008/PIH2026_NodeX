import Link from "next/link";

export default function ImpactBanner() {
  return (
    <section className="py-20 px-4 bg-white border-b-4 border-black relative overflow-hidden">
      {/* Background creative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply opacity-50 blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply opacity-50 blur-3xl animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="bg-yellow-300 border-2 border-black text-black font-black px-4 py-1 rounded-full text-sm shadow-[2px_2px_0px_0px_#000] inline-block mb-4">
            🚀 The Bharat Opportunity
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-black mb-4">
            Empowering India&apos;s Local Economy
          </h2>
          <p className="text-xl text-gray-700 font-medium max-w-3xl mx-auto">
            HouseConnect Pro is bringing structure to India&apos;s massive
            unorganized home services sector, creating value for both homeowners
            and skilled professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Stat Card 1 */}
          <div className="bg-white border-4 border-black p-8 rounded-xl shadow-[8px_8px_0px_0px_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#000] transition-all relative group">
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-blue-400 border-3 border-black rounded-full flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_#000] group-hover:rotate-12 transition-transform z-10">
              🏘️
            </div>
            <h3 className="text-5xl font-black mb-2 text-black">$30B+</h3>
            <p className="font-bold text-gray-600 uppercase tracking-widest text-sm mb-4">
              Market Size
            </p>
            <p className="text-gray-700 font-medium">
              India&apos;s home services market is rapidly expanding, driven by
              urbanization and rising disposable incomes across Tier 1 & 2
              cities.
            </p>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white border-4 border-black p-8 rounded-xl shadow-[8px_8px_0px_0px_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#000] transition-all relative group mt-8 md:mt-0">
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-green-400 border-3 border-black rounded-full flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_#000] group-hover:rotate-12 transition-transform z-10">
              📈
            </div>
            <h3 className="text-5xl font-black mb-2 text-black">&gt;85%</h3>
            <p className="font-bold text-gray-600 uppercase tracking-widest text-sm mb-4">
              Unorganized Sector
            </p>
            <p className="text-gray-700 font-medium">
              The vast majority of the market relies on word-of-mouth. We
              provide a trusted digital infrastructure to formalize these
              services.
            </p>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-white border-4 border-black p-8 rounded-xl shadow-[8px_8px_0px_0px_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#000] transition-all relative group mt-8 md:mt-0">
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-pink-400 border-3 border-black rounded-full flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_#000] group-hover:rotate-12 transition-transform z-10">
              🤝
            </div>
            <h3 className="text-5xl font-black mb-2 text-black">100k+</h3>
            <p className="font-bold text-gray-600 uppercase tracking-widest text-sm mb-4">
              Pros Empowered
            </p>
            <p className="text-gray-700 font-medium">
              By connecting skilled workers directly with demand, we help them
              increase earnings by up to 40% while ensuring transparent pricing.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-yellow-50 border-4 border-black p-8 rounded-xl shadow-[6px_6px_0px_0px_#000] flex flex-col md:flex-row items-center justify-between">
          <div>
            <h4 className="text-2xl font-black uppercase mb-2">
              Join the Revolution
            </h4>
            <p className="text-gray-700 font-medium max-w-xl">
              Whether you&apos;re a homeowner looking for reliable help or a
              skilled professional seeking consistent work, HouseConnect is your
              platform.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex gap-4">
            <Link
              href="/post-job"
              className="bg-black text-white px-6 py-3 font-bold border-2 border-black hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] text-center"
            >
              List Service
            </Link>
            <Link
              href="/contractors"
              className="bg-white text-black px-6 py-3 font-bold border-2 border-black hover:bg-gray-100 transition-colors shadow-[4px_4px_0px_0px_#000] text-center"
            >
              Find pros
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
