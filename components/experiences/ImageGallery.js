"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function ImageGallery({ images, title }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const displayImages = images.slice(0, 5);
  const totalImages = images.length;

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          closeModal();
        } else if (e.key === 'ArrowLeft') {
          prevImage();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isModalOpen, currentImageIndex]);

  const openModal = (index = 0) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    if (totalImages > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }
  };

  const prevImage = () => {
    if (totalImages > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mb-6">
        {/* Mobile Layout - Single image with overlay */}
        <div className="block md:hidden">
          <div
            className="relative h-[300px] cursor-pointer overflow-hidden rounded-xl"
            onClick={() => openModal(0)}
          >
            <Image
              src={displayImages[0]}
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute bottom-4 right-4">
              <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold shadow-lg">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                See all {totalImages} photos
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Grid */}
        <div className="hidden md:block">
          <div className="relative grid grid-cols-4 gap-2 overflow-hidden rounded-xl">
            {/* Large main image - takes up 2x2 grid */}
            <div
              className="relative col-span-2 row-span-2 h-[500px] cursor-pointer overflow-hidden"
              onClick={() => openModal(0)}
            >
              <Image
                src={displayImages[0]}
                alt={title}
                fill
                className="object-cover transition hover:brightness-90"
                sizes="50vw"
                priority
              />
            </div>

            {/* Four smaller images on the right */}
            {displayImages.slice(1, 5).map((image, idx) => (
              <div
                key={idx}
                className="relative col-span-1 h-[246px] cursor-pointer overflow-hidden"
                onClick={() => openModal(idx + 1)}
              >
                <Image
                  src={image}
                  alt={`${title} ${idx + 2}`}
                  fill
                  className="object-cover transition hover:brightness-90"
                  sizes="25vw"
                />
                {/* Show "See more" overlay on last image if more than 5 */}
                {idx === 3 && totalImages > 5 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white transition hover:bg-black/50">
                    <span className="text-lg font-semibold">+{totalImages - 5} more</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* View all photos button - desktop */}
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => openModal(0)}
              className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-semibold text-black transition hover:bg-gray-50"
            >
              View all {totalImages} photos
            </button>
            <span className="text-sm text-gray-600">
              {totalImages} high-quality images
            </span>
          </div>
        </div>
      </div>

      {/* Full-screen modal/lightbox */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Close gallery"
          >
            <X size={24} />
          </button>

          {/* Previous button */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Next button */}
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>

          {/* Main image */}
          <div className="relative h-[90vh] w-full">
            <Image
              src={images[currentImageIndex]}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm text-white">
            {currentImageIndex + 1} / {totalImages}
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-16 left-0 right-0 overflow-x-auto">
            <div className="flex justify-center gap-2 px-4">
              {images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded border-2 transition ${
                    idx === currentImageIndex
                      ? "border-white"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
