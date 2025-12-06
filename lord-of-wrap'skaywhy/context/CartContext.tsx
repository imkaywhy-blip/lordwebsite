
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, MenuItem, CartContextType, CartOptions } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('lord-of-wraps-cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('lord-of-wraps-cart', JSON.stringify(cart));
  }, [cart]);

  const getCartItemPrice = (item: CartItem) => {
    let price = item.price;
    if (item.options) {
      if (item.options.extraCheese) price += 20;
      if (item.options.extraMayo) price += 10;
    }
    return price;
  };

  const addToCart = (item: MenuItem, options?: CartOptions) => {
    // Generate unique ID based on options
    const optionsId = options 
      ? `${options.spiceLevel}-${options.extraCheese ? '1' : '0'}-${options.extraMayo ? '1' : '0'}`
      : 'default';
    
    const cartId = `${item.id}-${optionsId}`;

    setCart(prev => {
      const existing = prev.find(i => i.cartId === cartId);
      if (existing) {
        return prev.map(i => i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1, options, cartId }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.cartId === cartId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      });
    });
  };

  const updateItemNote = (cartId: string, note: string) => {
    setCart(prev => prev.map(item => 
      item.cartId === cartId ? { ...item, note } : item
    ));
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (getCartItemPrice(item) * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateItemNote,
      clearCart,
      cartTotal,
      isCartOpen,
      setIsCartOpen,
      getCartItemPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};
