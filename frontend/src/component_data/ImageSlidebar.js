import { useEffect, useState } from "react";

export function ImageCarousel({ images, autoPlayInterval = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the previous image
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Function to go to the next image
  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Function to go to a specific image by index
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Auto-play effect
  useEffect(() => {
    if (autoPlayInterval > 0) {
      const interval = setInterval(() => {
        goToNext();
      }, autoPlayInterval);
      return () => clearInterval(interval); // Clean up the interval on component unmount
    }
  }, [currentIndex, autoPlayInterval, images.length]); // Re-run effect if currentIndex or autoPlayInterval changes

  return (
    <div className="flex justify-center relative w-full overflow-hidden rounded-b-xl items-center">
      {/* Carousel Image */}
      <div className="relative md:w-1/3 aspect-square flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt="refresh"
          className="w-[500px] aspect-square h-full object-cover transition-opacity duration-500 ease-in-out rounded-xl"
          // Fallback for image loading errors
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = `https://placehold.co/800x400/CCCCCC/666666?text=Image+Load+Error`;
          }}
        />
      </div>
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        aria-label="Previous image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        aria-label="Next image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicators (Dots) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentIndex === slideIndex
                ? "bg-white"
                : "bg-gray-400 bg-opacity-75"
            } hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
            aria-label={`Go to slide ${slideIndex + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
