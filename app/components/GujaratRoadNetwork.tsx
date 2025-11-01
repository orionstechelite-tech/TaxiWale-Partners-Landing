'use client';

import { useState, useEffect, useRef } from 'react';
import anime from 'animejs';

interface City {
  id: string;
  name: string;
  x: number;
  y: number;
  connections: string[];
  distance?: Record<string, number>;
  type: 'hub' | 'major' | 'regional';
}

interface Road {
  from: string;
  to: string;
  distance: number;
  type: 'highway' | 'regional';
}

export default function GujaratRoadNetwork() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [selectedPath, setSelectedPath] = useState<{
    from: string;
    to: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // City data with geographic positions (relative to SVG viewBox)
  const cities: City[] = [
    {
      id: 'ahmedabad',
      name: 'Ahmedabad',
      x: 400,
      y: 280,
      connections: [
        'gandhinagar',
        'vadodara',
        'rajkot',
        'anand',
        'mehsana',
        'bhavnagar',
      ],
      type: 'hub',
      distance: {
        gandhinagar: 25,
        vadodara: 115,
        rajkot: 200,
        anand: 40,
        mehsana: 60,
        bhavnagar: 185,
      },
    },
    {
      id: 'gandhinagar',
      name: 'Gandhinagar',
      x: 390,
      y: 250,
      connections: ['ahmedabad', 'mehsana'],
      type: 'major',
      distance: {
        ahmedabad: 25,
        mehsana: 35,
      },
    },
    {
      id: 'vadodara',
      name: 'Vadodara',
      x: 480,
      y: 340,
      connections: ['ahmedabad', 'surat', 'anand', 'bharuch'],
      type: 'major',
      distance: {
        ahmedabad: 115,
        surat: 150,
        anand: 75,
        bharuch: 100,
      },
    },
    {
      id: 'surat',
      name: 'Surat',
      x: 530,
      y: 420,
      connections: ['vadodara', 'bharuch', 'vapi'],
      type: 'major',
      distance: {
        vadodara: 150,
        bharuch: 70,
        vapi: 45,
      },
    },
    {
      id: 'rajkot',
      name: 'Rajkot',
      x: 330,
      y: 380,
      connections: ['ahmedabad', 'jamnagar', 'junagadh', 'morbi'],
      type: 'major',
      distance: {
        ahmedabad: 200,
        jamnagar: 100,
        junagadh: 90,
        morbi: 60,
      },
    },
    {
      id: 'jamnagar',
      name: 'Jamnagar',
      x: 270,
      y: 360,
      connections: ['rajkot', 'porbandar'],
      type: 'major',
      distance: {
        rajkot: 100,
        porbandar: 130,
      },
    },
    {
      id: 'bhavnagar',
      name: 'Bhavnagar',
      x: 410,
      y: 370,
      connections: ['ahmedabad', 'rajkot'],
      type: 'major',
      distance: {
        ahmedabad: 185,
        rajkot: 110,
      },
    },
    {
      id: 'anand',
      name: 'Anand',
      x: 435,
      y: 305,
      connections: ['ahmedabad', 'vadodara', 'nadiad'],
      type: 'regional',
      distance: {
        ahmedabad: 40,
        vadodara: 75,
        nadiad: 25,
      },
    },
    {
      id: 'mehsana',
      name: 'Mehsana',
      x: 370,
      y: 240,
      connections: ['ahmedabad', 'gandhinagar'],
      type: 'regional',
      distance: {
        ahmedabad: 60,
        gandhinagar: 35,
      },
    },
    {
      id: 'junagadh',
      name: 'Junagadh',
      x: 340,
      y: 420,
      connections: ['rajkot', 'porbandar'],
      type: 'regional',
      distance: {
        rajkot: 90,
        porbandar: 85,
      },
    },
    {
      id: 'vapi',
      name: 'Vapi',
      x: 545,
      y: 440,
      connections: ['surat'],
      type: 'regional',
      distance: {
        surat: 45,
      },
    },
    {
      id: 'bharuch',
      name: 'Bharuch',
      x: 500,
      y: 380,
      connections: ['vadodara', 'surat'],
      type: 'regional',
      distance: {
        vadodara: 100,
        surat: 70,
      },
    },
    {
      id: 'porbandar',
      name: 'Porbandar',
      x: 250,
      y: 450,
      connections: ['jamnagar', 'junagadh'],
      type: 'regional',
      distance: {
        jamnagar: 130,
        junagadh: 85,
      },
    },
    {
      id: 'nadiad',
      name: 'Nadiad',
      x: 440,
      y: 290,
      connections: ['anand', 'ahmedabad'],
      type: 'regional',
      distance: {
        anand: 25,
        ahmedabad: 50,
      },
    },
    {
      id: 'morbi',
      name: 'Morbi',
      x: 300,
      y: 400,
      connections: ['rajkot'],
      type: 'regional',
      distance: {
        rajkot: 60,
      },
    },
  ];

  // Generate roads from city connections
  const roads: Road[] = [];
  cities.forEach((city) => {
    city.connections.forEach((connId) => {
      const existingRoad = roads.find(
        (r) =>
          (r.from === city.id && r.to === connId) ||
          (r.from === connId && r.to === city.id)
      );
      if (!existingRoad) {
        const connectedCity = cities.find((c) => c.id === connId);
        const isHighway =
          (city.type === 'hub' || city.type === 'major') &&
          connectedCity &&
          (connectedCity.type === 'hub' || connectedCity.type === 'major');
        roads.push({
          from: city.id,
          to: connId,
          distance: city.distance?.[connId] || 0,
          type: isHighway ? 'highway' : 'regional',
        });
      }
    });
  });

  // Filter cities based on search
  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get city by ID
  const getCity = (id: string) => cities.find((c) => c.id === id);

  // Check if road is selected path
  const isSelectedPath = (road: Road) => {
    if (!selectedPath) return false;
    return (
      (road.from === selectedPath.from && road.to === selectedPath.to) ||
      (road.from === selectedPath.to && road.to === selectedPath.from)
    );
  };

  // Get road path
  const getRoadPath = (road: Road) => {
    const from = getCity(road.from);
    const to = getCity(road.to);
    if (!from || !to) return '';
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  };

  // Animation on mount
  useEffect(() => {
    if (svgRef.current) {
      // Animate city nodes
      anime({
        targets: svgRef.current.querySelectorAll('.city-node'),
        scale: [0, 1],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(100),
        easing: 'easeOutElastic(1, .8)',
      });

      // Animate road lines
      anime({
        targets: svgRef.current.querySelectorAll('.road-line'),
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 1],
        duration: 1200,
        delay: anime.stagger(50, { start: 800 }),
        easing: 'easeOutExpo',
      });
    }
  }, []);

  // Handle city click
  const handleCityClick = (cityId: string) => {
    if (selectedPath?.from === cityId) {
      setSelectedPath(null);
    } else if (selectedPath?.from) {
      setSelectedPath({ from: selectedPath.from, to: cityId });
    } else {
      setSelectedPath({ from: cityId, to: '' });
    }
  };

  return (
    <div className="w-full py-20 bg-[#121212] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Gujarat Road Network
          </h2>
          <p className="text-gray-400 text-lg">
            Explore our extensive connectivity across major Gujarat cities
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-[#1a1a1a] border-2 border-[#FFB300] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7B00] transition-colors"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Map Container */}
        <div
          ref={containerRef}
          className="relative w-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-3xl p-8 lg:p-12 border-2 border-[#FFB300]/20 shadow-2xl overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #FFB300 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          {/* SVG Map */}
          <svg
            ref={svgRef}
            viewBox="0 0 800 600"
            className="w-full h-full min-h-[500px] relative z-10"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Road Lines */}
            <g className="roads">
              {roads.map((road, index) => {
                const path = getRoadPath(road);
                const isSelected = isSelectedPath(road);
                const isHovered =
                  hoveredCity &&
                  (road.from === hoveredCity || road.to === hoveredCity);

                return (
                  <g key={`${road.from}-${road.to}-${index}`}>
                    {/* Road line */}
                    <path
                      d={path}
                      className="road-line"
                      fill="none"
                      stroke={
                        isSelected
                          ? '#FFB300'
                          : isHovered
                            ? '#FFD65A'
                            : '#FFB300'
                      }
                      strokeWidth={road.type === 'highway' ? 3 : 2}
                      strokeDasharray={road.type === 'regional' ? '6,4' : '0'}
                      opacity={isSelected ? 1 : isHovered ? 0.8 : 0.4}
                      style={{
                        filter: isSelected
                          ? 'drop-shadow(0 0 8px #FFB300)'
                          : isHovered
                            ? 'drop-shadow(0 0 4px #FFD65A)'
                            : 'none',
                      }}
                    />

                    {/* Animated flow (only for highways or selected paths) */}
                    {(road.type === 'highway' || isSelected) && (
                      <path
                        d={path}
                        fill="none"
                        stroke="#FFD65A"
                        strokeWidth={road.type === 'highway' ? 4 : 3}
                        strokeDasharray="20,10"
                        opacity={0.6}
                        className="flow-animation"
                        style={{
                          animation: 'flow 3s linear infinite',
                          filter: 'drop-shadow(0 0 6px #FFB300)',
                        }}
                      />
                    )}
                  </g>
                );
              })}
            </g>

            {/* City Nodes */}
            <g className="cities">
              {cities.map((city) => {
                const isHovered = hoveredCity === city.id;
                const isSelected =
                  selectedPath?.from === city.id ||
                  selectedPath?.to === city.id;
                const isHighlighted =
                  !searchQuery || filteredCities.some((c) => c.id === city.id);

                if (!isHighlighted) return null;

                const nodeSize =
                  city.type === 'hub' ? 16 : city.type === 'major' ? 12 : 10;

                return (
                  <g
                    key={city.id}
                    className="city-node"
                    onMouseEnter={() => setHoveredCity(city.id)}
                    onMouseLeave={() => setHoveredCity(null)}
                    onClick={() => handleCityClick(city.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* City Node */}
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={isHovered ? nodeSize + 4 : nodeSize}
                      fill="#FFB300"
                      className="transition-all duration-300"
                      style={{
                        filter: isHovered
                          ? 'drop-shadow(0 0 12px #FFB300) drop-shadow(0 0 20px #FFD65A)'
                          : isSelected
                            ? 'drop-shadow(0 0 8px #FFB300)'
                            : 'drop-shadow(0 0 4px rgba(255, 179, 0, 0.5))',
                        transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                      }}
                    />

                    {/* City Label */}
                    <text
                      x={city.x}
                      y={city.y + nodeSize + 20}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize={city.type === 'hub' ? 14 : 12}
                      fontWeight="600"
                      className="font-inter pointer-events-none select-none"
                      style={{
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))',
                        opacity: isHovered ? 1 : 0.9,
                      }}
                    >
                      {city.name}
                    </text>

                    {/* Tooltip on Hover */}
                    {isHovered && (
                      <g className="tooltip">
                        <rect
                          x={city.x - 80}
                          y={city.y - nodeSize - 50}
                          width="160"
                          height="40"
                          rx="8"
                          fill="#1a1a1a"
                          stroke="#FFB300"
                          strokeWidth="2"
                          opacity="0.95"
                        />
                        <text
                          x={city.x}
                          y={city.y - nodeSize - 30}
                          textAnchor="middle"
                          fill="#FFB300"
                          fontSize="11"
                          fontWeight="600"
                        >
                          {city.name}
                        </text>
                        <text
                          x={city.x}
                          y={city.y - nodeSize - 15}
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="10"
                        >
                          {city.type === 'hub'
                            ? 'Hub City'
                            : city.type === 'major'
                              ? 'Major City'
                              : 'Regional City'}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-[#1a1a1a]/90 backdrop-blur-sm border-2 border-[#FFB300]/30 rounded-xl p-4 z-20">
            <h4 className="text-[#FFB300] font-semibold mb-3 text-sm">
              Legend
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-[#FFB300] rounded"></div>
                <span className="text-gray-300">Major Highway</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-[#FFB300] border-dashed border-[#FFB300] border-t-2 rounded"></div>
                <span className="text-gray-300">Regional Road</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-3 h-3 rounded-full bg-[#FFB300]"></div>
                <span className="text-gray-300">Hub City</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFB300]"></div>
                <span className="text-gray-300">Major City</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FFB300]"></div>
                <span className="text-gray-300">Regional City</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute top-4 right-4 bg-[#1a1a1a]/90 backdrop-blur-sm border-2 border-[#FFB300]/30 rounded-xl p-4 z-20 max-w-xs">
            <h4 className="text-[#FFB300] font-semibold mb-2 text-sm">
              How to Use
            </h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Hover over cities to see details</li>
              <li>• Click cities to trace routes</li>
              <li>• Search for specific cities</li>
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-[#1a1a1a] border-2 border-[#FFB300]/20 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[#FFB300] mb-2">
              {cities.length}
            </div>
            <div className="text-gray-400 text-sm">Cities Connected</div>
          </div>
          <div className="bg-[#1a1a1a] border-2 border-[#FFB300]/20 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[#FFB300] mb-2">
              {roads.length}
            </div>
            <div className="text-gray-400 text-sm">Road Routes</div>
          </div>
          <div className="bg-[#1a1a1a] border-2 border-[#FFB300]/20 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[#FFB300] mb-2">
              {roads.filter((r) => r.type === 'highway').length}
            </div>
            <div className="text-gray-400 text-sm">Highways</div>
          </div>
          <div className="bg-[#1a1a1a] border-2 border-[#FFB300]/20 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[#FFB300] mb-2">24/7</div>
            <div className="text-gray-400 text-sm">Network Active</div>
          </div>
        </div>
      </div>
    </div>
  );
}
