import React from 'react';
import { Thermometer, Cloud, Calendar, BadgeCheck } from 'lucide-react';
import { DataCategory } from '@/lib/firebaseDataLoader';

interface CategoryFilterProps {
  selectedCategory: DataCategory;
  onCategorySelect: (category: DataCategory) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center mb-4 sm:mb-6 px-2 sm:px-0">
      <button
        onClick={() => onCategorySelect('temperature')}
        className={`flex items-center justify-center gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base ${
          selectedCategory === 'temperature'
            ? 'bg-primary text-primary-foreground shadow-lg transform scale-105'
            : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
        }`}
      >
        <Thermometer size={16} className="sm:w-5 sm:h-5" />
        <span className="hidden xs:inline">Temperature</span>
        <span className="xs:hidden">Temp</span>
      </button>
      <button
        onClick={() => onCategorySelect('rainfall')}
        className={`flex items-center justify-center gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base ${
          selectedCategory === 'rainfall'
            ? 'bg-primary text-primary-foreground shadow-lg transform scale-105'
            : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
        }`}
      >
        <Cloud size={16} className="sm:w-5 sm:h-5" />
        <span className="hidden xs:inline">Rainfall</span>
        <span className="xs:hidden">Rain</span>
      </button>
      <button
        onClick={() => onCategorySelect('bestTime')}
        className={`flex items-center justify-center gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base ${
          selectedCategory === 'bestTime'
            ? 'bg-primary text-primary-foreground shadow-lg transform scale-105'
            : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
        }`}
      >
        <Calendar size={16} className="sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Best time to visit</span>
        <span className="sm:hidden">Best time</span>
      </button>
      <button
        onClick={() => onCategorySelect('visa')}
        className={`flex items-center justify-center gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base ${
          selectedCategory === 'visa'
            ? 'bg-primary text-primary-foreground shadow-lg transform scale-105'
            : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
        }`}
      >
        <BadgeCheck size={16} className="sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Visa</span>
        <span className="sm:hidden">Visa</span>
      </button>
    </div>
  );
};