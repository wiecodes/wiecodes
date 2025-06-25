
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useScrollToTop, useScrollAnimation } from '@/hooks/useScrollAnimation';

const Help = () => {
  useScrollToTop();
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: sectionsRef, isVisible: sectionsVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen animate-fade-in">
      <Header />
      
      <div className="content-overlay py-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div ref={heroRef} className={`text-center mb-8 scroll-fade-up ${heroVisible ? 'in-view' : ''}`}>
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-4 tracking-tight">
              Help Center
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get the support you need. We're here to help you succeed.
            </p>
          </div>

          {/* Help Sections */}
          <div ref={sectionsRef} className={`max-w-4xl mx-auto space-y-8 mb-8 scroll-fade-up ${sectionsVisible ? 'in-view' : ''}`}>
            {/* Documentation */}
            <div id="documentation" className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">Documentation</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our comprehensive documentation provides everything you need to get started with WIECODES templates. 
                From quick start guides to detailed API references, we've got you covered.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The documentation includes step-by-step tutorials, code examples, best practices, and troubleshooting guides. 
                Whether you're a beginner or an experienced developer, our docs will help you make the most of our products.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                All documentation is regularly updated to reflect the latest features and improvements. 
                You can also contribute to our documentation through our GitHub repository.
              </p>
            </div>

            {/* Help Center */}
            <div id="help-center" className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">Help Center</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our Help Center is your go-to resource for frequently asked questions, tutorials, and troubleshooting guides. 
                We've organized content by topics to help you find answers quickly.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Browse through our extensive knowledge base covering topics like installation, customization, licensing, 
                billing, and technical support. Most common issues can be resolved using our self-service resources.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Can't find what you're looking for? Use our search feature or browse by category. 
                Our help articles are written in plain language with practical examples.
              </p>
            </div>

            {/* Contact Us */}
            <div id="contact-us" className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Need personalized help? Our support team is here to assist you. We offer multiple ways to get in touch, 
                ensuring you receive the help you need in a timely manner.
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex items-start space-x-3">
                  <div className="font-semibold text-primary">Email Support:</div>
                  <div className="text-muted-foreground">support@wiecodes.com - We typically respond within 24 hours</div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="font-semibold text-primary">Phone Support:</div>
                  <div className="text-muted-foreground">+1 (555) 123-4567 - Available Monday-Friday, 9 AM - 6 PM EST</div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                For technical issues, please include details about your setup, browser version, and steps to reproduce the problem. 
                This helps us provide faster and more accurate assistance.
              </p>
            </div>

            {/* Refund Policy */}
            <div id="refund-policy" className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">Refund Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We stand behind the quality of our products and offer a 30-day money-back guarantee on all purchases. 
                If you're not completely satisfied, we'll provide a full refund.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-green-800 mb-2">30-Day Money-Back Guarantee</h3>
                <p className="text-green-700 text-sm">
                  Request a full refund within 30 days of your purchase, no questions asked.
                </p>
              </div>
              <div className="space-y-2 mb-4">
                <h4 className="font-semibold text-primary">Refund Conditions:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Refund requests must be made within 30 days of purchase</li>
                  <li>A valid reason for the refund request is required</li>
                  <li>Refunds are processed within 5-7 business days</li>
                  <li>Original payment method will be credited</li>
                </ul>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To request a refund, contact our support team with your order details and reason for the request. 
                We'll review your case and process eligible refunds promptly.
              </p>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-secondary/50 rounded-lg p-4 text-center">
            <h3 className="text-xl font-heading font-bold text-primary mb-3">
              Still Need Help?
            </h3>
            <p className="text-muted-foreground mb-4 max-w-xl mx-auto text-sm">
              Can't find what you're looking for? Our community and knowledge base have more resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-white text-primary border border-primary/20 hover:bg-primary/5 px-4 py-2 rounded text-sm transition-colors">
                Community Forum
              </button>
              <button className="bg-white text-primary border border-primary/20 hover:bg-primary/5 px-4 py-2 rounded text-sm transition-colors">
                Knowledge Base
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Help;
