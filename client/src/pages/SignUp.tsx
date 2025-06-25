import React, { useState } from 'react';
import { Mail, Lock, User, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import axios from 'axios';

import { auth } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await sendEmailVerification(userCredential.user);

      toast.success('Verification email sent. Please check your inbox.');
      navigate('/signin');
    } catch (error) {
      toast.error(error.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/firebase-login`, {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        username: firebaseUser.displayName || 'Google User',
      });

      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Signed up with Google');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Google sign-in failed');
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="elegant-card">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-heading font-bold text-primary">
                  Join WIECODES
                </CardTitle>
                <p className="text-muted-foreground">
                  Create your account to access premium templates
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter password"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button className="w-full classy-button" type="submit" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div>
                  <Button variant="outline" className="w-full" onClick={handleGoogleSignUp}>
                    <Chrome className="w-4 h-4 mr-2" />
                    Google
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/signin" className="text-primary hover:underline font-medium">
                    Sign in
                  </Link>
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

export default SignUp;
