export default function TermsOfServicePage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-20 min-h-[60vh] bg-white rounded-xl shadow-sm mt-12 mb-20 border border-gray-100">
            <h1 className="text-4xl font-black mb-4 tracking-tight text-gray-900">Terms of Service</h1>
            <p className="text-gray-500 mb-10 pb-6 border-b border-gray-100">Last Updated: February 2026</p>

            <div className="prose prose-lg text-gray-600 space-y-8">

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using the Houseconnect Pro platform (the "Service"), you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Platform Role</h2>
                    <p>
                        Houseconnect Pro acts as a marketplace connecting independent service professionals ("Contractors") with people seeking those services ("Homeowners"). We do not execute the services ourselves, employ the Contractors directly, or guarantee the absolute outcome of any individual service.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Conduct & Expectations</h2>
                    <p>
                        Community trust is our highest priority. We expect all users to adhere to the following guidelines:
                    </p>
                    <ul className="list-disc pl-6 mt-3 space-y-2">
                        <li><strong>For Homeowners:</strong> Treat contractors with respect, provide accurate descriptions of required work, and ensure safe working environments.</li>
                        <li><strong>For Professionals:</strong> Communicate transparently regarding pricing, show up precisely at scheduled times, and maintain high standards of workmanship.</li>
                        <li><strong>Zero Tolerance:</strong> Harassment, discrimination, or fraudulent activity will result in immediate and permanent account termination.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payment & Disputes</h2>
                    <p>
                        Payments for platform bookings are managed via our secure gateway. In the event of a disagreement over service quality or pricing, users must utilize our internal Dispute Resolution Center before seeking external arbitration.
                    </p>
                </section>

            </div>
        </div>
    );
}
