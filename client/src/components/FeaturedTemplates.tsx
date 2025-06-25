import React, { useState, useEffect } from 'react';
import { Star, Download, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const FeaturedTemplates = () => {
  const [featuredTemplates, setFeaturedTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    const fetchFeaturedTemplates = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/templates/filter/featured`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        const templatesArray = Array.isArray(data) ? data : data?.data || [];
        setFeaturedTemplates(templatesArray);
      } catch (err) {
        console.error('Error fetching featured templates:', err);
        setError('Failed to load featured templates.');
        setFeaturedTemplates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTemplates();
  }, []);

  return (
    <section className="pb-20 bg-white">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`text-center mb-16 scroll-fade-up ${isVisible ? 'in-view' : ''}`}>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-4 tracking-tight">
            Featured Templates
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hand-picked templates that offer top-notch design and performance
          </p>
        </div>

        {loading && (
          <p className="text-center text-muted-foreground">Loading featured templates...</p>
        )}
        {error && (
          <p className="text-center text-red-500 mb-8">{error}</p>
        )}
        {!loading && !error && featuredTemplates.length === 0 && (
          <p className="text-center text-muted-foreground">No featured templates found.</p>
        )}

        {!loading && !error && featuredTemplates.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredTemplates.map((template, index) => {
              const key = template._id || template.id || index;
              return (
                <Link key={key} to={`/template/${template._id || ''}`}>
                  <Card
                    className={`elegant-card group cursor-pointer scroll-fade-up ${isVisible ? 'in-view' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={template.preview || '/placeholder.png'}
                          alt={template.title || 'Template preview'}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-3 left-3">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            template.isFree ? 'bg-green-600 text-white' : 'bg-primary text-primary-foreground'
                          }`}>
                            {template.isFree ? 'FREE' : 'PREMIUM'}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 classy-button"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground font-medium">
                            {template.framework || 'N/A'}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{template.rating ?? '0'}</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-heading font-semibold text-primary mb-3">
                          {template.title || 'Untitled Template'}
                        </h3>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {Array.isArray(template.tags) && template.tags.length > 0 ? (
                            template.tags.slice(0, 2).map(tag => (
                              <span
                                key={tag}
                                className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full font-medium"
                              >
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-muted-foreground italic">No tags</span>
                          )}
                          {template.tags?.length > 2 && (
                            <span className="text-xs text-muted-foreground">+{template.tags.length - 2}</span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            <Download className="w-4 h-4" />
                            <span className="text-sm">{template.downloads ?? 0}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`text-xl font-heading font-bold ${
                              template.isFree ? 'text-green-600' : 'text-primary'
                            }`}>
                              {template.isFree ? 'FREE' : `₹${template.estimatedPrice}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedTemplates;
