
import { useRole } from '@/contexts/RoleContext';
import FeaturedTemplates from '@/components/FeaturedTemplates';
import FreeTemplates from '@/components/FreeTemplates';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import SellerHome from '@/pages/seller/SellerHome';

const Index = () => {
  const { isSeller } = useRole();

  if (isSeller) {
    return <SellerHome />;
  }

  return (
    <div className="min-h-screen animate-fade-in">
      <Header />
      <Hero />
      <div className="py-4 content-overlay">
        <FeaturedTemplates />
      </div>
      <div className="content-overlay">
        <FreeTemplates />
      </div>
      <div className="content-overlay">
        <Stats />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
