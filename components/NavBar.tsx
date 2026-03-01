'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/post-job', label: 'Post a Job' },
  { href: '/contractors', label: 'Find Pros' },
  { href: '/bookings', label: 'My Bookings' },
  { href: '/disputes', label: 'Support' },
];

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      setUserEmail(session?.user?.email ?? null);
    });

    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? null));

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const linkClasses = (path: string) =>
    `text-lg font-bold hover:text-blue-600 transition border-b-2 ${isActive(path) ? 'border-black text-blue-600' : 'border-transparent'}`;

  return (
    <nav className="bg-white border-b-4 border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            aria-label="HouseConnect Home"
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="w-10 h-10 border-2 border-black bg-yellow-300 rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_#000] group-hover:translate-y-[-2px] transition-transform">
              <i className="fas fa-home text-xl text-black"></i>
            </div>
            <span className="text-2xl font-bold tracking-tight text-black group-hover:underline decoration-2 decoration-wavy decoration-blue-400">
              HouseConnect Pro
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClasses(href)}>
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            {userEmail ? (
              <>
                <span className="hidden sm:inline text-sm font-bold bg-gray-100 px-3 py-1 border-2 border-black rounded-full shadow-[2px_2px_0px_0px_#000]">
                  {userEmail.split('@')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="hidden sm:inline text-sm font-bold hover:underline decoration-2 decoration-red-400"
                >
                  Logout
                </button>
                <div className="hidden sm:flex w-10 h-10 bg-blue-200 border-2 border-black rounded-full items-center justify-center shadow-[2px_2px_0px_0px_#000]">
                  <i className="fas fa-user text-black"></i>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-block bg-white text-black border-2 border-black px-4 py-2 rounded-lg font-bold shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] hover:bg-yellow-200 transition-all"
              >
                Login
              </Link>
            )}

            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden w-10 h-10 border-2 border-black rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_#000] bg-white hover:bg-yellow-100 transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'} text-black text-lg`}></i>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden border-t-2 border-black bg-white px-4 pb-4 animate-[fadeIn_0.15s_ease-out]"
        >
          <div className="flex flex-col space-y-1 py-2">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-3 rounded-lg font-bold text-lg transition-all ${isActive(href) ? 'bg-yellow-200 border-2 border-black shadow-[2px_2px_0px_0px_#000]' : 'hover:bg-gray-50'}`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="border-t-2 border-dashed border-gray-300 pt-3 mt-1">
            {userEmail ? (
              <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-200 border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
                    <i className="fas fa-user text-black text-sm"></i>
                  </div>
                  <span className="font-bold text-sm">{userEmail.split('@')[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-200 border-2 border-black rounded-lg font-bold text-sm shadow-[2px_2px_0px_0px_#000] hover:bg-red-300 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="block text-center py-3 bg-blue-400 text-black border-2 border-black rounded-lg font-black shadow-[3px_3px_0px_0px_#000] hover:translate-y-[-1px] transition-all uppercase"
              >
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
