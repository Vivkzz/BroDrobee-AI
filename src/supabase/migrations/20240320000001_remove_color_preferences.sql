-- Remove color_preferences column from profiles table
ALTER TABLE profiles
DROP COLUMN IF EXISTS color_preferences; 