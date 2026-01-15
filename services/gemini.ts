import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Mood, Player, ChallengeType } from '../types';

const getClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const challengeSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    challenge: {
      type: Type.STRING,
      description: "The truth question or dare instruction.",
    },
    mood: {
      type: Type.STRING,
      description: "The mood of the challenge.",
    },
    intensity: {
      type: Type.INTEGER,
      description: "Intensity rating from 1 to 10.",
    }
  },
  required: ["challenge", "mood"],
};

export const generateChallenge = async (
  type: ChallengeType,
  mood: Mood,
  currentPlayer: Player,
  otherPlayers: Player[]
): Promise<string> => {
  try {
    const ai = getClient();
    
    // Construct a context-aware prompt
    const otherNames = otherPlayers.map(p => p.name).join(", ");
    
    let systemInstruction = `You are a party game master for a game of Truth or Dare. 
    Generate a short, creative, engaging, and unique ${type} for a player named ${currentPlayer.name} (Age: ${currentPlayer.age}).
    The current mood is ${mood}.
    
    Safety Guidelines:
    - If the mood is SPICY, EXTREME, or COUPLES, ensure content is appropriate for the age group (Age: ${currentPlayer.age}).
    - For minors (under 18), strictly avoid any sexual, alcohol, or dangerous content regardless of the requested mood. Convert 'Spicy' to 'Silly/Fun' for minors.
    - Be creative. Avoid clichés.
    `;

    if (otherPlayers.length > 0) {
      systemInstruction += `\nOther players in the room are: ${otherNames}. You can involve them in the dare or question if appropriate.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Give me a ${type} challenge.`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: challengeSchema,
        temperature: 0.8, // High creativity
      },
    });

    const jsonText = response.text;
    if (!jsonText) return "Could not generate a challenge. Try again!";

    const data = JSON.parse(jsonText);
    return data.challenge;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops, the AI is feeling shy. Please try spinning again!";
  }
};
