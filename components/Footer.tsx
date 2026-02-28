import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-20">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <i className="fas fa-home text-white text-sm"></i>
                            </div>
                            <span className="text-white font-bold text-lg">Houseconnect Pro</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Connecting skilled professionals with homeowners across India. Find the right pro for any job, fast.
                        </p>
                    </div>

                    {/* Homeowners */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">For Homeowners</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/contractors" className="hover:text-white transition">Find Pros</Link></li>
                            <li><Link href="/bookings" className="hover:text-white transition">My Bookings</Link></li>
                            <li><Link href="/disputes" className="hover:text-white transition">Raise a Dispute</Link></li>
                        </ul>
                    </div>

                    {/* Professionals */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">For Professionals</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/post-job" className="hover:text-white transition">Post Your Services</Link></li>
                            <li><Link href="/login" className="hover:text-white transition">Login / Sign Up</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <i className="fas fa-map-marker-alt mt-0.5 text-blue-400"></i>
                                <span>Sakoli, Bhandara, Maharashtra 441802</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fas fa-envelope text-blue-400"></i>
                                <a href="mailto:support@houseconnectpro.in" className="hover:text-white transition">
                                    support@houseconnectpro.in
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} Houseconnect Pro. All rights reserved.</p>
                    <p>Made with <i className="fas fa-heart text-red-500"></i> in Maharashtra</p>
                </div>
            </div>
        </footer>
    );
}
