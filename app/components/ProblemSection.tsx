'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import {
  MessageCircle,
  Clock,
  Shield,
  Phone,
  Car,
  AlertTriangle,
} from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faClock,
  faMask,
  faPhone,
  faCar,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

export default function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

    if (cardsRef.current) {
      anime({
        targets: cardsRef.current.children,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(150, { start: 600 }),
        easing: 'easeOutExpo',
      });
    }
  }, []);

  const problems = [
    {
      icon: MessageCircle,
      title: 'WhatsApp Group Chaos',
      description:
        'Drivers drowning in endless message threads, missing important leads while scrolling through irrelevant chats.',
      illustration: (
        <FontAwesomeIcon icon={faComments} className="text-white text-2xl" />
      ),
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Clock,
      title: 'Lost Opportunities',
      description:
        'Critical booking requests slip through the cracks in chaotic group chats, leading to missed revenue.',
      illustration: (
        <FontAwesomeIcon icon={faClock} className="text-white text-2xl" />
      ),
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Shield,
      title: 'Frauds & Scams',
      description:
        'No verification system leads to fake bookings, payment frauds, and wasted time on non-existent rides.',
      illustration: (
        <FontAwesomeIcon icon={faMask} className="text-white text-2xl" />
      ),
      color: 'from-red-600 to-red-700',
    },
    {
      icon: Phone,
      title: 'Unwanted Calls & Messages',
      description:
        "Constant spam calls and irrelevant notifications disrupt drivers' work and personal time.",
      illustration: (
        <FontAwesomeIcon icon={faPhone} className="text-white text-2xl" />
      ),
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Car,
      title: 'Stuck Vehicles, No System Help',
      description:
        'Idle taxis with no booking system to connect them with nearby passengers efficiently.',
      illustration: (
        <FontAwesomeIcon icon={faCar} className="text-white text-2xl" />
      ),
      color: 'from-gray-500 to-gray-600',
    },
    {
      icon: AlertTriangle,
      title: 'Booking Mismatch Problem',
      description:
        'Poor matching leads to wrong pickups, customer complaints, and damaged reputation.',
      illustration: (
        <FontAwesomeIcon icon={faTimes} className="text-white text-2xl" />
      ),
      color: 'from-yellow-600 to-yellow-700',
    },
  ];

  return (
    <section id="problems" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            The Reality <span className="text-brand-yellow">Today</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every day, thousands of taxi drivers face these challenges that cost
            them time, money, and opportunities.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group overflow-visible"
                data-animation="fadeInUp"
              >
                {/* Top-right Icon Badge - Positioned relative to card */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg z-10 border-2 border-white">
                  <IconComponent size={18} className="text-black" />
                </div>

                {/* Problem Illustration */}
                <div className="relative mb-6">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${problem.color} rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    {problem.illustration}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-black mb-4 text-center">
                  {problem.title}
                </h3>

                <p className="text-gray-600 text-center leading-relaxed">
                  {problem.description}
                </p>

                {/* Problem Indicator */}
                <div className="mt-6 flex justify-center">
                  <div className="w-12 h-1 bg-red-500 rounded-full"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16" data-animation="fadeInUp">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-black mb-4">
              Tired of These Problems?
            </h3>
            <p className="text-gray-600 mb-6">
              There's a better way. See how we solve each of these challenges
              with our smart platform.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('solutions');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-brand-yellow text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
            >
              See Our Solutions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
