import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
    const {
        getTotalCartAmount,
        all_product,
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        deleteFromCart,
    } = useContext(ShopContext);
    const navigate = useNavigate();

    // Calculate subtotal with formatted value
    const subtotal = all_product.reduce((acc, product) => {
        const cartItem = cartItems[product.id];
        if (cartItem && cartItem.quantity > 0) {
            return acc + product.price * cartItem.quantity;
        }
        return acc;
    }, 0);

    // Check if cart is empty
    const isCartEmpty =
        Object.keys(cartItems).length === 0 ||
        !all_product.some((product) => cartItems[product.id]?.quantity > 0);

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

                                    {/* Updated Quantity Input with Spinner Buttons */}
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

                                    {/* Total price formatted to one decimal place */}
                                    <p>Rs.{(product.price * cartItem.quantity).toFixed(1)}</p>

                                    {/* Delete Button */}
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
                                onClick={() => navigate('/checkout')}
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartItems;
