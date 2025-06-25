import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Edit,
  Star,
  Download,
  Clock,
  Globe,
  Eye,
  Trash,
  FileText,
  Wallet,
  ShoppingCart,
  Gift,
} from "lucide-react";
import { Link } from "react-router-dom";
import SellerHeader from "@/components/SellerHeader";
import Footer from "@/components/Footer";
import EditProfileModal from "@/components/EditProfileModal";

type TemplateType = {
  _id: string;
  title: string;
  description?: string;
  status: string;
  estimatedPrice?: number;
  price?: string;
  preview?: string;
  framework?: string;
  platform?: string;
  theme?: string;
  rating?: number;
  downloads?: number;
  tags: string[];
  previewImageUrl: string;
  isFree: boolean;
};

type ProfileType = {
  username: string;
  bio?: string;
  joinDate?: string;
  rating?: number;
  reviewCount?: number;
  location?: string;
  publicTemplates?: TemplateType[];
  pendingTemplates?: TemplateType[];
  earnings?: number;
  sales?: number;
  freeTemplates?: number;
};

const SellerProfile = () => {
  const { token } = useAuth();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    async function fetchUserProfile() {
      try {
        setError(null);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch profile: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        setProfile({ ...data, createdAt: data.joinDate });
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [token]);

  if (!loading && !profile) return <div>Please login to see your profile.</div>;

  if (!profile) return null; // or a fallback UI
  
  const freeTemplateCount =
    profile.publicTemplates?.filter(
      (t) => t.estimatedPrice === 0 || t.isFree === true
    )?.length ?? 0;
  


  const getInitials = (name: string): string =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase();

  const handleDeleteTemplate = async (templateId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this template?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/templates/${templateId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete template");
      }

      setProfile((prevProfile) => {
        if (!prevProfile) return prevProfile;
        return {
          ...prevProfile,
          publicTemplates: prevProfile.publicTemplates?.filter((t) => t._id !== templateId),
          pendingTemplates: prevProfile.pendingTemplates?.filter((t) => t._id !== templateId),
        };
      });
    } catch (err) {
      console.error(err);
      alert("Failed to delete template");
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!profile) return <div>Please login to see your profile.</div>;

  const initials = profile.username ? getInitials(profile.username) : "US";

  const getTemplateImageUrl = (url?: string): string => {
    if (!url) return "/default-preview.png";
    return url.startsWith("http") ? url : `${import.meta.env.VITE_BACKEND_URL}/${url}`;
  };

  const renderTemplateCard = (template: TemplateType, index: number) => (
    <div key={template._id} className="relative group">
      <Link to={`/seller/template/${template._id}`}>
        <Card
          className="elegant-card group cursor-pointer"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-0">
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={getTemplateImageUrl(template.previewImageUrl)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/default-preview.png";
                }}
                alt={`${template.title} preview`}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-3 left-3">
                <span className="text-xs px-2 py-1 rounded-full font-medium bg-accent text-accent-foreground">
                  {template.platform}
                </span>
              </div>
              <div className="absolute bottom-3 right-3">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${template.theme === 'Dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                  {template.theme}
                </span>
              </div>
              <Button
                size="sm"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 classy-button"
              >
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </Button>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground font-medium">
                  {template.framework}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4  text-yellow-400" />
                  <span className="text-sm font-medium">{template.rating ?? 4.5}</span>
                </div>
              </div>

              <h3 className="text-lg font-heading font-semibold text-primary mb-3">
                {template.title}
              </h3>

              <div className="flex flex-wrap gap-1 mb-4">
                {template.tags?.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full font-medium hover-scale-slow"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">{template.downloads ?? 0}</span>
                </div>
                <span className={`text-xl font-heading font-bold ${template.estimatedPrice === null ? 'text-green-600' : 'text-primary'}`}>
                  {template.estimatedPrice === 0 ? 'Free' : `₹${template.estimatedPrice}`}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10 bg-white/70 hover:bg-red-100"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleDeleteTemplate(template._id);
        }}
      >
        <Trash className="w-4 h-4 text-red-500" />
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen animate-fade-in">
      <SellerHeader />
      <main>
        <section className="py-8 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-8">
              <div className="w-24 h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-3xl font-bold">
                {initials}
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
                  <h1 className="text-3xl font-heading font-bold text-primary">{profile.username}</h1>
                  <EditProfileModal
                    profile={profile}
                    onUpdate={(updatedProfile) => setProfile(updatedProfile)}
                  >
                    <Button variant="outline" size="sm" className="mt-2 md:mt-0">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </EditProfileModal>
                </div>
                <p className="text-muted-foreground mb-4 max-w-2xl">
                  {profile.bio || "Passionate web developer creating modern templates."}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>🗓 Joined: {profile.joinDate ? new Date(profile.joinDate).toLocaleDateString() : "Unknown"}</span>
                  <span>⭐ Rating: {profile.rating ?? 4.8} ({profile.reviewCount ?? 0} reviews)</span>
                  <span>📍 {profile.location || "Unknown"}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-all duration-200 w-full">
              <CardContent className="p-5 flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground">Templates</h3>
                  <p className="text-2xl font-bold text-primary">
                    {profile.publicTemplates?.length ?? 0}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 w-full">
              <CardContent className="p-5 flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground">Your Earnings</h3>
                  <p className="text-2xl font-bold text-purple-600">₹{profile.earnings ?? 0}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 w-full">
              <CardContent className="p-5 flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground">Sales</h3>
                  <p className="text-2xl font-bold text-blue-600">{profile.sales ?? 0}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 w-full">
              <CardContent className="p-5 flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground">Free Templates</h3>
                  <p className="text-2xl font-bold text-green-600">{freeTemplateCount}</p>
                </div>
              </CardContent>
            </Card>

          </div>
        </section>

        <section className="container mx-auto px-4 mt-12 mb-12">
          <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Public Templates
          </h2>
          {profile.publicTemplates?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.publicTemplates.map((template, index) => renderTemplateCard(template, index))}
            </div>
          ) : (
            <p className="text-muted-foreground">No public templates yet.</p>
          )}

          <h2 className="text-2xl mt-12 font-heading font-bold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Pending Templates
          </h2>
          {profile.pendingTemplates?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.pendingTemplates.map((template, index) => renderTemplateCard(template, index))}
            </div>
          ) : (
            <p className="text-muted-foreground">No pending templates.</p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SellerProfile;
