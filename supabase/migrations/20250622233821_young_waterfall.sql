/*
  # Add updated_at column to project_ratings table

  1. Schema Changes
    - Add `updated_at` column to `project_ratings` table
    - Set default value to `now()`
    - Add trigger to automatically update the timestamp on row updates

  2. Security
    - No changes to existing RLS policies
    - Column inherits existing table permissions

  3. Notes
    - This resolves the error where the upsert_project_rating function expects an updated_at column
    - Existing data will get the current timestamp as the initial value
*/

-- Add updated_at column to project_ratings table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'project_ratings' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE project_ratings ADD COLUMN updated_at timestamptz DEFAULT now();
  END IF;
END $$;

-- Create or replace function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at on row updates
DROP TRIGGER IF EXISTS update_project_ratings_updated_at ON project_ratings;
CREATE TRIGGER update_project_ratings_updated_at
    BEFORE UPDATE ON project_ratings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();