import React, { useState, useEffect } from 'react';
import { Star, Download, Eye, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useScrollToTop, useScrollAnimation } from '@/hooks/useScrollAnimation';

const normalizeTemplate = (template) => ({
  _id: template._id,
  title: template.title || 'Untitled Template',
  description: template.description || '',
  price: template.price === null || template.price === 0 || template.price === '₹0'
    ? 'Free'
    : template.price || (template.estimatedPrice ? `₹${template.estimatedPrice}` : 'Free'),
  estimatedPrice: template.estimatedPrice || 0,
  category: template.category || 'General',
  framework: template.framework || 'Unknown',
  platform: template.platform || 'Unknown',
  theme: template.theme || 'Default',
  uploadType: template.uploadType || 'zip',
  zipFilePath: template.zipFilePath || '',
  tags: template.tags?.length ? template.tags : ['General'],
  status: template.status || 'approved',
  uploadedBy: template.uploadedBy || '',
  createdAt: template.createdAt || '',
  updatedAt: template.updatedAt || '',
  rating: template.rating || 4.5,
  downloads: template.downloads ?? 0,
  preview: template.preview || '/placeholder.jpg',
  templateImageUrl: template.previewImageUrl || null,
  color: template.color || null
});

const Templates = () => {
  useScrollToTop();
  const [searchParams] = useSearchParams();
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    price: "all",
    framework: "all",
    platform: "all",
    theme: "all",
    category: "all",
    sortBy: "popular"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const templatesPerPage = 8;
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/templates`);
        const data = await res.json();
        const normalizedData = data.map(normalizeTemplate);
        setTemplates(normalizedData);

        const filterParam = searchParams.get('filter');
        const freshFilters = {
          price: filterParam === 'free' ? 'free' : 'all',
          framework: 'all',
          platform: 'all',
          theme: 'all',
          category: 'all',
          sortBy: 'popular'
        };

        setFilters(freshFilters);
        applyFilters(freshFilters, normalizedData);
      } catch (err) {
        console.error('Error loading templates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [searchParams]);

  const applyFilters = (newFilters, sourceTemplates = templates) => {
    let filtered = [...sourceTemplates];
    if (newFilters.framework !== "all") {
      filtered = filtered.filter(template => template.framework.toLowerCase() === newFilters.framework);
    }
    if (newFilters.platform !== "all") {
      filtered = filtered.filter(template => template.platform.toLowerCase() === newFilters.platform);
    }
    if (newFilters.theme !== "all") {
      filtered = filtered.filter(template => template.theme.toLowerCase() === newFilters.theme);
    }
    if (newFilters.category !== "all") {
      filtered = filtered.filter(template => template.category.toLowerCase().includes(newFilters.category.toLowerCase()));
    }
    if (newFilters.price !== "all") {
      if (newFilters.price === "free") {
        filtered = filtered.filter(template => template.price === "Free" || template.price === "₹0");
      } else {
        const priceValue = parseInt(newFilters.price);
        filtered = filtered.filter(template => {
          if (template.price === "Free") return false;
          const templatePrice = parseInt(template.price.replace('₹', '').replace(',', ''));
          if (priceValue === 2000) return templatePrice <= 2000;
          if (priceValue === 4000) return templatePrice > 2000 && templatePrice <= 4000;
          if (priceValue === 6000) return templatePrice > 4000 && templatePrice <= 6000;
          if (priceValue === 10000) return templatePrice > 6000;
          return true;
        });
      }
    }
    if (newFilters.sortBy === "price-low") {
      filtered.sort((a, b) => {
        if (a.price === "Free") return -1;
        if (b.price === "Free") return 1;
        return parseInt(a.price.replace('₹', '').replace(',', '')) - parseInt(b.price.replace('₹', '').replace(',', ''));
      });
    } else if (newFilters.sortBy === "price-high") {
      filtered.sort((a, b) => {
        if (a.price === "Free") return 1;
        if (b.price === "Free") return -1;
        return parseInt(b.price.replace('₹', '').replace(',', '')) - parseInt(a.price.replace('₹', '').replace(',', ''));
      });
    } else if (newFilters.sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (newFilters.sortBy === "downloads") {
      filtered.sort((a, b) => parseFloat(b.downloads) - parseFloat(a.downloads));
    }
    setFilteredTemplates(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    applyFilters(newFilters, templates);
  };
  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = filteredTemplates.slice(
    indexOfFirstTemplate,
    indexOfLastTemplate
  );
  return (
    <div className="min-h-screen animate-fade-in">
      <Header />
      <main>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            {/* Page Heading */}
            <div ref={headerRef} className={`text-center mb-20 scroll-fade-up ${headerVisible ? 'in-view' : ''}`}>
              <h1 className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-4 tracking-tight">
                Premium Templates
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Professional templates at unbeatable prices - Quality code, modern designs
              </p>
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
            {/* Main Layout */}
            <div className="relative flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filters */}
              <aside className="hidden lg:block w-64 sticky top-24 self-start h-fit max-h-[calc(100vh-6rem)] overflow-y-auto bg-white border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                  <h2 className="text-lg font-semibold text-primary">Filter Templates</h2>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {/* Price */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Price</p>
                    <Select onValueChange={(value) => handleFilterChange('price', value)} value={filters.price}>
                      <SelectTrigger><SelectValue placeholder="Price" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="2000">Under ₹2,000</SelectItem>
                        <SelectItem value="4000">₹2,000 - ₹4,000</SelectItem>
                        <SelectItem value="6000">₹4,000 - ₹6,000</SelectItem>
                        <SelectItem value="10000">₹6,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Framework */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Framework</p>
                    <Select onValueChange={(value) => handleFilterChange('framework', value)} value={filters.framework}>
                      <SelectTrigger><SelectValue placeholder="Framework" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="vue">Vue</SelectItem>
                        <SelectItem value="angular">Angular</SelectItem>
                        <SelectItem value="next">Next.js</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Platform */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Platform</p>
                    <Select onValueChange={(value) => handleFilterChange('platform', value)} value={filters.platform}>
                      <SelectTrigger><SelectValue placeholder="Platform" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="web">Web</SelectItem>
                        <SelectItem value="mobile">Mobile</SelectItem>
                        <SelectItem value="dekstop">Dekstop</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Theme */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Theme</p>
                    <Select onValueChange={(value) => handleFilterChange('theme', value)} value={filters.theme}>
                      <SelectTrigger><SelectValue placeholder="Theme" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Category */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Category</p>
                    <Select onValueChange={(value) => handleFilterChange('category', value)} value={filters.category}>
                      <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="portfolio">Portfolio</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="dashboard">Dashboard</SelectItem>
                        <SelectItem value="landing">Landing Page</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Sort By</p>
                    <Select onValueChange={(value) => handleFilterChange('sortBy', value)} value={filters.sortBy}>
                      <SelectTrigger><SelectValue placeholder="Sort by" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popular">Popular</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                        <SelectItem value="downloads">Downloads</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Clear Filters Button */}
                <div className="mt-6">
                  <Button
                    className="w-full text-white hover:opacity-90 px-4 py-2 rounded-md text-sm font-medium transition"
                    style={{ backgroundColor: '#111111' }}
                    onClick={() => {
                      const defaultFilters = {
                        price: "all",
                        framework: "all",
                        platform: "all",
                        theme: "all",
                        category: "all",
                        sortBy: "popular"
                      };
                      setFilters(defaultFilters);
                      applyFilters(defaultFilters, templates);
                    }}
                  >
                    Clear Filters
                  </Button>




                </div>
              </aside>


              {/* Grid of 8 templates per page */}
              <div className="flex-1" ref={contentRef}>
                {currentTemplates.length === 0 ? (
                  <div className="text-center py-20 text-muted-foreground text-lg">
                    No matched templates found.
                  </div>
                ) : (
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-10 scroll-fade-up ${contentVisible ? 'in-view' : ''
                      }`}
                  >
                    {currentTemplates.map((template, index) => (
                      <Link key={template._id} to={`/template/${template._id}`}>
                        <Card className="elegant-card group cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }}>
                          <CardContent className="p-0">
                            <div className="relative overflow-hidden rounded-t-lg">
                              <img
                                src={`${import.meta.env.VITE_BACKEND_URL}/${template.templateImageUrl}`}
                                alt={template.title}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              <div className="absolute top-3 left-3">
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${template.theme === 'Dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                                  {template.theme}
                                </span>
                              </div>
                              <div className="absolute top-3 right-3">
                                <span className="text-xs px-2 py-1 rounded-full font-medium bg-accent text-accent-foreground">
                                  {template.platform}
                                </span>
                              </div>
                              {template.price === "Free" && (
                                <div className="absolute bottom-3 left-3">
                                  <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-600 text-white">
                                    FREE
                                  </span>
                                </div>
                              )}
                              <Button size="sm" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 classy-button">
                                <Eye className="w-4 h-4 mr-1" />
                                View Details
                              </Button>
                            </div>
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground font-medium">{template.platform}</span>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium">{template.rating}</span>
                                </div>
                              </div>
                              <h3 className="text-lg font-heading font-semibold text-primary mb-3">{template.title}</h3>
                              <div className="flex flex-wrap gap-1 mb-4">
                                {template.tags.slice(0, 2).map((tag) => (
                                  <span key={tag} className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full font-medium hover-scale-slow">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1 text-muted-foreground">
                                  <Download className="w-4 h-4" />
                                  <span className="text-sm">{template.downloads}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <span className={`text-xl font-heading font-bold ${template.price === 'Free' ? 'text-green-600' : 'text-primary'}`}>
                                    {template.price}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {filteredTemplates.length > templatesPerPage && (
                  <div className="flex justify-center mt-10">
                    <nav className="inline-flex space-x-2">
                      {Array.from(
                        {
                          length: Math.ceil(filteredTemplates.length / templatesPerPage)
                        },
                        (_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 rounded-md border text-sm font-medium transition-all duration-300 ${currentPage === i + 1
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-white text-primary border-border hover:bg-gray-100'
                              }`}
                          >
                            {i + 1}
                          </button>
                        )
                      )}
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );

};

export default Templates;
