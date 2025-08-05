import React from 'react';
import { useTourismData } from '@/hooks';

interface MonthSelectorProps {
  selectedMonth: string;
  onMonthSelect: (month: string) => void;
  isFullscreen?: boolean;
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  onMonthSelect,
  isFullscreen = false,
}) => {
  const { months, loading } = useTourismData();

  if (loading) {
    return (
      <div className={isFullscreen 
        ? "bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border p-3 w-64" 
        : "bg-white rounded-lg shadow-lg border p-4 sm:p-6 h-fit"
      }>
        <div className="animate-pulse">
          <div className="h-4 sm:h-6 bg-gray-200 rounded mb-3 sm:mb-4"></div>
          <div className={isFullscreen ? "grid grid-cols-3 gap-1" : "grid grid-cols-3 sm:grid-cols-2 gap-1 sm:gap-2"}>
            {Array(12).fill(0).map((_, i) => (
              <div key={i} className="h-8 sm:h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={isFullscreen 
      ? "bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border p-3 w-64" 
      : "bg-white rounded-lg shadow-lg border p-4 sm:p-6 h-fit"
    }>
      <h2 className={`font-semibold text-foreground ${
        isFullscreen ? "text-sm mb-2" : "text-base sm:text-lg mb-3 sm:mb-4"
      }`}>
        {isFullscreen ? "Select Month" : "Select a Month to Explore"}
      </h2>
      <div className={isFullscreen ? "grid grid-cols-3 gap-1" : "grid grid-cols-3 sm:grid-cols-2 gap-1 sm:gap-2"}>
        {months.map((month) => (
          <button
            key={month}
            onClick={() => onMonthSelect(month)}
            className={`rounded-lg font-medium transition-all duration-200 text-left ${
              isFullscreen 
                ? "px-2 py-1 text-xs" 
                : "px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm"
            } ${
              selectedMonth === month
                ? 'bg-blue-600 text-white shadow-md transform scale-105'
                : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm'
            }`}
          >
            {isFullscreen ? month.substring(0, 3) : month}
          </button>
        ))}
      </div>
    </div>
  );
};