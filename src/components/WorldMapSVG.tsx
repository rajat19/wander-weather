import React, { useEffect, useState, useRef } from 'react';
import { geoPath, geoNaturalEarth1 } from 'd3-geo';
import { feature } from 'topojson-client';
import { 
  tourismData, 
  DataCategory, 
  getTemperatureColor, 
  getRainfallColor 
} from '@/data/tourismData';

interface WorldMapSVGProps {
  selectedMonth: string;
  selectedCategory: DataCategory;
}

interface TooltipData {
  country: string;
  avgDayTemp: number;
  avgNightTemp: number;
  rainfall: number;
  description: string;
  x: number;
  y: number;
}

// Country code mappings (ISO 3166-1 alpha-3 to alpha-2)
const countryCodeMap: Record<string, string> = {
  'ITA': 'IT', // Italy
  'JPN': 'JP', // Japan
  'THA': 'TH', // Thailand
  'AUS': 'AU', // Australia
  'ISL': 'IS', // Iceland
  'BRA': 'BR', // Brazil
  'USA': 'US', // United States
  'CHN': 'CN', // China
  'IND': 'IN', // India
  'FRA': 'FR', // France
  'DEU': 'DE', // Germany
  'GBR': 'GB', // United Kingdom
  'CAN': 'CA', // Canada
  'RUS': 'RU', // Russia
  'ESP': 'ES', // Spain
  'ARG': 'AR', // Argentina
  'EGY': 'EG', // Egypt
  'ZAF': 'ZA', // South Africa
  'TUR': 'TR', // Turkey
  'GRC': 'GR', // Greece
};

