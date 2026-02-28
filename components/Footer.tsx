import Link from 'next/link';

const SOCIALS = [
    {
        label: 'X / Twitter',
        href: 'https://twitter.com',
        hoverClass: 'hover:bg-black hover:text-[#FFD700]',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        label: 'Facebook',
        href: 'https://facebook.com',
        hoverClass: 'hover:bg-blue-600 hover:text-white',
        icon: <i className="fab fa-facebook-f text-lg"></i>,
    },
    {
        label: 'Instagram',
        href: 'https://instagram.com',
        hoverClass: 'hover:bg-pink-500 hover:text-white',
        icon: <i className="fab fa-instagram text-lg"></i>,
    },
    {
        label: 'LinkedIn',
        href: 'https://linkedin.com',
        hoverClass: 'hover:bg-blue-700 hover:text-white',
        icon: <i className="fab fa-linkedin-in text-lg"></i>,
    },
];

export default function Footer() {
    return (
        <footer className="bg-white border-t-[8px] border-black mt-20">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16">

                    {/* Brand + Socials */}
                    <div>
                        <div className="flex items-center gap-4 mb-6 -rotate-1">
                            <div className="w-14 h-14 bg-[#FFD700] border-[4px] border-black flex items-center justify-center neo-shadow">
                                <i className="fas fa-home text-black text-2xl"></i>
                            </div>
                            <span className="text-black font-[900] text-3xl tracking-tighter uppercase leading-none">Houseconnect</span>
                        </div>
                        <p className="text-black font-bold text-sm leading-relaxed mb-8 bg-[#4ECDC4] border-2 border-black p-4 neo-shadow rotate-1">
                            India&apos;s trusted platform connecting homeowners with verified local professionals across 50+ cities.
                        </p>
                        <div className="flex items-center gap-4">
                            {SOCIALS.map(({ label, href, hoverClass, icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className={`w-12 h-12 bg-white border-[3px] border-black flex items-center justify-center text-black transition-all duration-100 neo-shadow-small hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none ${hoverClass}`}
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-black font-[900] text-xl uppercase tracking-tighter mb-8 border-b-4 border-[#FFD700] inline-block">Services</h4>
                        <ul className="space-y-4">
                            {['Plumbing', 'Electrical', 'Cleaning', 'HVAC', 'Painting', 'Landscaping'].map(s => (
                                <li key={s}>
                                    <Link href={`/contractors?service=${s}`} className="text-sm font-black uppercase tracking-widest hover:bg-black hover:text-white px-2 py-1 transition-colors border-2 border-transparent hover:border-black">
                                        {s}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-black font-[900] text-xl uppercase tracking-tighter mb-8 border-b-4 border-[#FF6B6B] inline-block">Company</h4>
                        <ul className="space-y-4">
                            {[
                                { n: 'About Us', p: '/about' },
                                { n: 'Careers', p: '/careers' },
                                { n: 'Privacy Policy', p: '/privacy' },
                                { n: 'Terms of Service', p: '/terms' },
                            ].map(l => (
                                <li key={l.n}>
                                    <Link href={l.p} className="text-sm font-black uppercase tracking-widest hover:bg-black hover:text-white px-2 py-1 transition-colors border-2 border-transparent hover:border-black">
                                        {l.n}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-black font-[900] text-xl uppercase tracking-tighter mb-8 border-b-4 border-[#4ECDC4] inline-block">Contact</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="bg-black text-white p-2 border-2 border-black rotate-3">
                                    <i className="fas fa-map-marker-alt text-xs"></i>
                                </div>
                                <span className="text-sm font-black uppercase tracking-tight">Sakoli, Bhandara,<br />Maharashtra 441802</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="bg-black text-white p-2 border-2 border-black -rotate-3">
                                    <i className="fas fa-phone text-xs"></i>
                                </div>
                                <a href="tel:+918263884655" className="text-sm font-black uppercase hover:bg-black hover:text-white px-1 tracking-tight">+91 8263884655</a>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="bg-black text-white p-2 border-2 border-black rotate-12">
                                    <i className="fas fa-envelope text-xs"></i>
                                </div>
                                <a href="mailto:support@houseconnect.in" className="text-sm font-black uppercase hover:bg-black hover:text-white px-1 tracking-tight">support@houseconnect.in</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="bg-black py-8 border-t-[4px] border-black">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center">
                    <p className="text-[#FFD700] font-[900] uppercase tracking-tighter text-lg md:text-2xl text-center">
                        © 2026 HouseConnect Pro — Built with <i className="fas fa-heart text-white mx-1"></i> in India
                    </p>
                    <div className="mt-4 flex gap-8">
                        {['v1.2.0', 'Stable', 'Hackathon 2026'].map(t => (
                            <span key={t} className="text-white text-[10px] font-black uppercase tracking-[0.2em] border-2 border-white/20 px-3 py-1">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
