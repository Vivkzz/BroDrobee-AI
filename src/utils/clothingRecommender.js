
import { processUserQuery } from './aiHelpers';

// AI recommendation function that works with Supabase data
export const generateRecommendation = async (userQuery, styleProfile, wardrobeData = {}) => {
  // Let's simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Process the user query to understand intent
  const intent = processUserQuery(userQuery);
  
  // Generate appropriate response based on intent and available wardrobe
  if (intent.type === 'outfit_request') {
    // Check if we have enough clothing items
    const hasEnoughItems = Object.values(wardrobeData).some(category => category.length > 0);
    
    if (!hasEnoughItems) {
      return {
        text: "I'd love to recommend an outfit, but it looks like your wardrobe is empty. Add some clothing items first, and I'll create personalized recommendations for you!",
        items: []
      };
    }
    
    // Generate outfit based on occasion
    if (intent.occasion === 'concert') {
      return createOutfitFromWardrobe(wardrobeData, styleProfile, 'concert');
    } else if (intent.occasion === 'casual') {
      return createOutfitFromWardrobe(wardrobeData, styleProfile, 'casual');
    } else if (intent.occasion === 'formal') {
      return createOutfitFromWardrobe(wardrobeData, styleProfile, 'formal');
    } else if (intent.occasion === 'date') {
      return createOutfitFromWardrobe(wardrobeData, styleProfile, 'date');
    } else {
      // General outfit recommendation
      return createOutfitFromWardrobe(wardrobeData, styleProfile, 'general');
    }
  } else {
    // General conversation
    return {
      text: "I'm your AI style assistant! Ask me for outfit recommendations for specific occasions like 'What should I wear to a concert tonight?' or 'Help me pick a casual outfit.'",
      items: []
    };
  }
};

// Main function to create outfits from wardrobe
const createOutfitFromWardrobe = (wardrobeData, styleProfile, occasion) => {
  // Extract available wardrobe items by category
  const tops = wardrobeData.tops || [];
  const bottoms = wardrobeData.bottoms || [];
  const outerwear = wardrobeData.outerwear || [];
  const dresses = wardrobeData.dresses || [];
  const shoes = wardrobeData.shoes || [];
  const accessories = wardrobeData.accessories || [];
  
  // Check if we have basic items to create an outfit
  const hasBasicItems = (tops.length > 0 && bottoms.length > 0) || dresses.length > 0;
  
  if (!hasBasicItems) {
    return {
      text: `I'd love to suggest a ${occasion} outfit, but you need more items in your wardrobe. At minimum, I need tops and bottoms OR dresses to create an outfit.`,
      items: []
    };
  }

  // Select appropriate items based on occasion
  let outfit = {};
  let response = "";
  let selectedItems = [];
  
  // Decide whether to use a dress or top+bottom combination
  const useDress = dresses.length > 0 && Math.random() > 0.5;
  
  if (useDress) {
    outfit.dress = selectBestItem(dresses, occasion, styleProfile);
    if (outfit.dress) {
      selectedItems.push(outfit.dress);
    }
  } else {
    outfit.top = selectBestItem(tops, occasion, styleProfile);
    outfit.bottom = selectBestItem(bottoms, occasion, styleProfile);
    if (outfit.top) selectedItems.push(outfit.top);
    if (outfit.bottom) selectedItems.push(outfit.bottom);
  }
  
  // Add shoes if available
  if (shoes.length > 0) {
    outfit.shoes = selectBestItem(shoes, occasion, styleProfile);
    if (outfit.shoes) selectedItems.push(outfit.shoes);
  }
  
  // Add outerwear for certain occasions
  if (outerwear.length > 0 && ['formal', 'concert', 'date'].includes(occasion)) {
    outfit.outerwear = selectBestItem(outerwear, occasion, styleProfile);
    if (outfit.outerwear) selectedItems.push(outfit.outerwear);
  }
  
  // Add accessories for flair
  if (accessories.length > 0) {
    outfit.accessory = selectBestItem(accessories, occasion, styleProfile);
    if (outfit.accessory) selectedItems.push(outfit.accessory);
  }

  // Generate response based on the occasion
  switch(occasion) {
    case 'concert':
      response = "For the concert tonight, I recommend this outfit from your wardrobe:";
      break;
    case 'casual':
      response = "For a casual day out, here's a comfortable outfit from your wardrobe:";
      break;
    case 'formal':
      response = "For your formal occasion, I suggest this polished outfit from your wardrobe:";
      break;
    case 'date':
      response = "For your date, here's a stylish outfit from your wardrobe:";
      break;
    default:
      response = "Based on your wardrobe, I recommend this outfit that complements your style profile:";
  }
  
  response += "\n\n";
  
  // List outfit items
  if (outfit.dress) {
    response += `• ${outfit.dress.name}\n`;
  } else {
    if (outfit.top) response += `• ${outfit.top.name}\n`;
    if (outfit.bottom) response += `• ${outfit.bottom.name}\n`;
  }
  
  if (outfit.outerwear) {
    response += `• ${outfit.outerwear.name}\n`;
  }
  
  if (outfit.shoes) {
    response += `• ${outfit.shoes.name}\n`;
  }
  
  if (outfit.accessory) {
    response += `• ${outfit.accessory.name}\n`;
  }
  
  // Add final touches
  if (styleProfile) {
    response += "\nThis combination will look great with your complexion and style preferences!";
  } else {
    response += "\nThis combination should work well for the occasion!";
  }
  
  return {
    text: response,
    items: selectedItems
  };
};

// Helper function to select the best item for the occasion
const selectBestItem = (items, occasion, styleProfile) => {
  // In a real app, we would use AI to select the best item based on various factors
  // For now, we'll just select a random item
  return items[Math.floor(Math.random() * items.length)];
};
