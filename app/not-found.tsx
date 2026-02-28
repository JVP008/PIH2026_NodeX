import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
            <div className="bg-yellow-50 border-4 border-black p-8 rounded-xl shadow-[8px_8px_0px_0px_#000] max-w-2xl w-full text-center">
                <div className="text-8xl font-black text-black mb-4 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                    404
                </div>

                <h2 className="text-4xl font-black uppercase text-black mb-4">Page Not Found</h2>

                <p className="text-xl font-medium text-black mb-8">
                    The professional you&apos;re looking for must be on another job. This page doesn&apos;t exist.
                </p>

                <Link
                    href="/"
                    className="inline-block bg-blue-400 text-black px-8 py-3 rounded-lg font-black text-lg border-3 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] transition-all uppercase tracking-wide"
                >
                    Back to Homepage
                </Link>
            </div>
        </div>
    );
}
