/*
  # Add ratings system to projects

  1. New Tables
    - `project_ratings`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key to projects)
      - `user_session` (text, to track anonymous users)
      - `rating` (integer, 1-5 stars)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `project_ratings` table
    - Add policies for public read/write access
    - Add function to calculate average ratings

  3. Changes
    - Add average_rating column to projects table
    - Add rating_count column to projects table
*/

-- Create the project_ratings table
CREATE TABLE IF NOT EXISTS public.project_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL,
  user_session text NOT NULL,
  rating integer NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT project_ratings_project_id_fkey 
    FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE,
  CONSTRAINT project_ratings_rating_check 
    CHECK (rating >= 1 AND rating <= 5),
  CONSTRAINT project_ratings_project_id_user_session_key 
    UNIQUE (project_id, user_session)
);

-- Enable Row Level Security
ALTER TABLE public.project_ratings ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_project_ratings_project_id 
  ON public.project_ratings USING btree (project_id);

CREATE INDEX IF NOT EXISTS idx_project_ratings_session 
  ON public.project_ratings USING btree (user_session);

-- Drop existing policies if they exist, then create new ones
DROP POLICY IF EXISTS "Public can view all ratings" ON public.project_ratings;
DROP POLICY IF EXISTS "Public can insert ratings" ON public.project_ratings;
DROP POLICY IF EXISTS "Users can update their own ratings" ON public.project_ratings;

-- Create RLS policies
CREATE POLICY "Public can view all ratings"
  ON public.project_ratings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can insert ratings"
  ON public.project_ratings
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can update their own ratings"
  ON public.project_ratings
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Add new columns to projects table if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'average_rating'
  ) THEN
    ALTER TABLE public.projects ADD COLUMN average_rating numeric(3,2) DEFAULT 0;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'rating_count'
  ) THEN
    ALTER TABLE public.projects ADD COLUMN rating_count integer DEFAULT 0;
  END IF;
END $$;

-- Function to update project average rating and count
CREATE OR REPLACE FUNCTION public.update_project_avg_rating()
RETURNS TRIGGER AS $$
DECLARE
  target_project_id uuid;
BEGIN
  -- Determine which project to update
  IF TG_OP = 'DELETE' THEN
    target_project_id := OLD.project_id;
  ELSE
    target_project_id := NEW.project_id;
  END IF;

  -- Update the project's average rating and rating count
  UPDATE public.projects
  SET
    average_rating = (
      SELECT ROUND(AVG(rating)::numeric, 2)
      FROM public.project_ratings 
      WHERE project_id = target_project_id
    ),
    rating_count = (
      SELECT COUNT(*)
      FROM public.project_ratings 
      WHERE project_id = target_project_id
    ),
    updated_at = now()
  WHERE id = target_project_id;

  -- Return appropriate record
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers to automatically update project statistics
DROP TRIGGER IF EXISTS update_project_avg_rating_on_insert ON public.project_ratings;
CREATE TRIGGER update_project_avg_rating_on_insert
  AFTER INSERT ON public.project_ratings
  FOR EACH ROW EXECUTE FUNCTION public.update_project_avg_rating();

DROP TRIGGER IF EXISTS update_project_avg_rating_on_update ON public.project_ratings;
CREATE TRIGGER update_project_avg_rating_on_update
  AFTER UPDATE OF rating ON public.project_ratings
  FOR EACH ROW EXECUTE FUNCTION public.update_project_avg_rating();

DROP TRIGGER IF EXISTS update_project_avg_rating_on_delete ON public.project_ratings;
CREATE TRIGGER update_project_avg_rating_on_delete
  AFTER DELETE ON public.project_ratings
  FOR EACH ROW EXECUTE FUNCTION public.update_project_avg_rating();

-- Function to upsert (insert or update) project ratings
CREATE OR REPLACE FUNCTION public.upsert_project_rating(
  p_project_id uuid,
  p_user_session text,
  p_rating integer
)
RETURNS void AS $$
BEGIN
  -- Validate rating range
  IF p_rating < 1 OR p_rating > 5 THEN
    RAISE EXCEPTION 'Rating must be between 1 and 5';
  END IF;

  -- Insert or update the rating
  INSERT INTO public.project_ratings (project_id, user_session, rating, created_at, updated_at)
  VALUES (p_project_id, p_user_session, p_rating, now(), now())
  ON CONFLICT (project_id, user_session) 
  DO UPDATE SET 
    rating = p_rating,
    updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;