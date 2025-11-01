'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import {
  ArrowRight,
  Play,
  CheckCircle,
  Users,
  MapPin,
  Shield,
} from 'lucide-react';
import { useDemoModal } from '../context/DemoModalContext';

export default function ClosingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const handshakeRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const { openModal } = useDemoModal();

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

    if (handshakeRef.current) {
      anime({
        targets: handshakeRef.current,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 1000,
        delay: 600,
        easing: 'easeOutElastic(1, .8)',
      });
    }

    if (featuresRef.current) {
      anime({
        targets: featuresRef.current.children,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(150, { start: 1000 }),
        easing: 'easeOutExpo',
      });
    }
  }, []);

  const finalFeatures = [
    {
      icon: Users,
      title: 'Join 10,000+ Drivers',
      description: "Be part of India's largest taxi network",
    },
    {
      icon: MapPin,
      title: '50+ Cities',
      description: 'Operate across major Indian cities',
    },
    {
      icon: Shield,
      title: '100% Secure',
      description: 'Bank-grade security for all transactions',
    },
  ];

  return (
    <section
      id="closing"
      className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23facc15' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div ref={sectionRef} className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Be Part of India's Most{' '}
              <span className="text-brand-yellow">Trusted Taxi Network</span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
              Join thousands of drivers, vendors, and agents who have
              transformed their business with our platform.
            </p>

            {/* Final Features */}
            <div ref={featuresRef} className="space-y-4 mb-8">
              {finalFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4"
                    data-animation="fadeInUp"
                  >
                    <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center">
                      <IconComponent size={20} className="text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-brand-yellow text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                Join Now
                <ArrowRight size={20} />
              </button>

              <button
                onClick={openModal}
                className="border-2 border-brand-yellow text-brand-yellow px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-yellow hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Play size={20} />
                Request Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-400" />
                <span className="text-gray-300">Free to Join</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-400" />
                <span className="text-gray-300">No Setup Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-400" />
                <span className="text-gray-300">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Content - Handshake Visualization */}
          <div className="relative">
            <div
              ref={handshakeRef}
              className="relative w-full h-96 lg:h-[500px]"
            >
              {/* Main Handshake Scene */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl flex items-center justify-center">
                {/* Handshake Illustration */}
                <div className="relative">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-brand-yellow rounded-full opacity-20 blur-3xl scale-150"></div>

                  {/* Handshake Icons */}
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="text-8xl lg:text-9xl">🤝</div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-8 -left-8 w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center animate-float">
                    <span className="text-black font-bold text-2xl">🚕</span>
                  </div>
                  <div
                    className="absolute -bottom-8 -right-8 w-16 h-16 bg-white rounded-full flex items-center justify-center animate-float"
                    style={{ animationDelay: '1s' }}
                  >
                    <span className="text-brand-yellow font-bold text-2xl">
                      💰
                    </span>
                  </div>
                  <div
                    className="absolute top-1/2 -left-12 w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center animate-float"
                    style={{ animationDelay: '2s' }}
                  >
                    <span className="text-black font-bold">⭐</span>
                  </div>
                  <div
                    className="absolute top-1/2 -right-12 w-12 h-12 bg-white rounded-full flex items-center justify-center animate-float"
                    style={{ animationDelay: '3s' }}
                  >
                    <span className="text-brand-yellow font-bold">🔒</span>
                  </div>
                </div>
              </div>

              {/* Network Lines */}
              <div className="absolute inset-0 pointer-events-none">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <defs>
                    <linearGradient
                      id="finalGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#facc15" stopOpacity="0.6" />
                      <stop
                        offset="100%"
                        stopColor="#facc15"
                        stopOpacity="0.2"
                      />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="200"
                    cy="200"
                    r="150"
                    fill="none"
                    stroke="url(#finalGradient)"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="100"
                    fill="none"
                    stroke="url(#finalGradient)"
                    strokeWidth="1"
                    className="animate-pulse"
                    style={{ animationDelay: '1s' }}
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="50"
                    fill="none"
                    stroke="url(#finalGradient)"
                    strokeWidth="1"
                    className="animate-pulse"
                    style={{ animationDelay: '2s' }}
                  />
                </svg>
              </div>
            </div>

            {/* Logo/Brand */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-yellow rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-lg">T</span>
                </div>
                <div>
                  <div className="font-bold text-black">Taxi Wale Partners</div>
                  <div className="text-xs text-gray-600">Trusted Network</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Stats */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-3xl font-bold text-brand-yellow mb-2">
              10K+
            </div>
            <div className="text-gray-300">Active Partners</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-3xl font-bold text-brand-yellow mb-2">50+</div>
            <div className="text-gray-300">Cities</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-3xl font-bold text-brand-yellow mb-2">99%</div>
            <div className="text-gray-300">Success Rate</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-3xl font-bold text-brand-yellow mb-2">
              24/7
            </div>
            <div className="text-gray-300">Support</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Taxi Wale Partners. All rights reserved.</p>
            <p className="mt-2">
              Transforming India's taxi industry, one lead at a time.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