export const WorldMapSVG: React.FC<WorldMapSVGProps> = ({
  selectedMonth,
  selectedCategory,
}) => {
  const [worldData, setWorldData] = useState<any>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Load world atlas data
    import('world-atlas/countries-50m.json').then((world: any) => {
      const countries = feature(world, world.objects.countries);
      setWorldData(countries);
    }).catch(error => {
      console.error('Error loading world data:', error);
      // Fallback: create simple world data
      setWorldData(null);
    });
  }, []);

  const projection = geoNaturalEarth1()
    .scale(200)
    .translate([500, 300]);

  const pathGenerator = geoPath().projection(projection);

  const getColorForCountry = (countryId: string): string => {
    // Convert country ID to our format
    const alpha2Code = countryCodeMap[countryId] || countryId;
    
    const country = tourismData.find(c => c.code === alpha2Code);
    if (!country || !country.monthlyData[selectedMonth]) {
      return 'hsl(0, 0%, 85%)'; // Default gray for missing data
    }

    const data = country.monthlyData[selectedMonth];
    
    if (selectedCategory === 'temperature') {
      return getTemperatureColor(data.avgDayTemp);
    } else {
      return getRainfallColor(data.rainfall);
    }
  };

  const handleCountryHover = (
    event: React.MouseEvent, 
    countryId: string
  ) => {
    const alpha2Code = countryCodeMap[countryId] || countryId;
    const country = tourismData.find(c => c.code === alpha2Code);
    
    if (!country || !country.monthlyData[selectedMonth]) return;

    const data = country.monthlyData[selectedMonth];
    
    setTooltip({
      country: country.name,
      avgDayTemp: data.avgDayTemp,
      avgNightTemp: data.avgNightTemp,
      rainfall: data.rainfall,
      description: data.description || '',
      x: event.clientX,
      y: event.clientY - 10,
    });
  };

  const handleCountryLeave = () => {
    setTooltip(null);
  };

  // Fallback simple map if world-atlas fails to load
  if (!worldData) {
    return (
      <div className="relative w-full h-96 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg overflow-hidden shadow-lg">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <h3 className="text-lg font-semibold mb-4">Interactive World Map</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tourismData.map((country) => {
                const color = getColorForCountry(country.code);
                return (
                  <div
                    key={country.code}
                    className="p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 border"
                    style={{ backgroundColor: color }}
                    onMouseEnter={(e) => handleCountryHover(e, country.code)}
                    onMouseLeave={handleCountryLeave}
                  >
                    <div className="text-sm font-medium text-white mix-blend-difference">
                      {country.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <h3 className="font-semibold text-sm mb-2">
            {selectedCategory === 'temperature' ? 'Temperature (°C)' : 'Rainfall (mm)'}
          </h3>
          <div className="flex items-center gap-2 text-xs">
            {selectedCategory === 'temperature' ? (
              <>
                <div className="w-4 h-3 bg-gradient-to-r from-blue-400 to-red-500 rounded"></div>
                <span>Cold → Hot</span>
              </>
            ) : (
              <>
                <div className="w-4 h-3 bg-gradient-to-r from-gray-300 to-blue-600 rounded"></div>
                <span>Low → High</span>
              </>
            )}
          </div>
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="map-tooltip visible"
            style={{
              left: tooltip.x,
              top: tooltip.y,
            }}
          >
            <h3 className="font-bold text-sm mb-2">{tooltip.country}</h3>
            <div className="space-y-1 text-xs">
              <div>Day: {tooltip.avgDayTemp}°C</div>
              <div>Night: {tooltip.avgNightTemp}°C</div>
              <div>Rainfall: {tooltip.rainfall}mm</div>
              {tooltip.description && (
                <div className="mt-2 text-muted-foreground italic">
                  {tooltip.description}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg overflow-hidden shadow-lg">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 1000 600"
        className="w-full h-full"
      >
        {/* Ocean background */}
        <rect width="1000" height="600" fill="url(#oceanGradient)" />
        
        {/* Define gradients */}
        <defs>
          <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(200, 100%, 85%)" />
            <stop offset="100%" stopColor="hsl(210, 100%, 75%)" />
          </linearGradient>
        </defs>

        {/* Countries */}
        {worldData.features.map((feature: any) => {
          const countryPath = pathGenerator(feature);
          const countryId = feature.id || feature.properties?.ISO_A3 || feature.properties?.ADM0_A3;
          const fillColor = getColorForCountry(countryId);
          
          return (
            <path
              key={countryId}
              d={countryPath || ''}
              fill={fillColor}
              stroke="hsl(0, 0%, 100%)"
              strokeWidth="0.5"
              className="transition-all duration-300 hover:stroke-2 cursor-pointer"
              onMouseEnter={(e) => handleCountryHover(e, countryId)}
              onMouseLeave={handleCountryLeave}
              onMouseMove={(e) => handleCountryHover(e, countryId)}
            />
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <h3 className="font-semibold text-sm mb-2">
          {selectedCategory === 'temperature' ? 'Temperature (°C)' : 'Rainfall (mm)'}
        </h3>
        <div className="flex items-center gap-2 text-xs">
          {selectedCategory === 'temperature' ? (
            <>
              <div className="w-4 h-3 bg-gradient-to-r from-blue-400 to-red-500 rounded"></div>
              <span>Cold → Hot</span>
            </>
          ) : (
            <>
              <div className="w-4 h-3 bg-gradient-to-r from-gray-300 to-blue-600 rounded"></div>
              <span>Low → High</span>
            </>
          )}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="map-tooltip visible"
          style={{
            left: tooltip.x,
            top: tooltip.y,
          }}
        >
          <h3 className="font-bold text-sm mb-2">{tooltip.country}</h3>
          <div className="space-y-1 text-xs">
            <div>Day: {tooltip.avgDayTemp}°C</div>
            <div>Night: {tooltip.avgNightTemp}°C</div>
            <div>Rainfall: {tooltip.rainfall}mm</div>
            {tooltip.description && (
              <div className="mt-2 text-muted-foreground italic">
                {tooltip.description}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Month and category display */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="text-sm font-semibold">{selectedMonth}</div>
        <div className="text-xs text-muted-foreground capitalize">
          {selectedCategory} View
        </div>
      </div>
    </div>
  );
};