import React, { createContext, useState, useEffect } from 'react';
import all_product from '../Components/Assets/all_product';

const URL ="13.49.67.237";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length; index++) {
        cart[all_product[index].id] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [cartCount, setCartCount] = useState(0); 

    const fetchAllProducts = async () => {
        try {
            const response = await fetch(`http://${URL}:4000/allproducts`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAll_Product(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        fetchAllProducts();

        if (localStorage.getItem('auth-token')) {
            fetch(`http://${URL}:4000/getcart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setCartItems(data);
                    updateCartCount(data); 
                })
                .catch((error) => console.error('Fetch error:', error));
        }
    }, []);

    const updateCartCount = (cart) => {
        let count = 0;
        for (const item in cart) {
            count += cart[item];
        }
        setCartCount(count);
    };

    const addToCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: prev[itemId] + 1 };
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
                body: JSON.stringify({ itemId: itemId }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => console.log(data))
                .catch((error) => console.error('Fetch error:', error));
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) };
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
                body: JSON.stringify({ itemId: itemId }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => console.log(data))
                .catch((error) => console.error('Fetch error:', error));
        }
    };

    const clearCart = () => {
        setCartItems(getDefaultCart());
        setCartCount(0); 
        setCartCount(0); 
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            let itemInfo = all_product.find((product) => product.id === Number(item));
            if (itemInfo) {
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const contextValue = { 
        getTotalCartAmount, 
        all_product, 
        cartItems, 
        cartCount, 
        addToCart, 
        removeFromCart 
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
