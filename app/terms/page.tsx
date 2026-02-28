export default function TermsOfServicePage() {
    return (
        <div className="max-w-5xl mx-auto px-10 py-24 my-24 bg-white border-[6px] border-black neo-shadow-large rotate-1">
            <h1 className="text-6xl md:text-8xl font-[900] uppercase tracking-tighter text-black leading-none mb-4 italic">Protocol Terms</h1>
            <p className="text-xs font-black uppercase tracking-[0.4em] mb-16 opacity-40">System Revision: February 2026</p>

            <div className="space-y-12 text-black font-bold uppercase tracking-tight">
                <section className="bg-yellow-100 p-10 border-[3px] border-black neo-shadow-small -rotate-1">
                    <h2 className="text-3xl font-[900] uppercase tracking-tighter mb-6 underline decoration-4 decoration-black/20">1. Node Acceptance</h2>
                    <p className="text-sm leading-relaxed tracking-wider">
                        By accessing or using the Houseconnect Pro platform (the &quot;Service&quot;), you agree to be bound by these Terms. If you disagree with any part of the terms, you must disconnect from the Service immediately.
                    </p>
                </section>

                <section className="bg-white p-10 border-[3px] border-black neo-shadow-small rotate-1">
                    <h2 className="text-3xl font-[900] uppercase tracking-tighter mb-6 underline decoration-4 decoration-black/20">2. Marketplace Logic</h2>
                    <p className="text-sm leading-relaxed tracking-wider">
                        Houseconnect Pro acts as a relay connecting independent service professionals (&quot;Contractors&quot;) with homeowners (&quot;Clients&quot;). We do not execute the services ourselves, employ the Contractors directly, or guarantee individual outcomes.
                    </p>
                </section>

                <section className="bg-cyan-100 p-10 border-[3px] border-black neo-shadow-small -rotate-1">
                    <h2 className="text-3xl font-[900] uppercase tracking-tighter mb-6 underline decoration-4 decoration-black/20">3. Operation Rules</h2>
                    <p className="text-sm leading-relaxed tracking-wider mb-8 italic">
                        Community trust is our highest priority. Adhere to the following system protocols:
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                        {['For Clients: Clear briefs, safe sites.', 'For Pros: Transparent rates, on-time arrivals.'].map((rule) => (
                            <div key={rule} className="bg-black text-white p-6 border-[3px] border-black neo-shadow-small flex items-center justify-center text-center">
                                <span className="text-[10px] uppercase font-black tracking-widest leading-relaxed">{rule}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="p-10 border-[3px] border-black neo-shadow-small">
                    <h2 className="text-3xl font-[900] uppercase tracking-tighter mb-6 underline decoration-4 decoration-black/20">4. Settlement & Conflict</h2>
                    <p className="text-sm leading-relaxed tracking-wider">
                        Payments for platform bookings are managed via our secure gateway. In the event of a disagreement, use the Dispute Terminal before external arbitration.
                    </p>
                </section>
            </div>
        </div>
    );
}
