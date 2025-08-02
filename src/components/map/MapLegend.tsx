import React from 'react';
import { DataCategory } from '@/data/tourismDataLoader';

interface MapLegendProps {
  selectedCategory: DataCategory;
  countryCount: number;
}

export const MapLegend: React.FC<MapLegendProps> = ({ 
  selectedCategory, 
  countryCount 
}) => {
  return (
    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
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
      <div className="mt-2 text-xs text-gray-600">
        <div className="flex items-center gap-1 mb-1">
          <div className="w-3 h-3 rounded-full bg-blue-500 border border-white"></div>
          <span>Interactive data points</span>
        </div>
        <div className="text-xs font-medium text-blue-600">
          Hover countries for detailed data
        </div>
      </div>
    </div>
  );
};