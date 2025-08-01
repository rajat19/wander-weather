import React from 'react';
import { 
  tourismData, 
  DataCategory, 
  getTemperatureColor, 
  getRainfallColor 
} from '@/data/tourismData';
import { MapTooltip, TooltipData } from './MapTooltip';
import { MapLegend } from './MapLegend';

interface FallbackMapProps {
  selectedMonth: string;
  selectedCategory: DataCategory;
  tooltip: TooltipData | null;
  onCountryHover: (event: React.MouseEvent, countryCode: string) => void;
  onCountryLeave: () => void;
}

export const FallbackMap: React.FC<FallbackMapProps> = ({
  selectedMonth,
  selectedCategory,
  tooltip,
  onCountryHover,
  onCountryLeave,
}) => {
  return (
    <div className="relative w-full h-[700px] bg-blue-100 rounded-lg overflow-hidden shadow-lg">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center p-8">
          <h3 className="text-lg font-semibold mb-4">Loading World Map...</h3>
          <p className="text-sm text-gray-600 mb-4">Displaying available countries while map loads</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {tourismData.map((country) => {
              const data = country.monthlyData[selectedMonth];
              const color = selectedCategory === 'temperature' 
                ? getTemperatureColor(data.avgDayTemp)
                : getRainfallColor(data.rainfall);
              return (
                <div
                  key={country.code}
                  className="p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 border"
                  style={{ backgroundColor: color }}
                  onMouseEnter={(e) => onCountryHover(e, country.code)}
                  onMouseLeave={onCountryLeave}
                >
                  <div className="text-sm font-medium text-white mix-blend-difference">
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
        countryCount={tourismData.length} 
      />

      {/* Tooltip */}
      <MapTooltip tooltip={tooltip} maxWidth={1000} maxHeight={600} />
    </div>
  );
};