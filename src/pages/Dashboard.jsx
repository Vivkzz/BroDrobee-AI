import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../App.tsx';
import { supabase } from "@/integrations/supabase/client";
import ChatInterface from '../components/ChatInterface';
import OutfitRecommendation from '../components/OutfitRecommendation';
import { toast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { user, styleProfile } = useUser();
  const navigate = useNavigate();
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wardrobe, setWardrobe] = useState({});
  
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (!styleProfile) {
      // Check Supabase for profile
      const checkProfile = async () => {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
          
        if (!data) {
          navigate('/quiz');
        }
      };
      
      checkProfile();
      return;
    }
    
    // Load wardrobe and generate outfit recommendations
    loadWardrobeAndRecommendations();
  }, [user, styleProfile, navigate]);
  
  const loadWardrobeAndRecommendations = async () => {
    setLoading(true);
    
    try {
      // Fetch wardrobe items
      const { data: wardrobeItems, error: wardrobeError } = await supabase
        .from('wardrobe_items')
        .select('*')
        .eq('user_id', user.id);
        
      if (wardrobeError) {
        console.error('Error loading wardrobe:', wardrobeError);
        toast({
          title: "Error loading wardrobe",
          description: wardrobeError.message,
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
      
      // Organize items by category
      const itemsByCategory = {
        tops: [],
        bottoms: [],
        outerwear: [],
        dresses: [],
        shoes: [],
        accessories: []
      };
      
      wardrobeItems.forEach(item => {
        if (itemsByCategory[item.category]) {
          itemsByCategory[item.category].push({
            ...item,
            imageUrl: item.image_url
          });
        }
      });
      
      setWardrobe(itemsByCategory);
      
      // Generate outfit recommendations
      // This is just a simulation - in a real app, you might use an API
      const hasEnoughItems = Object.values(itemsByCategory).some(category => category.length > 0);
      
      if (!hasEnoughItems) {
        setOutfits([]);
        setLoading(false);
        return;
      }
      
      // Generate sample outfits based on user's wardrobe
      const generatedOutfits = generateOutfits(itemsByCategory, styleProfile);
      setOutfits(generatedOutfits);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Sample function to generate outfits - this would be more sophisticated in a real app
  const generateOutfits = (wardrobe, styleProfile) => {
    const occasions = ['Casual Day Out', 'Office Meeting', 'Evening Dinner'];
    const generatedOutfits = [];
    
    for (let i = 0; i < Math.min(3, occasions.length); i++) {
      const outfit = { id: i.toString(), occasion: occasions[i], items: [] };
      
      // Add a top if available
      if (wardrobe.tops.length > 0) {
        const randomTop = wardrobe.tops[Math.floor(Math.random() * wardrobe.tops.length)];
        outfit.items.push({ type: 'top', name: randomTop.name, imageUrl: randomTop.imageUrl });
      }
      
      // Add bottoms if available
      if (wardrobe.bottoms.length > 0) {
        const randomBottom = wardrobe.bottoms[Math.floor(Math.random() * wardrobe.bottoms.length)];
        outfit.items.push({ type: 'bottom', name: randomBottom.name, imageUrl: randomBottom.imageUrl });
      }
      
      // Add outerwear for certain occasions
      if (wardrobe.outerwear.length > 0 && (occasions[i] === 'Office Meeting' || occasions[i] === 'Evening Dinner')) {
        const randomOuterwear = wardrobe.outerwear[Math.floor(Math.random() * wardrobe.outerwear.length)];
        outfit.items.push({ type: 'outerwear', name: randomOuterwear.name, imageUrl: randomOuterwear.imageUrl });
      }
      
      // Add shoes if available
      if (wardrobe.shoes.length > 0) {
        const randomShoes = wardrobe.shoes[Math.floor(Math.random() * wardrobe.shoes.length)];
        outfit.items.push({ type: 'shoes', name: randomShoes.name, imageUrl: randomShoes.imageUrl });
      }
      
      // Add an accessory if available
      if (wardrobe.accessories.length > 0) {
        const randomAccessory = wardrobe.accessories[Math.floor(Math.random() * wardrobe.accessories.length)];
        outfit.items.push({ type: 'accessory', name: randomAccessory.name, imageUrl: randomAccessory.imageUrl });
      }
      
      generatedOutfits.push(outfit);
    }
    
    return generatedOutfits;
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome back! Here are your outfit recommendations.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Today's Recommendations</h2>
          {loading ? (
            <div className="fashion-card p-8 flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-fashion-purple bg-opacity-20 rounded-full"></div>
                <div className="mt-4 h-4 w-32 bg-fashion-purple bg-opacity-20 rounded"></div>
              </div>
            </div>
          ) : outfits.length > 0 ? (
            <div className="space-y-6">
              {outfits.map(outfit => (
                <OutfitRecommendation key={outfit.id} outfit={outfit} />
              ))}
            </div>
          ) : (
            <div className="fashion-card p-8 text-center">
              <p className="text-gray-600 mb-4">Add items to your wardrobe to see outfit recommendations.</p>
              <button 
                className="fashion-button"
                onClick={() => navigate('/wardrobe')}
              >
                Go to Wardrobe
              </button>
            </div>
          )}
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Ask StyleSync AI</h2>
          <div className="fashion-card">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
