import React from 'react';
import { DataCategory } from '@/lib/firebaseDataLoader';

interface MapInfoProps {
  selectedMonth: string;
  selectedCategory: DataCategory;
  countryCount: number;
}

export const MapInfo: React.FC<MapInfoProps> = ({ 
  selectedMonth, 
  selectedCategory, 
  countryCount 
}) => {
  return (
    <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-lg">
      {selectedCategory !== 'visa' && (
        <div className="text-xs sm:text-sm font-semibold">{selectedMonth}</div>
      )}
      <div className="text-xs text-muted-foreground capitalize">
        {selectedCategory === 'bestTime' ? 'Best time to visit' : selectedCategory} View
      </div>
      {selectedCategory !== 'visa' && (
        <div className="text-xs text-gray-500 mt-1">
          {countryCount} countries with data
        </div>
      )}
      {selectedCategory === 'visa' && (
        <div className="text-xs text-gray-500 mt-1">
          199 countries
        </div>
      )}
    </div>
  );
};