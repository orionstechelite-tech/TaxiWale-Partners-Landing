'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { Shield, Star, Users, Award, CheckCircle } from 'lucide-react';

export default function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

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

    if (featuresRef.current) {
      anime({
        targets: featuresRef.current.children,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(150, { start: 600 }),
        easing: 'easeOutExpo',
      });
    }

    if (testimonialsRef.current) {
      anime({
        targets: testimonialsRef.current.children,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(200, { start: 1000 }),
        easing: 'easeOutExpo',
      });
    }

    if (mapRef.current) {
      anime({
        targets: mapRef.current.children,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 800,
        delay: anime.stagger(100, { start: 1200 }),
        easing: 'easeOutElastic(1, .8)',
      });
    }
  }, []);

  const trustFeatures = [
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      description:
        '256-bit SSL encryption and secure payment processing protect your data and transactions.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Users,
      title: 'Verified Partners',
      description:
        'All drivers and vendors go through rigorous verification process ensuring quality and trust.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Award,
      title: 'Industry Recognition',
      description:
        'Trusted by leading taxi companies and recognized by industry associations.',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const testimonials = [
    {
      name: 'Ketan Shah',
      role: 'Taxi Driver, Rajkot',
      content:
        "I'm getting 15-20 bookings daily from the platform. My income has doubled since joining Taxi Wale Partners. The lead quality is excellent!",
      rating: 5,
      avatar: '👨‍💼',
    },
    {
      name: 'Vikram Desai',
      role: 'Fleet Owner, Ahmedabad',
      content:
        'Our fleet gets consistent bookings every day. The platform connects us with genuine customers and eliminates fake bookings. Highly recommended!',
      rating: 5,
      avatar: '👨‍💼',
    },
    {
      name: 'Harsh Mehta',
      role: 'Taxi Agent, Surat',
      content:
        'Getting regular bookings through this platform has transformed my business. The booking notification system ensures I never miss an opportunity.',
      rating: 5,
      avatar: '👨‍🚗',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Active Drivers' },
    { number: '50+', label: 'Cities Covered' },
    { number: '99.9%', label: 'Uptime' },
    { number: '4.8/5', label: 'User Rating' },
  ];

  return (
    <section id="trust" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Why Trust{' '}
            <span className="text-brand-yellow">Taxi Wale Partners</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built with security, reliability, and user experience at its core.
            Trusted by thousands across India.
          </p>
        </div>

        {/* Trust Features */}
        <div ref={featuresRef} className="grid md:grid-cols-3 gap-8 mb-20">
          {trustFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                data-animation="fadeInUp"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                >
                  <IconComponent size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 mb-20 shadow-lg">
          <h3 className="text-3xl font-bold text-center text-black mb-12">
            Trusted by Numbers
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-animation="scaleIn">
                <div className="text-4xl lg:text-5xl font-bold text-brand-yellow mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Operations Map */}
        <div
          ref={mapRef}
          className="bg-white rounded-3xl p-8 lg:p-12 mb-20 shadow-lg"
        >
          <h3 className="text-3xl font-bold text-center text-black mb-12">
            Operating Across India
          </h3>
          <div className="relative">
            {/* Simplified India Map */}
            <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl relative overflow-hidden">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                {/* India Map Outline */}
                <path
                  d="M200 30 L350 60 L380 120 L360 180 L320 240 L250 270 L150 250 L80 200 L50 120 L70 60 L120 40 Z"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                  className="opacity-50"
                />

                {/* City Dots */}
                <circle
                  cx="200"
                  cy="80"
                  r="8"
                  fill="#facc15"
                  className="animate-pulse"
                />
                <circle
                  cx="150"
                  cy="120"
                  r="6"
                  fill="#facc15"
                  className="animate-pulse"
                  style={{ animationDelay: '0.5s' }}
                />
                <circle
                  cx="250"
                  cy="140"
                  r="6"
                  fill="#facc15"
                  className="animate-pulse"
                  style={{ animationDelay: '1s' }}
                />
                <circle
                  cx="180"
                  cy="180"
                  r="6"
                  fill="#facc15"
                  className="animate-pulse"
                  style={{ animationDelay: '1.5s' }}
                />
                <circle
                  cx="220"
                  cy="200"
                  r="6"
                  fill="#facc15"
                  className="animate-pulse"
                  style={{ animationDelay: '2s' }}
                />
                <circle
                  cx="120"
                  cy="160"
                  r="6"
                  fill="#facc15"
                  className="animate-pulse"
                  style={{ animationDelay: '2.5s' }}
                />
                <circle
                  cx="280"
                  cy="160"
                  r="6"
                  fill="#facc15"
                  className="animate-pulse"
                  style={{ animationDelay: '3s' }}
                />
              </svg>

              {/* City Labels */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                <div className="bg-brand-yellow text-black px-3 py-1 rounded-full text-sm font-semibold">
                  Rajkot
                </div>
              </div>
              <div className="absolute top-16 left-1/4">
                <div className="bg-brand-yellow text-black px-3 py-1 rounded-full text-sm font-semibold">
                  Ahmedabad
                </div>
              </div>
              <div className="absolute top-20 right-1/4">
                <div className="bg-brand-yellow text-black px-3 py-1 rounded-full text-sm font-semibold">
                  Surat
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div ref={testimonialsRef}>
          <h3 className="text-3xl font-bold text-center text-black mb-12">
            What Our Partners Say
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                data-animation="fadeInUp"
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-black">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-brand-yellow fill-current"
                    />
                  ))}
                </div>

                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Badges */}
        <div className="text-center mt-16" data-animation="fadeInUp">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-black mb-6">
              Security & Compliance
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex items-center gap-2">
                <CheckCircle size={24} className="text-green-500" />
                <span className="text-gray-700">SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={24} className="text-green-500" />
                <span className="text-gray-700">PCI Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={24} className="text-green-500" />
                <span className="text-gray-700">GDPR Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={24} className="text-green-500" />
                <span className="text-gray-700">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
