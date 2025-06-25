import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Eye, Upload, Save, CheckCircle } from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner'; // ✅ Updated
import { Switch } from '@/components/ui/switch';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useScrollToTop } from '@/hooks/useScrollAnimation';

const ManageTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  useScrollToTop();

  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const [formData, setFormData] = useState({
    title: '',
    description: '',
    estimatedPrice: '',
    category: '',
    framework: '',
    theme: 'Light',
    platform: 'Web',
    tags: '',
    features: '',
    techStack: '',
    liveLink: '',
    color: '',
    isFree: false,
    isFeatured: false,
  });

  const [newScreenshot, setNewScreenshot] = useState('');


  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/templates/${id}`);
        const data = await res.json();
        setTemplate(data);
        setFormData({
          title: data.title || '',
          description: data.description || '',
          estimatedPrice: data.estimatedPrice?.toString() || '',
          category: data.category || '',
          framework: data.framework || '',
          theme: data.theme || 'Light',
          platform: data.platform || 'Web',
          tags: data.tags?.join(', ') || '',
          features: data.features?.join('\n') || '',
          techStack: data.techStack?.join(', ') || '',
          liveLink: data.liveLink || '',
          color: data.color || '',
          isFree: data.isFree || false,
          isFeatured: data.isFeatured || false,
        });
      } catch {
        toast.error('Could not load template.');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // Compute isFree based on estimatedPrice input
    const isFree = formData.isFree;
    const numericPrice = isFree ? 0 : Number(formData.estimatedPrice.trim());

    if (!isFree && isNaN(numericPrice)) {
      toast.error('Please enter a valid number for price or type "Free".');
      return;
    }


    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/templates/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          estimatedPrice: numericPrice,
          isFree,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
          techStack: formData.techStack.split(',').map(tech => tech.trim()).filter(Boolean),
          features: formData.features.split('\n').map(f => f.trim()).filter(Boolean),
          preview: newScreenshot || template.preview,
        }),
      });

      if (!response.ok) throw new Error('Failed to update');
      if (!isFree && isNaN(numericPrice)) {
        toast.error('Please enter a valid number for price or type "Free".');
        return;
      }
      toast.success('Template updated successfully');
    } catch (err) {
      toast.error('Failed to update template');
      console.error('handleSave error:', err);
    }
  };



  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this template?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/templates/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete');

      toast.success('Template deleted successfully');
      navigate('/admin');
    } catch {
      toast.error('Failed to delete template');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading template...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Manage Template</h1>
          </div>
          <div className="flex space-x-2">
            <Link to={`/template/${template._id}`}>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </Link>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <InputSection label="Template Title" value={formData.title} onChange={e => handleInputChange('title', e.target.value)} />
                <TextareaSection label="Description" value={formData.description} onChange={e => handleInputChange('description', e.target.value)} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SelectSection label="Category" value={formData.category} onValueChange={val => handleInputChange('category', val)} items={['E-commerce', 'Landing Page', 'Dashboard', 'Portfolio', 'Blog', 'Social Media']} />
                  <InputSection label="Price" value={formData.estimatedPrice} onChange={e => handleInputChange('estimatedPrice', e.target.value)} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Technical Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <SelectSection label="Framework" value={formData.framework} onValueChange={val => handleInputChange('framework', val)} items={['React', 'Vue', 'Angular', 'Next.js', 'HTML', 'React Native', 'Flutter']} />
                  <SelectSection label="Theme" value={formData.theme} onValueChange={val => handleInputChange('theme', val)} items={['Light', 'Dark']} />
                  <SelectSection label="Platform" value={formData.platform} onValueChange={val => handleInputChange('platform', val)} items={['Desktop', 'Web', 'Mobile', 'iOS', 'Android']} />
                </div>

                <SelectSection
                  label="Quality Color"
                  value={formData.color}
                  onValueChange={(val) => handleInputChange('color', val)}
                  items={['Gold', 'Blue', 'Green', 'Orange']}
                />

                <InputSection label="Tags (comma separated)" value={formData.tags} onChange={e => handleInputChange('tags', e.target.value)} />
                <InputSection label="Tech Stack" value={formData.techStack} onChange={e => handleInputChange('techStack', e.target.value)} />
                <InputSection label="Live Demo URL" value={formData.liveLink} onChange={e => handleInputChange('liveLink', e.target.value)} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Features</CardTitle></CardHeader>
              <CardContent>
                <TextareaSection label="Features (one per line)" value={formData.features} onChange={e => handleInputChange('features', e.target.value)} rows={6} />
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Template Status</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between"><span>Status:</span><Badge variant="secondary">{template.status}</Badge></div>
                  <div className="flex justify-between"><span>Sales:</span><span>{template.downloads || 0}</span></div>
                  <div className="flex justify-between"><span>Rating:</span><span>{template.rating || 0}/5</span></div>
                  <div className="flex items-center justify-between">
                    <span>Is Free?</span>
                    <Switch
                      checked={formData.isFree}
                      onCheckedChange={(val) => handleInputChange('isFree', val)}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span>Featured?</span>
                    <Switch
                      checked={formData.isFeatured}
                      onCheckedChange={(val) => handleInputChange('isFeatured', val)}
                    />
                  </div>


                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Current Preview</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={async () => {
                      if (!selectedFile) {
                        toast.error('No file selected');
                        return;
                      }

                      const formDataUpload = new FormData();
                      formDataUpload.append('previewImage', selectedFile);

                      try {
                        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/templates/upload/preview/${id}`, {
                          method: 'POST',
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                          body: formDataUpload,
                        });

                        const data = await res.json();
                        if (!res.ok) throw new Error(data.message || 'Upload failed');

                        setTemplate(prev => ({
                          ...prev,
                          previewImageUrl: data.template.previewImageUrl,
                        }));

                        setFormData(prev => ({
                          ...prev,
                          previewImageUrl: data.template.previewImageUrl,
                        }));

                        setSelectedFile(null);
                        toast.success('Screenshot uploaded successfully');
                      } catch (err: any) {
                        toast.error(err.message || 'Upload failed');
                      }
                    }}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Screenshot
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
              <CardContent>
                <Button onClick={handleSave} className="w-full">
                  <Save className="w-4 h-4 mr-2" /> Save Changes
                </Button>
                <Button
  onClick={async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/templates/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to approve');

      toast.success('Template approved successfully');
      setTemplate(prev => ({ ...prev, status: 'approved' }));
      navigate('/admin?tab=reviews');

    } catch {
      toast.error('Failed to approve template');
    }
  }}
  className="w-full bg-green-600 hover:bg-green-700 text-white mt-2"
  disabled={template.status === 'approved'}
>
  <CheckCircle className="w-4 h-4 mr-2" />
  Approve Template
</Button>



              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable form components
const InputSection = ({ label, value, onChange }: any) => (
  <div>
    <Label>{label}</Label>
    <Input value={value} onChange={onChange} />
  </div>
);

const TextareaSection = ({ label, value, onChange, rows = 4 }: any) => (
  <div>
    <Label>{label}</Label>
    <Textarea value={value} onChange={onChange} rows={rows} />
  </div>
);

const SelectSection = ({ label, value, onValueChange, items }: any) => (
  <div>
    <Label>{label}</Label>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger><SelectValue placeholder={`Select ${label}`} /></SelectTrigger>
      <SelectContent>
        {items.map((item: string) => (
          <SelectItem key={item} value={item}>{item}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default ManageTemplate;
