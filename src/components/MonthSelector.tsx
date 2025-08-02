import React from 'react';
import { useTourismData } from '@/hooks';

interface MonthSelectorProps {
  selectedMonth: string;
  onMonthSelect: (month: string) => void;
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  onMonthSelect,
}) => {
  const { months, loading } = useTourismData();

  if (loading) {
    return (
      <div className="w-full p-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-2 gap-2">
            {Array(12).fill(0).map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <h2 className="text-lg font-semibold mb-4 text-foreground">
        Select a Month to Explore
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {months.map((month) => (
          <button
            key={month}
            onClick={() => onMonthSelect(month)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedMonth === month
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
            }`}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
};