
import React from 'react';
import { Heart, Users, Award, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useScrollToTop, useScrollAnimation } from '@/hooks/useScrollAnimation';

const About = () => {
  useScrollToTop();
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();
  const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation();
  const { ref: companyRef, isVisible: companyVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen animate-fade-in">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-8 bg-gradient-to-br from-white via-secondary/20 to-accent/30">
          <div className="container mx-auto px-4">
            <div ref={heroRef} className={`max-w-3xl mx-auto text-center scroll-fade-up ${heroVisible ? 'in-view' : ''}`}>
              <h1 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-4 tracking-tight">
                About WIECODES
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We create beautiful, functional templates 
                that help developers build amazing projects faster.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To empower developers worldwide by providing high-quality, 
                well-documented templates that save time and inspire creativity.
              </p>
            </div>

            {/* Values Grid */}
            <div ref={valuesRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 scroll-scale ${valuesVisible ? 'in-view' : ''}`}>
              <Card className="elegant-card text-center">
                <CardContent className="p-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-primary mb-2">Quality First</h3>
                  <p className="text-sm text-muted-foreground">
                    Every template follows industry best practices.
                  </p>
                </CardContent>
              </Card>

              <Card className="elegant-card text-center">
                <CardContent className="p-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-primary mb-2">Community</h3>
                  <p className="text-sm text-muted-foreground">
                    Building a community of developers who support each other.
                  </p>
                </CardContent>
              </Card>

              <Card className="elegant-card text-center">
                <CardContent className="p-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-primary mb-2">Excellence</h3>
                  <p className="text-sm text-muted-foreground">
                    We strive for excellence in code quality and support.
                  </p>
                </CardContent>
              </Card>

              <Card className="elegant-card text-center">
                <CardContent className="p-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-primary mb-2">Innovation</h3>
                  <p className="text-sm text-muted-foreground">
                    Constantly exploring new technologies and trends.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Story Section */}
            <div ref={storyRef} className={`bg-secondary/30 rounded-lg p-4 text-center mb-8 scroll-fade-up ${storyVisible ? 'in-view' : ''}`}>
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">Our Story</h2>
              <div className="max-w-2xl mx-auto text-muted-foreground space-y-3 text-sm">
                <p>
                  WIECODES was born from the frustration of spending countless hours building the same 
                  components over and over again. We realized developers worldwide were facing similar challenges.
                </p>
                <p>
                  What started as a small collection of personal templates has grown into a comprehensive 
                  library of professionally designed templates.
                </p>
                <p>
                  Today, we're proud to serve thousands of developers around the world, helping them 
                  build better projects faster.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Company Information Sections */}
        <section className="py-8 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div ref={companyRef} className={`max-w-4xl mx-auto space-y-8 scroll-fade-up ${companyVisible ? 'in-view' : ''}`}>
              {/* About Us */}
              <div id="about-us" className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">About Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  WIECODES is a leading provider of premium web development templates. 
                  Founded with a mission to accelerate development workflows, we serve thousands of developers worldwide.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our team consists of experienced developers, designers, and product experts who understand 
                  the challenges of modern web development. We're committed to creating tools that not only 
                  save time but also inspire creativity and innovation in every project.
                </p>
              </div>

              {/* Careers */}
              <div id="careers" className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Careers</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Join our passionate team of developers, designers, and innovators. We're always looking 
                  for talented individuals who share our vision of making web development more efficient and enjoyable.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We offer competitive salaries, flexible working arrangements, comprehensive health benefits, 
                  and opportunities for professional growth. Our culture values creativity, collaboration, and continuous learning.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Currently, we have openings for Frontend Developers, UI/UX Designers, and DevOps Engineers. 
                  Check our careers page for the latest opportunities and application details.
                </p>
              </div>

              {/* Privacy Policy */}
              <div id="privacy-policy" className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Your privacy is important to us. This policy explains how we collect, use, and protect 
                  your personal information when you use our services.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect only the information necessary to provide our services, including account details, 
                  usage analytics, and payment information. We never sell your personal data to third parties 
                  and use industry-standard encryption to protect your information.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You have the right to access, modify, or delete your personal data at any time. 
                  For detailed information about our data practices, please contact our privacy team.
                </p>
              </div>

              {/* Terms of Service */}
              <div id="terms-of-service" className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">Terms of Service</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These terms govern your use of WIECODES services. By accessing our platform, 
                  you agree to comply with these terms and conditions.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our templates are licensed for commercial and personal use. 
                  You may modify and distribute the code, but you cannot resell our original templates 
                  as standalone products without permission.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to terminate accounts that violate our terms or engage in 
                  fraudulent activities. For disputes, we encourage communication through our support channels.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
