'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import {
  Shield,
  Star,
  MapPin,
  Users,
  CheckCircle,
  Lock,
  BarChart3,
  Rocket,
  Lightbulb,
  User,
} from 'lucide-react';
import GujaratRoadNetworkMap from './GujaratRoadNetworkMap';

export default function TrustSectionNew() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

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
  }, []);

  const trustPillars = [
    {
      icon: Shield,
      title: 'Fraud-Free Escrow',
      subtitle: 'Secure Payments',
      description:
        'Built-in escrow system ensures secure transactions with verified payments, eliminating fraud and payment disputes.',
      illustration: Lock,
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Star,
      title: 'Ratings & Partner Score',
      subtitle: 'Credit Score for Credibility',
      description:
        'Comprehensive rating system builds trust with partner scores, reviews, and verified driver profiles.',
      illustration: BarChart3,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: MapPin,
      title: 'First Mover Advantage',
      subtitle: "India's Only Nationwide Platform",
      description:
        "Be part of India's first and only dedicated taxi lead-sharing platform with nationwide reach.",
      illustration: Rocket,
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Users,
      title: 'Community-Driven Design',
      subtitle: '2,500+ Partners Consulted',
      description:
        'Our platform is designed with input from 2,500+ drivers and vendors who know the industry best.',
      illustration: Lightbulb,
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
      avatar: <User size={36} className="text-brand-yellow" />,
      location: 'Rajkot',
    },
    {
      name: 'Vikram Desai',
      role: 'Fleet Owner, Ahmedabad',
      content:
        'Our fleet gets consistent bookings every day. The platform connects us with genuine customers and eliminates fake bookings. Highly recommended!',
      rating: 5,
      avatar: <Users size={36} className="text-brand-yellow" />,
      location: 'Ahmedabad',
    },
    {
      name: 'Harsh Mehta',
      role: 'Taxi Agent, Surat',
      content:
        'Getting regular bookings through this platform has transformed my business. The booking notification system ensures I never miss an opportunity.',
      rating: 5,
      avatar: <User size={36} className="text-brand-yellow" />,
      location: 'Surat',
    },
  ];

  return (
    <section id="why-trust" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Why Drivers & Vendors Trust{' '}
            <span className="text-brand-yellow">Taxi Wale Partners</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built with security, reliability, and community input at its core.
            Trusted by thousands across India.
          </p>
        </div>

        {/* Trust Pillars */}
        <div
          ref={featuresRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {trustPillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                data-animation="fadeInUp"
              >
                <div className="relative mb-6">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${pillar.color} rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    <pillar.illustration size={32} className="text-white" />
                  </div>

                  {/* Icon */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center">
                    <IconComponent size={16} className="text-black" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-black mb-2">
                  {pillar.title}
                </h3>
                <p className="text-brand-yellow font-semibold mb-4">
                  {pillar.subtitle}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Road Network Map */}
        <div className="mb-20 rounded-3xl overflow-hidden shadow-2xl">
          <GujaratRoadNetworkMap />
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
                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                data-animation="fadeInUp"
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-black">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    <p className="text-brand-yellow text-xs font-semibold">
                      📍 {testimonial.location}
                    </p>
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

        {/* Trust Badges */}
        <div className="text-center mt-16" data-animation="fadeInUp">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto border-2 border-brand-yellow">
            <h3 className="text-2xl font-bold text-black mb-6">
              Trusted & Verified
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex items-center gap-2">
                <CheckCircle size={24} className="text-green-500" />
                <span className="text-gray-700 font-semibold">
                  2,500+ Partners Consulted
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={24} className="text-green-500" />
                <span className="text-gray-700 font-semibold">
                  India's First Platform
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={24} className="text-green-500" />
                <span className="text-gray-700 font-semibold">
                  Bank-Grade Security
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
