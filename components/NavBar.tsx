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
        // Read guest flag instantly from localStorage — no network call
        if (typeof window !== 'undefined') {
            setIsGuest(localStorage.getItem('isGuest') === 'true');
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
        <nav className="bg-[#FFD700] text-black border-b-[4px] border-black sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2 cursor-pointer hover:translate-x-1 transition">
                        <i className="fas fa-home text-2xl"></i>
                        <span className="text-2xl font-black uppercase tracking-tighter">Houseconnect Pro</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-2">
                        {[
                            { name: 'Home', path: '/' },
                            { name: 'Services', path: '/post-job' },
                            { name: 'Find Pros', path: '/contractors' },
                            { name: 'Bookings', path: '/bookings' },
                            { name: 'Support', path: '/disputes' },
                        ].map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`px-3 py-1.5 font-bold uppercase text-xs tracking-widest border-2 border-transparent transition-all ${isActive(link.path)
                                        ? 'bg-black text-[#FFD700] border-black scale-105'
                                        : 'hover:border-black'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        {userEmail ? (
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-black uppercase">Hi, {userEmail.split('@')[0]}</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-white border-2 border-black px-3 py-1.5 text-xs font-black uppercase neo-shadow transition-all hover:bg-red-400 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : isGuest ? (
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-black uppercase flex items-center gap-1">
                                    <i className="fas fa-user-secret"></i> Guest
                                </span>
                                <button
                                    onClick={handleExitGuest}
                                    className="bg-[#4ECDC4] border-2 border-black px-3 py-1.5 text-xs font-black uppercase neo-shadow hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
                                >
                                    Login
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="bg-[#FF6B6B] border-2 border-black px-6 py-2 text-sm font-black uppercase neo-shadow hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
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
