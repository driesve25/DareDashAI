import React from 'react';
import { Mood } from '../types';
import { Lock, Smile, Flame, Skull, HeartHandshake, HelpCircle } from 'lucide-react';
import { Button } from '../components/Button';

interface ModeSelectionScreenProps {
  onSelectMood: (mood: Mood) => void;
  isPremium: boolean;
  onUnlockPremium: () => void;
}

export const ModeSelectionScreen: React.FC<ModeSelectionScreenProps> = ({ 
  onSelectMood, 
  isPremium, 
  onUnlockPremium 
}) => {

  const modes = [
    { 
      id: Mood.SOFT, 
      icon: Smile, 
      color: "text-green-400", 
      bg: "from-green-500/20 to-emerald-900/20",
      desc: "Good clean fun. Safe for work and family.",
      locked: false 
    },
    { 
      id: Mood.FUNNY, 
      icon: HelpCircle, 
      color: "text-yellow-400", 
      bg: "from-yellow-500/20 to-orange-900/20",
      desc: "Silly, weird, and hilarious prompts.",
      locked: false 
    },
    { 
      id: Mood.COUPLES, 
      icon: HeartHandshake, 
      color: "text-pink-400", 
      bg: "from-pink-500/20 to-rose-900/20",
      desc: "Romantic and connecting questions.",
      locked: false 
    },
    { 
      id: Mood.SPICY, 
      icon: Flame, 
      color: "text-orange-500", 
      bg: "from-orange-500/20 to-red-900/20",
      desc: "Things are getting hot. 18+ only.",
      locked: !isPremium 
    },
    { 
      id: Mood.EXTREME, 
      icon: Skull, 
      color: "text-red-600", 
      bg: "from-red-600/20 to-black",
      desc: "No limits. Enter at your own risk.",
      locked: !isPremium 
    },
    { 
        id: Mood.AWKWARD, 
        icon: HelpCircle, 
        color: "text-purple-400", 
        bg: "from-purple-500/20 to-indigo-900/20",
        desc: "Cringe-worthy questions to test friendships.",
        locked: !isPremium 
      },
  ];

  return (
    <div className="max-w-5xl mx-auto animate-fade-in pb-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Choose Your Vibe</h2>
        <p className="text-gray-400">Select a mood to set the tone for the game.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modes.map((mode) => (
          <div 
            key={mode.id}
            onClick={() => !mode.locked ? onSelectMood(mode.id) : onUnlockPremium()}
            className={`relative group p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
                ${mode.locked ? 'border-gray-700 bg-gray-900/50 opacity-80 hover:opacity-100' : 'border-white/10 bg-white/5 hover:border-indigo-500 hover:scale-105 hover:bg-white/10'}
            `}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${mode.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <mode.icon className={`w-10 h-10 ${mode.color}`} />
                {mode.locked && (
                  <div className="bg-gray-800 p-2 rounded-full">
                    <Lock className="w-4 h-4 text-yellow-500" />
                  </div>
                )}
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{mode.id}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{mode.desc}</p>
            </div>

            {mode.locked && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-yellow-400 font-bold mb-2 uppercase tracking-widest text-sm">Premium</p>
                <Button size="sm" onClick={(e) => { e.stopPropagation(); onUnlockPremium(); }}>Unlock</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};