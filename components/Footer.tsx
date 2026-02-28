import Link from 'next/link';

const SOCIALS = [
    {
        label: 'X / Twitter',
        href: 'https://twitter.com',
        hoverClass: 'hover:bg-black hover:text-white',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        label: 'Facebook',
        href: 'https://facebook.com',
        hoverClass: 'hover:bg-black hover:text-white',
        icon: <i className="fab fa-facebook-f text-sm"></i>,
    },
    {
        label: 'Instagram',
        href: 'https://instagram.com',
        hoverClass: 'hover:bg-black hover:text-white',
        icon: <i className="fab fa-instagram text-sm"></i>,
    },
    {
        label: 'LinkedIn',
        href: 'https://linkedin.com',
        hoverClass: 'hover:bg-black hover:text-white',
        icon: <i className="fab fa-linkedin-in text-sm"></i>,
    },
];

export default function Footer() {
    return (
        <footer className="bg-white border-t-[4px] border-dashed border-black mt-20">
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

                    {/* Brand + Socials */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#FFD700] border-2 border-black flex items-center justify-center neo-shadow-small">
                                <i className="fas fa-home text-black"></i>
                            </div>
                            <span className="text-black font-black text-xl tracking-tighter uppercase leading-none">Houseconnect</span>
                        </div>
                        <p className="text-black font-medium text-sm leading-relaxed mb-8 opacity-80">
                            India&apos;s trusted platform connecting homeowners with verified local professionals across 50+ cities.
                        </p>
                        <div className="flex items-center gap-3">
                            {SOCIALS.map(({ label, href, hoverClass, icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className={`w-10 h-10 rounded-full bg-white border-2 border-black flex items-center justify-center text-black transition-all neo-shadow-small hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${hoverClass}`}
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-black font-black text-sm uppercase tracking-widest mb-6">Services</h4>
                        <ul className="space-y-3">
                            {['Plumbing', 'Electrical', 'Cleaning', 'HVAC', 'Painting', 'Landscaping'].map(s => (
                                <li key={s}>
                                    <Link href={`/contractors?service=${s}`} className="text-sm font-medium text-gray-700 hover:text-black hover:underline underline-offset-4 transition-colors">
                                        {s}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-black font-black text-sm uppercase tracking-widest mb-6">Company</h4>
                        <ul className="space-y-3">
                            {[
                                { n: 'About Us', p: '/about' },
                                { n: 'Careers', p: '/careers' },
                                { n: 'Privacy Policy', p: '/privacy' },
                                { n: 'Terms of Service', p: '/terms' },
                            ].map(l => (
                                <li key={l.n}>
                                    <Link href={l.p} className="text-sm font-medium text-gray-700 hover:text-black hover:underline underline-offset-4 transition-colors">
                                        {l.n}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-black font-black text-sm uppercase tracking-widest mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <i className="fas fa-map-marker-alt text-gray-500 mt-1"></i>
                                <span className="text-sm font-medium text-gray-700">Sakoli, Bhandara,<br />Maharashtra 441802</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="fas fa-phone text-gray-500"></i>
                                <a href="tel:+919252034825" className="text-sm font-medium text-gray-700 hover:text-black">+91 9252034825</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="fas fa-envelope text-gray-500"></i>
                                <a href="mailto:support@houseconnect.in" className="text-sm font-medium text-gray-700 hover:text-black">support@houseconnect.in</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t-[2px] border-black bg-[#fafafa] py-6">
                <div className="max-w-6xl mx-auto px-4 flex justify-center">
                    <p className="text-black font-bold text-xs uppercase tracking-wider text-center">
                        © 2024 HouseConnect Pro. All rights reserved. Made with <i className="fas fa-heart text-red-500 mx-1"></i> in India
                    </p>
                </div>
            </div>
        </footer>
    );
}
