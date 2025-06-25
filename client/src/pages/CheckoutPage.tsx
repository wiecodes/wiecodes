// src/pages/CheckoutPage.tsx

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const CheckoutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 bg-secondary/30 py-24">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-8 text-center space-y-6">
          <ShoppingBag className="w-12 h-12 text-primary mx-auto" />
          <h1 className="text-2xl font-bold text-primary">Checkout</h1>
          <p className="text-muted-foreground text-sm">
            🚧 Payment integration coming soon. <br /> This is a test page — no real payment will be processed.
          </p>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
