import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import axios from 'axios';

export interface CartItem {
  id: string;
  title: string;
  price: number | null;
  previewImageUrl: string;
  category?: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  setCartFromServer: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ Load cart from server on app load
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
    
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        if (Array.isArray(res.data.cart)) {
          const items = res.data.cart
            .filter(item => item.template && item.template._id) // ✅ prevent null access
            .map((item: any) => ({
              id: item.template._id,
              title: item.template.title,
              price: item.template.estimatedPrice,
              previewImageUrl: item.template.previewImageUrl,
              category: item.template.framework,
              quantity: item.quantity,
            }));
    
          setCart(items);
        } else {
          console.error('Unexpected cart data:', res.data);
        }
      } catch (error) {
        console.error('Failed to fetch cart from server:', error);
      }
    };
    

    fetchCart();
  }, []);

  const addToCart = async (item: CartItem) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/cart`,
        { templateId: item.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setCart(prev => {
        const exists = prev.find(p => p.id === item.id);
        if (exists) {
          return prev.map(p =>
            p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
          );
        } else {
          return [...prev, { ...item, quantity: 1 }];
        }
      });
    } catch (error) {
      console.error('Failed to add item to backend cart:', error);
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/cart/remove/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      
      setCart(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/cart`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCart([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const increment = async (id: string) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/cart`,
        { templateId: id, quantity: (cart.find(item => item.id === id)?.quantity || 1) + 1 },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      setCart(prev =>
        prev.map(p => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
      );
    } catch (error) {
      console.error('Failed to increment quantity:', error);
    }
  };

  const decrement = async (id: string) => {
    const currentQty = cart.find(p => p.id === id)?.quantity || 1;
    const newQty = Math.max(1, currentQty - 1);

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/cart`,
        { templateId: id, quantity: newQty },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      setCart(prev =>
        prev.map(p => (p.id === id ? { ...p, quantity: newQty } : p))
      );
    } catch (error) {
      console.error('Failed to decrement quantity:', error);
    }
  };

  const setCartFromServer = (items: CartItem[]) => {
    setCart(items);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increment,
        decrement,
        setCartFromServer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
