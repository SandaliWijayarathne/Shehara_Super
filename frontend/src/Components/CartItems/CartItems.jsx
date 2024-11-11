import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const URL = "localhost";

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAddressPopupOpen, setIsAddressPopupOpen] = useState(false);
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    // Calculate subtotal
    const subtotal = all_product.reduce((acc, product) => {
        return acc + (cartItems[product.id] || 0) * product.price;
    }, 0);

    const handleCheckout = () => {
        if (!address) {
            setIsAddressPopupOpen(true);
            return;
        }

        const items = all_product
            .filter(product => cartItems[product.id] > 0)
            .map(product => ({
                id: product.id,
                quantity: cartItems[product.id],
            }));

        setLoading(true);
        setError(null);

        fetch(`http://${URL}:4000/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: items,
                address: address,
            }),
        })
            .then((res) => {
                if (res.ok) return res.json();
                return res.json().then((json) => Promise.reject(json));
            })
            .then(({ url }) => {
                window.location = url;
            })
            .catch((e) => {
                console.error(e.error);
                setError('Something went wrong while processing the payment.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="cartitems-container">
            <div className="cartitems-header">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((product) => {
                const quantity = cartItems[product.id];
                if (quantity > 0) {
                    return (
                        <div key={product.id} className="cartitems-product">
                            <img src={product.image} alt={product.name} className="carticon-product-icon" />
                            <p>{product.name}</p>
                            <p>Rs.{product.price}</p>
                            <span className="cartitems-quantity">{quantity}</span>
                            <p>Rs.{product.price * quantity}</p>
                            <img
                                className="cartitems-remove-icon"
                                src={remove_icon}
                                onClick={() => removeFromCart(product.id)}
                                alt="Remove item"
                            />
                        </div>
                    );
                }
                return null;
            })}

            <div className="cartitems-summary">
                <div className="cartitems-total">
                    <h1>Order Summary</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>Rs.{subtotal}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>Rs.{subtotal}</h3>
                        </div>
                    </div>
                    <button
                        className="checkout-button"
                        onClick={handleCheckout}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'PROCEED TO CHECKOUT'}
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>

            {isAddressPopupOpen && (
                <div className="address-popup-container">
                    <div className="address-popup">
                        <h2>Enter Your Address</h2>
                        <textarea
                            className="address-input"
                            placeholder="Enter your delivery address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <div className="popup-buttons">
                            <button className="popup-cancel-btn" onClick={() => setIsAddressPopupOpen(false)}>
                                Cancel
                            </button>
                            <button
                                className="popup-submit-btn"
                                onClick={() => {
                                    setIsAddressPopupOpen(false);
                                    handleCheckout();
                                }}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartItems;
