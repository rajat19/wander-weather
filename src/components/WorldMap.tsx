import React, { useState } from 'react';
import { 
  tourismData, 
  DataCategory, 
  getTemperatureColor, 
  getRainfallColor 
} from '@/data/tourismData';

interface WorldMapProps {
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

export const WorldMap: React.FC<WorldMapProps> = ({
  selectedMonth,
  selectedCategory,
}) => {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const getColorForCountry = (countryCode: string): string => {
    const country = tourismData.find(c => c.code === countryCode);
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

  // Simple world map using positioned country cards for demo
  // In a real implementation, you'd use a proper SVG world map or mapping library
  const countryPositions = {
    IT: { top: '35%', left: '52%' }, // Italy
    JP: { top: '38%', left: '85%' }, // Japan
    TH: { top: '50%', left: '75%' }, // Thailand
    AU: { top: '75%', left: '80%' }, // Australia
    IS: { top: '15%', left: '45%' }, // Iceland
    BR: { top: '65%', left: '25%' }, // Brazil
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg overflow-hidden shadow-lg">
      {/* Background pattern to simulate ocean */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400"></div>
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

      {/* Country markers */}
      {tourismData.map((country) => {
        const position = countryPositions[country.code as keyof typeof countryPositions];
        if (!position) return null;

        const color = getColorForCountry(country.code);
        
        return (
          <div
            key={country.code}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ 
              top: position.top, 
              left: position.left,
            }}
            onMouseEnter={(e) => handleCountryHover(e, country.code)}
            onMouseLeave={handleCountryLeave}
            onMouseMove={(e) => handleCountryHover(e, country.code)}
          >
            <div
              className="w-8 h-8 rounded-full border-2 border-white shadow-lg transition-all duration-300 group-hover:scale-125 group-hover:shadow-xl"
              style={{ backgroundColor: color }}
            >
              <div className="w-full h-full rounded-full border border-black/10"></div>
            </div>
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {country.name}
            </div>
          </div>
        );
      })}

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