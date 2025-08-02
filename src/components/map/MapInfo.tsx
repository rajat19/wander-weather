import React from 'react';
import { DataCategory } from '@/data/tourismDataLoader';

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
    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
      <div className="text-sm font-semibold">{selectedMonth}</div>
      <div className="text-xs text-muted-foreground capitalize">
        {selectedCategory} View
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {countryCount} countries with data
      </div>
    </div>
  );
};