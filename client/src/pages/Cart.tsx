import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    cart,
    increment,
    decrement,
    removeFromCart,
    setCartFromServer,
  } = useCart();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);


  const handleIncrement = async (id: string) => {
    try {
      const currentQty = cart.find(item => item.id === id)?.quantity || 1;
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/cart`,
        { templateId: id, quantity: currentQty + 1 },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      increment(id);
    } catch (err) {
      console.error('Failed to increment item:', err);
    }
  };

  const handleDecrement = async (id: string) => {
    try {
      const currentQty = cart.find(item => item.id === id)?.quantity || 1;
      const newQty = Math.max(1, currentQty - 1);
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/cart`,
        { templateId: id, quantity: newQty },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      decrement(id);
    } catch (err) {
      console.error('Failed to decrement item:', err);
    }
  };

  const handleRemove = async (templateId: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/cart/remove/${templateId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      removeFromCart(templateId);
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };
  




  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-heading font-bold text-primary mb-8">Shopping Cart</h1>

            {loading ? (
              <div className="flex justify-center items-center h-24">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground">Your cart is empty.</p>
                  ) : (
                    cart.map((item) => (
                      <Card key={item.id} className="elegant-card">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <img
                              src={`${import.meta.env.VITE_BACKEND_URL}/${item.previewImageUrl}`}
                              alt={item.title}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="font-heading font-semibold text-primary">{item.title}</h3>
                              <p className="text-sm text-muted-foreground">{item.category}</p>
                              <p className="text-lg font-bold text-primary mt-1">₹{item.price?.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="outline" onClick={() => handleDecrement(item.id)}>
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button size="sm" variant="outline" onClick={() => handleIncrement(item.id)}>
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleRemove(item.id)}
                                >
                                <Trash2 className="w-4 h-4" />
                              </Button>

                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>

                {/* Order Summary */}
                <div>
                  <Card className="elegant-card">
                    <CardHeader>
                      <CardTitle className="font-heading">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (GST 18%)</span>
                        <span>₹{tax.toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span>₹{total.toLocaleString()}</span>
                        </div>
                      </div>
                      <Button className="w-full classy-button"
                        onClick={() => navigate('/checkout')}
                        disabled={cart.length === 0}>
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Proceed to Checkout
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
