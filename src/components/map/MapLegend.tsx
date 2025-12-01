import React from 'react';
import { DataCategory } from '@/lib/firebaseDataLoader';
import { VISA_COLORS, HOME_COUNTRY_COLOR } from '@/lib/visa';

interface MapLegendProps {
  selectedCategory: DataCategory;
  countryCount: number;
}

export const MapLegend: React.FC<MapLegendProps> = ({ 
  selectedCategory, 
  countryCount 
}) => {
  return (
    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-lg max-w-[200px] sm:max-w-none">
      <h3 className="font-semibold text-xs sm:text-sm mb-1 sm:mb-2">
        {selectedCategory === 'temperature' 
          ? 'Temperature (°C)' 
          : selectedCategory === 'rainfall' 
          ? 'Rainfall (mm)'
          : selectedCategory === 'bestTime'
          ? 'Best time to visit'
          : 'Visa requirements'}
      </h3>
      <div className="flex items-center gap-1 sm:gap-2 text-xs">
        {selectedCategory === 'temperature' ? (
          <>
            <div className="w-3 sm:w-4 h-2 sm:h-3 bg-gradient-to-r from-blue-400 to-red-500 rounded"></div>
            <span>Cold → Hot</span>
          </>
        ) : selectedCategory === 'rainfall' ? (
          <>
            <div className="w-3 sm:w-4 h-2 sm:h-3 bg-gradient-to-r from-gray-300 to-blue-600 rounded"></div>
            <span>Low → High</span>
          </>
        ) : selectedCategory === 'bestTime' ? (
          <div className="space-y-1">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded"></div>
              <span>Best time</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 sm:w-3 h-2 sm:h-3 bg-yellow-500 rounded"></div>
              <span>Okay time</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 sm:w-3 h-2 sm:h-3 bg-red-500 rounded"></div>
              <span>Avoid</span>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 sm:w-3 h-2 sm:h-3 rounded" style={{ backgroundColor: HOME_COUNTRY_COLOR }}></div>
              <span className="font-semibold">Your country</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 sm:w-3 h-2 sm:h-3 rounded" style={{ backgroundColor: VISA_COLORS.free }}></div>
              <span>Visa-free</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 sm:w-3 h-2 sm:h-3 rounded" style={{ backgroundColor: VISA_COLORS.voa }}></div>
              <span>Visa on arrival</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 sm:w-3 h-2 sm:h-3 rounded" style={{ backgroundColor: VISA_COLORS.evisa }}></div>
              <span>eVisa/ETA</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 sm:w-3 h-2 sm:h-3 rounded" style={{ backgroundColor: VISA_COLORS.sticker }}></div>
              <span>Sticker visa</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 sm:w-3 h-2 sm:h-3 rounded" style={{ backgroundColor: VISA_COLORS.none }}></div>
              <span>No admission</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 sm:w-3 h-2 sm:h-3 rounded" style={{ backgroundColor: VISA_COLORS['n/a'] }}></div>
              <span>No data</span>
            </div>
          </div>
        )}
      </div>
      <div className="mt-1 sm:mt-2 text-xs text-gray-600">
        <div className="flex items-center gap-1 mb-1">
          <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-blue-500 border border-white"></div>
          <span className="text-xs">Interactive data points</span>
        </div>
        <div className="text-xs font-medium text-blue-600">
          Tap countries for detailed data
        </div>
      </div>
    </div>
  );
};