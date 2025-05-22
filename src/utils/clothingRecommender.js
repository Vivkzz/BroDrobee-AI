import { getGeminiRecommendation } from './geminiApi';

// Gemini-powered AI recommendation function
export const generateRecommendation = async (userQuery, styleProfile, wardrobeData = {}) => {
  // Prepare a detailed prompt for Gemini
  const prompt = buildGeminiPrompt(userQuery, styleProfile, wardrobeData);
  const text = await getGeminiRecommendation(prompt);
  // Optionally, you could parse structured data from Gemini if you instruct it to return JSON
  return {
    text,
    items: [] // Optionally, parse items if Gemini returns them
  };
};

function buildGeminiPrompt(userQuery, styleProfile, wardrobeData) {
  // Convert wardrobe to readable list
  const wardrobeList = Object.entries(wardrobeData)
    .map(([cat, items]) => `${cat}: ${items.map(i => i.name).join(', ')}`)
    .join('\n');
  let profile = styleProfile ? JSON.stringify(styleProfile) : 'Not provided';
  return `You are a fashion AI assistant.\n\nUser Query: ${userQuery}\n\nUser Style Profile: ${profile}\n\nUser Wardrobe:\n${wardrobeList}\n\nBased on the wardrobe and style profile, recommend the best possible outfit for the user's query. Be specific and friendly. List the recommended items and explain your reasoning. If the wardrobe is empty, politely ask the user to add items.`;
}
