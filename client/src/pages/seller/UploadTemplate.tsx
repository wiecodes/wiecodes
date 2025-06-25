import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, Github, Plus, X } from 'lucide-react';
import SellerHeader from '@/components/SellerHeader';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { useScrollToTop, useScrollAnimation } from '@/hooks/useScrollAnimation';

const UploadTemplate = () => {
  useScrollToTop();
  const { ref: uploadRef, isVisible: uploadVisible } = useScrollAnimation();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubRepo: '',
    estimatedPrice: '',
    category: '',
    framework: '',
    platform: '',
    theme: '',
    tags: [],
    features: [],
    techStack: [],
    codePreview: '',
    liveLink: '',
    previewImage: null,
  });

  const [newTag, setNewTag] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newTech, setNewTech] = useState('');
  const [uploadType, setUploadType] = useState('github');
  const [zipFile, setZipFile] = useState(null);

  const categories = ['Dashboard', 'Landing Page', 'E-commerce', 'Portfolio', 'Blog', 'Other'];
  const frameworks = ['React', 'Vue.js', 'Angular', 'Vanilla JS', 'Next.js', 'Other'];
  const platforms = ['Web', 'Mobile', 'Desktop', 'Other'];
  const themes = ['Light', 'Dark', 'Both', 'Other'];

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const removeTag = (tag) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData({ ...formData, features: [...formData.features, newFeature.trim()] });
      setNewFeature('');
    }
  };

  const removeFeature = (feature) => {
    setFormData({ ...formData, features: formData.features.filter((f) => f !== feature) });
  };

  const addTech = () => {
    if (newTech.trim() && !formData.techStack.includes(newTech.trim())) {
      setFormData({ ...formData, techStack: [...formData.techStack, newTech.trim()] });
      setNewTech('');
    }
  };

  const removeTech = (tech) => {
    setFormData({ ...formData, techStack: formData.techStack.filter((t) => t !== tech) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return toast.error('You must be logged in to upload a template');

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('estimatedPrice', formData.estimatedPrice);
    form.append('category', formData.category);
    form.append('framework', formData.framework);
    form.append('platform', formData.platform);
    form.append('theme', formData.theme);
    form.append('tags', JSON.stringify(formData.tags));
    form.append('features', JSON.stringify(formData.features));
    form.append('techStack', JSON.stringify(formData.techStack));
    form.append('codePreview', formData.codePreview);
    form.append('liveLink', formData.liveLink);
    form.append('uploadType', uploadType);

    if (formData.previewImage) {
      form.append('previewImage', formData.previewImage);
    }

    if (uploadType === 'github') {
      form.append('githubRepo', formData.githubRepo);
    } else {
      if (zipFile) {
        form.append('zipFile', zipFile);
      } else {
        toast.error('Please select a ZIP file to upload');
        return;
      }
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/templates/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      const result = await res.json();
      if (result.success) {
        toast.success(result.message || 'Template uploaded');
        setFormData({
          title: '',
          description: '',
          githubRepo: '',
          estimatedPrice: '',
          category: '',
          framework: '',
          platform: '',
          theme: '',
          tags: [],
          features: [],
          techStack: [],
          codePreview: '',
          liveLink: '',
          previewImage: null,
        });
        setZipFile(null);
        setNewTag('');
        setNewFeature('');
        setNewTech('');
      } else {
        toast.error(result.message || 'Upload failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Upload error');
    }
  };

  return (
    <div className="min-h-screen animate-fade-in">
      <SellerHeader />
      <main>
        <section className="py-12 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">Upload New Template</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Share your creative work with thousands of developers worldwide
            </p>
          </div>
        </section>

        {/* <section className="py-6">
          <div className="container mx-auto px-4 max-w-4xl flex space-x-4 justify-center">
            <button
              type="button"
              className={`px-6 py-2 rounded ${uploadType === 'github' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setUploadType('github')}
            >
              GitHub Repository
            </button>
            <button
              type="button"
              className={`px-6 py-2 rounded ${uploadType === 'zip' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setUploadType('zip')}
            >
              Upload ZIP File
            </button>
          </div>
        </section> */}

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div ref={uploadRef} className={`scroll-fade-up ${uploadVisible ? 'in-view' : ''}`}>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <Card>
                      <CardContent className="p-6 space-y-4">
                        <h3 className="text-xl font-semibold text-primary">Template Details</h3>

                        <Input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Template Title * (suggested)" />
                        <Textarea required rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Template Description * (suggested)" />

                        {uploadType === 'github' ? (
                          <Input required value={formData.githubRepo} onChange={(e) => setFormData({ ...formData, githubRepo: e.target.value })} placeholder="Public GitHub Repo URL * (used for upload)" />
                        ) : (
                          <Input required type="file" accept=".zip" onChange={(e) => setZipFile(e.target.files[0])} />
                        )}

                        <Input value={formData.estimatedPrice} onChange={(e) => setFormData({ ...formData, estimatedPrice: e.target.value })} placeholder="Estimated Price * (suggested)" required />
                        <Input value={formData.liveLink} onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })} placeholder="Live Website Link (optional)" />
                        <Textarea rows={6} value={formData.codePreview} onChange={(e) => setFormData({ ...formData, codePreview: e.target.value })} placeholder="File Structure (optional)" />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6 space-y-4">
                        <h3 className="text-xl font-semibold text-primary">Categories & Tags</h3>

                        <div className="grid grid-cols-2 gap-4">
                          <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                            <SelectTrigger><SelectValue placeholder="Category *" /></SelectTrigger>
                            <SelectContent>{categories.map((cat) => <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>)}</SelectContent>
                          </Select>

                          <Select value={formData.framework} onValueChange={(v) => setFormData({ ...formData, framework: v })}>
                            <SelectTrigger><SelectValue placeholder="Framework *" /></SelectTrigger>
                            <SelectContent>{frameworks.map((fw) => <SelectItem key={fw} value={fw.toLowerCase()}>{fw}</SelectItem>)}</SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <Select value={formData.platform} onValueChange={(v) => setFormData({ ...formData, platform: v })}>
                            <SelectTrigger><SelectValue placeholder="Platform *" /></SelectTrigger>
                            <SelectContent>{platforms.map((pf) => <SelectItem key={pf} value={pf.toLowerCase()}>{pf}</SelectItem>)}</SelectContent>
                          </Select>

                          <Select value={formData.theme} onValueChange={(v) => setFormData({ ...formData, theme: v })}>
                            <SelectTrigger><SelectValue placeholder="Theme *" /></SelectTrigger>
                            <SelectContent>{themes.map((th) => <SelectItem key={th} value={th.toLowerCase()}>{th}</SelectItem>)}</SelectContent>
                          </Select>
                        </div>

                        {/* Tags */}
                        <div className="flex space-x-2">
                          <Input value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Add tag" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} />
                          <Button type="button" onClick={addTag}><Plus className="w-4 h-4" /></Button>
                        </div>
                        <div className="flex flex-wrap gap-2">{formData.tags.map((tag, i) => (
                          <Badge key={i} className="flex items-center space-x-1 text-sm">
                            <span>{tag}</span><button onClick={() => removeTag(tag)}><X className="w-3 h-3" /></button>
                          </Badge>
                        ))}</div>

                        {/* Features */}
                        <h4 className="font-semibold text-primary">Features</h4>
                        <div className="flex space-x-2">
                          <Input value={newFeature} onChange={(e) => setNewFeature(e.target.value)} placeholder="Add feature" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())} />
                          <Button type="button" onClick={addFeature}><Plus className="w-4 h-4" /></Button>
                        </div>
                        <div className="flex flex-wrap gap-2">{formData.features.map((f, i) => (
                          <Badge key={i} className="flex items-center space-x-1 text-sm">
                            <span>{f}</span><button onClick={() => removeFeature(f)}><X className="w-3 h-3" /></button>
                          </Badge>
                        ))}</div>

                        {/* Tech Stack */}
                        <h4 className="font-semibold text-primary">Tech Stack</h4>
                        <div className="flex space-x-2">
                          <Input value={newTech} onChange={(e) => setNewTech(e.target.value)} placeholder="Add tech" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())} />
                          <Button type="button" onClick={addTech}><Plus className="w-4 h-4" /></Button>
                        </div>
                        <div className="flex flex-wrap gap-2">{formData.techStack.map((t, i) => (
                          <Badge key={i} className="flex items-center space-x-1 text-sm">
                            <span>{t}</span><button onClick={() => removeTech(t)}><X className="w-3 h-3" /></button>
                          </Badge>
                        ))}</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardContent className="p-6 text-sm text-muted-foreground space-y-2">
                        <h3 className="text-lg font-semibold text-primary">
                          Note:
                        </h3>
                        <ul className="list-disc list-inside space-y-1">
                          <li><span className="text-foreground font-semibold">Only the GitHub Repository</span> will be used for uploading the template live.</li>
                          <li>All other details (title, description, price, tags, etc.) are suggestions and can be changed by our team.</li>
                          <li>Fields marked with <span className="text-destructive">*</span> are required.</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6 text-sm text-muted-foreground space-y-2">
                        <h3 className="text-lg font-semibold text-primary">Upload Process</h3>
                        <p>1. Fill in all required details</p>
                        <p>2. Wait for admin review</p>
                        <p>3. Template will be published</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6 text-sm text-muted-foreground">
                        <h3 className="text-lg font-semibold text-primary mb-2">Guidelines</h3>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Clean, documented code</li>
                          <li>README with setup</li>
                          <li>List dependencies</li>
                          <li>Test before uploading</li>
                          <li>Use appropriate license</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Button type="submit" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Submit Template
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UploadTemplate;
