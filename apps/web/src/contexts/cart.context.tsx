import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { IProduct } from '../resources/product/product.api';

type IExtendedProd = IProduct & {
  quantity: number;
};

type CartContextType = {
  cart: Record<string, IExtendedProd>;
  addToCart: (product: IProduct | IExtendedProd) => void;
  removeFromCart: (productId: string) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Record<string, IExtendedProd>>({});

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '{}');
    setCart(storedCart);
  }, []);

  const updateLocalStorage = (updatedCart: Record<string, IExtendedProd>) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const addToCart = (product: IProduct) => {
    const updatedCart = { ...cart };
    if (updatedCart[product._id]) updatedCart[product._id].quantity += 1;
    else updatedCart[product._id] = { ...product, quantity: 1 };

    updateLocalStorage(updatedCart);
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = { ...cart };
    if (updatedCart[productId].quantity > 1) updatedCart[productId].quantity -= 1;
    else delete updatedCart[productId];

    updateLocalStorage(updatedCart);
  };

  const removeProduct = (productId: string) => {
    const updatedCart = { ...cart };
    delete updatedCart[productId];
    updateLocalStorage(updatedCart);
  };

  const clearCart = () => updateLocalStorage({});

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      removeProduct,
      clearCart,
    }),
    [cart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
