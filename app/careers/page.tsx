import Link from 'next/link';

export default function CareersPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-20 min-h-[60vh]">
            <h1 className="text-4xl font-black mb-4 tracking-tight text-gray-900">Join Our Team</h1>
            <p className="text-xl text-gray-500 mb-12">Help us build the most trusted local services platform in India.</p>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Open Positions</h2>

                <div className="space-y-6">
                    {/* Position 1 */}
                    <div className="border-b border-gray-100 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 className="font-bold text-lg text-blue-600">Senior React Engineer</h3>
                            <p className="text-gray-500 text-sm mt-1">Remote (India) • Full-time</p>
                        </div>
                        <Link href="mailto:careers@houseconnect.in" className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm text-center font-medium">
                            Apply Now
                        </Link>
                    </div>

                    {/* Position 2 */}
                    <div className="border-b border-gray-100 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 className="font-bold text-lg text-blue-600">Contractor Onboarding Specialist</h3>
                            <p className="text-gray-500 text-sm mt-1">Nagpur / Hybrid • Full-time</p>
                        </div>
                        <Link href="mailto:careers@houseconnect.in" className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm text-center font-medium">
                            Apply Now
                        </Link>
                    </div>

                    {/* Position 3 */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 className="font-bold text-lg text-blue-600">Customer Success Manager</h3>
                            <p className="text-gray-500 text-sm mt-1">Mumbai • Full-time</p>
                        </div>
                        <Link href="mailto:careers@houseconnect.in" className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm text-center font-medium">
                            Apply Now
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center text-gray-500 text-sm bg-gray-100 p-6 rounded-xl">
                Don't see a role that fits? Send your resume to <a href="mailto:careers@houseconnect.in" className="text-blue-600 font-medium">careers@houseconnect.in</a> anyway!
            </div>
        </div>
    );
}
