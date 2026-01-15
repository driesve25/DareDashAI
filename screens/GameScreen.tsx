import React, { useState } from 'react';
import { Player, Mood, ChallengeType } from '../types';
import { generateChallenge } from '../services/gemini';
import { Button } from '../components/Button';
import { ArrowRight, RefreshCw, Trophy, Home } from 'lucide-react';

interface GameScreenProps {
  players: Player[];
  mood: Mood;
  onExit: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ players, mood, onExit }) => {
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [challenge, setChallenge] = useState<string | null>(null);
  const [currentType, setCurrentType] = useState<ChallengeType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [round, setRound] = useState(1);

  const currentPlayer = players[currentPlayerIdx];
  const otherPlayers = players.filter(p => p.id !== currentPlayer.id);

  const handleChoice = async (type: ChallengeType) => {
    setCurrentType(type);
    setIsLoading(true);
    setChallenge(null);
    
    const result = await generateChallenge(type, mood, currentPlayer, otherPlayers);
    
    setChallenge(result);
    setIsLoading(false);
  };

  const nextTurn = () => {
    setChallenge(null);
    setCurrentType(null);
    
    if (currentPlayerIdx === players.length - 1) {
      setCurrentPlayerIdx(0);
      setRound(r => r + 1);
    } else {
      setCurrentPlayerIdx(prev => prev + 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      
      {/* HUD */}
      <div className="w-full flex justify-between items-center mb-10 text-sm text-gray-400 bg-white/5 rounded-full pl-6 pr-2 py-2">
        <div className="flex gap-4">
            <span>Round {round}</span>
            <span className="text-indigo-400 font-bold uppercase tracking-wider hidden sm:inline">{mood} Mode</span>
        </div>
        <button 
            onClick={onExit} 
            className="hover:text-white hover:bg-white/10 p-2 rounded-full flex items-center gap-2 transition-colors text-gray-300"
            title="Exit Game"
        >
            <span className="text-xs font-bold uppercase tracking-wider mr-1">Exit</span>
            <Home size={16}/> 
        </button>
      </div>

      {/* Main Card */}
      <div className="w-full relative">
        {!challenge ? (
          <div className="text-center space-y-12">
            <div>
              <p className="text-gray-400 text-lg uppercase tracking-widest mb-2">It's your turn</p>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-4 animate-pulse">
                {currentPlayer.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <button
                onClick={() => handleChoice(ChallengeType.TRUTH)}
                disabled={isLoading}
                className="group relative h-48 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 p-1 transition-transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
              >
                <div className="h-full w-full flex items-center justify-center bg-gray-900/50 group-hover:bg-transparent transition-colors rounded-xl">
                    <span className="text-4xl font-black text-white tracking-widest">TRUTH</span>
                </div>
              </button>

              <button
                onClick={() => handleChoice(ChallengeType.DARE)}
                disabled={isLoading}
                className="group relative h-48 rounded-2xl bg-gradient-to-br from-pink-600 to-red-700 p-1 transition-transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
              >
                <div className="h-full w-full flex items-center justify-center bg-gray-900/50 group-hover:bg-transparent transition-colors rounded-xl">
                    <span className="text-4xl font-black text-white tracking-widest">DARE</span>
                </div>
              </button>
            </div>
            
            {isLoading && (
              <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center rounded-2xl">
                 <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
                 <p className="text-indigo-300 animate-pulse">Consulting the oracle...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden animate-slide-up shadow-2xl shadow-indigo-500/20">
            {/* Background decoration */}
            <div className={`absolute top-0 left-0 w-full h-2 ${currentType === ChallengeType.TRUTH ? 'bg-blue-500' : 'bg-red-500'}`} />
            
            <div className="mb-8">
              <span className={`inline-block px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-6 ${currentType === ChallengeType.TRUTH ? 'bg-blue-500/20 text-blue-300' : 'bg-red-500/20 text-red-300'}`}>
                {currentType}
              </span>
              <p className="text-2xl md:text-4xl font-bold leading-tight">
                {challenge}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Button onClick={nextTurn} size="lg" className="w-full">
                Completed <Trophy className="ml-2 w-5 h-5" />
              </Button>
              <div className="flex gap-4">
                 <Button onClick={() => handleChoice(currentType!)} variant="secondary" className="flex-1" title="New question">
                    <RefreshCw className="w-5 h-5" />
                 </Button>
                 <Button onClick={nextTurn} variant="danger" className="flex-1">
                    Forfeit
                 </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};