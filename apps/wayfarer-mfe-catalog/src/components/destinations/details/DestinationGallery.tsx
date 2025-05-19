'use client';

import { useState } from 'react';
import {
  FaChevronLeft, FaChevronRight, FaTimes
} from "react-icons/fa";

interface DestinationGalleryProps {
  images: string[];
}

export default function DestinationGallery({ images }: DestinationGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.slice(0, 8).map((image, index) => (
          <div 
            key={index} 
            className="relative h-40 overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openLightbox(index)}
          >
            <img 
              // src={image} 
              src={`https://picsum.photos/500?random=${index + 1}`}
              alt={`Gallery image ${index + 1}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {images.length > 8 && (
        <div className="mt-4 text-center">
          <button 
            className="text-blue-600 hover:text-blue-800 font-medium"
            onClick={() => openLightbox(8)}
          >
            View all {images.length} photos
          </button>
        </div>
      )}
      
      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={closeLightbox}
          >
            <FaTimes size={24} />
          </button>
          
          <button 
            className="absolute left-4 text-white hover:text-gray-300"
            onClick={goToPrevious}
          >
            <FaChevronLeft size={36} />
          </button>
          
          <img 
            // src={images[currentImageIndex]} 
            src={`https://picsum.photos/500?random=${currentImageIndex + 1}`}
            alt={`Gallery image ${currentImageIndex + 1}`}
            className="max-h-screen max-w-screen-lg object-contain"
          />
          
          <button 
            className="absolute right-4 text-white hover:text-gray-300"
            onClick={goToNext}
          >
            <FaChevronRight size={36} />
          </button>
          
          <div className="absolute bottom-4 text-white">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
}
