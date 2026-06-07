import React from 'react';
import { Thermometer, Cloud, Calendar, BadgeCheck, LucideIcon } from 'lucide-react';
import { DataCategory } from '@/lib/firebaseDataLoader';

interface CategoryFilterProps {
  selectedCategory: DataCategory;
  onCategorySelect: (category: DataCategory) => void;
}

interface CategoryConfig {
  id: DataCategory;
  icon: LucideIcon;
  labelFull: string;
  labelShort: string;
}

const CATEGORIES: CategoryConfig[] = [
  {
    id: 'temperature',
    icon: Thermometer,
    labelFull: 'Temperature',
    labelShort: 'Temp',
  },
  {
    id: 'rainfall',
    icon: Cloud,
    labelFull: 'Rainfall',
    labelShort: 'Rain',
  },
  {
    id: 'bestTime',
    icon: Calendar,
    labelFull: 'Best time to visit',
    labelShort: 'Best time',
  },
  {
    id: 'visa',
    icon: BadgeCheck,
    labelFull: 'Visa',
    labelShort: 'Visa',
  },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="grid grid-cols-4 sm:flex sm:flex-row gap-1.5 sm:gap-4 justify-center mb-4 sm:mb-6 px-1 sm:px-0">
      {CATEGORIES.map(({ id, icon: Icon, labelFull, labelShort }) => (
        <button
          key={id}
          onClick={() => onCategorySelect(id)}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 rounded-lg transition-all duration-300 text-[11px] sm:text-base px-1 sm:px-6 ${selectedCategory === id
              ? 'bg-primary text-primary-foreground shadow-md sm:shadow-lg transform sm:scale-105'
              : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
            }`}
        >
          <Icon className="w-5 h-5 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">{labelFull}</span>
          <span className="sm:hidden font-medium">{labelShort}</span>
        </button>
      ))}
    </div>
  );
};