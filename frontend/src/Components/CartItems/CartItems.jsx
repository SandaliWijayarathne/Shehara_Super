import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const URL ="16.171.25.23";

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleCheckout = () => {
        // Prepare the items in the cart for the checkout session
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
            }),
        })
            .then((res) => {
                if (res.ok) return res.json();
                return res.json().then((json) => Promise.reject(json));
            })
            .then(({ url }) => {
                // Redirect to the payment page
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
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id} className="cartitems-product">
                            <img src={e.image} alt={e.name} className="carticon-product-icon" />
                            <p>{e.name}</p>
                            <p>Rs.{e.price}</p>
                            <button className="cartitems-quantity">{cartItems[e.id]}</button>
                            <p>Rs.{e.price * cartItems[e.id]}</p>
                            <img
                                className="cartitems-remove-icon"
                                src={remove_icon}
                                onClick={() => {
                                    removeFromCart(e.id);
                                }}
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
                            <p>Rs.{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>Rs.{getTotalCartAmount()}</h3>
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
        </div>
    );
};

export default CartItems;
