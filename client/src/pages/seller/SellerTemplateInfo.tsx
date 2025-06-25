import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, easeInOut } from 'framer-motion';
import {
  Star, Lock, Eye, ArrowLeft, Heart, Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/Footer';
import { useScrollToTop } from '@/hooks/useScrollAnimation';
import SellerHeader from '@/components/SellerHeader';

const TemplateInfo = () => {
  useScrollToTop();
  const { id } = useParams();
  const [template, setTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [suggestedTemplates, setSuggestedTemplates] = useState<any[]>([]);

  useEffect(() => {
    const fetchTemplateAndSuggestions = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/templates/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'Template not found');
          return;
        }

        setTemplate(data);

        const suggestionsRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/templates/${id}/suggestions`);
        const suggestionsData = await suggestionsRes.json();

        if (suggestionsRes.ok) {
          setSuggestedTemplates(suggestionsData);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        setError('Failed to load template');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplateAndSuggestions();
  }, [id]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error || !template) return <div className="text-center mt-20 text-red-500">{error || 'Template not found'}</div>;

  return (
    <div className="min-h-screen">
      <SellerHeader />
      <main className="py-8">
        <div className="container mx-auto px-4 mb-8">
          <Link to="/seller/profile" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Link>
        </div>

        <motion.section
          className="container mx-auto px-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: easeInOut }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Preview Section */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: easeInOut }}
            >
              <div className="relative group">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${template.previewImageUrl}` || '/default-preview.png'}
                  alt={`${template.title} preview`}
                  className="w-full h-80 object-cover rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300"
                />

                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                <a href={template.liveLink} target="_blank" rel="noreferrer">
                  <Button
                    size="lg"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    Live Preview
                  </Button>
                </a>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4, ease: easeInOut }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">File Structure</h3>
                    <pre className="bg-secondary p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{template.codePreview || '// No File Structure available'}</code>
                    </pre>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Template Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: easeInOut }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground font-medium">{template.framework}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${template.theme === 'Dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
                      {template.theme}
                    </span>
                    <span className="text-xs bg-accent px-2 py-1 rounded-full">{template.platform}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star
                      className="w-5 h-5"
                      style={{
                        fill: template.color || '#ffd602',
                        color: template.color || '#ffd602'
                      }}
                    />
                    <span className="font-medium">{template.rating || 4.5}</span>
                    <span className="text-muted-foreground">({template.downloads || 15} downloads)</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${template.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : template.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                      }`}>
                      {template.status === 'approved'
                        ? 'Approved'
                        : template.status === 'pending'
                          ? 'Review Pending'
                          : template.status}
                    </span>
                  </div>
                </div>

                <h1 className="text-4xl font-bold text-primary mb-4">{template.title}</h1>

                <div className="flex flex-wrap gap-2 mb-6">
                  {(template.tags || []).map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-accent text-accent-foreground px-3 py-1 rounded-full font-medium text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {template.description}
                </p>

                <div className="flex items-center justify-between mb-8 p-6 bg-secondary/50 rounded-lg">
                  <div>
                    <span className="text-3xl font-heading font-bold">
                      {template.estimatedPrice === null ? 'Free' : `₹${template.estimatedPrice}`}
                    </span>
                    <span className="text-muted-foreground ml-2">one-time purchase</span>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                      <Button size="lg">
                        <Lock className="w-4 h-4 mr-2" />
                        Buy Now
                      </Button>
                  </div>
                </div>
              </div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: easeInOut }}
              >
                <Card className="transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Features Included</h3>
                    <ul className="space-y-3">
                      {(template.features || []).map((feature: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: easeInOut }}
              >
                <Card className="transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Technology Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {(template.techStack || []).map((tech: string) => (
                        <span
                          key={tech}
                          className="bg-primary text-primary-foreground px-3 py-2 rounded-lg font-medium text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>


            </motion.div>
          </div>
          {/* Suggested Templates */}
          <section className=" bg-secondary/30 mt-16">
            <h2 className="text-3xl font-heading font-bold text-primary mb-12 text-center">
              Similar Templates You Might Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {suggestedTemplates.map((template, index) => (
                <Link key={template._id} to={`/seller/template/${template._id}`}>
                  <Card className="elegant-card group cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-0">
                      {/* Image Section */}
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}/${template.previewImageUrl}` || '/default-preview.png'}
                          alt={template.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-3 left-3">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${template.theme === 'Dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                            {template.theme}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 flex flex-col items-end space-y-1">
                          <span className="text-xs px-2 py-1 rounded-full font-medium bg-accent text-accent-foreground">{template.platform}</span>
                        </div>

                        <Button
                          size="sm"
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 classy-button"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 space-y-4">
                        {/* Title & Meta */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-heading font-semibold text-primary">{template.title}</h3>
                            </div>

                            <div className="flex items-center space-x-1">
                              <Star
                                className="w-4 h-4"
                                style={{
                                  fill: template.color || '#ffd602',
                                  color: template.color || '#ffd602'
                                }}
                              />
                              <span className="text-sm font-medium">{template.rating || "4.5"}</span>
                            </div>
                          </div>

                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {(template.tags || []).slice(0, 3).map((tag: string) => (
                            <span
                              key={tag}
                              className="bg-accent text-accent-foreground px-2 py-0.5 rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Features */}
                        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                          {(template.features || []).slice(0, 3).map((feature: string, i: number) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <span className={`text-xl font-heading font-bold ${template.estimatedPrice === null ? 'text-green-600' : 'text-primary'}`}>
                            {template.estimatedPrice === null ? 'Free' : `₹${template.estimatedPrice}`}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}

            </div>
          </section>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default TemplateInfo;
