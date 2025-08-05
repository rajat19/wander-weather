import React from 'react';
import { 
  DataCategory,
} from '@/lib/firebaseDataLoader';
import { useTourismData } from '@/hooks';
import { MapTooltip, TooltipData } from './MapTooltip';
import { MapLegend } from './MapLegend';
import { getTemperatureColor, getRainfallColor } from '@/lib/mapColors';

interface FallbackMapProps {
  selectedMonth: string;
  selectedCategory: DataCategory;
  tooltip: TooltipData | null;
  onCountryHover: (event: React.MouseEvent | React.TouchEvent, countryCode: string) => void;
  onCountryLeave: () => void;
}

export const FallbackMap: React.FC<FallbackMapProps> = ({
  selectedMonth,
  selectedCategory,
  tooltip,
  onCountryHover,
  onCountryLeave,
}) => {
  const { tourismData: countries, loading } = useTourismData();

  if (loading || !countries.length) {
    return (
      <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] bg-blue-100 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading fallback map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] sm:h-[600px] md:h-[650px] bg-blue-100 rounded-lg overflow-hidden shadow-lg">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center p-4 sm:p-8">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Loading World Map...</h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Displaying available countries while map loads</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 max-h-[400px] overflow-y-auto touch-scroll">
            {countries.map((country) => {
              const data = country.monthlyData[selectedMonth];
              const color = selectedCategory === 'temperature' 
                ? getTemperatureColor(data.avgDayTemp)
                : getRainfallColor(data.rainfall);
              return (
                <div
                  key={country.code}
                  className="p-2 sm:p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 border touch-manipulation"
                  style={{ backgroundColor: color }}
                  onMouseEnter={(e) => onCountryHover(e, country.code)}
                  onMouseLeave={onCountryLeave}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    onCountryHover(e, country.code);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    onCountryLeave();
                  }}
                >
                  <div className="text-xs sm:text-sm font-medium text-white mix-blend-difference">
                    {country.name}
                  </div>
                  <div className="text-xs text-white mix-blend-difference mt-1">
                    {selectedCategory === 'temperature' ? `${data.avgDayTemp}°C` : `${data.rainfall}mm`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <MapLegend 
        selectedCategory={selectedCategory} 
        countryCount={countries.length} 
      />

      {/* Tooltip */}
      <MapTooltip tooltip={tooltip} maxWidth={1000} maxHeight={600} />
    </div>
  );
};