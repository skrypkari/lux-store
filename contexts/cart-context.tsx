"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
  inStock: boolean;
  options?: Record<string, string>;
}

interface CartContextType {
  cartCount: number;
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  getMaxQuantity: (price: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cart:", e);
      }
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Get max quantity allowed based on price
  const getMaxQuantity = (price: number): number => {
    if (price < 1000) return 5;
    if (price < 5000) return 3;
    if (price < 50000) return 2;
    return 1; // 50k and above
  };

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      // Check if item with same id AND same options exists
      const existing = prev.find((i) => {
        if (i.id !== item.id) return false;
        
        // Compare options
        const iOptionsStr = JSON.stringify(i.options || {});
        const itemOptionsStr = JSON.stringify(item.options || {});
        return iOptionsStr === itemOptionsStr;
      });
      
      const maxQty = getMaxQuantity(item.price);
      
      if (existing) {
        return prev.map((i) => {
          const iOptionsStr = JSON.stringify(i.options || {});
          const itemOptionsStr = JSON.stringify(item.options || {});
          
          if (i.id === item.id && iOptionsStr === itemOptionsStr) {
            // Don't exceed max quantity
            const newQuantity = Math.min(i.quantity + 1, maxQty);
            return { ...i, quantity: newQuantity };
          }
          return i;
        });
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const maxQty = getMaxQuantity(item.price);
          const newQuantity = Math.min(quantity, maxQty);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartCount, cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, getMaxQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
