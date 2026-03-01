'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number, comment: string) => Promise<void>;
    contractorName: string;
}

export default function ReviewModal({ isOpen, onClose, onSubmit, contractorName }: ReviewModalProps) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await onSubmit(rating, comment);
            setComment('');
            setRating(5);
            onClose();
        } catch (error) {
            console.error('Review submission failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Rate Your Experience">
            <div className="text-center mb-6">
                <p className="text-lg font-medium text-black">
                    How was your service with <span className="font-black">{contractorName}</span>?
                </p>
            </div>

            <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((num) => (
                    <button
                        key={num}
                        onClick={() => setRating(num)}
                        className={`text-4xl transition-all hover:scale-110 ${num <= rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                    >
                        <i className="fas fa-star"></i>
                    </button>
                ))}
            </div>

            <div className="mb-6">
                <label className="block text-black font-black mb-2 uppercase">Leave a Comment</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    className="w-full p-3 bg-white border-3 border-black rounded-lg focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-all font-medium"
                    placeholder="Tell us what you liked (or didn't)..."
                ></textarea>
            </div>

            <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white border-3 border-black py-4 rounded-lg font-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] hover:bg-blue-600 transition-all text-xl uppercase disabled:opacity-70"
            >
                {isSubmitting ? (
                    <span>
                        <i className="fas fa-spinner fa-spin mr-2"></i> Submitting...
                    </span>
                ) : (
                    'Submit Review'
                )}
            </button>
        </Modal>
    );
}
