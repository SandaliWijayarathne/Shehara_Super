import React, { useState, useEffect } from 'react';
import './Collections.css';
import collections from '../Assets/collections';
import Item from '../Item/Item';
import FlashDeals from '../FlashDeals/FlashDeals';
import Banner1 from '../Assets/banner_1.png';
import Banner2 from '../Assets/banner_2.png';
import Banner3 from '../Assets/banner_3.png';
import Banner4 from '../Assets/banner_4.png';
import Banner5 from '../Assets/banner_5.png';
import Banner6 from '../Assets/banner_6.png';
import Banner7 from '../Assets/banner_7.png';
import Banner8 from '../Assets/banner_8.png';

const URL = "13.51.121.50";

const NewCollections = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bannerImages, setBannerImages] = useState([]);
  const [direction, setDirection] = useState('forward');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window width

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`http://${URL}:4000/allbanners`);
        const data = await response.json();
        console.log(data);
        const updatedData = data.map((images) => {
          if (images.url) {
            images.url = `http://${URL}:4000${images.url}`;
          }
          return images;
        });
        console.log(updatedData);
        setBannerImages(updatedData);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (bannerImages.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (direction === 'forward') {
          if (prevIndex === bannerImages.length - 1) {
            setDirection('backward');
            return prevIndex - 1;
          }
          return prevIndex + 1;
        } else {
          if (prevIndex === 0) {
            setDirection('forward');
            return prevIndex + 1;
          }
          return prevIndex - 1;
        }
      });
    }, 15000);

    return () => clearInterval(intervalId);
  }, [bannerImages, direction]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1));
  };

  // Determine which banners to show based on window width
  const bannersToShow = windowWidth <= 480 
    ? [Banner1, Banner2, Banner3, Banner4] // Banners for 480px and below
    : windowWidth <= 768 
      ? [Banner5, Banner6, Banner7, Banner8] // Banners for 481px to 768px
      : bannerImages; // Banners for larger screens

  return (
    <div className="new-collections">
      <div className="banner-container">
        <div className="banner-slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {bannersToShow.map((banner, index) => (
            <img
              key={index}
              src={typeof banner === 'string' ? banner : banner.url}
              alt={`Banner ${index}`}
              className="banner-image"
            />
          ))}
        </div>
        <button className="nav-button prev" onClick={prevSlide}>‹</button>
        <button className="nav-button next" onClick={nextSlide}>›</button>
        <div className="dots-container">
          {bannersToShow.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>

      <div className="flashdeals"><FlashDeals /></div>

      {/* New Category Title Section */}
      <div className="category-title">
        <hr className="line" />
        <h2>Shop By Category </h2>
        <hr className="line" />
      </div>
      <div className="collections-container">
        <div className="collections">
          {collections.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewCollections;
