import React from 'react';
import { DataCategory } from '@/lib/dataLoader';

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
        {selectedCategory === 'temperature' 
          ? 'Temperature (°C)' 
          : selectedCategory === 'rainfall' 
          ? 'Rainfall (mm)'
          : 'Best time to visit'}
      </h3>
      <div className="flex items-center gap-2 text-xs">
        {selectedCategory === 'temperature' ? (
          <>
            <div className="w-4 h-3 bg-gradient-to-r from-blue-400 to-red-500 rounded"></div>
            <span>Cold → Hot</span>
          </>
        ) : selectedCategory === 'rainfall' ? (
          <>
            <div className="w-4 h-3 bg-gradient-to-r from-gray-300 to-blue-600 rounded"></div>
            <span>Low → High</span>
          </>
        ) : (
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