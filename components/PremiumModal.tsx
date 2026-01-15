import React from 'react';
import { Button } from './Button';
import { X, Lock, Star } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose, onUpgrade }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-gray-900 border border-gray-700 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-in overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-indigo-500/20 via-transparent to-pink-500/20 animate-spin-slow pointer-events-none" />

        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-10">
          <X size={24} />
        </button>

        <div className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 mb-6 shadow-lg shadow-orange-500/30">
            <Lock className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">
            Unlock Spicy Mode
          </h2>
          <p className="text-gray-400 mb-8">
            Get access to the hottest dares, extreme questions, and couples therapy cards.
          </p>

          <div className="space-y-4 text-left bg-white/5 p-4 rounded-xl mb-8">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span>Unlock <strong>Spicy, Extreme & Couples</strong> decks</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span>Ad-free experience</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span>Unlimited custom cards</span>
            </div>
          </div>

          <Button onClick={onUpgrade} className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-black font-bold text-lg">
            Unlock Now - $4.99
          </Button>
          <p className="mt-4 text-xs text-gray-500">One-time payment. Lifetime access.</p>
        </div>
      </div>
    </div>
  );
};