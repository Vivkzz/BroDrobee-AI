export type Profile = {
  id: string;
  skin_tone: string | null;
  undertone: string | null;
  style_preferences: string[] | null;
  occasion_preferences: string[] | null;
  color_preferences: string[] | null;
  selfie_url: string | null;
  gender: string | null;
  occupation: string | null;
  created_at: string;
  updated_at: string;
};

export type WardrobeItem = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  color: string | null;
  category: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};
