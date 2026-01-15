export enum Mood {
  SOFT = 'Soft',
  FUNNY = 'Funny',
  AWKWARD = 'Awkward',
  SPICY = 'Spicy',
  EXTREME = 'Extreme',
  COUPLES = 'Couples'
}

export enum ChallengeType {
  TRUTH = 'Truth',
  DARE = 'Dare'
}

export interface Player {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Non-binary';
}

export interface CustomChallenge {
  id: string;
  text: string;
  type: ChallengeType;
  mood: Mood;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  selectedMood: Mood;
  history: { player: string; type: ChallengeType; text: string }[];
}

export interface UserProfile {
  username: string;
  isPremium: boolean;
  savedChallenges: CustomChallenge[];
  savedGames: GameState[]; // Simplified for demo
}
