import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { HomeScreen } from './screens/HomeScreen';
import { SetupScreen } from './screens/SetupScreen';
import { ModeSelectionScreen } from './screens/ModeSelectionScreen';
import { GameScreen } from './screens/GameScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { PremiumModal } from './components/PremiumModal';
import { Player, Mood, UserProfile } from './types';

type Screen = 'home' | 'setup' | 'mode' | 'game' | 'profile';

const DEFAULT_USER: UserProfile = {
  username: 'Player 1',
  isPremium: false,
  savedChallenges: [],
  savedGames: []
};

const App: React.FC = () => {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Data State
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('daredash_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedMood, setSelectedMood] = useState<Mood>(Mood.FUNNY);

  // Persistence
  useEffect(() => {
    localStorage.setItem('daredash_user', JSON.stringify(user));
  }, [user]);

  // Handlers
  const handleStartGame = () => setCurrentScreen('setup');
  
  const handleSetupComplete = (newPlayers: Player[]) => {
    setPlayers(newPlayers);
    setCurrentScreen('mode');
  };

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setCurrentScreen('game');
  };

  const handleUnlockPremium = () => {
    setShowPremiumModal(true);
  };

  const handleUpgrade = () => {
    setUser({ ...user, isPremium: true });
    setShowPremiumModal(false);
  };

  const handleExitGame = () => {
    // Removed confirmation dialog to ensure users can always exit easily
    setCurrentScreen('home');
  };

  // Render Logic
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            onStart={handleStartGame} 
            onLogin={() => setCurrentScreen('profile')} 
            hasAccount={true} // Simplified logic
          />
        );
      case 'setup':
        return <SetupScreen onNext={handleSetupComplete} />;
      case 'mode':
        return (
          <ModeSelectionScreen 
            onSelectMood={handleMoodSelect} 
            isPremium={user.isPremium}
            onUnlockPremium={handleUnlockPremium}
          />
        );
      case 'game':
        return (
          <GameScreen 
            players={players} 
            mood={selectedMood} 
            onExit={handleExitGame} 
          />
        );
      case 'profile':
        return (
          <ProfileScreen 
            user={user} 
            onUpdateUser={setUser} 
            onBack={() => setCurrentScreen('home')} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout 
      showNav={true}
      onProfileClick={() => setCurrentScreen('profile')}
      onLogoutClick={currentScreen !== 'home' ? handleExitGame : undefined}
    >
      {renderScreen()}
      <PremiumModal 
        isOpen={showPremiumModal} 
        onClose={() => setShowPremiumModal(false)}
        onUpgrade={handleUpgrade}
      />
    </Layout>
  );
};

export default App;