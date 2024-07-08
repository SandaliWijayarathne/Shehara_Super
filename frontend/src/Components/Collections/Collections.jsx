import React from 'react';
import './Collections.css';
import collections from '../Assets/collections';
import Item from '../Item/Item';
import bannerImage from '../Assets/Desktop - 1.png';

const NewCollections = () => {
  return (
    <div className="new-collections">
      <img src={bannerImage} alt="Banner" className="banner-image" />
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
