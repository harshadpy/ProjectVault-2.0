import { useState, useEffect } from 'react'
import { projectsService } from '../services/projectsService'
import { Project, ProjectFilters } from '../lib/supabase'

export const useProjects = (filters: ProjectFilters = {}) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await projectsService.getAllProjects(filters)
      setProjects(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch projects'
      setError(errorMessage)
      console.error('Error fetching projects:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [JSON.stringify(filters)])

  return { 
    projects, 
    loading, 
    error, 
    refetch: fetchProjects 
  }
}

export const useProjectSearch = () => {
  const [searchResults, setSearchResults] = useState<Project[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)

  const searchProjects = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults([])
      return
    }

    try {
      setIsSearching(true)
      setSearchError(null)
      const results = await projectsService.searchProjects(searchTerm)
      setSearchResults(results)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed'
      setSearchError(errorMessage)
      console.error('Search error:', err)
    } finally {
      setIsSearching(false)
    }
  }

  const clearSearch = () => {
    setSearchResults([])
    setSearchError(null)
  }

  return { 
    searchResults, 
    isSearching, 
    searchError, 
    searchProjects,
    clearSearch
  }
}

export const useProjectCategories = () => {
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const data = await projectsService.getCategories()
        setCategories(data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch categories'
        setError(errorMessage)
        console.error('Error fetching categories:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}

export const useProjectYears = () => {
  const [years, setYears] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchYears = async () => {
      try {
        setLoading(true)
        const data = await projectsService.getYears()
        setYears(data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch years'
        setError(errorMessage)
        console.error('Error fetching years:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchYears()
  }, [])

  return { years, loading, error }
}