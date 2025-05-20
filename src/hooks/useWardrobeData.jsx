
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const useWardrobeData = (user) => {
  const [wardrobe, setWardrobe] = useState({});
  const [loading, setLoading] = useState(true);

  const loadWardrobeItems = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('wardrobe_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: "Error loading wardrobe",
          description: error.message,
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      // Organize items by category
      const itemsByCategory = {};
      const categories = ['tops', 'bottoms', 'outerwear', 'dresses', 'shoes', 'accessories'];
      
      categories.forEach(category => {
        itemsByCategory[category] = [];
      });

      data.forEach(item => {
        if (itemsByCategory[item.category]) {
          itemsByCategory[item.category].push(item);
        }
      });

      setWardrobe(itemsByCategory);
      setLoading(false);
    } catch (error) {
      console.error('Error loading wardrobe:', error);
      setLoading(false);
    }
  };

  const deleteItem = async (categoryId, itemId) => {
    try {
      // Delete from Supabase
      const { error } = await supabase
        .from('wardrobe_items')
        .delete()
        .eq('id', itemId);
      
      if (error) {
        toast({
          title: "Delete failed",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }
      
      // Update local state
      setWardrobe(prev => {
        const updatedWardrobe = { ...prev };
        updatedWardrobe[categoryId] = updatedWardrobe[categoryId].filter(
          item => item.id !== itemId
        );
        return updatedWardrobe;
      });
      
      toast({
        title: "Item deleted",
        description: "The item has been removed from your wardrobe",
      });
      
      return true;
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    }
  };

  const addItem = (item) => {
    setWardrobe(prev => {
      const updatedWardrobe = { ...prev };
      updatedWardrobe[item.category] = [
        ...(updatedWardrobe[item.category] || []),
        item
      ];
      return updatedWardrobe;
    });
  };

  useEffect(() => {
    loadWardrobeItems();
  }, [user]);

  return {
    wardrobe,
    loading,
    refreshWardrobe: loadWardrobeItems,
    deleteItem,
    addItem
  };
};
