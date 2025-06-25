import React, { useState, useRef, useEffect } from 'react';
import { Bell, Menu, X, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useScrollToTop from '@/hooks/useScrollToTop';
import LogoWithRoleToggle from '@/components/LogoWithRoleToggle';

const SellerHeader = () => {
  useScrollToTop();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const isLoggedIn = !!localStorage.getItem('token');
  const isActivePage = (path) => location.pathname === path;

  const handleHomeClick = () => {
    if (location.pathname === '/seller') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/seller');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  // 🔔 Fetch user-specific notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setNotifications(data.notifications);
        }
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      }
    };

    if (isLoggedIn) fetchNotifications();
  }, [isLoggedIn]);

  const navItems = [
    { name: 'Home', path: '/seller', onClick: handleHomeClick },
    { name: 'Profile', path: '/seller/profile' },
    { name: 'Upload', path: '/seller/upload' },
    { name: 'Help', path: '/seller/help' },
    { name: 'About', path: '/seller/about' },
  ];

  return (
    <header className="bg-white/95 border-b border-border/50 sticky top-0 z-50 backdrop-blur-sm animate-fade-in">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <LogoWithRoleToggle />

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 flex-shrink-0">
            {navItems.map((item) =>
              item.onClick ? (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className={`text-foreground hover:text-primary transition-all duration-500 font-medium hover:scale-110 hover:font-semibold px-3 py-2 rounded-lg relative ${
                    isActivePage(item.path)
                      ? 'text-primary font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                      : 'hover:bg-primary/5'
                  }`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-foreground hover:text-primary transition-all duration-500 font-medium hover:scale-110 hover:font-semibold px-3 py-2 rounded-lg relative ${
                    isActivePage(item.path)
                      ? 'text-primary font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                      : 'hover:bg-primary/5'
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Mobile Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden hover:scale-110 transition-all duration-300"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            {/* Notification Bell */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="hover:scale-110 transition-all duration-300 hover:bg-primary/10 hover:shadow-lg"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserDropdown(false);
                }}
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                    {notifications.length}
                  </span>
                )}
              </Button>

              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-border/50 rounded-xl shadow-2xl z-50 animate-fade-in">
                  <div className="p-4 border-b bg-gradient-to-r from-primary/10 to-accent/10 rounded-t-xl">
                    <h3 className="font-semibold text-primary">Your Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-sm text-muted-foreground">No notifications found</p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n._id}
                          onClick={() => {
                            navigate('/seller/profile');
                            setShowNotifications(false);
                          }}
                          className="p-4 border-b hover:bg-accent/10 cursor-pointer transition duration-300"
                        >
                          <p className="text-sm">{n.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(n.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="ghost"
                size="sm"
                className="hover-scale-slow transition duration-500 text-sm px-3"
                onClick={() => {
                  setShowUserDropdown(!showUserDropdown);
                  setShowNotifications(false);
                }}
              >
                <User className="w-4 h-4 mr-1" />
                Account
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>

              {showUserDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-border/50 rounded-lg shadow-xl z-50 animate-fade-in">
                  <div className="py-2">
                    <Link
                      to="/seller/profile"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-secondary/50"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/seller/subscription"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-secondary/50"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      Subscription
                    </Link>
                    {isLoggedIn && (
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {!isLoggedIn && (
              <Link to="/signup">
                <Button variant="ghost" size="sm" className="text-sm px-3">
                  Sign Up
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Nav */}
        {showMobileMenu && (
          <div className="lg:hidden mt-4 border-t pt-4 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) =>
                item.onClick ? (
                  <button
                    key={item.name}
                    onClick={() => {
                      item.onClick();
                      setShowMobileMenu(false);
                    }}
                    className={`text-left text-foreground font-medium px-3 py-2 rounded-lg ${
                      isActivePage(item.path) ? 'text-primary bg-primary/10' : 'hover:bg-primary/5'
                    }`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-foreground font-medium px-3 py-2 rounded-lg ${
                      isActivePage(item.path) ? 'text-primary bg-primary/10' : 'hover:bg-primary/5'
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default SellerHeader;
