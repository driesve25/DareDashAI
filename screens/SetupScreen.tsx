import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Player } from '../types';
import { Plus, Trash2, UserPlus, Play } from 'lucide-react';

interface SetupScreenProps {
  onNext: (players: Player[]) => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({ onNext }) => {
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: '', age: 21, gender: 'Male' },
    { id: '2', name: '', age: 21, gender: 'Female' }
  ]);

  const addPlayer = () => {
    setPlayers([
      ...players,
      { id: Date.now().toString(), name: '', age: 21, gender: 'Male' }
    ]);
  };

  const removePlayer = (id: string) => {
    if (players.length > 2) {
      setPlayers(players.filter(p => p.id !== id));
    }
  };

  const updatePlayer = (id: string, field: keyof Player, value: any) => {
    setPlayers(players.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const isValid = players.every(p => p.name.trim().length > 0 && p.age > 0);

  return (
    <div className="max-w-3xl mx-auto w-full animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Who is playing?</h2>
        <p className="text-gray-400">Add everyone to get personalized challenges.</p>
      </div>

      <div className="space-y-4 mb-8">
        {players.map((player, index) => (
          <div key={player.id} className="flex flex-col sm:flex-row gap-4 p-4 bg-white/5 border border-white/10 rounded-xl items-start sm:items-center animate-slide-up">
            <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
              {index + 1}
            </div>
            <div className="flex-1 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Name"
                value={player.name}
                onChange={(e) => updatePlayer(player.id, 'name', e.target.value)}
                className="w-full bg-transparent border-b border-gray-600 focus:border-indigo-500 outline-none py-2 px-1 text-lg placeholder-gray-600"
              />
            </div>
            <div className="w-full sm:w-24">
              <input
                type="number"
                min="1"
                max="99"
                value={player.age}
                onChange={(e) => updatePlayer(player.id, 'age', parseInt(e.target.value) || 0)}
                className="w-full bg-transparent border-b border-gray-600 focus:border-indigo-500 outline-none py-2 px-1 text-center"
              />
              <label className="text-xs text-gray-500 block text-center mt-1">Age</label>
            </div>
            <div className="w-full sm:w-32">
                <select 
                    value={player.gender}
                    onChange={(e) => updatePlayer(player.id, 'gender', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Other</option>
                </select>
            </div>
            {players.length > 2 && (
              <button 
                onClick={() => removePlayer(player.id)}
                className="p-2 text-red-400 hover:bg-red-400/10 rounded-full transition"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
        <Button onClick={addPlayer} variant="secondary" className="flex items-center gap-2">
          <Plus size={20} /> Add Player
        </Button>
        <Button onClick={() => onNext(players)} disabled={!isValid} className="flex items-center gap-2">
          Start Game <Play size={20} />
        </Button>
      </div>
    </div>
  );
};