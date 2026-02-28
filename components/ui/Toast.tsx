'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type ToastType = 'success' | 'error';

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toast, setToast] = useState<{ message: string; type: ToastType; visible: boolean }>({
        message: '',
        type: 'success',
        visible: false,
    });

    const showToast = useCallback((message: string, type: ToastType = 'success') => {
        setToast({ message, type, visible: true });
        // Animation duration logic handled by CSS classes
        setTimeout(() => {
            setToast((prev) => ({ ...prev, visible: false }));
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast.visible && (
                <div
                    className={`fixed bottom-8 right-8 px-8 py-5 border-[4px] border-black z-[100] flex items-center text-black font-black uppercase tracking-widest text-xs neo-shadow-large animate-in slide-in-from-right-10 duration-300 ${toast.type === 'error' ? 'bg-[#FF6B6B]' : 'bg-[#4ECDC4]'
                        }`}
                >
                    <div className="w-10 h-10 bg-white border-[3px] border-black flex items-center justify-center mr-4 rotate-6 animate-pulse">
                        <i className={`fas ${toast.type === 'error' ? 'fa-bomb' : 'fa-skull'} text-xl`}></i>
                    </div>
                    <span>{toast.message}</span>
                </div>
            )}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
