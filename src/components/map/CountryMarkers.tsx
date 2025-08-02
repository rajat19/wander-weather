import React from 'react';
import { 
  DataCategory, 
  getTemperatureColor, 
  getRainfallColor,
  getBestTimeColor 
} from '@/data/tourismDataLoader';
import { useTourismData } from '@/hooks';
import { GeoProjection } from 'd3-geo';

interface CountryMarkersProps {
  selectedMonth: string;
  selectedCategory: DataCategory;
  projection: GeoProjection;
  onCountryHover: (event: React.MouseEvent, countryCode: string) => void;
  onCountryLeave: () => void;
}

export const CountryMarkers: React.FC<CountryMarkersProps> = ({
  selectedMonth,
  selectedCategory,
  projection,
  onCountryHover,
  onCountryLeave,
}) => {
  const { tourismData, loading } = useTourismData();

  if (loading || !tourismData.length) {
    return null;
  }

  return (
    <>
      {/* Highlight countries with data - overlay markers */}
      {tourismData.map((country) => {
        const [lat, lng] = country.coordinates;  // coordinates are stored as [lat, lng]
        const [x, y] = projection([lng, lat]) || [0, 0];  // projection expects [lng, lat]
        const data = country.monthlyData[selectedMonth];
        const color = selectedCategory === 'temperature' 
          ? getTemperatureColor(data.avgDayTemp)
          : selectedCategory === 'rainfall'
          ? getRainfallColor(data.rainfall)
          : getBestTimeColor(data.bestTime);
        
        return (
          <g key={`marker-${country.code}`}>
            <circle
              cx={x}
              cy={y}
              r="12"
              fill={color}
              stroke="white"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-300 hover:r-16"
              onMouseEnter={(e) => onCountryHover(e, country.code)}
              onMouseLeave={onCountryLeave}
            />
            <text
              x={x}
              y={y + 5}
              textAnchor="middle"
              className="text-xs font-bold fill-white pointer-events-none"
            >
              {country.code}
            </text>
          </g>
        );
      })}
    </>
  );
};