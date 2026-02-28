'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    return (
        <nav className="bg-white border-b-4 border-black sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="w-10 h-10 border-2 border-black bg-yellow-300 rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_#000] group-hover:rotate-12 transition-transform">
                        <i className="fas fa-home"></i>
                    </div>
                    <span className="text-2xl font-black uppercase">HouseConnect Pro</span>
                </Link>
                <div className="hidden md:flex items-center space-x-6">
                    {['Home', 'Post a Job', 'Find Pros', 'Support'].map((item) => (
                        <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-')}`}
                            className={`text-lg font-bold hover:text-blue-600 transition border-b-2 ${isActive(item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-')}`) ? 'border-black' : 'border-transparent'}`}>
                            {item}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
