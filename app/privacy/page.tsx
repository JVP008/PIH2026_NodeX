export default function PrivacyPolicyPage() {
    return (
        <div className="max-w-5xl mx-auto px-10 py-24 my-24 bg-white border-[6px] border-black neo-shadow-large">
            <h1 className="text-6xl md:text-8xl font-[900] uppercase tracking-tighter text-black leading-none mb-4 italic">Privacy Vault</h1>
            <p className="text-xs font-black uppercase tracking-[0.4em] mb-16 opacity-40">System Revision: February 2026</p>

            <div className="space-y-12 text-black font-bold uppercase tracking-tight">
                <section className="bg-yellow-50 p-10 border-[3px] border-black neo-shadow-small rotate-1">
                    <h2 className="text-3xl font-[900] uppercase tracking-tighter mb-6 underline decoration-4 decoration-black/20">1. Data Capture</h2>
                    <p className="text-sm leading-relaxed tracking-wider">
                        We collect information you provide directly to us when setting up an account, booking a contractor, or interacting with our customer support. This includes your name, contact information, service address, and payment details (processed securely by our partners).
                    </p>
                </section>

                <section className="bg-cyan-50 p-10 border-[3px] border-black neo-shadow-small -rotate-1">
                    <h2 className="text-3xl font-[900] uppercase tracking-tighter mb-6 underline decoration-4 decoration-black/20">2. Deployment Logic</h2>
                    <p className="text-sm leading-relaxed tracking-wider mb-6">
                        Your data is never sold to third-party data brokers. We use your information exclusively to:
                    </p>
                    <ul className="space-y-4">
                        {['Match you with relevant local pros', 'Facilitate secure node communication', 'Provide priority support & resolution', 'Maintain system security & integrity'].map((item) => (
                            <li key={item} className="flex gap-4 items-center group">
                                <div className="w-4 h-4 bg-black group-hover:bg-[#FFD700] transition-colors" />
                                <span className="text-xs font-black uppercase tracking-widest">{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="p-10 border-[3px] border-black neo-shadow-small">
                    <h2 className="text-3xl font-[900] uppercase tracking-tighter mb-6 underline decoration-4 decoration-black/20">3. Encryption Protocols</h2>
                    <p className="text-sm leading-relaxed tracking-wider">
                        We implement industry-standard security protocols to protect your personal information against unauthorized access, alteration, or destruction. We treat your privacy as mission-critical.
                    </p>
                </section>

                <div className="bg-black text-[#FFD700] p-10 border-[4px] border-black neo-shadow-large translate-y-4">
                    <p className="text-lg font-black uppercase tracking-widest text-center">
                        Questions? Link with us at <a href="mailto:privacy@houseconnect.in" className="underline decoration-4">privacy@houseconnect.in</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
