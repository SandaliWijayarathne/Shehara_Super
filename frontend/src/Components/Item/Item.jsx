import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';

const Item = ({ id, name, image }) => {
  return (
    <div className="item">
      <Link to={`/category/${name}`}>
        <img src={image} alt={name} />
      </Link>
      <p>{name}</p>
    </div>
  );
};

export default Item;
