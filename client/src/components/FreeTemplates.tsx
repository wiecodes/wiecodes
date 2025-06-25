import React, { useState, useEffect } from 'react';
import { Star, Download, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const FreeTemplates = () => {
  const [freeTemplates, setFreeTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    const fetchFreeTemplates = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/templates/filter/free`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log('Fetched free templates:', data);

        // Defensive: If the data is an object with a data property, unwrap it
        const templatesArray = Array.isArray(data) ? data : data?.data || [];
        setFreeTemplates(templatesArray);
      } catch (err) {
        console.error('Error fetching free templates:', err);
        setError('Failed to load free templates.');
        setFreeTemplates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFreeTemplates();
  }, []);

  return (
    <section className="pb-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`text-center mb-16 scroll-fade-up ${isVisible ? 'in-view' : ''}`}
          aria-live="polite"
        >
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-4 tracking-tight">
            Free Templates
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started with our collection of premium-quality free templates
          </p>
        </div>

        {loading && (
          <p className="text-center col-span-full text-muted-foreground">Loading templates...</p>
        )}

        {error && (
          <p className="text-center text-red-500 mb-8">{error}</p>
        )}

        {!loading && !error && freeTemplates.length === 0 && (
          <p className="text-center col-span-full text-muted-foreground">No free templates available.</p>
        )}

        {!loading && !error && freeTemplates.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {freeTemplates.map((template, index) => {
              const key = template._id || template.id || index;
              return (
                <Link
                  key={key}
                  to={`/template/${template._id || template.id || ''}`}
                  aria-label={`View details for ${template.title || 'template'}`}
                >
                  <Card
                    className={`elegant-card group cursor-pointer scroll-fade-up ${
                      isVisible ? 'in-view' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    tabIndex={0}
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
                          <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-600 text-white">
                            FREE
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 classy-button"
                          aria-label={`Preview ${template.title || 'template'}`}
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
                            <Star className="w-4 h-4 fill-green-400 text-green-400" />
                            <span className="text-sm font-medium">{template.rating ?? '0'}</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-heading font-semibold text-primary mb-3">
                          {template.title || 'Untitled Template'}
                        </h3>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {Array.isArray(template.tags) && template.tags.length > 0 ? (
                            template.tags.map((tag) => (
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
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            <Download className="w-4 h-4" />
                            <span className="text-sm">{template.downloads ?? 0}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-xl font-heading font-bold text-green-600">FREE</span>
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

        <div className="text-center mt-12">
          <Link to="/templates?filter=free" aria-label="Browse all free templates">
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-primary/20 hover:bg-primary/5"
            >
              Browse Free Templates
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FreeTemplates;
