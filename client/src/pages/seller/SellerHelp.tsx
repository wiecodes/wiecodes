import React from 'react';
import SellerHeader from '@/components/SellerHeader';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, Upload, DollarSign, MessageCircle, FileText } from 'lucide-react';
import useScrollToTop from '@/hooks/useScrollToTop';

const SellerHelp = () => {
  useScrollToTop();
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: sectionsRef, isVisible: sectionsVisible } = useScrollAnimation();

  const helpSections = [
    {
      title: "Getting Started",
      icon: HelpCircle,
      content: "Learn how to set up your seller account, verify your identity, and prepare for your first upload. Our onboarding process ensures you're ready to succeed."
    },
    {
      title: "Upload Guidelines",
      icon: Upload,
      content: "Understand our quality standards, file requirements, and approval process. Follow best practices to ensure your templates get approved quickly."
    },
    {
      title: "Earnings & Payments",
      icon: DollarSign,
      content: "Discover how our commission structure works, when payments are processed, and how to maximize your earnings through our platform."
    },
    {
      title: "Marketing Your Templates",
      icon: FileText,
      content: "Tips and strategies to make your templates stand out, optimize descriptions, and attract more buyers to increase your sales."
    },
    {
      title: "Support & Community",
      icon: MessageCircle,
      content: "Connect with our support team and join our seller community. Get help when you need it and learn from successful sellers."
    }
  ];

  return (
    <div className="min-h-screen animate-fade-in">
      <SellerHeader />
      
      <main className="py-8 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div ref={heroRef} className={`text-center mb-12 scroll-fade-up ${heroVisible ? 'in-view' : ''}`}>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-4 tracking-tight">
              Seller Help Center
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know to succeed as a seller on WIECODES.
            </p>
          </div>

          {/* Help Sections */}
          <div ref={sectionsRef} className={`max-w-4xl mx-auto scroll-fade-up ${sectionsVisible ? 'in-view' : ''}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {helpSections.map((section, index) => (
                <Card key={index} className="bg-white/40 backdrop-blur-sm hover:bg-white/50 hover:scale-105 hover:shadow-xl transition-all duration-500 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl shadow-md backdrop-blur-sm">
                        <section.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-2">{section.title}</h3>
                        <p className="text-muted-foreground text-sm">{section.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* FAQ Section */}
            <Card className="bg-white/40 backdrop-blur-sm hover:bg-white/50 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-8">
                <h2 className="text-2xl font-heading font-bold text-primary mb-6 text-center">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-all duration-500 backdrop-blur-sm">
                    <h3 className="font-semibold text-primary mb-2">How much commission do I earn?</h3>
                    <p className="text-muted-foreground">Standard sellers earn 70% commission on each sale. Premium sellers can earn up to 85%.</p>
                  </div>
                  <div className="p-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-all duration-500 backdrop-blur-sm">
                    <h3 className="font-semibold text-primary mb-2">When do I get paid?</h3>
                    <p className="text-muted-foreground">Payments are processed monthly with a minimum payout of $50 via PayPal or bank transfer.</p>
                  </div>
                  <div className="p-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-all duration-500 backdrop-blur-sm">
                    <h3 className="font-semibold text-primary mb-2">How long does approval take?</h3>
                    <p className="text-muted-foreground">Most templates are reviewed within 24-48 hours. Complex submissions may take up to 5 business days.</p>
                  </div>
                  <div className="p-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-all duration-500 backdrop-blur-sm">
                    <h3 className="font-semibold text-primary mb-2">Can I update my templates after approval?</h3>
                    <p className="text-muted-foreground">Yes, you can update your templates anytime. Updates go through a quick review process.</p>
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

export default SellerHelp;
