
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

const CLOTHING_CATEGORIES = [
  { id: 'tops', label: 'Tops' },
  { id: 'bottoms', label: 'Bottoms' },
  { id: 'outerwear', label: 'Outerwear' },
  { id: 'dresses', label: 'Dresses' },
  { id: 'shoes', label: 'Shoes' },
  { id: 'accessories', label: 'Accessories' },
];

const AddItemModal = ({ isOpen, onClose, onItemAdded }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    color: '',
    category: 'tops',
    imageUrl: null,
  });

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      
      // First, get a temporary URL for preview
      const tempImageUrl = URL.createObjectURL(file);
      setNewItem({ ...newItem, imageUrl: tempImageUrl });
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to upload images",
          variant: "destructive"
        });
        setIsUploading(false);
        return;
      }
      
      // Then, upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('wardrobe')
        .upload(filePath, file);
        
      if (uploadError) {
        toast({
          title: "Upload failed",
          description: uploadError.message,
          variant: "destructive"
        });
        setIsUploading(false);
        return;
      }
      
      // Get the public URL of the uploaded image
      const { data: publicUrlData } = supabase.storage
        .from('wardrobe')
        .getPublicUrl(filePath);
      
      // Update newItem with the permanent URL
      setNewItem({ 
        ...newItem, 
        imageUrl: publicUrlData.publicUrl 
      });
      
      setIsUploading(false);
    } catch (error) {
      console.error('File upload error:', error);
      toast({
        title: "Upload error",
        description: "Failed to upload your image",
        variant: "destructive"
      });
      setIsUploading(false);
    }
  };
  
  const handleAddItem = async () => {
    if (!newItem.name || !newItem.imageUrl) return;
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to add items",
          variant: "destructive"
        });
        return;
      }
      
      const itemData = {
        user_id: user.id,
        name: newItem.name,
        description: newItem.description,
        color: newItem.color,
        category: newItem.category,
        image_url: newItem.imageUrl
      };
      
      const { data, error } = await supabase
        .from('wardrobe_items')
        .insert(itemData)
        .select();
      
      if (error) {
        toast({
          title: "Failed to add item",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      // Reset form
      setNewItem({
        name: '',
        description: '',
        color: '',
        category: 'tops',
        imageUrl: null,
      });
      
      toast({
        title: "Item added",
        description: "Your wardrobe item has been added successfully",
      });
      
      // Callback to parent component
      if (onItemAdded && data?.[0]) {
        onItemAdded(data[0]);
      }
      
      // Close modal
      onClose();
    } catch (error) {
      console.error('Add item error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add New Item</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="fashion-input w-full px-3 py-2"
              >
                {CLOTHING_CATEGORIES.map(category => (
                  <option key={category.id} value={category.id}>{category.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name
              </label>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="fashion-input w-full px-3 py-2"
                placeholder="Black T-shirt"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (optional)
              </label>
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="fashion-input w-full px-3 py-2"
                placeholder="Cotton, crew neck, slim fit"
                rows={2}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <input
                type="text"
                value={newItem.color}
                onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
                className="fashion-input w-full px-3 py-2"
                placeholder="Black, Navy, etc."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photo
              </label>
              
              {newItem.imageUrl ? (
                <div className="relative">
                  <img 
                    src={newItem.imageUrl} 
                    alt={newItem.name || "Clothing item"} 
                    className="max-h-48 rounded-md mx-auto"
                  />
                  <button
                    onClick={() => setNewItem({ ...newItem, imageUrl: null })}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                    disabled={isUploading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <input
                    type="file"
                    id="item-photo"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                  <label 
                    htmlFor="item-photo"
                    className="cursor-pointer"
                  >
                    <div className="text-gray-500">
                      {isUploading ? (
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fashion-purple"></div>
                          <p className="mt-2">Uploading...</p>
                        </div>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="mt-1">Upload a photo</p>
                        </>
                      )}
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              onClick={handleAddItem}
              className="fashion-button"
              disabled={!newItem.name || !newItem.imageUrl || isUploading}
            >
              {isUploading ? 'Uploading...' : 'Add Item'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
