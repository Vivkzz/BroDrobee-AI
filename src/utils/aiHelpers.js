
// Helper function to analyze user queries and understand intent
export const processUserQuery = (query) => {
  // Convert to lowercase for easier matching
  const lowerQuery = query.toLowerCase();
  
  // Check for outfit requests
  if (containsAny(lowerQuery, ['wear', 'outfit', 'clothes', 'dress', 'recommend', 'suggestion'])) {
    // Determine occasion
    if (containsAny(lowerQuery, ['concert', 'show', 'gig', 'performance'])) {
      return { type: 'outfit_request', occasion: 'concert' };
    } else if (containsAny(lowerQuery, ['formal', 'business', 'meeting', 'interview', 'work', 'office'])) {
      return { type: 'outfit_request', occasion: 'formal' };
    } else if (containsAny(lowerQuery, ['date', 'dinner', 'restaurant'])) {
      return { type: 'outfit_request', occasion: 'date' };
    } else if (containsAny(lowerQuery, ['casual', 'everyday', 'hang out', 'weekend'])) {
      return { type: 'outfit_request', occasion: 'casual' };
    } else {
      return { type: 'outfit_request', occasion: 'general' };
    }
  }
  
  // Default to general conversation
  return { type: 'general_conversation' };
};

// Helper function to check if a string contains any of the target words
const containsAny = (str, targetWords) => {
  return targetWords.some(word => str.includes(word));
};

// In a real app, you might use ML for more sophisticated query understanding
// For example:
// - Sentiment analysis to understand user frustration or satisfaction
// - Named entity recognition to identify clothing items, brands, events
// - Intent classification with a trained model instead of simple keyword matching
