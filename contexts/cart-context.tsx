"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: number;
  name: string;
  slug?: string;
  brand: string;
  sku?: string;
  price: number;
  image: string;
  quantity: number;
  inStock: boolean;
  options?: Record<string, string>;
}

interface CartContextType {
  cartCount: number;
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  getMaxQuantity: (price: number) => number;
  promoCode: string;
  promoDiscount: number;
  setPromoCode: (code: string) => void;
  setPromoDiscount: (discount: number) => void;
  clearPromo: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<string>("");
  const [promoDiscount, setPromoDiscount] = useState<number>(0);


  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cart:", e);
      }
    }
    

    const savedPromo = localStorage.getItem("promoCode");
    const savedDiscount = localStorage.getItem("promoDiscount");
    if (savedPromo) setPromoCode(savedPromo);
    if (savedDiscount) setPromoDiscount(parseFloat(savedDiscount));
  }, []);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);


  useEffect(() => {
    if (promoCode) {
      localStorage.setItem("promoCode", promoCode);
      localStorage.setItem("promoDiscount", promoDiscount.toString());
    } else {
      localStorage.removeItem("promoCode");
      localStorage.removeItem("promoDiscount");
    }
  }, [promoCode, promoDiscount]);


  const getMaxQuantity = (price: number): number => {
    if (price < 1000) return 5;
    if (price < 5000) return 3;
    if (price < 50000) return 2;
    return 1; // 50k and above
  };

  const addToCart = (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
    setCartItems((prev) => {

      const existing = prev.find((i) => {
        if (i.id !== item.id) return false;
        

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

            const newQuantity = Math.min(i.quantity + quantity, maxQty);
            return { ...i, quantity: newQuantity };
          }
          return i;
        });
      }
      return [...prev, { ...item, quantity: Math.min(quantity, maxQty) }];
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

  const clearPromo = () => {
    setPromoCode("");
    setPromoDiscount(0);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartCount, 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      cartTotal, 
      getMaxQuantity,
      promoCode,
      promoDiscount,
      setPromoCode,
      setPromoDiscount,
      clearPromo
    }}>
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
