// Static stats — no Supabase calls. 
// When real DB is connected, replace these with actual queries.
const STATIC_STATS = {
    contractors: 50,
    satisfaction: 98,
    jobs: 1200,
    rating: 4.8,
};

export default function Stats() {
    return (
        <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
            <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600">{STATIC_STATS.contractors}+</div>
                    <div className="text-gray-500">Verified Pros</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl font-bold text-green-600">{STATIC_STATS.satisfaction}%</div>
                    <div className="text-gray-500">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600">{STATIC_STATS.jobs}+</div>
                    <div className="text-gray-500">Jobs Posted</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl font-bold text-orange-600">{STATIC_STATS.rating}</div>
                    <div className="text-gray-500">Average Rating</div>
                </div>
            </div>
        </div>
    );
}
