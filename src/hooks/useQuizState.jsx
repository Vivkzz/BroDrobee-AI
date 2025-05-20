
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const useQuizState = (user, onComplete) => {
  const [step, setStep] = useState(0);
  const [quizData, setQuizData] = useState({
    skinTone: '',
    undertone: '',
    stylePreferences: [],
    occasionPreferences: [],
    colorPreferences: [],
    selfieUrl: null
  });
  
  const handleSingleSelect = (field, value) => {
    setQuizData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleMultiSelect = (field, value) => {
    setQuizData(prev => {
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
  
  const handleSelfieChange = (url) => {
    setQuizData(prev => ({
      ...prev,
      selfieUrl: url
    }));
  };
  
  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => {
    setStep(prev => Math.max(0, prev - 1));
  };
  
  const handleSubmitQuiz = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save your profile",
        variant: "destructive"
      });
      return false;
    }

    try {
      // Prepare profile data
      const profileData = {
        id: user.id,
        skin_tone: quizData.skinTone,
        undertone: quizData.undertone,
        style_preferences: quizData.stylePreferences,
        occasion_preferences: quizData.occasionPreferences,
        color_preferences: quizData.colorPreferences,
        selfie_url: quizData.selfieUrl
      };

      // Save to Supabase
      const { data, error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'id' })
        .select();

      if (error) {
        toast({
          title: "Profile save failed",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Profile saved",
        description: "Your style profile has been created!",
      });

      // Call the onComplete callback with the saved data
      if (onComplete && data && data.length > 0) {
        onComplete(data[0]);
      }
      
      return true;
    } catch (error) {
      console.error('Profile save error:', error);
      toast({
        title: "Profile error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    }
  };
  
  return {
    step,
    quizData,
    handleSingleSelect,
    handleMultiSelect,
    handleSelfieChange,
    handleNextStep,
    handlePrevStep,
    handleSubmitQuiz
  };
};
