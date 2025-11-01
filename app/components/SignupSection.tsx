'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { UserPlus, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';

export default function SignupSection() {
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Signup submitted:', formData);
    alert('Account created successfully! Welcome to Taxi Wale Partners.');
  };

  return (
    <section
      id="signup"
      className="py-20 bg-gradient-to-br from-white to-gray-50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-brand-yellow to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <UserPlus size={32} className="text-black" />
            </div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Create Your <span className="text-brand-yellow">Account</span>
          </h2>
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
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>
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
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
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
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
                    placeholder="Enter your phone"
                  />
                </div>
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
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
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
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
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
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                className="h-4 w-4 text-brand-yellow focus:ring-brand-yellow border-gray-300 rounded"
              />
              <label
                htmlFor="agree-terms"
                className="ml-2 block text-sm text-gray-700"
              >
                I agree to the{' '}
                <a href="#" className="text-brand-yellow hover:text-yellow-400">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-brand-yellow hover:text-yellow-400">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-yellow text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Create Account
              <UserPlus size={16} />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => {
                  const element = document.getElementById('login');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="font-medium text-brand-yellow hover:text-yellow-400"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
