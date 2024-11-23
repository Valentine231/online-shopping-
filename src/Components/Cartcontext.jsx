import React, { createContext, useState, useEffect } from 'react';
import { getCartFromLocalStorage, saveCartToLocalStorage } from './utilisstorage';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => getCartFromLocalStorage());
    const quantities = Object.fromEntries(
      Object.entries(cart.items || {}).map(([id, item]) => [id, item.quantity || 1])
    );
    // Persist the cart to localStorage whenever it changes
    useEffect(() => {
        saveCartToLocalStorage(cart);
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
