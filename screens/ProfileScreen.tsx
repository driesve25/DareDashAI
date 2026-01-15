import React, { useState } from 'react';
import { UserProfile, CustomChallenge, ChallengeType, Mood } from '../types';
import { Button } from '../components/Button';
import { Star, Plus, Trash, Crown, CheckCircle } from 'lucide-react';

interface ProfileScreenProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  onBack: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onUpdateUser, onBack }) => {
  const [newChallengeText, setNewChallengeText] = useState('');
  const [newChallengeType, setNewChallengeType] = useState<ChallengeType>(ChallengeType.TRUTH);

  const togglePremium = () => {
    onUpdateUser({ ...user, isPremium: !user.isPremium });
  };

  const addCustomChallenge = () => {
    if (!newChallengeText.trim()) return;
    const newChallenge: CustomChallenge = {
      id: Date.now().toString(),
      text: newChallengeText,
      type: newChallengeType,
      mood: Mood.FUNNY // Default
    };
    onUpdateUser({
      ...user,
      savedChallenges: [...user.savedChallenges, newChallenge]
    });
    setNewChallengeText('');
  };

  const removeChallenge = (id: string) => {
    onUpdateUser({
      ...user,
      savedChallenges: user.savedChallenges.filter(c => c.id !== id)
    });
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="text-gray-400 hover:text-white">← Back</button>
        <h2 className="text-3xl font-bold">My Profile</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Subscription Card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white">Membership</h3>
              <p className="text-gray-400">{user.isPremium ? 'Pro Member' : 'Free Tier'}</p>
            </div>
            <div className={`p-3 rounded-full ${user.isPremium ? 'bg-yellow-500/20' : 'bg-gray-700'}`}>
              <Crown className={`w-8 h-8 ${user.isPremium ? 'text-yellow-500' : 'text-gray-400'}`} />
            </div>
          </div>

          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 text-gray-300">
              <CheckCircle className="w-5 h-5 text-green-500" /> Unlimited Soft & Funny cards
            </li>
            <li className="flex items-center gap-3 text-gray-300">
              <CheckCircle className={`w-5 h-5 ${user.isPremium ? 'text-green-500' : 'text-gray-600'}`} /> 
              Spicy & Extreme Modes
            </li>
            <li className="flex items-center gap-3 text-gray-300">
              <CheckCircle className={`w-5 h-5 ${user.isPremium ? 'text-green-500' : 'text-gray-600'}`} /> 
              No Ads
            </li>
          </ul>

          <Button 
            onClick={togglePremium} 
            className={`w-full ${user.isPremium ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black'}`}
          >
            {user.isPremium ? 'Cancel Premium' : 'Upgrade to Pro - $4.99'}
          </Button>
        </div>

        {/* Custom Challenges */}
        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Star className="text-yellow-400" /> Custom Cards
          </h3>
          <p className="text-sm text-gray-400 mb-6">Create your own cards to mix into the game.</p>

          <div className="flex flex-col gap-3 mb-6">
            <textarea
              value={newChallengeText}
              onChange={(e) => setNewChallengeText(e.target.value)}
              placeholder="Write a custom truth or dare..."
              className="w-full bg-black/20 border border-gray-600 rounded-lg p-3 text-sm focus:border-indigo-500 outline-none resize-none h-24"
            />
            <div className="flex gap-2">
              <select 
                value={newChallengeType}
                onChange={(e) => setNewChallengeType(e.target.value as ChallengeType)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-3 text-sm outline-none"
              >
                <option value={ChallengeType.TRUTH}>Truth</option>
                <option value={ChallengeType.DARE}>Dare</option>
              </select>
              <Button onClick={addCustomChallenge} size="sm" className="flex-1">
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {user.savedChallenges.length === 0 && (
               <p className="text-center text-gray-500 py-4">No custom cards yet.</p>
            )}
            {user.savedChallenges.map((c) => (
              <div key={c.id} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                <div>
                   <span className={`text-xs font-bold uppercase mr-2 ${c.type === ChallengeType.TRUTH ? 'text-blue-400' : 'text-red-400'}`}>
                     {c.type}
                   </span>
                   <span className="text-sm">{c.text}</span>
                </div>
                <button onClick={() => removeChallenge(c.id)} className="text-gray-500 hover:text-red-400">
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};