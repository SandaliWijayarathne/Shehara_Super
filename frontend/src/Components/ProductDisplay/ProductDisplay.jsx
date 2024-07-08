import React, { useContext } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt={product.name} />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-price">Rs. {product.Price}</div>
                <div className="productdisplay-right-weight">
                    <select>
                        <option value="500g">500 g</option>
                        <option value="1kg">1 kg</option>
                        <option value="2kg">2 kg</option>
                    </select>
                </div>
                <button onClick={() => { addToCart(product.id) }}>Add to Cart</button>
                <div className="productdisplay-right-description">
                    {product.description}
                </div>
            </div>
        </div>
    );
}

export default ProductDisplay;
