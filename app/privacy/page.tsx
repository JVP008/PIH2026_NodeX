export default function PrivacyPolicyPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-20 min-h-[60vh] bg-white rounded-xl shadow-sm mt-12 mb-20 border border-gray-100">
            <h1 className="text-4xl font-black mb-4 tracking-tight text-gray-900">Privacy Policy</h1>
            <p className="text-gray-500 mb-10 pb-6 border-b border-gray-100">Last Updated: February 2026</p>

            <div className="prose prose-lg text-gray-600 space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                    <p>
                        We collect information you provide directly to us when setting up an account, booking a contractor, or interacting with our customer support. This includes your name, contact information, service address, and payment details (processed securely by our partners). We also collect public profile data from professionals listing their services.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                    <p>
                        Your data is never sold to third-party data brokers. We use your information exclusively to:
                    </p>
                    <ul className="list-disc pl-6 mt-3 space-y-2">
                        <li>Match you with relevant local contractors based on location and need.</li>
                        <li>Facilitate communication between homeowners and professionals.</li>
                        <li>Provide personalized customer support and dispute resolution.</li>
                        <li>Maintain the safety, security, and integrity of the platform.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Security & Storage</h2>
                    <p>
                        We implement industry-standard security protocols to protect your personal information against unauthorized access, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Your Rights</h2>
                    <p>
                        You maintain the right to access, update, or entirely delete your account and associated personal data at any time. For data deletion requests, please contact our support team.
                    </p>
                </section>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
                    <p className="text-sm font-semibold text-gray-700 m-0">
                        Questions about our privacy policy? Reach out at <a href="mailto:privacy@houseconnect.in" className="text-blue-600">privacy@houseconnect.in</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
