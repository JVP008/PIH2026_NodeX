const STATIC_STATS = [
    { value: '50+', label: 'Verified Pros', color: 'text-blue-600', delay: 'fade-up-delay-1' },
    { value: '98%', label: 'Satisfaction Rate', color: 'text-green-600', delay: 'fade-up-delay-2' },
    { value: '1,200+', label: 'Jobs Posted', color: 'text-purple-600', delay: 'fade-up-delay-3' },
    { value: '4.8', label: 'Average Rating', color: 'text-orange-600', delay: 'fade-up-delay-4' },
];

export default function Stats() {
    return (
        <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
            <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                {STATIC_STATS.map(({ value, label, color, delay }) => (
                    <div key={label} className={`text-center stat-item fade-up ${delay}`}>
                        <div className={`text-4xl font-bold ${color}`}>{value}</div>
                        <div className="text-gray-500 mt-1">{label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
