import { getGeminiRecommendation } from './geminiApi';

// Gemini-powered AI recommendation function
export const generateRecommendation = async (userQuery, styleProfile, wardrobeData = {}) => {
  // 1. Filter: If wardrobe is empty, reply directly
  const hasItems = Object.values(wardrobeData).some(items => Array.isArray(items) && items.length > 0);
  if (!hasItems) {
    return {
      text: "Your wardrobe is empty. Please add some clothing items to get recommendations!",
      items: []
    };
  }

  // 2. Filter: If user just says hi/hello etc, reply directly
  const greetingRegex = /^(hi|hello|hey|hii|hiii|yo|hola|namaste|sup|good (morning|afternoon|evening|day))([!. ]|$)/i;
  if (greetingRegex.test(userQuery.trim())) {
    return {
      text: "Hi there! 👋 How can I help you with outfit recommendations today?",
      items: []
    };
  }

  // 3. Otherwise, use Gemini
  const prompt = buildGeminiPrompt(userQuery, styleProfile, wardrobeData);
  const text = await getGeminiRecommendation(prompt);

  // Try to extract picked items from Gemini's response by matching wardrobe item names
  const allItems = Object.values(wardrobeData).flat();
  const picked = allItems.filter(item => text && item.name && text.toLowerCase().includes(item.name.toLowerCase()));

  return {
    text,
    items: picked
  };
};

function buildGeminiPrompt(userQuery, styleProfile, wardrobeData) {
  // Convert wardrobe to readable list
  const wardrobeList = Object.entries(wardrobeData)
    .map(([cat, items]) => `${cat}: ${items.map(i => i.name).join(', ')}`)
    .join('\n');
  let profile = styleProfile ? JSON.stringify(styleProfile) : 'Not provided';
  return `You are a fashion AI assistant.\n\nUser Query: ${userQuery}\n\nUser Style Profile: ${profile}\n\nUser Wardrobe:\n${wardrobeList}\n\nBased on the wardrobe and style profile, recommend the best possible outfit for the user's query or sometimes give random ouutfit based on wardrobe so user can discover new things. Be specific and friendly. List the recommended items only top and bottoms avoid other things. Answer it very shortly with small reason but too short reply only. You response dont need to include * , ** or any bold letters`;
}
