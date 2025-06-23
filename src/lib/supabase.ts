import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Project {
  id: string;
  title: string;
  project_lead: string;
  year: number;
  category: string;
  abstract: string;
  description?: string;
  technologies: string[];
  github_url?: string;
  demo_url?: string;
  linkedin_url?: string;
  image_url?: string;
  likes_count: number;
  average_rating: number;
  rating_count: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectRating {
  id: string;
  project_id: string;
  user_session: string;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectFilters {
  category?: string;
  year?: number;
  search?: string;
  limit?: number;
  offset?: number;
}

// Generate a unique session ID for anonymous users
export const getUserSession = (): string => {
  let session = localStorage.getItem('projectvault-session');
  if (!session) {
    session = 'anon_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    localStorage.setItem('projectvault-session', session);
  }
  return session;
};