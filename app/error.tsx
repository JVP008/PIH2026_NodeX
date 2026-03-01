'use client';

import { useEffect } from 'react';
import Link from 'next/link';

/**
 * Global Error Boundary
 *
 * This component catches any unexpected errors that occur anywhere in the application.
 * It displays a friendly error message to the user and provides a button to try loading the page again.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="bg-red-50 border-4 border-black p-8 rounded-xl shadow-[8px_8px_0px_0px_#000] max-w-2xl w-full text-center">
        <div className="w-20 h-20 bg-red-400 border-3 border-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_#000] animate-bounce">
          <i className="fas fa-exclamation-triangle text-3xl text-black"></i>
        </div>

        <h2 className="text-4xl font-black uppercase text-black mb-4">Something went wrong</h2>

        <p className="text-xl font-medium text-black mb-8">
          We hit a snag while loading this page. Our team has been notified.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-black text-white px-8 py-3 rounded-lg font-black text-lg border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] transition-all uppercase tracking-wide"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="bg-yellow-300 text-black px-8 py-3 rounded-lg font-black text-lg border-3 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] transition-all uppercase tracking-wide"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
