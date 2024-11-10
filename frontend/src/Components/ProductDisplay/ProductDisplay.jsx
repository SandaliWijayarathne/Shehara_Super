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
        // Use the custom amount if "Custom" is selected, otherwise use the selected option or default to 1
        const amount = selectedOption === "Custom" ? customAmount : selectedOption || 1;

        // Validate the selected amount with the stock
        if (amount > product.stock) {
            toast.error(`You can only add up to ${product.stock} items of this product to your cart.`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'toastify-error',
            });
            return;  // Prevent adding if quantity exceeds stock
        }

        // Add the product to the cart
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
            setCustomAmount(''); // Clear custom input if not using it
        }
    };

    // Handle custom input change (divide input by 10 before storing)
    const handleCustomAmountChange = (e) => {
        const inputValue = e.target.value;
        const adjustedValue = inputValue / 100;
        setCustomAmount(adjustedValue);
    };

    const handleCustomAmountpChange = (e) => {
        const inputValue = e.target.value;
        const adjustedValue = inputValue;
        setCustomAmount(adjustedValue);
    };

    // Render dropdown based on product unit
    const renderDropdown = () => {
        switch (product.unit) {
            case 'g':
            case 'kg':
                return (
                    <>
                        <label>Select amount (grams):</label>
                        <select 
                            onChange={handleDropdownChange} 
                            value={selectedOption} 
                            disabled={showCustomInput}
                        >
                            <option value="">Choose...</option>
                            <option value="1">100g</option>
                            <option value="2">200g</option>
                            <option value="5">500g</option>
                            <option value="10">1000g</option>
                            <option value="Custom">Custom</option>
                        </select>
                        {showCustomInput && (
                            <input
                                type="number"
                                placeholder="Enter in grams"
                                value={customAmount * 100} // Show original value in input
                                onChange={handleCustomAmountChange}
                                min="1"
                                max="1000"
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
                                value={customAmount} // Show original value in input
                                onChange={handleCustomAmountpChange}
                                min="1"
                                max="30"
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
            <h1>{product.name}</h1>
                <div className="productdisplay-right-price">Rs. {product.price}.00</div>

                <h4 className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </h4>

                

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
