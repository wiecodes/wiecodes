
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Role = 'buyer' | 'seller';

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  isSeller: boolean;
  isBuyer: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

interface RoleProviderProps {
  children: ReactNode;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRoleState] = useState<Role>('buyer');

  // Check if current path is seller route
  const isSellerRoute = location.pathname.startsWith('/seller');

  useEffect(() => {
    // Update role based on current route
    if (isSellerRoute && role === 'buyer') {
      setRoleState('seller');
    } else if (!isSellerRoute && role === 'seller') {
      setRoleState('buyer');
    }
  }, [location.pathname, isSellerRoute, role]);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    // Navigate to appropriate route when role changes
    if (newRole === 'seller' && !isSellerRoute) {
      navigate('/seller');
    } else if (newRole === 'buyer' && isSellerRoute) {
      navigate('/');
    }
  };

  const value = {
    role: isSellerRoute ? 'seller' : role,
    setRole,
    isSeller: isSellerRoute || role === 'seller',
    isBuyer: !isSellerRoute && role === 'buyer',
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};
