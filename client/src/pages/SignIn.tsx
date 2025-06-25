import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import '@/firebase';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const firebaseUser = userCredential.user;

      if (!firebaseUser.emailVerified) {
        return toast.error('Please verify your email before logging in.');
      }

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/firebase-login`, {
        email: firebaseUser.email,
        uid: firebaseUser.uid,
        username: firebaseUser.displayName || 'Anonymous User',
      });

      const { token, user } = res.data;

      if (user.status === 'banned') {
        await auth.signOut(); // Log out from Firebase too
        return toast.error('Your account has been banned.');
      }

      login(token);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/firebase-login`, {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        username: firebaseUser.displayName || 'Google User',
      });

      const { token, user } = res.data;

      if (user.status === 'banned') {
        await auth.signOut();
        return toast.error('Your account has been banned.');
      }

      login(token);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Signed in with Google');
      navigate('/');
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Google sign-in failed');
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20 content-overlay">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="elegant-card">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-heading font-bold text-primary">
                  Welcome Back
                </CardTitle>
                <p className="text-muted-foreground">Sign in to your WIECODES account</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <form className="space-y-4" onSubmit={handleSubmit}>
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="remember" className="rounded border-border" />
                      <label htmlFor="remember" className="text-sm text-muted-foreground">
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <Button className="w-full classy-button" type="submit">
                    Sign In
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
                  <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
                    <Chrome className="w-4 h-4 mr-2" />
                    Google
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{' '}
                  <Link to="/signup" className="text-primary hover:underline font-medium">
                    Sign up
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

export default SignIn;
