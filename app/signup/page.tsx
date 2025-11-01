'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import anime from 'animejs';
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import Navigation from '../components/Navigation';

export default function SignupPage() {
  const router = useRouter();
  const { signup, isAuthenticated, loading: authLoading } = useAuth();
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

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

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await signup({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.replace(/\D/g, ''),
        password: formData.password,
      });

      if (result.success) {
        // Redirect to home page after successful signup
        router.push('/');
        router.refresh();
      } else {
        setError(result.error || 'Signup failed. Please try again.');
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
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
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
                <UserPlus size={32} className="text-black" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Create Your <span className="text-brand-yellow">Account</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of drivers, vendors, and agents. Start your journey
              with Taxi Wale Partners today.
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
                  htmlFor="signup-name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="signup-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                      validationErrors.name
                        ? 'border-red-300'
                        : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.name}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="signup-email"
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
                      id="signup-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                        validationErrors.email
                          ? 'border-red-300'
                          : 'border-gray-300'
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="signup-phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="signup-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                        validationErrors.phone
                          ? 'border-red-300'
                          : 'border-gray-300'
                      }`}
                      placeholder="Enter your phone"
                    />
                  </div>
                  {validationErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {validationErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="signup-password"
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
                      id="signup-password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                        validationErrors.password
                          ? 'border-red-300'
                          : 'border-gray-300'
                      }`}
                      placeholder="Create a password"
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
                  {validationErrors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {validationErrors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="signup-confirm-password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock size={20} className="text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="signup-confirm-password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                        validationErrors.confirmPassword
                          ? 'border-red-300'
                          : 'border-gray-300'
                      }`}
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      disabled={isLoading}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center disabled:opacity-50"
                    >
                      {showConfirmPassword ? (
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
                  {validationErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {validationErrors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  required
                  disabled={isLoading}
                  className="h-4 w-4 text-brand-yellow focus:ring-brand-yellow border-gray-300 rounded mt-1 disabled:opacity-50"
                />
                <label
                  htmlFor="agree-terms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I agree to the{' '}
                  <a
                    href="#"
                    className="text-brand-yellow hover:text-yellow-400"
                  >
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a
                    href="#"
                    className="text-brand-yellow hover:text-yellow-400"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-yellow text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <UserPlus size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-medium text-brand-yellow hover:text-yellow-400"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
