
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const SelfieUploader = ({ value, onChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload({ target: { files: [e.dataTransfer.files[0]] } });
    }
  };
  
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      // First, get a temporary URL for preview
      const imageUrl = URL.createObjectURL(file);
      onChange(imageUrl);

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
      const filePath = `${user.id}/selfie.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('wardrobe')
        .upload(filePath, file, { upsert: true });
        
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
        
      // Update with the permanent URL
      onChange(publicUrlData.publicUrl);
      setIsUploading(false);
      
    } catch (error) {
      console.error('Selfie upload error:', error);
      toast({
        title: "Upload error",
        description: "Failed to upload your selfie",
        variant: "destructive"
      });
      setIsUploading(false);
    }
  };
  
  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        dragActive 
          ? 'border-fashion-purple bg-fashion-purple bg-opacity-5' 
          : 'border-gray-300'
      }`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      {value ? (
        <div className="space-y-4">
          <div className="w-48 h-48 mx-auto overflow-hidden rounded-full border-4 border-fashion-purple">
            <img 
              src={value} 
              alt="Your selfie" 
              className="w-full h-full object-cover"
            />
          </div>
          <button 
            onClick={() => onChange(null)}
            className="text-fashion-purple hover:underline"
          >
            Remove and upload a different photo
          </button>
        </div>
      ) : (
        <>
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="text-gray-600 mb-4">Drag and drop your selfie here, or click to browse</p>
          <label className="fashion-button inline-block cursor-pointer">
            {isUploading ? 'Uploading...' : 'Upload Photo'}
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>
          <p className="text-sm text-gray-500 mt-4">This helps our AI better understand your coloring</p>
        </>
      )}
    </div>
  );
};

export default SelfieUploader;
