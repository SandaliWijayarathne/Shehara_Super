import React, { useState, useContext } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../../Context/ShopContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    // State for handling dropdown and custom input
    const [selectedOption, setSelectedOption] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);

    // Function to handle adding product to cart
    const handleAddToCart = (productId) => {
        const amount = selectedOption === "Custom" ? customAmount : selectedOption || 1;
        addToCart(productId, amount);

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
    };

    // Handle dropdown change
    const handleDropdownChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
        if (value === "Custom") {
            setShowCustomInput(true);
        } else {
            setShowCustomInput(false);
            setCustomAmount('');
        }
    };

    // Handle custom input change
    const handleCustomAmountChange = (e) => setCustomAmount(e.target.value);

    // Render dropdown based on product unit
    const renderDropdown = () => {
        switch (product.unit) {
            case 'g':
                return (
                    <>
                        <label>Select amount (grams):</label>
                        <select 
                            onChange={handleDropdownChange} 
                            value={selectedOption} 
                            disabled={showCustomInput}
                        >
                            <option value="">Choose...</option>
                            <option value="100">100g</option>
                            <option value="200">200g</option>
                            <option value="500">500g</option>
                            <option value="1000">1000g</option>
                            <option value="Custom">Custom</option>
                        </select>
                        {showCustomInput && (
                            <input
                                type="number"
                                placeholder="Enter custom grams"
                                value={customAmount}
                                onChange={handleCustomAmountChange}
                                min="1"
                                className="custom-input"
                            />
                        )}
                    </>
                );
            case 'pcs':
                return (
                    <>
                        <label>Select pieces:</label>
                        <select 
                            onChange={handleDropdownChange} 
                            value={selectedOption} 
                            disabled={showCustomInput}
                        >
                            <option value="">Choose...</option>
                            <option value="1">1 pc</option>
                            <option value="2">2 pcs</option>
                            <option value="3">3 pcs</option>
                            <option value="4">4 pcs</option>
                            <option value="Custom">Custom</option>
                        </select>
                        {showCustomInput && (
                            <input
                                type="number"
                                placeholder="Enter custom pieces"
                                value={customAmount}
                                onChange={handleCustomAmountChange}
                                min="1"
                                className="custom-input"
                            />
                        )}
                    </>
                );
            case 'ml':
                return (
                    <>
                        <label>Select amount (ml):</label>
                        <select 
                            onChange={handleDropdownChange} 
                            value={selectedOption} 
                            disabled={showCustomInput}
                        >
                            <option value="">Choose...</option>
                            <option value="400">400ml</option>
                            <option value="700">700ml</option>
                            <option value="1000">1000ml</option>
                            <option value="1500">1.5l</option>
                            <option value="2000">2l</option>
                            <option value="Custom">Custom</option>
                        </select>
                        {showCustomInput && (
                            <input
                                type="number"
                                placeholder="Enter custom ml"
                                value={customAmount}
                                onChange={handleCustomAmountChange}
                                min="1"
                                className="custom-input"
                            />
                        )}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt={product.name} />
                </div>
            </div>
            <div className="productdisplay-right">
                <div className="productdisplay-right-price">Rs. {product.price}.00</div>
                <h4>Stock: {product.stock}</h4>
                <h4>Unit: {product.unit}</h4>
                <h1>{product.name}</h1>

                {/* Conditional dropdown and input rendering */}
                <div className="quantity-selector">
                    {renderDropdown()}
                </div>

                <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>

                <div className="productdisplay-right-description">
                    {product.description}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ProductDisplay;
