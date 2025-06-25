import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  User,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoWithRoleToggle from '@/components/LogoWithRoleToggle';
import axios from 'axios';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/templates/search?query=${searchQuery}`);

        const suggestions = Array.isArray(res.data) ? res.data : [];
        setFilteredSuggestions(suggestions);
        setShowSuggestions(true);
      } catch (err) {
        console.error('Search error:', err);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery('');
    setShowSuggestions(false);
    navigate(`/template/${suggestion._id}`);
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
    window.location.reload();
  };

  const isActivePage = (path) => location.pathname === path;

  const navItems = [
    { name: 'Home', path: '/', onClick: handleHomeClick },
    { name: 'Templates', path: '/templates' },
    { name: 'Help', path: '/help' },
    { name: 'About', path: '/about' },
    { name: 'Subscription', path: '/subscription' },
  ];

  return (
    <header className="bg-white/95 border-b border-border/50 sticky top-0 z-50 backdrop-blur-sm animate-fade-in">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <LogoWithRoleToggle />

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-4 relative" ref={searchRef}>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search templates..."
                className="pl-10 bg-secondary/50 border-border/50 focus:bg-white transition-all duration-500 hover:shadow-md focus:shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
              />
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border/50 rounded-lg shadow-xl z-50 animate-fade-in max-h-96 overflow-y-auto">
                  {Array.isArray(filteredSuggestions) && filteredSuggestions.length > 0 ? (
                    filteredSuggestions.slice(0, 8).map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-4 hover:bg-secondary/50 cursor-pointer transition-all duration-300 border-b border-border/30 last:border-b-0"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <span className="font-semibold text-primary">{suggestion.title}</span>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                                {suggestion.type || 'General'}
                              </span>
                              <span className="text-xs bg-accent px-2 py-1 rounded-full">{suggestion.framework || 'N/A'}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${suggestion.theme === 'Dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
                                {suggestion.theme || 'Light'}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-primary">₹{suggestion.estimatedPrice || 'Free'}</span>
                            <div className="text-xs text-muted-foreground">{suggestion.category || 'Misc'}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-sm text-muted-foreground">No templates found.</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 flex-shrink-0">
            {navItems.map((item) =>
              item.onClick ? (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className={`text-foreground hover:text-primary transition-all duration-500 font-medium hover-scale-slow ${
                    isActivePage(item.path) ? 'text-primary font-semibold border-b-2 border-primary' : ''
                  }`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-foreground hover:text-primary transition-all duration-500 font-medium hover-scale-slow ${
                    isActivePage(item.path) ? 'text-primary font-semibold border-b-2 border-primary' : ''
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden hover-scale-slow transition-all duration-500"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>

            <div className="hidden sm:flex items-center space-x-2">
              <div className="relative" ref={dropdownRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover-scale-slow transition-all duration-500 text-sm px-3"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                >
                  <User className="w-4 h-4 mr-1" />
                  Account
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>

                {showUserDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-border/50 rounded-lg shadow-xl z-50 animate-fade-in">
                    <div className="py-2">
                      <Link
                        to="/subscription"
                        className="block px-4 py-2 text-sm text-foreground hover:bg-secondary/50 transition-colors"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Subscription
                      </Link>
                      {isLoggedIn && (
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
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
                  <Button variant="ghost" size="sm" className="hover-scale-slow transition-all duration-500 text-sm px-3">
                    Sign Up
                  </Button>
                </Link>
              )}

              <Link to="/cart">
                <Button size="sm" className="classy-button hover-scale-slow text-sm px-3">
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden mt-4 border-t border-border/50 pt-4 animate-fade-in">
            <nav className="flex flex-col space-y-2 mb-4">
              {navItems.map((item) =>
                item.onClick ? (
                  <button
                    key={item.name}
                    onClick={() => {
                      item.onClick();
                      setShowMobileMenu(false);
                    }}
                    className={`text-left text-foreground hover:text-primary transition-all duration-300 font-medium px-3 py-2 rounded-lg ${
                      isActivePage(item.path) ? 'text-primary font-semibold bg-primary/10' : 'hover:bg-primary/5'
                    }`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-foreground hover:text-primary transition-all duration-300 font-medium px-3 py-2 rounded-lg ${
                      isActivePage(item.path) ? 'text-primary font-semibold bg-primary/10' : 'hover:bg-primary/5'
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>

            <div className="flex flex-col space-y-2 pt-2 border-t border-border/30">
              {!isLoggedIn && (
                <Link to="/signup" onClick={() => setShowMobileMenu(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    Sign Up
                  </Button>
                </Link>
              )}
              {isLoggedIn && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-red-500"
                  onClick={() => {
                    handleLogout();
                    setShowMobileMenu(false);
                  }}
                >
                  Logout
                </Button>
              )}
              <Link to="/cart" onClick={() => setShowMobileMenu(false)}>
                <Button size="sm" className="w-full">
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Cart
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
