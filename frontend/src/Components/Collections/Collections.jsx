import React, { useState, useEffect } from 'react';
import './Collections.css';
import collections from '../Assets/collections';
import Item from '../Item/Item';
import FlashDeals from '../FlashDeals/FlashDeals';

const URL ="localhost";

const NewCollections = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bannerImages, setBannerImages] = useState([]);
  const [direction, setDirection] = useState('forward');

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

  return (
    <div className="new-collections">
      <div className="banner-container">
        <div className="banner-slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {bannerImages.map((banner) => (
            <img
              key={banner._id}
              src={banner.url}
              alt={`Banner ${banner._id}`}
              className="banner-image"
            />
          ))}
        </div>
        <button className="nav-button prev" onClick={prevSlide}>‹</button>
        <button className="nav-button next" onClick={nextSlide}>›</button>
        <div className="dots-container">
          {bannerImages.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>
      <div className='flashdeals'><FlashDeals/></div>
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
