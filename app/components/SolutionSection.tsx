'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import {
  MapPin,
  Shield,
  Bell,
  Car,
  Star,
  ArrowRight,
  Target,
  Lock,
  Edit,
  CheckCircle,
} from 'lucide-react';

export default function SolutionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const flowchartRef = useRef<HTMLDivElement>(null);

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

    if (solutionsRef.current) {
      anime({
        targets: solutionsRef.current.children,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(150, { start: 600 }),
        easing: 'easeOutExpo',
      });
    }

    if (flowchartRef.current) {
      anime({
        targets: flowchartRef.current.children,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 800,
        delay: anime.stagger(200, { start: 1200 }),
        easing: 'easeOutElastic(1, .8)',
      });
    }
  }, []);

  const solutions = [
    {
      icon: MapPin,
      title: 'Smart Lead-Matching',
      subtitle: 'Location + Preferences',
      description:
        'AI-powered matching system connects drivers with the most relevant bookings based on location, preferences, and availability.',
      illustration: <Target size={32} className="text-green-600" />,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      icon: Shield,
      title: 'Fraud-Free Escrow',
      subtitle: 'Secure Payments',
      description:
        'Built-in escrow system ensures secure transactions with verified payments, eliminating fraud and payment disputes.',
      illustration: <Lock size={32} className="text-blue-600" />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      icon: Bell,
      title: 'No Unwanted Calls',
      subtitle: 'Only Relevant Notifications',
      description:
        'Smart notification system sends only relevant booking alerts, eliminating spam and unwanted interruptions.',
      illustration: <Bell size={32} className="text-purple-600" />,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      icon: Car,
      title: 'Stuck Vehicle Solution',
      subtitle: 'Idle Taxis Get Bookings',
      description:
        'Intelligent system identifies idle vehicles and connects them with nearby passengers, maximizing utilization.',
      illustration: <Car size={32} className="text-orange-600" />,
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
    {
      icon: Star,
      title: 'Trust Layer',
      subtitle: 'Ratings & Partner Score',
      description:
        'Comprehensive rating system builds trust with partner scores, reviews, and verified driver profiles.',
      illustration: <Star size={32} className="text-brand-yellow" />,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
    },
  ];

  const flowchartSteps = [
    {
      step: 'Post',
      icon: <Edit size={32} className="text-brand-yellow" />,
      description: 'Driver posts availability',
    },
    {
      step: 'Smart Notify',
      icon: <Bell size={32} className="text-brand-yellow" />,
      description: 'AI matches & notifies',
    },
    {
      step: 'Escrow',
      icon: <Shield size={32} className="text-brand-yellow" />,
      description: 'Secure payment setup',
    },
    {
      step: 'Complete Duty',
      icon: <CheckCircle size={32} className="text-brand-yellow" />,
      description: 'Ride completion',
    },
    {
      step: 'Rating',
      icon: <Star size={32} className="text-brand-yellow" />,
      description: 'Mutual feedback',
    },
  ];

  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            A Smarter Way to{' '}
            <span className="text-brand-yellow">Share Taxi Leads</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform transforms the chaotic taxi lead-sharing process into a
            streamlined, secure, and profitable system.
          </p>
        </div>

        {/* Solutions Grid */}
        <div
          ref={solutionsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {solutions.map((solution, index) => {
            return (
              <div
                key={index}
                className={`${solution.bgColor} border-2 ${solution.borderColor} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group`}
                data-animation="fadeInUp"
              >
                {/* Solution Illustration */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    {solution.illustration}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-black mb-2 text-center">
                  {solution.title}
                </h3>

                <p className="text-brand-yellow font-semibold text-center mb-4">
                  {solution.subtitle}
                </p>

                <p className="text-gray-600 text-center leading-relaxed">
                  {solution.description}
                </p>

                {/* Solution Indicator */}
                <div className="mt-6 flex justify-center">
                  <div className="w-12 h-1 bg-brand-yellow rounded-full"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Flowchart Visual */}
        <div
          ref={flowchartRef}
          className="bg-gray-50 border-2 border-gray-200 rounded-3xl p-8 lg:p-12"
        >
          <h3 className="text-3xl font-bold text-center text-black mb-12">
            How It Works
          </h3>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
            {flowchartSteps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row items-center"
              >
                {/* Step Card */}
                <div className="bg-white border-2 border-yellow-200 rounded-2xl p-6 shadow-lg min-w-[200px] text-center group hover:shadow-xl hover:border-brand-yellow transition-all duration-300">
                  <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <h4 className="text-lg font-bold text-black mb-2">
                    {step.step}
                  </h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>

                {/* Arrow */}
                {index < flowchartSteps.length - 1 && (
                  <div className="hidden lg:block mx-4">
                    <ArrowRight size={24} className="text-brand-yellow" />
                  </div>
                )}

                {/* Mobile Arrow */}
                {index < flowchartSteps.length - 1 && (
                  <div className="lg:hidden my-4">
                    <div className="w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center">
                      <ArrowRight size={16} className="text-black rotate-90" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16" data-animation="fadeInUp">
          <div className="bg-brand-yellow rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-black mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-black mb-6 opacity-80">
              Join thousands of drivers who have already made the switch to
              smarter lead sharing.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('pricing');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-black text-brand-yellow px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
