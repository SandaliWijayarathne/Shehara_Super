import React, { createContext, useState, useEffect } from 'react';
import all_product from '../Components/Assets/all_product';

const URL = "localhost";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length; index++) {
        cart[all_product[index].id] = { quantity: 0, unit: '' };
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [cartCount, setCartCount] = useState(0);

    // Fetch all products from the backend
    const fetchAllProducts = async () => {
        try {
            const response = await fetch(`http://${URL}:4000/allproducts`);
            const data = await response.json();
            const updatedData = data.map((product) => {
                if (product.image) {
                    product.image = `http://${URL}:4000${product.image}`;
                }
                return product;
            });
            setAll_Product(updatedData);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);

    // Update the cart count based on unique products
    const updateCartCount = (cart) => {
        let count = 0;
        for (const item in cart) {
            if (cart[item]?.quantity > 0) {
                count += 1;
            }
        }
        setCartCount(count);
    };

    // Add item to the cart with quantity and unit
    const addToCart = (itemId, quantity = 1, unit = '') => {
        setCartItems((prev) => {
            const updatedCart = {
                ...prev,
                [itemId]: {
                    quantity: (prev[itemId]?.quantity || 0) + Number(quantity),
                    unit: unit.toLowerCase() || prev[itemId]?.unit || '',
                },
            };
            updateCartCount(updatedCart);
            return updatedCart;
        });

        if (localStorage.getItem('auth-token')) {
            fetch(`http://${URL}:4000/addtocart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId, quantity: Number(quantity), unit: unit.toLowerCase() }),
            }).catch((error) => console.error('Error adding to cart:', error));
        }
    };

    // Increase item quantity
    const increaseQuantity = (itemId, unit) => {
        const increment = unit === 'g' ? 0.1 : 1;
        addToCart(itemId, increment, unit);
    };

    // Decrease item quantity
    const decreaseQuantity = (itemId, unit) => {
        const decrement = unit === 'g' ? 0.1 : 1;
        setCartItems((prev) => {
            const updatedQuantity = Math.max((prev[itemId]?.quantity || 0) - decrement, 0);

            const updatedCart = {
                ...prev,
                [itemId]: {
                    ...prev[itemId],
                    quantity: updatedQuantity,
                },
            };

            if (updatedQuantity <= 0) {
                delete updatedCart[itemId];
            }

            updateCartCount(updatedCart);
            return updatedCart;
        });

        if (localStorage.getItem('auth-token')) {
            fetch(`http://${URL}:4000/removefromcart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId }),
            }).catch((error) => console.error('Error removing from cart:', error));
        }
    };

    // Delete item from the cart
    const deleteFromCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            delete updatedCart[itemId];
            updateCartCount(updatedCart);
            return updatedCart;
        });

        if (localStorage.getItem('auth-token')) {
            fetch(`http://${URL}:4000/deletefromcart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId }),
            }).catch((error) => console.error('Error deleting from cart:', error));
        }
    };

    // Clear the entire cart
    const clearCart = () => {
        setCartItems(getDefaultCart());
        setCartCount(0);
    };

    // Calculate the total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            const itemInfo = all_product.find((product) => product.id === Number(item));
            if (itemInfo) {
                const quantity = cartItems[item]?.quantity || 0;
                totalAmount += itemInfo.price * quantity;
            }
        }
        return totalAmount;
    };

    // Get cart data from the backend
    const fetchCartData = async () => {
        if (localStorage.getItem('auth-token')) {
            try {
                const response = await fetch(`http://${URL}:4000/getcart`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}),
                });

                const data = await response.json();
                setCartItems(data);
                updateCartCount(data);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    const contextValue = {
        getTotalCartAmount,
        all_product,
        cartItems,
        cartCount,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        deleteFromCart,
        clearCart,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
