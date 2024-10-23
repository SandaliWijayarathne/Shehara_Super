import React, { useContext } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../../Context/ShopContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    const handleAddToCart = (productId) => {
        addToCart(productId);
        toast.success(`${product.name} has been added to your cart!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: 'toastify-custom',
        });
    }

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt={product.name} />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-price">Rs. {product.price}.00</div>
                <div className="productdisplay-right-description">
                    {product.description} {/* Display description */}
                </div>
                <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ProductDisplay;
