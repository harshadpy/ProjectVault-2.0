import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface ImageCarouselProps {
  isDark: boolean;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ isDark }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample project showcase images from Pexels
  const images = [
    {
      url: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Advanced Robotics Projects',
      description: 'Cutting-edge robotics and AI implementations'
    },
    {
      url: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'IoT & Smart Systems',
      description: 'Internet of Things and automation solutions'
    },
    {
      url: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Data Science & Analytics',
      description: 'Machine learning and data analysis projects'
    },
    {
      url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Embedded Systems',
      description: 'Hardware and software integration projects'
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-2xl ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      {/* Main Image Display */}
      <div className="relative h-96 md:h-[500px]">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].title}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            {images[currentIndex].title}
          </h3>
          <p className="text-gray-200 text-lg">
            {images[currentIndex].description}
          </p>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all duration-200 backdrop-blur-sm"
          title="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all duration-200 backdrop-blur-sm"
          title="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Auto-play Toggle */}
        <button
          onClick={toggleAutoPlay}
          className="absolute top-4 right-4 p-3 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all duration-200 backdrop-blur-sm"
          title={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isAutoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
      </div>

      {/* Thumbnail Navigation */}
      <div className={`flex space-x-2 p-4 ${
        isDark ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative overflow-hidden rounded-lg transition-all duration-200 ${
              index === currentIndex
                ? 'ring-2 ring-blue-500 scale-110'
                : 'hover:scale-105 opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-16 h-12 md:w-20 md:h-16 object-cover"
            />
          </button>
        ))}
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center space-x-2 py-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-blue-500 w-8'
                : isDark
                  ? 'bg-gray-600 hover:bg-gray-500'
                  : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;