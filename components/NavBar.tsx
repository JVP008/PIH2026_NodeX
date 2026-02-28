'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function NavBar() {
    const pathname = usePathname();
    const router = useRouter();
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [isGuest, setIsGuest] = useState(false);

    useEffect(() => {
        // Read guest flag from localStorage — avoid synchronous setState in effect
        if (typeof window !== 'undefined') {
            const guestStatus = localStorage.getItem('isGuest') === 'true';
            if (guestStatus) {
                setTimeout(() => setIsGuest(true), 0);
            }
        }

        // Auth state listener — fires immediately with cached session, no network hang
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUserEmail(session?.user?.email ?? null);
            if (session?.user) setIsGuest(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const handleExitGuest = () => {
        localStorage.removeItem('isGuest');
        setIsGuest(false);
        router.push('/login');
    };

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <nav className="bg-white text-black border-b-[4px] border-black relative z-50">
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo Area */}
                    <Link href="/" className="flex items-center space-x-2 cursor-pointer hover:translate-x-1 transition group">
                        <div className="w-8 h-8 rounded-full bg-[#FFD700] border-2 border-black flex items-center justify-center neo-shadow-small group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-[3px_3px_0px_#000]">
                            <i className="fas fa-home text-sm"></i>
                        </div>
                        <span className="text-xl font-black tracking-tight">HouseConnect <span className="text-gray-500">Pro</span></span>
                    </Link>

                    {/* Centered Links */}
                    <div className="hidden md:flex items-center space-x-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        {[
                            { name: 'Home', path: '/' },
                            { name: 'Post a Job', path: '/post-job' },
                            { name: 'Find Pros', path: '/contractors' },
                            { name: 'My Bookings', path: '/bookings' },
                            { name: 'Support', path: '/disputes' },
                        ].map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`text-sm font-bold tracking-tight transition-all hover:opacity-70 ${isActive(link.path)
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : ''
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center space-x-4">
                        {userEmail ? (
                            <div className="flex items-center gap-3 border-2 border-black rounded-full px-1 py-1 pr-4 neo-shadow bg-[#BAE6FD] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#000] transition-all">
                                <span className="bg-white border-2 border-black rounded-full w-8 h-8 flex items-center justify-center font-black text-sm">
                                    {userEmail[0].toUpperCase()}
                                </span>
                                <span className="text-xs font-bold">{userEmail.split('@')[0]}</span>
                                <button
                                    onClick={handleLogout}
                                    className="text-[10px] font-black uppercase hover:text-red-500 ml-2 border-l-2 border-black pl-2"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : isGuest ? (
                            <div className="flex items-center gap-3 border-2 border-black rounded-full px-1 py-1 pr-4 neo-shadow bg-[#BBF7D0] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#000] transition-all">
                                <span className="bg-white border-2 border-black w-8 h-8 rounded-full flex items-center justify-center text-sm">
                                    <i className="fas fa-user-secret"></i>
                                </span>
                                <span className="text-xs font-bold">Guest</span>
                                <button
                                    onClick={handleExitGuest}
                                    className="text-[10px] font-black uppercase hover:text-red-500 ml-2 border-l-2 border-black pl-2"
                                >
                                    Login
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="bg-[#FFD700] border-2 border-black px-6 py-2 rounded-full text-sm font-black uppercase neo-shadow hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#000] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
