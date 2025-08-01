import React, { useRef } from 'react';
import { tourismData, DataCategory } from '@/data/tourismData';
import { createProjection, createPathGenerator, MAP_DIMENSIONS, getColorForCountry, hasCountryData } from '@/lib';
import { useWorldData, useMapInteractions } from '@/hooks';
import { 
  MapTooltip, 
  MapLegend, 
  MapInfo, 
  CountryMarkers, 
  FallbackMap, 
  OceanBackground 
} from '@/components/map';

interface WorldMapSVGProps {
  selectedMonth: string;
  selectedCategory: DataCategory;
}

export const WorldMapSVG: React.FC<WorldMapSVGProps> = ({
  selectedMonth,
  selectedCategory,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { worldData, loading, error } = useWorldData();
  const { tooltip, handleCountryHover, handleCountryLeave } = useMapInteractions(selectedMonth);

  const projection = createProjection();
  const pathGenerator = createPathGenerator(projection);

  // Fallback simple map if world-atlas fails to load
  if (!worldData) {
    return (
      <FallbackMap
        selectedMonth={selectedMonth}
        selectedCategory={selectedCategory}
        tooltip={tooltip}
        onCountryHover={handleCountryHover}
        onCountryLeave={handleCountryLeave}
      />
    );
  }

  return (
    <div className="relative w-full h-[700px] bg-blue-100 rounded-lg overflow-hidden shadow-lg">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={MAP_DIMENSIONS.viewBox}
        className="w-full h-full"
      >
        <OceanBackground />

        {/* Countries */}
        {worldData.features.map((feature: any) => {
          const countryPath = pathGenerator(feature);
          // Try multiple possible country identifiers
          const countryId = feature.id || 
                           feature.properties?.ISO_A3 || 
                           feature.properties?.ADM0_A3 || 
                           feature.properties?.ISO_A2 ||
                           feature.properties?.NAME ||
                           feature.properties?.NAME_EN;
          const fillColor = getColorForCountry(countryId, selectedMonth, selectedCategory);
          const hasData = hasCountryData(countryId, selectedMonth);
          
          return (
            <path
              key={countryId}
              d={countryPath || ''}
              fill={fillColor}
              stroke="hsl(0, 0%, 100%)"
              strokeWidth="0.5"
              className={`transition-all duration-300 cursor-pointer ${
                hasData ? 'hover:stroke-4 hover:stroke-blue-500' : 'hover:stroke-2'
              }`}
              onMouseEnter={(e) => handleCountryHover(e, countryId)}
              onMouseLeave={handleCountryLeave}
              onMouseMove={(e) => handleCountryHover(e, countryId)}
            />
          );
        })}

        <CountryMarkers
          selectedMonth={selectedMonth}
          selectedCategory={selectedCategory}
          projection={projection}
          onCountryHover={handleCountryHover}
          onCountryLeave={handleCountryLeave}
        />
      </svg>

      <MapLegend 
        selectedCategory={selectedCategory} 
        countryCount={tourismData.length} 
      />

      <MapTooltip 
        tooltip={tooltip} 
        maxWidth={1000} 
        maxHeight={600} 
      />

      <MapInfo
        selectedMonth={selectedMonth}
        selectedCategory={selectedCategory}
        countryCount={tourismData.length}
      />
    </div>
  );
};