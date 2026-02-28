'use client';

import { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4 py-12"
            onClick={onClose}
        >
            <div
                className="bg-white border-[4px] border-black max-w-2xl w-full max-h-full overflow-y-auto neo-shadow-large animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-8 border-b-[4px] border-black flex items-center justify-between bg-[#FFD700]">
                    <h3 className="text-3xl font-[900] uppercase tracking-tighter text-black select-none">{title}</h3>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-black text-white border-2 border-black flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                    >
                        <i className="fas fa-times text-xl"></i>
                    </button>
                </div>
                <div className="p-8 bg-white">
                    {children}
                </div>
            </div>
        </div>
    );
}
