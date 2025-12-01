import React from 'react';
import { 
  DataCategory,
  getCategoryColor,
} from '@/lib';
import { useTourismData } from '@/hooks';
import { GeoProjection } from 'd3-geo';
import { VisaCategory, getVisaColor, ISO2_TO_ISO3 } from '@/lib/visa';

interface CountryMarkersProps {
  selectedMonth: string;
  selectedCategory: DataCategory;
  projection: GeoProjection;
  onCountryHover: (event: React.MouseEvent | React.TouchEvent, countryCode: string) => void;
  onCountryLeave: () => void;
  currentZoom?: number;
  // Visa-specific props
  visaData?: {
    byPassport: Record<string, Record<string, VisaCategory>>;
    selectedPassportIso3: string;
  };
}

export const CountryMarkers: React.FC<CountryMarkersProps> = ({
  selectedMonth,
  selectedCategory,
  projection,
  onCountryHover,
  onCountryLeave,
  currentZoom = 1,
  visaData,
}) => {
  const { tourismData, loading } = useTourismData();

  if (loading || !tourismData.length) {
    return null;
  }

  return (
    <>
      {/* Highlight countries with data - overlay markers */}
      {tourismData.map((country) => {
        if (!country.coordinates) {
          console.log(`No coordinates found for ${country.name}`);
          return null;
        }
        const [lat, lng] = country.coordinates;  // coordinates are stored as [lat, lng]
        const [x, y] = projection([lng, lat]) || [0, 0];  // projection expects [lng, lat]
        
        // Determine color based on category
        let color: string;
        if (selectedCategory === 'visa' && visaData?.selectedPassportIso3) {
          // Get ISO3 code - try from Firebase data first, then fallback to ISO2→ISO3 mapping
          const iso3 = country.alternativeCodes?.alpha3 || ISO2_TO_ISO3[country.code];
          
          if (!iso3) {
            // No ISO3 mapping available at all
            color = 'hsl(0, 0%, 75%)'; // Light gray
          } else if (iso3 === visaData.selectedPassportIso3) {
            // Home country - bright purple
            color = 'hsl(280, 70%, 50%)';
          } else {
            const visaMap = visaData.byPassport[visaData.selectedPassportIso3] || {};
            const req = visaMap[iso3];
            color = req ? getVisaColor(req) : getVisaColor('n/a');
          }
        } else {
          // Weather categories
          if (!country.monthlyData || !Object.prototype.hasOwnProperty.call(country.monthlyData, selectedMonth)) {
            console.log(`No data for ${selectedMonth} found for ${country.name}`);
            return null;
          }
          const data = country.monthlyData[selectedMonth];
          color = getCategoryColor(selectedCategory, data);
        }
        
        // Calculate inverse scale to counter zoom scaling
        const inverseScale = 1 / currentZoom;
        
        return (
          <g 
            key={`marker-${country.code}`}
            transform={`translate(${x}, ${y}) scale(${inverseScale}) translate(${-x}, ${-y})`}
          >
            <circle
              cx={x}
              cy={y}
              r="12"
              fill={color}
              stroke="white"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-300 hover:r-16 touch-manipulation"
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