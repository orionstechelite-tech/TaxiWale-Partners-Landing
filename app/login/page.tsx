'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import anime from 'animejs';
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import Navigation from '../components/Navigation';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated && !authLoading) {
      router.push('/');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (sectionRef.current) {
      anime({
        targets: sectionRef.current.children,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 800,
        delay: anime.stagger(200),
        easing: 'easeOutExpo',
      });
    }

    if (formRef.current) {
      anime({
        targets: formRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: 600,
        easing: 'easeOutExpo',
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        // Redirect to home page after successful login
        router.push('/');
        router.refresh();
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <Loader2 className="w-8 h-8 animate-spin text-brand-yellow" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />
      <div className="pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Home Button */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-brand-yellow transition-colors duration-200"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
          </div>

          <div ref={sectionRef} className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-yellow to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <LogIn size={32} className="text-black" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Welcome <span className="text-brand-yellow">Back</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sign in to your account to access your dashboard and manage your
              business.
            </p>
          </div>

          <div
            ref={formRef}
            className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="login-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="login-password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff
                        size={20}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    ) : (
                      <Eye
                        size={20}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    disabled={isLoading}
                    className="h-4 w-4 text-brand-yellow focus:ring-brand-yellow border-gray-300 rounded disabled:opacity-50"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <button
                    type="button"
                    className="font-medium text-brand-yellow hover:text-yellow-400 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-yellow text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <LogIn size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link
                  href="/signup"
                  className="font-medium text-brand-yellow hover:text-yellow-400"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
