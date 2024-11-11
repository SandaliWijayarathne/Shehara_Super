import React, { useState, useContext } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../../Context/ShopContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDisplay = ({ product }) => {
    const { addToCart } = useContext(ShopContext);
    const [selectedOption, setSelectedOption] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);

    const handleAddToCart = (productId) => {
        const amount = selectedOption === "Custom" ? Number(customAmount) : Number(selectedOption) || 1;
        const unit = product.unit;

        if (amount > product.stock) {
            toast.error(`You can only add up to ${product.stock} items of this product.`);
            return;
        }

        addToCart(productId, amount, unit);
        toast.success(`${amount} ${unit} of ${product.name} has been added to your cart!`);
    };

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

    const handleCustomAmountChange = (e) => {
        setCustomAmount(e.target.value / 100);
    };

    const renderDropdown = () => {
        switch (product.unit) {
            case 'g':
            case 'kg':
                return (
                    <>
                        <label>Select amount (grams):</label>
                        <select onChange={handleDropdownChange} value={selectedOption}>
                            <option value="">Choose...</option>
                            <option value="1">1kg</option>
                            <option value="2">2kg</option>
                            <option value="5">5kg</option>
                            <option value="Custom">Custom</option>
                        </select>
                        {showCustomInput && (
                            <input
                                type="number"
                                placeholder="Enter in grams"
                                value={customAmount * 100}
                                onChange={handleCustomAmountChange}
                            />
                        )}
                    </>
                );
            case 'pcs':
                return (
                    <>
                        <label>Select pieces:</label>
                        <select onChange={handleDropdownChange} value={selectedOption}>
                            <option value="">Choose...</option>
                            <option value="1">1 pc</option>
                            <option value="2">2 pcs</option>
                            <option value="3">3 pcs</option>
                            <option value="Custom">Custom</option>
                        </select>
                        {showCustomInput && (
                            <input
                                type="number"
                                placeholder="Enter custom pieces"
                                value={customAmount}
                                onChange={(e) => setCustomAmount(e.target.value)}
                            />
                        )}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className='product-display'>
            <div className="product-display-left">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-display-img"
                    onError={(e) => (e.target.src = '/fallback_image.png')}
                />
            </div>
            <div className="product-display-right">
                <h1>{product.name}</h1>
                <div className="product-display-price">Rs. {product.price}</div>
                <h4 className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </h4>
                <div className="quantity-selector">{renderDropdown()}</div>
                <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
                <div className="product-display-description">{product.description}</div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ProductDisplay;
