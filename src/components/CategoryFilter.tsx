import React from 'react';
import { Thermometer, Cloud, Calendar } from 'lucide-react';
import { DataCategory } from '@/data/tourismDataLoader';

interface CategoryFilterProps {
  selectedCategory: DataCategory;
  onCategorySelect: (category: DataCategory) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="flex gap-4 justify-center mb-6">
      <button
        onClick={() => onCategorySelect('temperature')}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
          selectedCategory === 'temperature'
            ? 'bg-primary text-primary-foreground shadow-lg transform scale-105'
            : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
        }`}
      >
        <Thermometer size={20} />
        Temperature
      </button>
      <button
        onClick={() => onCategorySelect('rainfall')}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
          selectedCategory === 'rainfall'
            ? 'bg-primary text-primary-foreground shadow-lg transform scale-105'
            : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
        }`}
      >
        <Cloud size={20} />
        Rainfall
      </button>
      <button
        onClick={() => onCategorySelect('bestTime')}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
          selectedCategory === 'bestTime'
            ? 'bg-primary text-primary-foreground shadow-lg transform scale-105'
            : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
        }`}
      >
        <Calendar size={20} />
        Best time to visit
      </button>
    </div>
  );
};