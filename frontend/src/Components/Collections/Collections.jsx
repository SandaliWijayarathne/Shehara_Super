import React, { useState, useEffect } from 'react';
import './Collections.css';
import collections from '../Assets/collections';
import Item from '../Item/Item';
import bannerImages from '../Assets/banner_images'

const NewCollections = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000); 

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="new-collections">
      <div className="banner-container">
        <div className="banner-slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {bannerImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Banner ${index}`}
              className="banner-image"
            />
          ))}
        </div>
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
