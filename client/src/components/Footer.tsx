
import React from 'react';
import { Github, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRole } from '@/contexts/RoleContext';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSeller } = useRole();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (to, sectionId = null) => {
    if (location.pathname === to && !sectionId) {
      scrollToTop();
    } else if (sectionId) {
      if (location.pathname === to) {
        setTimeout(() => {
          const element = document.querySelector(`h2:has(+ #${sectionId})`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        navigate(to);
        setTimeout(() => {
          const element = document.querySelector(`h2:has(+ #${sectionId})`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      }
    } else {
      navigate(to);
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-heading font-bold mb-4">WIECODES</h3>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Premium templates for developers worldwide. 
              {isSeller ? ' Monetize your creativity and build your business.' : ' Build faster with quality templates.'}
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {isSeller ? (
                <>
                  <button 
                    onClick={() => handleLinkClick('/seller')}
                    className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={() => handleLinkClick('/seller/profile')}
                    className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    My Profile
                  </button>
                  <button 
                    onClick={() => handleLinkClick('/seller/upload')}
                    className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    Upload Template
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => handleLinkClick('/templates')}
                    className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    Templates
                  </button>
                  <button 
                    onClick={() => handleLinkClick('/pricing')}
                    className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    Pricing
                  </button>
                  <button 
                    onClick={() => handleLinkClick('/subscription')}
                    className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    Subscription
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <div className="space-y-2">
              <button 
                onClick={() => handleLinkClick(isSeller ? '/seller/help' : '/help')}
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
              >
                Help Center
              </button>
              <button 
                onClick={() => handleLinkClick(isSeller ? '/seller/about' : '/about')}
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
              >
                About Us
              </button>
              <a href="#" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                Contact Support
              </a>

            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/80 text-sm">
                  {isSeller ? 'sellers@wiecodes.com' : 'support@wiecodes.com'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/80 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-primary-foreground/60 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  123 Developer St.<br />
                  Tech City, TC 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/80 text-xs">
              © 2024 WIECODES. All rights reserved.
            </p>
            <div className="flex space-x-4 text-xs">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
