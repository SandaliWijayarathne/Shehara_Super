import React from 'react';
import './Breadcrum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';
import { Link } from 'react-router-dom';

const Breadcrum = (props) => {
    const { product } = props;
    return (
        <div className='breadcrum'>
            <Link to="/">HOME</Link> <img src={arrow_icon} alt="Arrow" /> 
            <Link to="/shop">SHOP</Link> <img src={arrow_icon} alt="Arrow" /> 
            <Link to={`/category/${product.category}`}>{product.category}</Link> <img src={arrow_icon} alt="Arrow" /> 
            <span>{product.name}</span>
        </div>
    )
}

export default Breadcrum;
