import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const URL = "localhost";

const CartItems = () => {
    const {
        getTotalCartAmount,
        all_product,
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        deleteFromCart,
    } = useContext(ShopContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAddressPopupOpen, setIsAddressPopupOpen] = useState(false);
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const subtotal = all_product.reduce((acc, product) => {
        const cartItem = cartItems[product.id];
        if (cartItem && cartItem.quantity > 0) {
            return acc + product.price * cartItem.quantity;
        }
        return acc;
    }, 0);

    const isCartEmpty = !all_product.some((product) => cartItems[product.id]?.quantity > 0);

    const handleCheckout = () => {
        if (!address) {
            setIsAddressPopupOpen(true);
            return;
        }

        const items = all_product
            .filter(product => cartItems[product.id]?.quantity > 0)
            .map(product => ({
                id: product.id,
                quantity: cartItems[product.id].quantity,
            }));

        setLoading(true);
        setError(null);

        fetch(`http://${URL}:4000/create-checkout-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items, address }),
        })
            .then((res) => res.ok ? res.json() : res.json().then((json) => Promise.reject(json)))
            .then(({ url }) => window.location = url)
            .catch((e) => setError('Something went wrong while processing the payment.'))
            .finally(() => setLoading(false));
    };

    return (
        <div className="cartitems-container">
            <h1>Your Cart</h1>

            {isCartEmpty ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="cartitems-header">
                        <p>Product</p>
                        <p>Title</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        <p>Actions</p>
                    </div>
                    <hr />
                    {all_product.map((product) => {
                        const cartItem = cartItems[product.id];
                        if (cartItem && cartItem.quantity > 0) {
                            return (
                                <div key={product.id} className="cartitems-product">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="carticon-product-icon"
                                    />
                                    <p>{product.name}</p>
                                    <p>Rs.{product.price.toFixed(1)}</p>
                                    <div className="cartitems-quantity-input">
                                        <input
                                            type="text"
                                            value={
                                                product.unit === 'g'
                                                    ? `${(cartItem.quantity * 100).toFixed(1)}g`
                                                    : `${cartItem.quantity.toFixed(1)} ${product.unit || 'pcs'}`
                                            }
                                            readOnly
                                            className="quantity-display"
                                        />
                                        <div className="spinner-buttons">
                                            <button
                                                className="quantity-button increase-button"
                                                onClick={() => increaseQuantity(product.id, product.unit)}
                                            />
                                            <button
                                                className="quantity-button decrease-button"
                                                onClick={() => decreaseQuantity(product.id, product.unit)}
                                            />
                                        </div>
                                    </div>
                                    <p>Rs.{(product.price * cartItem.quantity).toFixed(1)}</p>
                                    <img
                                        className="cartitems-delete-icon"
                                        src={remove_icon}
                                        onClick={() => deleteFromCart(product.id)}
                                        alt="Delete item"
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
                                    <p>Rs.{subtotal.toFixed(1)}</p>
                                </div>
                                <hr />
                                <div className="cartitems-total-item">
                                    <p>Shipping Fee</p>
                                    <p>Free</p>
                                </div>
                                <hr />
                                <div className="cartitems-total-item">
                                    <h3>Total</h3>
                                    <h3>Rs.{subtotal.toFixed(1)}</h3>
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
                </>
            )}

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
                            <button
                                className="popup-cancel-btn"
                                onClick={() => setIsAddressPopupOpen(false)}
                            >
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
