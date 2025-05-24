import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../App.tsx';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { QUIZ_STEPS } from '../constants/quiz';

const Profile = () => {
  const { user, styleProfile, setStyleProfile } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    gender: '',
    occupation: '',
    occupation_subcategory: '',
    skinTone: '',
    undertone: '',
    stylePreferences: [],
    occasionPreferences: [],
    colorPreferences: [],
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // Load profile data
    if (styleProfile) {
      setFormData({
        gender: styleProfile.gender || '',
        occupation: styleProfile.occupation || '',
        occupation_subcategory: styleProfile.occupation_subcategory || '',
        skinTone: styleProfile.skin_tone || '',
        undertone: styleProfile.undertone || '',
        stylePreferences: styleProfile.style_preferences || [],
        occasionPreferences: styleProfile.occasion_preferences || [],
        colorPreferences: styleProfile.color_preferences || [],
      });
    }
    setLoading(false);
  }, [user, styleProfile, navigate]);

  const handleSingleSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Reset subcategory when main category changes
      ...(field === 'occupation' && { occupation_subcategory: '' })
    }));
  };

  const handleSubcategorySelect = (value) => {
    setFormData(prev => ({
      ...prev,
      occupation_subcategory: value
    }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => {
      const currentValues = prev[field] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
        
      return {
        ...prev,
        [field]: newValues
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const profileData = {
        id: user.id,
        gender: formData.gender,
        occupation: formData.occupation,
        occupation_subcategory: formData.occupation_subcategory,
        skin_tone: formData.skinTone,
        undertone: formData.undertone,
        style_preferences: formData.stylePreferences,
        occasion_preferences: formData.occasionPreferences,
        color_preferences: formData.colorPreferences,
      };

      const { data, error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'id' })
        .select();

      if (error) throw error;

      setStyleProfile(data[0]);
      toast({
        title: "Profile updated",
        description: "Your preferences have been saved successfully!",
      });
    } catch (error) {
      console.error('Profile update error:', error);
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-fashion-light-gray flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fashion-purple"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fashion-light-gray py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Gender Selection */}
            <div className="fashion-card p-6">
              <h2 className="text-xl font-semibold mb-4">Gender</h2>
              <div className="grid grid-cols-2 gap-4">
                {['male', 'female', 'non-binary', 'prefer-not-to-say'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSingleSelect('gender', option)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.gender === option
                        ? 'border-fashion-purple bg-fashion-purple bg-opacity-10'
                        : 'border-gray-200 hover:border-fashion-purple'
                    }`}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1).replace(/-/g, ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Occupation Selection */}
            <div className="fashion-card p-6">
              <h2 className="text-xl font-semibold mb-4">Occupation</h2>
              <div className="space-y-6">
                {/* Main Categories */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Main Category</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {QUIZ_STEPS[1].options.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSingleSelect('occupation', option.value)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.occupation === option.value
                            ? 'border-fashion-purple bg-fashion-purple bg-opacity-10'
                            : 'border-gray-200 hover:border-fashion-purple'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subcategories */}
                {formData.occupation && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Specific Role</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {QUIZ_STEPS[1].options
                        .find(opt => opt.value === formData.occupation)
                        ?.subcategories.map((subcat) => (
                          <button
                            key={subcat.value}
                            type="button"
                            onClick={() => handleSubcategorySelect(subcat.value)}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              formData.occupation_subcategory === subcat.value
                                ? 'border-fashion-purple bg-fashion-purple bg-opacity-10'
                                : 'border-gray-200 hover:border-fashion-purple'
                            }`}
                          >
                            {subcat.label}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Style Preferences */}
            <div className="fashion-card p-6">
              <h2 className="text-xl font-semibold mb-4">Style Preferences</h2>
              <div className="grid grid-cols-2 gap-4">
                {['casual', 'formal', 'streetwear', 'vintage', 'minimalist', 'bohemian', 'preppy', 'athleisure'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleMultiSelect('stylePreferences', option)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.stylePreferences.includes(option)
                        ? 'border-fashion-purple bg-fashion-purple bg-opacity-10'
                        : 'border-gray-200 hover:border-fashion-purple'
                    }`}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion Preferences */}
            <div className="fashion-card p-6">
              <h2 className="text-xl font-semibold mb-4">Occasion Preferences</h2>
              <div className="grid grid-cols-2 gap-4">
                {['work', 'casual-outings', 'formal-events', 'dates', 'parties', 'outdoor-activities', 'exercise'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleMultiSelect('occasionPreferences', option)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.occasionPreferences.includes(option)
                        ? 'border-fashion-purple bg-fashion-purple bg-opacity-10'
                        : 'border-gray-200 hover:border-fashion-purple'
                    }`}
                  >
                    {option.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Preferences */}
            <div className="fashion-card p-6">
              <h2 className="text-xl font-semibold mb-4">Color Preferences</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'black', color: '#000000' },
                  { value: 'white', color: '#FFFFFF' },
                  { value: 'gray', color: '#808080' },
                  { value: 'navy', color: '#000080' },
                  { value: 'blue', color: '#0000FF' },
                  { value: 'green', color: '#008000' },
                  { value: 'red', color: '#FF0000' },
                  { value: 'yellow', color: '#FFFF00' },
                  { value: 'purple', color: '#800080' },
                  { value: 'pink', color: '#FFC0CB' },
                  { value: 'orange', color: '#FFA500' },
                  { value: 'brown', color: '#A52A2A' },
                ].map(({ value, color }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleMultiSelect('colorPreferences', value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.colorPreferences.includes(value)
                        ? 'border-fashion-purple bg-fashion-purple bg-opacity-10'
                        : 'border-gray-200 hover:border-fashion-purple'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                      <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="fashion-button-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="fashion-button"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile; 