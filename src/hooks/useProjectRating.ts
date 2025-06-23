import { useState, useEffect } from 'react';
import { projectsService } from '../services/projectsService';

export const useProjectRating = (projectId: string) => {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        setLoading(true);
        const rating = await projectsService.getUserRating(projectId);
        setUserRating(rating);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch rating');
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchUserRating();
    }
  }, [projectId]);

  const rateProject = async (rating: number) => {
    try {
      await projectsService.rateProject(projectId, rating);
      setUserRating(rating);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to rate project');
      throw err;
    }
  };

  return {
    userRating,
    loading,
    error,
    rateProject
  };
};