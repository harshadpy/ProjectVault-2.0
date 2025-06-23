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
    - Remove views_count from projects table
    - Add average_rating column to projects table
    - Add rating_count column to projects table
*/

CREATE TABLE IF NOT EXISTS project_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_session text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  UNIQUE(project_id, user_session)
);

-- Enable RLS on ratings table
ALTER TABLE project_ratings ENABLE ROW LEVEL SECURITY;

-- Allow public to read and insert ratings
CREATE POLICY "Public can view all ratings" 
  ON project_ratings FOR SELECT 
  USING (true);

CREATE POLICY "Public can insert ratings" 
  ON project_ratings FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can update their own ratings" 
  ON project_ratings FOR UPDATE 
  USING (true) 
  WITH CHECK (true);

-- Add new columns to projects table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'average_rating'
  ) THEN
    ALTER TABLE projects ADD COLUMN average_rating decimal(3,2) DEFAULT 0;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'rating_count'
  ) THEN
    ALTER TABLE projects ADD COLUMN rating_count integer DEFAULT 0;
  END IF;
END $$;

-- Remove views_count column if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'views_count'
  ) THEN
    ALTER TABLE projects DROP COLUMN views_count;
  END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_project_ratings_project_id ON project_ratings(project_id);
CREATE INDEX IF NOT EXISTS idx_project_ratings_session ON project_ratings(user_session);

-- Function to update project rating statistics
CREATE OR REPLACE FUNCTION update_project_rating_stats(project_id uuid)
RETURNS void AS $$
DECLARE
  avg_rating decimal(3,2);
  total_ratings integer;
BEGIN
  SELECT 
    COALESCE(AVG(rating), 0)::decimal(3,2),
    COUNT(*)
  INTO avg_rating, total_ratings
  FROM project_ratings 
  WHERE project_ratings.project_id = update_project_rating_stats.project_id;
  
  UPDATE projects 
  SET 
    average_rating = avg_rating,
    rating_count = total_ratings,
    updated_at = now()
  WHERE id = update_project_rating_stats.project_id;
END;
$$ LANGUAGE plpgsql;

-- Function to add or update a rating
CREATE OR REPLACE FUNCTION upsert_project_rating(
  p_project_id uuid,
  p_user_session text,
  p_rating integer
)
RETURNS void AS $$
BEGIN
  INSERT INTO project_ratings (project_id, user_session, rating)
  VALUES (p_project_id, p_user_session, p_rating)
  ON CONFLICT (project_id, user_session)
  DO UPDATE SET 
    rating = EXCLUDED.rating,
    created_at = now();
    
  -- Update project statistics
  PERFORM update_project_rating_stats(p_project_id);
END;
$$ LANGUAGE plpgsql;

-- Remove the old increment_views function if it exists
DROP FUNCTION IF EXISTS increment_views(uuid);

-- Update existing projects with initial rating stats
DO $$
DECLARE
  project_record RECORD;
BEGIN
  FOR project_record IN SELECT id FROM projects LOOP
    PERFORM update_project_rating_stats(project_record.id);
  END LOOP;
END $$;