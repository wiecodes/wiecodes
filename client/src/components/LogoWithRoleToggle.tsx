
import React, { useState } from 'react';
import { useRole } from '@/contexts/RoleContext';
import { useLocation, useNavigate } from 'react-router-dom';
import useScrollToTop from '@/hooks/useScrollToTop';

const LogoWithRoleToggle = () => {
  useScrollToTop();
  const { isSeller, setRole } = useRole();
  const [showRoleText, setShowRoleText] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (location.pathname === '/' || location.pathname === '/seller') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(isSeller ? '/seller' : '/');
    }
  };

  const handleRoleToggle = () => {
    setRole(isSeller ? 'buyer' : 'seller');
  };

  const handleModeClick = () => {
    setShowRoleText(true);
    setTimeout(() => setShowRoleText(false), 1500);
  };

  return (
    <div className="relative flex items-center space-x-4 flex-shrink-0">
      {/* Simple Logo */}
      <button
        onClick={handleLogoClick}
        className="hover:scale-105 transition-all duration-300"
      >
        <h1 className="text-2xl font-heading font-bold text-primary tracking-tight transition-all duration-300 hover:text-primary/80">
          WIECODES
        </h1>
      </button>
      
      {/* Role Toggle Button */}
      <button
        onClick={handleRoleToggle}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 shadow-md border border-white/20 backdrop-blur-sm ${
          isSeller
            ? 'bg-gradient-to-r from-emerald-500/95 to-green-500/95 text-white hover:from-emerald-600/95 hover:to-green-600/95'
            : 'bg-gradient-to-r from-blue-500/95 to-indigo-500/95 text-white hover:from-blue-600/95 hover:to-indigo-600/95'
        }`}
      >
        <span className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            isSeller ? 'bg-emerald-200' : 'bg-blue-200'
          } animate-pulse`} />
          <span className="font-semibold">{isSeller ? 'SELL' : 'BUY'}</span>
        </span>
      </button>
    </div>
  );
};

export default LogoWithRoleToggle;
