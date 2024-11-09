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
        removeFromCart,
        increaseCartItem,
        decreaseCartItem,
    } = useContext(ShopContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAddressPopupOpen, setIsAddressPopupOpen] = useState(false);
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

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
        fetch(`http://${URL}:4000/create-checkout-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items, address }),
        })
            .then((res) => res.ok ? res.json() : Promise.reject(res.json()))
            .then(({ url }) => { window.location = url; })
            .catch(() => setError('Something went wrong while processing the payment.'))
            .finally(() => setLoading(false));
    };

    return (
        <div className="cartitems-container">
            {all_product.map((e) => (
                cartItems[e.id] > 0 && (
                    <div key={e.id} className="cartitems-product">
                        <img src={e.image} alt={e.name} className="carticon-product-icon" />
                        <p>{e.name}</p>
                        <p>Rs.{e.price}</p>
                        <div className="cartitems-quantity-control">
                            <span className="cartitems-quantity">{cartItems[e.id]}</span>
                            <div className="cartitems-spinner">
                                <button
                                    className="spinner-button up-button"
                                    onClick={() => increaseCartItem(e.id)}
                                    aria-label="Increase quantity"
                                >
                                    ▲
                                </button>
                                <button
                                    className="spinner-button down-button"
                                    onClick={() => decreaseCartItem(e.id)}
                                    aria-label="Decrease quantity"
                                >
                                    ▼
                                </button>
                            </div>
                        </div>
                        <p>Rs.{e.price * cartItems[e.id]}</p>
                        <img
                            src={remove_icon}
                            onClick={() => removeFromCart(e.id)}
                            alt="Remove"
                            className="cartitems-remove-icon"
                        />
                    </div>
                )
            ))}
        </div>
    );
};

export default CartItems;
