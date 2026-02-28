import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-14">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

                    {/* Brand + Socials */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                                <i className="fas fa-home text-black text-lg"></i>
                            </div>
                            <span className="text-black font-black text-xl tracking-tight uppercase">Houseconnect</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            India&apos;s trusted platform connecting homeowners with verified local professionals across 50+ cities.
                        </p>
                        <div className="flex items-center gap-3">
                            <a href="#" aria-label="X / Twitter" className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-black hover:text-black transition">
                                <i className="fab fa-x-twitter text-sm"></i>
                            </a>
                            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-600 hover:text-blue-600 transition">
                                <i className="fab fa-facebook-f text-sm"></i>
                            </a>
                            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-pink-500 hover:text-pink-500 transition">
                                <i className="fab fa-instagram text-sm"></i>
                            </a>
                            <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-700 hover:text-blue-700 transition">
                                <i className="fab fa-linkedin-in text-sm"></i>
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-black font-bold text-sm uppercase tracking-widest mb-5">Services</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link href="/contractors?service=Plumbing" className="hover:text-black transition">Plumbing</Link></li>
                            <li><Link href="/contractors?service=Electrical" className="hover:text-black transition">Electrical</Link></li>
                            <li><Link href="/contractors?service=Cleaning" className="hover:text-black transition">Cleaning</Link></li>
                            <li><Link href="/contractors?service=HVAC" className="hover:text-black transition">HVAC</Link></li>
                            <li><Link href="/contractors?service=Painting" className="hover:text-black transition">Painting</Link></li>
                            <li><Link href="/contractors?service=Landscaping" className="hover:text-black transition">Landscaping</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-black font-bold text-sm uppercase tracking-widest mb-5">Company</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-black transition">About Us</Link></li>
                            <li><Link href="#" className="hover:text-black transition">Careers</Link></li>
                            <li><Link href="#" className="hover:text-black transition">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-black transition">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-black font-bold text-sm uppercase tracking-widest mb-5">Contact</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li className="flex items-start gap-3">
                                <i className="fas fa-map-marker-alt text-gray-400 mt-0.5 w-4 shrink-0"></i>
                                <span>Sakoli, Bhandara,<br />Maharashtra 441802</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="fas fa-phone text-gray-400 w-4 shrink-0"></i>
                                <a href="tel:+918263884655" className="hover:text-black transition">+91 8263884655</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="fas fa-envelope text-gray-400 w-4 shrink-0"></i>
                                <a href="mailto:support@houseconnect.in" className="hover:text-black transition">support@houseconnect.in</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Dashed divider + copyright */}
            <div className="border-t border-dashed border-gray-300">
                <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-center text-sm text-gray-400">
                    <p>© 2026 HouseConnect Pro. All rights reserved. Made with <i className="fas fa-heart text-red-500 mx-1"></i> in India</p>
                </div>
            </div>
        </footer>
    );
}
