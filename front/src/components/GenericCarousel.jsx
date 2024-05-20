import React, { useState } from 'react';

const GenericCarousel = ({ items, onItemClick, renderItem }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = items.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  const prevIndex = currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
  const nextIndex = (currentIndex + 1) % totalItems;

  return (
    <div className="carousel-container">
      <button onClick={handlePrev}>&lt;</button>
      <div className="carousel-preview" onClick={() => onItemClick(items[prevIndex])}>
        {renderItem(items[prevIndex])}
      </div>
      <div className="carousel-item" onClick={() => onItemClick(items[currentIndex])}>
        {renderItem(items[currentIndex])}
      </div>
      <div className="carousel-preview" onClick={() => onItemClick(items[nextIndex])}>
        {renderItem(items[nextIndex])}
      </div>
      <button onClick={handleNext}>&gt;</button>
    </div>
  );
};

export default GenericCarousel;
