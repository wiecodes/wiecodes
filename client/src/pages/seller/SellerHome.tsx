import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, BarChart3, Users, Star, Shield, Award, Verified, Code, Palette, Smartphone, Target } from 'lucide-react';
import SellerHeader from '@/components/SellerHeader';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import useScrollToTop from '@/hooks/useScrollToTop';


const SellerHome = () => {
  useScrollToTop();

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation();
  const { ref: featuresGridRef, isVisible: featuresGridVisible } = useScrollAnimation();
  const { ref: tipsRef, isVisible: tipsVisible } = useScrollAnimation();

  const sellerFeatures = [
    {
      title: "Easy Upload Process",
      description: "Upload your templates quickly with our streamlined process",
      icon: Upload,
      color: "blue"
    },
    {
      title: "Real-time Analytics",
      description: "Track your sales, downloads, and earnings in real-time",
      icon: BarChart3,
      color: "green"
    },
    {
      title: "Global Marketplace",
      description: "Reach thousands of developers worldwide",
      icon: Users,
      color: "purple"
    },
    {
      title: "Premium Support",
      description: "Get dedicated support to help you succeed",
      icon: Star,
      color: "orange"
    }
  ];

  const sellerTips = [
    {
      title: "Quality First",
      description: "Focus on creating high-quality, well-documented templates",
      tip: "Templates with better documentation sell 3x more"
    },
    {
      title: "Competitive Pricing",
      description: "Research market prices and set competitive rates",
      tip: "Sweet spot is usually $15-45 for most templates"
    },
    {
      title: "Regular Updates",
      description: "Keep your templates updated with latest frameworks",
      tip: "Updated templates get featured more often"
    }
  ];

  return (
    <div className="min-h-screen bg-secondary animate-fade-in">
      <SellerHeader />

      <main>
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div ref={heroRef} className={`max-w-4xl mx-auto text-center scroll-fade-up ${heroVisible ? 'in-view' : ''}`}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Star className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">Marketplace Built on Trust & Excellence</span>
              </div>

              <h1 className="text-6xl lg:text-8xl font-heading font-bold text-primary mb-8 tracking-tight leading-[0.9]">
                Crafted with
                <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Passion.
                </span>
                <span className="text-4xl lg:text-5xl block mt-2 text-muted-foreground font-normal">
                  Sold with Purpose.
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-light">
                Focus on your craft and track performance — we handle sales to help you maximize your earnings.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Link to="/seller/upload">
                  <Button size="lg" className="classy-button text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload New Template
                  </Button>
                </Link>
                <Link to="/seller/profile">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 hover:bg-primary hover:text-white transition-all duration-500 hover:scale-105">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    View Analytics
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 mb-16 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-green-600 mr-2" />
                  <span>Secure Platform</span>
                </div>
                <div className="flex items-center">
                  <Verified className="w-4 h-4 text-green-600 mr-2" />
                  <span>Verified Seller</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 text-green-600 mr-2" />
                  <span>Quality Assured</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-green-600 mr-2" />
                  <span>Premium Support</span>
                </div>
              </div>

              {/* Features Grid */}
              <div ref={featuresGridRef} className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto scroll-scale ${featuresGridVisible ? 'in-view' : ''}`}>
                <div className="text-center group p-8 rounded-xl bg-white/30 backdrop-blur-sm border border-primary/5 hover:border-primary/10 transition-all duration-300 hover:shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Code className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-primary mb-4">Clean Code</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">Well-structured, documented code that follows industry best practices and modern standards.</p>
                </div>
                <div className="text-center group p-8 rounded-xl bg-white/30 backdrop-blur-sm border border-primary/5 hover:border-primary/10 transition-all duration-300 hover:shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Palette className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-primary mb-4">Beautiful Designs</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">Pixel-perfect designs crafted by professional designers with attention to every detail.</p>
                </div>
                <div className="text-center group p-8 rounded-xl bg-white/30 backdrop-blur-sm border border-primary/5 hover:border-primary/10 transition-all duration-300 hover:shadow-lg">
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

        {/* Seller Benefits */}
        <section className="py-16 lg:py-20 bg-white/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div ref={featuresRef} className={`scroll-fade-up ${featuresVisible ? 'in-view' : ''}`}>
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-4">Seller Benefits</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Everything you need to succeed as a template seller on our platform
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {sellerFeatures.map((feature, index) => (
                  <Card key={index} className="professional-card border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                    <CardContent className="p-8 text-center h-full flex flex-col">
                      <div className={`inline-flex p-4 bg-${feature.color}-100 rounded-2xl mb-6 shadow-md group-hover:scale-110 transition-transform duration-500`}>
                        <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                      </div>
                      <h3 className="text-xl font-semibold text-primary mb-3 group-hover:text-primary/80 transition-colors">{feature.title}</h3>
                      <p className="text-muted-foreground flex-1">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Seller Tips */}
        <section className="pb-16 lg:pb-20 bg-white/20 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div ref={tipsRef} className={`scroll-fade-up ${tipsVisible ? 'in-view' : ''}`}>
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-4">Pro Seller Tips</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Expert strategies to maximize your success and earnings on WIECODES
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {sellerTips.map((tip, index) => (
                  <div key={index} className="group">
                    <div className="glass-card rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-primary mb-3">{tip.title}</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{tip.description}</p>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 backdrop-blur-sm">
                        <p className="text-green-700 font-medium flex items-start">
                          <span className="text-lg mr-2">💡</span>
                          {tip.tip}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SellerHome;
