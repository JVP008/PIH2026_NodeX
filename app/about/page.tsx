export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-20 min-h-[60vh] bg-white rounded-xl shadow-sm mt-12 mb-20 border border-gray-100">
            <h1 className="text-4xl font-black mb-8 tracking-tight text-gray-900">About Houseconnect Pro</h1>

            <div className="prose prose-lg text-gray-600 space-y-6">
                <p className="text-xl font-medium text-gray-800">
                    Finding reliable, skilled local professionals shouldn't be a struggle. That's why we built Houseconnect Pro.
                </p>
                <p>
                    Our platform bridges the gap between hardworking contractors and homeowners who need quality work done right. Whether it's fixing a tricky plumbing leak, undertaking a fresh paint job, or a complete electrical overhaul before a festival, we verify and seamlessly connect you with the best independent professionals right in your city.
                </p>
                <p>
                    Instead of relying on unverified word-of-mouth or browsing endless online directories, we bring the best talent directly to your phone. Ratings, transparent pricing, and instant availability statuses are baked directly into our system.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Our Mission</h2>
                <div className="bg-blue-50 p-6 rounded-lg text-blue-900 border border-blue-100">
                    To empower local tradespeople to grow their independent businesses while giving homeowners absolute peace of mind, pricing transparency, and top-tier service standards.
                </div>
            </div>
        </div>
    );
}
