
import React from 'react';
import { ArrowRight, Code, Palette, Smartphone, Zap, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Hero = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation();

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-white via-secondary/10 to-accent/20 overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-primary rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-primary rounded-lg transform rotate-45"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border-2 border-primary"></div>
        <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-primary rounded-full"></div>
        <div className="absolute top-60 left-1/3 w-8 h-8 bg-primary/30 rounded-full"></div>
        <div className="absolute bottom-60 right-1/4 w-20 h-20 border border-primary rounded-lg transform -rotate-12"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div ref={heroRef} className={`max-w-5xl mx-auto text-center scroll-fade-up ${heroVisible ? 'in-view' : ''}`}>
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8">
            <Star className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Premium Templates</span>
          </div>

          <h1 className="text-6xl lg:text-8xl font-heading font-bold text-primary mb-8 tracking-tight leading-[0.9]">
            Crafted to 
            <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Impress.
            </span>
            <span className="text-4xl lg:text-5xl block mt-2 text-muted-foreground font-normal">
              Priced to Sell.
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Discover premium templates — effortless to buy, easy to customize, and ready to launch your next project.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/templates">
              <Button size="lg" className="classy-button text-lg px-8 py-6">
                <Zap className="w-5 h-5 mr-2" />
                Browse Templates
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-16 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              <span>500+ Premium Templates</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              <span>10,000+ Downloads</span>
            </div>
          </div>

          {/* Features Grid */}
          <div ref={featuresRef} className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto scroll-scale ${featuresVisible ? 'in-view' : ''}`}>
            <div className="text-center group p-8 rounded-xl bg-white/50 backdrop-blur-sm border border-primary/5 hover:border-primary/10 transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Code className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-4">Clean Code</h3>
              <p className="text-base text-muted-foreground leading-relaxed">Well-structured, documented code that follows industry best practices and modern standards.</p>
            </div>

            <div className="text-center group p-8 rounded-xl bg-white/50 backdrop-blur-sm border border-primary/5 hover:border-primary/10 transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Palette className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-4">Beautiful Designs</h3>
              <p className="text-base text-muted-foreground leading-relaxed">Pixel-perfect designs crafted by professional designers with attention to every detail.</p>
            </div>

            <div className="text-center group p-8 rounded-xl bg-white/50 backdrop-blur-sm border border-primary/5 hover:border-primary/10 transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-4">Responsive</h3>
              <p className="text-base text-muted-foreground leading-relaxed">Mobile-first responsive designs that work perfectly on all devices and screen sizes.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
