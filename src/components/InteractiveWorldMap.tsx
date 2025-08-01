import React, { useState } from 'react';
import { 
  tourismData, 
  DataCategory, 
  getTemperatureColor, 
  getRainfallColor 
} from '@/data/tourismData';

interface InteractiveWorldMapProps {
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

// Simplified world map using positioned country cards with better layout
export const InteractiveWorldMap: React.FC<InteractiveWorldMapProps> = ({
  selectedMonth,
  selectedCategory,
}) => {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const getColorForCountry = (countryCode: string): string => {
    const country = tourismData.find(c => c.code === countryCode);
    if (!country || !country.monthlyData[selectedMonth]) {
      return '#d1d5db'; // Default gray for missing data
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
    countryCode: string
  ) => {
    const country = tourismData.find(c => c.code === countryCode);
    if (!country || !country.monthlyData[selectedMonth]) return;

    const data = country.monthlyData[selectedMonth];
    const rect = event.currentTarget.getBoundingClientRect();
    
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

  // Enhanced country positions for better world map representation
  const countryPositions = {
    IT: { top: '45%', left: '52%', width: '80px', height: '60px' }, // Italy
    JP: { top: '42%', left: '82%', width: '70px', height: '50px' }, // Japan
    TH: { top: '52%', left: '75%', width: '60px', height: '40px' }, // Thailand
    AU: { top: '72%', left: '78%', width: '100px', height: '70px' }, // Australia
    IS: { top: '22%', left: '44%', width: '50px', height: '30px' }, // Iceland
    BR: { top: '62%', left: '28%', width: '90px', height: '80px' }, // Brazil
  };

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-b from-sky-100 via-blue-50 to-blue-100 rounded-lg overflow-hidden shadow-xl border-2 border-blue-200">
      {/* Ocean background with waves effect */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-blue-200/30 via-blue-300/40 to-blue-400/50"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(96, 165, 250, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 40% 80%, rgba(147, 197, 253, 0.3) 0%, transparent 50%)`
          }}></div>
        </div>
      </div>

      {/* Grid lines for geographic reference */}
      <div className="absolute inset-0 opacity-10">
        {/* Vertical lines */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={`v-${i}`}
            className="absolute h-full w-px bg-gray-400"
            style={{ left: `${12.5 + i * 12.5}%` }}
          />
        ))}
        {/* Horizontal lines */}
        {[...Array(6)].map((_, i) => (
          <div 
            key={`h-${i}`}
            className="absolute w-full h-px bg-gray-400"
            style={{ top: `${16.5 + i * 16.5}%` }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-blue-200">
        <h3 className="font-bold text-sm mb-3 text-gray-800">
          {selectedCategory === 'temperature' ? '🌡️ Temperature (°C)' : '🌧️ Rainfall (mm)'}
        </h3>
        <div className="flex items-center gap-3 text-xs">
          {selectedCategory === 'temperature' ? (
            <>
              <div className="w-6 h-4 bg-gradient-to-r from-blue-500 to-red-500 rounded border"></div>
              <span className="font-medium">Cold → Hot</span>
            </>
          ) : (
            <>
              <div className="w-6 h-4 bg-gradient-to-r from-gray-300 to-blue-600 rounded border"></div>
              <span className="font-medium">Low → High</span>
            </>
          )}
        </div>
        <div className="mt-2 text-xs text-gray-600">
          Hover countries for details
        </div>
      </div>

      {/* Country markers with enhanced styling */}
      {tourismData.map((country) => {
        const position = countryPositions[country.code as keyof typeof countryPositions];
        if (!position) return null;

        const color = getColorForCountry(country.code);
        const data = country.monthlyData[selectedMonth];
        
        return (
          <div
            key={country.code}
            className="absolute cursor-pointer group transition-all duration-300 hover:z-10"
            style={{ 
              top: position.top, 
              left: position.left,
              width: position.width,
              height: position.height,
            }}
            onMouseEnter={(e) => handleCountryHover(e, country.code)}
            onMouseLeave={handleCountryLeave}
            onMouseMove={(e) => handleCountryHover(e, country.code)}
          >
            {/* Country shape */}
            <div
              className="w-full h-full rounded-lg border-2 border-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:border-blue-300 group-hover:z-10"
              style={{ backgroundColor: color }}
            >
              {/* Inner glow effect */}
              <div className="w-full h-full rounded-md border border-black/10 bg-gradient-to-br from-white/20 to-transparent"></div>
            </div>
            
            {/* Country label */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="bg-black/70 text-white px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {country.name}
              </div>
            </div>

            {/* Temperature/rainfall indicator */}
            <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="text-xs font-bold text-gray-800">
                {selectedCategory === 'temperature' ? `${data.avgDayTemp}°` : `${data.rainfall}mm`}
              </div>
            </div>
          </div>
        );
      })}

      {/* Enhanced Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none transition-all duration-200"
          style={{
            left: tooltip.x - 150,
            top: tooltip.y - 10,
          }}
        >
          <div className="bg-white rounded-lg shadow-xl border-2 border-blue-200 p-4 max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-4 rounded-full" style={{ 
                backgroundColor: getColorForCountry(
                  tourismData.find(c => c.name === tooltip.country)?.code || ''
                )
              }}></div>
              <h3 className="font-bold text-lg text-gray-800">{tooltip.country}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
              <div className="bg-red-50 p-2 rounded">
                <div className="text-red-600 font-medium">☀️ Day</div>
                <div className="font-bold text-red-800">{tooltip.avgDayTemp}°C</div>
              </div>
              <div className="bg-blue-50 p-2 rounded">
                <div className="text-blue-600 font-medium">🌙 Night</div>
                <div className="font-bold text-blue-800">{tooltip.avgNightTemp}°C</div>
              </div>
            </div>
            
            <div className="bg-sky-50 p-2 rounded mb-3">
              <div className="text-sky-600 font-medium">🌧️ Rainfall</div>
              <div className="font-bold text-sky-800">{tooltip.rainfall}mm</div>
            </div>
            
            {tooltip.description && (
              <div className="text-gray-600 text-sm italic border-t pt-2">
                💡 {tooltip.description}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Month and category display */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-blue-200">
        <div className="text-lg font-bold text-gray-800 mb-1">{selectedMonth}</div>
        <div className="text-sm text-gray-600 capitalize">
          {selectedCategory} View
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {tourismData.length} countries
        </div>
      </div>
    </div>
  );
};