
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../App.tsx';
import { toast } from "@/components/ui/use-toast";
import ClothingItem from '../components/ClothingItem';
import AddItemModal from '../components/AddItemModal';
import CategoryTabs from '../components/CategoryTabs';
import { useWardrobeData } from '../hooks/useWardrobeData';

const CLOTHING_CATEGORIES = [
  { id: 'tops', label: 'Tops' },
  { id: 'bottoms', label: 'Bottoms' },
  { id: 'outerwear', label: 'Outerwear' },
  { id: 'dresses', label: 'Dresses' },
  { id: 'shoes', label: 'Shoes' },
  { id: 'accessories', label: 'Accessories' },
];

const Wardrobe = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  const [activeCategory, setActiveCategory] = useState('tops');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { wardrobe, loading, deleteItem, addItem } = useWardrobeData(user);
  
  // Redirect to login if not authenticated
  if (!user) {
    navigate('/auth');
    return null;
  }
  
  const handleDeleteItem = (itemId) => {
    deleteItem(activeCategory, itemId);
  };
  
  const handleItemAdded = (item) => {
    addItem(item);
  };
  
  // Calculate item counts for each category
  const itemCounts = {};
  Object.keys(wardrobe).forEach(category => {
    itemCounts[category] = wardrobe[category]?.length || 0;
  });
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Wardrobe</h1>
          <p className="text-gray-600">Manage your clothing items for better outfit recommendations</p>
        </div>
        
        <button 
          className="fashion-button"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Item
        </button>
      </div>
      
      <CategoryTabs 
        categories={CLOTHING_CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        itemCounts={itemCounts}
      />
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fashion-purple"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wardrobe[activeCategory]?.length > 0 ? (
            wardrobe[activeCategory].map(item => (
              <ClothingItem 
                key={item.id} 
                item={{
                  ...item,
                  imageUrl: item.image_url
                }}
                onDelete={() => handleDeleteItem(item.id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 mb-4">No items in this category yet</p>
              <button 
                className="fashion-button"
                onClick={() => setIsModalOpen(true)}
              >
                Add Your First Item
              </button>
            </div>
          )}
        </div>
      )}
      
      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onItemAdded={handleItemAdded}
      />
    </div>
  );
};

export default Wardrobe;
