
import React from 'react';
import SellerHeader from '@/components/SellerHeader';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, TrendingUp, Award, Globe, Shield } from 'lucide-react';
import useScrollToTop from '@/hooks/useScrollToTop';

const SellerAbout = () => {
  useScrollToTop();
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();

  const values = [
    {
      title: "Quality First",
      icon: Award,
      description: "We maintain the highest standards for all templates on our platform"
    },
    {
      title: "Fair Earnings",
      icon: TrendingUp,
      description: "Competitive commission rates that reward your hard work and creativity"
    },
    {
      title: "Global Reach",
      icon: Globe,
      description: "Access to developers and businesses from around the world"
    },
    {
      title: "Secure Platform",
      icon: Shield,
      description: "Your intellectual property and earnings are protected with enterprise-grade security"
    },
    {
      title: "Community Driven",
      icon: Users,
      description: "A supportive community of sellers helping each other succeed"
    },
    {
      title: "Innovation Focus",
      icon: Target,
      description: "Always evolving to provide the best tools and features for sellers"
    }
  ];

  return (
    <div className="min-h-screen animate-fade-in">
      <SellerHeader />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div ref={heroRef} className={`text-center mb-12 scroll-fade-up ${heroVisible ? 'in-view' : ''}`}>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-4 tracking-tight">
              About WIECODES
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Empowering developers to monetize their creativity through our premium template marketplace.
            </p>
          </div>

          {/* Mission Section */}
          <div ref={missionRef} className={`max-w-4xl mx-auto mb-16 scroll-fade-up ${missionVisible ? 'in-view' : ''}`}>
            <Card className="elegant-card shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-heading font-bold text-primary mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  To create the world's premier marketplace where talented developers can showcase their work, 
                  earn meaningful income, and help fellow developers build amazing projects faster.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  <div className="text-center p-4 rounded-lg hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5 transition-all duration-300 hover:scale-105">
                    <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                    <div className="text-muted-foreground">Active Sellers</div>
                  </div>
                  <div className="text-center p-4 rounded-lg hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5 transition-all duration-300 hover:scale-105">
                    <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                    <div className="text-muted-foreground">Templates Sold</div>
                  </div>
                  <div className="text-center p-4 rounded-lg hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5 transition-all duration-300 hover:scale-105">
                    <div className="text-3xl font-bold text-primary mb-2">$2M+</div>
                    <div className="text-muted-foreground">Paid to Sellers</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Values Section */}
          <div ref={valuesRef} className={`scroll-fade-up ${valuesVisible ? 'in-view' : ''}`}>
            <h2 className="text-3xl font-heading font-bold text-primary text-center mb-4">Why Choose WIECODES?</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              We're committed to providing the best platform for template sellers with these core values
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="elegant-card hover:scale-105 hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl mb-4 shadow-md">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <Card className="elegant-card max-w-2xl mx-auto shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Get in Touch</h2>
                <p className="text-muted-foreground mb-6">
                  Have questions about selling on WIECODES? Our team is here to help you succeed.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-all duration-300">
                    <span className="font-semibold text-primary">Email:</span>
                    <span className="text-muted-foreground">sellers@wiecodes.com</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-all duration-300">
                    <span className="font-semibold text-primary">Discord:</span>
                    <span className="text-muted-foreground">Join our seller community</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SellerAbout;
