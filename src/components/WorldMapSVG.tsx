import React, { useRef } from 'react';
import { Feature } from 'geojson';
import { DataCategory } from '@/data/tourismDataLoader';
import { createProjection, createPathGenerator, MAP_DIMENSIONS, getColorForCountry, hasCountryData } from '@/lib';
import { useWorldData, useMapInteractions, useMapZoom, useTourismData } from '@/hooks';
import { CountryFeature } from '@/types';
import { 
  MapTooltip, 
  MapLegend, 
  MapInfo, 
  CountryMarkers, 
  FallbackMap, 
  OceanBackground,
  ZoomControls 
} from '@/components/map';

interface WorldMapSVGProps {
  selectedMonth: string;
  selectedCategory: DataCategory;
}

export const WorldMapSVG: React.FC<WorldMapSVGProps> = ({
  selectedMonth,
  selectedCategory,
}) => {
  const { worldData, loading: worldDataLoading, error: worldDataError } = useWorldData();
  const { tourismData, loading: tourismDataLoading, error: tourismDataError } = useTourismData();
  const { tooltip, handleCountryHover, handleCountryLeave } = useMapInteractions(selectedMonth);
  const { containerRef, svgRef, zoomIn, zoomOut, resetZoom, currentZoom } = useMapZoom();

  const projection = createProjection();
  const pathGenerator = createPathGenerator(projection);

  // Show loading if either world data or tourism data is loading
  const loading = worldDataLoading || tourismDataLoading;
  const error = worldDataError || tourismDataError;

  // Show loading state
  if (loading) {
    return (
      <div className="relative w-full h-[700px] bg-blue-100 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading climate data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="relative w-full h-[700px] bg-red-50 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="font-semibold mb-2">Error loading data</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

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
    <div className="relative w-full h-full bg-blue-100 rounded-lg overflow-hidden shadow-lg">
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ touchAction: 'none' }} // Prevent default touch behaviors
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={MAP_DIMENSIONS.viewBox}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'none', pointerEvents: 'all' }}
        >
          <g id="map-group">
            <OceanBackground />

            {/* Countries */}
            {worldData.features.map((feature: CountryFeature, index) => {
              const countryPath = pathGenerator(feature as Feature);
              // Try multiple possible country identifiers
              const countryId = feature.id;
              const fillColor = getColorForCountry(countryId, selectedMonth, selectedCategory);
              const hasData = hasCountryData(countryId, selectedMonth);
              
              return (
                <path
                  key={`country-${countryId}-${index}`}
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
          </g>
        </svg>
      </div>

      {/* Zoom Controls */}
      <ZoomControls
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onReset={resetZoom}
        currentZoom={currentZoom}
      />

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