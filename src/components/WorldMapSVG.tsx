import React, { useMemo, useRef } from 'react';
import { Feature } from 'geojson';
import { DataCategory } from '@/lib/firebaseDataLoader';
import { createProjection, createPathGenerator, MAP_DIMENSIONS, getColorForCountry, hasCountryData } from '@/lib';
import { useWorldData, useMapInteractions, useMapZoom, useTourismData, useFullscreen } from '@/hooks';
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
import { useVisaData } from '@/hooks/useVisaData';
import { getVisaColor, buildNumericToIso3Map } from '@/lib/visa';

interface WorldMapSVGProps {
  selectedMonth: string;
  selectedCategory: DataCategory;
  selectedPassportIso3?: string;
}

export const WorldMapSVG: React.FC<WorldMapSVGProps> = ({
  selectedMonth,
  selectedCategory,
  selectedPassportIso3,
}) => {
  const { worldData, loading: worldDataLoading, error: worldDataError } = useWorldData();
  const { tourismData, loading: tourismDataLoading, error: tourismDataError } = useTourismData();
  const { byPassport, iso3ToName } = useVisaData();
  const numericToIso3 = useMemo(() => buildNumericToIso3Map(), []);
  
  // Pass visa data to map interactions when in visa mode
  const { tooltip, handleCountryHover, handleCountryLeave, handleTouchStart, handleTouchEnd } = useMapInteractions({
    selectedMonth,
    visaData: selectedCategory === 'visa' && selectedPassportIso3 ? {
      byPassport,
      selectedPassportIso3,
      passportCountryName: iso3ToName[selectedPassportIso3],
      numericToIso3,
    } : undefined,
  });
  
  const { containerRef, svgRef, zoomIn, zoomOut, resetZoom, currentZoom } = useMapZoom();
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const projection = createProjection();
  const pathGenerator = createPathGenerator(projection);

  // Show loading if either world data or tourism data is loading
  const loading = worldDataLoading || tourismDataLoading;
  const error = worldDataError || tourismDataError;

  // Show loading state
  if (loading) {
    return (
      <div className="relative w-full h-full bg-blue-100 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
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
      <div className="relative w-full h-full bg-red-50 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
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
    <div className="w-full h-full flex flex-col">
      {/* Map Container - Full height on desktop, aspect-ratio preserved on mobile */}
      <div className="relative w-full bg-blue-100 rounded-t-lg md:rounded-lg overflow-hidden shadow-lg flex-1">
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
            preserveAspectRatio="xMidYMid meet"
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
                let fillColor: string;
                let hasData: boolean;

                if (selectedCategory === 'visa' && selectedPassportIso3) {
                  const iso3Prop = (feature?.properties?.ISO_A3 || feature?.properties?.ADM0_A3) as string | undefined;
                  const numericId = feature?.id ? String(feature.id) : undefined;
                  const iso3 = iso3Prop || (numericId ? numericToIso3[numericId] : undefined);
                  
                  // Check if this is the passport holder's home country
                  if (iso3 === selectedPassportIso3) {
                    fillColor = 'hsl(280, 70%, 50%)'; // Home country - bright purple
                    hasData = true;
                  } else {
                    const visaMap = byPassport[selectedPassportIso3] || {};
                    const req = (iso3 && visaMap[iso3]) || 'n/a';
                    fillColor = getVisaColor(req);
                    hasData = !!iso3 && Object.prototype.hasOwnProperty.call(visaMap, iso3);
                  }
                } else {
                  fillColor = getColorForCountry(countryId, selectedMonth, selectedCategory);
                  hasData = hasCountryData(countryId, selectedMonth);
                }
                
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
                    onTouchStart={(e) => handleTouchStart(e, countryId)}
                    onTouchEnd={handleTouchEnd}
                  />
                );
              })}

              <CountryMarkers
                selectedMonth={selectedMonth}
                selectedCategory={selectedCategory}
                projection={projection}
                onCountryHover={handleCountryHover}
                onCountryLeave={handleCountryLeave}
                currentZoom={currentZoom}
                visaData={selectedCategory === 'visa' && selectedPassportIso3 ? {
                  byPassport,
                  selectedPassportIso3,
                } : undefined}
              />
            </g>
          </svg>
        </div>

        {/* Zoom Controls - Only visible on larger screens (overlaid) */}
        <div className="hidden md:block">
          <ZoomControls
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onReset={resetZoom}
            onToggleFullscreen={() => toggleFullscreen()}
            isFullscreen={isFullscreen}
            currentZoom={currentZoom}
          />
        </div>

        <MapTooltip 
          tooltip={tooltip} 
          maxWidth={1000} 
          maxHeight={600} 
        />
      </div>

      {/* Controls Section - Below map on mobile, overlaid on desktop */}
      <div className="md:hidden bg-white rounded-b-lg shadow-lg">
        {/* Zoom Controls - Mobile version */}
        <div className="flex justify-center items-center gap-2 p-3 border-b border-gray-200">
          <button
            onClick={zoomOut}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            disabled={currentZoom <= 1.01}
            title="Zoom Out"
          >
            <span className="text-xl font-bold">−</span>
          </button>
          <div className="text-sm text-gray-600 font-mono px-3">
            {Math.round(currentZoom * 100)}%
          </div>
          <button
            onClick={zoomIn}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            disabled={currentZoom >= 8}
            title="Zoom In"
          >
            <span className="text-xl font-bold">+</span>
          </button>
          <div className="border-l border-gray-300 h-8 mx-2"></div>
          <button
            onClick={resetZoom}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 touch-manipulation text-sm"
            title="Reset Zoom"
          >
            Reset
          </button>
          <button
            onClick={() => toggleFullscreen()}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 touch-manipulation text-sm"
            title="Fullscreen"
          >
            ⛶
          </button>
        </div>

        {/* Legend and Info - Mobile version */}
        <div className="grid grid-cols-1 gap-3 p-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <h3 className="font-semibold text-sm mb-2">
              {selectedCategory === 'temperature' 
                ? 'Temperature (°C)' 
                : selectedCategory === 'rainfall' 
                ? 'Rainfall (mm)'
                : selectedCategory === 'bestTime'
                ? 'Best time to visit'
                : 'Visa requirements'}
            </h3>
            <div className="text-xs space-y-2">
              {selectedCategory === 'temperature' ? (
                <div className="flex items-center gap-2">
                  <div className="w-16 h-3 bg-gradient-to-r from-blue-400 to-red-500 rounded"></div>
                  <span>Cold → Hot</span>
                </div>
              ) : selectedCategory === 'rainfall' ? (
                <div className="flex items-center gap-2">
                  <div className="w-16 h-3 bg-gradient-to-r from-gray-300 to-blue-600 rounded"></div>
                  <span>Low → High</span>
                </div>
              ) : selectedCategory === 'bestTime' ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Best time</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span>Okay time</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>Avoid</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(280, 70%, 50%)' }}></div>
                    <span className="font-semibold">Your country</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-green-500"></div>
                    <span>Visa-free</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-orange-500"></div>
                    <span>Visa on arrival</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-blue-500"></div>
                    <span>eVisa/ETA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-red-500"></div>
                    <span>Sticker visa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gray-600"></div>
                    <span>No admission</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <div className="w-3 h-3 rounded bg-gray-300"></div>
                    <span>No data</span>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                <div className="w-3 h-3 rounded-full bg-blue-500 border border-white"></div>
                <span>Interactive data points</span>
              </div>
              <div className="font-medium text-blue-600">
                Tap countries for detailed data
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            {selectedCategory !== 'visa' && (
              <div className="text-sm font-semibold mb-1">{selectedMonth}</div>
            )}
            <div className="text-xs text-gray-600 capitalize">
              {selectedCategory === 'bestTime' ? 'Best time to visit' : selectedCategory} View
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {selectedCategory === 'visa' ? '199 countries' : `${tourismData.length} countries with data`}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop overlaid controls (Legend and Info) */}
      <div className="hidden md:block">
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
          <MapLegend 
            selectedCategory={selectedCategory} 
            countryCount={tourismData.length} 
          />
        </div>

        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4">
          <MapInfo
            selectedMonth={selectedMonth}
            selectedCategory={selectedCategory}
            countryCount={tourismData.length}
          />
        </div>
      </div>
    </div>
  );
};