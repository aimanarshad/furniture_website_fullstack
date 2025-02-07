'use client';

import { Product } from '../type/product';
import React, { useContext, createContext, useState, ReactNode, useEffect } from 'react';

interface CartContextType {
  cart: Product[];
  totalPrice: number;
  handleAddToCart: (product: Product) => void;
  handleRemoveFromCart: (product_id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [cart, setCart] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const cartData = localStorage.getItem('cart');
      return cartData ? JSON.parse(cartData) : [];
    }
    return [];
  });

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null; // Avoid rendering on the server
  }

  const handleAddToCart = (product: Product) => {
    setCart((prevProducts) => [...prevProducts, product]);
  };

  const handleRemoveFromCart = (product_id: string) => {
    setCart((prevCart) => prevCart.filter((item: Product) => item._id !== product_id));
  };

  return (
    <CartContext.Provider value={{ cart, totalPrice, handleAddToCart, handleRemoveFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
