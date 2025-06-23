import React, { useState, useMemo } from 'react';
import { useProjects, useProjectCategories, useProjectYears } from './hooks/useProjects';
import { projectsService } from './services/projectsService';
import { ProjectFilters } from './lib/supabase';
import EnhancedHeader from './components/EnhancedHeader';
import HeroSection from './components/HeroSection';
import EnhancedSearchFilter from './components/EnhancedSearchFilter';
import EnhancedProjectCard from './components/EnhancedProjectCard';
import ImageCarousel from './components/ImageCarousel';
import EmptyState from './components/EmptyState';
import EnhancedToast from './components/EnhancedToast';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import DatabaseStatus from './components/DatabaseStatus';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  // State management
  const [isDark, setIsDark] = useLocalStorage('projectvault-dark-mode', false);
  const [activeTab, setActiveTab] = useState<'all' | 'liked'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [likedProjects, setLikedProjects] = useLocalStorage<string[]>('projectvault-liked', []);
  const [isLoading, setIsLoading] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState<{ 
    message: string; 
    type: 'success' | 'error' | 'like' | 'unlike' 
  } | null>(null);

  // Database filters
  const filters: ProjectFilters = useMemo(() => {
    const f: ProjectFilters = {};
    
    if (searchTerm) f.search = searchTerm;
    if (selectedYear) f.year = parseInt(selectedYear);
    if (selectedCategory) f.category = selectedCategory;
    
    return f;
  }, [searchTerm, selectedYear, selectedCategory]);

  // Fetch data from Supabase
  const { projects: allProjects, loading: projectsLoading, error: projectsError, refetch } = useProjects(filters);
  const { categories, loading: categoriesLoading } = useProjectCategories();
  const { years, loading: yearsLoading } = useProjectYears();

  // Filter projects based on active tab
  const filteredProjects = useMemo(() => {
    if (activeTab === 'liked') {
      return allProjects.filter(project => likedProjects.includes(project.id));
    }
    return allProjects;
  }, [allProjects, activeTab, likedProjects]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  // Toggle like status with database update
  const toggleLike = async (projectId: string) => {
    const isCurrentlyLiked = likedProjects.includes(projectId);
    const project = allProjects.find(p => p.id === projectId);
    
    // Optimistic update
    if (isCurrentlyLiked) {
      setLikedProjects(likedProjects.filter(id => id !== projectId));
    } else {
      setLikedProjects([...likedProjects, projectId]);
    }

    try {
      // Update database
      await projectsService.updateLikesCount(projectId, !isCurrentlyLiked);
      
      // Show success toast
      setToast({ 
        message: isCurrentlyLiked 
          ? `Removed "${project?.title}" from liked projects`
          : `Added "${project?.title}" to liked projects`, 
        type: isCurrentlyLiked ? 'unlike' : 'like'
      });

      // Refresh project data to get updated likes count
      refetch();
    } catch (error) {
      // Revert optimistic update on error
      if (isCurrentlyLiked) {
        setLikedProjects([...likedProjects, projectId]);
      } else {
        setLikedProjects(likedProjects.filter(id => id !== projectId));
      }
      
      setToast({ 
        message: 'Failed to update project. Please try again.', 
        type: 'error' 
      });
      console.error('Error updating likes:', error);
    }
  };

  // Handle search
  const handleSearch = () => {
    if (searchTerm.trim()) {
      setIsLoading(true);
      // Simulate search delay for better UX
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }
  };

  // Close toast
  const closeToast = () => {
    setToast(null);
  };

  // Handle project updates (for rating changes)
  const handleProjectUpdate = () => {
    refetch();
  };

  // Show loading state
  if (projectsLoading && !allProjects.length) {
    return (
      <div className={`min-h-screen ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}>
        <LoadingSpinner isDark={isDark} message="Loading projects from database..." />
      </div>
    );
  }

  // Show error state
  if (projectsError) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className={`max-w-md w-full text-center p-8 rounded-2xl border ${
          isDark 
            ? 'bg-gray-800 border-gray-700 text-white' 
            : 'bg-white border-gray-200 text-gray-900'
        }`}>
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
            isDark ? 'bg-red-900/20' : 'bg-red-100'
          }`}>
            <DatabaseStatus isDark={isDark} />
          </div>
          
          <h2 className="text-xl font-bold mb-2">Database Connection Error</h2>
          <p className={`text-sm mb-6 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {projectsError}
          </p>
          
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary isDark={isDark}>
      <div className={`min-h-screen transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}>
        {/* Enhanced Header with Database Status */}
        <EnhancedHeader
          isDark={isDark}
          toggleDarkMode={toggleDarkMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          likedCount={likedProjects.length}
        />

        {/* Hero Section */}
        <HeroSection
          isDark={isDark}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Database Status Indicator */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <DatabaseStatus isDark={isDark} />
              <span className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {allProjects.length} projects loaded
              </span>
            </div>
          </div>

          {/* Enhanced Search and Filter Section */}
          <section className="mb-12">
            <EnhancedSearchFilter
              isDark={isDark}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              years={years.map(String)}
              categories={categories}
              resultsCount={filteredProjects.length}
            />
          </section>

          {/* Projects Grid */}
          <section className="mb-16">
            {isLoading || projectsLoading ? (
              <LoadingSpinner isDark={isDark} message="Searching projects..." />
            ) : filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <EnhancedProjectCard
                      project={{
                        id: project.id,
                        title: project.title,
                        projectLead: project.project_lead,
                        year: project.year.toString(),
                        abstract: project.abstract,
                        category: project.category,
                        linkedin: project.linkedin_url || '#',
                        likes_count: project.likes_count,
                        average_rating: project.average_rating,
                        rating_count: project.rating_count
                      }}
                      isDark={isDark}
                      isLiked={likedProjects.includes(project.id)}
                      onToggleLike={toggleLike}
                      onProjectUpdate={handleProjectUpdate}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState 
                isDark={isDark} 
                type={activeTab === 'liked' ? 'liked' : 'search'}
                searchTerm={searchTerm}
              />
            )}
          </section>

          {/* Image Carousel Section */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Project Showcase Gallery
                </span>
              </h2>
              <p className={`text-lg max-w-2xl mx-auto ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Discover the innovation and creativity behind our academic projects through this visual journey
              </p>
            </div>
            
            <ImageCarousel isDark={isDark} />
          </section>
        </main>

        {/* Enhanced Footer */}
        <Footer isDark={isDark} />

        {/* Enhanced Toast Notification */}
        {toast && (
          <EnhancedToast
            message={toast.message}
            type={toast.type}
            isVisible={!!toast}
            onClose={closeToast}
            isDark={isDark}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;