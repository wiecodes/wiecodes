import './App.css';
import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { RoleProvider } from "@/contexts/RoleContext";
import { CartProvider, useCart } from "@/contexts/CartContext"; // ✅ Cart Context
import axios from 'axios';

// Components
import LoadingScreen from "./components/LoadingScreen";

// Pages
import Index from "./pages/Index";
import Templates from "./pages/Templates";
import TemplateInfo from "./pages/TemplateInfo";
import About from "./pages/About";
import Help from "./pages/Help";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Cart from "./pages/Cart";
import Pricing from "./pages/Pricing";
import Subscription from "./pages/Subscription";
import NotFound from "./pages/NotFound";
import CheckoutPage from '@/pages/CheckoutPage';

// Seller Pages
import SellerHome from "./pages/seller/SellerHome";
import SellerProfile from "./pages/seller/SellerProfile";
import UploadTemplate from "./pages/seller/UploadTemplate";
import SellerHelp from "./pages/seller/SellerHelp";
import SellerAbout from "./pages/seller/SellerAbout";
import SellerTemplateInfo from "./pages/seller/SellerTemplateInfo";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTemplateManagement from "./pages/admin/components/AdminManageTemplate";

const queryClient = new QueryClient();

// ProtectedRoute
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/signin" replace />;
};

// ✅ App Wrapper to allow using useCart inside App
const AppWithProviders = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const { token } = useAuth();
  const { setCartFromServer } = useCart();

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return;

      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        

        if (Array.isArray(res.data)) {
          const items = res.data.map((item: any) => ({
            id: item.template._id,
            title: item.template.title,
            price: item.template.estimatedPrice,
            previewImageUrl: item.template.previewImageUrl,
            category: item.template.framework,
            quantity: item.quantity,
          }));
          setCartFromServer(items);
        }
      } catch (err) {
        console.error('Failed to fetch cart:', err);
      }
    };

    fetchCart();
  }, [token, setCartFromServer]);

  return !loadingComplete ? (
    <LoadingScreen onLoadingComplete={() => setLoadingComplete(true)} />
  ) : (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/template/:id" element={<TemplateInfo />} />
      <Route path="/help" element={<Help />} />
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/subscription" element={<Subscription />} />

      {/* Cart (Protected) */}
      <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      <Route path="/checkout" element={<CheckoutPage />} />

      {/* Seller Routes (Protected) */}
      <Route path="/seller" element={<ProtectedRoute><SellerHome /></ProtectedRoute>} />
      <Route path="/seller/profile" element={<ProtectedRoute><SellerProfile /></ProtectedRoute>} />
      <Route path="/seller/upload" element={<ProtectedRoute><UploadTemplate /></ProtectedRoute>} />
      <Route path="/seller/help" element={<ProtectedRoute><SellerHelp /></ProtectedRoute>} />
      <Route path="/seller/about" element={<ProtectedRoute><SellerAbout /></ProtectedRoute>} />
      <Route path="/seller/template/:id" element={<ProtectedRoute><SellerTemplateInfo /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/template/:id" element={<AdminTemplateManagement />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AuthProvider>
          <RoleProvider>
            <CartProvider>
              <AppWithProviders />
            </CartProvider>
          </RoleProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
