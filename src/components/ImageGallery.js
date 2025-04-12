import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const slides = [
    {
      image: '/images/gallery1.jpg',
      title: 'Track Your Expenses',
      subtitle: 'Monitor your spending habits with ease',
      description: 'Get detailed insights into your financial patterns'
    },
    {
      image: '/images/gallery2.jpg',
      title: 'Smart Budgeting',
      subtitle: 'Plan your finances effectively',
      description: 'Set budgets and stay on track with your financial goals'
    },
    {
      image: '/images/gallery3.jpg',
      title: 'Real-time Analytics',
      subtitle: 'Make informed financial decisions',
      description: 'Visualize your spending patterns with interactive charts'
    },
    {
      image: '/images/gallery4.jpg',
      title: 'Secure & Private',
      subtitle: 'Your data is always protected',
      description: 'Bank-level security for your financial information'
    }
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="image-gallery">
      <div className="gallery-header">
        <h2>Our Features</h2>
        <p>Discover how we can help you manage your finances better</p>
      </div>
      
      <div className="gallery-container">
        <button className="gallery-nav prev" onClick={prevSlide}>
          <FaChevronLeft />
        </button>
        
        <div className="gallery-slides">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`gallery-slide ${index === currentIndex ? 'active' : ''}`}
              style={{
                backgroundImage: `url(${slide.image})`,
                transform: `translateX(${(index - currentIndex) * 100}%)`
              }}
            >
              <div className="slide-overlay">
                <div className="slide-content">
                  <h3 className="slide-title">{slide.title}</h3>
                  <h4 className="slide-subtitle">{slide.subtitle}</h4>
                  <p className="slide-description">{slide.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="gallery-nav next" onClick={nextSlide}>
          <FaChevronRight />
        </button>
      </div>
      
      <div className="gallery-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery; 