import { supabase, Project, ProjectFilters, getUserSession } from '../lib/supabase'

export const projectsService = {
  // Fetch all projects with optional filters
  async getAllProjects(filters: ProjectFilters = {}): Promise<Project[]> {
    try {
      let query = supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      // Apply filters if provided
      if (filters.category) {
        query = query.ilike('category', `%${filters.category}%`)
      }
      
      if (filters.year) {
        query = query.eq('year', filters.year)
      }
      
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,abstract.ilike.%${filters.search}%,project_lead.ilike.%${filters.search}%`)
      }

      if (filters.limit) {
        query = query.limit(filters.limit)
      }

      if (filters.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching projects:', error)
        throw new Error(`Failed to fetch projects: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Service error:', error)
      throw error
    }
  },

  // Get single project by ID
  async getProjectById(id: string): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') {
          return null // Project not found
        }
        throw new Error(`Failed to fetch project: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error fetching project by ID:', error)
      throw error
    }
  },

  // Search projects by title, abstract, or project lead
  async searchProjects(searchTerm: string): Promise<Project[]> {
    try {
      if (!searchTerm.trim()) {
        return []
      }

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .or(`title.ilike.%${searchTerm}%,abstract.ilike.%${searchTerm}%,project_lead.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false })
      
      if (error) {
        throw new Error(`Search failed: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error searching projects:', error)
      throw error
    }
  },

  // Get projects by category
  async getProjectsByCategory(category: string): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .ilike('category', `%${category}%`)
        .order('created_at', { ascending: false })
      
      if (error) {
        throw new Error(`Failed to fetch projects by category: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error fetching projects by category:', error)
      throw error
    }
  },

  // Get projects by year
  async getProjectsByYear(year: number): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('year', year)
        .order('created_at', { ascending: false })
      
      if (error) {
        throw new Error(`Failed to fetch projects by year: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error fetching projects by year:', error)
      throw error
    }
  },

  // Update project likes count
  async updateLikesCount(projectId: string, increment: boolean = true): Promise<Project | null> {
    try {
      // First get current likes count
      const { data: project } = await supabase
        .from('projects')
        .select('likes_count')
        .eq('id', projectId)
        .single()

      if (!project) {
        throw new Error('Project not found')
      }

      const newCount = increment 
        ? (project.likes_count || 0) + 1 
        : Math.max((project.likes_count || 0) - 1, 0)

      const { data, error } = await supabase
        .from('projects')
        .update({ 
          likes_count: newCount,
          updated_at: new Date().toISOString()
        })
        .eq('id', projectId)
        .select()
        .single()
      
      if (error) {
        throw new Error(`Failed to update likes: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error updating likes count:', error)
      throw error
    }
  },

  // Add or update a project rating
  async rateProject(projectId: string, rating: number): Promise<void> {
    try {
      if (rating < 1 || rating > 5) {
        throw new Error('Rating must be between 1 and 5 stars')
      }

      const userSession = getUserSession()

      const { error } = await supabase.rpc('upsert_project_rating', {
        p_project_id: projectId,
        p_user_session: userSession,
        p_rating: rating
      })
      
      if (error) {
        throw new Error(`Failed to rate project: ${error.message}`)
      }
    } catch (error) {
      console.error('Error rating project:', error)
      throw error
    }
  },

  // Get user's rating for a project
  async getUserRating(projectId: string): Promise<number | null> {
    try {
      const userSession = getUserSession()

      const { data, error } = await supabase
        .from('project_ratings')
        .select('rating')
        .eq('project_id', projectId)
        .eq('user_session', userSession)
        .maybeSingle()
      
      if (error) {
        throw new Error(`Failed to get user rating: ${error.message}`)
      }

      return data?.rating || null
    } catch (error) {
      console.error('Error getting user rating:', error)
      return null
    }
  },

  // Get unique categories
  async getCategories(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('category')
        .order('category')
      
      if (error) {
        throw new Error(`Failed to fetch categories: ${error.message}`)
      }

      const categories = [...new Set(data?.map(item => item.category) || [])]
      return categories.sort()
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  },

  // Get unique years
  async getYears(): Promise<number[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('year')
        .order('year', { ascending: false })
      
      if (error) {
        throw new Error(`Failed to fetch years: ${error.message}`)
      }

      const years = [...new Set(data?.map(item => item.year) || [])]
      return years.sort((a, b) => b - a)
    } catch (error) {
      console.error('Error fetching years:', error)
      throw error
    }
  },

  // Get trending projects (most liked recently)
  async getTrendingProjects(limit: number = 10): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('likes_count', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(limit)
      
      if (error) {
        throw new Error(`Failed to fetch trending projects: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error fetching trending projects:', error)
      throw error
    }
  },

  // Get recent projects
  async getRecentProjects(limit: number = 10): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)
      
      if (error) {
        throw new Error(`Failed to fetch recent projects: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error fetching recent projects:', error)
      throw error
    }
  }
}